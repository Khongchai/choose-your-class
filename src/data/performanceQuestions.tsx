import { ReactNode } from "react";

interface BaseQuestion {
  id: number;
  instruction: string;
  timeLimit: number;
}

export interface ChoiceQuestion extends BaseQuestion {
  type: "choice";
  audio: string;
  left: { label: ReactNode; value: string };
  right: { label: ReactNode; value: string };
  correctValue: string;
}

export interface RhythmTapQuestion extends BaseQuestion {
  type: "rhythm-tap";
  /** Rhythm notation image (relative to /public) */
  image: string;
  /** Audio of a different rhythm */
  audio: string;
  /** Number of beats in the visual rhythm */
  visualBeats: number;
  /** Number of beats in the audio rhythm */
  audioBeats: number;
}

export type PerformanceQuestion = ChoiceQuestion | RhythmTapQuestion;

const performanceQuestions: PerformanceQuestion[] = [
  {
    id: 1,
    type: "choice",
    instruction: "Listen to the audio and identify the time signature.",
    audio: "/audio/q1-time-signature.mp3",
    left: {
      label: (
        <div>
          6<br />8
        </div>
      ),
      value: "68",
    },
    right: {
      label: (
        <div>
          3<br />4
        </div>
      ),
      value: "3 4",
    },
    correctValue: "3 4",
    timeLimit: 10,
  },
  {
    id: 2,
    type: "rhythm-tap",
    instruction:
      "Study the rhythm below, then press Play to listen. After listening, tap the rhythm you feel.",
    image: "/rhythm-notation-q2.svg",
    audio: "/audio/q2-rhythm.mp3",
    visualBeats: 8,
    audioBeats: 7,
    timeLimit: 30,
  },
];

export default performanceQuestions;
