"use client";

import { useState } from "react";
import { Download, FileText, Send } from "lucide-react";
import { site } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const message = fd.get("message") as string;
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section-pad section-divider">
      <SectionHeading
        eyebrow="Contact"
        title="Let's work together"
        description="Reach out for roles, contracts, or a live demo of enterprise work. I respond within one to two business days."
      />
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-muted">Email</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 block font-medium text-accent hover:underline"
            >
              {site.email}
            </a>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-muted">Phone / WhatsApp</p>
            <a
              href="https://wa.me/254111620160"
              className="mt-1 block font-medium text-foreground hover:text-accent"
            >
              {site.phone}
            </a>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-muted">GitHub</p>
            <ul className="mt-2 space-y-1">
              {site.github.map((g) => (
                <li key={g.url}>
                  <a
                    href={g.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline"
                  >
                    {g.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {site.linkedin ? (
            <div className="glass rounded-2xl p-6">
              <p className="text-sm text-muted">LinkedIn</p>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-sm font-medium text-accent hover:underline"
              >
                Professional profile
              </a>
            </div>
          ) : null}
          <a
            href={site.resumePath}
            download
            className="glass flex items-center gap-3 rounded-2xl p-6 transition hover:border-accent/30"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <FileText size={20} />
            </span>
            <span>
              <p className="text-sm font-medium text-foreground">
                Download resume
              </p>
              <p className="text-xs text-muted">PDF · ATS-friendly format</p>
            </span>
            <Download size={16} className="ml-auto text-muted" />
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-6 sm:p-8 lg:col-span-3"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs text-muted">Name</span>
              <input
                name="name"
                required
                className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              />
            </label>
            <label className="block">
              <span className="text-xs text-muted">Your email</span>
              <input
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="text-xs text-muted">Message</span>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell me about the role, or which projects you'd like to see in a demo..."
              className="mt-1 w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            />
          </label>
          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-medium text-background sm:w-auto sm:px-8"
          >
            <Send size={16} />
            {sent ? "Opening your email client…" : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}
