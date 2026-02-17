"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";

type SkillLevel =
  | "novice"
  | "intermediate"
  | "advanced"
  | "professional"
  | "expert"
  | "master";

const options: { id: SkillLevel; label: string }[] = [
  { id: "novice", label: "Novice (Grades 1–3)" },
  { id: "intermediate", label: "Intermediate (Grades 4–5)" },
  { id: "advanced", label: "Advanced (Grades 6–8)" },
  { id: "professional", label: "Professional (Entry)" },
  { id: "expert", label: "Expert" },
  { id: "master", label: "Master" },
];

export default function SkillLevelPage() {
  const [selected, setSelected] = useState<SkillLevel | null>(null);
  const router = useRouter();
  const { setSkillLevel } = useGame();

  const handleSelect = (level: SkillLevel) => {
    setSelected(level);
    setSkillLevel(level);
    setTimeout(() => {
      router.push("/assessment");
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
            Your Current Quest
          </h1>
          <p className="mt-3 text-dark-brown/70 text-sm sm:text-base leading-relaxed">
            &quot;What is the grade level of the repertoire you are currently
            practicing or performing?&quot;
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
