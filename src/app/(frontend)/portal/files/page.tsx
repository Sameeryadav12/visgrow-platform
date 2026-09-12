import type { Metadata } from "next";
import { requireStudent } from "@/lib/lms-auth";
import { getPortalData, formatDay } from "@/lib/portal";

export const metadata: Metadata = {
  title: "Your files | Visgrow",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const KIND_LABEL: Record<string, string> = {
  feedback: "Feedback",
  template: "Template",
  summary: "Session summary",
  invoice: "Invoice",
  other: "Document",
};

const prettySize = (bytes?: number | null) =>
  !bytes ? "" : bytes > 1_048_576
    ? `${(bytes / 1_048_576).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

export default async function PortalFilesPage() {
  const student = await requireStudent();
  const { documents } = await getPortalData(student);

  return (
    <div className="mx-auto max-w-[1000px] px-6 py-10 lg:px-10 lg:py-14">
      <h1 className="mb-2 text-[clamp(26px,3.4vw,38px)] leading-[1.1] text-[var(--color-ink)]">
        Your files
      </h1>
      <p className="mb-9 max-w-[560px] text-[15.5px] leading-[1.65] text-brand-sub">
        Everything we&apos;ve written for you. Only you can open these — they
        aren&apos;t shared, indexed, or visible to anyone else.
      </p>

      {documents.length === 0 ? (
        <div className="rounded-[16px] border border-[var(--color-line)] bg-white p-8">
          <p className="mb-2 text-[17px] font-extrabold text-[var(--color-ink)]">
            Nothing here yet.
          </p>
          <p className="text-[14.5px] leading-relaxed text-brand-sub">
            After your first session, your notes, feedback and any templates we
            put together will show up here — and stay here.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4">
          {documents.map((d) => (
            <li
              key={d.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-[16px] border border-[var(--color-line)] bg-white p-6"
            >
              <div className="min-w-[240px] flex-1">
                <span className="mb-2 inline-block rounded-full bg-brand-lavender px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-[1px] text-brand-purple">
                  {KIND_LABEL[d.kind] ?? "Document"}
                </span>
                <p className="mb-1 text-[16.5px] font-extrabold leading-snug text-[var(--color-ink)]">
                  {d.title}
                </p>
                {d.note && (
                  <p className="mb-1.5 max-w-[560px] text-[14px] leading-relaxed text-brand-sub">
                    {d.note}
                  </p>
                )}
                <p className="text-[12.5px] text-brand-sub">
                  Added {formatDay(d.createdAt)}
                  {d.filesize ? ` · ${prettySize(d.filesize)}` : ""}
                </p>
              </div>
              <a
                href={`/api/portal/file/${d.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-brand-gradient px-6 py-3 text-[13.5px] font-extrabold text-white"
              >
                Open
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
