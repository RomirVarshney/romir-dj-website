type SoftMediaFrameProps = {
  children: React.ReactNode;
  className?: string;
  aspect?: string;
  variant?: "default" | "circle";
};

export default function SoftMediaFrame({
  children,
  className = "",
  aspect = "",
  variant = "default",
}: SoftMediaFrameProps) {
  const isCircle = variant === "circle";
  const rounded = isCircle ? "rounded-full" : "";

  return (
    <div
      className={`image-soft-frame ${isCircle ? "image-soft-frame-circle" : ""} relative w-full ${aspect} ${className}`.trim()}
    >
      <div
        className={`${isCircle ? "image-soft-edges-circle" : "image-soft-edges"} absolute inset-0 ${rounded}`.trim()}
      >
        {children}
      </div>
      <div
        className={`${isCircle ? "image-soft-edge-blur-circle" : "image-soft-edge-blur"} pointer-events-none absolute inset-0 ${rounded}`.trim()}
        aria-hidden
      />
      <div
        className={`${isCircle ? "image-soft-vignette-circle" : "image-soft-vignette"} pointer-events-none absolute inset-0 ${rounded}`.trim()}
        aria-hidden
      />
    </div>
  );
}
