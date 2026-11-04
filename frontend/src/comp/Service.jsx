import { useEffect, useRef, useState } from "react";
import data from "../constants.json";

/* Fires once when the element scrolls into view */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, shown];
}

function Reveal({ delay = 0, className = "", children }) {
  const [ref, shown] = useInView();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Card({ n, item }) {
  return (
    <div className="group">
      <span className="block text-[1.375rem] leading-none text-[var(--accent)]">
        {String(n).padStart(2, "0")}
      </span>

      <h3 className="mt-4 text-xl font-semibold uppercase leading-[1.15] text-[#1d2230] xl:text-2xl">
        {item.title.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h3>

      <p className="mt-2 max-w-[18em] text-balance text-[15px] leading-[1.45] text-[#1d2230]/60 transition-colors duration-300 group-hover:text-[#1d2230]/90 xl:text-base">
        {item.description}
      </p>
    </div>
  );
}

/* Light theme dividers */
const DIVIDER = "lg:h-full lg:border-l lg:border-[#1d2230]/15 lg:pl-11";

const CELL = [
  "max-lg:border-t max-lg:border-[#1d2230]/15 max-lg:pt-6",
  "max-lg:border-t max-lg:border-[#1d2230]/15 max-lg:pt-6",
  "max-lg:border-t max-lg:border-[#1d2230]/15 max-lg:pt-6",
  "border-t border-[#1d2230]/15 pt-6 lg:-ml-[6vw] lg:pl-[6vw] lg:pt-8",
  "border-t border-[#1d2230]/15 pt-6 lg:pt-8",
  "",
];

export default function Service() {
  const { label, items } = data.services;
  const [headRef, headShown] = useInView();

  return (
    <section
      id="services"
      className="scroll-mt-24 bg-white px-5 py-20 text-[#1d2230] md:px-8 lg:px-[6%] xl:py-28"
    >
      {/* Label + drawing line */}
      <div ref={headRef} className="flex items-center gap-5">
        <span
          className={`text-[15px] font-semibold uppercase tracking-wide text-[var(--accent)] transition-opacity duration-700 motion-reduce:opacity-100 ${
            headShown ? "opacity-100" : "opacity-0"
          }`}
        >
          {label}
        </span>

        <span
          className={`h-px flex-1 origin-left bg-[#1d2230]/20 transition-transform duration-1000 ease-out motion-reduce:scale-x-100 ${
            headShown ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </div>

      {/* Services grid */}
      <div className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-2 lg:mt-14 lg:grid-cols-[266fr_308fr_319fr] lg:gap-x-0 lg:gap-y-7">
        {items.map((item, i) => (
          <Reveal key={item.id} delay={(i % 3) * 120} className={CELL[i]}>
            {i === 5 ? (
              <div className="relative lg:h-full">
                {/* Notched frame */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 border border-[#1d2230]/20 [clip-path:polygon(0_0,calc(100%_-_40px)_0,100%_42px,100%_100%,0_100%)]"
                />

                <span
                  aria-hidden
                  className="absolute left-[calc(100%_-_40px)] top-0 h-px w-[58px] origin-left rotate-[46.4deg] bg-[#1d2230]/20"
                />

                <span
                  aria-hidden
                  className="absolute -right-0.5 bottom-2 size-3 bg-[var(--accent)]"
                />

                <div className="relative px-6 pb-7 pt-7 lg:pl-11 lg:pt-8">
                  <Card n={i + 1} item={item} />
                </div>
              </div>
            ) : (
              <div className={i === 1 || i === 2 || i === 4 ? DIVIDER : ""}>
                <Card n={i + 1} item={item} />
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
