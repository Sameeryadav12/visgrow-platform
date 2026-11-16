import type { WorkshopQuote } from "@/lib/workshop-feedback";

/**
 * Real workshop feedback, quoted exactly, attributed to an event rather than
 * a named person. See src/lib/workshop-feedback.ts for the publication rules.
 */
export default function WorkshopFeedback({
  eyebrow = "In their words",
  heading,
  quotes,
}: {
  eyebrow?: string;
  heading: string;
  quotes: WorkshopQuote[];
}) {
  return (
    <section className="bg-brand-lavender py-20 reveal" aria-label={heading}>
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="mb-10 max-w-[680px]">
          <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
            {eyebrow}
          </span>
          <h2 className="text-[clamp(28px,3.6vw,42px)] text-[var(--color-ink)]">
            {heading}
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {quotes.map((q) => (
            <figure
              key={q.quote}
              className="flex flex-col rounded-[18px] border border-[var(--color-line)] bg-white p-6 card-lift"
            >
              <blockquote className="mb-5 text-[14.5px] leading-[1.65] text-[var(--color-ink)]">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto border-t border-[var(--color-line)] pt-3 text-[12px] font-semibold text-brand-sub">
                {q.source}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-6 text-[12px] leading-relaxed text-brand-sub">
          Feedback from individual workshop attendees, shared with their
          consent. These are personal views, not endorsements by the host
          organisations, and individual results vary.
        </p>
      </div>
    </section>
  );
}
