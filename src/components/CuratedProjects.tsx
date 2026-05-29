"use client";

import Image from "next/image";
import {
  ExternalLink,
  Code2,
  Images,
  Lock,
  Play,
} from "lucide-react";
import { featuredProjects, type Project } from "@/data/projects";
import { canRequestLiveDemo, getLiveDemoUrl } from "@/lib/project-links";
import { SectionHeading } from "./SectionHeading";
import { site } from "@/data/site";

function ProjectImage({
  project,
  onPreview,
  imageOnRight,
}: {
  project: Project;
  onPreview: (p: Project) => void;
  imageOnRight: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onPreview(project)}
      className={`group relative aspect-[16/10] min-h-[220px] w-full overflow-hidden border-border sm:min-h-[260px] lg:aspect-auto lg:min-h-[300px] ${
        imageOnRight
          ? "border-b lg:order-2 lg:border-b-0 lg:border-l"
          : "border-b lg:order-1 lg:border-b-0 lg:border-r"
      }`}
    >
      <Image
        src={project.coverImage}
        alt={project.coverAlt}
        fill
        className="object-cover transition duration-500 group-hover:scale-[1.02]"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium opacity-0 shadow-lg backdrop-blur transition group-hover:opacity-100">
        <Images size={14} />
        View UI
      </span>
      {project.confidential && (
        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-muted backdrop-blur">
          <Lock size={10} /> NDA
        </span>
      )}
    </button>
  );
}

function ProjectDetails({
  project,
  onPreview,
  onRequestDemo,
  imageOnRight,
}: {
  project: Project;
  onPreview: (p: Project) => void;
  onRequestDemo: (p: Project) => void;
  imageOnRight: boolean;
}) {
  const liveUrl = getLiveDemoUrl(project);
  const requestDemo = canRequestLiveDemo(project);

  return (
    <div
      className={`flex flex-col justify-center p-6 sm:p-8 lg:p-10 ${
        imageOnRight ? "lg:order-1" : "lg:order-2"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent">
          Featured
        </span>
        {project.year && (
          <span className="text-[10px] text-muted">{project.year}</span>
        )}
        {project.discontinued && (
          <span className="text-[10px] text-muted">Discontinued</span>
        )}
      </div>

      <h3 className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">
        {project.title}
      </h3>
      <p className="text-sm text-muted">{project.subtitle}</p>

      <div className="mt-5 space-y-4 text-sm">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            The problem
          </p>
          <p className="mt-1 leading-relaxed text-muted">{project.problem}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            My role
          </p>
          <p className="mt-1 leading-relaxed text-muted">{project.role}</p>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          Tech stack
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-[10px] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-medium text-background transition hover:opacity-90"
          >
            Live demo <ExternalLink size={12} />
          </a>
        )}
        {requestDemo && (
          <button
            type="button"
            onClick={() => onRequestDemo(project)}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-4 py-2 text-xs font-medium text-accent transition hover:bg-accent/25"
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
            <Code2 size={12} /> Source code
          </a>
        )}
        {!project.confidential &&
          project.category === "personal" &&
          !project.repoUrl && (
            <a
              href={site.github[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted transition hover:bg-surface-hover hover:text-foreground"
            >
              <Code2 size={12} /> GitHub profile
            </a>
          )}
        {project.confidential && !project.repoUrl && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs text-muted">
            <Code2 size={12} /> Source private (NDA)
          </span>
        )}
        <button
          type="button"
          onClick={() => onPreview(project)}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition hover:bg-surface-hover"
        >
          <Images size={12} /> UI screens
        </button>
      </div>
    </div>
  );
}

function CuratedCard({
  project,
  index,
  onPreview,
  onRequestDemo,
}: {
  project: Project;
  index: number;
  onPreview: (p: Project) => void;
  onRequestDemo: (p: Project) => void;
}) {
  const imageOnRight = index % 2 === 1;

  return (
    <article className="glass overflow-hidden rounded-2xl">
      <div className="grid lg:grid-cols-2">
        <ProjectImage
          project={project}
          onPreview={onPreview}
          imageOnRight={imageOnRight}
        />
        <ProjectDetails
          project={project}
          onPreview={onPreview}
          onRequestDemo={onRequestDemo}
          imageOnRight={imageOnRight}
        />
      </div>
    </article>
  );
}

type Props = {
  onPreview: (p: Project) => void;
  onRequestDemo: (p: Project) => void;
};

export function CuratedProjects({ onPreview, onRequestDemo }: Props) {
  return (
    <section id="featured" className="section-pad section-divider">
      <SectionHeading
        eyebrow="Featured work"
        title="Curated projects"
        description="Five recent projects with the problem, my role, stack, and links. Public demos where hosted; private demos for NDA work. Tenzi is discontinued with no live site."
      />

      <div className="space-y-10 lg:space-y-14">
        {featuredProjects.map((project, index) => (
          <CuratedCard
            key={project.id}
            project={project}
            index={index}
            onPreview={onPreview}
            onRequestDemo={onRequestDemo}
          />
        ))}
      </div>
    </section>
  );
}
