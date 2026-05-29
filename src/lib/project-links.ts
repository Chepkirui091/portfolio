import type { Project } from "@/data/projects";

export function getLiveDemoUrl(project: Project): string | undefined {
  if (project.discontinued) return undefined;
  return project.liveUrl ?? project.uatUrl;
}

export function canRequestLiveDemo(project: Project): boolean {
  return (
    !project.discontinued &&
    !getLiveDemoUrl(project) &&
    project.liveDemoOnRequest === true
  );
}
