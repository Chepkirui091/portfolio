import Image from "next/image";
import { SectionHeading } from "./SectionHeading";
import { site } from "@/data/site";
import { siteImages } from "@/lib/images";

export function About() {
  return (
    <section id="about" className="section-pad section-divider">
      <SectionHeading
        eyebrow="About me"
        title="How I work"
        description="Frontend, APIs, mobile, and data across the products I ship."
      />
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
            <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
              <Image
                src={siteImages.heroAccent}
                alt="Collaborative product design and engineering"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
          </div>
          <div className="glass absolute -bottom-4 -right-2 max-w-[220px] rounded-xl p-4 sm:-right-6">
            <p className="text-2xl font-semibold text-gradient">6+</p>
            <p className="mt-1 text-xs text-muted">
              Industries - healthcare, insurance, fintech, edtech, enterprise,
              retail
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4 leading-relaxed text-muted">
            <p>
              I am a full-stack software developer in Nairobi, Kenya. I ship
              products end to end: Next.js on the web, NestJS and Django for
              APIs, PostgreSQL for data, and Expo React Native on mobile. I like
              taking messy workflows and turning them into clear screens and
              reliable backends.
            </p>
            <p>
              Recent work includes KISRS (healthcare UAT for hospitals and labs),
              BeautiLink (beauty marketplace I founded), insurance admin and agents
              portals, e-Sahal (fintech wallet), Upeo CBC (edtech), and
              CarbonFlow. I have also shipped offline-first POS and MRP systems
              and several public Next.js apps.
            </p>
            <p>
              I work closely with product and backend teams, mentor when I can,
              and leave clear docs and handoffs. Accessibility, RBAC, and
              performance (code splitting, lazy loading, Web Vitals) are part of
              the job, not extras.
            </p>
          </div>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <h3 className="text-sm font-medium text-foreground">
              What I bring
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex gap-2">
                <span className="shrink-0 font-mono text-accent">{"->"}</span>
                Next.js web, NestJS APIs, and Expo React Native apps
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 font-mono text-accent">{"->"}</span>
                Products shipped to UAT and production: healthcare, insurance,
                fintech, edtech
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 font-mono text-accent">{"->"}</span>
                Offline-first POS, RBAC dashboards, and high-volume transaction UI
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 font-mono text-accent">{"->"}</span>
                Clear communication: documentation, mentorship, and team
                handoffs
              </li>
            </ul>
            <p className="mt-6 rounded-xl bg-accent/10 p-4 text-sm text-foreground/90">
              {site.confidentialNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
