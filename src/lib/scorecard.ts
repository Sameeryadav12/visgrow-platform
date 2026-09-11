/**
 * The Job-Readiness Scorecard.
 *
 * Twelve questions, five areas, one honest answer to the question the whole
 * site is built around: why do you keep getting passed over?
 *
 * Design decisions worth knowing:
 *
 * - Every question is about something the person has *done*, not how they
 *   feel. "Have you spoken to someone doing this job?" is answerable and
 *   checkable. "How confident are you?" is neither, and produces a score
 *   that flatters people rather than helping them.
 *
 * - Nothing here predicts whether they'll get a job, and the copy never says
 *   it does. It measures preparation, which is the only thing anyone can
 *   actually control — and the only thing we can honestly claim to improve.
 *
 * - Scoring is transparent and local. No model, no API, no "AI analysis"
 *   that could say something we'd have to defend later.
 */

export type AreaKey =
  | "direction"
  | "resume"
  | "interview"
  | "network"
  | "experience";

export type Area = {
  key: AreaKey;
  label: string;
  /** What a low score in this area actually costs them. */
  problem: string;
  /** The first thing to do about it. Free, specific, doable this week. */
  firstStep: string;
  /** Which guide on the site goes deeper. */
  guideSlug?: string;
  /** Which program is the paid answer, if they want one. */
  programSlug: string;
};

export const AREAS: Record<AreaKey, Area> = {
  direction: {
    key: "direction",
    label: "Direction",
    problem:
      "You're applying to whatever comes up rather than something specific. Employers can tell — a general application reads as 'I'll take anything', and nobody's first choice is the person who'd take anything.",
    firstStep:
      "Write down three job titles you'd actually accept. Not industries, not fields. Titles you could type into Seek. If you can't get to three, that's the thing to fix first.",
    programSlug: "career-strategy-gap-analysis",
  },
  resume: {
    key: "resume",
    label: "Resume",
    problem:
      "Your resume lists what you were responsible for instead of what changed because you were there. That reads as a job description, and a job description doesn't make anyone want to meet you.",
    firstStep:
      "Take your top three bullet points and add a result to each — a number, a timeframe, or what would have gone wrong without you.",
    programSlug: "career-coaching",
  },
  interview: {
    key: "interview",
    label: "Interviews",
    problem:
      "You're preparing answers in your head instead of out loud. The gap between knowing what you want to say and being able to say it under pressure is where most interviews are lost.",
    firstStep:
      "Pick your weakest question — usually 'tell me about yourself' — and say your answer out loud, to a person, three times.",
    programSlug: "career-coaching",
  },
  network: {
    key: "network",
    label: "Network",
    problem:
      "You're relying on job boards, which means you only ever see the roles that made it to a job board. A lot of hiring happens before that point, through people who already know the work.",
    firstStep:
      "Message one person who does the job you want. Not asking for a job — asking what their week actually looks like. That conversation is the whole technique.",
    programSlug: "career-strategy-gap-analysis",
  },
  experience: {
    key: "experience",
    label: "Local experience",
    problem:
      "You have the qualification but nothing on the page that happened in an Australian workplace. That's the single most common reason a good graduate gets filtered out here.",
    firstStep:
      "List anything done in an Australian context — volunteering, a uni project with a real client, casual work. It counts for more than you think, and most people leave it off.",
    programSlug: "hosted-internships",
  },
};

export type Question = {
  id: string;
  area: AreaKey;
  text: string;
  /** Answers are ordered worst → best and scored 0..3 by index. */
  options: string[];
};

