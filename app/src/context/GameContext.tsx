"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type CharacterClass = "warrior" | "druid" | "mage" | "alchemist";

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
  characterClass: CharacterClass | null;
  consentGiven: boolean;
  selfAssessmentAnswers: SelfAssessmentAnswer[];
  performanceAnswers: PerformanceAnswer[];
}

interface GameContextType {
  state: GameState;
  setCharacterClass: (cls: CharacterClass) => void;
  setConsentGiven: (consent: boolean) => void;
  addSelfAssessmentAnswer: (answer: SelfAssessmentAnswer) => void;
  addPerformanceAnswer: (answer: PerformanceAnswer) => void;
  resetState: () => void;
}

const initialState: GameState = {
  characterClass: null,
  consentGiven: false,
  selfAssessmentAnswers: [],
  performanceAnswers: [],
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(initialState);

  const setCharacterClass = (cls: CharacterClass) => {
    setState((prev) => ({ ...prev, characterClass: cls }));
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
        setCharacterClass,
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
