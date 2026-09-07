import type { CollectionConfig } from "payload";

/**
 * One day of the 14-Day Accelerator.
 *
 * Read access is admin-only on purpose: these documents hold the unlisted
 * YouTube IDs. If they were publicly readable through the API, anyone could
 * list every video without paying — which would quietly destroy the product.
 * The student pages fetch them server-side instead.
 */
export const Lessons: CollectionConfig = {
  slug: "lessons",
  labels: { singular: "Day", plural: "Program days" },
  admin: {
    group: "Program",
    useAsTitle: "title",
    defaultColumns: ["day", "title", "published", "durationMinutes"],
    description:
      "The 14 days of the Accelerator. Students see one new day each day after they start.",
    pagination: { defaultLimit: 20 },
  },
  defaultSort: "day",
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
          name: "day",
          type: "number",
          label: "Day number",
          required: true,
          unique: true,
          min: 1,
          max: 60,
          admin: {
            width: "25%",
            description: "1 to 14. Controls the order and when it unlocks.",
          },
        },
        {
          name: "title",
          type: "text",
          label: "Day title",
          required: true,
          admin: { width: "75%", description: "E.g. 'Why your resume gets filtered out'." },
        },
      ],
    },
    {
      name: "summary",
      type: "textarea",
      label: "What this day covers",
      admin: {
        description:
          "One or two sentences, shown on the program dashboard before they open it.",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Video",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "youtubeId",
                  type: "text",
                  label: "YouTube video ID",
                  admin: {
                    width: "60%",
                    description:
                      "Upload to YouTube as UNLISTED, then paste only the ID — the part after v=. Leave blank and the day shows 'video coming soon'.",
                  },
                },
                {
                  name: "durationMinutes",
                  type: "number",
                  label: "Length (minutes)",
                  admin: {
                    width: "40%",
                    description: "Shown to students so they can plan their time.",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "The work",
          description:
            "The video is the easy part. This is what actually changes their outcome.",
          fields: [
            {
              name: "task",
              type: "textarea",
              label: "Today's task",
              admin: {
                description:
                  "What they must actually do today. Be specific and finishable in about an hour.",
              },
            },
            {
              name: "checklist",
              type: "array",
              label: "Checklist",
              labels: { singular: "Step", plural: "Checklist" },
              admin: {
                components: { RowLabel: "@/payload/admin/RowLabel#TextRowLabel" },
                description: "Students tick these off as they go.",
              },
              fields: [{ name: "text", label: "Step", type: "text", required: true }],
            },
            {
              name: "resources",
              type: "array",
              label: "Downloads & links",
              labels: { singular: "Resource", plural: "Downloads & links" },
              admin: {
                components: { RowLabel: "@/payload/admin/RowLabel#TitleRowLabel" },
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "title", label: "What it is", type: "text", required: true },
                    {
                      name: "url",
                      label: "Link address",
                      type: "text",
                      admin: { description: "Or upload a file below instead." },
                    },
                  ],
                },
                {
                  name: "file",
                  type: "upload",
                  relationTo: "media",
                  label: "Or upload a file",
                },
              ],
            },
          ],
        },
        {
          label: "Notes",
          fields: [
            {
              name: "coachNote",
              type: "textarea",
              label: "A note from Mustafa",
              admin: {
                description:
                  "Optional. A personal line at the top of the day — this is what makes it feel coached rather than automated.",
              },
            },
          ],
        },
      ],
    },
    {
      name: "published",
      type: "checkbox",
      label: "Ready for students",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description:
          "Until this is ticked, students never see this day — even if their date has passed.",
      },
    },
  ],
};
