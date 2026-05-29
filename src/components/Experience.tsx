import { experience } from "@/data/experience";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="section-pad section-divider">
      <SectionHeading
        eyebrow="Experience"
        title="Where I have built"
        description="Professional journey across product companies and freelance engagements."
      />
      <div className="space-y-6">
        {experience.map((item, i) => (
          <div key={`${item.company}-${i}`}>
            <div className="glass rounded-2xl p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-foreground">{item.role}</h3>
                  <p className="text-sm text-accent">{item.company}</p>
                </div>
                <p className="font-mono text-xs text-muted">
                  {item.period}, {item.location}
                </p>
              </div>
              <ul className="mt-4 space-y-2">
                {item.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-muted">
                    <span className="shrink-0 font-mono text-accent">{"->"}</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
