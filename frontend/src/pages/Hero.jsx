import { useEffect, useRef, useState } from "react";
import data from "../constants.json";

function Badge({ type, label }) {
  if (type === "upwork")
    return (
      <div className="text-center leading-none" aria-label={label}>
        <p className="text-[13px] font-medium">Upwork</p>
        <p className="mt-1 text-[7px] text-white/50">{label}</p>
      </div>
    );
  if (type === "clutch")
    return (
      <svg
        viewBox="0 0 48 54"
        className="w-11 xl:w-14"
        role="img"
        aria-label={label}
      >
        <path
          d="M24 2 45 14v26L24 52 3 40V14z"
          fill="#0a0a0b"
          stroke="#fff"
          strokeOpacity=".7"
          strokeWidth="2"
        />
        <text
          x="24"
          y="30"
          textAnchor="middle"
          fontSize="8"
          fontWeight="600"
          fill="#fff"
        >
          Clutch
        </text>
      </svg>
    );
  return (
    <span
      className="size-3 rounded-full bg-white/30"
      role="img"
      aria-label={label}
    />
  );
}

export default function Hero() {
  const { hero, badges, principles } = data;
  const [active, setActive] = useState(0);
  const rows = useRef([]);

  // Scroll animation: the row crossing the middle of the viewport becomes active
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && setActive(Number(e.target.dataset.index)),
        ),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    rows.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="px-5 pt-36 md:px-8 md:pt-44 lg:px-[6%] xl:pt-60">
      {/* Heading + badges */}
      <div className="relative">
        <h1 className="max-w-[9.6em] text-[2.6rem] font-normal leading-[1.14] tracking-[-0.02em] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
          {hero.title}
        </h1>
        <div className="mt-10 flex items-center gap-5 lg:absolute lg:right-[-1%] lg:top-6 lg:mt-0 lg:flex-col lg:gap-4">
          {badges.map((b, i) => (
            <Badge key={i} {...b} />
          ))}
        </div>
      </div>

      {/* Principles timeline */}
      <ul className="mt-16 md:mt-28 lg:ml-[8.5%] xl:mt-56">
        {principles.map((p, i) => {
          const on = i === active;
          const last = i === principles.length - 1;
          return (
            <li
              key={p.id}
              ref={(el) => (rows.current[i] = el)}
              data-index={i}
              onMouseEnter={() => setActive(i)}
              className={`relative grid gap-3 pl-7 pt-10 lg:grid-cols-[47fr_53fr] lg:gap-0 lg:pl-0 ${
                last ? "pb-24 xl:pb-32" : "pb-10"
              }`}
            >
              {/* line to next dot + dot */}
              <span
                aria-hidden
                className={`absolute left-[5px] top-[3.05rem] w-[2px] transition-colors duration-500 lg:left-[calc(47%+5px)] ${
                  last ? "bottom-0" : "-bottom-[3.05rem]"
                } ${on ? "bg-[#a9a4ee]" : "bg-white/15"}`}
              />
              <span
                aria-hidden
                className={`absolute left-0 top-[3.05rem] size-3 rounded-full transition-colors duration-500 lg:left-[47%] ${
                  on ? "bg-[#c4c0ff]" : "bg-white/30"
                }`}
              />

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
    </section>
  );
}
