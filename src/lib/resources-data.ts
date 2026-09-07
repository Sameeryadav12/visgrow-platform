export type Resource = {
  title: string;
  blurb: string;
  audience: "students" | "employers" | "education-partners";
  readTime: string;
};

/**
 * Article titles and topics are taken from Visgrow's existing blog content.
 * Full articles to be migrated into the CMS in phase 2 — until then these
 * surface as "coming soon" cards so nothing links to an empty page.
 */
export const resources: Resource[] = [
  // ---- Students & graduates
  {
    title: "Effective job search strategies",
    blurb: "Why applying harder isn't working, and what to do instead of refreshing Seek.",
    audience: "students",
    readTime: "6 min",
  },
  {
    title: "Resume writing tips",
    blurb: "The structure, formatting and achievement statements that survive a six-second scan.",
    audience: "students",
    readTime: "7 min",
  },
  {
    title: "Tailoring your resume to a particular role",
    blurb: "How to address selection criteria and use keywords without sounding like a robot.",
    audience: "students",
    readTime: "5 min",
  },
  {
    title: "How to prepare for a job interview",
    blurb: "Research, presentation, body language and the two questions every interview opens with.",
    audience: "students",
    readTime: "8 min",
  },
  {
    title: "Job interview follow-up",
    blurb: "What to send, when to send it, and how to follow up after silence without pestering.",
    audience: "students",
    readTime: "4 min",
  },
  {
    title: "Are cover letters still worth writing?",
    blurb: "When they matter, when they don't, and how to write one that adds something.",
    audience: "students",
    readTime: "5 min",
  },
  {
    title: "Common job search mistakes",
    blurb: "No plan, no questions, no networking, no feedback — and staying reactive.",
    audience: "students",
    readTime: "6 min",
  },
  {
    title: "Why networking matters and how to do it properly",
    blurb: "Where to find the right rooms and how to open a conversation that goes somewhere.",
    audience: "students",
    readTime: "7 min",
  },
  {
    title: "How to get rid of procrastination in five steps",
    blurb: "Set the tone, organise the routine, take small steps, cut distraction, visualise the reward.",
    audience: "students",
    readTime: "5 min",
  },
  {
    title: "How to make the best of studying online",
    blurb: "Staying engaged, staying visible and staying connected when you're not on campus.",
    audience: "students",
    readTime: "5 min",
  },
  {
    title: "Why volunteering is good for your career",
    blurb: "Discovering what you like, testing career possibilities and expanding your network.",
    audience: "students",
    readTime: "5 min",
  },
  {
    title: "How to make the best out of your internship",
    blurb: "Turning a placement into skills, relationships and a reference worth having.",
    audience: "students",
    readTime: "6 min",
  },
  {
    title: "How to turn your internship into a full-time job",
    blurb: "Informational interviews, referrals and becoming the obvious person to keep.",
    audience: "students",
    readTime: "6 min",
  },
  {
    title: "Five practices that prevent internship success",
    blurb: "The habits that quietly stop a placement turning into anything.",
    audience: "students",
    readTime: "5 min",
  },

  // ---- Employers
  {
    title: "Why internship programs are worth running",
    blurb: "Finding future employees, lifting productivity and building leadership in your current team.",
    audience: "employers",
    readTime: "6 min",
  },
  {
    title: "Employability skills Australian businesses look for",
    blurb: "What hiring managers actually screen for beyond the qualification.",
    audience: "employers",
    readTime: "6 min",
  },
  {
    title: "Learning at work — and why most of it doesn't stick",
    blurb: "Setting objectives, defining strategy, building support and maintaining progress.",
    audience: "employers",
    readTime: "7 min",
  },

  // ---- Education partners
  {
    title: "Why internships matter to graduate outcomes",
    blurb: "The link between real work experience and how quickly your graduates convert.",
    audience: "education-partners",
    readTime: "6 min",
  },
  {
    title: "Building employability into the student experience",
    blurb: "Where career support has the most impact, and when in the journey to deliver it.",
    audience: "education-partners",
    readTime: "7 min",
  },
];

export const audienceMeta = {
  students: {
    label: "Students & Graduates",
    heading: "For students and graduates",
    blurb: "Practical guides on job searching, resumes, interviews and making a placement count.",
  },
  employers: {
    label: "Employers",
    heading: "For employers",
    blurb: "Developing junior staff, building capability internally and getting more from early-career hires.",
  },
  "education-partners": {
    label: "Education Partners",
    heading: "For education partners",
    blurb: "Employability outcomes, work-integrated learning and supporting graduates into work.",
  },
} as const;
