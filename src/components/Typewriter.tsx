"use client";

import { prefersReducedMotion } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";

export default function Typewriter({
  phrases,
  className = "",
}: {
  phrases: string[];
  className?: string;
}) {
  const [text, setText] = useState("");
  const phrasesRef = useRef(phrases);

  useEffect(() => {
    phrasesRef.current = phrases;
  });

  useEffect(() => {
    // Show the first phrase as plain static text.
    if (prefersReducedMotion()) {
      setText(phrasesRef.current[0] ?? "");
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    let phraseIndex = 0;
    let charCount = 0;
    let deleting = false;

    const run = () => {
      if (cancelled) return;

      const list = phrasesRef.current;
      if (!list.length) return;

      const current = list[phraseIndex % list.length];
      let delay: number;

      if (!deleting && charCount === current.length) {
        deleting = true;
        delay = 2200;
      } else if (deleting && charCount === 0) {
        deleting = false;
        phraseIndex += 1;
        delay = 220;
      } else {
        charCount += deleting ? -1 : 1;
        delay = deleting ? 32 : 62;
      }

      setText(current.slice(0, charCount));
      timer = setTimeout(run, delay);
    };

    timer = setTimeout(run, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <span className={className}>
      {text}
      <span className="animate-[blink_1s_step-end_infinite] font-normal">|</span>
    </span>
  );
}
