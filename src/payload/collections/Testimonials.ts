import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    group: "Content",
    useAsTitle: "name",
    defaultColumns: ["name", "role", "audience", "featured"],
    description:
      "Real quotes from people Visgrow has worked with. Only publish what you have permission to use.",
  },
  access: { read: () => true },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", label: "Their name", type: "text", required: true },
        {
          name: "role",
          type: "text",
          label: "Their role",
          admin: {
            description: "E.g. 'Engineering graduate, now at Aurecon'.",
          },
        },
      ],
    },
    {
      name: "quote",
      type: "textarea",
      label: "What they said",
      required: true,
      admin: {
        description:
          "Their words. Specific beats glowing — 'I stopped getting rejected at screening' lands harder than 'great service'.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "audience",
          type: "select",
          label: "Who this is for",
          required: true,
          defaultValue: "student",
          admin: { width: "50%" },
          options: [
            { label: "Student / Graduate", value: "student" },
            { label: "Employer", value: "employer" },
            { label: "Education Partner", value: "education" },
          ],
        },
        {
          name: "program",
          type: "relationship",
          label: "Which program they did",
          relationTo: "programs",
          admin: {
            width: "50%",
            description: "Which program this person did. Optional.",
          },
        },
      ],
    },
    {
      name: "photo",
      type: "upload",
      label: "Their photo",
      relationTo: "media",
      admin: { description: "Optional headshot." },
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Highlight this one",
      admin: {
        position: "sidebar",
        description: "Show this one in the home page carousel.",
      },
    },
    {
      name: "order",
      type: "number",
      label: "Order on the page",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Lower numbers appear first.",
      },
    },
  ],
};
