import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: {
    group: "Settings",
    description:
      "Phone number, email, address and the bits that appear on every page.",
  },
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Contact",
          fields: [
            {
              type: "row",
              fields: [
                { name: "phone", label: "Phone number", type: "text", defaultValue: "1300 891 365" },
                {
                  name: "email",
                  type: "email",
                  label: "Email address",
                  defaultValue: "hello@visgrowinternships.com.au",
                },
              ],
            },
            {
              name: "address",
              type: "text",
              label: "Address",
              defaultValue: "Innovation House, Mawson Lakes SA",
            },
            {
              name: "legalLastUpdated",
              type: "text",
              label: "Legal pages last updated",
              admin: {
                description:
                  "Shown at the top of the Terms and Privacy pages, e.g. 'March 2026'. Update it whenever those pages change.",
              },
            },
            {
              name: "abn",
              type: "text",
              label: "ABN",
              admin: {
                description:
                  "Registered ABN. Required on the legal pages before launch.",
              },
            },
            {
              name: "businessName",
              type: "text",
              label: "Registered business name",
              admin: { description: "Registered business name for legal pages." },
            },
          ],
        },
        {
          label: "Accelerator days",
          description:
            "Controls what a student sees on a day that doesn't have a video yet. Add the video to that day and this disappears on its own — you never need to come back here.",
          fields: [
            {
              name: "lessonNoVideoTitle",
              type: "text",
              label: "Heading when a day has no video",
              admin: {
                description:
                  "Shown only until you add that day's video. Keep it honest — the student has already paid.",
              },
            },
            {
              name: "lessonNoVideoBody",
              type: "textarea",
              label: "Wording underneath it",
            },
          ],
        },
        {
          label: "Masterclass",
          fields: [
            {
              name: "masterclassYoutubeId",
              type: "text",
              label: "YouTube video ID",
              admin: {
                description:
                  "The YouTube video ID only (the bit after v=). Upload the video as Unlisted. Leave blank to show a 'coming soon' placeholder.",
              },
            },
            {
              name: "masterclassDuration",
              type: "text",
              label: "How long the video runs",
              admin: {
                description:
                  "E.g. '48 minutes'. Leave blank until you know — we won't state a length we haven't checked.",
              },
            },
            {
              name: "masterclassChapters",
              type: "array",
              label: "What the masterclass covers",
              labels: { singular: "Chapter", plural: "Chapters" },
              admin: { components: { RowLabel: "@/payload/admin/RowLabel#TitleRowLabel" } },
              fields: [
                { name: "title", label: "Chapter title", type: "text", required: true },
                {
                  name: "timestamp",
                  type: "text",
                  label: "Time in the video",
                  admin: { description: "Optional, e.g. 04:12" },
                },
              ],
            },
          ],
        },
        {
          label: "Popups & banners",
          fields: [
            {
              name: "audiencePopupEnabled",
              type: "checkbox",
              label: "Show the 'Which one are you?' popup",
              defaultValue: true,
            },
            {
              name: "audiencePopupHeading",
              type: "text",
              label: "Popup heading",
              defaultValue: "Which one are you?",
            },
            {
              name: "audiencePopupSubheading",
              type: "text",
              label: "Popup subheading",
              defaultValue: "One click and we'll take you to the right place.",
            },
            {
              name: "stickyCtaEnabled",
              type: "checkbox",
              label: "Show the bar at the bottom of the screen",
              defaultValue: true,
            },
            {
              name: "stickyCtaText",
              type: "text",
              label: "Bottom bar text",
              defaultValue: "Not sure where to start?",
            },
          ],
        },
        {
          label: "Social",
          fields: [
            {
              name: "social",
              type: "array",
              label: "Social links",
              admin: { components: { RowLabel: "@/payload/admin/RowLabel#LinkRowLabel" } },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "platform", label: "Platform", type: "text", required: true },
                    { name: "url", label: "Link address", type: "text", required: true },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
