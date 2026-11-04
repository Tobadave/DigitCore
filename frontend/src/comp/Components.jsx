import { Fragment } from "react";
import data from "../content.json";

function Lines({ text }) {
  return text.split("\n").map((line, index) => (
    <span key={`${line}-${index}`} className="block">
      {line}
    </span>
  ));
}

function Soft({ text }) {
  return text.split("\n").map((line, index, all) => (
    <Fragment key={`${line}-${index}`}>
      {line}
      {index < all.length - 1 && (
        <>
          <span className="xl:hidden"> </span>
          <br className="hidden xl:block" />
        </>
      )}
    </Fragment>
  ));
}

function Check() {
  return (
    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#1d2230] text-white xl:h-[2.1rem] xl:w-[2.1rem]">
      <svg
        viewBox="0 0 16 16"
        className="h-[60%] w-[60%]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m3.5 8.5 3 3 6-7" />
      </svg>
    </span>
  );
}

export function PersonCard({ person, className = "" }) {
  return (
    <article className={`person-card ${className}`}>
      <img
        src={person.image}
        alt={`${person.name}, ${person.role}`}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="person-label">
        <div className="min-w-0 leading-tight">
          <p className="text-[12px] font-medium xl:text-[1.55rem]">
            {person.name}
          </p>
          <p className="text-[11px] text-[#1d2230]/40 xl:text-[1.45rem]">
            {person.role}
          </p>
        </div>
        <Check />
      </div>
    </article>
  );
}

function InfoCard({ tone, title, body, deco, className = "", bodyClass = "" }) {
  return (
    <article className={`info-card ${tone} ${className}`}>
      {deco}
      {title && (
        <h3 className="relative text-[20px] font-normal leading-[1.16] sm:text-[24px] xl:text-[2.65rem]">
          <Lines text={title} />
        </h3>
      )}
      {body && (
        <p
          className={`relative mt-4 text-[12px] font-medium leading-[1.45] text-[#1d2230]/80 sm:text-[13px] xl:mt-5 xl:text-[1.55rem] ${bodyClass}`}
        >
          <Soft text={body} />
        </p>
      )}
    </article>
  );
}

export function TalentGrid() {
  const { members, cards } = data;

  return (
    <div id="members" className="talent-grid">
      <div className="talent-column talent-column-one">
        <PersonCard person={members.mike} className="mike-card" />
        <InfoCard
          tone="bg-[#bfaae7]"
          title={cards.pool.title}
          body={cards.pool.body}
          className="pool-card"
          deco={<span className="card-orb pool-orb" />}
        />
      </div>

      <div className="talent-column talent-column-two">
        <InfoCard
          tone="bg-[#d3edd0]"
          title={cards.quick.title}
          body={cards.quick.body}
          className="quick-card"
          deco={<span className="card-orb quick-orb" />}
        />
        <PersonCard person={members.asger} className="asger-card" />
      </div>

      <div className="talent-column talent-column-three">
        <PersonCard person={members.latisha} className="latisha-card" />
        <InfoCard
          tone="bg-[#ffb47c]"
          body={cards.fees.body}
          className="fees-card"
          bodyClass="!mt-0 !text-[18px] !leading-[1.25] !text-[#1d2230] sm:!text-[20px] xl:!text-[2.35rem]"
          deco={
            <>
              <span className="fees-ring fees-ring-one" />
              <span className="fees-ring fees-ring-two" />
            </>
          }
        />
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#1d2230] transition-transform group-hover:translate-x-1 xl:h-[5.2rem] xl:w-[5.2rem]">
      <svg
        viewBox="0 0 24 24"
        className="h-1/2 w-1/2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 12h18m-6-6 6 6-6 6" />
      </svg>
    </span>
  );
}

