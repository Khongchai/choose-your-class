/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/purity */
"use client";

import { useGame } from "@/context/GameContext";
import questions from "@/data/selfAssessmentQuestions";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function SelfAssessmentQuizPage() {
  const router = useRouter();
  const { state, setSelfAssessmentAnswers } = useGame();
  const { t } = useTranslation();

  // Split into Y-axis and X-axis groups, shuffle within each group
  const allQuestions = useMemo(() => {
    const yGroup = questions.filter((q) => q.axis === "Y");
    const xGroup = questions.filter((q) => q.axis === "X");
    return [...shuffle(yGroup), ...shuffle(xGroup)];
  }, []);

  // Randomize whether left/right choices are flipped for each question (stable ref)
  const choiceFlips = useRef(allQuestions.map(() => Math.random() < 0.5));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [animKey, setAnimKey] = useState(0);

  const current = allQuestions[currentIndex];
  const isFlipped = choiceFlips.current[currentIndex];
  const selected = answers[currentIndex] ?? null;

  const leftChoice = isFlipped
    ? { value: current.rightValue, key: current.rightKey }
    : { value: current.leftValue, key: current.leftKey };
  const rightChoice = isFlipped
    ? { value: current.leftValue, key: current.leftKey }
    : { value: current.rightValue, key: current.rightKey };

  const isLast = currentIndex === allQuestions.length - 1;

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
    setAnimKey((prev) => prev + 1);
  }, []);

  const submitAnswers = useCallback(
    (updatedAnswers: Record<number, string>) => {
      const allAnswers = allQuestions.map((q, i) => ({
        questionId: q.id,
        choice: updatedAnswers[i]!,
      }));
      setSelfAssessmentAnswers(allAnswers);

      // Compute character class
      const ce = allAnswers.filter((a) => a.choice === "CE").length;
      const ac = allAnswers.filter((a) => a.choice === "AC").length;
      const ae = allAnswers.filter((a) => a.choice === "AE").length;
      const ro = allAnswers.filter((a) => a.choice === "RO").length;
      const yWinner = ce >= ac ? "CE" : "AC";
      const xWinner = ae >= ro ? "AE" : "RO";
      const characterClass =
        yWinner === "CE" && xWinner === "AE"
          ? "warrior"
          : yWinner === "CE" && xWinner === "RO"
            ? "druid"
            : yWinner === "AC" && xWinner === "AE"
              ? "alchemist"
              : "mage";

      // Persist to MongoDB (fire-and-forget)
      fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...state,
          selfAssessmentAnswers: allAnswers,
          characterClass,
        }),
      }).catch(() => {});

      router.push("/results");
    },
    [allQuestions, setSelfAssessmentAnswers, state, router],
  );

  const advanceTo = useCallback(
    (nextIndex: number) => {
      goTo(nextIndex);
    },
    [goTo],
  );

  const handleSelect = useCallback(
    (choice: string) => {
      const isNewAnswer = answers[currentIndex] === undefined;

      setAnswers((prev) => ({ ...prev, [currentIndex]: choice }));

      if (isNewAnswer) {
        setTimeout(() => {
          if (!isLast) {
            advanceTo(currentIndex + 1);
          } else {
            submitAnswers({ ...answers, [currentIndex]: choice });
          }
        }, 400);
      }
    },
    [answers, currentIndex, isLast, advanceTo, submitAnswers],
  );

  // ─── Quiz question ────────────────────────────────────────────────────
  return (
    <div className="flex min-h-dvh flex-col px-6 py-10 sm:py-16">
      <div
        key={animKey}
        className="animate-crossfade flex flex-col items-center justify-center flex-1 gap-8 sm:gap-12 max-w-lg mx-auto w-full"
      >
        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full bg-dark-brown/10">
          <div
            className="h-full rounded-full bg-dark-brown/40 transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / allQuestions.length) * 100}%`,
            }}
          />
        </div>

        {/* Question text */}
        <p className="text-dark-brown text-center text-lg sm:text-xl leading-relaxed font-medium">
          {t(current.questionKey)}
        </p>

        {/* Optional image */}
        {current.image && (
          <div className="w-full flex justify-center">
            <img
              src={current.image}
              alt="Music notation"
              className="max-w-full h-auto"
            />
          </div>
        )}

        {/* Choices */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <button
            onClick={() => handleSelect(leftChoice.value)}
            className={`rounded-lg px-4 py-5 sm:py-6 text-sm sm:text-base font-medium text-center leading-snug transition-[colors,opacity] duration-200 cursor-pointer ${
              selected === leftChoice.value
                ? "ring-2 ring-dark-brown ring-offset-2 ring-offset-peach"
                : selected
                  ? "opacity-40"
                  : "hover:brightness-95"
            } bg-cream/80 text-dark-brown`}
          >
            {t(leftChoice.key)}
          </button>

          <button
            onClick={() => handleSelect(rightChoice.value)}
            className={`rounded-lg px-4 py-5 sm:py-6 text-sm sm:text-base font-medium text-center leading-snug transition-[colors,opacity] duration-200 cursor-pointer ${
              selected === rightChoice.value
                ? "ring-2 ring-dark-brown ring-offset-2 ring-offset-peach"
                : selected
                  ? "opacity-40"
                  : "hover:brightness-95"
            } bg-cream/80 text-dark-brown`}
          >
            {t(rightChoice.key)}
          </button>
        </div>
      </div>
    </div>
  );
}
