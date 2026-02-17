/* eslint-disable react-hooks/purity */
"use client";

import { useGame } from "@/context/GameContext";
import questions from "@/data/selfAssessmentQuestions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

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

  // Randomize question order once on mount
  const shuffledQuestions = useMemo(() => shuffle(questions), []);

  // Randomize whether RO or AE appears on the left for each question
  const choiceFlips = useMemo(
    () => shuffledQuestions.map(() => Math.random() < 0.5),
    [shuffledQuestions],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  // Local answers: keyed by shuffled index
  const [answers, setAnswers] = useState<Record<number, "RO" | "AE">>({});
  const [animKey, setAnimKey] = useState(0);

  const current = shuffledQuestions[currentIndex];
  const isFlipped = choiceFlips[currentIndex];
  const selected = answers[currentIndex] ?? null;

  const leftChoice = isFlipped
    ? { type: "AE" as const, text: current.ae }
    : { type: "RO" as const, text: current.ro };
  const rightChoice = isFlipped
    ? { type: "RO" as const, text: current.ro }
    : { type: "AE" as const, text: current.ae };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === shuffledQuestions.length - 1;
  const hasAnswered = selected !== null;

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
    setAnimKey((prev) => prev + 1);
  }, []);

  const handleSelect = useCallback(
    (choice: "RO" | "AE") => {
      const isNewAnswer = answers[currentIndex] === undefined;

      setAnswers((prev) => ({ ...prev, [currentIndex]: choice }));

      // Auto-advance only when answering a new (unvisited) question
      if (isNewAnswer) {
        setTimeout(() => {
          if (!isLast) {
            goTo(currentIndex + 1);
          } else {
            // Last question — auto-submit and navigate
            const updatedAnswers = { ...answers, [currentIndex]: choice };
            const allAnswers = shuffledQuestions.map((q, i) => ({
              questionId: q.id,
              choice: updatedAnswers[i]!,
            }));
            setSelfAssessmentAnswers(allAnswers);
            router.push("/performance");
          }
        }, 400);
      }
    },
    [
      answers,
      currentIndex,
      isLast,
      goTo,
      shuffledQuestions,
      setSelfAssessmentAnswers,
      router,
    ],
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
      // Submit all answers to context and navigate
      const allAnswers = shuffledQuestions.map((q, i) => ({
        questionId: q.id,
        choice: answers[i]!,
      }));
      setSelfAssessmentAnswers(allAnswers);
      router.push("/performance");
    } else {
      goTo(currentIndex + 1);
    }
  }, [
    hasAnswered,
    isLast,
    currentIndex,
    shuffledQuestions,
    answers,
    setSelfAssessmentAnswers,
    router,
    goTo,
  ]);

  const animClass = "animate-crossfade";

  return (
    <div className="flex min-h-dvh flex-col px-6 py-10 sm:py-16">
      {/* Question area — keyed for re-animation */}
      <div
        key={animKey}
        className={`${animClass} flex flex-col items-center justify-center flex-1 gap-8 sm:gap-12 max-w-lg mx-auto w-full`}
      >
        {/* Progress */}
        <p className="text-dark-brown/40 text-sm font-semibold tracking-wide">
          {currentIndex + 1} / {shuffledQuestions.length}
        </p>

        {/* Question text */}
        <p className="text-dark-brown text-center text-lg sm:text-xl leading-relaxed font-medium">
          {current.question}
        </p>

        {/* Optional image */}
        {current.image && (
          <div className="w-full flex justify-center">
            <Image
              src={current.image}
              alt="Music notation"
              width={400}
              height={120}
              className="max-w-full h-auto"
            />
          </div>
        )}

        {/* Choices */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {/* Left choice */}
          <button
            onClick={() => handleSelect(leftChoice.type)}
            className={`rounded-lg px-4 py-5 sm:py-6 text-sm sm:text-base font-medium text-center leading-snug transition-[colors,opacity] duration-200 cursor-pointer ${
              selected === leftChoice.type
                ? "ring-2 ring-dark-brown ring-offset-2 ring-offset-peach"
                : selected
                  ? "opacity-40"
                  : "hover:brightness-95"
            } ${
              leftChoice.type === "RO"
                ? "bg-[#F5C77E] text-dark-brown"
                : "bg-[#E8A0BF]/40 text-dark-brown"
            }`}
          >
            {leftChoice.text}
          </button>

          {/* Right choice */}
          <button
            onClick={() => handleSelect(rightChoice.type)}
            className={`rounded-lg px-4 py-5 sm:py-6 text-sm sm:text-base font-medium text-center leading-snug transition-[colors,opacity] duration-200 cursor-pointer ${
              selected === rightChoice.type
                ? "ring-2 ring-dark-brown ring-offset-2 ring-offset-peach"
                : selected
                  ? "opacity-40"
                  : "hover:brightness-95"
            } ${
              rightChoice.type === "AE"
                ? "bg-[#E8A0BF]/40 text-dark-brown"
                : "bg-[#F5C77E] text-dark-brown"
            }`}
          >
            {rightChoice.text}
          </button>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center justify-between pt-6">
        {/* Back */}
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-dark-brown/60 hover:text-dark-brown transition-colors cursor-pointer px-3 py-2 -ml-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColorWarrior"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Forward / Finish */}
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
            {isLast && hasAnswered ? "Finish" : "Next"}
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
