import React from "react";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Replaces the default wall of identical grey cards.
 *
 * The default dashboard treats "Company logos" and "Enquiries" as equally
 * important. They are not — new enquiries are money waiting to be called
 * back, so they go first and loudest. Everything else is a quiet shortcut.
 */

const GRADIENT =
  "linear-gradient(90deg,#6918dc 0%,#b625b9 30%,#e94b6c 60%,#f6a83d 100%)";

async function counts() {
  try {
    const payload = await getPayload({ config });
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const openStatuses = ["new", "contacted", "booked"];

    const [all, fresh, due, hot, pipeline] = await Promise.all([
      payload.count({ collection: "enquiries" }),
      payload.count({
        collection: "enquiries",
        where: { status: { equals: "new" } },
      }),
      // Anyone whose follow-up date has arrived and who isn't closed out.
      payload.count({
        collection: "enquiries",
        where: {
          and: [
            { followUpDate: { less_than_equal: endOfToday.toISOString() } },
            { status: { in: openStatuses } },
          ],
        },
      }),
      payload.count({
        collection: "enquiries",
        where: {
          and: [{ priority: { equals: "hot" } }, { status: { in: openStatuses } }],
        },
      }),
      payload.find({
        collection: "enquiries",
        where: { status: { in: openStatuses } },
        limit: 1000,
        depth: 0,
        pagination: false,
      }),
    ]);

    const worth = pipeline.docs.reduce(
      (sum, d) => sum + (typeof d.value === "number" ? d.value : 0),
      0,
    );

    return {
      all: all.totalDocs,
      fresh: fresh.totalDocs,
      due: due.totalDocs,
      hot: hot.totalDocs,
      worth,
    };
  } catch {
    return null;
  }
}

/* Pre-built filters, so the useful views are one click rather than a
   filter-builder Mustafa would have to learn. */
const OPEN = "where[status][in]=new,contacted,booked";
const FOLLOW_UP_URL = `/admin/collections/enquiries?${OPEN}&sort=followUpDate`;
const HOT_URL = `/admin/collections/enquiries?where[priority][equals]=hot&${OPEN}`;

const pill: React.CSSProperties = {
  display: "inline-block",
  background: "rgba(255,255,255,0.2)",
  border: "1px solid rgba(255,255,255,0.4)",
  color: "#fff",
  padding: "7px 15px",
  borderRadius: 999,
  fontWeight: 700,
  fontSize: 13,
  textDecoration: "none",
};

const card: React.CSSProperties = {
  display: "block",
  padding: "20px 22px",
  borderRadius: 14,
  border: "1px solid #ece5fb",
  background: "#fff",
  textDecoration: "none",
  color: "#241a33",
  transition: "box-shadow .2s ease, transform .2s ease",
};

function Shortcut({
  href,
  title,
  hint,
}: {
  href: string;
  title: string;
  hint: string;
}) {
  return (
    <Link href={href} style={card}>
      <strong style={{ display: "block", fontSize: 15.5, marginBottom: 4 }}>
        {title}
      </strong>
      <span style={{ fontSize: 12.5, color: "#5c5470", lineHeight: 1.5 }}>
        {hint}
      </span>
    </Link>
  );
}

