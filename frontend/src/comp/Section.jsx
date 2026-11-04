import { useEffect, useRef, useState } from "react";
import content from "../constants.json";

const { title, intro, cta, steps } = content.workingProcess;

// Visible white block height as a % of viewport. Matches your desktop screenshot (~69%).
const STAGE_VH = 69;
// Scroll distance per step as a % of viewport. Higher = slower.
const SCROLL_VH_PER_STEP = 90;

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const STAGE_TOP_VH = 100 - STAGE_VH;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export default function WorkingProcessSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const [active, setActive] = useState(0);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;

      const stickyTop = (window.innerHeight * STAGE_TOP_VH) / 100;
      const total = section.offsetHeight - stage.offsetHeight;
      const scrolled = Math.min(
        Math.max(stickyTop - section.getBoundingClientRect().top, 0),
        total,
      );
      const progress = total > 0 ? scrolled / total : 0;
      setActive(
        Math.min(steps.length - 1, Math.floor(progress * steps.length)),
      );
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const jumpTo = (i) => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const stickyTop = (window.innerHeight * STAGE_TOP_VH) / 100;
    const total = section.offsetHeight - stage.offsetHeight;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: sectionTop - stickyTop + ((i + 0.5) / steps.length) * total,
      behavior: "smooth",
    });
  };

  const colors = (i) => ({
    rule: i === active ? "var(--accent)" : i < active ? "#9a9a9a" : "#e0e0e0",
    number: i === active ? "var(--accent)" : i < active ? "#2b2b2b" : "#cfcfcf",
  });

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${steps.length * SCROLL_VH_PER_STEP}vh` }}
    >
      <div
        ref={stageRef}
        className="sticky flex flex-col justify-start overflow-hidden bg-white px-5 pt-[7vh] sm:px-8 md:px-12 lg:px-[5%]"
        style={{
          top: `${STAGE_TOP_VH}vh`,
          height: `${STAGE_VH}vh`,
        }}
      >
        <header>
          <h2 className="text-[28px] font-medium leading-[1.15] tracking-[-0.01em] text-[#2b2b2b] sm:text-[36px] md:text-[44px] lg:text-[48px]">
            {title}
          </h2>
          <p className="mt-3 max-w-[480px] text-sm leading-[1.6] text-[#4a4a4a] md:mt-4 md:text-[15px]">
            {intro}
          </p>
        </header>

        {isDesktop ? (
          /* ---------- DESKTOP: horizontal accordion (unchanged) ---------- */
          <div className="mt-8 flex w-full items-end gap-[38px] md:mt-10">
            {steps.map((step, i) => {
              const on = i === active;
              const { rule, number } = colors(i);

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-current={on ? "step" : undefined}
                  className={`group flex min-w-0 cursor-pointer flex-col text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 transition-[flex-grow] duration-700 ${EASE} motion-reduce:transition-none`}
                  style={{ flexGrow: on ? 3.5 : 1, flexBasis: 0 }}
                >
                  <span
                    className="block h-[2px] w-full transition-colors duration-700 motion-reduce:transition-none"
                    style={{ backgroundColor: rule }}
                  />

                  <div className="mt-6 flex items-end">
                    <span
                      className="block shrink-0 font-semibold leading-[0.8] tracking-[-0.03em] transition-colors duration-700 motion-reduce:transition-none"
                      style={{
                        fontSize: "clamp(3.5rem, 11vw, 12.5rem)",
                        color: number,
                      }}
                    >
                      {step.number}
                    </span>

                    <div
                      className={`grid min-w-0 overflow-hidden opacity-0 transition-[grid-template-rows,grid-template-columns,opacity] duration-700 ${EASE} motion-reduce:transition-none lg:grid-rows-[1fr] ${
                        on
                          ? "grid-rows-[1fr] opacity-100 lg:grid-cols-[1fr]"
                          : "grid-rows-[0fr] lg:grid-cols-[0fr]"
                      }`}
                    >
                      <div className="min-h-0 min-w-0 w-full lg:w-[360px] lg:pl-10">
                        <h3
                          className={`text-[22px] font-medium leading-[1.3] text-[#2b2b2b] whitespace-nowrap transition-all duration-700 ${EASE} delay-150 motion-reduce:transition-none ${
                            on
                              ? "translate-y-0 opacity-100"
                              : "translate-y-4 opacity-0"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`mt-3 max-w-[360px] text-[15px] leading-[1.6] text-[#4a4a4a] transition-all duration-700 ${EASE} delay-300 motion-reduce:transition-none ${
                            on
                              ? "translate-y-0 opacity-100"
                              : "translate-y-4 opacity-0"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* ---------- MOBILE: slide panels + fixed number row ---------- */
          <div className="mt-8">
            {/* Sliding panels. All stack in one grid cell; each is offset
                by its distance from the active step, so the active one
                slides in from the right and the previous one slides out left. */}
            <div className="grid overflow-hidden">
              {steps.map((step, i) => {
                const on = i === active;
                return (
                  <div
                    key={step.number}
                    aria-hidden={!on}
                    className={`col-start-1 row-start-1 min-w-0 py-6 transition-transform duration-700 ${EASE} motion-reduce:transition-none`}
                    style={{ transform: `translateX(${(i - active) * 100}%)` }}
                  >
                    <h3 className="text-xl font-medium leading-[1.3] text-[#2b2b2b]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.6] text-[#4a4a4a]">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Fixed number row, left-aligned, equal cell widths (no spreading) */}
            <div className="mt-4 grid w-1/2 grid-cols-4">
              {steps.map((step, i) => {
                const on = i === active;
                const { rule, number } = colors(i);
                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-current={on ? "step" : undefined}
                    className="flex min-w-0 cursor-pointer flex-col items-start text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    <span
                      className="block h-[2px] w-full transition-colors duration-700 motion-reduce:transition-none"
                      style={{ backgroundColor: rule }}
                    />
                    <span
                      className="mt-3 block font-semibold leading-[0.8] tracking-[-0.03em] transition-colors duration-700 motion-reduce:transition-none"
                      style={{ fontSize: "3.25rem", color: number }}
                    >
                      {step.number}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <a
          href={cta.href}
          className="mt-8 inline-flex w-fit items-center rounded-md bg-[#efefef] px-4 py-2.5 text-sm text-[#2b2b2b] transition-colors duration-300 hover:bg-[#e4e4e4] md:mt-12 md:text-[15px]"
        >
          {cta.label}
        </a>
      </div>
    </section>
  );
}
