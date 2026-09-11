export type NavLink = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavLink[];
};

export const mainNav: NavItem[] = [
  {
    label: "Students & Graduates",
    href: "/",
    children: [
      { label: "Free Job-Readiness Scorecard", href: "/scorecard" },
      { label: "Overview", href: "/#overview" },
      { label: "Career Strategy & Gap Analysis", href: "/students-graduates/career-strategy-gap-analysis" },
      { label: "Career Coaching", href: "/students-graduates/career-coaching" },
      { label: "14-Day Career Accelerator", href: "/students-graduates/14-day-accelerator" },
      { label: "Visgrow-Hosted Internships", href: "/students-graduates/hosted-internships" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Success Stories & Testimonials", href: "/#success-stories" },
      { label: "FAQs", href: "/#faqs" },
      { label: "Get Started", href: "/get-started" },
    ],
  },
  {
    label: "Employers",
    href: "/employers",
    children: [
      { label: "Overview", href: "/employers" },
      { label: "Workforce Capability Development", href: "/employers#workforce-capability" },
      { label: "Emerging Leaders Program", href: "/employers#emerging-leaders" },
      { label: "Partner With Visgrow", href: "/employers#partner" },
      { label: "Testimonials", href: "/employers#testimonials" },
    ],
  },
  {
    label: "Education Partners",
    href: "/education-partners",
    children: [
      { label: "Overview", href: "/education-partners" },
      { label: "Career & Employability Services", href: "/education-partners#services" },
      { label: "Visgrow-Hosted Internships", href: "/education-partners#hosted-internships" },
      { label: "Partner With Visgrow", href: "/education-partners#partner" },
    ],
  },
  {
    label: "Academy",
    href: "/academy",
    children: [
      { label: "Overview", href: "/academy" },
      { label: "Skills Development", href: "/academy/skills-development" },
      { label: "Workshop Packages & Pricing", href: "/academy#pricing" },
      { label: "Book a Workshop", href: "/academy#book" },
      { label: "Testimonials", href: "/academy#testimonials" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Student & Graduate Resources", href: "/resources?for=students" },
      { label: "Employer Resources", href: "/resources?for=employers" },
      { label: "Education Partner Resources", href: "/resources?for=education-partners" },
    ],
  },
  { label: "About", href: "/about" },
];

export const audiencePaths = {
  student: "/students-graduates",
  employer: "/employers",
  education: "/education-partners",
};
