/**
 * The site's existing copy, lifted verbatim out of the page files.
 * This is only used once, to populate an empty CMS. After the first
 * seed, the database is the source of truth — edit in /admin, not here.
 */

export const seedPrograms = [
  {
    title: "Career Strategy & Gap Analysis",
    slug: "career-strategy-gap-analysis",
    tagline: "Start here",
    bestFor: "You want a straight answer before you spend money on anything else",
    price: "",
    priceNote: "Price being confirmed",
    duration: "60–90 minutes",
    terms:
      "Price is indicative and confirmed before booking. Sessions are held online or in Adelaide. Rescheduling with 48 hours' notice is free.",
    includes: [
      "60–90 min 1:1 strategy session",
      "Resume & LinkedIn audit",
      "Written action plan",
      "ATS compatibility check",
    ],
    outcomes: [
      "You find out the actual reason employers are passing on you",
      "You stop guessing what to fix next",
      "You get an honest recommendation — even if it's none of our programs",
    ],
    audience: "student",
    pageUrl: "/students-graduates/career-strategy-gap-analysis",
    ctaLabel: "See what's included →",
    featured: false,
    order: 1,
  },
  {
    title: "14-Day Career Accelerator",
    slug: "14-day-accelerator",
    tagline: "Clarity, confidence, momentum",
    bestFor: "You want momentum, fast, and a deadline that makes you act",
    price: "$999",
    priceNote: "14 days",
    duration: "14 days, about an hour a day",
    terms:
      "Price is indicative and confirmed before you start. Payment plans available. The 14 days begin on your chosen start date.",
    includes: [
      "14 structured modules, one a day",
      "Daily coaching check-ins",
      "Resume + LinkedIn + cover letter rebuild",
      "Mock interview on Day 14",
    ],
    outcomes: [
      "You stop rewriting your resume in the dark",
      "You walk into interviews knowing your own story",
      "You have two weeks of proof that you can do the work",
    ],
    audience: "student",
    pageUrl: "/students-graduates/14-day-accelerator",
    ctaLabel: "See the 14 days →",
    featured: true,
    order: 2,
  },
  {
    title: "Ongoing Career Coaching",
    slug: "career-coaching",
    tagline: "Deeper, personalised support",
    bestFor: "You want sustained support as your situation changes",
    price: "",
    priceNote: "Price being confirmed",
    duration: "6 months, fortnightly",
    terms:
      "Price is indicative and confirmed before you start. Payment plans available. Unused sessions do not roll over past the 6-month term.",
    includes: [
      "Fortnightly 1:1 sessions",
      "Unlimited resume revisions",
      "Ongoing interview prep",
      "Priority internship access",
    ],
    outcomes: [
      "You have someone in your corner for the whole search, not one session",
      "Your materials keep improving as you learn what's landing",
      "You get first look at internship openings",
    ],
    audience: "student",
    pageUrl: "/students-graduates/career-coaching",
    ctaLabel: "See what's included →",
    featured: false,
    order: 3,
  },
  {
    title: "Visgrow-Hosted Internship",
    slug: "hosted-internships",
    tagline: "Real, local experience",
    bestFor: "You have no local experience and every job ad wants some",
    price: "$3,499",
    priceNote: "incl. coaching",
    duration: "Placement length confirmed individually",
    terms:
      "Price is indicative and confirmed before you start. Placements are hosted and supervised by Visgrow directly — we do not outsource interns to third-party hosts. Payment plans available.",
    includes: [
      "Local, Visgrow-supervised placement",
      "Real client-facing projects",
      "Career coaching included",
      "Genuine reference on completion",
    ],
    outcomes: [
      "You finally have Australian experience on your resume",
      "You have a portfolio piece, not a certificate of attendance",
      "You have someone who can actually vouch for your work",
    ],
    audience: "student",
    pageUrl: "/students-graduates/hosted-internships",
    ctaLabel: "See what's included →",
    featured: false,
    order: 4,
  },
];

export const seedTestimonials = [
  {
    quote:
      "As an international graduate it wasn't easy without local experience. Mustafa guided me and introduced me to professionals in the IT sector.",
    name: "Chamila Jayathilake",
    role: "IT Graduate",
    audience: "student",
    featured: true,
    order: 1,
  },
  {
    quote:
      "I'd definitely recommend Visgrow — not just a career advisor, but a good friend who helped me grow further in my career.",
    name: "Mohsin Navodiya",
    role: "Business Intern",
    audience: "student",
    featured: true,
    order: 2,
  },
  {
    quote:
      "Mustafa is extremely supportive and professional. I really like his training sessions, especially the LinkedIn one — he taught me how to reach out to people professionally.",
    name: "Duc Anh Nguyen",
    role: "Career Coaching Client",
    audience: "student",
    featured: true,
    order: 3,
  },
  {
    quote:
      "I was able to land an internship with a global organisation working on AI models, all thanks to Mustafa.",
    name: "Nalin Gupta",
    role: "Graduate, Risk Advisory — Deloitte",
    audience: "student",
    featured: true,
    order: 4,
  },
  {
    quote:
      "The resume process is different and way better than conventional resume companies. The interview prep session is very beneficial for a strong professional career.",
    name: "Shuvankeet Nandi",
    role: "Mechanical Engineer — Mayne Pharma",
    audience: "student",
    featured: true,
    order: 5,
  },
];

