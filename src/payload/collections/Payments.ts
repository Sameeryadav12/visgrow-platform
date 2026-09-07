import type { CollectionConfig } from "payload";

/**
 * A record of money actually received.
 *
 * Written by the Stripe webhook, never by hand — which is the point. If this
 * could be edited, it would stop being a reliable record of what was paid.
 * Stripe remains the source of truth; this is the local mirror so Mustafa can
 * see payments beside the person who made them without leaving the admin.
 */
export const Payments: CollectionConfig = {
  slug: "payments",
  labels: { singular: "Payment", plural: "Payments" },
  admin: {
    group: "Leads",
    useAsTitle: "customerName",
    defaultColumns: ["customerName", "programName", "amountFormatted", "status", "paidAt"],
    listSearchableFields: ["customerName", "customerEmail", "stripeSessionId"],
    description:
      "Every payment taken through the website. Written automatically by Stripe — these can't be edited, so they stay trustworthy.",
  },
  defaultSort: "-paidAt",
  access: {
    read: ({ req }) => Boolean(req.user),
    // Only the webhook writes here, and it uses the local API which bypasses
    // this. Nobody can create or alter a payment record through the admin.
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "customerName", label: "Who paid", type: "text" },
        { name: "customerEmail", label: "Their email", type: "email", index: true },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "programName", label: "What they bought", type: "text" },
        {
          name: "amountFormatted",
          label: "Amount",
          type: "text",
          admin: { description: "As charged, including GST." },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "status",
          label: "Status",
          type: "select",
          defaultValue: "paid",
          options: [
            { label: "🟢  Paid", value: "paid" },
            { label: "🔵  Refunded", value: "refunded" },
            { label: "🟡  Partially refunded", value: "partially_refunded" },
            { label: "🔴  Failed", value: "failed" },
            { label: "⚪  Disputed", value: "disputed" },
          ],
        },
        {
          name: "paidAt",
          label: "When",
          type: "date",
          admin: { date: { pickerAppearance: "dayAndTime" } },
        },
      ],
    },
    {
      name: "program",
      label: "Program",
      type: "relationship",
      relationTo: "programs",
    },
    {
      name: "enquiry",
      label: "Linked enquiry",
      type: "relationship",
      relationTo: "enquiries",
      admin: { description: "The lead this payment came from, where we could match it." },
    },
    {
      name: "student",
      label: "Program access",
      type: "relationship",
      relationTo: "students",
      admin: { description: "Created automatically for Accelerator purchases." },
    },

    // --- raw values from Stripe, for reconciliation
    {
      name: "amountCents",
      label: "Amount (cents)",
      type: "number",
      admin: { position: "sidebar", readOnly: true },
    },
    {
      name: "currency",
      label: "Currency",
      type: "text",
      admin: { position: "sidebar", readOnly: true },
    },
    {
      name: "stripeSessionId",
      label: "Stripe checkout ID",
      type: "text",
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Search this in your Stripe dashboard to see the full record.",
      },
    },
    {
      name: "stripePaymentIntentId",
      label: "Stripe payment ID",
      type: "text",
      index: true,
      admin: { position: "sidebar", readOnly: true },
    },
  ],
  timestamps: true,
};
