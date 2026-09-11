"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * The cost of another six months of guessing.
 *
 * This is the "consequences" step of the page structure, made personal.
 * A number someone worked out about their own situation lands differently
 * from us describing a cost in the abstract.
 *
 * Deliberate limits on what it claims:
 *
 * - It only multiplies the salary they typed by the months they choose. It
 *   does not model lost superannuation, compounding lifetime earnings, or
 *   "career damage". Those numbers exist in other people's calculators and
 *   they are guesses dressed up as maths.
 *
 * - It never implies Visgrow would have prevented the delay. The honest
 *   claim is that guessing costs money, not that we guarantee a job — and
 *   the copy says so on screen.
 */

const MONTHS = [3, 6, 12];

const AUD = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

export default function WaitingCost() {
  const [salary, setSalary] = useState(65000);
  const [months, setMonths] = useState(6);

  const monthly = salary / 12;
  const total = Math.round(monthly * months);

  return (
    <div className="grid gap-8 rounded-[22px] border border-[var(--color-line)] bg-white p-7 lg:grid-cols-[1fr_1fr] lg:items-center lg:p-10">
      {/* inputs */}
      <div>
        <label
          htmlFor="wc-salary"
          className="mb-2 block text-[13.5px] font-extrabold text-[var(--color-ink)]"
        >
          The salary you&apos;re aiming for
        </label>
        <div className="mb-1.5 flex items-baseline gap-2">
          <span
            className="text-[30px] text-brand-purple"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {AUD.format(salary)}
          </span>
          <span className="text-[13px] font-semibold text-brand-sub">
            per year
          </span>
        </div>
        <input
          id="wc-salary"
          type="range"
          min={45000}
          max={120000}
          step={2500}
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
          className="mb-8 w-full accent-[var(--color-purple)]"
          aria-valuetext={`${AUD.format(salary)} per year`}
        />

        <span className="mb-3 block text-[13.5px] font-extrabold text-[var(--color-ink)]">
          How much longer might the search take?
        </span>
        <div className="flex flex-wrap gap-2.5" role="group" aria-label="Months">
          {MONTHS.map((m) => {
            const on = months === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setMonths(m)}
                aria-pressed={on}
                className={`rounded-full px-5 py-2.5 text-[13.5px] font-bold transition-colors ${
                  on
                    ? "bg-brand-gradient text-white"
                    : "bg-brand-lavender text-brand-sub hover:text-brand-purple"
                }`}
              >
                {m} months
              </button>
            );
          })}
        </div>
      </div>

      {/* result */}
      <div className="rounded-[18px] bg-brand-gradient p-7 text-center text-white">
        <p className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.5px] text-white/80">
          What that time could cost
        </p>
        <p
          className="mb-3 text-[clamp(38px,6vw,58px)] leading-none"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {AUD.format(total)}
        </p>
        <p className="mb-6 text-[14px] leading-[1.65] text-white/90">
          {months} months at {AUD.format(Math.round(monthly))} a month, if the
          search takes that long.
        </p>
        <Link
          href="/scorecard"
          className="inline-block rounded-full bg-white px-7 py-3.5 text-[14px] font-extrabold text-brand-purple transition-transform hover:-translate-y-1"
        >
          Find out what&apos;s stopping you →
        </Link>
      </div>

      <p className="text-[12.5px] leading-relaxed text-brand-sub lg:col-span-2">
        This is arithmetic on the salary you typed, not a forecast — we
        don&apos;t know how long your search will take, and we can&apos;t
        promise to shorten it. The point is only that knowing which part is
        broken beats guessing at it.
      </p>
    </div>
  );
}
