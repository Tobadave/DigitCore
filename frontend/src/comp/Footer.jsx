import { useState } from "react";
import data from "../constants.json";

const ArrowUp = () => (
  <svg
    viewBox="0 0 24 24"
    className="size-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

const ArrowRight = () => (
  <svg
    viewBox="0 0 24 24"
    className="size-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

function LinkList({ items, className, gap = "gap-6 lg:gap-7" }) {
  return (
    <ul className={`flex flex-col ${gap}`}>
      {items.map(({ label, href }) => {
        const external = href.startsWith("http");
        return (
          <li key={label}>
            <a
              href={href}
              className={className}
              {...(external && { target: "_blank", rel: "noreferrer" })}
            >
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

const COLS = "lg:grid-cols-[34fr_17fr_29fr_20fr]";
const mainLink =
  "text-base text-white transition-colors duration-300 hover:text-[var(--accent)] xl:text-[1.0625rem]";
const legalLink =
  "text-[15px] text-white/40 transition-colors duration-300 hover:text-white";

export default function Footer() {
  const { brand, footer } = data;
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to your newsletter service here
    setSent(true);
    setEmail("");
  };

  return (
    <footer className="bg-black px-5 pb-10 pt-14 md:px-8 lg:px-[6%] lg:pb-16 lg:pt-[4.75rem]">
      {/* Top row */}
      <div className={`grid grid-cols-2 gap-x-6 gap-y-10 lg:gap-x-0 ${COLS}`}>
        <div className="col-span-2 lg:col-span-1">
          <a
            href="#"
            className="inline-flex items-center gap-2.5"
            aria-label={brand.logo}
          >
            <img src={brand.logoImg} alt="" className="h-9 w-auto xl:h-11" />
            <span className="text-[2rem] font-semibold leading-none tracking-tight xl:text-[2.25rem]">
              {brand.logo}
            </span>
          </a>
          <p className="mt-3 text-sm text-white/70">{footer.tagline}</p>
        </div>

        <LinkList items={footer.nav} className={mainLink} />
        <LinkList items={footer.socials} className={mainLink} />

        <div className="col-span-2 lg:col-span-1">
          <LinkList
            items={footer.legal}
            className={legalLink}
            gap="gap-5 lg:gap-6"
          />
        </div>
      </div>

      {/* Bottom row */}
      <div
        className={`mt-16 flex flex-col gap-12 lg:mt-36 lg:grid lg:items-end lg:gap-0 ${COLS}`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group order-3 flex w-fit items-center gap-8 rounded-full bg-white/[0.07] py-2.5 pl-10 pr-2.5 text-base transition-colors duration-300 hover:bg-white/[0.12] lg:order-none"
        >
          {footer.backToTop}
          <span className="grid size-11 place-items-center rounded-full bg-white text-black transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:text-white">
            <ArrowUp />
          </span>
        </button>

        <div className="order-1 lg:order-none lg:col-span-2">
          <h2 className="text-2xl font-normal leading-[1.35] sm:text-[1.75rem] xl:text-[2rem]">
            {brand.logo}
            <br />
            {footer.newsletter.titleSuffix}
          </h2>
          <form
            onSubmit={onSubmit}
            className="mt-8 flex h-[60px] w-full max-w-[26rem] items-center rounded-full bg-white p-2.5 pl-7 focus-within:ring-2 focus-within:ring-[var(--accent)] xl:max-w-[415px]"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={footer.newsletter.placeholder}
              aria-label="Email address"
              className="min-w-0 flex-1 bg-transparent text-base text-black outline-none placeholder:text-neutral-400"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-black text-white transition-colors duration-300 hover:bg-[var(--accent)]"
            >
              <ArrowRight />
            </button>
          </form>
          {sent && (
            <p role="status" className="mt-3 text-sm text-white/50">
              {footer.newsletter.success}
            </p>
          )}
        </div>

        <div className="order-2 lg:order-none">
          <a
            href={`mailto:${footer.email}`}
            className="text-base text-white transition-colors duration-300 hover:text-[var(--accent)]"
          >
            {footer.email}
          </a>
          <p className="mt-10 text-[15px] leading-snug text-white/40 lg:mt-14">
            {brand.logo}
            <br />
            {new Date().getFullYear()} © {footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
