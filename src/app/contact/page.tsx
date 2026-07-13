import Image from "next/image";
import ContactChannelButton from "@/components/ContactChannelButton";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import SoftMediaFrame from "@/components/SoftMediaFrame";
import { CONTACT_PHOTO, SITE } from "@/lib/data";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="lg:flex lg:items-start lg:gap-14 xl:gap-16">
        <div className="mb-12 lg:mb-0 lg:w-[42%] lg:shrink-0 xl:w-[40%]">
          <SectionHeading title="Contact" />
          <p className="mb-10 text-lg text-zinc-300">
            Reach out on Instagram or by phone for bookings, mix inquiries, and
            collaborations.
          </p>
          <div className="flex w-full max-w-sm flex-col gap-4">
            <ContactChannelButton href={SITE.smsHref} variant="imessage">
              Send a Text ({SITE.phone})
            </ContactChannelButton>
            <ContactChannelButton
              href={SITE.instagram}
              variant="instagram"
              external
            >
              Message on Instagram ({SITE.instagramHandle})
            </ContactChannelButton>
            <ContactChannelButton
              href={SITE.soundcloud}
              variant="soundcloud"
              external
            >
              Listen on SoundCloud
            </ContactChannelButton>
          </div>
        </div>

        <ScrollReveal className="min-w-0 flex-1 lg:sticky lg:top-24">
          <SoftMediaFrame aspect="aspect-[3/4] sm:aspect-[4/5]">
            <Image
              src={CONTACT_PHOTO.src}
              alt={CONTACT_PHOTO.alt}
              fill
              className="image-soft-scale object-cover brightness-[0.55] blur-[1px]"
              sizes="(max-width: 1024px) 92vw, 36vw"
              priority
            />
          </SoftMediaFrame>
        </ScrollReveal>
      </div>
    </div>
  );
}
