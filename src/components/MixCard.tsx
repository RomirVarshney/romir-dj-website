import Image from "next/image";
import type { Mix } from "@/lib/data";

function MixCardContent({ title, cover }: Pick<Mix, "title" | "cover">) {
  return (
    <>
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="p-4">
        <h3 className="text-sm leading-snug text-zinc-200 transition-colors group-hover:text-[#d4af37]">
          {title}
        </h3>
      </div>
    </>
  );
}

export default function MixCard({ title, cover, url }: Mix) {
  const isPlaceholder = url === "#";
  const cardClass =
    "group block overflow-hidden rounded-sm border border-white/10 bg-white/5 transition-all duration-300 hover:border-[#d4af37]/40 hover:bg-white/[0.07]";

  if (isPlaceholder) {
    return (
      <div className={`${cardClass} cursor-default`}>
        <MixCardContent title={title} cover={cover} />
        <p className="px-4 pb-4 text-xs text-zinc-500">SoundCloud link coming soon</p>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cardClass} cursor-pointer`}
    >
      <MixCardContent title={title} cover={cover} />
    </a>
  );
}
