type IconProps = {
  className?: string;
};

export function InstagramIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export function MessageIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 3c5.25 0 9.5 3.65 9.5 8.15 0 4.5-4.25 8.15-9.5 8.15-.96 0-1.89-.14-2.75-.4L4 21l2.55-4.35C5.12 15.55 2.5 12.6 2.5 11.15 2.5 6.65 6.75 3 12 3z" />
    </svg>
  );
}

export function SoundCloudIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.5 15.5c-.28 0-.55-.03-.81-.08a4.97 4.97 0 01-9.38 0 1.01 1.01 0 00-.19-.02c-.55 0-1 .45-1 1v4.5c0 .55.45 1 1 1h10c2.48 0 4.5-2.02 4.5-4.5s-2.02-4.5-4.5-4.5h-.62zM4.5 14.25c-.41 0-.75.34-.75.75v3.5c0 .41.34.75.75.75s.75-.34.75-.75v-3.5c0-.41-.34-.75-.75-.75zm2-1.5c-.41 0-.75.34-.75.75v5c0 .41.34.75.75.75s.75-.34.75-.75v-5c0-.41-.34-.75-.75-.75zm2-1c-.41 0-.75.34-.75.75v6c0 .41.34.75.75.75s.75-.34.75-.75v-6c0-.41-.34-.75-.75-.75zm2-.75c-.41 0-.75.34-.75.75v6.5c0 .41.34.75.75.75s.75-.34.75-.75V12c0-.41-.34-.75-.75-.75z" />
    </svg>
  );
}

type ContactChannelButtonProps = {
  href: string;
  variant: "instagram" | "imessage" | "soundcloud";
  children: React.ReactNode;
  external?: boolean;
};

const VARIANT_STYLES = {
  instagram:
    "bg-[linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)] text-white hover:brightness-110",
  imessage: "bg-[#34C759] text-white hover:bg-[#2DB84E]",
  soundcloud: "bg-[#FF5500] text-white hover:bg-[#FF6A1A]",
} as const;

const VARIANT_ICONS = {
  instagram: InstagramIcon,
  imessage: MessageIcon,
  soundcloud: SoundCloudIcon,
} as const;

export default function ContactChannelButton({
  href,
  variant,
  children,
  external = false,
}: ContactChannelButtonProps) {
  const base =
    "inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200";

  const Icon = VARIANT_ICONS[variant];
  const className = `${base} ${VARIANT_STYLES[variant]}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <Icon />
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={className}>
      <Icon />
      {children}
    </a>
  );
}
