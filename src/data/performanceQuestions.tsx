import { ReactNode } from "react";

export interface PerformanceQuestion {
  id: number;
  /** Instruction text shown to the user */
  instruction: string;
  /** Path to the audio file (relative to /public) */
  audio: string;
  /** Left choice */
  left: { label: ReactNode; value: string };
  /** Right choice */
  right: { label: ReactNode; value: string };
  /** The correct answer value */
  correctValue: string;
  /** Time limit in seconds */
  timeLimit: number;
}

const performanceQuestions: PerformanceQuestion[] = [
  {
    id: 1,
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
];

export default performanceQuestions;
