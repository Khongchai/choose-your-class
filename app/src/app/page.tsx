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
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center gap-6 sm:gap-10">
        {/* Title */}
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <Image
            src="/title-image.png"
            alt="Choose Your Class"
            className="pointer-events-none select-none w-50 sm:w-80 scale-[1.7] md:scale-[2]"
            width={320}
            height={160}
            priority
          />
          <p className="text-warm-gray text-base sm:text-2xl leading-relaxed text-center">
            Enter a musical quest to discover
            <br />
            your favourite ways to learn
          </p>
        </div>

        {/* Class Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className={`flex flex-col items-center gap-2 rounded-xl p-3 sm:p-4 transition-all duration-200 cursor-pointer`}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cream flex items-center justify-center text-xl sm:text-2xl">
                {cls.emoji}
              </div>
              <span className="text-xs font-semibold">{cls.label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handlePlay}
          className={`w-full max-w-xs py-3 sm:py-4 px-8 rounded-xl text-lg sm:text-xl font-bold tracking-wide transition-all duration-200 cursor-pointer ${"bg-dark-brown text-cream hover:bg-warm-gray active:scale-95"}`}
        >
          Play
        </button>

        {/* Duration Note */}
        <p className="text-warm-gray text-xs sm:text-sm">
          Quiz takes approximately 5–10 minutes
        </p>
      </div>
    </div>
  );
}
