export interface SelfAssessmentQuestion {
  id: number;
  question: string;
  /** Optional image path (relative to /public) shown between question and choices */
  image?: string;
  ro: string;
  ae: string;
}

const questions: SelfAssessmentQuestion[] = [
  {
    id: 1,
    question:
      'When you hear "C Major Triad," what\'s the first thing you see in your mind?',
    ro: "The blueprint: A Root, Major 3rd, and minor 3rd stacked up.",
    ae: "My fingers: I can feel myself playing it on my instrument.",
  },
  {
    id: 2,
    question: "During a rhythm dictation, what is your plan?",
    ro: "I listen to the whole phrase first to see the overall structure.",
    ae: "I start jotting down rhythms immediately as I hear them.",
  },
  {
    id: 3,
    question:
      "You're handed a brand new piece for sight-reading. What do you do?",
    ro: "I scan the whole page silently, trying to sing the notes in my head.",
    ae: "I start humming or tapping the rhythm out loud right away.",
  },
  {
    id: 4,
    question: "When you look at a scale on paper, what do you notice first?",
    ro: "The theoretical stuff: whole steps, half steps, and accidentals, etc.",
    ae: "The vibe: Try to hum and think about how I am going to play it.",
  },
  {
    id: 5,
    question:
      "Oops! You just clapped a rhythm wrong. What's your next move?",
    ro: "Stop and analyze where the mistake happened before trying again.",
    ae: "Not a big deal — I just dive back in and try it again immediately.",
  },
  {
    id: 6,
    question: "You see this note grouping. What's your plan?",
    image: "/note-grouping.png",
    ro: "I am trying to subdivide the beats to find the strong and weak pulses.",
    ae: "I tap my foot and play it to find the groove.",
  },
  {
    id: 7,
    question:
      "Which of these sounds most like you in music theory class?",
    ro: '"Wait, why does that work? Let me look at that again..."',
    ae: '"What happens if I try to play this and use it?"',
  },
];

export default questions;
