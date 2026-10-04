export const SITE = {
  name: "DJ ROMIR",
  instagram: "https://www.instagram.com/romirvarshney/",
  instagramHandle: "@romirvarshney",
  soundcloud: "https://soundcloud.com/romirvarshney",
  phone: "904-955-6810",
  phoneHref: "tel:+19049556810",
  smsHref: "sms:+19049556810",
  email: "romir.varshney@gmail.com",
} as const;

export const PROFILE_PHOTO = {
  src: "/images/dj/miami.png",
  alt: "DJ ROMIR at Vice City Showdown — Miami, FL",
} as const;

export const CONTACT_PHOTO = {
  src: "/images/dj/booth-contact.jpg",
  alt: "DJ ROMIR behind the decks at a live gig",
} as const;

export const BIO = [
  "Hi there, my name is Romir Varshney, and I am a DJ and producer who specializes in Desi, Hip-Hop, Pop, RnB, and many other genres of music. I've spent years producing mixes, mixtapes, and running the aux at major events and celebrations from coast to coast!",
  "I've been a music lover my entire life, but I first started getting into music curation and creation in my freshman year of high school, when I finally decided to try my hand at experimenting with music. And from my first time looking at the various knobs and buttons of FL Studio, to spending countless nights on YouTube learning music theory and mixing tutorials, and eventually creating my first beats, mashups, and later on, mixes, I've really refined my understanding of the entire creative process that goes into the music that we listen to and enjoy every day.",
  "As I entered college and joined a dance team (GT Ramblin' Raas '24-'26), that's when I really got to experience the world of mixing and live DJing. Attending all of these competitions and hearing the music (sometimes my own!) from these massive speakers and subwoofers was something that really motivated me to pursue DJing seriously, transitioning from a dancer to someone driving the music behind it. I've now DJed for over 4 years, constantly refining my craft and perfecting different transitions and styles of DJing to match any genre, room, or crowd.",
  "I've been fortunate enough to DJ for a diverse portfolio of events, from afterparties to weddings, pregames, corporate events, social mixers, and many more that have allowed me to understand how to best read a room, pace a night, and play music that everyone will enjoy. I pride myself on making seamless transitions, being able to judge the room, and taking song requests and switching music very quickly throughout the night. Beyond the music, I also prioritize being communicative, organized, and stress-free to work with from initial planning all the way through the actual event itself.",
  "Come see my portfolio!",
] as const;

export const LIVE_DJING_INTRO = [
  "I've DJed for over 4 years at afterparties, weddings, pregames, corporate events, and social mixers from coast to coast. Those nights are where I learned how to read a room, pace a set, and switch styles for whoever is actually there.",
  "I mix Bollywood and English throughout so that both sides stay in the set. Seamless transitions and quick song requests matter as much as the playlist, and I want every night to feel engaging from the first song to the last.",
] as const;

export const MIXES_INTRO =
  "I've made a variety of mixes for the Raas/DDN Circuits, and have produced mashups that blend the best of Bollywood with Hip-Hop, R&B, House, Afro, etc.";

export const AFTER_PARTIES = [
  "Raas All-Stars — Baltimore, MD",
  "Golden Gate Garba — San Francisco, CA",
  "Vice City Showdown — Miami, FL",
  "Raas Rampage — Orlando, FL",
  "Raas Chaos — Washington, DC",
  "ATL Tamasha — Atlanta, GA",
  "Aaja Nachle — Dallas, TX",
] as const;

export const SET_TYPES = [
  { label: "Weddings", bold: true },
  { label: "Afterparties", bold: true },
  { label: "Clubs", bold: true },
  { label: "Corporate/Brand Events", bold: true },
  { label: "Open Format", bold: true },
  { label: "House", bold: false },
  { label: "Hip-hop", bold: false },
  { label: "Desi", bold: false },
  { label: "R&B", bold: false },
] as const;

export const OTHER_LOCATIONS = [
  "Ft. Lauderdale, FL",
  "Tampa, FL",
  "Gainesville, FL",
  "Chapel Hill, NC",
  "Athens, GA",
  "Columbus, OH",
  "New York, NY",
  "Bloomington, IN",
  "Urbana-Champaign, IL",
  "Charlotte, NC",
  "College Station, TX",
  "Columbia, SC",
  "Los Angeles, CA",
  "Raleigh, NC",
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
