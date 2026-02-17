"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";

type Gender = "male" | "female" | "non-binary" | "prefer-not-to-say";

const genderOptions: { id: Gender; label: string }[] = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "non-binary", label: "Non-binary" },
  { id: "prefer-not-to-say", label: "Prefer not to say" },
];

export default function GenderPage() {
  const [selected, setSelected] = useState<Gender | null>(null);
  const router = useRouter();
  const { setGender } = useGame();

  const handleSelect = (gender: Gender) => {
    setSelected(gender);
    setGender(gender);
    // Short delay so user sees the selection before navigating
    setTimeout(() => {
      router.push("/age");
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
            Gender
          </h1>
          <p className="mt-2 text-dark-brown/70 text-base sm:text-lg">
            Select Gender:
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {genderOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`py-4 sm:py-5 px-4 rounded-lg text-base sm:text-lg font-semibold text-center transition-all duration-200 cursor-pointer ${
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
