/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/purity */
"use client";

import { useGame } from "@/context/GameContext";
import questions from "@/data/selfAssessmentQuestions";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const HALFWAY_INDEX = 7; // Show interstitial after Y-axis (7 questions), before X-axis
const ALMOST_THERE_INDEX = 12; // Show interstitial after 12th question (5th X-axis)

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
  const { setSelfAssessmentAnswers } = useGame();
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
  const [interstitial, setInterstitial] = useState<"halfway" | "almostThere" | null>(null);

  const current = allQuestions[currentIndex];
  const isFlipped = choiceFlips.current[currentIndex];
  const selected = answers[currentIndex] ?? null;

  const leftChoice = isFlipped
    ? { value: current.rightValue, key: current.rightKey }
    : { value: current.leftValue, key: current.leftKey };
  const rightChoice = isFlipped
    ? { value: current.leftValue, key: current.leftKey }
    : { value: current.rightValue, key: current.rightKey };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === allQuestions.length - 1;
  const hasAnswered = selected !== null;

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
    setAnimKey((prev) => prev + 1);
  }, []);

  // Auto-dismiss interstitial after 2 seconds
  useEffect(() => {
    if (!interstitial) return;
    const targetIndex = interstitial === "halfway" ? HALFWAY_INDEX : ALMOST_THERE_INDEX;
    const timer = setTimeout(() => {
      setInterstitial(null);
      goTo(targetIndex);
    }, 2000);
    return () => clearTimeout(timer);
  }, [interstitial, goTo]);

  const submitAnswers = useCallback(
    (updatedAnswers: Record<number, string>) => {
      const allAnswers = allQuestions.map((q, i) => ({
        questionId: q.id,
        choice: updatedAnswers[i]!,
      }));
      setSelfAssessmentAnswers(allAnswers);
      router.push("/results");
    },
    [allQuestions, setSelfAssessmentAnswers, router],
  );

  const advanceTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex === HALFWAY_INDEX) {
        setInterstitial("halfway");
      } else if (nextIndex === ALMOST_THERE_INDEX) {
        setInterstitial("almostThere");
      } else {
        goTo(nextIndex);
      }
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

  const handleBack = useCallback(() => {
    if (isFirst) {
      router.push("/assessment");
    } else {
      goTo(currentIndex - 1);
    }
  }, [isFirst, currentIndex, goTo, router]);

  const handleForward = useCallback(() => {
    if (!hasAnswered) return;
    if (isLast) {
      submitAnswers(answers);
    } else {
      advanceTo(currentIndex + 1);
    }
  }, [hasAnswered, isLast, currentIndex, answers, submitAnswers, advanceTo]);

  // ─── Interstitial screens ─────────────────────────────────────────────
  if (interstitial) {
    return (
      <div className="animate-page flex min-h-dvh flex-col items-center justify-center px-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark-brown text-center leading-snug">
          {t(`quiz.${interstitial}`)}
        </h1>
      </div>
    );
  }

  // ─── Quiz question ────────────────────────────────────────────────────
  return (
    <div className="flex min-h-dvh flex-col px-6 py-10 sm:py-16">
      <div
        key={animKey}
        className="animate-crossfade flex flex-col items-center justify-center flex-1 gap-8 sm:gap-12 max-w-lg mx-auto w-full"
      >
        {/* Progress */}
        <p className="text-dark-brown/40 text-sm font-semibold tracking-wide">
          {currentIndex + 1} / {allQuestions.length}
        </p>

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

      {/* Navigation arrows */}
      <div className="flex items-center justify-between pt-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-dark-brown/60 hover:text-dark-brown transition-colors cursor-pointer px-3 py-2 -ml-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">{t("quiz.back")}</span>
        </button>

        <button
          onClick={handleForward}
          disabled={!hasAnswered}
          className={`flex items-center gap-1 transition-colors cursor-pointer px-3 py-2 -mr-3 ${
            hasAnswered
              ? "text-dark-brown/60 hover:text-dark-brown"
              : "text-dark-brown/20 cursor-not-allowed"
          }`}
        >
          <span className="text-sm font-medium">
            {isLast && hasAnswered ? t("quiz.finish") : t("quiz.next")}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
