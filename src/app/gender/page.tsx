"use client";

import { useGame } from "@/context/GameContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Gender = "male" | "female" | "non-binary" | "prefer-not-to-say";

const genderKeys: { id: Gender; key: string }[] = [
  { id: "male", key: "gender.male" },
  { id: "female", key: "gender.female" },
  { id: "non-binary", key: "gender.nonBinary" },
  { id: "prefer-not-to-say", key: "gender.preferNotToSay" },
];

export default function GenderPage() {
  const [selected, setSelected] = useState<Gender | null>(null);
  const router = useRouter();
  const { setGender } = useGame();
  const { t } = useTranslation();

  const handleSelect = (gender: Gender) => {
    setSelected(gender);
    setGender(gender);
    setTimeout(() => {
      router.push("/age");
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
            {t("gender.title")}
          </h1>
          <p className="mt-2 text-dark-brown/70 text-base sm:text-lg">
            {t("gender.selectGender")}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {genderKeys.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`py-4 sm:py-5 px-4 rounded-lg text-base sm:text-lg font-semibold text-center transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-brown ${
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
