import type { CollectionConfig } from "payload";
import { sendPortalWelcome } from "@/lib/email";

/**
 * A paying customer, and their account for the portal.
 *
 * Originally this was only Accelerator students. It now covers everyone who
 * has bought anything, because they all need the same thing: one place to
 * sign in and find their program, their files, and their next session.
 * Which of those they see is decided by the programs listed against them.
 *
 * Records are created by hand after payment clears — there is no self-signup,
 * because access to a paid program should never be one form submission away
 * from being free.
 *
 * Accelerator days unlock on a schedule from the start date, so each intake
 * runs on its own clock without anyone having to do something daily.
 */
export const Students: CollectionConfig = {
  slug: "students",
  labels: { singular: "Customer", plural: "Customers" },
  admin: {
    group: "Program",
    useAsTitle: "name",
    defaultColumns: ["name", "email", "programs", "status", "lastSeen"],
    description:
      "Everyone who has bought something. Add someone here once they've paid and they can sign in to their portal straight away.",
    listSearchableFields: ["name", "email"],
  },
  defaultSort: "-createdAt",
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Sign-in lowercases whatever the customer types before looking them
        // up. If Mustafa saved "Testing@Gmail.com", that lookup finds
        // nothing and the customer can never get in — while the page tells
        // them a link is on its way. Normalise here so the two always agree.
        if (typeof data?.email === "string") {
          data.email = data.email.trim().toLowerCase();
        }
        return data;
      },

      ({ data, originalDoc }) => {
        if (!originalDoc) return data;
        const was = originalDoc.status;
        const now = data.status;
        if (was === now) return data;

        // Pausing: remember when, so we can work out how long they were out.
        if (now === "paused") {
          data.pausedAt = new Date().toISOString();
        }

        // Un-pausing: push their start date forward by however long they were
        // paused. Without this, days would have kept unlocking in the
        // background and they'd come back to a pile of missed content —
        // which is exactly what pausing is supposed to prevent.
        if (was === "paused" && now !== "paused" && originalDoc.pausedAt) {
          const pausedDays = Math.floor(
            (Date.now() - new Date(originalDoc.pausedAt).getTime()) / 86_400_000,
          );
          if (pausedDays > 0 && originalDoc.startDate) {
            const shifted = new Date(originalDoc.startDate);
            shifted.setDate(shifted.getDate() + pausedDays);
            data.startDate = shifted.toISOString();
          }
          data.pausedAt = null;
        }

        return data;
      },
    ],

    afterChange: [
      async ({ doc, operation, req }) => {
        // Only on create, so it can never fire twice for the same person.
        if (operation !== "create") return doc;
        if (doc.sendWelcome === false) return doc;
        if (doc.status === "revoked") return doc;

        // Awaited so a failure is visible in the log, but sendPortalWelcome
        // swallows its own errors — a bounced welcome must never stop the
        // customer record being saved.
        await sendPortalWelcome({ name: doc.name, email: doc.email });
        req.payload.logger.info(`[visgrow] Portal welcome sent to ${doc.email}`);
        return doc;
      },
    ],
  },

  fields: [
    {
      type: "row",
      fields: [
        { name: "name", label: "Their name", type: "text", required: true },
        {
          name: "email",
          label: "Their email",
          type: "email",
          required: true,
          unique: true,
          index: true,
          admin: { description: "This is how they sign in. Must be exact." },
        },
      ],
    },
    {
      name: "programs",
      label: "What they've bought",
      type: "relationship",
      relationTo: "programs",
      hasMany: true,
      admin: {
        description:
          "Decides what they see in their portal. Someone with the Accelerator gets the daily lessons; everyone gets their files and sessions.",
      },
    },
    {
      name: "phone",
      label: "Their phone",
      type: "text",
      admin: { description: "Optional. Only for you — never shown publicly." },
    },
    {
      type: "row",
      fields: [
        {
          name: "startDate",
          type: "date",
          label: "Accelerator start date",
          defaultValue: () => new Date().toISOString(),
          admin: {
            width: "50%",
            date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" },
            description:
              "Day 1 opens on this date, Day 2 the next day, and so on. Leave blank if they haven't bought the Accelerator.",
          },
        },
        {
          name: "status",
          type: "select",
          label: "Access",
          defaultValue: "active",
          required: true,
          admin: { width: "50%" },
          options: [
            { label: "🟢  Active — can sign in", value: "active" },
            { label: "⏸️  Paused — schedule frozen", value: "paused" },
            { label: "🎓  Finished", value: "finished" },
            { label: "🚫  Access removed", value: "revoked" },
          ],
        },
      ],
    },
    {
      name: "unlockEverything",
      type: "checkbox",
      label: "Give them all 14 days now",
      defaultValue: false,
      admin: {
        description:
          "Overrides the daily schedule. Useful for someone catching up, or for previewing the program yourself.",
      },
    },
    {
      name: "enquiry",
      type: "relationship",
      relationTo: "enquiries",
      label: "Came from this enquiry",
      admin: { description: "Optional. Links them back to their original enquiry." },
    },
    {
      name: "completedDays",
      type: "number",
      hasMany: true,
      label: "Days they've completed",
      admin: {
        readOnly: true,
        description: "Updated automatically as they work through the program.",
      },
    },
    {
      name: "sendWelcome",
      type: "checkbox",
      label: "Email them their portal link",
      defaultValue: true,
      admin: {
        position: "sidebar",
        description:
          "Sends once, when you first save this person. Untick if you'd rather tell them yourself.",
      },
    },
    {
      name: "notes",
      type: "textarea",
      label: "Private notes",
      admin: {
        position: "sidebar",
        description: "Never shown to the student.",
      },
    },
    {
      name: "lastSeen",
      type: "date",
      label: "Last signed in",
      admin: {
        position: "sidebar",
        readOnly: true,
        date: { pickerAppearance: "dayAndTime" },
        description:
          "If someone hasn't appeared for a few days, that's your cue to check in.",
      },
    },

    // --- sign-in plumbing. Hidden: nothing here is meant to be edited.
    {
      name: "pausedAt",
      type: "date",
      admin: { hidden: true },
    },
    {
      name: "lastNudgedAt",
      type: "date",
      label: "Last nudge sent",
      admin: {
        position: "sidebar",
        readOnly: true,
        date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" },
        description:
          "Automatic check-in emails go out at most once a week, and only if they've gone quiet.",
      },
    },
    {
      name: "loginToken",
      type: "text",
      index: true,
      admin: { hidden: true },
    },
    {
      name: "loginTokenExpires",
      type: "date",
      admin: { hidden: true },
    },
  ],
  timestamps: true,
};
