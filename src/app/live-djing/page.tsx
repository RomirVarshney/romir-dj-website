import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import {
  AFTER_PARTIES,
  DJ_GIFS,
  DJ_PHOTOS,
  LIVE_DJING_INTRO,
  OTHER_LOCATIONS,
} from "@/lib/data";

export default function LiveDJingPage() {
  const availablePhotos = DJ_PHOTOS.filter((p) => p.available);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title="Live DJ Gigs" subtitle={LIVE_DJING_INTRO} />

      {/* Photo gallery */}
      <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {availablePhotos.map((photo) => (
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

      {/* GIFs */}
      <div className="mb-16">
        <h3 className="mb-6 text-xs uppercase tracking-[0.25em] text-[#d4af37]">
          From the Booth
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DJ_GIFS.map((gif) => (
            <div
              key={gif}
              className="relative aspect-video overflow-hidden rounded-sm border border-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gif}
                alt="Live DJ performance"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* After Parties */}
      <section className="mb-12">
        <h3 className="mb-6 text-xs uppercase tracking-[0.25em] text-[#d4af37]">
          After Parties (Raas, DDN, Bhangra)
        </h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {AFTER_PARTIES.map((event) => (
            <li
              key={event}
              className="flex items-center gap-3 border-l-2 border-[#d4af37]/30 pl-4 text-sm text-zinc-300"
            >
              {event}
            </li>
          ))}
        </ul>
      </section>

      {/* Other Locations */}
      <section>
        <h3 className="mb-6 text-xs uppercase tracking-[0.25em] text-[#d4af37]">
          Other Locations
        </h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {OTHER_LOCATIONS.map((location) => (
            <li
              key={location}
              className="flex items-center gap-3 text-sm text-zinc-400"
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
              {location}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
