"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, Link2, Mail } from "lucide-react";
import { site } from "@/data/site";
import { siteImages } from "@/lib/images";
import { BrowserFrame } from "./BrowserFrame";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-28">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full blur-[100px]"
        style={{ background: "var(--hero-glow)" }}
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-20 h-64 w-64 rounded-full blur-[90px]"
        style={{ background: "var(--hero-glow-secondary)" }}
      />

      <div className="section-pad relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 font-mono text-sm text-accent"
            >
              {site.location} &middot; Available for opportunities
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.25rem]"
            >
              I build{" "}
              <span className="text-gradient">full-stack</span> web and mobile
              products: Next.js on the web, NestJS on the API, Expo on mobile.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
            >
              {site.name} - {site.title}. {site.tagline}. Healthcare, insurance,
              fintech, edtech, and marketplace products shipped to production
              and UAT.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-background shadow-md transition hover:opacity-90"
              >
                View my work
              </a>
              <a
                href={`mailto:${site.email}?subject=Portfolio%20demo%20request`}
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground transition hover:bg-surface-hover"
              >
                <Mail size={16} />
                Request a demo
              </a>
              {site.linkedin && (
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-muted transition hover:text-foreground"
                >
                  <Link2 size={16} />
                  LinkedIn
                </a>
              )}
              {site.github.map((g) => (
                <a
                  key={g.url}
                  href={g.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-muted transition hover:text-foreground"
                >
                  <Code2 size={16} />
                  {g.label}
                </a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {[
                { value: "3+", label: "Years experience" },
                { value: "10+", label: "Products shipped" },
                { value: "6", label: "Industries" },
                { value: "2", label: "GitHub profiles" },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-4">
                  <p className="text-2xl font-semibold text-gradient">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent/20 to-purple-500/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-2xl">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={siteImages.avatar}
                    alt={`${site.name}, full-stack software developer`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 420px"
                    priority
                  />
                </div>
                <div className="border-t border-border bg-surface/80 px-5 py-4 backdrop-blur">
                  <p className="font-semibold text-foreground">{site.name}</p>
                  <p className="text-sm text-muted">{site.title}</p>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-4 hidden w-[58%] sm:block lg:-left-10">
                <BrowserFrame
                  src="/static/isrs/kisrs-landing-page.png"
                  alt="KISRS healthcare referral dashboard"
                  url="uat.isrs.co.ke"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
