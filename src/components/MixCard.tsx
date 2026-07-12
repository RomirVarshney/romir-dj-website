import Image from "next/image";
import type { Mix } from "@/lib/data";
import SoftMediaFrame from "@/components/SoftMediaFrame";

function MixCardContent({ title, cover }: Pick<Mix, "title" | "cover">) {
  return (
    <>
      <SoftMediaFrame aspect="aspect-square">
        <Image
          src={cover}
          alt={title}
          fill
          className="image-soft-scale object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </SoftMediaFrame>
      <div className="p-4 pt-5">
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
    "group block transition-all duration-300 hover:opacity-90";

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
