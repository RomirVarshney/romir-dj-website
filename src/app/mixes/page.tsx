import MixCard from "@/components/MixCard";
import SectionHeading from "@/components/SectionHeading";
import {
  MIXES_INTRO,
  MIXTAPE_SEGMENTS,
  RAAS_MIXES,
  SITE,
} from "@/lib/data";

export default function MixesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title="Mixes" subtitle={MIXES_INTRO} centered />

      <p className="mb-12 text-center text-sm text-zinc-500">
        DM {SITE.instagramHandle} for mix inquiries
      </p>

      <section className="mb-16">
        <h3 className="mb-6 text-base font-medium uppercase tracking-[0.2em] text-[#d4af37] sm:text-lg">
          Raas &amp; DDN Mixes
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RAAS_MIXES.map((mix) => (
            <MixCard key={mix.title} {...mix} />
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-6 text-base font-medium uppercase tracking-[0.2em] text-[#d4af37] sm:text-lg">
          Mixtape Segments
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MIXTAPE_SEGMENTS.map((mix) => (
            <MixCard key={mix.title} {...mix} />
          ))}
        </div>
      </section>
    </div>
  );
}
