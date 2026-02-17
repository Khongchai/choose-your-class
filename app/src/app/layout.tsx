import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { GameProvider } from "@/context/GameContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
      <body className={`${geistSans.variable} antialiased`}>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
