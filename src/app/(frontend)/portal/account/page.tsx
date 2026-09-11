import type { Metadata } from "next";
import { getCurrentStudent } from "@/lib/lms-auth";
import { getPortalData, formatDay } from "@/lib/portal";

export const metadata: Metadata = {
  title: "Your account | Visgrow",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const STATUS: Record<string, string> = {
  active: "Active",
  paused: "Paused",
  finished: "Finished",
  revoked: "Closed",
};

export default async function PortalAccountPage() {
  const student = (await getCurrentStudent())!;
  const { programs } = await getPortalData(student);

  return (
    <div className="mx-auto max-w-[1000px] px-6 py-10 lg:px-10 lg:py-14">
      <h1 className="mb-2 text-[clamp(26px,3.4vw,38px)] leading-[1.1] text-[var(--color-ink)]">
        Your account
      </h1>
      <p className="mb-9 max-w-[560px] text-[15.5px] leading-[1.65] text-brand-sub">
        What we hold, and what you&apos;ve bought.
      </p>

      <section className="mb-6 rounded-[16px] border border-[var(--color-line)] bg-white p-7">
        <h2 className="mb-5 text-[17px] font-extrabold text-[var(--color-ink)]">
          Your details
        </h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <Detail label="Name" value={student.name} />
          <Detail label="Email" value={student.email} />
          {student.phone && <Detail label="Phone" value={student.phone} />}
          <Detail label="Access" value={STATUS[student.status] ?? student.status} />
          {student.startDate && (
            <Detail
              label="Accelerator started"
              value={formatDay(student.startDate)}
            />
          )}
        </dl>
        <p className="mt-6 text-[13.5px] leading-relaxed text-brand-sub">
          Something wrong? Email{" "}
          <a
            href="mailto:info@visgrowinternships.com.au"
            className="font-semibold text-brand-purple underline underline-offset-2"
          >
            info@visgrowinternships.com.au
          </a>{" "}
          or call 1300 891 365 and we&apos;ll fix it.
        </p>
      </section>

      <section className="mb-6 rounded-[16px] border border-[var(--color-line)] bg-white p-7">
        <h2 className="mb-5 text-[17px] font-extrabold text-[var(--color-ink)]">
          What you&apos;ve bought
        </h2>
        {programs.length === 0 ? (
          <p className="text-[14.5px] leading-relaxed text-brand-sub">
            Nothing recorded against your account yet. If you&apos;ve paid for
            something and it isn&apos;t showing, tell us and we&apos;ll sort it
            today.
          </p>
        ) : (
          <ul className="grid gap-3">
            {programs.map((p) => (
              <li
                key={p.id}
                className="rounded-[12px] bg-brand-lavender px-5 py-4"
              >
                <p className="text-[15.5px] font-extrabold text-[var(--color-ink)]">
                  {p.title}
                </p>
                {p.tagline && (
                  <p className="mt-1 text-[13.5px] leading-relaxed text-brand-sub">
                    {p.tagline}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-[16px] border border-[var(--color-line)] bg-white p-7">
        <h2 className="mb-3 text-[17px] font-extrabold text-[var(--color-ink)]">
          Your privacy
        </h2>
        <p className="text-[14.5px] leading-relaxed text-brand-sub">
          Your files and session notes are visible only to you and to Visgrow.
          You can ask us to delete your account and everything in it at any
          time — see the{" "}
          <a
            href="/privacy-policy"
            className="font-semibold text-brand-purple underline underline-offset-2"
          >
            privacy policy
          </a>
          .
        </p>
      </section>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="mb-1 text-[11.5px] font-extrabold uppercase tracking-[1.2px] text-brand-sub">
        {label}
      </dt>
      <dd className="text-[15.5px] font-semibold text-[var(--color-ink)]">
        {value}
      </dd>
    </div>
  );
}
