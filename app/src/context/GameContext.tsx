"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface SelfAssessmentAnswer {
  questionId: number;
  choice: "AE" | "RO";
}

interface PerformanceAnswer {
  questionId: number;
  choice: "CE" | "AC";
  timeTaken: number; // seconds, 0 = timeout
  score: 0 | 1;
}

interface GameState {
  nickname: string;
  consentGiven: boolean;
  selfAssessmentAnswers: SelfAssessmentAnswer[];
  performanceAnswers: PerformanceAnswer[];
}

interface GameContextType {
  state: GameState;
  setNickname: (name: string) => void;
  setConsentGiven: (consent: boolean) => void;
  addSelfAssessmentAnswer: (answer: SelfAssessmentAnswer) => void;
  addPerformanceAnswer: (answer: PerformanceAnswer) => void;
  resetState: () => void;
}

const initialState: GameState = {
  nickname: "",
  consentGiven: false,
  selfAssessmentAnswers: [],
  performanceAnswers: [],
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(initialState);

  const setNickname = (name: string) => {
    setState((prev) => ({ ...prev, nickname: name }));
  };

  const setConsentGiven = (consent: boolean) => {
    setState((prev) => ({ ...prev, consentGiven: consent }));
  };

  const addSelfAssessmentAnswer = (answer: SelfAssessmentAnswer) => {
    setState((prev) => ({
      ...prev,
      selfAssessmentAnswers: [...prev.selfAssessmentAnswers, answer],
    }));
  };

  const addPerformanceAnswer = (answer: PerformanceAnswer) => {
    setState((prev) => ({
      ...prev,
      performanceAnswers: [...prev.performanceAnswers, answer],
    }));
  };

  const resetState = () => {
    setState(initialState);
  };

  return (
    <GameContext.Provider
      value={{
        state,
        setNickname,
        setConsentGiven,
        addSelfAssessmentAnswer,
        addPerformanceAnswer,
        resetState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
