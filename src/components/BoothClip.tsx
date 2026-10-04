"use client";

import { useEffect, useRef } from "react";

type BoothClipProps = {
  src: string;
  className?: string;
};

export default function BoothClip({ src, className }: BoothClipProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const play = () => {
      void video.play().catch(() => undefined);
    };

    const start = () => {
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        play();
        return;
      }

      video.addEventListener("loadeddata", play, { once: true });
      video.load();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      preload="none"
      className={className}
    />
  );
}
