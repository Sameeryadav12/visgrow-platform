import type { Field } from "payload";

/**
 * Every section on the Visgrow site opens the same way:
 * a small coloured eyebrow, a big heading, and a supporting line.
 * Reusing this keeps the admin panel consistent and the design safe.
 */
export const sectionHeader: Field[] = [
  {
    type: "row",
    fields: [
      {
        name: "eyebrow",
        type: "text",
        admin: {
          width: "40%",
          description: "Small label above the heading. E.g. 'The real problem'.",
        },
      },
      {
        name: "heading",
        type: "text",
        required: true,
        admin: { width: "60%", description: "The big headline for this section." },
      },
    ],
  },
  {
    name: "subheading",
    type: "textarea",
    admin: {
      description:
        "One or two sentences under the heading. Leave blank to hide it.",
    },
  },
];

/** A button. Used in heroes, banners and pricing cards. */
export const linkFields: Field[] = [
  {
    type: "row",
    fields: [
      {
        name: "label",
        type: "text",
        required: true,
        admin: { width: "50%", description: "Button text." },
      },
      {
        name: "href",
        type: "text",
        required: true,
        admin: {
          width: "50%",
          description:
            "Where it goes. Internal: /academy or /#pricing. External: https://…",
        },
      },
    ],
  },
  {
    name: "style",
    type: "select",
    defaultValue: "primary",
    options: [
      { label: "Primary (gradient fill)", value: "primary" },
      { label: "Secondary (outline)", value: "secondary" },
      { label: "Plain text link", value: "text" },
    ],
  },
];

/** Background treatment. Deliberately excludes black — brand rule. */
export const backgroundField: Field = {
  name: "background",
  type: "select",
  defaultValue: "white",
  admin: {
    description:
      "Section background. We never use black or dark grey on this site.",
  },
  options: [
    { label: "White", value: "white" },
    { label: "Soft lavender", value: "lavender" },
    { label: "Brand gradient (white text)", value: "gradient" },
    { label: "Deep purple (white text)", value: "deep" },
  ],
};

/** A single icon + title + body item. The workhorse of this site. */
export const iconItemFields: Field[] = [
  {
    type: "row",
    fields: [
      {
        name: "icon",
        type: "text",
        admin: {
          width: "20%",
          description: "One emoji, e.g. 😰",
        },
      },
      {
        name: "title",
        type: "text",
        required: true,
        admin: { width: "80%" },
      },
    ],
  },
  {
    name: "body",
    type: "textarea",
    admin: { description: "Supporting sentence. Keep it honest and specific." },
  },
];
