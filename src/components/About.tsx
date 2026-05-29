import Image from "next/image";
import { SectionHeading } from "./SectionHeading";
import { site } from "@/data/site";
import { siteImages } from "@/lib/images";

export function About() {
  return (
    <section id="about" className="section-pad section-divider">
      <SectionHeading
        eyebrow="About me"
        title="The person behind the code"
        description="A bit about my background and how I like to work."
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
              I am a frontend engineer in Nairobi, Kenya. I like taking messy
              workflows and turning them into clear screens, whether that is a
              healthcare referral flow, an insurance admin console, or a mobile
              wallet.
            </p>
            <p>
              Over the last few years I have worked on healthcare (KISRS),
              insurance admin and agents portals, fintech (e-Sahal), edtech
              (Upeo CBC), carbon reporting, and a few personal apps. I am
              comfortable with UI/UX work and with the engineering side: RBAC,
              dashboards, offline-first patterns, and keeping apps fast.
            </p>
            <p>
              I work closely with backend developers and product teams, mentor
              when I can, and try to leave clear docs and handoffs behind.
            </p>
          </div>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <h3 className="text-sm font-medium text-foreground">
              What I bring
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex gap-2">
                <span className="shrink-0 font-mono text-accent">{"->"}</span>
                End-to-end ownership from wireframes to production UI
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 font-mono text-accent">{"->"}</span>
                Design systems, MUI/Tailwind, and WCAG-minded accessibility
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 font-mono text-accent">{"->"}</span>
                Offline-first and high-volume transaction experience (POS,
                fintech)
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
