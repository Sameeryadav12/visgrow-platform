import type { CollectionConfig } from "payload";

/**
 * Someone enrolled in the Accelerator.
 *
 * Mustafa creates these by hand after payment clears — there is no
 * self-signup, because access to a paid program should never be one form
 * submission away from being free.
 *
 * Days unlock on a schedule from their start date, so each intake runs on
 * its own clock without him having to do anything daily.
 */
export const Students: CollectionConfig = {
  slug: "students",
  labels: { singular: "Student", plural: "Students" },
  admin: {
    group: "Program",
    useAsTitle: "name",
    defaultColumns: ["name", "email", "startDate", "status", "lastSeen"],
    description:
      "People enrolled in the 14-Day Accelerator. Add someone here once they've paid and they can sign in straight away.",
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
      type: "row",
      fields: [
        {
          name: "startDate",
          type: "date",
          label: "Start date",
          required: true,
          defaultValue: () => new Date().toISOString(),
          admin: {
            width: "50%",
            date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" },
            description:
              "Day 1 opens on this date, Day 2 the next day, and so on. Change it to move their whole schedule.",
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
