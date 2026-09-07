import type { CollectionConfig } from "payload";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  labels: { singular: "FAQ", plural: "FAQs" },
  admin: {
    group: "Content",
    useAsTitle: "question",
    defaultColumns: ["question", "audience", "order"],
    description:
      "Answer the awkward questions honestly. Vague answers cost more sales than blunt ones.",
  },
  access: { read: () => true },
  fields: [
    { name: "question", label: "The question", type: "text", required: true },
    {
      name: "answer",
      type: "textarea",
      label: "Your answer",
      required: true,
      admin: {
        description:
          "Be direct. Never promise a guaranteed job — say what we actually do and what it depends on.",
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
            { label: "Everyone", value: "all" },
          ],
        },
        {
          name: "order",
          type: "number",
          label: "Order on the page",
          defaultValue: 0,
          admin: { width: "50%", description: "Lower numbers appear first." },
        },
      ],
    },
    {
      name: "programs",
      type: "relationship",
      label: "Show on these program pages",
      relationTo: "programs",
      hasMany: true,
      admin: {
        description:
          "Show this FAQ on these program pages. Leave blank for site-wide.",
      },
    },
  ],
};
