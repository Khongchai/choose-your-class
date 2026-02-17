"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const classes: { id: string; label: string; emoji: string }[] = [
  { id: "warrior", label: "Warrior", emoji: "⚔️" },
  { id: "druid", label: "Druid", emoji: "🌿" },
  { id: "mage", label: "Mage", emoji: "✨" },
  { id: "alchemist", label: "Alchemist", emoji: "⚗️" },
];

export default function ChooseClass() {
  const router = useRouter();

  const handlePlay = () => {
    router.push("/consent");
  };

  return (
    <div className="animate-page flex min-h-dvh flex-col items-center justify-between px-6 py-16 sm:py-24">
      {/* Top section */}
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/title-image.png"
          alt="Choose Your Class"
          className="pointer-events-none select-none w-50 sm:w-80 scale-[1.7] md:scale-[2]"
          width={320}
          height={160}
          priority
        />
        <p className="text-dark-brown/70 text-lg sm:text-2xl leading-relaxed text-center">
          Enter a musical quest to discover
          <br />
          your favourite ways to learn
        </p>
      </div>

      {/* Class icons */}
      <div className="flex items-center justify-center gap-6 sm:gap-10 my-12 sm:my-16">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-dark-brown/15 flex items-center justify-center text-2xl sm:text-3xl transition-colors duration-200 hover:bg-dark-brown/25">
              {cls.emoji}
            </div>
            <span className="text-dark-brown/80 text-xs sm:text-sm font-semibold">
              {cls.label}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom section */}
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={handlePlay}
          className="px-16 sm:px-20 py-3.5 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold tracking-wide transition-colors duration-200 cursor-pointer bg-dark-brown text-peach hover:bg-dark-brown/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-brown"
        >
          Play
        </button>
        <p className="text-dark-brown/50 text-xs sm:text-sm">
          Quiz takes approximately 5–10 minutes
        </p>
      </div>
    </div>
  );
}
