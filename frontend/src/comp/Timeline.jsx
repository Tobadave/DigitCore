import { useEffect, useRef, useState } from "react";
import contents from "../constants.json";

const { principles } = contents;

const Timeline = () => {
  const [active, setActive] = useState(0);
  const rows = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActive(Number(entry.target.dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    rows.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <ul className="relative mt-16 md:mt-28 lg:ml-[8.5%] xl:mt-56">
      {principles.map((p, i) => {
        const on = i === active;
        const passed = i < active;
        const last = i === principles.length - 1;

        return (
          <li
            key={p.id}
            ref={(el) => (rows.current[i] = el)}
            data-index={i}
            onMouseEnter={() => setActive(i)}
            className={`relative pl-7 pt-10 lg:grid lg:grid-cols-[47fr_53fr] lg:gap-0 lg:pl-0 ${
              last ? "pb-24 xl:pb-32" : "pb-10"
            }`}
          >
            {/* Rail: track line, progress fill, and dot */}
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-3 lg:left-[47%]"
            >
              <span
                className={`absolute bottom-0 left-1/2 w-px -translate-x-1/2 bg-white/15 ${
                  i === 0 ? "top-[calc(2.5rem+0.6em)]" : "top-0"
                }`}
                style={
                  last
                    ? {
                        maskImage:
                          "linear-gradient(to bottom, #000 35%, transparent 100%)",
                        WebkitMaskImage:
                          "linear-gradient(to bottom, #000 35%, transparent 100%)",
                      }
                    : undefined
                }
              />

              <span
                className={`absolute bottom-0 left-1/2 w-px origin-top -translate-x-1/2 bg-[#ff2d2d] transition-transform duration-700 ease-out ${
                  i === 0 ? "top-[calc(2.5rem+0.6em)]" : "top-0"
                } ${passed ? "scale-y-100" : "scale-y-0"}`}
              />

              <span
                className={`absolute left-0 top-[calc(2.5rem+0.6em)] size-3 -translate-y-1/2 rounded-full transition-all duration-700 ease-out ${
                  on
                    ? "scale-125 bg-[#ff2d2d]"
                    : passed
                      ? "bg-[#ff2d2d]/60"
                      : "bg-white/25"
                }`}
                style={
                  on
                    ? {
                        boxShadow:
                          "0 0 0 6px rgba(255,45,45,0.15), 0 0 18px 4px rgba(255,45,45,0.7)",
                      }
                    : undefined
                }
              />
            </div>

            <h3
              onClick={() => setActive(i)}
              className={`max-w-[10em] cursor-pointer text-2xl font-light leading-[1.2] transition-colors duration-500 md:text-3xl lg:pr-6 xl:text-[2.75rem] ${
                on ? "text-white" : "text-white/30"
              }`}
            >
              {p.title}
            </h3>

            <p
              className={`max-w-[30rem] pt-1 text-sm leading-relaxed transition-colors duration-500 lg:pl-8 xl:text-[15px] ${
                on ? "text-white" : "text-white/25"
              }`}
            >
              {p.description}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default Timeline;
