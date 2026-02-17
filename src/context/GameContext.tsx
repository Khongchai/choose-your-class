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

type Gender = "male" | "female" | "non-binary" | "prefer-not-to-say";
type MusicMajor =
  | "classical"
  | "jazz"
  | "thai-traditional"
  | "popular-contemporary"
  | "non-music";
type SkillLevel =
  | "novice"
  | "intermediate"
  | "advanced"
  | "professional"
  | "expert"
  | "master";

interface GameState {
  nickname: string;
  gender: Gender | null;
  age: number | null;
  instrument: string;
  musicMajor: MusicMajor | null;
  skillLevel: SkillLevel | null;
  consentGiven: boolean;
  selfAssessmentAnswers: SelfAssessmentAnswer[];
  performanceAnswers: PerformanceAnswer[];
}

interface GameContextType {
  state: GameState;
  setNickname: (name: string) => void;
  setGender: (gender: Gender) => void;
  setAge: (age: number) => void;
  setInstrument: (instrument: string) => void;
  setMusicMajor: (major: MusicMajor) => void;
  setSkillLevel: (level: SkillLevel) => void;
  setConsentGiven: (consent: boolean) => void;
  addSelfAssessmentAnswer: (answer: SelfAssessmentAnswer) => void;
  setSelfAssessmentAnswers: (answers: SelfAssessmentAnswer[]) => void;
  addPerformanceAnswer: (answer: PerformanceAnswer) => void;
  setPerformanceAnswers: (answers: PerformanceAnswer[]) => void;
  resetState: () => void;
}

const initialState: GameState = {
  nickname: "",
  gender: null,
  age: null,
  instrument: "",
  musicMajor: null,
  skillLevel: null,
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

  const setGender = (gender: Gender) => {
    setState((prev) => ({ ...prev, gender }));
  };

  const setAge = (age: number) => {
    setState((prev) => ({ ...prev, age }));
  };

  const setInstrument = (instrument: string) => {
    setState((prev) => ({ ...prev, instrument }));
  };

  const setMusicMajor = (major: MusicMajor) => {
    setState((prev) => ({ ...prev, musicMajor: major }));
  };

  const setSkillLevel = (level: SkillLevel) => {
    setState((prev) => ({ ...prev, skillLevel: level }));
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

  const setSelfAssessmentAnswers = (answers: SelfAssessmentAnswer[]) => {
    setState((prev) => ({ ...prev, selfAssessmentAnswers: answers }));
  };

  const addPerformanceAnswer = (answer: PerformanceAnswer) => {
    setState((prev) => ({
      ...prev,
      performanceAnswers: [...prev.performanceAnswers, answer],
    }));
  };

  const setPerformanceAnswers = (answers: PerformanceAnswer[]) => {
    setState((prev) => ({ ...prev, performanceAnswers: answers }));
  };

  const resetState = () => {
    setState(initialState);
  };

  return (
    <GameContext.Provider
      value={{
        state,
        setNickname,
        setGender,
        setAge,
        setInstrument,
        setMusicMajor,
        setSkillLevel,
        setConsentGiven,
        addSelfAssessmentAnswer,
        setSelfAssessmentAnswers,
        addPerformanceAnswer,
        setPerformanceAnswers,
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
