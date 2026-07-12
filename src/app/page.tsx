import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import SectionHeading from "@/components/SectionHeading";
import {
  AFTER_PARTIES,
  BIO,
  DJ_GIFS,
  DJ_PHOTOS,
  RAAS_MIXES,
  SITE,
} from "@/lib/data";

export default function Home() {
  const availablePhotos = DJ_PHOTOS.filter((p) => p.available);
  const previewEvents = AFTER_PARTIES.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <p className="animate-fade-up mb-4 text-xs uppercase tracking-[0.3em] text-[#d4af37]">
          DJ &amp; Producer
        </p>
        <h1 className="animate-fade-up-delay-1 mb-8 text-5xl font-light tracking-wider text-white sm:text-7xl">
          {SITE.name}
        </h1>
        <p className="animate-fade-up-delay-2 max-w-2xl text-lg leading-relaxed text-zinc-400">
          {BIO}
        </p>
      </section>

      {/* Mixes CTA */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            title="Mixes"
            subtitle="Raas, DDN, and mixtape mashups from circuits across the nation."
          />
          <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {RAAS_MIXES.slice(0, 6).map((mix) => (
              <div
                key={mix.title}
                className="relative aspect-square overflow-hidden rounded-sm border border-white/10"
              >
                <Image
                  src={mix.cover}
                  alt={mix.title}
                  fill
                  className="object-cover opacity-80 transition-opacity hover:opacity-100"
                  sizes="(max-width: 640px) 50vw, 16vw"
                />
              </div>
            ))}
          </div>
          <ButtonLink href="/mixes">Listen to Mixes</ButtonLink>
        </div>
      </section>

      {/* Live DJing preview */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            title="Live DJing"
            subtitle="Afterparties and competitions from coast to coast."
          />

          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            {availablePhotos.slice(0, 3).map((photo) => (
              <div
                key={photo.src}
                className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-white/10"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-xs uppercase tracking-widest text-[#d4af37]">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-10 flex gap-3 overflow-x-auto pb-2">
            {DJ_GIFS.map((gif) => (
              <div
                key={gif}
                className="relative h-32 w-48 shrink-0 overflow-hidden rounded-sm border border-white/10 sm:h-40 sm:w-64"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={gif}
                  alt="Live DJ set"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          <ul className="mb-10 grid gap-2 sm:grid-cols-2">
            {previewEvents.map((event) => (
              <li
                key={event}
                className="flex items-center gap-3 text-sm text-zinc-400"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-[#d4af37]" />
                {event}
              </li>
            ))}
          </ul>

          <ButtonLink href="/live-djing" variant="outline">
            View Live Gigs
          </ButtonLink>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading title="Get in Touch" />
          <p className="mb-8 max-w-md text-zinc-400">
            For bookings, mix inquiries, or collaborations — reach out on
            Instagram.
          </p>
          <ButtonLink href={SITE.instagram} external>
            DM {SITE.instagramHandle}
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
