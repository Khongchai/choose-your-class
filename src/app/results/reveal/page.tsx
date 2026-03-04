/* eslint-disable @next/next/no-img-element */
"use client";

import { useGame } from "@/context/GameContext";
import { toPng } from "html-to-image";
import { useCallback, useMemo, useRef, useState } from "react";

const INTRINSIC_WIDTH = 1080;
const INTRINSIC_HEIGHT = 1440;

type CharacterClass = "warrior" | "druid" | "alchemist" | "mage";

const resultImagesEng: Record<CharacterClass, string> = {
  warrior: "/results/Warrior_ENG.webp",
  druid: "/results/Druids_ENG.webp",
  alchemist: "/results/Alchemist_ENG.webp",
  mage: "/results/Mage_ENG.webp",
};

const resultImagesTh: Record<CharacterClass, string> = {
  warrior: "/results/Warrior_TH.webp",
  druid: "/results/Druids_TH.webp",
  alchemist: "/results/Alchemist_TH.webp",
  mage: "/results/Mage_TH.webp",
};

function computeCharacterClass(
  answers: { questionId: number; choice: string }[],
): CharacterClass {
  const ceCount = answers.filter((a) => a.choice === "CE").length;
  const acCount = answers.filter((a) => a.choice === "AC").length;
  const aeCount = answers.filter((a) => a.choice === "AE").length;
  const roCount = answers.filter((a) => a.choice === "RO").length;

  const yWinner = ceCount >= acCount ? "CE" : "AC";
  const xWinner = aeCount >= roCount ? "AE" : "RO";

  if (yWinner === "CE" && xWinner === "AE") return "warrior";
  if (yWinner === "CE" && xWinner === "RO") return "druid";
  if (yWinner === "AC" && xWinner === "AE") return "alchemist";
  return "mage";
}

function computeStats(answers: { questionId: number; choice: string }[]) {
  const ce = answers.filter((a) => a.choice === "CE").length;
  const ac = answers.filter((a) => a.choice === "AC").length;
  const ae = answers.filter((a) => a.choice === "AE").length;
  const ro = answers.filter((a) => a.choice === "RO").length;
  return { ce, ac, ae, ro };
}

const ALL_CLASSES: CharacterClass[] = ["warrior", "druid", "alchemist", "mage"];

const CLASS_LABELS: Record<CharacterClass, string> = {
  warrior: "Warrior",
  druid: "Druid",
  alchemist: "Alchemist",
  mage: "Mage",
};

function XYChart({
  ce,
  ac,
  ae,
  ro,
  showStats,
}: {
  ce: number;
  ac: number;
  ae: number;
  ro: number;
  showStats: boolean;
}) {
  const RANGE = 7;
  const AXIS_LEN = 100;
  const unit = AXIS_LEN / RANGE;
  const TICK = 3;

  // Dot: x = RO - AE, y = CE - AC (SVG y is inverted)
  const dotX = (ro - ae) * unit;
  const dotY = -(ce - ac) * unit;

  // Radar-style polygon vertices: CE=up, RO=right, AC=down, AE=left
  const poly = [
    `0,${-ce * unit}`,
    `${ro * unit},0`,
    `0,${ac * unit}`,
    `${-ae * unit},0`,
  ].join(" ");

  const ticks: React.ReactNode[] = [];
  for (let i = -RANGE; i <= RANGE; i++) {
    if (i === 0) continue;
    const p = i * unit;
    ticks.push(
      <line
        key={`xt${i}`}
        x1={p}
        y1={-TICK}
        x2={p}
        y2={TICK}
        stroke="#29191A"
        strokeWidth={1.5}
      />,
      <line
        key={`yt${i}`}
        x1={-TICK}
        y1={p}
        x2={TICK}
        y2={p}
        stroke="#29191A"
        strokeWidth={1.5}
      />,
    );
  }

  return (
    <svg
      viewBox="-130 -130 260 260"
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
    >
      {/* Radar polygon fill at 30% opacity */}
      {showStats && <polygon points={poly} fill="#29191A" fillOpacity={0.3} />}

      {/* Axes */}
      <line
        x1={-AXIS_LEN}
        y1={0}
        x2={AXIS_LEN}
        y2={0}
        stroke="#29191A"
        strokeWidth={2}
      />
      <line
        x1={0}
        y1={-AXIS_LEN}
        x2={0}
        y2={AXIS_LEN}
        stroke="#29191A"
        strokeWidth={2}
      />

      {/* Tick marks */}
      {ticks}

      <text
        x={-AXIS_LEN - 15}
        y={5}
        textAnchor="middle"
        fontSize={14}
        fontWeight={700}
        fill="#29191A"
      >
        AE
      </text>

      <text
        x={AXIS_LEN + 15}
        y={4}
        textAnchor="middle"
        fontSize={14}
        fontWeight={700}
        fill="#29191A"
      >
        RO
      </text>

      <text
        x={0}
        y={-AXIS_LEN - 4}
        textAnchor="middle"
        fontSize={14}
        fontWeight={700}
        fill="#29191A"
      >
        CE
      </text>

      <text
        x={0}
        y={AXIS_LEN + 14}
        textAnchor="middle"
        fontSize={14}
        fontWeight={700}
        fill="#29191A"
      >
        AC
      </text>

      {/* Data dot */}
      {showStats && <circle cx={dotX} cy={dotY} r={5} fill="#29191A" />}
    </svg>
  );
}

