// All site copy, stats and links live here. Components import from this file,
// so nothing is hardcoded in the JSX. Replace placeholder values as real data arrives.

export const brand = {
  name: "Digitcore",
  tagline: "Fully digital. Fully yours.",
  logo: "/logo.png",
  logoAlt: "Digitcore logo",
  email: "hello@digitcore.example", // placeholder
  phone: "+234 000 000 0000", // placeholder
  timeZone: "Africa/Lagos",
};

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Academy", href: "#academy" },
];

export const navCta = { label: "Contact", href: "#contact" };

export const hero = {
  tagline: "Digital transformation for Nigerian businesses",
  wordmark: "DIGITCORE",
  stats: [
    { value: 6, suffix: "", label: "Professionals in our team" },
    { value: 60, suffix: "", label: "Days of support after launch" },
    { value: 100, suffix: "%", label: "Client-owned code and data" },
  ],
  badge: {
    label: "Get in touch",
    ring: "Fully digital \u2022 Fully yours \u2022 Fully digital \u2022 Fully yours \u2022 ",
    href: "#contact",
    ariaLabel: "Get in touch with Digitcore",
  },
};

export const intro = {
  eyebrow: "About Digitcore",
  headlineLines: ["We Build the", "Digital Core of", "Your Business"],
  paragraphs: [
    "Digitcore is a team of six professionals who rebuild how a business runs, sells and grows. Your project is never handed to someone learning on the job.",
    "We start with how you really work, then build inventory, records and software that you own and understand.",
  ],
  stats: [
    { value: 100, suffix: "%", label: "Client-owned code, accounts and data" },
    {
      value: 60,
      suffix: " days",
      label: "Post-launch support on every project",
    },
  ],
  cta: { label: "Contact", href: "#contact" },
};

export const services = {
  eyebrow: "What we do",
  headingLines: ["How can //", "we help you"],
  items: [
    {
      id: "strategy",
      title: "Digital Strategy and Audit",
      description:
        "We find where your business loses time and money, then give you a clear, prioritised roadmap.",
      highlight: false,
      placement: "lg:col-span-3 lg:col-start-1 lg:row-start-1",
    },
    {
      id: "inventory",
      title: "Inventory and Records Systems",
      description:
        "Stock, sales, student and patient records in one system, with live reports on your phone.",
      highlight: true,
      placement: "lg:col-span-3 lg:col-start-7 lg:row-start-1",
    },
    {
      id: "software",
      title: "Custom Software Development",
      description:
        "Web and mobile software built end to end around the way your business works.",
      highlight: false,
      placement: "lg:col-span-3 lg:col-start-10 lg:row-start-1",
    },
    {
      id: "integrations",
      title: "API, Backend and Integrations",
      description:
        "We connect payments, SMS and accounting into one flow, so you stop re-entering data.",
      highlight: true,
      placement: "lg:col-span-3 lg:col-start-4 lg:row-start-2",
    },
    {
      id: "design-seo",
      title: "Product Design, Analysis and SEO",
      description:
        "Research, design and search visibility that help the right people find and use your product.",
      highlight: false,
      placement: "lg:col-span-3 lg:col-start-8 lg:row-start-2",
    },
    {
      id: "academy",
      anchor: "academy",
      title: "Digitcore Academy",
      description:
        "Training for staff and owners, plus mentoring that helps students build their own projects.",
      highlight: false,
      placement: "lg:col-span-3 lg:col-start-1 lg:row-start-3",
    },
  ],
};

// Placeholders. Swap in real pilot projects once they are delivered and the clients agree.
export const caseStudies = {
  headingLines: ["Look here", "Our case study"],
  items: [
    {
      id: "school",
      title: "School records system",
      tag: "Education",
      note: "Pilot slot open",
      tone: "from-primary-600 via-primary-900 to-ink-950",
      href: "#contact",
    },
    {
      id: "clinic",
      title: "Clinic inventory and billing",
      tag: "Healthcare",
      note: "Pilot slot open",
      tone: "from-ink-600 via-ink-800 to-ink-950",
      href: "#contact",
    },
    {
      id: "retail",
      title: "Retail stock control",
      tag: "Business",
      note: "Pilot slot open",
      tone: "from-primary-500 via-ink-800 to-ink-950",
      href: "#contact",
    },
  ],
  floatingCta: { label: "Start your project", href: "#contact" },
};

export const footer = {
  headingLines: ["Let's build your", "digital core."],
  copyEmail: { label: "Copy email", copied: "Copied" },
  columns: [
    {
      title: "Services",
      links: [
        { label: "Strategy and Audit", href: "#services" },
        { label: "Inventory and Records", href: "#services" },
        { label: "Custom Software", href: "#services" },
        { label: "APIs and Integrations", href: "#services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#about" },
        { label: "Case Studies", href: "#case-studies" },
        { label: "Digitcore Academy", href: "#academy" },
      ],
    },
  ],
  newsletter: {
    title: "Practical digital tips",
    description:
      "Short, useful ideas for running your business digitally. No spam.",
    placeholder: "Your email",
    button: "Subscribe",
    success: "Thank you. You are on the list.",
  },
  socials: [
    { label: "LinkedIn", icon: "linkedin", href: "#" },
    { label: "X", icon: "x", href: "#" },
    { label: "Instagram", icon: "instagram", href: "#" },
    { label: "WhatsApp", icon: "whatsapp", href: "#" },
  ],
  localTimeLabel: "Nigeria time",
  backToTop: "Back to top",
  copyright: "Digitcore. All rights reserved.",
};

export default {
  brand,
  navLinks,
  navCta,
  hero,
  intro,
  services,
  caseStudies,
  footer,
};
