/* eslint-disable @next/next/no-img-element */
"use client";

import { useGame } from "@/context/GameContext";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type CharacterClass = "warrior" | "druid" | "alchemist" | "mage";

const silhouettes: Record<CharacterClass, string> = {
  warrior: "/sillhouettes/warrior1.png",
  druid: "/sillhouettes/druid1.png",
  alchemist: "/sillhouettes/alchemist1.png",
  mage: "/sillhouettes/mage1.png",
};

function computeCharacterClass(
  answers: { questionId: number; choice: string }[],
): CharacterClass {
  const ceCount = answers.filter((a) => a.choice === "CE").length;
  const acCount = answers.filter((a) => a.choice === "AC").length;
  const aeCount = answers.filter((a) => a.choice === "AE").length;
  const roCount = answers.filter((a) => a.choice === "RO").length;

  const yWinner = ceCount >= acCount ? "CE" : "AC";
  const xWinner = aeCount >= roCount ? "AE" : "RO";

  if (yWinner === "CE" && xWinner === "AE") return "warrior";
  if (yWinner === "CE" && xWinner === "RO") return "druid";
  if (yWinner === "AC" && xWinner === "AE") return "alchemist";
  return "mage";
}

export default function ResultsPage() {
  const { state } = useGame();
  const router = useRouter();
  const { t } = useTranslation();

  const characterClass = useMemo(
    () => computeCharacterClass(state.selfAssessmentAnswers),
    [state.selfAssessmentAnswers],
  );

  return (
    <div className="animate-page flex min-h-dvh flex-col items-center justify-center px-6 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-dark-brown text-center leading-snug">
        {t("results.thankYou")}
      </h1>
      <p className="text-2xl sm:text-3xl font-bold text-dark-brown text-center leading-snug mt-2">
        {t("results.seeYou")}
      </p>

      <img
        src={silhouettes[characterClass]}
        alt="Character silhouette"
        className="h-56 sm:h-72 w-auto my-8 sm:my-12"
      />

      <button
        onClick={() => router.push("/results/reveal")}
        className="bg-cream/80 text-dark-brown rounded-lg px-10 py-4 text-base sm:text-lg font-medium hover:brightness-95 transition-colors cursor-pointer"
      >
        {t("results.viewResults")}
      </button>
    </div>
  );
}
