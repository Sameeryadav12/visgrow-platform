import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import FaqAccordion from "@/components/FaqAccordion";
import PartnerEnquiryForm from "@/components/PartnerEnquiryForm";
import { getSiteSettings } from "@/lib/cms";
import { getPageCopy, t, list, texts } from "@/lib/page-copy";
import GoogleReviews from "@/components/GoogleReviews";

export const metadata: Metadata = {
  title: "Workforce Capability Development for Employers | Visgrow Adelaide",
  description:
    "Visgrow runs practical workshops inside your organisation — turning technically capable junior staff into confident, communicative professionals ready for senior responsibility.",
  alternates: { canonical: "/employers" },
};

const pains = [
  {
    icon: "🗣️",
    title: "Technically strong. Professionally stuck.",
    body: "They can do the work. They can't present it to a client, push back in a meeting, or write an email that lands the way they meant it.",
  },
  {
    icon: "📈",
    title: "You promote your best specialist — and lose a good specialist",
    body: "Nobody taught them to lead. So a strong individual contributor becomes a struggling manager, and two roles suffer instead of one.",
  },
  {
    icon: "🚪",
    title: "The good ones leave first",
    body: "Junior staff who can't see a path out of junior go looking for one somewhere else. Replacing them costs far more than developing them.",
  },
  {
    icon: "⏱️",
    title: "Nobody internally has time to train them",
    body: "Your seniors are billable, stretched, and were never taught to teach. So development gets postponed to a quarter that never arrives.",
  },
];

const services = [
  {
    id: "workforce-capability",
    tag: "Service 01",
    title: "Workforce Capability Development",
    body: "We come to you and run practical workshops with your team — communication, professional presence, client confidence, personal brand and the workplace skills nobody formally teaches. Delivered on site, built around your organisation rather than a generic curriculum.",
    points: [
      "Delivered at your workplace, around your schedule",
      "Tailored to your industry and your team's actual gaps",
      "Practical and participatory — not slides being read at people",
      "Half-day, full-day or a program across several weeks",
    ],
  },
  {
    id: "emerging-leaders",
    tag: "Service 02",
    title: "Emerging Leaders Program",
    body: "For the people you're about to promote, or wish you could. A structured program that builds the leadership, communication and decision-making capability that turns a capable junior into someone you can hand responsibility to without worrying.",
    points: [
      "Identify and develop your next layer of leaders",
      "Confidence, influence and difficult conversations",
      "Goal setting, accountability and managing others",
      "Runs alongside their day job, not instead of it",
    ],
  },
];

const consequences = [
  "Capability plateaus. Your senior people stay the bottleneck because nobody underneath them can take the load.",
  "You keep hiring externally for roles you could have grown into, paying a premium and rolling the dice on culture.",
  "Your best juniors quietly become someone else's mid-level hires.",
];

const steps = [
  {
    n: "01",
    title: "A conversation, not a pitch",
    body: "We ask what's actually going wrong — where people stall, who you're worried about losing, what you've already tried.",
  },
  {
    n: "02",
    title: "We scope it around your team",
    body: "Content, format and length shaped to your industry and the specific gaps, rather than a package we run for everyone.",
  },
  {
    n: "03",
    title: "We deliver on site",
    body: "Practical, participatory workshops at your workplace, run by someone who has managed teams rather than only studied them.",
  },
  {
    n: "04",
    title: "You see it in the work",
    body: "Better client conversations, clearer written communication, people volunteering for things they used to avoid.",
  },
];

const faqs = [
  {
    q: "Are you recruiting for us, or training our people?",
    a: "Training your people. We're not a recruitment agency and we don't place staff into your business. Workforce Capability Development is about developing the team you already have — turning capable juniors into confident professionals ready for more responsibility.",
  },
  {
    q: "Where does the training happen?",
    a: "Usually at your workplace — we come to you. That keeps it practical, keeps travel time down for your team, and lets us work with real scenarios from your business rather than hypotheticals.",
  },
  {
    q: "How long does a program run?",
    a: "It depends on what you need. Some organisations want a focused half-day on presentation and client confidence; others run a program across several weeks. We scope it with you rather than selling a fixed package.",
  },
  {
    q: "What size teams do you work with?",
    a: "Anything from a handful of juniors to a full department. Smaller groups tend to get more out of it because there's more room for practice and honest feedback.",
  },
  {
    q: "Can you work with our graduate intake?",
    a: "Yes — that's one of the most common requests. New graduates arrive technically prepared and professionally green. A short, well-timed program shortens the runway to them being genuinely useful.",
  },
];

