import { getGoogleReviews } from "@/lib/google-reviews";

/**
 * The Google reviews strip.
 *
 * A server component that renders nothing at all when there are no real
 * reviews to show. No skeleton, no "reviews coming soon", no placeholder —
 * an empty reviews section advertises that nobody has reviewed you.
 *
 * Every word shown here came from Google. Nothing on this page is written
 * by us and presented as a customer's opinion.
 */

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span
      className="inline-flex gap-0.5"
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i <= rounded ? "fill-brand-orange" : "fill-[var(--color-line)]"}`}
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

export default async function GoogleReviews({
  heading = "What people actually say",
}: {
  heading?: string;
}) {
  const data = await getGoogleReviews();
  if (!data || data.reviews.length === 0) return null;

  return (
    <section
      className="bg-white py-20 reveal"
      aria-labelledby="google-reviews-heading"
    >
      <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
        <div className="mx-auto mb-10 max-w-[640px] text-center">
          <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-purple">
            Verified on Google
          </span>
          <h2
            id="google-reviews-heading"
            className="mb-5 text-[clamp(26px,3.4vw,40px)] leading-[1.1] text-[var(--color-ink)]"
          >
            {heading}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span
              className="text-[30px] text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {data.rating.toFixed(1)}
            </span>
            <Stars rating={data.rating} />
            <span className="text-[13.5px] font-semibold text-brand-sub">
              from {data.total} Google review{data.total === 1 ? "" : "s"}
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.reviews.map((r, i) => (
            <figure
              key={`${r.author}-${i}`}
              className="flex flex-col rounded-[18px] border border-[var(--color-line)] bg-white p-6 card-lift"
            >
              <Stars rating={r.rating} />
              <blockquote className="mt-4 mb-5 flex-1 text-[14.5px] leading-[1.7] text-brand-sub">
                {r.text}
              </blockquote>
              <figcaption className="text-[13px] font-extrabold text-[var(--color-ink)]">
                {r.author}
                {r.relativeTime && (
                  <span className="ml-2 font-semibold text-brand-sub">
                    · {r.relativeTime}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        {data.url && (
          <p className="mt-8 text-center">
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13.5px] font-extrabold text-brand-purple underline-offset-4 hover:underline"
            >
              Read all reviews on Google →
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
