import type { CollectionConfig, Field } from "payload";

/**
 * Copy for every page other than the home page.
 *
 * One shared shape rather than sixteen bespoke ones, because every page on
 * this site follows the same argument:
 *   Pain → Importance → Benefits → Consequences → Results → How it works
 *
 * Fields left blank fall back to the wording currently in the code, so
 * clearing something can never leave a hole in the page.
 */

const eyebrow: Field = {
  name: "eyebrow",
  type: "text",
  label: "Small label above the heading",
  admin: { description: "Small coloured label above the heading." },
};

const heading: Field = {
  name: "heading",
  type: "text",
  label: "Heading",
  admin: { description: "The big headline for this section." },
};

const body: Field = {
  name: "body",
  type: "textarea",
  label: "Paragraph",
  admin: { description: "The supporting paragraph under the heading." },
};

/** icon + title + body — the card used all over this site. */
const cardItems = (description: string): Field => ({
  name: "items",
  type: "array",
  labels: { singular: "Item", plural: "Items" },
  admin: { components: { RowLabel: "@/payload/admin/RowLabel#TitleRowLabel" }, description },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "icon",
          type: "text",
          label: "Emoji",
          admin: { width: "18%", description: "One emoji." },
        },
        { name: "title", label: "Title", type: "text", required: true, admin: { width: "82%" } },
      ],
    },
    { name: "body", label: "Paragraph", type: "textarea" },
  ],
});

const plainItems = (label: string, description: string): Field => ({
  name: "items",
  type: "array",
  labels: { singular: "Point", plural: label },
  admin: { components: { RowLabel: "@/payload/admin/RowLabel#TextRowLabel" }, description },
  fields: [{ name: "text", label: "Text", type: "textarea", required: true }],
});

