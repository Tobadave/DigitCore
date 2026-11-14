import { useEffect, useRef, useState } from "react";
import {
  brand,
  hero,
  intro,
  services,
  caseStudies,
  footer,
} from "../constants";

/* ----------------------------- helpers ----------------------------- */

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ArrowUpRight = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
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

/** True once the element has entered the viewport (always true for reduced motion). */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (reduced() || !("IntersectionObserver" in window)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

/** Fades and slides its children up when scrolled into view. */
function Reveal({ as: Tag = "div", delay = 0, className = "", children }) {
  const [ref, seen] = useInView(0.15);
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Counts from 0 to `value` once `run` turns true. */
function CountUp({ value, suffix = "", run }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return undefined;
    if (reduced()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setN(value);
      return undefined;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 1400, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);
  return (
    <>
      {n}
      {suffix}
    </>
  );
}

/* ------------------------------- hero ------------------------------ */

function HeroSection() {
  const sectionRef = useRef(null);
  const [statsRef, statsOn] = useInView(0.4);
  const [ready, setReady] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (reduced()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReady(true);
      setSettled(true);
      return undefined;
    }
    const raf = requestAnimationFrame(() => setReady(true));
    const timer = setTimeout(() => setSettled(true), 1600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  // Red spotlight follows the cursor.
  const onPointerMove = (e) => {
    if (reduced() || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    sectionRef.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    sectionRef.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  // Magnetic badge.
  const badgeMove = (e) => {
    if (reduced()) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.25}px)`;
  };
  const badgeLeave = (e) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-black px-5 pb-6 pt-28 sm:px-8 sm:pb-8 lg:pt-32"
    >
      {/* Gradient background only: white glow top right, red glow bottom left, cursor spotlight on top */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(70%_80%_at_88%_8%,rgba(255,255,255,0.30),transparent_62%),radial-gradient(55%_55%_at_8%_95%,rgba(225,29,46,0.22),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(520px_circle_at_var(--mx,60%)_var(--my,25%),rgba(225,29,46,0.20),transparent_60%)]"
      />

      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div ref={statsRef} className="flex gap-6 sm:gap-10">
          {hero.stats.map((stat) => (
            <div key={stat.label}>
              <p className="flex items-start gap-1 text-3xl font-bold leading-none text-white sm:text-5xl">
                <span
                  className="text-lg text-primary-500 sm:text-2xl"
                  aria-hidden="true"
                >
                  *
                </span>
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  run={statsOn}
                />
              </p>
              <p className="mt-2 max-w-[7.5rem] text-[10px] uppercase leading-snug tracking-widest text-ink-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <a
          href={hero.badge.href}
          aria-label={hero.badge.ariaLabel}
          onMouseMove={badgeMove}
          onMouseLeave={badgeLeave}
          className="group relative flex h-36 w-36 shrink-0 items-center justify-center self-end rounded-full border border-white/20 bg-white/5 text-white! backdrop-blur-md transition-[transform,background-color] duration-200 ease-out hover:bg-primary-500 sm:h-44 sm:w-44 md:mr-4 md:self-auto lg:h-56 lg:w-56"
        >
          <svg
            viewBox="0 0 200 200"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full animate-[spin_24s_linear_infinite] motion-reduce:animate-none group-hover:[animation-duration:6s]"
          >
            <defs>
              <path
                id="badge-ring"
                d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"
              />
            </defs>
            <text
              fill="currentColor"
              fontSize="11"
              fontWeight="600"
              letterSpacing="2"
              className="uppercase opacity-70"
            >
              <textPath
                href="#badge-ring"
                textLength="508"
                lengthAdjust="spacing"
              >
                {hero.badge.ring}
              </textPath>
            </text>
          </svg>
          <span className="relative flex flex-col items-center gap-2 text-center text-sm font-bold uppercase leading-tight lg:text-lg">
            {hero.badge.label}
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-125" />
          </span>
        </a>
      </div>

      <div className="mt-16">
        <p
          className={`mb-3 text-xs font-medium uppercase tracking-[0.25em] text-ink-300 transition-all duration-700 sm:text-sm ${ready ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
        >
          {hero.tagline}
        </p>
        <h1 className="flex w-full select-none justify-between font-black uppercase leading-[0.8] tracking-tighter text-white text-[clamp(2.5rem,13.6vw,16rem)]">
          <span className="sr-only">
            {brand.name}: {hero.tagline}
          </span>
          {[...hero.wordmark].map((char, i) => (
            <span
              key={`${char}-${i}`}
              aria-hidden="true"
              className="inline-block overflow-hidden pb-[0.08em]"
            >
              <span
                style={{ transitionDelay: settled ? "0ms" : `${i * 70}ms` }}
                className={`inline-block cursor-default transition-all duration-700 ease-out hover:-translate-y-[0.06em] hover:text-primary-500 ${ready ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
              >
                {char}
              </span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}

/* ------------------------------ intro ------------------------------ */

function Intro() {
  const [statsRef, statsOn] = useInView(0.5);
  return (
    <section
      id="about"
      aria-labelledby="intro-title"
      className="bg-white text-black"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 md:grid-cols-2 lg:py-28">
        <div>
          <Reveal>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary-600">
              {intro.eyebrow}
            </p>
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="text-[clamp(2rem,4.6vw,3.75rem)] font-medium leading-[1.05] tracking-tight"
          >
            <span id="intro-title" className="sr-only">
              {intro.headlineLines.join(" ")}
            </span>
            {intro.headlineLines.map((line) => (
              <span
                key={line}
                aria-hidden="true"
                className="block transition-transform duration-300 hover:translate-x-2 hover:text-primary-600"
              >
                {line}
              </span>
            ))}
          </Reveal>
          <Reveal delay={200}>
            <a
              href={intro.cta.href}
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white! transition-colors hover:bg-primary-500"
            >
              {intro.cta.label}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <div>
          {intro.paragraphs.map((text, i) => (
            <Reveal key={text} delay={120 + i * 100}>
              <p className="mb-4 max-w-md text-sm leading-relaxed text-ink-700">
                {text}
              </p>
            </Reveal>
          ))}
          <div ref={statsRef} className="mt-10 flex gap-10">
            {intro.stats.map((stat) => (
              <div key={stat.label} className="group">
                <p className="text-4xl font-medium tracking-tight transition-colors group-hover:text-primary-600 sm:text-5xl">
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    run={statsOn}
                  />
                </p>
                <p className="mt-1 max-w-[9rem] text-xs text-ink-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- services ---------------------------- */

/** Card tilts toward the cursor, flips colour on hover and its + turns into a x. */
function ServiceCard({ item, index }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false); // tap to reveal state on touch screens

  const move = (e) => {
    if (reduced()) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  };
  const leave = () => {
    ref.current.style.transform = "";
  };

  const tone = item.highlight
    ? "bg-white text-black hover:bg-primary-500 hover:text-white"
    : "border border-white/10 bg-ink-800 text-white hover:bg-white hover:text-black";

  return (
    <Reveal delay={index * 90} className={item.placement}>
      <article
        id={item.anchor}
        ref={ref}
        onMouseMove={move}
        onMouseLeave={leave}
        onClick={() => setOpen((v) => !v)}
        className={`group flex min-h-[19rem] scroll-mt-28 cursor-pointer flex-col justify-between p-5 transition-[transform,background-color,color] duration-300 ease-out ${tone}`}
      >
        <h3 className="text-lg font-medium leading-tight">{item.title}</h3>
        <span
          aria-hidden="true"
          className={`self-center text-3xl font-light transition-transform duration-300 group-hover:rotate-90 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
        <p className="text-[11px] font-medium uppercase leading-relaxed tracking-wide opacity-80">
          {item.description}
        </p>
      </article>
    </Reveal>
  );
}

function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="bg-ink-950 py-20 text-white lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2
          id="services-title"
          className="text-[clamp(2.75rem,10vw,9rem)] font-black uppercase leading-[0.88] tracking-tighter"
        >
          {services.headingLines.map((line, i) => (
            <Reveal
              as="span"
              key={line}
              delay={i * 120}
              className={`block ${i === 1 ? "pl-[12%]" : ""}`}
            >
              {line.split("//").map((part, p, all) => (
                <span key={p}>
                  {part}
                  {p < all.length - 1 && (
                    <span className="text-primary-500">//</span>
                  )}
                </span>
              ))}
            </Reveal>
          ))}
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:grid-rows-3">
          {services.items.map((item, i) => (
            <ServiceCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- case studies -------------------------- */

const tilts = [
  "md:-rotate-3 md:mb-6",
  "md:rotate-0 md:scale-105 md:z-10",
  "md:rotate-3 md:mt-10",
];

function CaseStudies() {
  return (
    <section
      id="case-studies"
      aria-labelledby="cases-title"
      className="relative overflow-hidden bg-white pt-20 text-black lg:pt-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2
          id="cases-title"
          className="text-[clamp(2.25rem,9vw,8.5rem)] font-black uppercase leading-[0.88] tracking-tighter"
        >
          {caseStudies.headingLines.map((line, i) => (
            <Reveal
              as="span"
              key={line}
              delay={i * 120}
              className={`block ${i === 1 ? "pl-[8%]" : ""}`}
            >
              {line}
            </Reveal>
          ))}
        </h2>

        <div className="mt-16 flex flex-col items-center gap-10 pb-28 md:flex-row md:items-center md:justify-center md:gap-6 lg:gap-10">
          {caseStudies.items.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 140}
              className="w-full max-w-xs md:w-1/3"
            >
              <a
                href={item.href}
                aria-label={`${item.title}: ${item.note}`}
                className={`group block bg-white p-3 text-black! shadow-[0_20px_50px_-15px_rgba(0,0,0,0.45)] ring-1 ring-black/10 transition-all duration-500 ease-out hover:z-20 hover:-translate-y-3 hover:rotate-0 hover:scale-[1.04] ${tilts[i % tilts.length]} ${i === 1 ? "border-[10px] border-black" : ""}`}
              >
                <div
                  className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${item.tone}`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-3 top-3 text-xs font-semibold uppercase tracking-widest text-white/70"
                  >
                    {item.tag}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-2 left-3 text-7xl font-black leading-none text-white/90 transition-transform duration-500 group-hover:scale-110"
                  >
                    0{i + 1}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
                  />
                </div>
                <div className="flex items-center justify-between pt-3">
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-ink-400">{item.note}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Floating call to action that stays near the bottom while this section is on screen */}
      <div className="pointer-events-none sticky bottom-5 z-30 mx-5 pb-5 sm:mx-8">
        <a
          href={caseStudies.floatingCta.href}
          className="group pointer-events-auto inline-flex items-center gap-2 rounded-full bg-black/90 px-5 py-3 text-sm font-semibold text-white! shadow-xl backdrop-blur transition-colors hover:bg-primary-500"
        >
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-45" />
          {caseStudies.floatingCta.label}
        </a>
      </div>
    </section>
  );
}

/* ------------------------------ footer ----------------------------- */

const socialIcons = {
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 11v6M8 7.5v.01M12 17v-6m0 3c0-2 1.5-3 3-3s3 1 3 3v3" />
    </>
  ),
  x: <path d="M5 4l14 16M19 4L5 20" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5v.01" />
    </>
  ),
  whatsapp: (
    <path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3L3 21zM9 9c0 3 3 6 6 6l1-1.5-2-1-1 .8c-.8-.4-1.6-1.2-2-2l.8-1-1-2L9 9z" />
  ),
};

function Footer() {
  const [copied, setCopied] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [time, setTime] = useState("");

  // Live clock for the team's time zone.
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: brand.timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(brand.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${brand.email}`; // fallback when clipboard is blocked
    }
  };

  const onSubscribe = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!new FormData(form).get("email")) return;
    setSubscribed(true); // replace with a real newsletter API call
    form.reset();
  };

  return (
    <footer
      id="contact"
      className="scroll-mt-0 border-t border-white/10 bg-ink-950 text-white"
    >
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-20 sm:px-8 lg:pt-28">
        <Reveal>
          <h2 className="text-[clamp(2.25rem,8vw,7rem)] font-black uppercase leading-[0.9] tracking-tighter">
            {footer.headingLines.map((line, i) => (
              <span
                key={line}
                className={`block transition-colors duration-300 hover:text-primary-500 ${i === 1 ? "pl-[6%]" : ""}`}
              >
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={copyEmail}
            aria-live="polite"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black! transition-colors hover:bg-primary-500 hover:text-white!"
          >
            {copied ? footer.copyEmail.copied : brand.email}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-45" />
          </button>
          <span className="text-xs uppercase tracking-widest text-ink-400">
            {footer.copyEmail.label}
          </span>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-white/10 pt-12 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <img src={brand.logo} alt={brand.logoAlt} className="h-8 w-auto" />
            <p className="mt-4 text-lg font-semibold">{brand.tagline}</p>
            <form onSubmit={onSubscribe} className="mt-6 max-w-sm">
              <label htmlFor="footer-email" className="text-sm font-semibold">
                {footer.newsletter.title}
              </label>
              <p className="mt-1 text-sm text-ink-400">
                {footer.newsletter.description}
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={footer.newsletter.placeholder}
                  className="w-full rounded-full border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-ink-400 focus:border-primary-500"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white! transition hover:bg-primary-400"
                >
                  {footer.newsletter.button}
                </button>
              </div>
              <p
                role="status"
                className="mt-2 min-h-5 text-sm text-primary-300"
              >
                {subscribed ? footer.newsletter.success : ""}
              </p>
            </form>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-block text-sm text-ink-300! transition-all duration-200 hover:translate-x-1 hover:text-primary-400!"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
              {footer.localTimeLabel}
            </h3>
            <p
              className="mt-5 font-mono text-2xl tabular-nums"
              aria-label={`${footer.localTimeLabel} ${time}`}
            >
              {time}
            </p>
            <p className="mt-2 text-sm text-ink-400">{brand.phone}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-ink-400">
            &copy; {new Date().getFullYear()} {footer.copyright}
          </p>
          <ul className="flex items-center gap-3" aria-label="Social media">
            {footer.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-300! transition hover:-translate-y-1 hover:border-primary-500 hover:text-primary-400!"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[18px] w-[18px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {socialIcons[s.icon]}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: reduced() ? "auto" : "smooth",
              })
            }
            className="group inline-flex items-center gap-2 self-start text-sm text-ink-300 transition-colors hover:text-white md:self-auto"
          >
            {footer.backToTop}
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition group-hover:-translate-y-1 group-hover:border-primary-500">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 19V5M6 11l6-6 6 6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------ page ------------------------------- */

// The whole landing page lives in this file: hero, intro, services, case studies and footer.
export default function Hero() {
  return (
    <>
      <main>
        <HeroSection />
        <Intro />
        <Services />
        <CaseStudies />
      </main>
      <Footer />
    </>
  );
}
