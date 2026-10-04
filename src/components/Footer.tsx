import Logo from "@/components/Logo";
import { SITE } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-8">
        <a href="#about" aria-label="DJ ROMIR">
          <Logo className="h-8 w-auto sm:h-9" sizes="80px" alt="" />
        </a>
        <div className="flex items-center gap-6 text-sm text-zinc-400">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            Instagram
          </a>
          <a
            href={SITE.soundcloud}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            SoundCloud
          </a>
        </div>
      </div>
    </footer>
  );
}
