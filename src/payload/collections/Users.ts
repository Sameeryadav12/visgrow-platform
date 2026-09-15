import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Login", plural: "Admin logins" },
  admin: {
    useAsTitle: "email",
    group: "5 · Setup",
    description: "People who can log in and edit the website.",
  },
  auth: true,
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Their name",
      required: true,
      admin: { description: "Shown in the admin bar." },
    },
  ],
};
