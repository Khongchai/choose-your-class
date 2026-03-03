"use client";

import { useGame } from "@/context/GameContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type SkillLevel =
  | "novice"
  | "intermediate"
  | "advanced"
  | "professional"
  | "expert"
  | "master";

const skillKeys: { id: SkillLevel; key: string }[] = [
  { id: "novice", key: "skillLevel.novice" },
  { id: "intermediate", key: "skillLevel.intermediate" },
  { id: "advanced", key: "skillLevel.advanced" },
  { id: "professional", key: "skillLevel.professional" },
  { id: "expert", key: "skillLevel.expert" },
];

export default function SkillLevelPage() {
  const [selected, setSelected] = useState<SkillLevel | null>(null);
  const router = useRouter();
  const { setSkillLevel } = useGame();
  const { t } = useTranslation();

  const handleSelect = (level: SkillLevel) => {
    setSelected(level);
    setSkillLevel(level);
    setTimeout(() => {
      router.push("/assessment");
    }, 300);
  };

  return (
    <div className="animate-page flex min-h-dvh flex-col items-center justify-center px-6 py-12 sm:py-16">
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center gap-8 sm:gap-10">
        {/* Info text */}
        <p className="text-dark-brown/60 text-sm sm:text-base text-center leading-relaxed whitespace-pre">
          {t("shared.infoText")}
        </p>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-dark-brown">
            {t("skillLevel.title")}
          </h1>
          <p className="text-dark-brown/70 text-sm sm:text-base mt-1">
            {t("skillLevel.subtitle")}
          </p>
          <p className="mt-3 text-dark-brown/70 text-sm sm:text-base leading-relaxed">
            {t("skillLevel.label")}
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 w-full">
          {skillKeys.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`w-full py-4 sm:py-5 px-6 rounded-lg text-base sm:text-lg font-semibold text-center transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-brown ${
                selected === opt.id
                  ? "bg-dark-brown text-peach ring-2 ring-dark-brown/50 ring-offset-2 ring-offset-peach"
                  : "bg-cream/80 text-dark-brown hover:bg-cream"
              }`}
            >
              {t(opt.key)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