export default async function EmployersPage() {
  const copy = await getPageCopy("/employers");
  const cms_pains = list(copy?.pain?.items, pains);
  const cms_consequences = texts(copy?.consequences?.items, consequences);
  const cms_steps = list(copy?.how?.steps, steps);
  const settings = await getSiteSettings();
  const phone = settings?.phone || "1300 891 365";
  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;
  const email = settings?.email || "hello@visgrowinternships.com.au";
  const address = settings?.address || "Innovation House, Mawson Lakes SA";
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-brand-gradient text-white">
        <div className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10 lg:py-28">
          <nav aria-label="Breadcrumb" className="mb-6 text-[12.5px] font-semibold text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white">Employers</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[1.5px]">
                For Employers
              </span>

              <h1 className="mb-6 text-[clamp(32px,4.8vw,56px)] leading-[1.02]">
                {t(copy?.hero?.heading, "Your juniors already have the skills. We build the professionals.")}
              </h1>

              <p className="mb-9 max-w-[560px] text-[16.5px] leading-[1.65] text-white/90">
                Visgrow comes into your workplace and runs practical workshops
                that turn technically capable junior staff into confident,
                credible people you can put in front of a client — and
                eventually, in charge of others.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="#workforce-capability"
                  className="rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-brand-purple shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition-transform hover:-translate-y-1"
                >
                  See what we deliver →
                </Link>
                <Link
                  href="#partner"
                  className="rounded-xl border-2 border-white/70 px-8 py-4 text-[15px] font-extrabold text-white transition-all hover:-translate-y-1 hover:bg-white/15"
                >
                  Talk to us
                </Link>
              </div>
            </div>

            <div className="relative h-[340px] overflow-hidden rounded-[20px] border border-white/25 shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
              <Image
                src="/images/real/pmi-presenting.jpg"
                alt="Mustafa Kadir delivering a Visgrow workshop to a room of professionals"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ 1 · PAIN ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="emp-pain">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[720px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.pain?.eyebrow, "You've probably seen this")}
            </span>
            <h2 id="emp-pain" className="mb-5 text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.pain?.heading, "The gap isn't technical. It never is.")}
            </h2>
            <p className="text-[16px] leading-[1.7] text-brand-sub">
              You didn&apos;t hire badly. Universities produce technically
              competent graduates — they just don&apos;t produce finished
              professionals, and that last stretch is left to you.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {cms_pains.map((p) => (
              <div key={p.title} className="flex items-start gap-4 rounded-[18px] border border-[var(--color-line)] bg-white p-7 card-lift">
                <span aria-hidden="true" className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[13px] bg-brand-lavender text-[20px]">
                  {p.icon}
                </span>
                <span>
                  <strong className="mb-1.5 block text-[16.5px] font-extrabold text-[var(--color-ink)]">
                    {p.title}
                  </strong>
                  <span className="block text-[14.5px] leading-[1.6] text-brand-sub">{p.body}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 2 · IMPORTANCE ============ */}
      <section className="bg-brand-deep py-20 text-white reveal" aria-labelledby="emp-importance">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-6 lg:grid-cols-[1fr_auto] lg:px-10">
          <div>
            <span className="mb-4 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-orange">
              {t(copy?.importance?.eyebrow, "Why it matters commercially")}
            </span>
            <h2 id="emp-importance" className="mb-6 max-w-[620px] text-[clamp(30px,3.8vw,46px)]">
              {t(copy?.importance?.heading, "Capability is cheaper to build than to buy.")}
            </h2>
            <p className="max-w-[620px] text-[16.5px] leading-[1.7] text-white/85">
              Replacing a junior professional costs a meaningful share of their
              salary once you count recruitment, onboarding and the months
              before they&apos;re productive. Developing the person you already
              have — who already knows your clients, your systems and your
              culture — is almost always the better trade.
            </p>
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-4 lg:w-[340px]">
            {[
              { k: "Ramp-up", v: "A new hire takes months to become genuinely productive." },
              { k: "Retention", v: "Developing someone costs less than replacing them." },
              { k: "Soft skills", v: "The gap employers name most often isn't technical." },
              { k: "On site", v: "Delivered at your workplace, around your schedule." },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                <div className="text-[22px] leading-none text-[#F6A83D]" style={{ fontFamily: "var(--font-heading)" }}>
                  {s.k}
                </div>
                <p className="mt-2 text-[11.5px] font-semibold leading-snug text-white/80">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3 · BENEFITS / SERVICES ============ */}
      <section
        id="workforce-capability"
        className="scroll-mt-24 bg-brand-lavender py-24 reveal"
        aria-labelledby="emp-services"
      >
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[700px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.benefits?.eyebrow, "What we deliver")}
            </span>
            <h2 id="emp-services" className="mb-5 text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.benefits?.heading, "Two ways we build your people.")}
            </h2>
            <p className="text-[16px] leading-[1.7] text-brand-sub">
              We&apos;re not a recruiter and we don&apos;t place staff with
              you. We develop the team you already employ.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((s) => (
              <article
                key={s.id}
                id={s.id}
                className="scroll-mt-24 rounded-[20px] border border-[var(--color-line)] bg-white p-8 lg:p-9"
              >
                <span className="mb-3 block text-[12px] font-extrabold uppercase tracking-[1.6px] text-brand-pink">
                  {s.tag}
                </span>
                <h3 className="mb-4 text-[27px] text-[var(--color-ink)]">{s.title}</h3>
                <p className="mb-6 text-[14.5px] leading-[1.7] text-brand-sub">{s.body}</p>
                <ul className="flex flex-col gap-3">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-[14px] leading-snug text-[var(--color-ink)]">
                      <span className="font-black text-[#1cae6f]" aria-hidden="true">✓</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4 · CONSEQUENCES ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="emp-consequences">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-10">
          <div className="mb-10 max-w-[700px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.consequences?.eyebrow, "If it stays on the to-do list")}
            </span>
            <h2 id="emp-consequences" className="text-[clamp(28px,3.6vw,42px)] text-[var(--color-ink)]">
              {t(copy?.consequences?.heading, "Development postponed is capability lost.")}
            </h2>
          </div>
          <ul className="flex flex-col gap-4">
            {cms_consequences.map((c) => (
              <li key={c} className="rounded-[16px] border-l-4 border-brand-pink bg-[#fff5f7] p-5 text-[14.5px] leading-[1.6] text-[var(--color-ink)]">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 5 · RESULTS ============ */}
      <section id="testimonials" className="scroll-mt-24 bg-brand-gradient py-24 text-white reveal" aria-labelledby="emp-results">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          <div className="mb-12 max-w-[680px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-white/80">
              {t(copy?.results?.eyebrow, "Who you'd be working with")}
            </span>
            <h2 id="emp-results" className="text-[clamp(30px,3.8vw,46px)]">
              {t(copy?.results?.heading, "Delivered by someone who has actually managed teams.")}
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:items-center">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[20px] border border-white/25">
              <Image
                src="/images/mustafa-kadir.jpg"
                alt="Mustafa Kadir, Founder of Visgrow"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover object-center"
              />
            </div>
            <div>
              <blockquote className="mb-6 text-[clamp(20px,2.4vw,28px)] leading-[1.3]" style={{ fontFamily: "var(--font-heading)" }}>
                &ldquo;I&apos;ve hired, managed and mentored across IT,
                consulting and general management. I know the difference
                between someone who can do the job and someone you can rely
                on — and I know it&apos;s teachable.&rdquo;
              </blockquote>
              <p className="text-[15.5px] font-extrabold">
                Mustafa Kadir
                <span className="mt-0.5 block text-[13.5px] font-medium opacity-85">
                  Founder &amp; Managing Director, Visgrow
                </span>
              </p>
              <ul className="mt-6 flex flex-wrap gap-3">
                {[
                  "20+ Years Industry Experience",
                  "Former VP, ASP",
                  "ACS Board Member",
                  "Australia Day Council Committee",
                ].map((b) => (
                  <li key={b} className="rounded-[10px] border border-white/30 bg-white/15 px-4 py-2.5 text-[12.5px] font-bold">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Real Google reviews. Mustafa has no employer testimonials yet, so
          rather than inventing any, this shows whatever Google actually
          holds — and shows nothing until there is something to show. */}
      <GoogleReviews heading="What people say about working with us" />

      {/* ============ 6 · HOW TO IMPLEMENT ============ */}
      <section className="bg-white py-24 reveal" aria-labelledby="emp-how">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="mb-12 max-w-[660px]">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              {t(copy?.how?.eyebrow, "How it works")}
            </span>
            <h2 id="emp-how" className="text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              {t(copy?.how?.heading, "Simple to start. Scoped around you.")}
            </h2>
          </div>

          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cms_steps.map((s, i) => (
              <li key={String(i + 1).padStart(2, "0")} className="rounded-[18px] border border-[var(--color-line)] bg-white p-7 card-lift">
                <span className="mb-5 block text-[40px] leading-none text-brand-gradient" style={{ fontFamily: "var(--font-heading)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2.5 text-[16.5px] font-extrabold text-[var(--color-ink)]" style={{ fontFamily: "var(--font-body)" }}>
                  {s.title}
                </h3>
                <p className="text-[13.5px] leading-[1.6] text-brand-sub">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="bg-brand-lavender py-24 reveal" aria-labelledby="emp-faq">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10">
          <div className="mb-11">
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-brand-pink">
              Common questions
            </span>
            <h2 id="emp-faq" className="text-[clamp(30px,3.8vw,46px)] text-[var(--color-ink)]">
              What employers usually ask first.
            </h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* ============ PARTNER WITH VISGROW ============ */}
      <section id="partner" className="scroll-mt-24 bg-brand-gradient py-24 text-white reveal" aria-labelledby="emp-partner">
        <div className="mx-auto grid max-w-[1240px] gap-14 px-6 lg:grid-cols-2 lg:items-start lg:px-10">
          <div>
            <span className="mb-3 block text-[13px] font-extrabold uppercase tracking-[2px] text-[#F6A83D]">
              {t(copy?.cta?.eyebrow, "Partner with Visgrow")}
            </span>
            <h2 id="emp-partner" className="mb-5 text-[clamp(30px,3.8vw,46px)]">
              {t(copy?.cta?.heading, "Tell us who you're trying to develop.")}
            </h2>
            <p className="mb-9 max-w-[480px] text-[16.5px] leading-[1.7] text-white/88">
              No pitch deck and no obligation. A conversation about where your
              people are stalling, and whether we&apos;re the right fit to
              help — we&apos;ll say so if we&apos;re not.
            </p>

            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3.5">
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/18 text-[17px]">📞</span>
                <span>
                  <a href={phoneHref} className="block text-[15.5px] font-extrabold hover:underline">{phone}</a>
                  <span className="block text-[13px] text-white/70">Mon–Fri, business hours</span>
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/18 text-[17px]">✉️</span>
                <span>
                  <a href={`mailto:${email}`} className="block text-[15.5px] font-extrabold hover:underline">
                    {email}
                  </a>
                  <span className="block text-[13px] text-white/70">We reply within one business day</span>
                </span>
              </li>
            </ul>
          </div>

          <PartnerEnquiryForm
            audience="Employer"
            interests={[
              "Workforce Capability Development",
              "Emerging Leaders Program",
              "Graduate intake development",
              "Not sure yet — I'd like to talk",
            ]}
          />
        </div>
      </section>
    </>
  );
}
