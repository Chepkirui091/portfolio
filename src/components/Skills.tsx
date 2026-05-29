import { skillGroups } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="section-pad section-divider">
      <SectionHeading
        eyebrow="Technical skills"
        title="Skills"
        description="Languages, frameworks, tools, and testing."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.title} className="glass rounded-2xl p-6">
            <h3 className="text-sm font-medium text-foreground">
              {group.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
