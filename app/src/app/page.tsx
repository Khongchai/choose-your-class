"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGame, CharacterClass } from "@/context/GameContext";

const classes: { id: CharacterClass; label: string; emoji: string }[] = [
  { id: "warrior", label: "Warrior", emoji: "⚔️" },
  { id: "druid", label: "Druid", emoji: "🌿" },
  { id: "mage", label: "Mage", emoji: "✨" },
  { id: "alchemist", label: "Alchemist", emoji: "⚗️" },
];

export default function ChooseClass() {
  const [selected, setSelected] = useState<CharacterClass | null>(null);
  const { setCharacterClass } = useGame();
  const router = useRouter();

  const handlePlay = () => {
    if (!selected) return;
    setCharacterClass(selected);
    router.push("/consent");
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md flex flex-col items-center gap-10">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-dark-brown">
            CHOOSE YOUR CLASS
          </h1>
          <p className="mt-4 text-warm-gray text-base leading-relaxed">
            Enter a musical quest to discover your favourite ways to learn
          </p>
        </div>

        {/* Class Selection */}
        <div className="grid grid-cols-4 gap-4 w-full">
          {classes.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelected(cls.id)}
              className={`flex flex-col items-center gap-2 rounded-xl p-4 transition-all duration-200 cursor-pointer ${
                selected === cls.id
                  ? "bg-dark-brown text-cream ring-2 ring-peach scale-105"
                  : "bg-peach/30 text-dark-brown hover:bg-peach/50"
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center text-2xl">
                {cls.emoji}
              </div>
              <span className="text-xs font-semibold">{cls.label}</span>
            </button>
          ))}
        </div>

        {/* Play Button */}
        <button
          onClick={handlePlay}
          disabled={!selected}
          className={`w-full max-w-xs py-4 px-8 rounded-xl text-xl font-bold tracking-wide transition-all duration-200 cursor-pointer ${
            selected
              ? "bg-dark-brown text-cream hover:bg-warm-gray active:scale-95"
              : "bg-warm-gray/30 text-warm-gray/50 cursor-not-allowed"
          }`}
        >
          Play
        </button>

        {/* Duration Note */}
        <p className="text-warm-gray text-sm">
          Quiz takes approximately 5–10 minutes
        </p>
      </div>
    </div>
  );
}
