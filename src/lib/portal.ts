import { getPayload } from "payload";
import config from "@payload-config";
import type { Student, Program, StudentDocument, CoachingSession } from "@/payload-types";

/**
 * Everything the portal needs about one signed-in customer.
 *
 * All reads happen here, server-side, with the server's own credentials —
 * and every query is scoped to the student id from the verified session
 * cookie. The collections themselves stay admin-only for reads, so there is
 * no public API path to someone else's resume or session notes.
 */

export type PortalData = {
  programs: Program[];
  documents: StudentDocument[];
  upcoming: CoachingSession[];
  past: CoachingSession[];
  hasAccelerator: boolean;
};

/** Program slugs that unlock the day-by-day lesson area. */
const ACCELERATOR_SLUGS = ["14-day-accelerator"];

export async function getPortalData(student: Student): Promise<PortalData> {
  const empty: PortalData = {
    programs: [],
    documents: [],
    upcoming: [],
    past: [],
    hasAccelerator: false,
  };

  // Belt and braces. The pages guard with requireStudent(), but this is
  // exported and a future caller shouldn't be able to bring a page down by
  // passing nothing.
  if (!student?.id) return empty;

  try {
    const payload = await getPayload({ config });

    const [programs, documents, sessions] = await Promise.all([
      // Their programs. depth 0 on the student means these come back as ids.
      (async () => {
        const ids = (student.programs ?? [])
          .map((p) => (typeof p === "object" ? p.id : p))
          .filter(Boolean);
        if (!ids.length) return [];
        const found = await payload.find({
          collection: "programs",
          where: { id: { in: ids } },
          limit: 20,
          depth: 0,
        });
        return found.docs as Program[];
      })(),

      payload.find({
        collection: "student-documents",
        where: { student: { equals: student.id } },
        sort: "-createdAt",
        limit: 100,
        depth: 0,
      }),

      payload.find({
        collection: "coaching-sessions",
        where: { student: { equals: student.id } },
        sort: "scheduledFor",
        limit: 100,
        depth: 0,
      }),
    ]);

    const now = Date.now();
    const all = sessions.docs as CoachingSession[];

    return {
      programs,
      documents: documents.docs as StudentDocument[],
      // Cancelled sessions are dropped rather than shown crossed out — a
      // cancelled slot on a dashboard reads as a broken promise.
      upcoming: all.filter(
        (s) => s.status === "booked" && new Date(s.scheduledFor).getTime() >= now,
      ),
      past: all
        .filter(
          (s) =>
            s.status === "done" ||
            (s.status === "booked" && new Date(s.scheduledFor).getTime() < now),
        )
        .reverse(),
      hasAccelerator: programs.some((p) => ACCELERATOR_SLUGS.includes(p.slug)),
    };
  } catch {
    // A portal that loads with less in it beats a portal that 500s.
    return empty;
  }
}

export const formatWhen = (iso: string) =>
  new Date(iso).toLocaleString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });

export const formatDay = (iso: string) =>
  new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
