"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SoundCloudIcon } from "@/components/ContactChannelButton";
import {
  MIXTAPE_SEGMENTS,
  RAAS_MIXES,
  type Mix,
} from "@/lib/data";

type SoundPlayer = Mix & { tall?: boolean; wide?: boolean };

const SOUND_PLAYERS: SoundPlayer[] = [
  { ...RAAS_MIXES[0], wide: true },
  RAAS_MIXES[1],
  RAAS_MIXES[2],
  { ...MIXTAPE_SEGMENTS[2], tall: true, wide: true },
  RAAS_MIXES[3],
  RAAS_MIXES[4],
  RAAS_MIXES[5],
  MIXTAPE_SEGMENTS[0],
  { ...MIXTAPE_SEGMENTS[1], wide: true },
];

type ScSound = {
  title: string;
  duration: number;
  playback_count?: number;
  user?: { username?: string };
};

type ProgressEvent = {
  relativePosition: number;
};

type ScWidget = {
  bind: (event: string, listener: (data?: ProgressEvent) => void) => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  skip: (index: number) => void;
  isPaused: (callback: (paused: boolean) => void) => void;
  getSounds: (callback: (sounds: ScSound[]) => void) => void;
  getCurrentSound: (callback: (sound: ScSound | null) => void) => void;
  getCurrentSoundIndex: (callback: (index: number) => void) => void;
};

declare global {
  interface Window {
    SC?: {
      Widget: (element: HTMLIFrameElement) => ScWidget;
    };
  }
}

const widgets = new Map<string, ScWidget>();

let apiPromise: Promise<void> | null = null;

