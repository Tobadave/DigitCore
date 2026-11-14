import content from "../constants.json";
import { useInView } from "../pages/Hero";

const { footer } = content;

export default function Footer() {
  const [ref, inView] = useInView();

  return (
    <footer className="border-t border-white/10 bg-ink-900">
      <div
        ref={ref}
        className={`reveal mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 md:py-16 ${inView ? "is-visible" : ""}`}
      >
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a
              href="#home"
              aria-label="Digitcore home"
              className="inline-block"
            >
              <img
                src="/logo.png"
                alt="Digitcore logo"
                className="h-8 w-auto"
              />
            </a>
            <p className="mt-4 text-base text-white/60">{footer.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-8">
              {footer.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs text-white/45 sm:text-sm">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
