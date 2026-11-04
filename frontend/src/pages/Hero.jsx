import { useEffect, useRef, useState } from "react";
import data from "../constants.json";
import Timeline from "../comp/Timeline";
import Footer from "../comp/Footer";
import Section from "../comp/Section";

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
  const { hero, badges } = data;
  const [, setActive] = useState(0);
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
    <>
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
        <Timeline />
      </section>
      <Section />
      <Footer />
    </>
  );
}