export default function RevealPage() {
  const { state } = useGame();
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const characterClass = useMemo(
    () => computeCharacterClass(state.selfAssessmentAnswers),
    [state.selfAssessmentAnswers],
  );

  const stats = useMemo(
    () => computeStats(state.selfAssessmentAnswers),
    [state.selfAssessmentAnswers],
  );

  const [viewedClass, setViewedClass] =
    useState<CharacterClass>(characterClass);
  const isOwnResult = viewedClass === characterClass;

  const resultImages =
    state.language === "th" ? resultImagesTh : resultImagesEng;
  const imageSrc = resultImages[viewedClass];

  const handleSave = useCallback(async () => {
    if (!wrapperRef.current) return;

    const dataUrl = await toPng(wrapperRef.current, {
      canvasWidth: INTRINSIC_WIDTH,
      canvasHeight: INTRINSIC_HEIGHT,
      pixelRatio: 1,
    });

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `result-${viewedClass}.png`;
    a.click();
  }, [viewedClass]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center">
      {/* Class navigation tabs */}
      <div className="flex gap-2 mb-3 px-2">
        {ALL_CLASSES.map((cls) => (
          <button
            key={cls}
            onClick={() => setViewedClass(cls)}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
              viewedClass === cls
                ? "bg-dark-brown text-cream"
                : "bg-cream/60 text-dark-brown hover:bg-cream/80"
            }`}
          >
            {CLASS_LABELS[cls]}
            {cls === characterClass && " *"}
          </button>
        ))}
      </div>

      {/* Image + chart overlay wrapper */}
      <div ref={wrapperRef} className="relative w-full px-2 max-w-150">
        <img
          ref={imgRef}
          src={imageSrc}
          alt={`${CLASS_LABELS[viewedClass]} result`}
          className="w-full h-auto"
        />

        {/* X-Y chart overlay — positioned over "Character Stats" box */}
        <div
          className="absolute"
          style={{
            top: "56.3%",
            left: "46.11%",
            width: "50.74%",
            height: "17.78%",
            scale: 1.4,
          }}
        >
          <XYChart
            ce={stats.ce}
            ac={stats.ac}
            ae={stats.ae}
            ro={stats.ro}
            showStats={isOwnResult}
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 mb-6 flex items-center gap-2 bg-cream/80 text-dark-brown rounded-lg px-8 py-3 text-sm sm:text-base font-medium hover:brightness-95 transition-colors cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
          <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
        </svg>
        Save
      </button>
    </div>
  );
}
