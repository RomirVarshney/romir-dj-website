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

const RELEASED_MASHUPS: SoundPlayer[] = [
  { ...MIXTAPE_SEGMENTS[2], tall: true, wide: true },
  MIXTAPE_SEGMENTS[0],
  MIXTAPE_SEGMENTS[1],
];

const MIXES: SoundPlayer[] = [
  { ...RAAS_MIXES[0], wide: true },
  { ...RAAS_MIXES[1], wide: true },
  RAAS_MIXES[2],
  RAAS_MIXES[3],
  RAAS_MIXES[4],
  RAAS_MIXES[5],
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
const MASHUP_ID = "mashup-preview";
const MASHUP_SRC = "/audio/pyaar-hota-x-down-with-me.mp3";
const MASHUP_START = 22;
const FADE_IN_SECONDS = 0.55;
const FADE_OUT_SECONDS = 0.2;

let fadeOutPreview: (() => void) | null = null;

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
  if (id !== MASHUP_ID) fadeOutPreview?.();
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
  const articleRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<ScWidget | null>(null);
  const readyRef = useRef(false);
  const startRef = useRef<(() => void) | null>(null);
  const wantsPlayRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sounds, setSounds] = useState<ScSound[]>([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [plays, setPlays] = useState<number | null>(null);
  const tall = Boolean(mix.tall);
  const artist = artistName(mix.url);

  useEffect(() => {
    const iframe = iframeRef.current;
    const article = articleRef.current;
    if (!iframe || !article) return;
    let cancelled = false;
    let refreshTimer = 0;
    let laterTimer = 0;
    let started = false;

    const start = () => {
      if (started || cancelled) return;
      started = true;
      if (iframeRef.current && !iframeRef.current.getAttribute("src")) {
        iframeRef.current.src = soundCloudPlayerSrc(mix.url);
      }

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

            if (wantsPlayRef.current) {
              wantsPlayRef.current = false;
              pauseOthers(mix.url);
              widget.play();
            }
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
          if (wantsPlayRef.current) {
            wantsPlayRef.current = false;
            window.open(mix.url, "_blank", "noopener,noreferrer");
          }
        });
    };

    startRef.current = start;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) start();
      },
      { rootMargin: "800px 0px", threshold: 0 },
    );
    observer.observe(article);

    return () => {
      cancelled = true;
      startRef.current = null;
      wantsPlayRef.current = false;
      observer.disconnect();
      window.clearTimeout(refreshTimer);
      window.clearTimeout(laterTimer);
      widgets.delete(mix.url);
      widgetRef.current = null;
      readyRef.current = false;
    };
  }, [mix.url, tall]);

  function toggle() {
    const widget = widgetRef.current;
    if (!widget || !readyRef.current) {
      wantsPlayRef.current = true;
      startRef.current?.();
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
      ref={articleRef}
      className={`relative overflow-hidden rounded-2xl border bg-[#121212] transition duration-300 hover:-translate-y-[3px] hover:border-white/20 ${
        mix.wide ? "min-[720px]:col-span-2" : ""
      } ${playing ? "border-white/25" : "border-white/10"}`}
    >
      <iframe
        ref={iframeRef}
        title={mix.title}
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
            const playsText = formatPlays(sound.playback_count ?? NaN);
            const timeText = formatTime(sound.duration);
            return (
              <li key={`${sound.title}-${index}`}>
                <button
                  type="button"
                  onClick={() => playTrack(index)}
                  className="grid w-full grid-cols-[1.75rem_1fr_auto_auto_auto] items-center gap-3 px-4 py-2 text-left hover:bg-white/[0.04]"
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
                    {playsText}
                  </span>
                  {playsText && timeText ? (
                    <span aria-hidden className="h-1.5 w-1.5 bg-[#0066ff]" />
                  ) : (
                    <span aria-hidden />
                  )}
                  <span className="text-xs tabular-nums text-[#b3b3b3]">{timeText}</span>
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

function MashupPreview() {
  const articleRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const graphRef = useRef<{ context: AudioContext; gain: GainNode } | null>(null);
  const tokenRef = useRef(0);
  const stopRef = useRef<() => void>(() => {});
  const [hoverCapable, setHoverCapable] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  function ensureGraph() {
    const audio = audioRef.current;
    if (!audio || graphRef.current) return graphRef.current;
    const context = new AudioContext();
    const gain = context.createGain();
    gain.gain.value = 0;
    const source = context.createMediaElementSource(audio);
    source.connect(gain);
    gain.connect(context.destination);
    graphRef.current = { context, gain };
    return graphRef.current;
  }

  function rampGain(value: number, seconds: number) {
    const graph = graphRef.current;
    if (!graph) return;
    const now = graph.context.currentTime;
    const gain = graph.gain.gain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(gain.value, now);
    gain.linearRampToValueAtTime(value, now + seconds);
  }

  function stop() {
    const audio = audioRef.current;
    tokenRef.current += 1;
    const token = tokenRef.current;
    if (!audio || !graphRef.current) {
      setPlaying(false);
      return;
    }
    rampGain(0, FADE_OUT_SECONDS);
    window.setTimeout(() => {
      if (tokenRef.current !== token) return;
      audio.pause();
      setPlaying(false);
    }, FADE_OUT_SECONDS * 1000 + 40);
  }

  stopRef.current = stop;

  useEffect(() => {
    fadeOutPreview = () => stopRef.current();
    return () => {
      fadeOutPreview = null;
      const audio = audioRef.current;
      if (audio) audio.pause();
      void graphRef.current?.context.close();
      graphRef.current = null;
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setHoverCapable(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const article = articleRef.current;
    const audio = audioRef.current;
    if (!article || !audio) return;

    const warm = () => {
      if (audio.getAttribute("src")) return;
      audio.preload = "auto";
      audio.src = MASHUP_SRC;
      audio.load();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) warm();
      },
      { rootMargin: "800px 0px", threshold: 0 },
    );
    observer.observe(article);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      if (!audio.duration) return;
      setProgress(audio.currentTime / audio.duration);
    };
    audio.addEventListener("timeupdate", onTime);
    return () => audio.removeEventListener("timeupdate", onTime);
  }, []);

  async function start() {
    const audio = audioRef.current;
    if (!audio) return;
    const token = ++tokenRef.current;
    if (!audio.getAttribute("src")) {
      audio.preload = "auto";
      audio.src = MASHUP_SRC;
    }
    const graph = ensureGraph();
    if (!graph) return;
    pauseOthers(MASHUP_ID);
    try {
      await graph.context.resume();
    } catch {
      return;
    }
    if (token !== tokenRef.current) return;
    if (audio.readyState < HTMLMediaElement.HAVE_METADATA) {
      await new Promise<void>((resolve) => {
        audio.addEventListener("loadedmetadata", () => resolve(), { once: true });
      });
    }
    if (token !== tokenRef.current) return;
    audio.loop = true;
    audio.currentTime = MASHUP_START;
    if (Math.abs(audio.currentTime - MASHUP_START) > 0.35) {
      await new Promise<void>((resolve) => {
        audio.addEventListener("seeked", () => resolve(), { once: true });
      });
    }
    if (token !== tokenRef.current) return;
    graph.gain.gain.cancelScheduledValues(graph.context.currentTime);
    graph.gain.gain.setValueAtTime(0, graph.context.currentTime);
    graph.gain.gain.linearRampToValueAtTime(
      1,
      graph.context.currentTime + FADE_IN_SECONDS,
    );
    try {
      await audio.play();
    } catch {
      return;
    }
    if (token !== tokenRef.current) {
      audio.pause();
      return;
    }
    setPlaying(true);
  }

  return (
    <div>
      <GroupLabel>Upcoming Mashup</GroupLabel>
      <article
        ref={articleRef}
        onPointerEnter={hoverCapable ? () => void start() : undefined}
        onPointerLeave={hoverCapable ? stop : undefined}
        onClick={
          hoverCapable
            ? undefined
            : () => {
                const audio = audioRef.current;
                if (audio && !audio.paused) stop();
                else void start();
              }
        }
        className={`relative overflow-hidden rounded-2xl border bg-[#101010] transition duration-300 hover:-translate-y-[3px] hover:border-white/25 ${
          playing ? "border-[#0066ff]/70" : "border-white/15"
        }`}
      >
      <audio ref={audioRef} preload="none" loop className="hidden" />
      <div className="flex items-center gap-4 px-5 py-5 sm:gap-6">
        <Image
          src="/images/covers/pyaar-hota-x-down-with-me.jpg"
          alt=""
          width={220}
          height={220}
          className="size-28 shrink-0 rounded-xl object-cover sm:size-44"
        />
        <div className="min-w-0">
          <h3 className="text-lg font-bold leading-tight text-white sm:text-2xl">
            PYAAR HOTA KAYI BAAR HAI x DOWN WITH ME
          </h3>
          <p className="mt-2 text-sm text-[#b3b3b3]">ROMIR</p>
          <p className="mt-3 text-sm text-[#b3b3b3]">
            <span className="[@media(hover:hover)_and_(pointer:fine)]:hidden">
              Tap to preview
            </span>
            <span className="hidden [@media(hover:hover)_and_(pointer:fine)]:inline">
              Hover to preview
            </span>
          </p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
        <div
          className="h-full bg-[#0066ff]"
          style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />
      </div>
      </article>
    </div>
  );
}

function GroupLabel({ children }: { children: string }) {
  return (
    <p
      className="mb-3 text-[13px] font-extrabold uppercase leading-none tracking-[-0.025em] text-[#f4f2ee]"
      style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      {children}
    </p>
  );
}

function PlayerGrid({ players }: { players: SoundPlayer[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 min-[720px]:grid-cols-2">
      {players.map((mix) => (
        <DarkPlayer key={mix.url} mix={mix} />
      ))}
    </div>
  );
}

export default function SoundDeck() {
  return (
    <div className="flex flex-col gap-10">
      <MashupPreview />
      <div>
        <GroupLabel>Released Mashups</GroupLabel>
        <PlayerGrid players={RELEASED_MASHUPS} />
      </div>
      <div>
        <GroupLabel>Mixes</GroupLabel>
        <PlayerGrid players={MIXES} />
      </div>
    </div>
  );
}
