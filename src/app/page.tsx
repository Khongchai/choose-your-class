"use client";

import { useGame } from "@/context/GameContext";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function SelectLanguage() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { setLanguage } = useGame();

  const handleSelect = (lang: "en" | "th") => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    router.push("/home");
  };

  return (
    <div className="animate-page flex min-h-dvh flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-2 mb-16 text-dark-brown">
        <h1 className="text-3xl sm:text-4xl font-bold">เลือกภาษา</h1>
        <h2 className="text-2xl sm:text-3xl font-bold">Select Language</h2>
      </div>

      <div className="flex items-start justify-center gap-20 sm:gap-32">
        <button
          onClick={() => handleSelect("th")}
          className="flex flex-col items-center gap-3 cursor-pointer transition-opacity hover:opacity-70 "
        >
          <span className=" text-2xl sm:text-3xl font-bold">🇹🇭 ไทย </span>
        </button>

        <button
          onClick={() => handleSelect("en")}
          className="flex flex-col items-center gap-3 cursor-pointer transition-opacity hover:opacity-70"
        >
          <span className=" text-2xl sm:text-3xl font-bold">🇬🇧 English</span>
        </button>
      </div>
    </div>
  );
}
