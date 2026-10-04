import Image from "next/image";

type LogoProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
  alt?: string;
};

export default function Logo({
  className = "h-10 w-auto",
  priority = false,
  sizes = "88px",
  alt = "DJ ROMIR",
}: LogoProps) {
  return (
    <Image
      src="/images/logo.png"
      alt={alt}
      width={1024}
      height={468}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
