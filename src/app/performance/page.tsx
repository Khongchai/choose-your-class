"use client";

import { useGame } from "@/context/GameContext";
import performanceQuestions, {
  type ChoiceQuestion,
} from "@/data/performanceQuestions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import RhythmTapView from "./RhythmTapView";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ─── Choice question sub-view ────────────────────────────────────────────────

function ChoiceView({
  question,
  isFlipped,
  onSelect,
  selected,
  hasPlayed,
  isPlaying,
  onPlayAudio,
  audioRef,
  onAudioEnded,
  timeLeft,
}: {
  question: ChoiceQuestion;
  isFlipped: boolean;
  onSelect: (value: string) => void;
  selected: string | null;
  hasPlayed: boolean;
  isPlaying: boolean;
  onPlayAudio: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  onAudioEnded: () => void;
  timeLeft: number;
}) {
  const leftChoice = isFlipped ? question.right : question.left;
  const rightChoice = isFlipped ? question.left : question.right;

  const timerSeconds = Math.ceil(timeLeft);
  const timerProgress = timeLeft / question.timeLimit;
  const timerUrgent = timeLeft <= 3 && timeLeft > 0;

  return (
    <>
      {/* Timer */}
      {hasPlayed && selected === null && (
        <div className="flex flex-col items-center gap-2 w-full max-w-xs">
          <span
            className={`text-2xl font-bold tabular-nums ${
              timerUrgent ? "text-red-700" : "text-dark-brown"
            }`}
          >
            {timerSeconds}s
          </span>
          <div className="w-full h-2 rounded-full bg-dark-brown/10 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-100 ${
                timerUrgent ? "bg-red-600" : "bg-dark-brown/40"
              }`}
              style={{ width: `${timerProgress * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Instruction */}
      <p className="text-dark-brown text-center text-lg sm:text-xl leading-relaxed font-medium">
        {question.instruction}
      </p>

      {/* Image (for visual questions) */}
      {question.image && (
        <div className="w-full flex justify-center">
          <Image
            src={question.image}
            alt="Music notation"
            width={400}
            height={120}
            className="max-w-full h-auto"
          />
        </div>
      )}

      {/* Play Audio button (for audio questions) */}
      {question.audio && (
        <>
          <button
            onClick={onPlayAudio}
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-dark-brown text-peach font-semibold text-base sm:text-lg transition-colors duration-200 cursor-pointer hover:bg-dark-brown/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-brown"
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {isPlaying ? "Pause" : "Play Audio"}
          </button>

          <audio
            ref={audioRef}
            src={question.audio}
            onEnded={onAudioEnded}
            preload="auto"
          />
        </>
      )}

      {/* Choices */}
      <div className="grid grid-cols-2 gap-4 w-full mt-4">
        <button
          onClick={() => onSelect(leftChoice.value)}
          disabled={!hasPlayed || selected !== null}
          className={`rounded-lg px-4 py-8 sm:py-10 text-3xl sm:text-4xl font-bold text-center leading-snug transition-[colors,opacity] duration-200 ${
            !hasPlayed
              ? "opacity-30 cursor-not-allowed"
              : selected === leftChoice.value
                ? "ring-2 ring-dark-brown ring-offset-2 ring-offset-peach cursor-default"
                : selected !== null
                  ? "opacity-40 cursor-default"
                  : "hover:brightness-95 cursor-pointer"
          } bg-[#F5C77E] text-dark-brown`}
        >
          <span className="flex flex-col items-center">{leftChoice.label}</span>
        </button>

        <button
          onClick={() => onSelect(rightChoice.value)}
          disabled={!hasPlayed || selected !== null}
          className={`rounded-lg px-4 py-8 sm:py-10 text-3xl sm:text-4xl font-bold text-center leading-snug transition-[colors,opacity] duration-200 ${
            !hasPlayed
              ? "opacity-30 cursor-not-allowed"
              : selected === rightChoice.value
                ? "ring-2 ring-dark-brown ring-offset-2 ring-offset-peach cursor-default"
                : selected !== null
                  ? "opacity-40 cursor-default"
                  : "hover:brightness-95 cursor-pointer"
          } bg-[#E8A0BF]/40 text-dark-brown`}
        >
          <span className="flex flex-col items-center">
            {rightChoice.label}
          </span>
        </button>
      </div>
    </>
  );
}

// ─── Main performance page ───────────────────────────────────────────────────

export default function PerformancePage() {
  const router = useRouter();
  const { setPerformanceAnswers } = useGame();

  const shuffledQuestions = useMemo(() => shuffle(performanceQuestions), []);

  const choiceFlips = useMemo(
    () => shuffledQuestions.map(() => Math.random() < 0.5),
    [shuffledQuestions],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<number, { value: string; timeTaken: number }>
  >({});
  const [animKey, setAnimKey] = useState(0);

  // Choice-question state
  const [timeLeft, setTimeLeft] = useState(
    shuffledQuestions[0]?.timeLimit ?? 10,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerStartRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = shuffledQuestions[currentIndex];
  const isFlipped = choiceFlips[currentIndex];
  const selected = answers[currentIndex]?.value ?? null;
  const isLast = currentIndex === shuffledQuestions.length - 1;

  // ── Timer helpers (choice questions only) ──────────────────────────────

  const startTimer = useCallback(() => {
    timerStartRef.current = Date.now();
    timerIntervalRef.current = setInterval(() => {
      const elapsed =
        (Date.now() - (timerStartRef.current ?? Date.now())) / 1000;
      const remaining = Math.max(0, current.timeLimit - elapsed);
      setTimeLeft(remaining);
      if (remaining <= 0) {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      }
    }, 100);
  }, [current.timeLimit]);

  const stopTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  // Handle timeout (choice questions)
  useEffect(() => {
    if (current.type !== "choice") return;
    if (timeLeft <= 0 && selected === null && hasPlayed) {
      stopTimer();
      setAnswers((prev) => ({
        ...prev,
        [currentIndex]: { value: "__timeout__", timeTaken: 0 },
      }));
      setTimeout(() => {
        if (!isLast) goToNext(currentIndex + 1);
      }, 600);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  // ── Navigation ─────────────────────────────────────────────────────────

  const goToNext = useCallback(
    (index: number) => {
      stopTimer();
      setCurrentIndex(index);
      setAnimKey((prev) => prev + 1);
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const next = shuffledQuestions[index];
      setTimeLeft(next?.timeLimit ?? 10);

      // Image-only choice questions: enable immediately and start timer
      if (next?.type === "choice" && next.image && !next.audio) {
        setHasPlayed(true);
        // Start timer in next tick so timeLeft is set
        setTimeout(() => {
          timerStartRef.current = Date.now();
          timerIntervalRef.current = setInterval(() => {
            const elapsed =
              (Date.now() - (timerStartRef.current ?? Date.now())) / 1000;
            const remaining = Math.max(0, (next.timeLimit ?? 10) - elapsed);
            setTimeLeft(remaining);
            if (remaining <= 0) {
              if (timerIntervalRef.current)
                clearInterval(timerIntervalRef.current);
            }
          }, 100);
        }, 0);
      } else {
        setHasPlayed(false);
      }
    },
    [stopTimer, shuffledQuestions],
  );

  // Auto-start timer if the first question is an image-only choice
  useEffect(() => {
    const first = shuffledQuestions[0];
    if (first?.type === "choice" && first.image && !first.audio) {
      setHasPlayed(true);
      startTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Choice question handlers ───────────────────────────────────────────

  const handlePlayAudio = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
      if (!hasPlayed) {
        setHasPlayed(true);
        startTimer();
      }
    }
  }, [isPlaying, hasPlayed, startTimer]);

  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleSelect = useCallback(
    (value: string) => {
      if (selected !== null) return;
      if (!hasPlayed) return;

      stopTimer();
      const timeTaken =
        timerStartRef.current !== null
          ? parseFloat(((Date.now() - timerStartRef.current) / 1000).toFixed(2))
          : 0;

      setAnswers((prev) => ({
        ...prev,
        [currentIndex]: { value, timeTaken },
      }));

      setTimeout(() => {
        if (!isLast) goToNext(currentIndex + 1);
      }, 600);
    },
    [selected, hasPlayed, stopTimer, currentIndex, isLast, goToNext],
  );

  // ── Rhythm-tap completion handler ──────────────────────────────────────

  const handleRhythmTapComplete = useCallback(
    (result: { tapCount: number; timeTaken: number }) => {
      setAnswers((prev) => ({
        ...prev,
        [currentIndex]: {
          value: String(result.tapCount),
          timeTaken: result.timeTaken,
        },
      }));

      setTimeout(() => {
        if (!isLast) goToNext(currentIndex + 1);
      }, 1200);
    },
    [currentIndex, isLast, goToNext],
  );

  // ── Finish ─────────────────────────────────────────────────────────────

  const handleFinish = useCallback(() => {
    const allAnswers = shuffledQuestions.map((q, i) => {
      const ans = answers[i];
      let isCorrect: boolean;

      if (q.type === "choice") {
        isCorrect = ans?.value === q.correctValue;
      } else {
        // rhythm-tap: visual beats count = AC (correct)
        isCorrect = parseInt(ans?.value ?? "0", 10) === q.visualBeats;
      }

      return {
        questionId: q.id,
        choice: (isCorrect ? "AC" : "CE") as "AC" | "CE",
        timeTaken: ans?.timeTaken ?? 0,
        score: (isCorrect ? 1 : 0) as 0 | 1,
      };
    });
    setPerformanceAnswers(allAnswers);
    router.push("/results");
  }, [shuffledQuestions, answers, setPerformanceAnswers, router]);

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-dvh flex-col px-6 py-10 sm:py-16">
      <div
        key={animKey}
        className="animate-crossfade flex flex-col items-center justify-center flex-1 gap-6 sm:gap-8 max-w-lg mx-auto w-full"
      >
        {/* Progress */}
        <p className="text-dark-brown/40 text-sm font-semibold tracking-wide">
          {currentIndex + 1} / {shuffledQuestions.length}
        </p>

        {/* Question-type router */}
        {current.type === "choice" ? (
          <ChoiceView
            question={current}
            isFlipped={isFlipped}
            onSelect={handleSelect}
            selected={selected}
            hasPlayed={hasPlayed}
            isPlaying={isPlaying}
            onPlayAudio={handlePlayAudio}
            audioRef={audioRef}
            onAudioEnded={handleAudioEnded}
            timeLeft={timeLeft}
          />
        ) : (
          <RhythmTapView
            question={current}
            onComplete={handleRhythmTapComplete}
          />
        )}

        {/* Timeout message (choice only) */}
        {current.type === "choice" &&
          answers[currentIndex]?.value === "__timeout__" && (
            <p className="text-red-700 text-sm font-medium">Time&apos;s up!</p>
          )}
      </div>

      {/* Finish button */}
      {isLast && selected !== null && (
        <div className="flex justify-center pt-6">
          <button
            onClick={handleFinish}
            className="px-16 sm:px-20 py-3.5 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold tracking-wide transition-colors duration-200 cursor-pointer bg-dark-brown text-peach hover:bg-dark-brown/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-brown"
          >
            Finish
          </button>
        </div>
      )}
    </div>
  );
}
