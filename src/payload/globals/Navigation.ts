import type { GlobalConfig } from "payload";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Menu (header)",
  admin: {
    group: "Settings",
    description: "The menu across the top of every page.",
  },
  access: { read: () => true },
  fields: [
    {
      name: "items",
      type: "array",
      labels: { singular: "Menu item", plural: "Menu items" },
      admin: { components: { RowLabel: "@/payload/admin/RowLabel#TitleRowLabel" }, description: "Drag to reorder." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "label", label: "Menu text", type: "text", required: true },
            { name: "href", label: "Link address", type: "text", required: true },
          ],
        },
        {
          name: "children",
          type: "array",
          label: "Dropdown items",
          admin: { components: { RowLabel: "@/payload/admin/RowLabel#LinkRowLabel" } },
          labels: { singular: "Sub-item", plural: "Dropdown items" },
          fields: [
            {
              type: "row",
              fields: [
                { name: "label", label: "Menu text", type: "text", required: true },
                { name: "href", label: "Link address", type: "text", required: true },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "ctaLabel",
      type: "text",
      label: "Button text",
      defaultValue: "Let's Chat",
      admin: { description: "The gradient button on the right." },
    },
    { name: "ctaHref", label: "Button link", type: "text", defaultValue: "/get-started" },
  ],
};
