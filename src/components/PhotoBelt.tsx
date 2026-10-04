import Image from "next/image";

const PHOTOS = [
  {
    src: "/images/dj/profile.png",
    alt: "DJ ROMIR performing live behind the decks",
    position: "object-[center_80%]",
  },
  {
    src: "/images/dj/atlanta.png",
    alt: "DJ ROMIR at ATL Tamasha — Atlanta, GA",
  },
  {
    src: "/images/dj/ggg.jpeg",
    alt: "DJ ROMIR at Golden Gate Garba — San Francisco, CA",
  },
  {
    src: "/images/dj/img-0119.png",
    alt: "DJ ROMIR behind the decks",
  },
  {
    src: "/images/dj/booth-contact.jpg",
    alt: "DJ ROMIR behind the decks at a live gig",
  },
  {
    src: "/images/dj/mixer.jpg",
    alt: "DJ ROMIR with the crowd at the booth",
  },
] as const;

function Cards({ hidden = false }: { hidden?: boolean }) {
  const items = [...PHOTOS, ...PHOTOS];

  return (
    <div className="flex gap-4" aria-hidden={hidden || undefined}>
      {items.map((photo, index) => (
        <figure
          key={`${hidden ? "b" : "a"}-${index}`}
          className="relative w-[74vw] flex-none rounded-[18px] border border-white/[0.14] bg-[linear-gradient(160deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03)_45%,rgba(255,255,255,0.07))] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_14px_36px_rgba(0,0,0,0.45)] backdrop-blur-[18px] backdrop-saturate-[1.6] transition duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:z-10 hover:scale-[1.04] hover:-rotate-[0.5deg] hover:border-white/30 min-[821px]:w-[clamp(260px,28vw,400px)]"
        >
          <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
            <Image
              src={photo.src}
              alt={hidden || index >= PHOTOS.length ? "" : photo.alt}
              fill
              sizes="(max-width: 820px) 74vw, 400px"
              className={`object-cover ${"position" in photo ? photo.position : ""}`}
            />
          </div>
        </figure>
      ))}
    </div>
  );
}

export default function PhotoBelt() {
  return (
    <div className="overflow-hidden py-3">
      <div className="flex w-max gap-4 hover:[animation-play-state:paused] motion-reduce:animate-none animate-[location-marquee_55s_linear_infinite]">
        <Cards />
        <Cards hidden />
      </div>
    </div>
  );
}
