"use client";

import { useState, useEffect } from "react";
import { Download, Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-border py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#" className="font-semibold tracking-tight text-foreground">
          DC<span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <a
            href={site.resumePath}
            download
            className="hidden text-sm text-muted transition hover:text-foreground lg:inline"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
          >
            Hire me
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-lg p-2 text-foreground"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="glass mx-4 mt-3 flex flex-col gap-1 rounded-2xl p-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-surface-hover hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.resumePath}
            download
            className="rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-surface-hover hover:text-foreground"
            onClick={() => setOpen(false)}
          >
            <span className="inline-flex items-center gap-2">
              <Download size={14} /> Resume
            </span>
          </a>
          <a
            href="#contact"
            className="mt-2 rounded-full bg-accent px-4 py-2.5 text-center text-sm font-medium text-background"
            onClick={() => setOpen(false)}
          >
            Hire me
          </a>
        </nav>
      )}
    </header>
  );
}
