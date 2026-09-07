import type { GlobalConfig } from "payload";

export const FooterGlobal: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  admin: {
    group: "Settings",
    description: "The link columns at the bottom of every page.",
  },
  access: { read: () => true },
  fields: [
    {
      name: "blurb",
      type: "textarea",
      label: "Short description",
      defaultValue:
        "Helping students and graduates become confident, job-ready professionals — and helping employers build capable, resilient teams.",
      admin: { description: "The short paragraph under the logo." },
    },
    {
      name: "columns",
      type: "array",
      label: "Columns",
      admin: { components: { RowLabel: "@/payload/admin/RowLabel#TitleRowLabel" } },
      labels: { singular: "Column", plural: "Columns" },
      fields: [
        { name: "title", label: "Column heading", type: "text", required: true },
        {
          name: "links",
          type: "array",
          label: "Links in this column",
          admin: { components: { RowLabel: "@/payload/admin/RowLabel#LinkRowLabel" } },
          fields: [
            {
              type: "row",
              fields: [
                { name: "label", label: "Link text", type: "text", required: true },
                { name: "href", label: "Link address", type: "text", required: true },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "legalLine",
      type: "text",
      label: "Location line in the copyright",
      defaultValue: "Adelaide, South Australia",
      admin: { description: "Shown after the copyright line." },
    },
  ],
};
