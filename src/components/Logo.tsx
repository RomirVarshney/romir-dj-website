import Image from "next/image";

type LogoProps = {
  className?: string;
  priority?: boolean;
  alt?: string;
};

export default function Logo({
  className = "h-10 w-auto",
  priority = false,
  alt = "DJ ROMIR",
}: LogoProps) {
  return (
    <Image
      src="/images/logo.png"
      alt={alt}
      width={1024}
      height={468}
      priority={priority}
      className={className}
    />
  );
}
