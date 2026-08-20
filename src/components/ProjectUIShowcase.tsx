"use client";

import { useState } from "react";
import Image from "next/image";
import { Layout, Smartphone } from "lucide-react";
import { featuredProjects, type Project } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";
import { BrowserFrame } from "./BrowserFrame";
import { ProjectVisual } from "./ProjectVisual";
import { isMobileShot, projectVisuals } from "@/lib/images";

type Props = {
  onOpenPreview: (project: Project) => void;
};

export function ProjectUIShowcase({ onOpenPreview }: Props) {
  const [activeId, setActiveId] = useState(featuredProjects[0]?.id ?? "");

  const active =
    featuredProjects.find((p) => p.id === activeId) ?? featuredProjects[0];

  if (!active) return null;

  const pair = projectVisuals(active.id);
  const firstShot = active.uiScreenshots[0];
  const isMobile = Boolean(pair.mobile) && !pair.desktop;

  return (
    <section
      id="showcase"
      className="section-pad section-divider bg-surface/30"
    >
      <SectionHeading
        eyebrow="Interface design"
        title="How the products feel"
        description="Screens from featured work. Open a project to flip through the UI."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {featuredProjects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => setActiveId(project.id)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition ${
              activeId === project.id
                ? "bg-accent text-background shadow-md"
                : "glass text-muted hover:text-foreground"
            }`}
          >
            {project.title}
          </button>
        ))}
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs text-muted">
            {isMobile ? (
              <>
                <Smartphone size={14} className="text-accent" />
                Mobile-first UI patterns
              </>
            ) : (
              <>
                <Layout size={14} className="text-accent" />
                Dashboard & workflow UI
              </>
            )}
          </div>

          {pair.desktop && pair.mobile ? (
            <ProjectVisual
              projectId={active.id}
              title={active.title}
              coverSrc={active.coverImage}
              coverAlt={active.coverAlt}
            />
          ) : isMobile ? (
            <div className="flex justify-center">
              <div className="relative h-[340px] w-[170px]">
                <Image
                  src={firstShot?.src ?? active.coverImage}
                  alt={active.coverAlt}
                  fill
                  className="object-contain object-center"
                  sizes="170px"
                  priority
                />
              </div>
            </div>
          ) : (
            <BrowserFrame
              src={firstShot?.src ?? active.coverImage}
              alt={active.coverAlt}
              url={`${active.id}.product`}
              priority
            />
          )}

          <button
            type="button"
            onClick={() => onOpenPreview(active)}
            className="mt-5 w-full rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition hover:bg-surface-hover sm:w-auto"
          >
            View all {active.uiScreenshots.length} screens
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-accent">
              {active.category}
            </span>
            <h3 className="mt-1 text-2xl font-semibold text-foreground">
              {active.title}
            </h3>
            <p className="text-sm text-muted">{active.subtitle}</p>
          </div>
          <p className="leading-relaxed text-muted">{active.description}</p>

          <ul className="space-y-2">
            {active.highlights.slice(0, 4).map((h) => (
              <li key={h} className="flex gap-2 text-sm text-muted">
                <span className="shrink-0 font-mono text-accent">{"->"}</span>
                {h}
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {active.uiScreenshots.slice(0, 4).map((shot) => {
              const mobile = isMobileShot(shot.src, shot.device);
              return (
                <button
                  key={shot.src}
                  type="button"
                  onClick={() => onOpenPreview(active)}
                  className={`group relative overflow-hidden rounded-xl border border-border bg-card transition hover:border-accent/40 ${
                    mobile ? "aspect-[9/16]" : "aspect-video"
                  }`}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-contain object-top"
                    sizes="240px"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent px-2 py-2 text-left text-[10px] text-foreground">
                    {shot.caption}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
