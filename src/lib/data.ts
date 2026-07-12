export const SITE = {
  name: "DJ ROMIR",
  instagram: "https://www.instagram.com/romirvarshney/",
  instagramHandle: "@romirvarshney",
  soundcloud: "https://soundcloud.com/romirvarshney",
} as const;

export const PROFILE_PHOTO = {
  src: "/images/dj/profile.png",
  alt: "DJ ROMIR performing live behind the decks",
} as const;

export const BIO =
  "I am a DJ and producer that specializes in Desi, Hip-Hop, Pop, RnB, and many other genres of music. As a former dancer for GT Ramblin' Raas (2024-2026), I've had a lot of experience working with Raas/DDN mixes, mixtapes, and competition APs throughout the nation!";

export const LIVE_DJING_INTRO =
  "I've DJed at afterparties and competitions across the country, focusing on mixing Bollywood and English music together with a blend of cultural and mainstream sounds to make sure every set feels engaging from start to finish.";

export const MIXES_INTRO =
  "I've made a variety of mixes and mixtape mashups throughout Raas and DDN Circuits";

export const AFTER_PARTIES = [
  "Raas Rampage — Orlando, FL",
  "Raas Chaos — Washington, DC",
  "DTX Dandiya — Dallas, TX",
  "Golden Gate Garba — San Francisco, CA",
  "Raas All-Stars — Baltimore, MD",
  "ATL Tamasha — Atlanta, GA",
  "Aaja Nachle — Dallas, TX",
  "Vice City Showdown — Miami, FL",
] as const;

export const OTHER_LOCATIONS = [
  "Ft. Lauderdale, FL",
  "Tampa, FL",
  "Gainesville, FL",
  "Chapel Hill, NC",
  "Athens, GA",
  "Columbus, OH",
  "New York, NY",
] as const;

export type Mix = {
  title: string;
  cover: string;
  url: string;
};

export const RAAS_MIXES: Mix[] = [
  {
    title: "GT Ramblin' Raas - RAS XVIII 2026",
    cover: "/images/covers/ras-xviii-2026.jpg",
    url: "https://soundcloud.com/romirvarshney/gt-ramblin-raas-ras-xviii-2026",
  },
  {
    title: "GT Ramblin' Raas - RAS XVII 2025",
    cover: "/images/covers/ras-xvii-2025.jpg",
    url: "https://soundcloud.com/romirvarshney/gt-final-ras-mix-1",
  },
  {
    title: "GT Ramblin' Raas 2023-2024 Mix",
    cover: "/images/covers/gr-2023-2024.jpg",
    url: "https://soundcloud.com/romirvarshney/sets/gt-ramblin-raas-2023-2024-mix",
  },
  {
    title: "UVA HooRaas 2025-2026 Mix",
    cover: "/images/covers/uva-hooraas.jpg",
    url: "https://soundcloud.com/romirvarshney/uva-hooraas-2025-2026-mix",
  },
  {
    title: "UF GatoRaas - RAS XVIII 2026",
    cover: "/images/covers/uf-gatoraas-ras-xviii.jpg",
    url: "https://soundcloud.com/romirvarshney/uf-gatoraas-ras-xviii-2026-9",
  },
  {
    title: "UF Gatoraas 2022-2023 Mix",
    cover: "/images/covers/uf-gatoraas-2022-2023.jpg",
    url: "https://soundcloud.com/romirvarshney/uf-gatoraas-2022-2023-mix",
  },
];

export const MIXTAPE_SEGMENTS: Mix[] = [
  {
    title: "NAACH x SOORAJ DOOBA HAIN",
    cover: "/images/covers/naach-sooraj.jpg",
    url: "https://soundcloud.com/romirvarshney/sooraj-dooba-hain-x-naach",
  },
  {
    title: "PYAR BADHTA HAI x WITH YOU",
    cover: "/images/covers/naach-sooraj.jpg",
    url: "https://soundcloud.com/romirvarshney/pyar-badhta-hai-x-with-you",
  },
  {
    title: "Turnt Desi Presents: ATL TAMASHA 2025 MIXTAPE",
    cover: "/images/covers/atl-tamasha-2025.jpg",
    url: "https://soundcloud.com/turntdesi/sets/tamasha2025",
  },
];

export const DJ_PHOTOS = [
  {
    src: "/images/dj/miami.png",
    alt: "DJ ROMIR at Vice City Showdown — Miami, FL",
    available: true,
  },
  {
    src: "/images/dj/atlanta.png",
    alt: "DJ ROMIR at ATL Tamasha — Atlanta, GA",
    available: true,
  },
  {
    src: "/images/dj/ggg.jpeg",
    alt: "DJ ROMIR at Golden Gate Garba — San Francisco, CA",
    available: true,
  },
  {
    src: "/images/dj/mixer.jpg",
    alt: "DJ ROMIR behind the decks",
    available: true,
  },
  {
    src: "/images/dj/ft-lauderdale.png",
    alt: "DJ ROMIR — Ft. Lauderdale, FL",
    available: true,
  },
] as const;

export const DJ_BOOTH_CLIPS = [
  "/images/gifs/IMG_0012.mp4",
  "/images/gifs/IMG_0175.mp4",
  "/images/gifs/IMG_0407.mp4",
  "/images/gifs/IMG_0548.mp4",
  "/images/gifs/IMG_0721.mp4",
  "/images/gifs/IMG_7888.mp4",
  "/images/gifs/IMG_9335.mp4",
] as const;

export const LIVE_GALLERY_PHOTOS = [
  {
    src: "/images/dj/miami.png",
    alt: "DJ ROMIR at Vice City Showdown — Miami, FL",
    aspect: "aspect-[3/4] sm:aspect-[4/5]",
  },
  {
    src: "/images/dj/img-0119.png",
    alt: "DJ ROMIR behind the decks",
    aspect: "aspect-[3/4] sm:aspect-[4/5]",
  },
] as const;
