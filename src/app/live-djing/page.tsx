import Image from "next/image";
import BoothClip from "@/components/BoothClip";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import SoftMediaFrame from "@/components/SoftMediaFrame";
import {
  AFTER_PARTIES,
  DJ_BOOTH_CLIPS,
  LIVE_DJING_INTRO,
  LIVE_GALLERY_PHOTOS,
  OTHER_LOCATIONS,
} from "@/lib/data";

const CLIPS_AFTER_FIRST_IMAGE = DJ_BOOTH_CLIPS.slice(0, 3);
const CLIPS_AFTER_SECOND_IMAGE = DJ_BOOTH_CLIPS.slice(3);

function GalleryPhoto({
  photo,
}: {
  photo: (typeof LIVE_GALLERY_PHOTOS)[number];
}) {
  return (
    <ScrollReveal>
      <div className="group">
        <SoftMediaFrame aspect={photo.aspect}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="image-soft-scale object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </SoftMediaFrame>
      </div>
    </ScrollReveal>
  );
}

function ClipGroup({ clips }: { clips: readonly string[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-5">
      {clips.map((clip) => (
        <ScrollReveal key={clip}>
          <SoftMediaFrame aspect="aspect-[3/4]">
            <BoothClip
              src={clip}
              className="image-soft-scale h-full w-full object-cover"
            />
          </SoftMediaFrame>
        </ScrollReveal>
      ))}
    </div>
  );
}

export default function LiveDJingPage() {
  const [firstPhoto, secondPhoto] = LIVE_GALLERY_PHOTOS;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="lg:flex lg:items-start lg:gap-14 xl:gap-16">
        <aside className="mb-16 lg:sticky lg:top-24 lg:mb-0 lg:w-[38%] lg:shrink-0 xl:w-[36%]">
          <SectionHeading title="Live DJ Gigs" subtitle={LIVE_DJING_INTRO} />

          <section className="mb-10">
            <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-[#d4af37]">
              After Parties (Raas, DDN, Bhangra)
            </h3>
            <ul className="flex flex-col gap-3">
              {AFTER_PARTIES.map((event) => (
                <li
                  key={event}
                  className="border-l-2 border-[#d4af37]/30 pl-4 text-sm text-zinc-300"
                >
                  {event}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-[#d4af37]">
              Other Locations
            </h3>
            <ul className="flex flex-col gap-3">
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
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-10 sm:gap-14">
          <GalleryPhoto photo={firstPhoto} />

          <ClipGroup clips={CLIPS_AFTER_FIRST_IMAGE} />

          <GalleryPhoto photo={secondPhoto} />

          <ClipGroup clips={CLIPS_AFTER_SECOND_IMAGE} />
        </div>
      </div>
    </div>
  );
}
