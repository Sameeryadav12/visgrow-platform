import type { CollectionConfig } from "payload";

/**
 * A file that belongs to one customer.
 *
 * Their marked-up resume, a coaching summary, a worksheet, an invoice —
 * anything Mustafa hands back to a specific person.
 *
 * Read access is admin-only, exactly like Lessons. These are private
 * documents about someone's career; a public API read on this collection
 * would leak them. The portal renders them server-side after checking the
 * session, so the customer sees their own files without the collection ever
 * being publicly readable.
 */
export const StudentDocuments: CollectionConfig = {
  slug: "student-documents",
  labels: { singular: "Customer file", plural: "Customer files" },
  admin: {
    group: "Program",
    useAsTitle: "title",
    defaultColumns: ["title", "student", "kind", "createdAt"],
    description:
      "Files you're handing back to one person — a marked-up resume, a session summary, a worksheet. They appear in that person's portal straight away.",
  },
  defaultSort: "-createdAt",
  access: {
    // Admin only, on purpose. The portal reads these with the server's own
    // credentials after it has checked who is signed in.
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  upload: {
    // Deliberately NOT inside public/. Next serves everything in public/ as a
    // static file with no access check, so a private resume stored there
    // would be readable by anyone who guessed the filename. Files here are
    // only reachable through /api/portal/file/[id], which checks ownership.
    staticDir: "private-uploads/student-files",
    mimeTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/*",
    ],
  },
  fields: [
    {
      name: "student",
      label: "Who it's for",
      type: "relationship",
      relationTo: "students",
      required: true,
      index: true,
      admin: {
        description: "Only this person will ever see this file.",
      },
    },
    {
      name: "title",
      label: "What to call it",
      type: "text",
      required: true,
      admin: {
        description:
          "Write it the way they'd recognise it. 'Your resume — reviewed' beats 'resume_v3_final'.",
      },
    },
    {
      name: "kind",
      label: "Type",
      type: "select",
      defaultValue: "feedback",
      required: true,
      options: [
        { label: "Feedback on their work", value: "feedback" },
        { label: "Template or worksheet", value: "template" },
        { label: "Session summary", value: "summary" },
        { label: "Invoice or receipt", value: "invoice" },
        { label: "Something else", value: "other" },
      ],
    },
    {
      name: "note",
      label: "A line for them",
      type: "textarea",
      admin: {
        description:
          "Shown under the file in their portal. One sentence telling them what to do with it.",
      },
    },
  ],
  timestamps: true,
};