export const QUESTIONS: Question[] = [
  // --- Direction
  {
    id: "d1",
    area: "direction",
    text: "How clear are you on the exact job title you're going for?",
    options: [
      "No idea — I'm open to anything",
      "I know the general field",
      "I have two or three titles in mind",
      "One specific title I could type into Seek today",
    ],
  },
  {
    id: "d2",
    area: "direction",
    text: "Could you explain in one sentence why an employer should pick you over someone with the same degree?",
    options: [
      "Not really",
      "I'd need to think about it",
      "Roughly, if pushed",
      "Yes — I've said it out loud before",
    ],
  },

  // --- Resume
  {
    id: "r1",
    area: "resume",
    text: "Do your resume bullet points describe duties, or results?",
    options: [
      "Duties — what I was responsible for",
      "Mostly duties",
      "A mix",
      "Results, with numbers where I have them",
    ],
  },
  {
    id: "r2",
    area: "resume",
    text: "When did someone who hires people last read your resume and give you feedback?",
    options: [
      "Never",
      "A friend or family member looked at it",
      "Someone in the industry, but a while ago",
      "Recently, and I acted on what they said",
    ],
  },
  {
    id: "r3",
    area: "resume",
    text: "Do you change your resume for each application?",
    options: [
      "No — same one every time",
      "I change the cover letter only",
      "I tweak a line or two",
      "Yes — the top third is rewritten for the role",
    ],
  },

  // --- Interviews
  {
    id: "i1",
    area: "interview",
    text: "How many interviews have you had in the last three months?",
    options: ["None", "One", "Two or three", "Four or more"],
  },
  {
    id: "i2",
    area: "interview",
    text: "Have you practised answering questions out loud, to another person?",
    options: [
      "Never",
      "I've rehearsed in my head",
      "Once or twice with a friend",
      "Yes, including a proper mock interview",
    ],
  },
  {
    id: "i3",
    area: "interview",
    text: "Do you have three prepared stories about your own work you can adapt to most questions?",
    options: [
      "No",
      "One I fall back on",
      "Two, roughly",
      "Three or more, ready to go",
    ],
  },

  // --- Network
  {
    id: "n1",
    area: "network",
    text: "In the last month, how many people working in your target field have you actually spoken to?",
    options: ["None", "One", "Two or three", "Four or more"],
  },
  {
    id: "n2",
    area: "network",
    text: "If a role came up at a company you want, would anyone inside it know your name?",
    options: [
      "No",
      "Unlikely",
      "Maybe one or two places",
      "Yes, at several",
    ],
  },

  // --- Local experience
  {
    id: "e1",
    area: "experience",
    text: "How much of your work experience happened in an Australian workplace?",
    options: [
      "None",
      "Casual or unrelated work only",
      "Some, related to my field",
      "Solid, directly relevant experience",
    ],
  },
  {
    id: "e2",
    area: "experience",
    text: "Can you point to something you've built, delivered or fixed that someone else relied on?",
    options: [
      "No",
      "Only university assignments",
      "A project with a real client or organisation",
      "Yes, in a workplace — and I can talk through it",
    ],
  },
];

export const MAX_PER_QUESTION = 3;

export type AreaScore = {
  key: AreaKey;
  label: string;
  /** 0–100. */
  percent: number;
};

export type Result = {
  /** 0–100 overall. */
  overall: number;
  band: Band;
  areas: AreaScore[];
  /** Lowest-scoring area — the thing to fix first. */
  weakest: Area;
  /** Highest-scoring area, so the result doesn't read as pure criticism. */
  strongest: Area;
};

export type Band = {
  key: "early" | "building" | "close" | "ready";
  title: string;
  /** The honest read on where they are. */
  summary: string;
};

const BANDS: Band[] = [
  {
    key: "early",
    title: "Right at the start",
    summary:
      "Most of the pieces aren't in place yet — which is completely normal, and much better to know now than after six months of applications that go nowhere. Nothing here is hard to fix. It just has to be done in the right order.",
  },
  {
    key: "building",
    title: "Getting there",
    summary:
      "You've done real work on this. The gaps are specific rather than everywhere, which means the fix is specific too. People in this range usually move quickly once they know where to aim.",
  },
  {
    key: "close",
    title: "Close",
    summary:
      "You're doing most of it right, and you're probably getting further into processes than you were. What's left is the difference between being a reasonable candidate and being the obvious one.",
  },
  {
    key: "ready",
    title: "Well prepared",
    summary:
      "On paper you're ready. If you're still not getting offers, the problem is more likely to be where you're applying than how — and that's a different conversation, not a longer to-do list.",
  },
];

const bandFor = (overall: number): Band => {
  if (overall < 35) return BANDS[0];
  if (overall < 60) return BANDS[1];
  if (overall < 80) return BANDS[2];
  return BANDS[3];
};

/**
 * Turns raw answers into a result.
 *
 * Unanswered questions score zero rather than being skipped — a partly
 * finished scorecard shouldn't be able to report a better result than a
 * completed one.
 */
export function scoreAnswers(answers: Record<string, number>): Result {
  const byArea = new Map<AreaKey, { got: number; max: number }>();

  for (const q of QUESTIONS) {
    const current = byArea.get(q.area) ?? { got: 0, max: 0 };
    current.got += Math.min(Math.max(answers[q.id] ?? 0, 0), MAX_PER_QUESTION);
    current.max += MAX_PER_QUESTION;
    byArea.set(q.area, current);
  }

  const areas: AreaScore[] = [...byArea.entries()].map(([key, v]) => ({
    key,
    label: AREAS[key].label,
    percent: v.max ? Math.round((v.got / v.max) * 100) : 0,
  }));

  const totalGot = [...byArea.values()].reduce((a, b) => a + b.got, 0);
  const totalMax = [...byArea.values()].reduce((a, b) => a + b.max, 0);
  const overall = totalMax ? Math.round((totalGot / totalMax) * 100) : 0;

  const sorted = [...areas].sort((a, b) => a.percent - b.percent);

  return {
    overall,
    band: bandFor(overall),
    areas,
    weakest: AREAS[sorted[0].key],
    strongest: AREAS[sorted[sorted.length - 1].key],
  };
}
