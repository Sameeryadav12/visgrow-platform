import Link from "next/link";

export default function ComingSoon({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="flex flex-1 items-center bg-brand-gradient py-28 text-white">
      <div className="mx-auto max-w-[720px] px-6 text-center lg:px-10">
        <span className="mb-4 inline-block rounded-full border border-white/35 bg-white/15 px-4 py-1.5 text-[12.5px] font-extrabold uppercase tracking-[1.5px]">
          {eyebrow}
        </span>
        <h1 className="mb-5 text-[clamp(32px,4.4vw,52px)]">{title}</h1>
        <p className="mb-9 text-[16.5px] leading-[1.7] text-white/88">{body}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/get-started"
            className="rounded-xl bg-white px-8 py-4 text-[15px] font-extrabold text-brand-purple shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition-transform hover:-translate-y-1"
          >
            Let&apos;s Chat — No Pressure
          </Link>
          <Link
            href="/"
            className="rounded-xl border-2 border-white/70 px-8 py-4 text-[15px] font-extrabold text-white transition-all hover:-translate-y-1 hover:bg-white/15"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
