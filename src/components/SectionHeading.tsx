type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  centered?: boolean;
};

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${centered ? "text-center" : ""}`}>
      <h2 className="text-2xl font-light tracking-wide text-white sm:text-3xl">
        {title}
      </h2>
      <div
        className={`mt-3 h-px w-12 bg-[#d4af37] ${centered ? "mx-auto" : ""}`}
      />
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 ${centered ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
