"use client";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export default function TestimonialCarousel({
  items,
}: {
  items: Testimonial[];
}) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max gap-6 animate-[scrollX_46s_linear_infinite] hover:[animation-play-state:paused]">
        {doubled.map((t, i) => (
          <figure
            key={`${t.name}-${i}`}
            className="w-[340px] shrink-0 rounded-2xl border border-[var(--color-line)] bg-white p-7 shadow-[0_10px_30px_rgba(36,26,51,0.05)]"
          >
            <div className="mb-4 text-[13px] tracking-[3px] text-brand-orange">
              ★★★★★
            </div>
            <blockquote className="mb-6 text-[14px] leading-relaxed text-[var(--color-ink)]">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-[14px] font-bold text-white">
                {t.name.charAt(0)}
              </span>
              <span>
                <span className="block text-[13.5px] font-bold text-[var(--color-ink)]">
                  {t.name}
                </span>
                <span className="block text-[12px] text-brand-sub">
                  {t.role}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
