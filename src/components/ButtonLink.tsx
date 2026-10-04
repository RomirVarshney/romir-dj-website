import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  external?: boolean;
  className?: string;
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonLinkProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-widest transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "bg-[#0066ff] text-white hover:bg-[#3385ff]"
      : "border border-white/20 text-white hover:border-white/50";

  const classes = `${base} ${styles} ${className}`.trim();
  const isHash = href.startsWith("#");

  if (external || isHash) {
    return (
      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
