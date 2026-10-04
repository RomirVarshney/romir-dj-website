import Image from "next/image";
import BioCopy from "@/components/BioCopy";
import BoothClip from "@/components/BoothClip";
import ButtonLink from "@/components/ButtonLink";
import CardRow from "@/components/CardRow";
import InquiryForm from "@/components/InquiryForm";
import LocationBelt from "@/components/LocationBelt";
import Logo from "@/components/Logo";
import MetaGlasses from "@/components/MetaGlasses";
import PhotoBelt from "@/components/PhotoBelt";
import SoundDeck from "@/components/SoundDeck";
import {
  AFTER_PARTIES,
  DJ_BOOTH_CLIPS,
  LIVE_DJING_INTRO,
  MIXES_INTRO,
  OTHER_LOCATIONS,
  PROFILE_PHOTO,
  SET_TYPES,
  SITE,
} from "@/lib/data";

const GIG_IMAGES: Record<string, string> = {
  "Golden Gate Garba — San Francisco, CA": "/images/dj/ggg.jpeg",
  "ATL Tamasha — Atlanta, GA": "/images/dj/atlanta.png",
  "Vice City Showdown — Miami, FL": "/images/dj/miami.png",
};

const RAAS_RAMPAGE_CLIP = DJ_BOOTH_CLIPS[1];
const BOOTH_ONE_CLIP = DJ_BOOTH_CLIPS[0];

const GIG_VIDEOS: Record<string, string> = {
  "Raas Rampage — Orlando, FL": RAAS_RAMPAGE_CLIP,
  "Raas Chaos — Washington, DC": "/videos/raas-chaos.mp4",
  "Golden Gate Garba — San Francisco, CA": BOOTH_ONE_CLIP,
  "Raas All-Stars — Baltimore, MD": "/videos/raas-all-stars-video.mp4",
  "ATL Tamasha — Atlanta, GA": "/videos/atl-holi-show-video.mp4",
  "Aaja Nachle — Dallas, TX": "/videos/ft-laudy-vid.mp4",
  "Vice City Showdown — Miami, FL": "/videos/vice-city-showdown-video.mp4?v=3",
};