export const seedFaqs = [
  {
    question: "Will this guarantee me a job?",
    answer:
      "No — and be careful of anyone who promises that. What we build with you is a career strategy, a resume that survives ATS screening, a LinkedIn profile that gets engagement, and the interview confidence that makes an offer far more likely. We build everything that makes a job likely. We can't build the offer itself.",
    audience: "student",
    order: 1,
  },
  {
    question: "What exactly is a Career Strategy & Gap Analysis?",
    answer:
      "A 60–90 minute one-on-one session where we audit your resume, LinkedIn and interview readiness, then identify the specific reason employers are passing on you. You leave with a written action plan — and an honest recommendation on which program fits your situation, even if that's none of ours.",
    audience: "student",
    order: 2,
  },
  {
    question: "Do you work with international students?",
    answer:
      "Yes — a large portion of our clients are international students and graduates. You don't need PR or citizenship to get hired here, but you do need a strategy that accounts for how Australian employers actually screen and hire. That's exactly what we build with you.",
    audience: "student",
    order: 3,
  },
  {
    question: "How is the 14-Day Accelerator different from ongoing coaching?",
    answer:
      "The Accelerator is a structured sprint — 14 modules, one per day, with a fixed deadline that creates momentum. Ongoing coaching is a 6-month program with fortnightly sessions for people who want sustained support as their situation evolves. Most people start with the Accelerator.",
    audience: "student",
    order: 4,
  },
  {
    question: "Are your internships real work, or just shadowing?",
    answer:
      "Real work. Visgrow-Hosted Internships are supervised by us directly — you'll work on actual client-facing deliverables, not observe someone else doing them. You finish with a portfolio piece and a genuine reference, not a certificate of attendance.",
    audience: "student",
    order: 5,
  },
  {
    question: "I can't afford this right now. What are my options?",
    answer:
      "Start with the Career Strategy & Gap Analysis — it's the lowest-cost entry point and often the highest-value hour you'll spend, because it tells you exactly what to fix. Payment plans are available on the larger programs; ask us when you enquire.",
    audience: "student",
    order: 6,
  },
  {
    question: "How do I get started?",
    answer:
      "Start with a conversation — no pressure and no sales pitch. Tell us where you're stuck and we'll tell you honestly what we think you need. Use the form at the bottom of this page, or call 1300 891 365.",
    audience: "student",
    order: 7,
  },
];

export const seedCompanyLogos = [
  { name: "PwC", file: "pwc.png" },
  { name: "Deloitte", file: "deloitte.png" },
  { name: "REDARC", file: "redarc.png" },
  { name: "Mayne Pharma", file: "mayne-pharma.png" },
  { name: "Country Fire Service", file: "cfs.png" },
  { name: "Aussie Home Loans", file: "aussie-home-loans.png" },
  { name: "Aurecon", file: "aurecon.png" },
  { name: "Dialog Information Technology", file: "dialog.png" },
  { name: "Relationships Australia SA", file: "relationships-australia.png" },
  { name: "SA Department for Energy and Mining", file: "sa-energy-mining.png" },
  { name: "Tax Store", file: "tax-store.png" },
  { name: "SA-NT DataLink", file: "sa-nt-datalink.png" },
  { name: "Kiratech", file: "kiratech.png" },
  { name: "KompleteCare", file: "komplete-care.png" },
  { name: "GBA Projects", file: "gba-projects.png" },
  { name: "Equals International", file: "equals-international.png" },
].map((l, i) => ({
  name: l.name,
  logoPath: `/images/company-logos/named/${l.file}`,
  active: true,
  order: i + 1,
}));

export const seedFooterColumns = [
  {
    title: "Students & Graduates",
    links: [
      { label: "Career Strategy & Gap Analysis", href: "/students-graduates/career-strategy-gap-analysis" },
      { label: "Career Coaching", href: "/students-graduates/career-coaching" },
      { label: "14-Day Career Accelerator", href: "/students-graduates/14-day-accelerator" },
      { label: "Visgrow-Hosted Internships", href: "/students-graduates/hosted-internships" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Success Stories", href: "/#success-stories" },
      { label: "FAQs", href: "/#faqs" },
    ],
  },
  {
    title: "Employers & Partners",
    links: [
      { label: "Workforce Capability Development", href: "/employers#workforce-capability" },
      { label: "Emerging Leaders Program", href: "/employers#emerging-leaders" },
      { label: "Education Partners", href: "/education-partners" },
      { label: "Partner With Visgrow", href: "/employers#partner" },
    ],
  },
  {
    title: "Academy",
    links: [
      { label: "Skills Development", href: "/academy/skills-development" },
      { label: "Workshop Packages & Pricing", href: "/academy#pricing" },
      { label: "Book a Workshop", href: "/academy#book" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Visgrow", href: "/about" },
      { label: "Founder Profile", href: "/about#founder" },
      { label: "Resources", href: "/resources" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const seedMasterclassChapters = [
  { title: "Why your resume is being filtered out before a human sees it" },
  { title: "What Australian employers actually screen for" },
  { title: "The hidden job market, and how to get into it" },
  { title: "Building a LinkedIn profile that gets replies" },
  { title: "Turning your degree into a story employers care about" },
  { title: "Interview answers that don't sound rehearsed" },
  { title: "The follow-up most people never send" },
  { title: "What to do in your first 90 days" },
];
