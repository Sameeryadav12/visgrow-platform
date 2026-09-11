/**
 * The written guides behind the Resources page.
 *
 * The substance is Mustafa's — these are his nineteen blog posts, which were
 * sitting in a Word document while every card on the site said "Publishing
 * soon". They've been rewritten rather than pasted: same advice, site voice,
 * no invented statistics, and no promise of a job.
 *
 * A guide with no `body` still renders as a card, but without a link — so we
 * never send anyone to an empty page.
 */

export type Block =
  | { h: string }
  | { p: string }
  | { ul: string[] };

export type Topic =
  | "Job search"
  | "Resumes"
  | "Interviews"
  | "Networking"
  | "Internships"
  | "Study & habits"
  | "For employers"
  | "For institutions";

export type Guide = {
  slug: string;
  /** Drives the filter chips on the Resources page. */
  topic: Topic;
  /** Date shown on the card. */
  published: string;
  title: string;
  blurb: string;
  audience: "students" | "employers" | "education-partners";
  readTime: string;
  /** Omit while a guide is still being written. */
  body?: Block[];
  /** One line under the title on the article page. */
  standfirst?: string;
};

export const guides: Guide[] = [
  // ------------------------------------------------- students & graduates
  {
    slug: "effective-job-search-strategies",
    topic: "Job search",
    published: "2026-02-03",
    title: "Effective job search strategies",
    blurb: "Why applying harder isn't working, and what to do instead of refreshing Seek.",
    audience: "students",
    readTime: "6 min",
    standfirst:
      "Most people respond to a stalled job search by doing more of the same thing, faster. Here is what to do instead.",
    body: [
      {
        p: "There is a version of job searching that feels like work but isn't producing anything. You open Seek, filter by your field, send four applications, and close the laptop having achieved nothing you can measure. Two months of that and it's easy to conclude the market is broken.",
      },
      {
        p: "Usually the market is fine. The method is the problem.",
      },
      { h: "Decide what you are actually applying for" },
      {
        p: "A search with no target produces a resume with no target. If you can't finish the sentence \"I am looking for a ___ role in ___, because ___\", every application you send will be slightly vague — and vague loses to specific every time.",
      },
      {
        p: "Write the sentence down before you write anything else. It decides your resume, your LinkedIn headline, and which roles are worth your time.",
      },
      { h: "Apply to fewer roles, properly" },
      {
        p: "Twenty tailored applications will outperform a hundred generic ones, and take less time overall because you stop applying for things you were never going to get.",
      },
      {
        p: "Tailoring means reading the selection criteria, using the employer's own words for the work, and making sure the top third of your resume speaks to that role specifically. It does not mean rewriting the whole document each time.",
      },
      { h: "Stop relying on the ads" },
      {
        p: "Job boards only show you the roles that made it to a job board. A large share never do — they get filled through someone who already knew the work was coming.",
      },
      {
        p: "That sounds unfair, and it is. It's also learnable. Following the organisations you want to work for, turning up to industry events, and having short conversations with people who do the job you want are all things you can start this week.",
      },
      { h: "Track what you send" },
      {
        p: "A simple spreadsheet — role, organisation, date, contact, outcome — turns a search that feels like guessing into something you can review. After twenty applications you'll be able to see whether the problem is at the application stage, the interview stage, or the targeting stage. Without a record, you're guessing about your own guessing.",
      },
      { h: "Treat it as a job with hours" },
      {
        p: "Open-ended searching drifts, because nothing is ever due. Two focused hours a day, with a defined task for each — research on Monday, applications on Tuesday, outreach on Wednesday — beats an anxious all-day scroll.",
      },
      {
        p: "None of this guarantees an offer. What it does is make sure that when you don't get one, you know why, and can change something specific.",
      },
    ],
  },
  {
    slug: "resume-writing-tips",
    topic: "Resumes",
    published: "2026-02-10",
    title: "Resume writing tips",
    blurb: "Structure, formatting and achievement statements — and what recruiters look at first.",
    audience: "students",
    readTime: "7 min",
    standfirst:
      "Your resume has one job: make it obvious, quickly, why someone should talk to you.",
    body: [
      {
        p: "Two things read your resume before a person considers you seriously. Screening software, which is looking for whether you match the role on paper. Then a human, who is skimming to decide whether to keep reading. Both are impatient. Neither is being unfair — they're both dealing with a stack.",
      },
      { h: "Structure that survives a skim" },
      {
        ul: [
          "Name and contact details at the top, without a photo, date of birth or marital status.",
          "A short professional summary — three or four lines that say what you do and what you're aiming at.",
          "Skills, grouped so they can be scanned.",
          "Experience, most recent first, with dates that don't leave unexplained gaps.",
          "Education, and anything genuinely relevant after that.",
        ],
      },
      { h: "Write achievements, not duties" },
      {
        p: "\"Responsible for social media\" tells a reader nothing. Everyone in that job was responsible for social media.",
      },
      {
        p: "Try: what did you do, how did you do it, and what changed as a result. \"Rebuilt the university society's Instagram content plan, lifting event attendance from around 20 to over 60 across a semester.\" Same job. Completely different reader.",
      },
      {
        p: "If you don't have numbers, use scale or scope instead — how many people, how often, how large. Never invent a figure. Being asked about it in an interview is a bad place to be caught.",
      },
      { h: "Formatting, plainly" },
      {
        ul: [
          "One clean font, consistent sizes, generous white space.",
          "No tables, columns, text boxes, headers or footers — screening software mangles them.",
          "Send a PDF unless the ad specifically asks for Word.",
          "Name the file properly: Firstname-Lastname-Resume.pdf, not resume-final-v3.pdf.",
          "Two pages is normal in Australia. One page if you're early in your career and it's genuinely full.",
        ],
      },
      { h: "The top third decides everything" },
      {
        p: "The part visible without scrolling is doing most of the work. If your summary and first role don't connect to the job being advertised, the rest of the document rarely gets a fair reading.",
      },
      { h: "Before you send it" },
      {
        p: "Read it out loud — you'll hear the awkward sentences you've stopped seeing. Check every date. Then give it to someone who doesn't know your field and ask them what job you're applying for. If they can't tell, neither can the recruiter.",
      },
    ],
  },
  {
    slug: "tailoring-your-resume",
    topic: "Resumes",
    published: "2026-02-17",
    title: "Tailoring your resume to a particular role",
    blurb: "How to address selection criteria and use keywords without sounding like a robot.",
    audience: "students",
    readTime: "5 min",
    standfirst:
      "Tailoring is not rewriting. It's deciding what to move to the top.",
    body: [
      {
        p: "The most common objection to tailoring is time. It's a fair objection — if tailoring meant producing a new resume for every application, nobody would do it. It doesn't.",
      },
      { h: "Start from the ad, not your resume" },
      {
        p: "Read the advertisement twice and mark the requirements that are stated more than once, or stated first. Those are the ones that matter to whoever wrote it. Everything else is a wish list.",
      },
      { h: "Use their words" },
      {
        p: "If the ad says \"stakeholder engagement\" and your resume says \"client liaison\", a screening system won't connect them, and a skimming human may not either. Where the phrase honestly describes what you did, use theirs.",
      },
      {
        p: "Where it doesn't honestly describe what you did, don't. Keyword-stuffing is obvious to read and collapses in the first interview.",
      },
      { h: "Rewrite the top, reorder the middle" },
      {
        p: "In practice, tailoring is three things: adjust your professional summary to name the role and the two most relevant strengths, reorder your bullet points so the relevant ones sit first, and cut the ones that don't earn their space for this particular job.",
      },
      {
        p: "That's usually fifteen minutes, not an evening.",
      },
      { h: "Addressing selection criteria" },
      {
        p: "Government and university roles often ask for criteria to be addressed directly. Answer each one with a short, specific example rather than a claim — situation, what you did, what resulted. Claims are unverifiable, so readers discount them. Examples aren't.",
      },
      { h: "Keep a master version" },
      {
        p: "Hold one long master resume with everything you've ever done, and cut down from it for each application. It's far faster than building up from nothing, and it stops you forgetting the thing that would have been perfect for this role.",
      },
    ],
  },
  {
    slug: "how-to-prepare-for-a-job-interview",
    topic: "Interviews",
    published: "2026-02-24",
    title: "How to prepare for a job interview",
    blurb: "Research, presentation, structure — and the question every interview opens with.",
    audience: "students",
    readTime: "8 min",
    standfirst:
      "Confidence in an interview is not a personality trait. It's preparation you can actually do.",
    body: [
      {
        p: "Nerves in an interview are mostly uncertainty. You don't know what they'll ask, so your brain rehearses the disaster. Preparation reduces the number of unknowns, and confidence follows from that — not the other way around.",
      },
      { h: "Research past the homepage" },
      {
        p: "Know what the organisation actually does, who its customers are, and something that has happened there recently. Look up the people interviewing you on LinkedIn. Know what the role exists to solve.",
      },
      {
        p: "This isn't so you can recite facts. It's so your answers can connect to their situation instead of floating in general terms.",
      },
      { h: "Prepare the opening" },
      {
        p: "Almost every interview opens with a version of \"tell me about yourself\". It is not an invitation to narrate your resume from the top.",
      },
      {
        p: "Ninety seconds, three parts: where you are now and what you do, one or two things you've done that are relevant to this role, and why you're sitting in this particular room. Practise it out loud until it sounds like speech, not recitation.",
      },
      { h: "Structure your examples" },
      {
        p: "For behavioural questions — \"tell me about a time when…\" — use a simple structure so you don't wander: the situation, the action you took, the result. Keep the situation short, the action detailed, and always finish with what happened.",
      },
      {
        p: "Prepare five or six stories that can be reshaped for different questions: a problem you solved, a conflict you handled, a time you failed, a time you led something, a deadline you saved.",
      },
      { h: "Presentation" },
      {
        ul: [
          "Dress one level above what the team wears day to day.",
          "Arrive early enough that you aren't recovering when you sit down.",
          "For video interviews, test your camera, microphone and background beforehand, and put the light in front of you.",
          "Bring a printed copy of your resume and something to write with.",
        ],
      },
      { h: "Have questions ready" },
      {
        p: "Ending with \"no, I think you've covered everything\" wastes the one part of the interview you control. Ask about what success looks like in the first six months, how the team works, or what the person who last did this role did well.",
      },
      {
        p: "Not every well-prepared interview ends in an offer. But a prepared interview that doesn't tells you something useful, and an unprepared one tells you nothing at all.",
      },
    ],
  },
  {
    slug: "job-interview-follow-up",
    topic: "Interviews",
    published: "2026-03-03",
    title: "Job interview follow-up",
    blurb: "What to send, when to send it, and how to follow up after silence without pestering.",
    audience: "students",
    readTime: "4 min",
    standfirst:
      "The follow-up most candidates never send, and the one most people send badly.",
    body: [
      {
        p: "Most people walk out of an interview and wait. It's understandable — following up feels like pushing. But a short, well-judged message is one of the few things you can still influence after the interview has ended.",
      },
      { h: "Send a thank-you within 24 hours" },
      {
        p: "Short. Four or five sentences. Thank them for their time, mention one specific thing from the conversation that stayed with you, restate briefly why the role suits you, and stop.",
      },
      {
        p: "The specific detail is the entire point. \"Thank you for your time\" is forgettable. \"What you said about the team taking on the migration work in the new year is exactly the kind of project I want to be in\" proves you were listening.",
      },
      { h: "If they gave you a timeframe, respect it" },
      {
        p: "If they said two weeks, wait two weeks and a day or two. Following up early reads as anxious and can undo the impression you just made.",
      },
      { h: "If they didn't, or the date passes" },
      {
        p: "One polite message after about a week. Restate your interest, ask whether there's an update, and offer anything else they need. If there's no reply, one more after another week or ten days — and then leave it.",
      },
      {
        p: "Silence is usually process, not rejection. Organisations go quiet for reasons that have nothing to do with you: the panel can't get a meeting, the budget is being re-approved, someone is on leave.",
      },
      { h: "When it's a no" },
      {
        p: "Reply anyway. Thank them, and ask whether they'd be willing to share what would have made you a stronger candidate. Some won't. The ones who do are giving you something more valuable than the role — and you have now made a positive impression on someone who hires in your field.",
      },
    ],
  },
  {
    slug: "are-cover-letters-still-worth-writing",
    topic: "Resumes",
    published: "2026-03-10",
    title: "Are cover letters still worth writing?",
    blurb: "When they matter, when they don't, and how to write one that adds something.",
    audience: "students",
    readTime: "5 min",
    standfirst:
      "Some industries barely read them. It still costs you nothing to be the candidate who wrote a good one.",
    body: [
      {
        p: "Cover letters have a mixed reputation, and some of it is deserved. Plenty go unread. Some industries have quietly stopped expecting them.",
      },
      {
        p: "But the argument for writing one is simple: a resume is a record of what you've done. A cover letter is the only place you get to say why it's relevant to this role, in your own voice, before anyone has met you.",
      },
      { h: "What a good one actually does" },
      {
        ul: [
          "Connects your experience to this specific role, rather than restating your resume.",
          "Explains anything that needs explaining — a career change, a gap, a move to Adelaide.",
          "Shows you know something about the organisation.",
          "Gives the reader a sense of how you communicate in writing, which for many roles is part of the job.",
        ],
      },
      { h: "Structure" },
      {
        p: "One page, three or four short paragraphs. Open with the role and one specific reason you're interested — not \"I am writing to apply for\". Middle: two examples that map to what the ad asked for. Close: what you'd bring, and a simple statement that you'd welcome the chance to discuss it.",
      },
      { h: "The mistakes that lose you the reader" },
      {
        ul: [
          "Addressing it \"To whom it may concern\" when the hiring manager's name is on the ad.",
            "Repeating your resume in sentence form.",
          "Writing about what you want from the role rather than what you bring to it.",
          "Sending the same letter with the organisation's name swapped out — readers can always tell.",
        ],
      },
      { h: "When to skip it" },
      {
        p: "If the application form has no field for one and the ad explicitly says not to send one, don't. Otherwise, write it. If it goes unread you've lost twenty minutes. If it's read, you're one of the few people who bothered.",
      },
    ],
  },
  {
    slug: "common-job-search-mistakes",
    topic: "Job search",
    published: "2026-03-17",
    title: "Common job search mistakes",
    blurb: "No plan, no questions, no networking, no feedback — and staying reactive.",
    audience: "students",
    readTime: "6 min",
    standfirst:
      "Most stalled job searches aren't failing from lack of effort. They're failing from a handful of repeatable mistakes.",
    body: [
      { p: "Job hunting takes persistence, and persistence is exhausting. So people default to working harder rather than differently — more applications, later nights, same result. These are the mistakes that show up most often." },
      { h: "Applying only through job boards" },
      { p: "Seek and Indeed are worth using. Using nothing else is the problem. You're competing with everyone who saw the same ad, and some listings are posted to satisfy a process when the decision is already close to made." },
      { p: "Use the boards, but treat them as one channel of three — alongside approaching organisations directly, and people who already know you." },
      { h: "Skipping networking because it feels awkward" },
      { p: "Referrals are one of the most common routes into a role, and that's more pronounced in a city the size of Adelaide than it is in Sydney or Melbourne. Networking isn't schmoozing. It's asking someone who does the job you want whether they'd spare fifteen minutes to tell you how they got there." },
      { h: "Waiting for the right vacancy to appear" },
      { p: "Some roles are shaped around a person who was already on someone's radar. If you only ever respond to advertised vacancies, you're only ever competing in the most crowded part of the market." },
      { h: "Preparing thinly for interviews you fought to get" },
      { p: "Skimming the homepage half an hour beforehand is not preparation. It shows in the answers, and it's a poor return on the weeks of applying that earned you the meeting." },
      { h: "Never asking why" },
      { p: "Most rejections carry no explanation, so most candidates change something at random and try again. Ask for feedback — politely, once. Some people give it, and one honest sentence can save you two months." },
      { h: "Staying reactive" },
      { p: "A search made entirely of responses to other people's ads has no direction of its own. Decide what you're aiming at, then go at it deliberately. It's slower to start and considerably faster to finish." },
    ],
  },
  {
    slug: "why-networking-matters",
    topic: "Networking",
    published: "2026-03-24",
    title: "Why networking matters and how to do it properly",
    blurb: "Where to find the right rooms, and how to open a conversation that goes somewhere.",
    audience: "students",
    readTime: "7 min",
    standfirst:
      "Networking has a bad name because most people picture the worst version of it.",
    body: [
      { p: "Say the word networking and most people imagine a room full of strangers, forced small talk and someone pushing a business card at them. Very few enjoy that. Almost nobody is good at it." },
      { p: "But that's one narrow version. Networking also means asking a professional for fifteen minutes of advice, or asking someone you studied with whether their employer is hiring. Most people would do both of those without blinking." },
      { h: "Why it matters more than it should" },
      { p: "Hiring is a risk decision. A stranger is an unknown; a person someone in the building can vouch for is much less of one. That isn't fair, but understanding it is more useful than resenting it." },
      { h: "Ask for information, not a job" },
      { p: "The single most useful move is the informational interview. Find someone on LinkedIn doing the role you want, and ask for a short conversation about how they got there and what they'd do differently." },
      { p: "Almost nobody says no to that, because you're asking about their favourite subject and not asking them for anything. And it works — because the next time a role opens, you're a person they spoke to, not a name in a stack." },
      { h: "Go where your industry already gathers" },
      { p: "Professional associations, industry meetups, alumni events, conferences, volunteer committees. The people in those rooms have already self-selected as being interested in your field. That's half the work done." },
      { h: "Online counts, if you actually show up" },
      { p: "Commenting thoughtfully on someone's post, sharing something useful, or messaging a person whose work you found genuinely interesting are all networking. A profile you never post from is a business card in a drawer." },
      { h: "The part everyone skips" },
      { p: "Follow up. A short message the next day referencing something specific from the conversation is what turns a pleasant chat into a contact. Then stay in occasional touch — not asking for anything, just visible." },
      { p: "Done this way it isn't performance. It's a small number of real relationships, built slowly, before you need them." },
    ],
  },
  {
    slug: "beating-procrastination",
    topic: "Study & habits",
    published: "2026-03-31",
    title: "How to get rid of procrastination in five steps",
    blurb: "Set the tone, organise the routine, take small steps, cut distraction, visualise the reward.",
    audience: "students",
    readTime: "5 min",
    standfirst:
      "Procrastination isn't laziness. It's usually a task that feels too big to start.",
    body: [
      { p: "Everyone has told themselves they had a week for something that was due tomorrow. Job searching is unusually vulnerable to it, because nothing is ever formally due and nobody is chasing you." },
      { h: "1. Set the tone early" },
      { p: "Put something scheduled in the first hour of the day. It gets you out of bed at a fixed time and starts the day with a completed thing rather than an open one. Procrastination's closest ally is unstructured time." },
      { h: "2. Give the week a shape" },
      { p: "Allocate blocks to your main activities and keep them roughly consistent. Include the non-work parts — exercise, study, time that's actually off. A routine you can follow beats an ambitious one you abandon on day three." },
      { h: "3. Make the first step embarrassingly small" },
      { p: "\"Rewrite my resume\" is not a task; it's a project, and projects are easy to avoid. \"Rewrite the summary paragraph\" takes twenty minutes and is hard to argue your way out of. Break everything down until the first step is too small to dread." },
      { h: "4. Remove the distraction, don't resist it" },
      { p: "Willpower is a poor long-term strategy. Put the phone in another room, close the tabs, and work in a place associated with working. You're trying to make the distraction inconvenient rather than trying to be strong." },
      { h: "5. Know what you're doing it for" },
      { p: "Vague goals produce vague effort. \"A role in data analysis by June\" gives today's task a reason to exist in a way that \"get a job\" never does. Write the specific version down where you'll see it." },
      { p: "None of this is about discipline. It's about designing the week so that starting is easy and stopping is inconvenient." },
    ],
  },
  {
    slug: "making-the-best-of-studying-online",
    topic: "Study & habits",
    published: "2026-04-07",
    title: "How to make the best of studying online",
    blurb: "Staying engaged, staying visible and staying connected when you're not on campus.",
    audience: "students",
    readTime: "5 min",
    standfirst:
      "Online study saves you the commute and quietly costs you the network. Here's how to keep both.",
    body: [
      { p: "Studying online is convenient and, done passively, isolating. The lectures still get delivered. What disappears is everything that used to happen in the ten minutes before and after them — and that's the part that later turns into references, referrals and friends in your industry." },
      { h: "Build a space that means work" },
      { p: "Somewhere quiet, comfortable enough to sit for two hours, and used for study rather than everything else. The point is the association: you sit down there and your attention knows what's expected." },
      { h: "Sort the technology once" },
      { p: "Test your camera, microphone and connection before the session, not during it. Learn the platform properly. Small friction repeated weekly is what turns cameras off and participation to zero." },
      { h: "Be a person, not a black square" },
      { p: "Turn the camera on. Ask questions. Answer them. Tutors remember the students who participated, and those are the people who get asked about opportunities and who write you a reference that says something." },
      { h: "Keep a schedule you'd keep for a campus" },
      { p: "Fixed hours, breaks that actually happen, and a defined end to the day. Without the structure a campus imposes, study expands to fill everything and is somehow never finished." },
      { h: "Replace what the campus was doing for you" },
      { p: "This is the one that matters most and gets skipped. Join the student society, go to the online events, message the people in your group chat. Your degree gives you a cohort — an online degree gives you one too, but only if you go and find it." },
    ],
  },
  {
    slug: "why-volunteering-is-good-for-your-career",
    topic: "Networking",
    published: "2026-04-14",
    title: "Why volunteering is good for your career",
    blurb: "Discovering what you like, testing career possibilities and expanding your network.",
    audience: "students",
    readTime: "5 min",
    standfirst:
      "The fastest way to get experience when nobody will give you experience.",
    body: [
      { p: "If you're stuck in the loop where every role wants experience and no role will give you any, volunteering is one of the few doors that is genuinely open. It's also one of the most underrated." },
      { h: "You find out what you actually like" },
      { p: "Plenty of people choose a degree at eighteen and discover at twenty-two that they don't enjoy the work. Volunteering lets you test that cheaply, before you've committed a year to a graduate program you'll want to leave." },
      { h: "You get to try a direction without committing" },
      { p: "Curious about marketing, events, community work or project coordination? A few months on a committee tells you more than any amount of reading, and costs you nothing but time." },
      { h: "It's real experience, and it counts" },
      { p: "Work is work. If you ran the social media for a community organisation, coordinated an event, or handled the books for a club, that belongs on your resume with the same achievement statements you'd write for a paid role." },
      { h: "The skills are the ones employers keep naming" },
      { p: "Communication, teamwork, initiative, working with people unlike you, handling something when nobody is supervising. These are the gaps employers say they see most often, and volunteering builds them in an environment that forgives mistakes." },
      { h: "You meet people who can vouch for you" },
      { p: "The person who coordinates the volunteers has a professional network, and now knows whether you show up. That's a reference — and often an introduction." },
      { h: "Choose deliberately" },
      { p: "Pick something adjacent to the field you want, commit to a real length of time, and treat it like a job. A three-month commitment you honoured is worth more than a year of occasional attendance." },
    ],
  },
  {
    slug: "make-the-best-of-your-internship",
    topic: "Internships",
    published: "2026-04-21",
    title: "How to make the best out of your internship",
    blurb: "Turning a placement into skills, relationships and a reference worth having.",
    audience: "students",
    readTime: "6 min",
    standfirst:
      "Getting the placement is the easy half. What you do inside it decides whether it was worth anything.",
    body: [
      { p: "Two people can do the same internship and leave with completely different things. One leaves with a line on a resume. The other leaves with a portfolio piece, three people who'll take their call, and a reference that says something specific." },
      { h: "Decide what you want out of it in week one" },
      { p: "Write down two or three things you want to be able to do, or show, by the end. Then tell your supervisor. Most are glad to be asked, and it changes what work comes your way." },
      { h: "Ask for the work nobody has claimed" },
      { p: "Interns who wait to be given things get given small things. Interns who ask what's sitting undone get the projects that turn into portfolio pieces. Finish what you're given, then ask for more." },
      { h: "Treat the boring tasks as an audition" },
      { p: "Some of it will be dull. Do it properly and on time anyway — that's precisely what people are watching for, because it's what tells them whether you can be trusted with something bigger." },
      { h: "Ask questions early, not late" },
      { p: "Nobody minds a question in the first hour. Everybody minds discovering in week three that you've been doing it wrong since week one." },
      { h: "Meet people outside your immediate team" },
      { p: "Have coffee with people in other parts of the organisation. Ask how they got there. You're inside a building full of people in your industry — that access disappears the day you leave." },
      { h: "Write down what you did, as you do it" },
      { p: "Keep a running note of tasks, projects and outcomes. When you sit down to update your resume, the detail will otherwise be gone." },
      { h: "Finish properly" },
      { p: "Thank people individually. Ask your supervisor for a written reference and a LinkedIn recommendation while you're still fresh in their mind. Connect with everyone you worked with. Then stay in loose touch." },
    ],
  },
  {
    slug: "turn-your-internship-into-a-full-time-job",
    topic: "Internships",
    published: "2026-04-28",
    title: "How to turn your internship into a full-time job",
    blurb: "Informational interviews, referrals, and becoming the obvious person to keep.",
    audience: "students",
    readTime: "6 min",
    standfirst:
      "Nobody is obliged to keep you. Here's how to make keeping you the easy decision.",
    body: [
      { p: "A placement doesn't convert on its own. It converts when the organisation reaches a point where hiring you is less work and less risk than hiring anyone else — and that's something you can influence deliberately." },
      { h: "Be reliable before you're impressive" },
      { p: "Turn up, hit the dates, flag problems early. Brilliance is memorable, but reliability is what people are actually deciding about when they consider whether to keep someone." },
      { h: "Say it out loud, early" },
      { p: "Tell your supervisor around the midpoint that you'd like to stay if a role comes up, and ask what would need to be true for that to happen. You'll get a straight answer and, more importantly, you'll be on the list when a conversation happens without you in the room." },
      { h: "Make yourself known past your own team" },
      { p: "The role might open somewhere else in the organisation. If only your immediate supervisor knows your name, you'll never hear about it." },
      { h: "Leave something behind" },
      { p: "Finish something that outlasts you — a process documented, a backlog cleared, a tool built. \"We should keep them\" is much easier to say when there's a visible gap where your work was." },
      { h: "If there's no role, ask for the next best thing" },
      { p: "Sometimes there genuinely is no budget. In that case ask for three things: a written reference, a LinkedIn recommendation, and an introduction to two people in their network. All three cost them nothing and are worth a great deal to you." },
      { h: "Stay in touch afterwards" },
      { p: "Budgets change. Check in every couple of months with something useful rather than a request. People hire the person they've been talking to." },
    ],
  },
  {
    slug: "five-practices-that-prevent-internship-success",
    topic: "Internships",
    published: "2026-05-05",
    title: "Five practices that prevent internship success",
    blurb: "The habits that quietly stop a placement turning into anything.",
    audience: "students",
    readTime: "5 min",
    standfirst:
      "None of these get you removed. They just quietly make sure the placement leads nowhere.",
    body: [
      { p: "Most placements that go nowhere don't fail dramatically. They fail through five ordinary habits that nobody bothers to mention at the time." },
      { h: "1. Waiting to be told" },
      { p: "Doing exactly what you're given and then sitting quietly is the most common one. Supervisors are busy. If you're not asking for work, you'll be given whatever is nearest, and nothing that stretches you." },
      { h: "2. Treating it as an observation exercise" },
      { p: "If you never get your hands on real work, you'll leave with nothing to point at. Ask to own something — however small — from start to finish." },
      { h: "3. Staying inside your own team" },
      { p: "You have temporary access to an entire organisation of people in your industry. Spending all of it at one desk is the largest wasted opportunity in most placements." },
      { h: "4. Hiding mistakes" },
      { p: "Everyone expects an intern to get things wrong. What people remember is whether you raised it immediately or let it get worse. Raising it early is genuinely a mark in your favour." },
      { h: "5. Leaving without asking for anything" },
      { p: "Walking out on the last day with a wave costs you the reference, the recommendation and the introductions — all of which are freely given if you ask, and nearly impossible to get six months later." },
      { p: "None of these are effort problems. They're all just things nobody told you to do." },
    ],
  },
  // ------------------------------------------------------------- employers
  {
    slug: "why-internship-programs-are-worth-running",
    topic: "For employers",
    published: "2026-05-12",
    title: "Why internship programs are worth running",
    blurb: "Finding future employees, lifting productivity and building leadership in your current team.",
    audience: "employers",
    readTime: "6 min",
    standfirst:
      "The case for hosting interns isn't charity. It's a recruitment and development channel most organisations underuse.",
    body: [
      { p: "Hosting an intern is usually framed as doing someone a favour. It's more useful to think of it as a low-risk way to solve three problems you already have." },
      { h: "You get an extended look before you hire" },
      { p: "A recruitment process gives you a resume, two interviews and a reference check. A placement gives you weeks of watching someone actually do the work with your team, your systems and your clients. That is a far better basis for a hiring decision, and considerably cheaper than a mis-hire." },
      { h: "Real capacity on work that keeps slipping" },
      { p: "Most organisations carry a backlog of genuinely useful work that never reaches the top of anyone's list — documentation, analysis, process tidy-ups, research. Well-scoped, that work is a good project for an intern and a real gain for you." },
      { h: "It develops your existing people" },
      { p: "Supervising someone is how a strong individual contributor starts becoming a manager. A placement gives one of your senior people a low-stakes way to practise delegating, giving feedback and being accountable for someone else's development." },
      { h: "Fresh eyes on things you've stopped seeing" },
      { p: "Someone who arrived last week will ask why a process works the way it does. Occasionally there's no good answer, and that's worth knowing." },
      { h: "What makes it work" },
      { ul: [
        "A defined project with a real outcome, not a pile of admin.",
        "One named supervisor who has actual time allocated.",
        "Clear expectations set in the first week — what they'll do, learn and leave with.",
        "An honest conversation at the end, whether or not there's a role.",
      ] },
      { p: "Placements that fail almost always fail on the first two. The intern isn't the variable." },
    ],
  },
  {
    slug: "employability-skills-australian-businesses-look-for",
    topic: "For employers",
    published: "2026-05-19",
    title: "Employability skills Australian businesses look for",
    blurb: "What hiring managers actually screen for beyond the qualification.",
    audience: "employers",
    readTime: "6 min",
    standfirst:
      "The qualification gets someone shortlisted. These are what decide whether they're any good once they arrive.",
    body: [
      { p: "Ask a hiring manager why a junior hire didn't work out and you rarely hear that they lacked technical ability. You hear that they couldn't explain their thinking, didn't ask for help, or needed managing more closely than the role allowed." },
      { h: "Communication" },
      { p: "Writing an email that lands, explaining technical work to someone who isn't technical, listening properly, and disagreeing without damaging the relationship. This is named more often than anything else, in every industry." },
      { h: "Working with people who aren't like you" },
      { p: "Australian workplaces are mixed by background, age and discipline. The ability to build rapport across those differences is a practical daily skill, not a values statement." },
      { h: "Problem solving and initiative" },
      { p: "The difference between someone who brings you a problem and someone who brings you a problem plus two options. That habit can be taught, and rarely is." },
      { h: "Adaptability" },
      { p: "Priorities change, systems change, restructures happen. How someone responds to that is usually more consequential than what they knew on day one." },
      { h: "Professional presence" },
      { p: "Reliability, ownership, knowing how to hold a room, and being someone a client can be put in front of. It's the least teachable-sounding of the list and one of the most learnable." },
      { h: "Why the gap exists" },
      { p: "None of these are covered by a degree. They're picked up by accident, from a good manager or a lucky first job — and then people are judged on them as though they're personality traits. They aren't. They're skills, and they respond to being taught deliberately." },
    ],
  },
  {
    slug: "learning-at-work",
    topic: "For employers",
    published: "2026-05-26",
    title: "Learning at work — and why most of it doesn't stick",
    blurb: "Setting objectives, defining strategy, building support and maintaining progress.",
    audience: "employers",
    readTime: "7 min",
    standfirst:
      "Everyone has sat through training that changed nothing. The reasons are consistent and mostly fixable.",
    body: [
      { p: "Organisations spend real money on development and often can't point to what changed. That's usually not the content's fault. It's what happened around it." },
      { h: "Start from the gap, not the catalogue" },
      { p: "Most training is chosen because it was available, not because someone defined the problem. Name the specific behaviour you want to be different afterwards — and if you can't, no course will fix it." },
      { h: "One day of anything changes very little" },
      { p: "People forget most of what they hear in a single session unless they use it almost immediately. Spacing the same content across weeks, with something to apply in between, works dramatically better than a full day once." },
      { h: "Practice beats presentation" },
      { p: "You cannot learn to handle a difficult conversation by watching slides about difficult conversations. If nobody practises out loud and gets feedback, it isn't training — it's a briefing." },
      { h: "Managers decide whether it survives" },
      { p: "If a participant's manager never mentions it again, the learning quietly stops on Monday. If the manager asks what they're trying and makes room for it, it holds. That's the single largest variable and it costs nothing." },
      { h: "Build it into the actual work" },
      { p: "Give people a real task that requires the new skill within a fortnight. Applied once in a real situation beats any amount of reinforcement in theory." },
      { h: "Decide in advance what you'll look at" },
      { p: "Attendance and satisfaction scores tell you almost nothing. Pick something observable — fewer escalations, faster turnaround, better-run meetings — and agree on it before you start, so the next proposal has evidence behind it." },
    ],
  },
  // ---------------------------------------------------- education partners
  {
    slug: "why-internships-matter-to-graduate-outcomes",
    topic: "For institutions",
    published: "2026-06-02",
    title: "Why internships matter to graduate outcomes",
    blurb: "The link between real work experience and how quickly your graduates convert.",
    audience: "education-partners",
    readTime: "6 min",
    standfirst:
      "Graduate outcome figures are shaped by things that happen outside the curriculum. This is the largest of them.",
    body: [
      { p: "Institutions are measured on employment outcomes but only partly control them. Teaching quality can be excellent while conversion figures stay flat, because what decides an early-career hire happens after graduation and mostly outside the syllabus." },
      { h: "Employers screen for evidence, not potential" },
      { p: "Given two graduates with the same qualification, one with workplace experience and one without, the experienced one is the lower-risk hire. That's the whole calculation, and it explains a lot of the gap between capable students and slow outcomes." },
      { h: "Experience is what makes a graduate legible" },
      { p: "A student who has worked can answer the behavioural questions, has something concrete to put on a resume, and can talk about their degree in terms of what it let them do. Without that, they're describing coursework to someone who wants to hear about work." },
      { h: "It matters most for the students who need it most" },
      { p: "International students, first-in-family students and career changers are least likely to have an existing professional network to fall back on. Work-integrated learning substitutes for the network they don't have, which is why it moves outcomes furthest for exactly those cohorts." },
      { h: "The bottleneck is supervision, not willingness" },
      { p: "Most institutions want more placements. What limits them is sourcing hosts and assuring quality once students are there — both of which are jobs in themselves, and neither of which a careers team is usually resourced for." },
      { h: "What good looks like" },
      { ul: [
        "Real deliverables with deadlines, not observation.",
        "A named supervisor accountable for the student's development.",
        "Coaching alongside the placement, so students can articulate the experience afterwards.",
        "Something the student leaves holding — a portfolio piece and a genuine reference.",
      ] },
      { p: "A placement that ends in a certificate of attendance has not moved anyone's outcome figures." },
    ],
  },
  {
    slug: "building-employability-into-the-student-experience",
    topic: "For institutions",
    published: "2026-06-09",
    title: "Building employability into the student experience",
    blurb: "Where career support has the most impact, and when in the journey to deliver it.",
    audience: "education-partners",
    readTime: "7 min",
    standfirst:
      "Employability support delivered in the final semester is delivered too late to change much.",
    body: [
      { p: "Most institutions offer career support and most offer it as a service students opt into — usually near the end, usually when they're already anxious. The students who most need it are the least likely to come and find it." },
      { h: "Start earlier than feels necessary" },
      { p: "First and second year is when students can still act on what they learn: choose electives deliberately, take a placement, start volunteering, build a network before they need one. By final semester the options have narrowed to applying." },
      { h: "Curricular beats extracurricular" },
      { p: "Optional workshops reach the confident students who were going to be fine. Embedding the same content in a course reaches the ones who wouldn't have signed up — which is where the outcome movement actually is." },
      { h: "Sequence it across the degree" },
      { ul: [
        "Early: self-awareness, what the industry looks like, why any of this matters.",
        "Middle: work experience, professional communication, building a network.",
        "Late: resumes, interviews, targeting and the mechanics of applying.",
      ] },
      { h: "Generic advice at scale stops working" },
      { p: "One careers adviser to several thousand students permits only general guidance. General guidance is exactly what fails in a competitive market, and it fails hardest for international cohorts who need advice specific to how Australian employers screen." },
      { h: "Practitioners land differently" },
      { p: "Students discount advice from someone who hasn't hired anyone. The same content delivered by a person who has sat on the other side of the table gets heard — not because it's better, but because it's credible." },
      { h: "Measure something real" },
      { p: "Attendance tells you nothing. Look at whether students who received support are converting faster than those who didn't, and use that to argue for resourcing the thing that worked." },
    ],
  },
];

export const topics = (): Topic[] => {
  const seen = new Set<Topic>();
  for (const g of guides) if (g.body?.length) seen.add(g.topic);
  return [...seen];
};

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);
export const publishedGuides = () => guides.filter((g) => g.body?.length);
