"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Code2, ExternalLink, Images, Lock, Play } from "lucide-react";
import {
  projects,
  projectCategories,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { canRequestLiveDemo, getLiveDemoUrl } from "@/lib/project-links";
import { site } from "@/data/site";
import { SectionHeading } from "./SectionHeading";
import { CuratedProjects } from "./CuratedProjects";
import { DemoRequestModal } from "./DemoRequestModal";
import { ProjectPreviewModal } from "./ProjectPreviewModal";
import { ProjectUIShowcase } from "./ProjectUIShowcase";

const categoryColors: Record<string, string> = {
  healthcare: "text-emerald-600 dark:text-emerald-400",
  insurance: "text-sky-600 dark:text-sky-400",
  fintech: "text-amber-600 dark:text-amber-400",
  edtech: "text-pink-600 dark:text-pink-400",
  enterprise: "text-violet-600 dark:text-violet-400",
  personal: "text-teal-600 dark:text-teal-400",
};

function ProjectCard({
  project,
  onRequestDemo,
  onPreview,
}: {
  project: Project;
  onRequestDemo: (p: Project) => void;
  onPreview: (p: Project) => void;
}) {
  const liveUrl = getLiveDemoUrl(project);
  const requestDemo = canRequestLiveDemo(project);

  return (
    <article className="glass group flex flex-col overflow-hidden rounded-2xl transition hover:border-accent/30">
      <button
        type="button"
        onClick={() => onPreview(project)}
        className="relative aspect-[16/10] w-full overflow-hidden border-b border-border"
      >
        <Image
          src={project.coverImage}
          alt={project.coverAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-lg backdrop-blur transition group-hover:opacity-100">
          <Images size={14} />
          View UI ({project.uiScreenshots.length})
        </span>
        {(project.confidential || project.discontinued) && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-muted backdrop-blur">
            <Lock size={10} />
            {project.discontinued ? "Discontinued" : "NDA"}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-6">
        <div>
          <span
            className={`text-xs font-medium uppercase tracking-wide ${categoryColors[project.category] ?? "text-muted"}`}
          >
            {project.category}
          </span>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {project.title}
          </h3>
          <p className="text-sm text-muted">{project.subtitle}</p>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted">{project.problem}</p>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-muted/90">
          <span className="font-medium text-foreground/80">My role: </span>
          {project.role}
        </p>

        <ul className="mt-4 space-y-1.5">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-2 text-xs text-muted">
              <span className="shrink-0 font-mono text-accent">{"->"}</span>
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-[10px] text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-4">
          <button
            type="button"
            onClick={() => onPreview(project)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition hover:bg-surface-hover"
          >
            <Images size={12} /> UI preview
          </button>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-4 py-2 text-xs font-medium text-accent transition hover:bg-accent/25"
            >
              Live demo <ExternalLink size={12} />
            </a>
          )}
          {requestDemo && (
            <button
              type="button"
              onClick={() => onRequestDemo(project)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition hover:bg-surface-hover"
            >
              <Play size={12} /> Request live demo
            </button>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition hover:bg-surface-hover"
            >
              <Code2 size={12} /> Source
            </a>
          )}
          {!project.confidential &&
            project.category === "personal" &&
            !project.repoUrl && (
              <a
                href={site.github[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted transition hover:bg-surface-hover"
              >
                <Code2 size={12} /> GitHub
              </a>
            )}
        </div>
        {project.year && (
          <p className="mt-3 text-[10px] text-muted/70">{project.year}</p>
        )}
      </div>
    </article>
  );
}

export function Work() {
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const [demoProject, setDemoProject] = useState<Project | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <>
      <ProjectUIShowcase onOpenPreview={setPreviewProject} />

      <CuratedProjects
        onPreview={setPreviewProject}
        onRequestDemo={setDemoProject}
      />

      <section id="work" className="section-pad section-divider">
        <SectionHeading
          eyebrow="All projects"
          title="Full project library"
          description="All projects with problem, role, stack, and links. Live demos where hosted; private demos for NDA work. Tenzi is discontinued with no live site."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                filter === cat.id
                  ? "bg-accent text-background shadow-sm"
                  : "glass text-muted hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onRequestDemo={setDemoProject}
              onPreview={setPreviewProject}
            />
          ))}
        </div>

        <DemoRequestModal
          project={demoProject}
          onClose={() => setDemoProject(null)}
        />
        <ProjectPreviewModal
          project={previewProject}
          onClose={() => setPreviewProject(null)}
        />
      </section>
    </>
  );
}
