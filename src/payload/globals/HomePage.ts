import type { Field, GlobalConfig } from "payload";

/**
 * Every word on the home page.
 *
 * Deliberately a fixed set of fields rather than free-form blocks: the
 * section order (Pain → Importance → Benefits → Consequences → Results →
 * How it works) is the whole strategy of the page, and the design has been
 * signed off. Mustafa can change any wording; he can't accidentally
 * reorder or delete a section.
 *
 * Anything left blank falls back to what's currently in the code.
 */

const eyebrow = (description: string): Field => ({
  name: "eyebrow",
  type: "text",
  label: "Small label above the heading",
  admin: { description },
});

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
  admin: { description: "The supporting paragraph." },
};

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home page copy",
  admin: {
    group: "Content",
    description:
      "Every word on the home page, section by section, in the order they appear. Leave a field blank to keep what's currently on the site.",
  },
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        // ---------------------------------------------------------------
        {
          label: "Hero",
          fields: [
            {
              name: "hero",
              type: "group",
              label: " ",
              fields: [
                eyebrow("Small pill above the headline."),
                heading,
                {
                  name: "rotatingWords",
                  type: "array",
                  label: "Words that type themselves out",
                  labels: { singular: "Phrase", plural: "Typing phrases" },
                  admin: { components: { RowLabel: "@/payload/admin/RowLabel#TextRowLabel" },
                    description:
                      "These type themselves out one after another in the headline.",
                  },
                  fields: [{ name: "text", label: "Text", type: "text", required: true }],
                },
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
                      "Small line under the buttons that lowers the risk of clicking.",
                  },
                },
              ],
            },
          ],
        },
        // ---------------------------------------------------------------
        {
          label: "Logo strip",
          fields: [
            {
              name: "ticker",
              type: "group",
              label: " ",
              fields: [
                {
                  name: "caption",
                  type: "text",
                  label: "Line above the logos",
                  admin: {
                    description:
                      "Line above the scrolling logos. Word this carefully — it must describe something we can evidence.",
                  },
                },
              ],
            },
          ],
        },
        // ---------------------------------------------------------------
        {
          label: "1 · Pain",
          description:
            "Name what's actually going wrong for them, in their words. This is the section that earns the rest of the page.",
          fields: [
            {
              name: "pain",
              type: "group",
              label: " ",
              fields: [
                eyebrow("E.g. 'Let's be honest'"),
                heading,
                {
                  name: "items",
                  type: "array",
                  labels: { singular: "Pain point", plural: "Pain points" },
                  admin: { components: { RowLabel: "@/payload/admin/RowLabel#TitleRowLabel" } },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "icon",
                          type: "text",
                          label: "Emoji",
                          admin: { width: "20%", description: "One emoji." },
                        },
                        {
                          name: "title",
                          type: "text",
                          label: "Title",
                          required: true,
                          admin: { width: "80%" },
                        },
                      ],
                    },
                    { name: "body", label: "Paragraph", type: "textarea" },
                  ],
                },
                {
                  name: "card",
                  type: "group",
                  label: "The 'not your fault' card",
                  fields: [
                    { name: "heading", label: "Heading", type: "text" },
                    {
                      name: "paragraph",
                      type: "textarea",
                      label: "Opening paragraph",
                      admin: { description: "The opening paragraph." },
                    },
                    {
                      name: "callout",
                      type: "textarea",
                      label: "Highlighted box",
                      admin: {
                        description:
                          "The highlighted box with the orange edge. This is the fact that reframes everything for them.",
                      },
                    },
                    {
                      name: "closing",
                      type: "textarea",
                      label: "Closing line",
                      admin: { description: "The bold line before the button." },
                    },
                    { name: "ctaLabel", label: "Button text", type: "text" },
                  ],
                },
              ],
            },
          ],
        },
        // ---------------------------------------------------------------
        {
          label: "2 · Importance",
          description: "Why this matters, and why it matters now rather than later.",
          fields: [
            {
              name: "importance",
              type: "group",
              label: " ",
              fields: [
                eyebrow("E.g. 'Why this matters now'"),
                heading,
                body,
                {
                  name: "stats",
                  type: "array",
                  labels: { singular: "Stat", plural: "Stat tiles" },
                  maxRows: 4,
                  admin: { components: { RowLabel: "@/payload/admin/RowLabel#StatRowLabel" },
                    description:
                      "Four small tiles. Only use figures you can stand behind.",
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
                          admin: { width: "30%", description: "E.g. 'Most' or 'Seconds'" },
                        },
                        {
                          name: "label",
                          type: "text",
                          label: "What it measures",
                          required: true,
                          admin: { width: "70%" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        // ---------------------------------------------------------------
        {
          label: "3 · Benefits",
          description: "The three pillars, and what each one gives them.",
          fields: [
            {
              name: "benefits",
              type: "group",
              label: " ",
              fields: [
                eyebrow("E.g. 'The Visgrow method'"),
                heading,
                body,
                {
                  name: "pillars",
                  type: "array",
                  labels: { singular: "Pillar", plural: "Pillars" },
                  maxRows: 3,
                  admin: { components: { RowLabel: "@/payload/admin/RowLabel#TitleRowLabel" } },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "number",
                          type: "text",
                          label: "Number label",
                          admin: { width: "35%", description: "E.g. '01 — Coaching'" },
                        },
                        {
                          name: "title",
                          type: "text",
                          label: "Title",
                          required: true,
                          admin: { width: "65%" },
                        },
                      ],
                    },
                    { name: "body", label: "Paragraph", type: "textarea" },
                    {
                      type: "row",
                      fields: [
                        { name: "ctaLabel", label: "Button text", type: "text", admin: { width: "50%" } },
                        { name: "href", label: "Link address", type: "text", admin: { width: "50%" } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        // ---------------------------------------------------------------
        {
          label: "4 · Consequences",
          description: "What it costs them to keep doing nothing. Concrete, not dramatic.",
          fields: [
            {
              name: "consequences",
              type: "group",
              label: " ",
              fields: [
                eyebrow("E.g. 'What happens if you wait'"),
                heading,
                {
                  name: "items",
                  type: "array",
                  label: "Items",
                  admin: { components: { RowLabel: "@/payload/admin/RowLabel#TextRowLabel" } },
                  labels: { singular: "Consequence", plural: "Consequences" },
                  fields: [{ name: "text", label: "Text", type: "textarea", required: true }],
                },
                {
                  name: "imageQuote",
                  type: "text",
                  label: "Quote over the photo",
                  admin: { description: "The quote over the photo." },
                },
                {
                  name: "imageAttribution",
                  type: "text",
                  label: "Line under the quote",
                  admin: { description: "The line under the quote." },
                },
              ],
            },
          ],
        },
        // ---------------------------------------------------------------
        {
          label: "5 · Results",
          fields: [
            {
              name: "results",
              type: "group",
              label: " ",
              fields: [
                eyebrow("Eyebrow above the numbers."),
                heading,
                {
                  name: "stats",
                  type: "array",
                  labels: { singular: "Number", plural: "Counting numbers" },
                  admin: { components: { RowLabel: "@/payload/admin/RowLabel#StatRowLabel" },
                    description:
                      "These count up as the visitor scrolls. Every one must be defensible — an unverifiable number is a credibility risk, not a selling point.",
                  },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "value",
                          type: "number",
                          label: "The number",
                          required: true,
                          admin: { width: "25%", description: "Just the number." },
                        },
                        {
                          name: "suffix",
                          type: "text",
                          label: "Symbol after the number",
                          admin: { width: "20%", description: "E.g. + or %" },
                        },
                        {
                          name: "label",
                          type: "text",
                          label: "What it measures",
                          required: true,
                          admin: { width: "55%" },
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "testimonialsEyebrow",
                  type: "text",
                  label: "Small label above the stories",
                  admin: { description: "Eyebrow above the testimonial carousel." },
                },
                {
                  name: "testimonialsHeading",
                  type: "text",
                  label: "Heading above the stories",
                  admin: { description: "Heading above the testimonial carousel." },
                },
              ],
            },
          ],
        },
        // ---------------------------------------------------------------
        {
          label: "6 · How it works",
          fields: [
            {
              name: "how",
              type: "group",
              label: " ",
              fields: [
                eyebrow("E.g. 'How to get started'"),
                heading,
                body,
                {
                  name: "steps",
                  type: "array",
                  labels: { singular: "Step", plural: "Steps" },
                  admin: { components: { RowLabel: "@/payload/admin/RowLabel#TitleRowLabel" }, description: "Numbered automatically in order." },
                  fields: [
                    { name: "title", label: "Title", type: "text", required: true },
                    { name: "body", label: "Paragraph", type: "textarea" },
                  ],
                },
              ],
            },
          ],
        },
        // ---------------------------------------------------------------
        {
          label: "Honesty & pricing",
          fields: [
            {
              name: "honesty",
              type: "group",
              label: "Who this is and isn't for",
              fields: [
                eyebrow("Eyebrow."),
                heading,
                {
                  name: "goodFit",
                  type: "array",
                  label: "Right for you if…",
                  admin: { components: { RowLabel: "@/payload/admin/RowLabel#TextRowLabel" } },
                  labels: { singular: "Point", plural: "This is right for you if…" },
                  fields: [{ name: "text", label: "Text", type: "text", required: true }],
                },
                {
                  name: "badFit",
                  type: "array",
                  label: "NOT for you if…",
                  labels: { singular: "Point", plural: "This is NOT for you if…" },
                  admin: { components: { RowLabel: "@/payload/admin/RowLabel#TextRowLabel" },
                    description:
                      "Naming who it's wrong for builds far more trust than any guarantee could.",
                  },
                  fields: [{ name: "text", label: "Text", type: "text", required: true }],
                },
                {
                  name: "disclaimer",
                  type: "textarea",
                  label: "Honest disclaimer",
                  admin: {
                    description:
                      "Never promise a job here. State plainly what we do and don't control.",
                  },
                },
              ],
            },
            {
              name: "comparison",
              type: "group",
              label: "Comparison table",
              fields: [eyebrow("Eyebrow."), heading, body],
            },
            {
              name: "pricing",
              type: "group",
              label: "Pricing section",
              fields: [
                eyebrow("Eyebrow."),
                heading,
                body,
                {
                  name: "footnote",
                  type: "textarea",
                  label: "Small print",
                  admin: {
                    description:
                      "The asterisked terms under the pricing cards. The individual prices themselves live in Programs.",
                  },
                },
              ],
            },
          ],
        },
        // ---------------------------------------------------------------
        {
          label: "FAQs & enquiry",
          fields: [
            {
              name: "faq",
              type: "group",
              label: "FAQ section",
              fields: [
                eyebrow("Eyebrow."),
                heading,
                {
                  name: "note",
                  type: "text",
                  label: "Footnote",
                  admin: {
                    description:
                      "The questions themselves are edited in the FAQs section of the admin.",
                    readOnly: true,
                  },
                },
              ],
            },
            {
              name: "enquire",
              type: "group",
              label: "Enquiry section",
              fields: [
                eyebrow("Eyebrow."),
                heading,
                body,
                {
                  name: "reassurance",
                  type: "text",
                  label: "Reassuring line under the buttons",
                  admin: { description: "Line that lowers the risk of filling the form in." },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
