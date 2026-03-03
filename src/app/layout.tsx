import type { Metadata } from "next";
import localFont from "next/font/local";
import { GameProvider } from "@/context/GameContext";
import I18nProvider from "@/i18n/I18nProvider";
import HapticsProvider from "@/components/HapticsProvider";
import BackgroundMusic from "@/components/BackgroundMusic";
import "./globals.css";

const selawik = localFont({
  src: [
    { path: "../fonts/selawkl.woff2", weight: "300" },
    { path: "../fonts/selawksl.woff2", weight: "350" },
    { path: "../fonts/selawk.woff2", weight: "400" },
    { path: "../fonts/selawksb.woff2", weight: "600" },
    { path: "../fonts/selawkb.woff2", weight: "700" },
  ],
  variable: "--font-selawik",
});


export const metadata: Metadata = {
  title: "Choose Your Class - Music Learning Quest",
  description:
    "Discover your favourite ways to learn through a musical quest",
  openGraph: {
    title: "Choose Your Class - Music Learning Quest",
    description:
      "Discover your favourite ways to learn through a musical quest",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Choose Your Class - Music Learning Quest",
    description:
      "Discover your favourite ways to learn through a musical quest",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${selawik.variable} antialiased`}>
        <I18nProvider>
          <GameProvider>
            <HapticsProvider>
              <BackgroundMusic />
              {children}
            </HapticsProvider>
          </GameProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
