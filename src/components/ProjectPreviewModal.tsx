"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, Play, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { canRequestLiveDemo, getLiveDemoUrl } from "@/lib/project-links";
import { BrowserFrame } from "./BrowserFrame";
import { isMobileShot } from "@/lib/images";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectPreviewModal({ project, onClose }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [project?.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setIndex((i) => (i + 1) % project.uiScreenshots.length);
      if (e.key === "ArrowLeft")
        setIndex(
          (i) =>
            (i - 1 + project.uiScreenshots.length) %
            project.uiScreenshots.length
        );
    };
    document.body.style.overflow = project ? "hidden" : "";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const shots = project.uiScreenshots;
  const current = shots[index];
  const mobile = isMobileShot(current.src, current.device);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        aria-label="Close preview"
        onClick={onClose}
      />
      <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              UI preview
            </p>
            <h3 id="preview-title" className="text-lg font-semibold text-foreground">
              {project.title}
            </h3>
            <p className="text-sm text-muted">{project.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted transition hover:bg-surface-hover hover:text-foreground"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6">
          {mobile ? (
            <div className="flex justify-center">
              <div className="relative h-[min(70vh,560px)] w-full max-w-[280px]">
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  className="object-contain object-center"
                  sizes="280px"
                  priority
                />
              </div>
            </div>
          ) : (
            <BrowserFrame
              src={current.src}
              alt={current.alt}
              url={`${project.id}.demo`}
              priority
            />
          )}
          <p className="mt-3 text-center text-sm text-muted">{current.caption}</p>

          {shots.length > 1 && (
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setIndex((i) => (i - 1 + shots.length) % shots.length)
                }
                className="rounded-full border border-border p-2 text-muted hover:bg-surface-hover hover:text-foreground"
                aria-label="Previous screen"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="font-mono text-xs text-muted">
                {index + 1} / {shots.length}
              </span>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % shots.length)}
                className="rounded-full border border-border p-2 text-muted hover:bg-surface-hover hover:text-foreground"
                aria-label="Next screen"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {shots.map((shot, i) => {
              const shotMobile = isMobileShot(shot.src, shot.device);
              return (
                <button
                  key={shot.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`relative overflow-hidden rounded-lg border-2 bg-surface transition ${
                    shotMobile ? "aspect-[9/16]" : "aspect-video"
                  } ${
                    i === index
                      ? "border-accent ring-2 ring-accent/30"
                      : "border-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-contain object-top"
                    sizes="120px"
                  />
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
            {getLiveDemoUrl(project) && (
              <a
                href={getLiveDemoUrl(project)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1.5 text-xs font-medium text-accent"
              >
                Live demo <ExternalLink size={12} />
              </a>
            )}
            {canRequestLiveDemo(project) && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted">
                <Play size={12} /> Live demo on request
              </span>
            )}
            {project.discontinued && (
              <span className="text-xs text-muted">No live environment (discontinued)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
