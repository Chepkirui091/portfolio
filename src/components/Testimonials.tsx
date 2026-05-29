import { referencesNote, testimonials } from "@/data/testimonials";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  return (
    <section id="testimonials" className="section-pad section-divider">
      <SectionHeading
        eyebrow="Social proof"
        title="What people say"
        description="App store-style feedback from e-Sahal users, plus notes from teams I have worked with on enterprise and freelance projects."
      />

      {testimonials.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote
              key={`${t.name}-${t.date ?? t.role}`}
              className="glass flex flex-col rounded-2xl p-6 sm:p-8"
            >
              {t.project && (
                <p className="mb-3 font-mono text-[10px] uppercase tracking-wide text-accent">
                  {t.project}
                  {t.date ? ` · ${t.date}` : ""}
                </p>
              )}
              <p className="text-sm leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </p>
              {t.originalQuote && (
                <p className="mt-3 text-xs italic leading-relaxed text-muted">
                  Original: &ldquo;{t.originalQuote}&rdquo;
                </p>
              )}
              <footer className="mt-auto border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      ) : (
        <p className="glass max-w-2xl rounded-2xl p-6 text-sm leading-relaxed text-muted">
          {referencesNote}
        </p>
      )}

      <p className="mt-8 text-center text-xs text-muted">{referencesNote}</p>
    </section>
  );
}
