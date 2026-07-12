import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#0a0a0a] text-zinc-100">
        <Nav />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
