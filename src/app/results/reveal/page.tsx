/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useGame } from "@/context/GameContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

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

function drawChartOnCanvas(
  ctx: CanvasRenderingContext2D,
  stats: { ce: number; ac: number; ae: number; ro: number },
  showStats: boolean,
) {
  const RANGE = 7;
  const AXIS_LEN = 100;
  const TICK = 3;
  const unit = AXIS_LEN / RANGE;
  const COLOR = "#29191A";

  // Chart overlay position matching the CSS percentages + scale
  const containerX = 0.4611 * INTRINSIC_WIDTH;
  const containerY = 0.563 * INTRINSIC_HEIGHT;
  const containerW = 0.5074 * INTRINSIC_WIDTH;
  const containerH = 0.1778 * INTRINSIC_HEIGHT;
  const SCALE = 1.4;

  const centerX = containerX + containerW / 2;
  const centerY = containerY + containerH / 2;

  // SVG viewBox is 260×260, fit by min dimension (meet), then scaled
  const chartSide = Math.min(containerW, containerH) * SCALE;
  const s = chartSide / 260;

  const sx = (v: number) => centerX + v * s;
  const sy = (v: number) => centerY + v * s;

  // Radar polygon
  if (showStats) {
    const { ce, ac, ae, ro } = stats;
    ctx.beginPath();
    ctx.moveTo(sx(0), sy(-ce * unit));
    ctx.lineTo(sx(ro * unit), sy(0));
    ctx.lineTo(sx(0), sy(ac * unit));
    ctx.lineTo(sx(-ae * unit), sy(0));
    ctx.closePath();
    ctx.fillStyle = COLOR;
    ctx.globalAlpha = 0.3;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Axes
  ctx.strokeStyle = COLOR;
  ctx.lineWidth = 2 * s;
  ctx.beginPath();
  ctx.moveTo(sx(-AXIS_LEN), sy(0));
  ctx.lineTo(sx(AXIS_LEN), sy(0));
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(sx(0), sy(-AXIS_LEN));
  ctx.lineTo(sx(0), sy(AXIS_LEN));
  ctx.stroke();

  // Tick marks
  ctx.lineWidth = 1.5 * s;
  for (let i = -RANGE; i <= RANGE; i++) {
    if (i === 0) continue;
    const p = i * unit;
    ctx.beginPath();
    ctx.moveTo(sx(p), sy(-TICK));
    ctx.lineTo(sx(p), sy(TICK));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(sx(-TICK), sy(p));
    ctx.lineTo(sx(TICK), sy(p));
    ctx.stroke();
  }

  // Labels
  ctx.fillStyle = COLOR;
  ctx.font = `bold ${Math.round(14 * s)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("AE", sx(-AXIS_LEN - 15), sy(0));
  ctx.fillText("RO", sx(AXIS_LEN + 15), sy(0));
  ctx.textBaseline = "bottom";
  ctx.fillText("CE", sx(0), sy(-AXIS_LEN - 4));
  ctx.textBaseline = "top";
  ctx.fillText("AC", sx(0), sy(AXIS_LEN + 4));

  // Data dot
  if (showStats) {
    const { ce, ac, ae, ro } = stats;
    const dotX = (ro - ae) * unit;
    const dotY = -(ce - ac) * unit;
    ctx.beginPath();
    ctx.arc(sx(dotX), sy(dotY), 5 * s, 0, Math.PI * 2);
    ctx.fillStyle = COLOR;
    ctx.fill();
  }
}

export default function RevealPage() {
  const { state } = useGame();
  const { t } = useTranslation();

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

  const [compositeUrl, setCompositeUrl] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = INTRINSIC_WIDTH;
      canvas.height = INTRINSIC_HEIGHT;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, INTRINSIC_WIDTH, INTRINSIC_HEIGHT);
      drawChartOnCanvas(ctx, stats, isOwnResult);
      setCompositeUrl(canvas.toDataURL("image/png"));
    };
    img.src = imageSrc;
  }, [imageSrc, stats, isOwnResult]);

  const handleSave = useCallback(() => {
    if (!compositeUrl) return;
    const a = document.createElement("a");
    a.href = compositeUrl;
    a.download = `result-${viewedClass}.png`;
    a.click();
  }, [compositeUrl, viewedClass]);

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

      {/* Composited image with chart baked in */}
      <div className="w-full px-2 max-w-150">
        {compositeUrl && (
          <img
            src={compositeUrl}
            alt={`${CLASS_LABELS[viewedClass]} result`}
            className="w-full h-auto"
          />
        )}
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

      <a
        href="/"
        className="mb-6 flex items-center gap-2 bg-dark-brown text-peach rounded-lg px-8 py-3 text-sm sm:text-base font-medium hover:bg-dark-brown/85 transition-colors cursor-pointer"
      >
        {t("results.playAgain")}
      </a>
    </div>
  );
}