export const PageCopy: CollectionConfig = {
  slug: "page-copy",
  labels: { singular: "Page copy", plural: "Page copy" },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "path", "updatedAt"],
    description:
      "Every word on every page apart from the home page. Open a page, then use the tabs to edit each section. Leave a field blank to keep what's on the site now.",
  },
  access: { read: () => true },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Which page this is",
          required: true,
          admin: { width: "55%", description: "Which page this is." },
        },
        {
          name: "path",
          type: "text",
          label: "Web address",
          required: true,
          unique: true,
          index: true,
          admin: {
            width: "45%",
            readOnly: true,
            description: "The web address. Fixed — changing it would break links.",
          },
        },
      ],
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              name: "hero",
              type: "group",
              label: " ",
              fields: [
                eyebrow,
                heading,
                body,
                {
                  name: "primaryCtaLabel",
                  type: "text",
                  label: "Main button text",
                },
                {
                  name: "secondaryCtaLabel",
                  type: "text",
                  label: "Second button text",
                  admin: { description: "Outline button text." },
                },
                {
                  name: "reassurance",
                  type: "text",
                  label: "Reassuring line under the buttons",
                  admin: {
                    description:
                      "Small line that lowers the risk of clicking. E.g. 'No obligation.'",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "1 · Pain",
          description:
            "What's actually going wrong for them, in their words. This section earns the rest of the page.",
          fields: [
            {
              name: "pain",
              type: "group",
              label: " ",
              fields: [
                eyebrow,
                heading,
                body,
                cardItems("The specific things they're struggling with."),
                {
                  name: "closing",
                  type: "textarea",
                  label: "Closing line",
                  admin: { description: "The line that ends the section." },
                },
              ],
            },
          ],
        },
        {
          label: "2 · Importance",
          description: "Why it matters, and why now rather than later.",
          fields: [
            {
              name: "importance",
              type: "group",
              label: " ",
              fields: [
                eyebrow,
                heading,
                body,
                cardItems("Reasons this can't wait."),
              ],
            },
          ],
        },
        {
          label: "3 · Benefits",
          description: "What changes for them. Describe the change, not the deliverable.",
          fields: [
            {
              name: "benefits",
              type: "group",
              label: " ",
              fields: [
                eyebrow,
                heading,
                body,
                cardItems("What they actually get out of this."),
              ],
            },
          ],
        },
        {
          label: "4 · Consequences",
          description: "What it costs them to keep doing nothing. Concrete, not dramatic.",
          fields: [
            {
              name: "consequences",
              type: "group",
              label: " ",
              fields: [
                eyebrow,
                heading,
                body,
                plainItems("What happens if they wait", "One per line."),
              ],
            },
          ],
        },
        {
          label: "5 · Results",
          description: "Proof. Only claims that can be evidenced.",
          fields: [
            {
              name: "results",
              type: "group",
              label: " ",
              fields: [
                eyebrow,
                heading,
                body,
                {
                  name: "stats",
                  type: "array",
                  labels: { singular: "Number", plural: "Numbers" },
                  admin: { components: { RowLabel: "@/payload/admin/RowLabel#StatRowLabel" },
                    description:
                      "An unverifiable number is a credibility risk, not a selling point.",
                  },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "value",
                          type: "text",
                          label: "The number",
                          required: true,
                          admin: { width: "35%" },
                        },
                        {
                          name: "label",
                          type: "text",
                          label: "What it measures",
                          required: true,
                          admin: { width: "65%" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "6 · How it works",
          fields: [
            {
              name: "how",
              type: "group",
              label: " ",
              fields: [
                eyebrow,
                heading,
                body,
                {
                  name: "steps",
                  type: "array",
                  labels: { singular: "Step", plural: "Steps" },
                  admin: { components: { RowLabel: "@/payload/admin/RowLabel#TitleRowLabel" }, description: "Numbered automatically, in order." },
                  fields: [
                    { name: "title", label: "Step title", type: "text", required: true },
                    { name: "body", label: "Paragraph", type: "textarea" },
                    {
                      name: "duration",
                      type: "text",
                      label: "How long it takes",
                      admin: { description: "Optional, e.g. 'Week 1' or '45 minutes'." },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Honesty & CTA",
          fields: [
            {
              name: "honesty",
              type: "group",
              label: "Who this is and isn't for",
              fields: [
                eyebrow,
                heading,
                {
                  name: "goodFit",
                  type: "array",
                  label: "Right for you if…",
                  admin: { components: { RowLabel: "@/payload/admin/RowLabel#TextRowLabel" } },
                  labels: { singular: "Point", plural: "Right for you if…" },
                  fields: [{ name: "text", label: "Text", type: "text", required: true }],
                },
                {
                  name: "badFit",
                  type: "array",
                  label: "NOT for you if…",
                  labels: { singular: "Point", plural: "NOT for you if…" },
                  admin: { components: { RowLabel: "@/payload/admin/RowLabel#TextRowLabel" },
                    description:
                      "Naming who it's wrong for builds more trust than any guarantee could.",
                  },
                  fields: [{ name: "text", label: "Text", type: "text", required: true }],
                },
                {
                  name: "disclaimer",
                  type: "textarea",
                  label: "Honest disclaimer",
                  admin: {
                    description:
                      "Never promise a job. State plainly what we do and don't control.",
                  },
                },
              ],
            },
            {
              name: "cta",
              type: "group",
              label: "Closing call to action",
              fields: [
                eyebrow,
                heading,
                body,
                {
                  name: "reassurance",
                  type: "text",
                  label: "Reassuring line under the buttons",
                  admin: { description: "Line that lowers the risk of enquiring." },
                },
              ],
            },
          ],
        },
        {
          label: "Search & sharing",
          fields: [
            {
              name: "seo",
              type: "group",
              label: " ",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Google result title",
                  admin: {
                    description:
                      "Shown in Google results and the browser tab. Under 60 characters.",
                  },
                },
                {
                  name: "description",
                  type: "textarea",
                  label: "Google result description",
                  maxLength: 200,
                  admin: {
                    description:
                      "The grey text under the Google result. Aim for 150–160 characters.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
