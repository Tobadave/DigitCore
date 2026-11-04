import { useEffect, useRef, useState } from "react";
import data from "../constants.json";

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="size-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const GridIcon = () => (
  <svg
    viewBox="0 0 16 16"
    className="size-4"
    fill="currentColor"
    aria-hidden="true"
  >
    <circle cx="5" cy="5" r="2" />
    <circle cx="11" cy="5" r="2" />
    <circle cx="5" cy="11" r="2" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

export default function Navbar() {
  const { brand, nav } = data;
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  // Scroll animation: shrink + blur after 30px, hide on scroll down, reveal on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > lastY.current && y > 120);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  const compact = scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${compact ? "bg-[#0a0a0b]/70 py-3 backdrop-blur-md" : "bg-transparent py-5 md:py-7"}`}
      >
        <div className="flex items-center justify-between px-5 md:px-8 lg:px-[6%] sm:grid sm:grid-cols-[1fr_auto_1fr]">
          <a
            href="#"
            className="flex items-center gap-2 justify-self-start text-[26px] font-semibold leading-none tracking-tight"
          >
            <img src={brand.logoImg} alt="" className="h-8 w-auto" />
            {brand.logo}
          </a>

          <a
            href={nav.cta.href}
            className="group hidden items-center gap-4 rounded-full border border-white/15 py-1.5 pl-6 pr-1.5 text-[11px] font-medium uppercase tracking-wide transition-colors hover:border-white/40 sm:flex"
          >
            {nav.cta.label}
            <span className="grid size-9 place-items-center rounded-full bg-white text-[#0a0a0b] transition-transform duration-300 group-hover:rotate-45">
              <ArrowIcon />
            </span>
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="flex items-center gap-3 justify-self-end text-[11px] font-medium uppercase tracking-wide"
          >
            {open ? nav.closeLabel : nav.menuLabel}
            <span className="grid size-9 place-items-center rounded-full bg-white text-[#0a0a0b]">
              <GridIcon />
            </span>
          </button>
        </div>
      </header>

      {/* Menu overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-[#0a0a0b] px-5 transition-opacity duration-500 md:px-8 lg:px-[6%] ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2">
          {nav.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-4xl font-light text-white/40 transition-colors hover:text-white md:text-6xl"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
