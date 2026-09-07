import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Content",
    description: "Photos, logos and images used anywhere on the site.",
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: undefined, position: "centre" },
      { name: "card", width: 800, height: undefined, position: "centre" },
      { name: "hero", width: 1600, height: undefined, position: "centre" },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Describe the image",
      required: true,
      admin: {
        description:
          "Describe the image for screen readers and search engines. E.g. 'Mustafa Kadir speaking at a workshop'.",
      },
    },
    {
      name: "credit",
      type: "text",
      label: "Photo credit",
      admin: { description: "Optional photographer or source credit." },
    },
  ],
};