export const Dashboard = async () => {
  const c = await counts();

  return (
    <div style={{ padding: "8px 0 40px" }}>
      {/* ---------------------------------------------------- leads first */}
      <div
        style={{
          background: GRADIENT,
          borderRadius: 18,
          padding: "28px 30px",
          color: "#fff",
          marginBottom: 30,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 11.5,
            fontWeight: 800,
            letterSpacing: 1.4,
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          Enquiries
        </p>

        {c ? (
          <>
            <p
              style={{
                margin: "10px 0 4px",
                fontSize: 40,
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              {c.fresh}
            </p>
            <p style={{ margin: "0 0 18px", fontSize: 14.5, opacity: 0.92 }}>
              {c.fresh === 1 ? "person has" : "people have"} enquired and not
              been contacted yet
              {c.all > 0 && ` · ${c.all} total`}
            </p>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginBottom: 20,
              }}
            >
              {c.due > 0 && (
                <Link href={FOLLOW_UP_URL} style={pill}>
                  ⏰ {c.due} to follow up today
                </Link>
              )}
              {c.hot > 0 && (
                <Link href={HOT_URL} style={pill}>
                  🔥 {c.hot} hot
                </Link>
              )}
              {c.worth > 0 && (
                <span style={{ ...pill, cursor: "default" }}>
                  💰 ${c.worth.toLocaleString("en-AU")} in play
                </span>
              )}
            </div>
          </>
        ) : (
          <p style={{ margin: "10px 0 20px", fontSize: 15 }}>
            Everyone who fills in a form on the website appears here.
          </p>
        )}

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link
            href="/admin/collections/enquiries?limit=25&sort=-createdAt"
            style={{
              display: "inline-block",
              background: "#fff",
              color: "#6918dc",
              padding: "11px 22px",
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 13.5,
              textDecoration: "none",
            }}
          >
            Open enquiries →
          </Link>
          <a
            href="/api/enquiries/export"
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.45)",
              color: "#fff",
              padding: "11px 22px",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 13.5,
              textDecoration: "none",
            }}
          >
            Download as spreadsheet
          </a>
        </div>
      </div>

      {/* ------------------------------------------------ common edit jobs */}
      <p
        style={{
          margin: "0 0 12px",
          fontSize: 11.5,
          fontWeight: 800,
          letterSpacing: 1.4,
          textTransform: "uppercase",
          color: "#9b93ad",
        }}
      >
        Edit the website
      </p>

      <div
        style={{
          display: "grid",
          gap: 14,
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          marginBottom: 30,
        }}
      >
        <Shortcut
          href="/admin/globals/home-page"
          title="Home page copy"
          hint="Every word on the home page, section by section."
        />
        <Shortcut
          href="/admin/collections/page-copy"
          title="Other pages"
          hint="Programs, employers, academy, about and the rest."
        />
        <Shortcut
          href="/admin/collections/programs"
          title="Programs & pricing"
          hint="Change a price once — it updates everywhere on the site."
        />
        <Shortcut
          href="/admin/collections/faqs"
          title="FAQs"
          hint="Answer the awkward questions honestly."
        />
        <Shortcut
          href="/admin/collections/testimonials"
          title="Testimonials"
          hint="Only publish what you have permission to use."
        />
        <Shortcut
          href="/admin/collections/company-logos"
          title="Company logos"
          hint="The scrolling strip. Untick 'active' to hide one."
        />
      </div>

      <p
        style={{
          margin: "0 0 12px",
          fontSize: 11.5,
          fontWeight: 800,
          letterSpacing: 1.4,
          textTransform: "uppercase",
          color: "#9b93ad",
        }}
      >
        14-Day Accelerator
      </p>

      <div
        style={{
          display: "grid",
          gap: 14,
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          marginBottom: 30,
        }}
      >
        <Shortcut
          href="/admin/collections/students"
          title="Students"
          hint="Add someone once they've paid. Days unlock from their start date."
        />
        <Shortcut
          href="/admin/collections/lessons"
          title="Program days"
          hint="The 14 days — videos, tasks and downloads."
        />
      </div>

      <p
        style={{
          margin: "0 0 12px",
          fontSize: 11.5,
          fontWeight: 800,
          letterSpacing: 1.4,
          textTransform: "uppercase",
          color: "#9b93ad",
        }}
      >
        Settings
      </p>

      <div
        style={{
          display: "grid",
          gap: 14,
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        }}
      >
        <Shortcut
          href="/admin/globals/site-settings"
          title="Site settings"
          hint="Phone, email, ABN, masterclass video, popups."
        />
        <Shortcut
          href="/admin/globals/navigation"
          title="Menu"
          hint="The links across the top of every page."
        />
        <Shortcut
          href="/admin/globals/footer"
          title="Footer"
          hint="The link columns at the bottom of every page."
        />
        <Shortcut
          href="/admin/collections/media"
          title="Images"
          hint="Photos and logos used anywhere on the site."
        />
      </div>

      <p
        style={{
          marginTop: 34,
          fontSize: 12.5,
          color: "#5c5470",
          lineHeight: 1.6,
        }}
      >
        Changes appear on the live website within about a minute. If you clear a
        field, that part of the page keeps its current wording rather than going
        blank — so nothing you do here can leave a hole in the site.
      </p>
    </div>
  );
};

export default Dashboard;
