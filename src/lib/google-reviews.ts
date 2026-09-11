/**
 * Real Google reviews, pulled from the Google Places API.
 *
 * Two rules this file exists to enforce:
 *
 * 1. **Nothing is ever invented.** There is no fallback list of sample
 *    reviews, no "example" data, no seeded placeholder. If Google returns
 *    nothing, the component renders nothing. Writing fake reviews — or
 *    presenting anything as a Google review that Google didn't supply — is
 *    illegal under the Australian Consumer Law, and it would also be a
 *    forgery of Google's brand. The absence of a fallback here is the
 *    feature.
 *
 * 2. **It fails quietly.** Google being slow or rate-limited must never take
 *    down a page that sells things. Any error returns null and the section
 *    disappears.
 *
 * Set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID to switch it on. Until then
 * this returns null and nothing about the site changes.
 */

export type GoogleReview = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhoto?: string;
};

export type GoogleReviewsData = {
  rating: number;
  total: number;
  url: string;
  reviews: GoogleReview[];
};

type PlacesReview = {
  authorAttribution?: { displayName?: string; photoUri?: string };
  rating?: number;
  originalText?: { text?: string };
  text?: { text?: string };
  relativePublishTimeDescription?: string;
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  // Not configured yet. This is the normal state until Mustafa supplies
  // his Business Profile details — not an error.
  if (!key || !placeId) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask":
            "rating,userRatingCount,googleMapsUri,reviews",
        },
        // Google's terms don't allow storing review content long-term, and
        // an hour is fresh enough for a rating that moves a few times a year.
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      console.error("[visgrow:reviews] Places API returned", res.status);
      return null;
    }

    const data = (await res.json()) as PlacesResponse;
    if (!data.rating || !data.userRatingCount) return null;

    const reviews: GoogleReview[] = (data.reviews ?? [])
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Google reviewer",
        rating: r.rating ?? 0,
        text: (r.originalText?.text ?? r.text?.text ?? "").trim(),
        relativeTime: r.relativePublishTimeDescription ?? "",
        profilePhoto: r.authorAttribution?.photoUri,
      }))
      // A five-star rating with no words isn't worth the space.
      .filter((r) => r.text.length > 40)
      .slice(0, 6);

    return {
      rating: data.rating,
      total: data.userRatingCount,
      url: data.googleMapsUri ?? "",
      reviews,
    };
  } catch (err) {
    console.error("[visgrow:reviews] could not load Google reviews:", err);
    return null;
  }
}
