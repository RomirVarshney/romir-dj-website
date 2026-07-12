"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/data";

const links = [
  { href: "/", label: "Home" },
  { href: "/mixes", label: "Mixes" },
  { href: "/live-djing", label: "Live DJing" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.2em] text-[#d4af37] transition-opacity hover:opacity-80"
        >
          {SITE.name}
        </Link>
        <ul className="flex items-center gap-6 sm:gap-8">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-xs uppercase tracking-widest transition-colors sm:text-sm ${
                    active
                      ? "text-[#d4af37]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
