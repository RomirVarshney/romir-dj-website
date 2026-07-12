type SoftMediaFrameProps = {
  children: React.ReactNode;
  className?: string;
  aspect?: string;
};

export default function SoftMediaFrame({
  children,
  className = "",
  aspect = "",
}: SoftMediaFrameProps) {
  return (
    <div
      className={`image-soft-frame relative w-full ${aspect} ${className}`.trim()}
    >
      <div className="image-soft-edges absolute inset-0">
        {children}
      </div>
      <div className="image-soft-edge-blur pointer-events-none absolute inset-0" aria-hidden />
      <div className="image-soft-vignette pointer-events-none absolute inset-0" aria-hidden />
    </div>
  );
}
