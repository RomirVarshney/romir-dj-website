import type { Metadata } from "next";
import { Geist, Space_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "DJ ROMIR",
  description:
    "DJ and producer specializing in Desi, Hip-Hop, Pop, RnB, and more. Raas/DDN mixes, mixtapes, and live DJing across the nation.",
  openGraph: {
    title: "DJ ROMIR",
    description:
      "DJ and producer specializing in Desi, Hip-Hop, Pop, RnB, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#0a0a0a] text-zinc-100">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
