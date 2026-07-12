import Image from "next/image";
import { PROFILE_PHOTO } from "@/lib/data";

type ProfilePhotoProps = {
  className?: string;
};

export default function ProfilePhoto({ className = "" }: ProfilePhotoProps) {
  const imageClass = "profile-photo-image object-cover";

  return (
    <div className={`profile-photo relative aspect-square ${className}`.trim()}>
      <div className="profile-photo-blur absolute inset-0 overflow-hidden rounded-full">
        <Image
          src={PROFILE_PHOTO.src}
          alt=""
          aria-hidden
          fill
          className={imageClass}
          sizes="(max-width: 1024px) 150px, 190px"
          priority
        />
      </div>
      <div className="profile-photo-sharp absolute inset-0 overflow-hidden rounded-full">
        <Image
          src={PROFILE_PHOTO.src}
          alt={PROFILE_PHOTO.alt}
          fill
          className={imageClass}
          sizes="(max-width: 1024px) 150px, 190px"
          priority
        />
      </div>
      <div
        className="profile-photo-fade pointer-events-none absolute inset-0 rounded-full"
        aria-hidden
      />
    </div>
  );
}
