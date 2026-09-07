import type { CollectionConfig } from "payload";

/**
 * The CRM.
 *
 * Deliberately light. Mustafa sells a small number of programs, up to $3,499, through
 * conversations, not a funnel — so what he actually needs is: who came in,
 * what they want, what was said last, and who he owes a call today. Anything
 * more elaborate would be a tool he stops updating, and a CRM nobody updates
 * is worse than a spreadsheet.
 */
export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  labels: { singular: "Enquiry", plural: "Enquiries" },
  admin: {
    group: "Leads",
    useAsTitle: "name",
    defaultColumns: [
      "name",
      "enquiryType",
      "status",
      "followUpDate",
      "phone",
      "createdAt",
    ],
    listSearchableFields: ["name", "email", "phone", "organisation", "message"],
    description:
      "Everyone who has filled in a form on the website. Newest first. Use the filters to see just the ones you owe a call.",
    pagination: { defaultLimit: 25 },
  },
  defaultSort: "-createdAt",
  access: {
    // Anyone can submit the form; only logged-in staff can read or change.
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  hooks: {
    beforeChange: [
      ({ data, originalDoc, req }) => {
        // Automatically log status changes, so the history is never just
        // whatever someone remembered to type.
        if (
          originalDoc &&
          data.status &&
          data.status !== originalDoc.status
        ) {
          const labels: Record<string, string> = {
            new: "New",
            contacted: "Contacted",
            booked: "Booked a call",
            enrolled: "Enrolled",
            closed: "Not proceeding",
          };
          data.activity = [
            ...(data.activity ?? []),
            {
              date: new Date().toISOString(),
              type: "status",
              note: `Moved from ${labels[originalDoc.status] ?? originalDoc.status} to ${labels[data.status] ?? data.status}${req.user?.email ? ` by ${req.user.email}` : ""}.`,
            },
          ];
        }
        return data;
      },
    ],

    afterChange: [
      async ({ doc, previousDoc, req, operation }) => {
        if (operation !== "update") return;
        if (previousDoc?.status === doc.status) return;
        if (doc.status !== "enrolled") return;

        // Only the Accelerator has a program area to enrol into.
        const program = doc.program as { slug?: string } | number | null;
        const slug = typeof program === "object" ? program?.slug : undefined;
        const looksLikeAccelerator =
          slug === "14-day-accelerator" ||
          /accelerator/i.test(doc.enquiryType ?? "");

        if (!looksLikeAccelerator) return;

        try {
          // Never create a duplicate — they may have enrolled before.
          const existing = await req.payload.find({
            collection: "students",
            where: { email: { equals: doc.email } },
            limit: 1,
            depth: 0,
          });
          if (existing.totalDocs > 0) return;

          await req.payload.create({
            collection: "students",
            data: {
              name: doc.name,
              email: doc.email,
              startDate: new Date().toISOString(),
              status: "active",
              enquiry: doc.id,
              notes: "Created automatically when this lead was marked Enrolled.",
            },
          });

          req.payload.logger.info(
            `[visgrow] Enrolled ${doc.email} into the Accelerator automatically.`,
          );
        } catch (err) {
          // Never fail the status change over this — he can still add them by hand.
          req.payload.logger.error(
            { err },
            `[visgrow] Could not auto-create a student for ${doc.email}`,
          );
        }
      },
    ],
  },

  fields: [
    // ---------------------------------------------------------- who they are
    {
      type: "row",
      fields: [
        { name: "name", label: "Their name", type: "text", required: true },
        { name: "email", label: "Their email", type: "email", required: true },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "phone", label: "Their phone", type: "text" },
        {
          name: "organisation",
          type: "text",
          label: "Organisation",
          admin: { description: "Only for employer and education enquiries." },
        },
      ],
    },

    // ------------------------------------------------------- what they want
    {
      type: "row",
      fields: [
        {
          name: "audience",
          type: "select",
          label: "Who they are",
          defaultValue: "student",
          options: [
            { label: "Student / Graduate", value: "student" },
            { label: "Employer", value: "employer" },
            { label: "Education Partner", value: "education" },
          ],
        },
        {
          name: "enquiryType",
          type: "text",
          label: "What they asked about",
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "program",
          type: "relationship",
          relationTo: "programs",
          label: "Program they're likely to buy",
          admin: {
            description:
              "Set this once you know — it's what makes the pipeline total meaningful.",
          },
        },
        {
          name: "value",
          type: "number",
          label: "Likely value ($)",
          admin: { description: "Your estimate. Leave blank if it's too early to say." },
        },
      ],
    },
    {
      name: "message",
      label: "What they told us",
      type: "textarea",
      admin: { description: "In their own words, straight from the form." },
    },

    // ----------------------------------------------------------- the history
    {
      name: "activity",
      type: "array",
      label: "Contact history",
      labels: { singular: "Entry", plural: "Contact history" },
      admin: {
        description:
          "Every call, email and meeting. Status changes are added here automatically.",
        components: { RowLabel: "@/payload/admin/RowLabel#ActivityRowLabel" },
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "date",
              type: "date",
              label: "When",
              required: true,
              defaultValue: () => new Date().toISOString(),
              admin: { width: "40%", date: { pickerAppearance: "dayAndTime" } },
            },
            {
              name: "type",
              type: "select",
              label: "What happened",
              defaultValue: "call",
              admin: { width: "60%" },
              options: [
                { label: "Phone call", value: "call" },
                { label: "Email", value: "email" },
                { label: "Meeting", value: "meeting" },
                { label: "Left a message", value: "voicemail" },
                { label: "Status change", value: "status" },
                { label: "Other", value: "other" },
              ],
            },
          ],
        },
        {
          name: "note",
          type: "textarea",
          label: "What was said",
          required: true,
        },
      ],
    },

    // ------------------------------------------------------------- sidebar
    {
      name: "status",
      type: "select",
      label: "Where this lead is up to",
      defaultValue: "new",
      required: true,
      admin: {
        position: "sidebar",
        description: "Changing this is logged in the contact history.",
      },
      options: [
        { label: "🔵  New", value: "new" },
        { label: "🟡  Contacted", value: "contacted" },
        { label: "🟣  Booked a call", value: "booked" },
        { label: "🟢  Enrolled", value: "enrolled" },
        { label: "⚪  Not proceeding", value: "closed" },
      ],
    },
    {
      name: "followUpDate",
      type: "date",
      label: "Follow up on",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" },
        description:
          "The most useful field here. Filter the list by this to see who you owe a call today.",
      },
    },
    {
      name: "priority",
      type: "select",
      label: "How warm are they?",
      defaultValue: "warm",
      admin: { position: "sidebar" },
      options: [
        { label: "🔥  Hot — ready to buy", value: "hot" },
        { label: "🙂  Warm — interested", value: "warm" },
        { label: "❄️  Cold — just looking", value: "cold" },
      ],
    },
    {
      name: "source",
      type: "text",
      label: "Came from",
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Which page the form was on.",
      },
    },
    {
      name: "consent",
      type: "checkbox",
      label: "Agreed to be contacted",
      admin: {
        position: "sidebar",
        readOnly: true,
        description:
          "If this is unticked, do not add them to any marketing list.",
      },
    },
    {
      name: "notes",
      type: "textarea",
      label: "Private notes",
      admin: {
        position: "sidebar",
        description: "Never shown on the website.",
      },
    },
  ],
  timestamps: true,
};
