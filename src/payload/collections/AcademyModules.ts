import type { CollectionConfig } from "payload";

/**
 * One module of the Skills Development program, shown in the Academy
 * learning area (/my-academy).
 *
 * Separate from "Program days" on purpose. The Accelerator is a timed
 * 14-day course for individuals; the Academy is a self-paced set of modules
 * for people on the Skills Development program. Keeping them apart means a
 * change to one can never break the other.
 *
 * Admin-only read, like Program days. The learning area reads these on the
 * server after checking the signed-in person has the program.
 */
export const AcademyModules: CollectionConfig = {
  slug: "academy-modules",
  labels: { singular: "Academy module", plural: "Academy modules" },
  admin: {
    group: "2 · Customer work",
    useAsTitle: "title",
    defaultColumns: ["number", "title", "group", "published"],
    description:
      "The modules people on the Skills Development program see in their Academy area. Add a video and a task to each one.",
  },
  defaultSort: "number",
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "number",
          label: "Module number",
          type: "number",
          required: true,
          unique: true,
          min: 1,
          admin: { width: "25%", description: "Sets the order." },
        },
        {
          name: "title",
          label: "Module title",
          type: "text",
          required: true,
          admin: { width: "75%" },
        },
      ],
    },
    {
      name: "group",
      label: "Which part of the program",
      type: "select",
      required: true,
      defaultValue: "workplace",
      options: [
        { label: "Workplace skills", value: "workplace" },
        { label: "Graduate job-readiness add-on", value: "graduate" },
      ],
    },
    {
      name: "summary",
      label: "What this module covers",
      type: "textarea",
    },
    {
      name: "covers",
      label: "Key points",
      type: "array",
      labels: { singular: "Point", plural: "Points" },
      fields: [{ name: "text", label: "Point", type: "text", required: true }],
    },
    {
      type: "row",
      fields: [
        {
          name: "youtubeId",
          label: "YouTube video ID",
          type: "text",
          admin: {
            width: "70%",
            description:
              "The part after v= in an unlisted YouTube link. Leave blank until the video is ready.",
          },
        },
        {
          name: "durationMinutes",
          label: "Length (minutes)",
          type: "number",
          min: 1,
          admin: { width: "30%" },
        },
      ],
    },
    {
      name: "task",
      label: "Task",
      type: "textarea",
      admin: { description: "What they should do after watching." },
    },
    {
      name: "resources",
      label: "Downloads & links",
      type: "array",
      labels: { singular: "Link", plural: "Links" },
      fields: [
        { name: "title", label: "What it is", type: "text", required: true },
        { name: "url", label: "Link address", type: "text", required: true },
      ],
    },
    {
      name: "coachNote",
      label: "A note from Mustafa",
      type: "textarea",
    },
    {
      name: "published",
      label: "Ready for learners",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar", description: "Only ticked modules are shown." },
    },
  ],
  timestamps: true,
};
