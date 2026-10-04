"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

const links = [
  { href: "#about", id: "about", label: "Bio" },
  { href: "#live", id: "live", label: "Live" },
  { href: "#mixes", id: "mixes", label: "Music" },
] as const;

export default function Nav() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const sections = ["about", "live", "mixes", "book"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-3">
      <nav className="pointer-events-auto grid w-full max-w-3xl grid-cols-[1fr_auto_1fr] items-center rounded-full border border-white/10 bg-[#141414]/85 px-2.5 py-2 shadow-none backdrop-blur-md sm:px-3">
        <a href="#about" className="justify-self-start" aria-label="DJ ROMIR">
          <Logo className="h-8 w-auto sm:h-9" sizes="80px" alt="" />
        </a>
        <ul className="flex items-center justify-center gap-2.5 sm:gap-6">
          {links.map(({ href, id, label }) => (
            <li key={id}>
              <a
                href={href}
                className={`text-[10px] uppercase tracking-widest transition-colors sm:text-xs ${
                  active === id
                    ? "text-[#0066ff]"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#book"
          className="justify-self-end shrink-0 rounded-full bg-[#0066ff] px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#3385ff] sm:px-4 sm:text-xs"
        >
          <span className="sm:hidden">Book</span>
          <span className="hidden sm:inline">Book now</span>
        </a>
      </nav>
    </header>
  );
}
