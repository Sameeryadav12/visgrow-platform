import type { CollectionConfig } from "payload";

export const CompanyLogos: CollectionConfig = {
  slug: "company-logos",
  labels: { singular: "Company logo", plural: "Company logos" },
  admin: {
    group: "Content",
    useAsTitle: "name",
    defaultColumns: ["name", "active", "order"],
    description:
      "Organisations shown in the scrolling logo strip. Only include ones you can evidence — a wrong claim here is a legal problem, not a design one.",
  },
  access: { read: () => true },
  fields: [
    { name: "name", label: "Company name", type: "text", required: true },
    {
      name: "logo",
      type: "upload",
      label: "Logo image",
      relationTo: "media",
      admin: {
        description:
          "Transparent PNG works best. Uploads are shown on a white tile.",
      },
    },
    {
      name: "logoPath",
      type: "text",
      label: "Existing image path",
      admin: {
        description:
          "Or use an existing file already in the project, e.g. /images/company-logos/named/pwc.png",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "active",
          type: "checkbox",
          label: "Show on the website",
          defaultValue: true,
          admin: { width: "50%", description: "Untick to hide without deleting." },
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
  ],
};
