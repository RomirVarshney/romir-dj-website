"use client";

import { Nunito_Sans } from "next/font/google";
import { useState } from "react";
import { BIO } from "@/lib/data";

const bioFallback = Nunito_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bio",
});

const bioFont = '"Avenir Next", Avenir, var(--font-bio), sans-serif';
const GT_PHRASE = "GT Ramblin' Raas '24-'26";
const TECH_GOLD = "#B39051";

function colorGtPhrase(text: string) {
  const index = text.indexOf(GT_PHRASE);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <span style={{ color: TECH_GOLD }}>{GT_PHRASE}</span>
      {text.slice(index + GT_PHRASE.length)}
    </>
  );
}

export default function BioCopy() {
  const [open, setOpen] = useState(false);
  const [lead, ...rest] = BIO;
  const paragraphClass =
    "indent-[1.5em] text-[15px] leading-[1.6] text-zinc-200 sm:text-[17px] sm:leading-[1.65]";

  return (
    <div className={bioFallback.variable}>
      <p className={paragraphClass} style={{ fontFamily: bioFont }}>
        {colorGtPhrase(lead)}
      </p>
      {open
        ? rest.map((paragraph) => (
            <p key={paragraph} className={`mt-4 ${paragraphClass}`} style={{ fontFamily: bioFont }}>
              {colorGtPhrase(paragraph)}
            </p>
          ))
        : null}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="mx-auto mt-10 flex flex-col items-center text-xs font-medium uppercase tracking-[0.28em] text-white"
        aria-expanded={open}
      >
        {open ? "Show less" : "Show more"}
        <span className="mt-2 h-[2px] w-10 bg-[#0066ff]" />
      </button>
    </div>
  );
}