export function Hero() {
  const { hero } = data;
  const faces = [data.members.mike, data.members.asger, data.members.latisha];

  return (
    <section className="hero-layout">
      <div className="hero-copy">
        <h1 className="hero-heading">
          {hero.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <div className="hero-bottom">
          <p className="max-w-[430px] text-[13px] font-medium leading-[1.55] sm:text-[15px] xl:max-w-[43rem] xl:text-[1.65rem]">
            <Soft text={hero.subtitle} />
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-5 xl:mt-[2.7rem] xl:gap-[2.4rem]">
            <a
              href="/contact"
              className="group flex h-[54px] items-center justify-between gap-7 rounded-full bg-[#1d2230] py-1.5 pl-6 pr-1.5 text-[13px] font-medium text-white transition-colors hover:bg-black xl:h-[5.8rem] xl:min-w-[26.8rem] xl:gap-5 xl:pl-[2.5rem] xl:pr-[0.5rem] xl:text-[1.55rem]"
            >
              {hero.cta}
              <ArrowIcon />
            </a>

            <div
              className="flex items-center"
              aria-label="More than 723 team members"
            >
              {faces.map((face, index) => (
                <span
                  key={face.name}
                  className={`relative h-9 w-9 overflow-hidden rounded-full border-2 border-[#faf9f7] bg-[#e8e4df] xl:h-[4.1rem] xl:w-[4.1rem] ${index ? "-ml-2 xl:-ml-[0.8rem]" : ""}`}
                >
                  <img
                    src={face.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </span>
              ))}
              <span className="-ml-2 grid h-9 min-w-9 place-items-center rounded-full border-2 border-[#faf9f7] bg-[#efe9df] px-1 text-[9px] font-medium text-[#1d2230]/70 xl:h-[4.1rem] xl:min-w-[4.1rem] xl:text-[1.05rem]">
                {hero.extraCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      <TalentGrid />
    </section>
  );
}

function Logo({ name, variant }) {
  switch (variant) {
    case "open":
      return (
        <span className="font-serif text-[27px] leading-none tracking-tight xl:text-[3.1rem]">
          {name}
        </span>
      );
    case "unisport":
      return (
        <span className="flex items-center gap-2 xl:gap-[1rem]">
          <svg
            viewBox="0 0 32 34"
            className="h-5 w-5 xl:h-[2.7rem] xl:w-[2.7rem]"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M2 2h9v16a5 5 0 0 0 10 0V2h9v17a14 14 0 0 1-28 0z" />
          </svg>
          <span className="text-[14px] font-extrabold tracking-tight xl:text-[1.75rem]">
            {name}
          </span>
        </span>
      );
    case "aller":
      return (
        <span className="text-[30px] font-black leading-none tracking-[-0.04em] xl:text-[3.6rem]">
          {name}
        </span>
      );
    case "verisure":
      return (
        <span className="flex items-center gap-2 xl:gap-[1rem]">
          <svg
            viewBox="0 0 50 48"
            className="h-7 w-7 xl:h-[3.5rem] xl:w-[3.5rem]"
            fill="currentColor"
            aria-hidden="true"
          >
            <polygon points="25,6 40,13 44,28 34,42 16,42 6,28 10,13" />
          </svg>
          <span className="text-[23px] font-semibold leading-none tracking-tight xl:text-[3rem]">
            {name}
          </span>
        </span>
      );
    case "layerise":
      return (
        <span className="flex items-center gap-2 xl:gap-[1rem]">
          <svg
            viewBox="0 0 34 50"
            className="h-7 w-5 xl:h-[3.5rem] xl:w-[2.4rem]"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M22 0 2 28h12L10 50l22-30H19z" />
          </svg>
          <span className="text-[25px] font-semibold leading-none tracking-tight xl:text-[3.2rem]">
            {name}
          </span>
        </span>
      );
    case "gamerpay":
      return (
        <span className="flex items-center gap-2 xl:gap-[1rem]">
          <span className="grid h-7 w-7 place-items-center rounded-[28%] bg-[#1d2230] text-[16px] font-bold leading-none text-[#f1eee8] xl:h-[3.5rem] xl:w-[3.5rem] xl:text-[2rem]">
            G
          </span>
          <span className="text-[22px] font-semibold leading-none xl:text-[2.7rem]">
            {name}
          </span>
        </span>
      );
    case "better":
      return (
        <span className="flex items-center gap-2 xl:gap-[1rem]">
          <svg
            viewBox="0 0 56 56"
            className="h-8 w-8 xl:h-[4rem] xl:w-[4rem]"
            aria-hidden="true"
          >
            <path
              d="M28 3 53 28 28 53 3 28Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            />
            <text
              x="28"
              y="33"
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="currentColor"
            >
              BC
            </text>
          </svg>
          <span className="text-[10px] font-semibold uppercase leading-[1.25] tracking-[0.25em] xl:text-[1.35rem]">
            Better
            <br />
            Collective
          </span>
        </span>
      );
    default:
      return <span>{name}</span>;
  }
}

export function LogoSection() {
  return (
    <section id="companies" className="logo-section">
      <p className="px-4 py-8 text-center text-[13px] text-[#1d2230]/35 sm:py-10 xl:py-[3.2rem] xl:text-[1.55rem]">
        {data.trusted}
      </p>
      <div className="bg-[#f1eee8]">
        <ul className="mx-auto flex w-full max-w-[1741px] flex-wrap items-center justify-center gap-x-9 gap-y-7 px-6 py-8 text-[#15171c] sm:px-10 lg:flex-nowrap lg:justify-between lg:gap-x-5 xl:h-[11.5rem] xl:px-[3.8rem] xl:py-0">
          {data.logos.map((logo) => (
            <li key={logo.name} className="flex shrink-0 items-center">
              <Logo {...logo} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
