/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import type { RhythmTapQuestion } from "@/data/performanceQuestions";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Phase = "idle" | "countdown" | "playing" | "tapping" | "done";

interface Props {
  question: RhythmTapQuestion;
  onComplete: (result: { tapCount: number; timeTaken: number }) => void;
}

export default function RhythmTapView({ question, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [countdownNum, setCountdownNum] = useState(3);
  const [tapCount, setTapCount] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tapStartRef = useRef<number | null>(null);
  const inactivityRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completedRef = useRef(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityRef.current) clearTimeout(inactivityRef.current);
    };
  }, []);

  // Countdown logic
  useEffect(() => {
    if (phase !== "countdown") return;

    if (countdownNum <= 0) {
      // Countdown finished — play audio
      setPhase("playing");
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return;
    }

    const timer = setTimeout(() => {
      setCountdownNum((n) => n - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [phase, countdownNum]);

  const handleAudioEnded = useCallback(() => {
    setPhase("tapping");
    tapStartRef.current = Date.now();
  }, []);

  const finishTapping = useCallback(
    (count: number) => {
      if (completedRef.current) return;
      completedRef.current = true;
      if (inactivityRef.current) clearTimeout(inactivityRef.current);

      const timeTaken =
        tapStartRef.current !== null
          ? parseFloat(((Date.now() - tapStartRef.current) / 1000).toFixed(2))
          : 0;

      setPhase("done");
      onComplete({ tapCount: count, timeTaken });
    },
    [onComplete],
  );

  const handleTap = useCallback(() => {
    if (phase !== "tapping" || completedRef.current) return;

    const newCount = tapCount + 1;
    setTapCount(newCount);

    // Reset inactivity timer
    if (inactivityRef.current) clearTimeout(inactivityRef.current);

    // After enough taps, start a 2s inactivity window
    if (newCount >= question.audioBeats) {
      inactivityRef.current = setTimeout(() => {
        finishTapping(newCount);
      }, 2000);
    }
  }, [phase, tapCount, question.audioBeats, finishTapping]);

  const handlePlay = useCallback(() => {
    setPhase("countdown");
    setCountdownNum(3);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8 w-full flex-1 justify-center">
      {/* Instruction */}
      <p className="text-dark-brown text-center text-lg sm:text-xl leading-relaxed font-medium">
        {question.instruction}
      </p>

      {/* Rhythm notation image */}
      <div className="w-full flex justify-center">
        <Image
          src={question.image}
          alt="Rhythm notation"
          width={400}
          height={120}
          className="max-w-full h-auto"
        />
      </div>

      {/* Countdown overlay */}
      {phase === "countdown" && countdownNum > 0 && (
        <div className="text-6xl sm:text-8xl font-bold text-dark-brown tabular-nums">
          {countdownNum}
        </div>
      )}

      {/* Listening indicator */}
      {phase === "playing" && (
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-dark-brown/60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 01-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
              <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
            </svg>
            <span className="text-sm font-medium">Listening...</span>
          </div>
        </div>
      )}

      {/* Done message */}
      {phase === "done" && (
        <p className="text-dark-brown/60 text-sm font-medium">Done!</p>
      )}

      {/* Hidden audio */}
      <audio
        ref={audioRef}
        src={question.audio}
        onEnded={handleAudioEnded}
        preload="auto"
      />

      {/* Bottom button area */}
      <div className="mt-auto pt-8 w-full flex justify-center">
        {phase === "idle" && (
          <button
            onClick={handlePlay}
            className="w-full max-w-sm py-6 sm:py-8 rounded-xl text-2xl sm:text-3xl font-bold tracking-wide transition-colors duration-200 cursor-pointer bg-dark-brown text-peach hover:bg-dark-brown/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-brown"
          >
            Play
          </button>
        )}

        {phase === "tapping" && (
          <button
            onClick={handleTap}
            className="w-full max-w-sm py-6 sm:py-8 rounded-xl text-2xl sm:text-3xl font-bold tracking-wide transition-colors duration-200 cursor-pointer bg-[#F5C77E] text-dark-brown hover:bg-[#F5C77E]/80 active:bg-[#F5C77E]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-brown"
          >
            Press
          </button>
        )}

        {(phase === "countdown" || phase === "playing") && (
          <div className="w-full max-w-sm py-6 sm:py-8 rounded-xl text-2xl sm:text-3xl font-bold tracking-wide text-center bg-dark-brown/20 text-dark-brown/40">
            {phase === "countdown" ? "Get ready..." : "Listen..."}
          </div>
        )}
      </div>
    </div>
  );
}
