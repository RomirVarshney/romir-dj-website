"use client";

import { useRef, useState } from "react";

const SETS = [
  {
    src: "/videos/vcs-meta-glasses.mp4",
    poster: "/images/thumbs/vice-city-board.jpg",
    title: "Vice City Showdown 2026 — Miami",
  },
  {
    src: "/videos/rampage-meta-glasses.mp4",
    poster: "/images/thumbs/rampage-board.jpg",
    title: "Raas Rampage 2026 — Orlando",
  },
] as const;

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="ml-0.5 h-[17px] w-[17px] fill-white" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function SetCard({
  src,
  poster,
  title,
  onPlay,
}: {
  src: string;
  poster: string;
  title: string;
  onPlay: (video: HTMLVideoElement) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      onPlay(video);
      video.muted = false;
      void video.play();
      return;
    }
    video.pause();
  }

  return (
    <article className="group flex flex-col rounded-[18px] border border-white/15 bg-[linear-gradient(160deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03)_45%,rgba(255,255,255,0.07))] p-2.5 pb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-[20px] backdrop-saturate-[1.6] transition duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-[7px] hover:border-white/30 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_26px_60px_rgba(0,0,0,0.6),0_0_34px_rgba(0,102,255,0.12)]">
      <div className="relative mb-3 aspect-video overflow-hidden rounded-xl bg-black">
        <video
          ref={videoRef}
          src={src}
          playsInline
          preload="none"
          controls={playing}
          className={`h-full w-full object-cover ${playing ? "" : "invisible"}`}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
        {playing ? null : (
          <img
            src={poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.06]"
          />
        )}
        {playing ? null : (
          <button
            type="button"
            onClick={toggle}
            aria-label={`Play ${title}`}
            className="absolute top-1/2 left-1/2 grid h-[52px] w-[52px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/45 pl-1 text-white backdrop-blur-[10px] transition duration-300 group-hover:scale-[1.12] group-hover:border-[#0066ff] group-hover:bg-[#0066ff]"
          >
            <PlayIcon />
          </button>
        )}
      </div>
      <h3
        className="px-2 text-[clamp(15px,1.4vw,19px)] leading-[1.1] font-extrabold tracking-[-0.025em] text-[#f4f2ee] uppercase"
        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
      >
        {title}
      </h3>
    </article>
  );
}

export default function MetaGlasses() {
  function playOne(video: HTMLVideoElement) {
    document.querySelectorAll<HTMLVideoElement>("#glasses video").forEach((other) => {
      if (other !== video) other.pause();
    });
  }

  return (
    <div className="grid grid-cols-1 gap-[14px] min-[720px]:grid-cols-2">
      {SETS.map((set) => (
        <SetCard key={set.src} {...set} onPlay={playOne} />
      ))}
    </div>
  );
}
