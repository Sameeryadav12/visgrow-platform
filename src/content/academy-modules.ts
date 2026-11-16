/**
 * The Skills Development program modules.
 *
 * One list feeds both the public Skills Development page and the Academy
 * learning area (/my-academy). Edit here, or edit the saved copy in the admin
 * panel under "Academy modules".
 */

export type Module = { title: string; body: string; points: string[]; group: "workplace" | "graduate" };

export const academyModules: Module[] = [
  {
    title: "Positive Attitude & Mindset",
    body: "What success actually looks like, the effect of attitude on performance, conveying positive language, and staying steady when situations aren't.",
    points: ["Focus on what you have, not what you don't", "Avoiding negative language patterns", "Staying positive under pressure"],
    group: "workplace",
  },
  {
    title: "Communication Skills",
    body: "Assertive communication, active listening, physical gesture and voice, eliminating defensive responses, and how to socialise as an introvert.",
    points: ["Open vs closed questions and the 5 whys", "Avoiding workplace misunderstandings", "Building confidence in conversation"],
    group: "workplace",
  },
  {
    title: "Problem-Solving & Critical Thinking",
    body: "Breaking a messy problem into parts, weighing the evidence, choosing a path and explaining the decision. Practised on realistic workplace scenarios, not abstract puzzles.",
    points: ["Structuring a problem before reacting to it", "Asking better questions before offering answers", "Making and explaining a decision with incomplete information"],
    group: "workplace",
  },
  {
    title: "Teamwork & Collaboration",
    body: "How to contribute in a team, handle disagreement without damaging the relationship, and work well with people who think and communicate differently.",
    points: ["Clear roles, handovers and expectations", "Giving and receiving feedback well", "Resolving conflict early and calmly"],
    group: "workplace",
  },
  {
    title: "Adaptability & Initiative",
    body: "Staying effective when priorities shift, taking ownership without waiting to be asked, and learning quickly in an unfamiliar role or team.",
    points: ["Responding to change without losing momentum", "Spotting what needs doing and acting on it", "Learning fast and asking for help at the right time"],
    group: "workplace",
  },
  {
    title: "Time & Priority Management",
    body: "Deciding what matters most, protecting focus, and delivering reliably. The habits that make a new hire dependable in the first ninety days.",
    points: ["Prioritising when everything feels urgent", "Planning the week, not just the day", "Setting and keeping realistic commitments"],
    group: "workplace",
  },
  {
    title: "Outer Impact & Presence",
    body: "How you land in a room before you've said anything of substance — posture, gesture, eye contact, listening and reading a new environment.",
    points: ["Body language and eye contact", "Responding to unfamiliar environments", "Active listening"],
    group: "workplace",
  },
  {
    title: "Conversation & High-Impact Personality",
    body: "The art of small talk, building rapport quickly, finding common ground, and the difference enthusiasm and specificity make.",
    points: ["Making small conversation well", "Finding common ground fast", "Impact words and being generous with detail"],
    group: "workplace",
  },
  {
    title: "Personality Awareness & NLP",
    body: "Understanding how you're wired using NLP and personality profiling — strengths, weaknesses, career suitability and how to build rapport with people unlike you.",
    points: ["What NLP is and how it helps", "Strengths, weaknesses and career fit", "Establishing rapport deliberately"],
    group: "workplace",
  },
  {
    title: "Goal Setting & the GROW Model",
    body: "Turning intent into dated, accountable plans — the six steps to personal goal setting, using GROW to coach yourself, and beating procrastination.",
    points: ["Why perseverance matters and how to build it", "Vision, mission and manifesting a plan", "The deadly trap of procrastination"],
    group: "workplace",
  },
  {
    title: "Personal Branding",
    body: "The power of a personal brand, the 5 P's, building credibility and recognition online, and how to measure whether it's actually working.",
    points: ["Designing your visual identity", "Offering value and building trust", "Common mistakes that kill a brand"],
    group: "workplace",
  },
  {
    title: "The 30-Second Elevator Pitch",
    body: "Who you are, how you add value, why you care and what you're aiming at — sharp enough to land at a networking event or an interview opener.",
    points: ["Common intro pitch mistakes", "Reading your audience first", "Building your own pitch template"],
    group: "graduate",
  },
  {
    title: "Resume & LinkedIn",
    body: "Structure, formatting, results-driven achievement statements, ATS compatibility — plus the LinkedIn profile decisions recruiters actually respond to.",
    points: ["Why the top half of your resume decides everything", "Tailoring to selection criteria", "LinkedIn SEO, recommendations and feed strategy"],
    group: "graduate",
  },
  {
    title: "Cover Letters",
    body: "The foundations of a cover letter that adds something — how to open, how to position yourself as the solution, and how to finish.",
    points: ["Common cover letter mistakes", "Showing you're the solution", "Templates and structure"],
    group: "graduate",
  },
  {
    title: "Interview Preparation",
    body: "Research, preparation, presentation and the SAR technique for behavioural, competency, situational and company questions — plus every follow-up scenario.",
    points: ["The two questions every interview opens with", "Using SAR to structure answers", "Follow-up after silence, and handling offers"],
    group: "graduate",
  },
  {
    title: "Networking & the Hidden Job Market",
    body: "The roles that are never advertised, where to find the right rooms, and how to use alumni, associations and professional networks properly.",
    points: ["Where to find industry and networking events", "How to network online without being a nuisance", "Utilising alumni and membership bodies"],
    group: "graduate",
  },
  {
    title: "Market & Industry Research",
    body: "Locating the right organisations, finding decision-makers, identifying future skill demand and keeping up with local business news.",
    points: ["Finding key decision makers", "Spotting future career trends", "Market mapping and news alerts"],
    group: "graduate",
  },
];

export const workplaceModules = academyModules.filter((m) => m.group === "workplace");
export const graduateModules = academyModules.filter((m) => m.group === "graduate");
