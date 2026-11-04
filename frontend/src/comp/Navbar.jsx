import { useState } from "react";
import content from "../content.json";

function LogoMark() {
  return (
    <svg
      viewBox="0 0 50 46"
      className="h-7 w-7.5 shrink-0 xl:h-[4.6rem] xl:w-20"
      fill="#1d2230"
      stroke="#1d2230"
      strokeWidth="3"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M25 3 46 14 25 25 4 14Z" />
      <path d="M4 19 23 29V43L4 33Z" />
      <path d="M46 19 27 29V43L46 33Z" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { links, cta } = content.nav;

  return (
    <header className="relative z-30 mx-auto w-full max-w-[1741px] px-5 sm:px-8 xl:px-[3.2rem]">
      <nav className="flex h-19 items-center justify-between gap-4 xl:h-40">
        <a
          href="/"
          aria-label={content.brand}
          className="flex min-w-0 items-center gap-2 justify-self-start xl:gap-[1.3rem]"
        >
          <LogoMark />
          <span className="whitespace-nowrap text-[24px] font-semibold leading-none tracking-tight xl:text-[3.5rem]">
            {content.brand}
          </span>
        </a>

        <ul className="hidden items-center justify-center gap-7 lg:flex xl:gap-[4.2rem]">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="whitespace-nowrap text-[15px] transition-opacity hover:opacity-60 xl:text-[1.8rem]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#hire"
          className="hidden h-11.5 items-center justify-center rounded-full bg-[#1d2230] px-7 text-[15px] font-medium text-white transition-colors hover:bg-black lg:flex xl:h-[4.6rem] xl:min-w-[14.8rem] xl:text-[1.7rem]"
        >
          {cta}
        </a>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-full border border-[#1d2230]/20 lg:hidden"
        >
          <svg
            viewBox="0 0 20 14"
            className="h-3.5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M3 1l14 12M17 1 3 13" />
            ) : (
              <path d="M1 2h18M1 7h18M1 12h18" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="absolute left-5 right-5 top-full rounded-b-2xl border-t border-[#1d2230]/10 bg-[#faf9f7] px-5 pb-6 pt-2 shadow-lg sm:left-8 sm:right-8 lg:hidden">
          <ul>
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-[#1d2230]/10 py-4 text-[18px]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#hire"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-full bg-[#1d2230] py-3.5 text-center text-white"
          >
            {cta}
          </a>
        </div>
      )}
    </header>
  );
}
