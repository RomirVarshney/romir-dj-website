import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import ScrollReveal from "@/components/ScrollReveal";
import SoftMediaFrame from "@/components/SoftMediaFrame";
import { BIO, DJ_PHOTOS, SITE } from "@/lib/data";

const HOME_PHOTOS = [
  {
    photo: DJ_PHOTOS.find((p) => p.src === "/images/dj/mixer.jpg")!,
    imageClass: "ml-0 mr-auto w-full max-w-4xl",
    aspect: "aspect-[4/3] sm:aspect-[16/10]",
  },
  {
    photo: DJ_PHOTOS.find((p) => p.src === "/images/dj/atlanta.png")!,
    imageClass: "ml-auto mr-0 w-full max-w-2xl sm:w-[78%]",
    aspect: "aspect-[3/4] sm:aspect-[4/5]",
  },
  {
    photo: DJ_PHOTOS.find((p) => p.src === "/images/dj/ggg.jpeg")!,
    imageClass: "ml-0 mr-auto w-full max-w-3xl sm:ml-12 sm:w-[85%]",
    aspect: "aspect-[5/4]",
  },
].filter((item) => item.photo.available);

const NAV_LINKS = [
  { href: "/mixes", label: "Mixes" },
  { href: "/live-djing", label: "Live DJing" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <header className="mb-12 max-w-2xl sm:mb-16">
        <p className="animate-fade-up mb-4 text-xs uppercase tracking-[0.3em] text-[#d4af37]">
          DJ &amp; Producer
        </p>
        <h1 className="animate-fade-up-delay-1 mb-8 text-5xl font-light tracking-wider text-white sm:text-7xl">
          {SITE.name}
        </h1>
        <p className="animate-fade-up-delay-2 text-lg leading-relaxed text-zinc-400">
          {BIO}
        </p>
      </header>

      <nav className="animate-fade-up-delay-3 mx-auto mb-16 flex w-full max-w-sm flex-col gap-3 sm:mb-20">
        {NAV_LINKS.map(({ href, label }, index) => (
          <ButtonLink
            key={href}
            href={href}
            variant={index === 0 ? "primary" : "outline"}
            className="w-full"
          >
            {label}
          </ButtonLink>
        ))}
      </nav>

      <div className="flex flex-col gap-12 sm:gap-20">
        {HOME_PHOTOS.map(({ photo, imageClass, aspect }) => (
          <ScrollReveal key={photo.src} className="w-full">
            <div className={`min-w-0 ${imageClass}`}>
              <SoftMediaFrame aspect={aspect}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="image-soft-scale object-cover"
                  sizes="(max-width: 640px) 92vw, 56rem"
                  priority={photo.src === "/images/dj/mixer.jpg"}
                />
              </SoftMediaFrame>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
