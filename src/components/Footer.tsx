import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="section-divider py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-center text-sm text-muted sm:flex-row sm:px-8 sm:text-left">
        <p>
          © {year} {site.name}. Built with Next.js & Tailwind.
        </p>
        <p className="max-w-md text-xs">
          Enterprise demos available on request. Confidentiality respected.
        </p>
      </div>
    </footer>
  );
}
