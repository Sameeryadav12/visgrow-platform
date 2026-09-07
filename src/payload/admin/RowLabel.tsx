"use client";

import React from "react";
import { useRowLabel } from "@payloadcms/ui";

/**
 * Payload labels collapsed repeating rows "Column 01", "Link 02" and so on,
 * which tells the person editing nothing at all — they have to open every row
 * to find the one they want.
 *
 * This shows the row's actual content instead, so a collapsed list reads like
 * the thing it represents.
 */

type Row = Record<string, unknown>;

const firstString = (row: Row, keys: string[]): string => {
  for (const k of keys) {
    const v = row?.[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
};

function Label({ keys, fallback }: { keys: string[]; fallback: string }) {
  const { data, rowNumber } = useRowLabel<Row>();
  const n = String((rowNumber ?? 0) + 1).padStart(2, "0");
  const text = firstString(data ?? {}, keys);

  if (!text) {
    return (
      <span style={{ color: "#9b93ad", fontWeight: 600 }}>
        {fallback} {n} — empty
      </span>
    );
  }

  const icon = firstString(data ?? {}, ["icon"]);

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span style={{ color: "#9b93ad", fontWeight: 700, fontSize: 11.5 }}>{n}</span>
      {icon && <span aria-hidden="true">{icon}</span>}
      <span style={{ fontWeight: 700, color: "#241a33" }}>
        {text.length > 68 ? `${text.slice(0, 68)}…` : text}
      </span>
    </span>
  );
}

export const TitleRowLabel = () => (
  <Label keys={["title", "label", "name", "heading"]} fallback="Item" />
);

export const TextRowLabel = () => (
  <Label keys={["text", "item", "title", "label"]} fallback="Point" />
);

export const LinkRowLabel = () => (
  <Label keys={["label", "title"]} fallback="Link" />
);

export const StatRowLabel = () => (
  <Label keys={["value", "label"]} fallback="Number" />
);

export const QuestionRowLabel = () => (
  <Label keys={["question", "title"]} fallback="Question" />
);

/** Contact history: "14 Mar · Phone call — left a message about pricing" */
export const ActivityRowLabel = () => {
  const { data } = useRowLabel<Row>();
  const kinds: Record<string, string> = {
    call: "📞 Phone call",
    email: "✉️ Email",
    meeting: "🤝 Meeting",
    voicemail: "📩 Left a message",
    status: "🔄 Status change",
    other: "• Note",
  };

  const raw = data?.date;
  const when =
    typeof raw === "string" && raw
      ? new Date(raw).toLocaleDateString("en-AU", {
          day: "numeric",
          month: "short",
        })
      : "";
  const kind = kinds[String(data?.type ?? "other")] ?? "• Note";
  const note = typeof data?.note === "string" ? data.note : "";

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      {when && (
        <span style={{ color: "#9b93ad", fontWeight: 700, fontSize: 11.5 }}>
          {when}
        </span>
      )}
      <span style={{ fontWeight: 700, color: "#241a33" }}>{kind}</span>
      {note && (
        <span style={{ color: "#5c5470" }}>
          — {note.length > 54 ? `${note.slice(0, 54)}…` : note}
        </span>
      )}
    </span>
  );
};

export default TitleRowLabel;
