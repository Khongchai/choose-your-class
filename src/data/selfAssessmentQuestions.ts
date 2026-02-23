export type Axis = "Y" | "X";

export interface SelfAssessmentQuestion {
  id: number;
  axis: Axis;
  /** Translation key for the question text */
  questionKey: string;
  /** Optional image path (relative to /public) shown between question and choices */
  image?: string;
  /** Translation key for the left choice (CE for Y-axis, AE for X-axis) */
  leftKey: string;
  /** Translation key for the right choice (AC for Y-axis, RO for X-axis) */
  rightKey: string;
  /** Left choice value: "CE" for Y-axis, "AE" for X-axis */
  leftValue: string;
  /** Right choice value: "AC" for Y-axis, "RO" for X-axis */
  rightValue: string;
}

const questions: SelfAssessmentQuestion[] = [
  // ─── Y-axis: CE vs AC (questions 1–7) ────────────────────────────────
  {
    id: 1,
    axis: "Y",
    questionKey: "quiz.q1.question",
    leftKey: "quiz.q1.ce",
    rightKey: "quiz.q1.ac",
    leftValue: "CE",
    rightValue: "AC",
  },
  {
    id: 2,
    axis: "Y",
    questionKey: "quiz.q2.question",
    leftKey: "quiz.q2.ce",
    rightKey: "quiz.q2.ac",
    leftValue: "CE",
    rightValue: "AC",
  },
  {
    id: 3,
    axis: "Y",
    questionKey: "quiz.q3.question",
    leftKey: "quiz.q3.ce",
    rightKey: "quiz.q3.ac",
    leftValue: "CE",
    rightValue: "AC",
  },
  {
    id: 4,
    axis: "Y",
    questionKey: "quiz.q4.question",
    leftKey: "quiz.q4.ce",
    rightKey: "quiz.q4.ac",
    leftValue: "CE",
    rightValue: "AC",
  },
  {
    id: 5,
    axis: "Y",
    questionKey: "quiz.q5.question",
    leftKey: "quiz.q5.ce",
    rightKey: "quiz.q5.ac",
    leftValue: "CE",
    rightValue: "AC",
  },
  {
    id: 6,
    axis: "Y",
    questionKey: "quiz.q6.question",
    leftKey: "quiz.q6.ce",
    rightKey: "quiz.q6.ac",
    leftValue: "CE",
    rightValue: "AC",
  },
  {
    id: 7,
    axis: "Y",
    questionKey: "quiz.q7.question",
    leftKey: "quiz.q7.ce",
    rightKey: "quiz.q7.ac",
    leftValue: "CE",
    rightValue: "AC",
  },
  // ─── X-axis: AE vs RO (questions 8–14) ───────────────────────────────
  {
    id: 8,
    axis: "X",
    questionKey: "quiz.q8.question",
    leftKey: "quiz.q8.ae",
    rightKey: "quiz.q8.ro",
    leftValue: "AE",
    rightValue: "RO",
  },
  {
    id: 9,
    axis: "X",
    questionKey: "quiz.q9.question",
    leftKey: "quiz.q9.ae",
    rightKey: "quiz.q9.ro",
    leftValue: "AE",
    rightValue: "RO",
  },
  {
    id: 10,
    axis: "X",
    questionKey: "quiz.q10.question",
    leftKey: "quiz.q10.ae",
    rightKey: "quiz.q10.ro",
    leftValue: "AE",
    rightValue: "RO",
  },
  {
    id: 11,
    axis: "X",
    questionKey: "quiz.q11.question",
    leftKey: "quiz.q11.ae",
    rightKey: "quiz.q11.ro",
    leftValue: "AE",
    rightValue: "RO",
  },
  {
    id: 12,
    axis: "X",
    questionKey: "quiz.q12.question",
    leftKey: "quiz.q12.ae",
    rightKey: "quiz.q12.ro",
    leftValue: "AE",
    rightValue: "RO",
  },
  {
    id: 13,
    axis: "X",
    questionKey: "quiz.q13.question",
    leftKey: "quiz.q13.ae",
    rightKey: "quiz.q13.ro",
    leftValue: "AE",
    rightValue: "RO",
  },
  {
    id: 14,
    axis: "X",
    questionKey: "quiz.q14.question",
    leftKey: "quiz.q14.ae",
    rightKey: "quiz.q14.ro",
    leftValue: "AE",
    rightValue: "RO",
  },
];

export default questions;
