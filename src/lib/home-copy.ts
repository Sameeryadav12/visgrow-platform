import { getPayload } from "payload";
import config from "@payload-config";

/**
 * The home page's copy, with the current wording as the fallback for every
 * field. If Mustafa clears a field in the admin, or the database is
 * unreachable, the page renders exactly as it does today rather than
 * showing a gap.
 */

export const homeDefaults = {
  ticker: { caption: "Where our clients have landed roles" },

  pain: {
    eyebrow: "Let's be honest",
    heading: "A degree doesn't get you hired anymore.",
    items: [
      {
        icon: "😟",
        title: "Rejected again — or worse, ignored",
        body: "You've rewritten the resume a dozen times. Still no interviews. Often, not even a reply.",
      },
      {
        icon: "⏳",
        title: "The clock is running",
        body: "Your visa has a deadline. Your migration agent keeps asking. Every month without an offer costs you options you can't get back.",
      },
      {
        icon: "🔒",
        title: "No local experience",
        body: "Every role wants experience. Nobody wants to give you the first chance to get it.",
      },
      {
        icon: "📵",
        title: "LinkedIn goes nowhere",
        body: "You post, you connect, you apply. Nothing moves. Nobody engages.",
      },
      {
        icon: "🎓",
        title: "The degree wasn't enough",
        body: "You did everything they told you to do. Nobody mentioned this part.",
      },
      {
        icon: "🙃",
        title: "Everyone else seems to be getting hired",
        body: "You're happy for them. You're also quietly wondering what they know that you don't.",
      },
    ],
    card: {
      heading: "None of this is your fault.",
      paragraph:
        "You were told to get the degree and the job would follow. Nobody taught you how hiring actually works — not your university, not the careers desk handing out the same generic template to everyone in your cohort.",
      callout:
        "And the part nobody tells you: a large share of roles are never advertised at all. They get filled through people — a conversation, a referral, someone who already knows the work — long before anything reaches Seek. You've been competing for the visible jobs, against everyone else doing exactly the same thing.",
      closing:
        "It's a system nobody explained to you. We built the bridge across it.",
      ctaLabel: "See How It Works →",
    },
  },

  importance: {
    eyebrow: "Why this matters now",
    heading:
      "The first two years after graduation set the trajectory of your entire career.",
    body: "Employers don't hire qualifications — they hire people who can walk in and add value from day one. The graduates who understand that early move fast. The ones who don't spend years quietly losing ground they didn't know they were losing.",
    stats: [
      { value: "Most", label: "roles are filled before they're advertised" },
      { value: "Seconds", label: "is all your resume gets on the first pass" },
      { value: "1st", label: "impression decides the shortlist" },
      { value: "Early", label: "years set the trajectory of your career" },
    ],
  },

  benefits: {
    eyebrow: "The Visgrow method",
    heading: "Three pillars. One clear pathway.",
    body: "Career Coaching comes first — it's the foundation. Internships and workshops build on top of it, not the other way around.",
    pillars: [
      {
        number: "01 — Coaching",
        title: "Career Coaching",
        body: "Career Strategy & Gap Analysis, a resume that survives ATS, and interview coaching that builds genuine confidence — plus our signature 14-Day Accelerator.",
        href: "/students-graduates/career-coaching",
        ctaLabel: "Explore Career Coaching",
      },
      {
        number: "02 — Internships",
        title: "Hosted Internships",
        body: "Real, local, Visgrow-hosted work experience — supervised by us, never outsourced to a stranger. The premium next step once you're coached and ready.",
        href: "/students-graduates/hosted-internships",
        ctaLabel: "See what's included →",
      },
      {
        number: "03 — Academy",
        title: "Skills & Workshops",
        body: "Practical workshops on personal branding, networking and the hidden job market — the skills employers actually notice and reward.",
        href: "/academy",
        ctaLabel: "View Workshops",
      },
    ],
  },

  consequences: {
    eyebrow: "What happens if you wait",
    heading: "Every month without a plan is a month harder to explain.",
    items: [
      "Months turn into a year. Confidence erodes. You start applying for anything — not the career you actually wanted.",
      "You take a job unrelated to your degree just to pay rent, and it gets harder to leave the longer you stay.",
      "Employers start asking about the gap. It gets harder to explain every month it grows.",
    ],
    imageQuote: "“I'll sort it out next month.”",
    imageAttribution: "— the sentence that costs graduates a year.",
  },

  how: {
    steps: [
      {
        title: "Career Strategy & Gap Analysis",
        body: "We find the exact reason you're being passed over — before you spend money on anything else.",
      },
      {
        title: "Choose your pathway",
        body: "Coaching, the 14-Day Accelerator, or a Hosted Internship — based on what you actually need.",
      },
      {
        title: "Do the work, with us beside you",
        body: "Structured sessions, honest feedback, real accountability. Not a course you forget about.",
      },
      {
        title: "Walk in ready",
        body: "You'll know your story, your value, and how to prove both in the room.",
      },
    ],
  },

  results: {
    stats: [
      { value: 1000, suffix: "+", label: "Students coached" },
      { value: 20, suffix: "+", label: "Years founder industry experience" },
      { value: 20000, suffix: "+", label: "Professional network" },
      { value: 14, suffix: "", label: "Modules in the Career Accelerator" },
    ],
  },

  pricing: {
    eyebrow: "Pricing",
    heading: "Simple pricing. No surprises.",
    body: "Every program moves you toward the same goal — being genuinely job-ready. Start wherever makes sense for you.",
    footnote:
      "*Pricing is indicative and confirmed at your Career Strategy & Gap Analysis. Payment plans available on selected programs. No program guarantees a job offer — outcomes depend on your effort, the market, and role availability.",
  },

  faq: {
    eyebrow: "Questions? Answered.",
    heading: "The things everyone asks — answered honestly.",
  },
};

/** Returns a string from the CMS, or the current wording if it's blank. */
export const pick = (cms: unknown, fallback: string): string => {
  const v = typeof cms === "string" ? cms.trim() : "";
  return v || fallback;
};

/** Returns a CMS array if it has entries, or the current one if not. */
export function pickList<C, F>(cms: C[] | null | undefined, fallback: F[]): C[] | F[] {
  return cms && cms.length ? cms : fallback;
}

export async function getHomeCopy() {
  try {
    const payload = await getPayload({ config });
    return await payload.findGlobal({ slug: "home-page", depth: 0 });
  } catch (err) {
    console.error("[visgrow:cms] home copy failed, using code defaults:", err);
    return null;
  }
}
