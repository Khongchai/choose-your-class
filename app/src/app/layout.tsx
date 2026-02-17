import type { Metadata } from "next";
import localFont from "next/font/local";
import { GameProvider } from "@/context/GameContext";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${selawik.variable} antialiased`}>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
