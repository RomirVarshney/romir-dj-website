import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  external?: boolean;
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
}: ButtonLinkProps) {
  const base =
    "inline-flex items-center justify-center rounded-sm px-6 py-3 text-sm font-medium uppercase tracking-widest transition-all duration-200";
  const styles =
    variant === "primary"
      ? "bg-[#d4af37] text-black hover:bg-[#e8c547]"
      : "border border-[#d4af37]/50 text-[#d4af37] hover:border-[#d4af37] hover:bg-[#d4af37]/10";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${styles}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
