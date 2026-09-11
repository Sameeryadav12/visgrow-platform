import type { CollectionConfig } from "payload";

/**
 * A booked one-to-one — a coaching call, a gap-analysis session, a mock
 * interview.
 *
 * This is deliberately not a booking engine. Mustafa agrees a time in the
 * conversation he is already having, then records it here so the customer
 * can see it, has the link, and knows what to bring. Building self-serve
 * scheduling would add a calendar integration nobody asked for, and the
 * sales conversation is where these get booked anyway.
 *
 * Admin-only read, like customer files — a session record names a person and
 * what they're struggling with.
 */
export const CoachingSessions: CollectionConfig = {
  slug: "coaching-sessions",
  labels: { singular: "Session", plural: "Sessions" },
  admin: {
    group: "Program",
    useAsTitle: "title",
    defaultColumns: ["title", "student", "scheduledFor", "status"],
    description:
      "One-to-one sessions you've agreed with someone. Adding one here puts it in their portal with the link and the prep.",
  },
  defaultSort: "-scheduledFor",
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "student",
      label: "Who it's with",
      type: "relationship",
      relationTo: "students",
      required: true,
      index: true,
    },
    {
      name: "title",
      label: "What the session is",
      type: "text",
      required: true,
      admin: {
        description: "E.g. 'Career strategy session' or 'Mock interview — round 2'.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "scheduledFor",
          label: "When",
          type: "date",
          required: true,
          admin: {
            width: "50%",
            date: { pickerAppearance: "dayAndTime", displayFormat: "d MMM yyyy, h:mm a" },
            description: "Adelaide time.",
          },
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          defaultValue: "booked",
          required: true,
          admin: { width: "50%" },
          options: [
            { label: "📅  Booked", value: "booked" },
            { label: "✅  Done", value: "done" },
            { label: "🚫  Cancelled", value: "cancelled" },
          ],
        },
      ],
    },
    {
      name: "meetingLink",
      label: "Meeting link",
      type: "text",
      admin: {
        description:
          "Zoom, Teams, Meet — whatever you're using. Shown as a button in their portal. Leave blank for in-person.",
      },
    },
    {
      name: "location",
      label: "Or an address",
      type: "text",
      admin: { description: "Only if you're meeting in person." },
    },
    {
      name: "prep",
      label: "What they should bring",
      type: "textarea",
      admin: {
        description:
          "Shown before the session. Someone who turns up prepared gets more out of it — and tells people so.",
      },
    },
    {
      name: "outcome",
      label: "What you agreed",
      type: "textarea",
      admin: {
        description:
          "Shown to them after the session is marked Done. Their record of what to do next.",
      },
    },
    {
      name: "privateNotes",
      label: "Private notes",
      type: "textarea",
      admin: {
        position: "sidebar",
        description: "Never shown to them.",
      },
    },
  ],
  timestamps: true,
};
