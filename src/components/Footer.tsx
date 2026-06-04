import { Code2, Link2, Mail } from "lucide-react";
import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="section-divider py-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4 border-b border-border pb-6 sm:justify-start">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
          >
            <Mail size={14} />
            Email
          </a>
          {site.linkedin && (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
            >
              <Link2 size={14} />
              LinkedIn
            </a>
          )}
          {site.github.map((g) => (
            <a
              key={g.url}
              href={g.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
            >
              <Code2 size={14} />
              {g.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-center text-sm text-muted sm:flex-row sm:text-left">
          <p>
            © {year} {site.name}. Built with Next.js & Tailwind.
          </p>
          <p className="max-w-md text-xs">
            Enterprise demos available on request. Confidentiality respected.
          </p>
        </div>
      </div>
    </footer>
  );
}
