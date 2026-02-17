"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";

type MusicMajor =
  | "classical"
  | "jazz"
  | "thai-traditional"
  | "popular-contemporary"
  | "non-music";

const options: { id: MusicMajor; label: string }[] = [
  { id: "classical", label: "Classical" },
  { id: "jazz", label: "Jazz" },
  { id: "thai-traditional", label: "Thai / Traditional Music" },
  { id: "popular-contemporary", label: "Popular / Contemporary" },
  { id: "non-music", label: "(Non-Music Major)" },
];

export default function GuildPage() {
  const [selected, setSelected] = useState<MusicMajor | null>(null);
  const router = useRouter();
  const { setMusicMajor } = useGame();

  const handleSelect = (major: MusicMajor) => {
    setSelected(major);
    setMusicMajor(major);
    setTimeout(() => {
      router.push("/skill-level");
    }, 300);
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-12 sm:py-16">
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center gap-8 sm:gap-10">
        {/* Info text */}
        <p className="text-dark-brown/60 text-sm sm:text-base text-center leading-relaxed">
          To balance the game and help our research, please provide your real
          information below. This information remains completely anonymous.
        </p>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-dark-brown">
            Choose Your Guild
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-dark-brown">
            (Music Major)
          </p>
          <p className="mt-3 text-dark-brown/70 text-base sm:text-lg">
            Which Guild do you belong to?
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 w-full">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`w-full py-4 sm:py-5 px-6 rounded-lg text-base sm:text-lg font-semibold text-center transition-all duration-200 cursor-pointer ${
                selected === opt.id
                  ? "bg-dark-brown text-peach scale-95"
                  : "bg-cream/80 text-dark-brown hover:bg-cream active:scale-95"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
