"use client";

import { useRef } from "react";

type CardRowProps = {
  label: string;
  children: React.ReactNode;
};

export default function CardRow({ label, children }: CardRowProps) {
  const scroller = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: -1 | 1) {
    scroller.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  }

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          aria-label={`Previous ${label}`}
          onClick={() => scrollByCard(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-lg text-white transition-colors hover:border-[#0066ff] hover:text-[#0066ff]"
        >
          ←
        </button>
        <button
          type="button"
          aria-label={`Next ${label}`}
          onClick={() => scrollByCard(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-lg text-white transition-colors hover:border-[#0066ff] hover:text-[#0066ff]"
        >
          →
        </button>
      </div>
      <div
        ref={scroller}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}
