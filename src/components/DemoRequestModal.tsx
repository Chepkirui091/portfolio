"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { site } from "@/data/site";
import type { Project } from "@/data/projects";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export function DemoRequestModal({ project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = project ? "hidden" : "";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const subject = encodeURIComponent(`Demo request: ${project.title}`);
  const body = encodeURIComponent(
    `Hi Daphne,\n\nI would like a demo of "${project.title}" (${project.subtitle}).\n\nMy role/company:\n\nThanks,`
  );
  const mailto = `mailto:${site.email}?subject=${subject}&body=${body}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="glass relative w-full max-w-md rounded-2xl p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted hover:bg-surface-hover hover:text-foreground"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>
        <p className="font-mono text-xs uppercase tracking-wider text-accent">
          Confidential project
        </p>
        <h3 id="demo-title" className="mt-2 text-xl font-semibold">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-muted">{project.subtitle}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          This platform is under client confidentiality. Email me to arrange a
          private demo tailored to your hiring or partnership context.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={mailto}
            className="flex-1 rounded-full bg-accent py-3 text-center text-sm font-medium text-background"
          >
            Email demo request
          </a>
          <a
            href={`https://wa.me/254111620160?text=${encodeURIComponent(`Hi Daphne, I'd like a demo of ${project.title}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass flex-1 rounded-full py-3 text-center text-sm font-medium text-foreground"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
