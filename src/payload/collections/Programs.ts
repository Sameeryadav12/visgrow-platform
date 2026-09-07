import type { CollectionConfig } from "payload";

export const Programs: CollectionConfig = {
  slug: "programs",
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "price", "audience", "featured"],
    description:
      "The things people can buy. Pricing shown on the site comes from here — change it once and it updates everywhere.",
  },
  access: { read: () => true },
  fields: [
    {
      type: "row",
      fields: [
        { name: "title", label: "Program name", type: "text", required: true, admin: { width: "60%" } },
        {
          name: "slug",
          type: "text",
          label: "Short ID (do not change)",
          required: true,
          unique: true,
          admin: {
            width: "40%",
            description: "URL-safe id, e.g. career-strategy-gap-analysis",
          },
        },
      ],
    },
    {
      name: "tagline",
      type: "text",
      label: "One-line tagline",
      admin: { description: "One line on the pricing card." },
    },
    {
      name: "bestFor",
      type: "text",
      label: "Who this is right for",
      admin: {
        description:
          "Who this is genuinely right for. Being honest here reduces refunds and bad reviews.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "price",
          type: "text",
          label: "Price",
          admin: {
            width: "33%",
            description: "Shown as-is, e.g. '$349' or 'From $1,200'.",
          },
        },
        {
          name: "priceNote",
          type: "text",
          label: "Under the price",
          admin: {
            width: "33%",
            description: "Small print under the price, e.g. 'per person, inc GST'.",
          },
        },
        {
          name: "duration",
          type: "text",
          label: "How long it takes",
          admin: { width: "34%", description: "E.g. '90 minutes' or '14 days'." },
        },
      ],
    },
    {
      name: "terms",
      type: "textarea",
      label: "Terms and conditions",
      admin: {
        description:
          "Asterisked terms and conditions shown under the price. Required by the client.",
      },
    },
    {
      name: "includes",
      type: "array",
      label: "What's included",
      labels: { singular: "Item", plural: "What's included" },
      admin: { components: { RowLabel: "@/payload/admin/RowLabel#TextRowLabel" }, description: "Bullet list on the pricing card." },
      fields: [{ name: "item", label: "Item", type: "text", required: true }],
    },
    {
      name: "outcomes",
      type: "array",
      label: "What changes for them",
      labels: { singular: "Outcome", plural: "What changes for them" },
      admin: { components: { RowLabel: "@/payload/admin/RowLabel#TextRowLabel" },
        description:
          "Describe the change, not the deliverable. 'You stop guessing what recruiters want' beats 'a 10-page report'.",
      },
      fields: [{ name: "item", label: "Item", type: "text", required: true }],
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
          name: "pageUrl",
          type: "text",
          label: "Page address",
          admin: {
            width: "50%",
            description: "The full page for this program, e.g. /students-graduates/career-coaching",
          },
        },
      ],
    },
    {
      name: "ctaLabel",
      type: "text",
      label: "Button text",
      defaultValue: "Let's talk about it",
      admin: {
        description:
          "Button text. Keep it casual — the client dislikes 'Enquire Now'.",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Highlight this one",
      admin: {
        position: "sidebar",
        description: "Highlight this card as the most popular option.",
      },
    },
    {
      name: "order",
      type: "number",
      label: "Order on the page",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers appear first." },
    },
  ],
};
