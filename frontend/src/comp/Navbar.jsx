import { useEffect, useRef, useState } from "react";
import { brand, navLinks, navCta } from "../constants";

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ArrowUpRight = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-3.5 w-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

/** Gently pulls its child toward the cursor. */
function Magnetic({ children, className = "" }) {
  const ref = useRef(null);
  const move = (e) => {
    if (reduced()) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.3;
    const y = (e.clientY - r.top - r.height / 2) * 0.4;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const leave = () => {
    ref.current.style.transform = "";
  };
  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [pill, setPill] = useState({ left: 0, width: 0, show: false });
  const lastY = useRef(0);
  const progressRef = useRef(null);

  // Hide on scroll down, reveal on scroll up. Also drives the scroll progress bar.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > lastY.current + 6 && y > 200) setHidden(true);
      else if (y < lastY.current - 6) setHidden(false);
      lastY.current = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mark the link whose section is currently in view.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const targets = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (en) => en.isIntersecting && setActive(`#${en.target.id}`),
        ),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  // Mobile menu: Escape closes, desktop resize closes, and page scroll is locked while open.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // Sliding highlight that follows the hovered or focused link.
  const showPill = (e) => {
    const li = e.currentTarget;
    setPill({ left: li.offsetLeft, width: li.offsetWidth, show: true });
  };
  const hidePill = () => setPill((p) => ({ ...p, show: false }));

  return (
    <header
      className={`fixed inset-x-4 top-4 z-50 mx-auto max-w-3xl transition-transform duration-500 ease-out ${
        hidden && !open ? "-translate-y-[160%]" : "translate-y-0"
      }`}
    >
      {/* Scroll progress line along the top of the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-0.5"
      >
        <div
          ref={progressRef}
          className="h-full origin-left scale-x-0 bg-primary-500"
        />
      </div>

      <nav
        aria-label="Primary"
        className={`relative flex items-center justify-between rounded-full border px-3 py-2 backdrop-blur-xl transition-colors duration-300 ${
          scrolled
            ? "border-white/20 bg-ink-950/80"
            : "border-white/15 bg-black/40"
        }`}
      >
        <a
          href="#home"
          aria-label={`${brand.name} home`}
          className="flex items-center rounded-full pl-2"
        >
          <img src={brand.logo} alt={brand.logoAlt} className="h-7 w-auto" />
        </a>

        {/* Desktop links */}
        <ul
          className="relative hidden items-center md:flex"
          onMouseLeave={hidePill}
          onBlur={hidePill}
        >
          <span
            aria-hidden="true"
            style={{ left: pill.left, width: pill.width }}
            className={`pointer-events-none absolute inset-y-0 rounded-full bg-white/10 transition-all duration-300 ease-out ${
              pill.show ? "opacity-100" : "opacity-0"
            }`}
          />
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li
                key={link.href}
                onMouseEnter={showPill}
                onFocus={showPill}
                className="relative"
              >
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block px-4 py-2 text-xs font-medium transition-colors ${
                    isActive ? "text-white" : "text-ink-300 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0.5 mx-auto h-1 w-1 rounded-full bg-primary-500 transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Magnetic className="hidden md:block">
            <a
              href={navCta.href}
              className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black! transition-colors hover:bg-primary-500 hover:text-white!"
            >
              {navCta.label}
              <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight />
              </span>
            </a>
          </Magnetic>

          {/* Hamburger morphs into an X */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 md:hidden"
          >
            <span
              className={`h-0.5 w-4 bg-white transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-4 bg-white transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-4 bg-white transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown with staggered links */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`absolute inset-x-0 top-full mt-2 origin-top rounded-3xl border border-white/15 bg-ink-900/95 p-4 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open
            ? "visible scale-100 opacity-100"
            : "invisible scale-95 opacity-0"
        }`}
      >
        <ul className="flex flex-col">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
              className={`transition-all duration-300 ${open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
            >
              <a
                href={link.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-3 py-3 text-xl font-semibold transition-colors ${
                  active === link.href
                    ? "text-primary-400"
                    : "text-white hover:text-primary-400"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={navCta.href}
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black! transition-colors hover:bg-primary-500 hover:text-white!"
        >
          {navCta.label}
          <ArrowUpRight />
        </a>
      </div>
    </header>
  );
}
