"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useGame } from "@/context/GameContext";

export default function AgePage() {
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setAge: saveAge } = useGame();
  const { t } = useTranslation();

  const handleChange = (value: string) => {
    // Only allow digits, max 2 characters
    if (value && !/^\d+$/.test(value)) return;
    if (value.length > 2) return;
    setAge(value);
    if (error) setError("");
  };

  const handleSubmit = () => {
    const num = parseInt(age, 10);
    if (!age || isNaN(num)) {
      setError(t("age.errorEmpty"));
      return;
    }
    if (num < 1 || num > 99) {
      setError(t("age.errorInvalid"));
      return;
    }
    saveAge(num);
    router.push("/instrument");
  };

  return (
    <div className="animate-page flex min-h-dvh flex-col items-center justify-center px-6 py-12 sm:py-16">
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center gap-8 sm:gap-10">
        {/* Info text */}
        <p className="text-dark-brown/60 text-sm sm:text-base text-center leading-relaxed">
          {t("shared.infoText")}
        </p>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-dark-brown">
            {t("age.title")}
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-dark-brown">
            {t("age.subtitle")}
          </p>
        </div>

        {/* Input */}
        <div className="flex flex-col items-center gap-4 w-full max-w-48">
          <label className="text-dark-brown/70 text-base sm:text-lg">
            {t("age.enterAge")}
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={age}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="_ _"
            maxLength={2}
            className="w-full rounded-lg border-2 border-dark-brown/20 bg-white px-4 py-3 text-dark-brown text-center text-2xl tracking-widest placeholder:text-dark-brown/30 focus:border-dark-brown/50 focus:outline-none transition-colors"
          />
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>

        {/* Next button */}
        <button
          onClick={handleSubmit}
          className="px-16 sm:px-20 py-3.5 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold tracking-wide transition-colors duration-200 cursor-pointer bg-dark-brown text-peach hover:bg-dark-brown/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-brown"
        >
          {t("shared.next")}
        </button>
      </div>
    </div>
  );
}