function loadSoundCloudApi() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.SC?.Widget) return Promise.resolve();
  if (!apiPromise) {
    apiPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://w.soundcloud.com/player/api.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        apiPromise = null;
        reject(new Error("SoundCloud player failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return apiPromise;
}

function soundCloudPlayerSrc(url: string) {
  const params = new URLSearchParams({
    url,
    color: "#0066ff",
    auto_play: "false",
    hide_related: "true",
    show_comments: "false",
    show_user: "true",
    show_reposts: "false",
    show_teaser: "false",
    visual: "false",
  });

  return `https://w.soundcloud.com/player/?${params.toString()}`;
}

function artistName(url: string) {
  return url.includes("soundcloud.com/turntdesi") ? "Turnt Desi" : "ROMIR";
}

function formatPlays(count: number) {
  if (!Number.isFinite(count) || count < 0) return "";
  if (count < 1000) return count.toLocaleString("en-US");
  const scaled = count >= 1_000_000 ? count / 1_000_000 : count / 1000;
  const suffix = count >= 1_000_000 ? "M" : "K";
  const floored = Math.floor(scaled * 10) / 10;
  const text = Number.isInteger(floored) ? String(floored) : floored.toFixed(1);
  return `${text}${suffix}`;
}

function formatTime(duration: number) {
  if (!Number.isFinite(duration) || duration <= 0) return "";
  const seconds = Math.round(duration / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

function pauseOthers(id: string) {
  widgets.forEach((widget, key) => {
    if (key !== id) widget.pause();
  });
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" className="ml-0.5 h-3.5 w-3.5 fill-current" aria-hidden>
      <path d="M4.5 2.8v10.4L13.2 8 4.5 2.8z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" aria-hidden>
      <path d="M4 2.5h2.6v11H4v-11zm5.4 0H12v11H9.4v-11z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 5.2v5.6M5.2 8h5.6" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
      <circle cx="4.5" cy="10" r="1.3" />
      <circle cx="10" cy="10" r="1.3" />
      <circle cx="15.5" cy="10" r="1.3" />
    </svg>
  );
}

function SkipIcon({ direction }: { direction: "back" | "forward" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-4 w-4 fill-current ${direction === "back" ? "-scale-x-100" : ""}`}
      aria-hidden
    >
      <path d="M2.2 3.2 9.2 8 2.2 12.8V3.2zM11 3h1.6v10H11V3z" />
    </svg>
  );
}

function DarkPlayer({ mix }: { mix: SoundPlayer }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<ScWidget | null>(null);
  const readyRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sounds, setSounds] = useState<ScSound[]>([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [plays, setPlays] = useState<number | null>(null);
  const tall = Boolean(mix.tall);
  const artist = artistName(mix.url);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    let cancelled = false;
    let refreshTimer = 0;
    let laterTimer = 0;

    loadSoundCloudApi()
      .then(() => {
        if (cancelled || !window.SC || !iframeRef.current) return;
        const widget = window.SC.Widget(iframeRef.current);
        widgetRef.current = widget;
        widget.bind("ready", () => {
          readyRef.current = true;
          widgets.set(mix.url, widget);

          const readPlays = () => {
            if (tall) return;
            widget.getCurrentSound((sound) => {
              if (cancelled || !sound || !Number.isFinite(sound.playback_count)) return;
              setPlays(sound.playback_count ?? null);
            });
          };

          const readSounds = () => {
            if (!tall) return;
            widget.getSounds((nextSounds) => {
              if (cancelled) return;
              const tracks = (nextSounds ?? [])
                .filter(
                  (sound) =>
                    Boolean(sound?.title) &&
                    Number.isFinite(sound.duration) &&
                    sound.duration > 0,
                )
                .map((sound) => ({
                  title: sound.title,
                  duration: sound.duration,
                  playback_count: sound.playback_count,
                  user: { username: sound.user?.username },
                }));
              setSounds((current) => (tracks.length >= current.length ? tracks : current));
            });
          };

          readPlays();
          readSounds();
          refreshTimer = window.setTimeout(() => {
            readPlays();
            readSounds();
          }, 800);
          laterTimer = window.setTimeout(() => {
            if (cancelled) return;
            readPlays();
            readSounds();
          }, 1800);
        });
        widget.bind("play", () => {
          setPlaying(true);
          pauseOthers(mix.url);
          widget.getCurrentSoundIndex((index) => {
            if (!cancelled) setTrackIndex(index);
          });
        });
        widget.bind("pause", () => setPlaying(false));
        widget.bind("finish", () => {
          setPlaying(false);
          setProgress(0);
        });
        widget.bind("playProgress", (event) => {
          if (event) setProgress(event.relativePosition);
        });
      })
      .catch(() => {
        readyRef.current = false;
      });

    return () => {
      cancelled = true;
      window.clearTimeout(refreshTimer);
      window.clearTimeout(laterTimer);
      widgets.delete(mix.url);
    };
  }, [mix.url, tall]);

  function toggle() {
    const widget = widgetRef.current;
    if (!widget || !readyRef.current) {
      window.open(mix.url, "_blank", "noopener,noreferrer");
      return;
    }
    if (playing) {
      widget.pause();
      setPlaying(false);
      return;
    }
    pauseOthers(mix.url);
    widget.play();
    setPlaying(true);
  }

  function skip(direction: "back" | "forward") {
    const widget = widgetRef.current;
    if (!widget || !readyRef.current) return;
    pauseOthers(mix.url);
    if (direction === "back") widget.prev();
    else widget.next();
    widget.play();
    setPlaying(true);
  }

  function playTrack(index: number) {
    const widget = widgetRef.current;
    if (!widget || !readyRef.current) return;
    pauseOthers(mix.url);
    widget.skip(index);
    widget.play();
    setTrackIndex(index);
    setPlaying(true);
  }

  const totalPlays = sounds.reduce(
    (sum, sound) => sum + (Number.isFinite(sound.playback_count) ? sound.playback_count! : 0),
    0,
  );
  const playsValue = tall ? (sounds.length > 0 ? totalPlays : null) : plays;
  const playsLabel = playsValue == null ? "" : formatPlays(playsValue);

  const playButton = (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? `Pause ${mix.title}` : `Play ${mix.title}`}
      aria-pressed={playing}
      className={`grid place-items-center rounded-full transition hover:scale-105 ${
        tall
          ? "h-11 w-11 bg-white text-black"
          : "h-8 w-8 border border-white/80 text-white"
      }`}
    >
      {playing ? <PauseIcon /> : <PlayIcon />}
    </button>
  );

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border bg-[#121212] transition duration-300 hover:-translate-y-[3px] hover:border-white/20 ${
        mix.wide ? "min-[720px]:col-span-2" : ""
      } ${playing ? "border-white/25" : "border-white/10"}`}
    >
      <iframe
        ref={iframeRef}
        title={mix.title}
        src={soundCloudPlayerSrc(mix.url)}
        allow="autoplay"
        loading="lazy"
        tabIndex={-1}
        className="pointer-events-none absolute h-px w-px opacity-0"
        aria-hidden
      />
      <div className={`flex items-center gap-4 px-4 ${tall ? "h-[168px]" : "h-[152px]"}`}>
        <Image
          src={mix.cover}
          alt=""
          width={120}
          height={120}
          className={`shrink-0 rounded-[4px] object-cover ${
            tall ? "size-[72px] min-[720px]:size-[120px]" : "size-[72px] min-[720px]:size-[112px]"
          }`}
        />
        <div className="min-w-0 flex-1">
          <h3
            className={`truncate font-bold text-white ${tall ? "text-[22px] leading-tight" : "text-[15px] leading-tight"}`}
          >
            {mix.title}
          </h3>
          <p className="mt-1.5 flex min-w-0 items-center gap-2 text-[13px] text-[#b3b3b3]">
            <span className="hidden shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-[11px] font-semibold text-white/85 min-[720px]:inline">
              SoundCloud
            </span>
            <span className="truncate">{artist}</span>
            {playsLabel ? (
              <span
                className="shrink-0 tabular-nums"
                aria-label={`${(playsValue ?? 0).toLocaleString("en-US")} plays`}
              >
                · {playsLabel}
              </span>
            ) : null}
          </p>
          <a
            href={mix.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 hidden max-w-full items-center gap-2 text-[13px] text-[#b3b3b3] transition hover:text-white min-[720px]:inline-flex"
          >
            <PlusIcon />
            <span className="truncate">Listen on SoundCloud</span>
          </a>
        </div>
        <div className={`flex shrink-0 flex-col items-end ${tall ? "h-[120px]" : "h-[112px]"} justify-between`}>
          <a
            href={mix.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${mix.title} on SoundCloud`}
            className="text-[#ff5500]"
          >
            <SoundCloudIcon className="h-[18px] w-[18px]" />
          </a>
          <div className="flex items-center gap-3 text-[#b3b3b3]">
            {tall ? (
              <button
                type="button"
                onClick={() => skip("back")}
                aria-label="Previous track"
                className="transition hover:text-white"
              >
                <SkipIcon direction="back" />
              </button>
            ) : (
              <a
                href={mix.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`More options for ${mix.title}`}
                className="hidden transition hover:text-white min-[720px]:block"
              >
                <DotsIcon />
              </a>
            )}
            {playButton}
            {tall ? (
              <button
                type="button"
                onClick={() => skip("forward")}
                aria-label="Next track"
                className="transition hover:text-white"
              >
                <SkipIcon direction="forward" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
      {tall ? (
        <ol className="h-[184px] overflow-y-auto border-t border-white/10 [scrollbar-color:#3a3a3a_transparent]">
          {sounds.map((sound, index) => {
            const current = playing && trackIndex === index;
            return (
              <li key={`${sound.title}-${index}`}>
                <button
                  type="button"
                  onClick={() => playTrack(index)}
                  className="grid w-full grid-cols-[1.75rem_1fr_auto_auto] items-center gap-3 px-4 py-2 text-left hover:bg-white/[0.04]"
                >
                  <span className={`text-sm ${current ? "text-[#0066ff]" : "text-[#b3b3b3]"}`}>
                    {index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className={`block truncate text-sm ${current ? "text-white" : "text-[#e8e8e8]"}`}>
                      {sound.title}
                    </span>
                    <span className="block truncate text-xs text-[#b3b3b3]">
                      {sound.user?.username ?? artist}
                    </span>
                  </span>
                  <span
                    className="text-xs tabular-nums text-[#b3b3b3]"
                    aria-label={
                      Number.isFinite(sound.playback_count)
                        ? `${sound.playback_count!.toLocaleString("en-US")} plays`
                        : undefined
                    }
                  >
                    {formatPlays(sound.playback_count ?? NaN)}
                  </span>
                  <span className="text-xs tabular-nums text-[#b3b3b3]">{formatTime(sound.duration)}</span>
                </button>
              </li>
            );
          })}
        </ol>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
        <div
          className="h-full bg-[#0066ff]"
          style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />
      </div>
    </article>
  );
}

export default function SoundDeck() {
  return (
    <div className="grid grid-cols-1 gap-3 min-[720px]:grid-cols-2">
      {SOUND_PLAYERS.map((mix) => (
        <DarkPlayer key={mix.url} mix={mix} />
      ))}
    </div>
  );
}