function SectionIndex({
  index,
  label,
  title,
  variant = "default",
}: {
  index: string;
  label: string;
  title: string;
  variant?: "default" | "events";
}) {
  const [lead, ...rest] = title.split(" ");
  const tail = rest.join(" ");

  return (
    <div className="mb-8 sm:mb-10">
      <p
        className={
          variant === "events"
            ? "mb-3 font-[family-name:var(--font-space-mono)] text-xs uppercase tracking-[0.3em] text-[#0066ff]"
            : "mb-3 text-sm font-medium tracking-wide text-[#0066ff]"
        }
      >
        {index} — {label}
      </p>
      {variant === "events" ? (
        <h2
          className="text-[2.75rem] font-extrabold uppercase leading-[0.92] tracking-[-0.025em] text-[#f4f2ee] sm:text-[4.5rem]"
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          }}
        >
          {lead}
          {tail ? (
            <>
              <br />
              {tail}
            </>
          ) : null}
          <span className="text-[#0066ff]">.</span>
        </h2>
      ) : (
        <h2 className="text-4xl font-semibold uppercase tracking-tight text-white sm:text-6xl">
          {title}
        </h2>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section
        id="about"
        className="relative scroll-mt-28 bg-[#050505] pt-28 pb-16 sm:pt-32 sm:pb-24 [margin-inline:calc(50%-50vw)] [width:100vw]"
        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 50% at 78% 40%, rgba(0, 102, 255, 0.22), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6">
        <h1 className="flex justify-center">
          <Logo className="h-auto w-full max-w-xs" sizes="320px" priority />
        </h1>

        <div className="mt-10 grid grid-cols-[3fr_2fr] items-start gap-3 sm:mt-12 sm:gap-8 lg:mt-16 lg:gap-16">
          <div className="min-w-0">
            <BioCopy />
            <div className="mt-6 flex w-full flex-col gap-2 sm:mt-8 sm:gap-3 lg:flex-row">
              <ButtonLink href="#book" className="w-full px-3 text-[11px] sm:px-6 sm:text-sm lg:w-auto">
                Book a set
              </ButtonLink>
              <ButtonLink
                href="#mixes"
                variant="outline"
                className="w-full px-3 text-[11px] sm:px-6 sm:text-sm lg:w-auto"
              >
                Hear mixes
              </ButtonLink>
            </div>
            <a
              href="#live"
              className="mt-6 inline-flex max-w-full flex-col text-sm font-bold uppercase tracking-wide text-white sm:mt-10 sm:text-2xl lg:text-3xl"
            >
              <span>See my previous events ↘</span>
              <span className="mt-2 h-[3px] w-full bg-[#0066ff]" />
            </a>
          </div>

          <div className="relative w-full min-w-0">
            <div className="rounded-[1.15rem] border border-zinc-500/70 p-1.5 sm:rounded-[1.7rem] sm:p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[0.85rem] bg-[#111] sm:rounded-[1.2rem]">
                <Image
                  src={PROFILE_PHOTO.src}
                  alt={PROFILE_PHOTO.alt}
                  fill
                  priority
                  className="scale-[1.3] object-cover object-[center_40%]"
                  sizes="(max-width: 1024px) 42vw, 28rem"
                />
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <LocationBelt items={SET_TYPES} reverse label="Set types" />

      <section
        id="live"
        className="relative scroll-mt-28 overflow-hidden pt-16 pb-0 sm:pt-24 [margin-inline:calc(50%-50vw)] w-screen"
      >
        <div className="relative mx-auto max-w-6xl px-6">
        <div className="relative z-0">
        <div
          aria-hidden
          className="pointer-events-none absolute top-[30%] left-1/2 -z-10 h-[70%] w-[120vw] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(50% 60% at 25% 50%, rgba(0, 102, 255, 0.16), transparent 70%), radial-gradient(45% 55% at 75% 45%, rgba(0, 102, 255, 0.1), transparent 70%), radial-gradient(30% 40% at 50% 60%, rgba(255, 255, 255, 0.043), transparent 70%)",
          }}
        />
        <SectionIndex
          index="01"
          label="Live"
          title="Previous Events"
          variant="events"
        />
        <div className="mb-10 max-w-2xl space-y-4 text-base leading-relaxed text-zinc-400">
          {LIVE_DJING_INTRO.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <CardRow label="gigs">
          {AFTER_PARTIES.map((event) => {
            const [name, place] = event.split(" — ");
            const image = GIG_IMAGES[event];
            const video = GIG_VIDEOS[event];
            return (
              <article
                key={event}
                className="w-[17.5rem] shrink-0 snap-start rounded-[1.75rem] border border-white/10 bg-[#141414] p-3"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl bg-[#1c1c1c] ${image || video ? "aspect-[3/4]" : "aspect-[5/3]"}`}
                >
                  {video ? (
                    <BoothClip
                      src={video}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : image ? (
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="280px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="h-px w-12 bg-[#0066ff]" />
                    </div>
                  )}
                </div>
                <div className="mt-4 flex flex-col items-start gap-[5px]">
                  <p className="font-[family-name:var(--font-space-mono)] text-[11.5px] uppercase leading-none tracking-[0.18em] text-[#7eb6ff]">
                    {place}
                  </p>
                  <h3
                    className="text-[1.425rem] font-extrabold uppercase leading-[1.05] tracking-[0.01em] text-[#f4f2ee]"
                    style={{
                      fontFamily:
                        '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    }}
                  >
                    {name}
                  </h3>
                </div>
              </article>
            );
          })}
        </CardRow>

        <h3
          className="mt-16 mb-10 text-lg font-extrabold uppercase leading-none tracking-[-0.025em] text-[#f4f2ee] sm:mt-20 sm:mb-14 sm:text-xl"
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          }}
        >
          Other Locations Played In
          <span className="text-[#0066ff]">.</span>
        </h3>
        <LocationBelt locations={OTHER_LOCATIONS} />
        </div>
        </div>
      </section>

      <section
        id="mixes"
        className="relative overflow-hidden scroll-mt-28 py-16 sm:py-24 [margin-inline:calc(50%-50vw)] w-screen"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 55% at 60% 45%, rgba(0, 102, 255, 0.1), transparent 70%), radial-gradient(30% 40% at 85% 70%, rgba(255, 255, 255, 0.04), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-[clamp(36px,5vh,60px)] text-center">
            <span className="mb-3 block font-[family-name:var(--font-space-mono)] text-xs uppercase tracking-[0.3em] text-[#0066ff]">
              02 — Music
            </span>
            <h2
              className="mt-2.5 text-[clamp(44px,6.5vw,96px)] font-extrabold uppercase leading-[0.92] tracking-[-0.025em] text-[#f4f2ee]"
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              }}
            >
              The Sound<span className="text-[#0066ff]">.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400">
              {MIXES_INTRO}
            </p>
          </div>
          <div
            className="relative mx-auto max-w-[1240px] rounded-[32px] border border-white/15 p-[clamp(16px,2.4vw,32px)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.3),0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-[24px] backdrop-saturate-[1.7]"
            style={{
              background:
                "linear-gradient(160deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.02) 45%, rgba(255, 255, 255, 0.06))",
            }}
          >
            <div className="flex flex-col gap-[26px]">
              <SoundDeck />
              <div className="flex flex-wrap justify-center gap-2.5">
                <a
                  href={SITE.soundcloud}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#508cff]/50 bg-[#0066ff]/85 px-[26px] py-[13px] text-xs font-bold tracking-[0.16em] text-white uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition duration-300 hover:scale-105 hover:border-[#0066ff] hover:bg-[#0066ff]"
                >
                  SoundCloud
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="glasses"
        className="relative scroll-mt-28 overflow-hidden border-t border-white/10 py-16 sm:py-24 [margin-inline:calc(50%-50vw)] w-screen"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 50% at 45% 50%, rgba(0, 102, 255, 0.09), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-[clamp(36px,5vh,60px)] text-center">
            <span className="mb-3 block font-[family-name:var(--font-space-mono)] text-xs uppercase tracking-[0.3em] text-[#0066ff]">
              03 — Watch
            </span>
            <h2
              className="mt-2.5 text-[clamp(44px,6.5vw,96px)] leading-[0.92] font-extrabold tracking-[-0.025em] text-[#f4f2ee] uppercase"
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              }}
            >
              Through My
              <br />
              Meta Glasses
              <span className="text-[#0066ff]">.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400">
              See my own FOV of what it&apos;s like to be behind the board!
            </p>
          </div>
          <div
            className="relative mx-auto max-w-[1240px] rounded-[32px] border border-white/15 p-[clamp(16px,2.4vw,32px)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.3),0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-[24px] backdrop-saturate-[1.7]"
            style={{
              background:
                "linear-gradient(160deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.02) 45%, rgba(255, 255, 255, 0.06))",
            }}
          >
            <MetaGlasses />
          </div>
        </div>
      </section>

      <section
        id="photos"
        className="relative scroll-mt-28 overflow-hidden border-t border-white/10 py-16 sm:py-24 [margin-inline:calc(50%-50vw)] w-screen"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 55%, rgba(0, 102, 255, 0.12), transparent 70%)",
          }}
        />
        <div className="relative">
          <PhotoBelt />
        </div>
      </section>

      <section
        id="book"
        className="relative scroll-mt-28 overflow-hidden border-t border-white/10 py-16 sm:py-24 [margin-inline:calc(50%-50vw)] w-screen"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 55% at 50% 42%, rgba(0, 102, 255, 0.2), transparent 70%), radial-gradient(28% 36% at 50% 58%, rgba(255, 255, 255, 0.05), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionIndex index="04" label="Bookings" title="Inquiries." />
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-zinc-400">
            Reach out for bookings, mix inquiries, and collaborations.
          </p>
          <div
            className="relative rounded-[32px] border border-white/15 p-[clamp(16px,2.4vw,32px)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.3),0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-[24px] backdrop-saturate-[1.7]"
            style={{
              background:
                "linear-gradient(160deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.02) 45%, rgba(255, 255, 255, 0.06))",
            }}
          >
            <InquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
