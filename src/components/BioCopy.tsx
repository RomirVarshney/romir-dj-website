"use client";

import { useState } from "react";
import { BIO, LIVE_DJING_INTRO } from "@/lib/data";

export default function BioCopy() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <p className="text-[15px] leading-[1.6] text-zinc-300 sm:text-[17px] sm:leading-[1.65]">
        {BIO}
      </p>
      {open ? (
        <p className="mt-4 text-[15px] leading-[1.6] text-zinc-300 sm:text-[17px] sm:leading-[1.65]">
          {LIVE_DJING_INTRO}
        </p>
      ) : null}
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
