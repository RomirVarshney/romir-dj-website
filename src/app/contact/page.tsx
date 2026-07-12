import ButtonLink from "@/components/ButtonLink";
import SectionHeading from "@/components/SectionHeading";
import { SITE } from "@/lib/data";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-lg text-center">
        <SectionHeading title="Contact" />
        <p className="mb-4 text-lg text-zinc-300">
          Reach out on Instagram for bookings, mix inquiries, and collaborations.
        </p>
        <p className="mb-10 text-2xl font-light tracking-wide text-[#d4af37]">
          {SITE.instagramHandle}
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <ButtonLink href={SITE.instagram} external>
            DM on Instagram
          </ButtonLink>
          <ButtonLink href={SITE.soundcloud} external variant="outline">
            SoundCloud
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
