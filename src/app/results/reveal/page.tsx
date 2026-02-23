/* eslint-disable @next/next/no-img-element */
"use client";

import { useGame } from "@/context/GameContext";
import { toPng } from "html-to-image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

const INTRINSIC_WIDTH = 1080;
const INTRINSIC_HEIGHT = 1440;

type CharacterClass = "warrior" | "druid" | "alchemist" | "mage";

const resultImages: Record<CharacterClass, string> = {
  warrior: "/results/Warrior_ENG.png",
  druid: "/results/Divevrger_ENG.png",
  alchemist: "/results/Alchemist_ENG.png",
  mage: "/results/Mage_ENG.png",
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

  return [
    { label: "CE", value: ce },
    { label: "AE", value: ae },
    { label: "AC", value: ac },
    { label: "RO", value: ro },
  ];
}

export default function RevealPage() {
  const { state } = useGame();
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const characterClass = useMemo(
    () => computeCharacterClass(state.selfAssessmentAnswers),
    [state.selfAssessmentAnswers],
  );

  const chartData = useMemo(
    () => computeStats(state.selfAssessmentAnswers),
    [state.selfAssessmentAnswers],
  );

  const imageSrc = resultImages[characterClass];

  // Track rendered image width to compute scale factor
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const updateScale = () => {
      setScale(img.clientWidth / INTRINSIC_WIDTH);
    };

    if (img.complete) updateScale();
    img.addEventListener("load", updateScale);

    const ro = new ResizeObserver(updateScale);
    ro.observe(img);

    return () => {
      img.removeEventListener("load", updateScale);
      ro.disconnect();
    };
  }, []);

  const handleSave = useCallback(async () => {
    if (!wrapperRef.current) return;

    const dataUrl = await toPng(wrapperRef.current, {
      canvasWidth: INTRINSIC_WIDTH,
      canvasHeight: INTRINSIC_HEIGHT,
      pixelRatio: 1,
    });

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `result-${characterClass}.png`;
    a.click();
  }, [characterClass]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center">
      {/* Image + chart overlay wrapper */}
      <div ref={wrapperRef} className="relative w-full">
        <img
          ref={imgRef}
          src={imageSrc}
          alt="Your result"
          className="w-full h-auto"
        />

        {/* Radar chart overlay — positioned over "Character Stats" box */}
        <div
          className="absolute"
          style={{
            top: "53.06%",
            left: "48.11%",
            width: "50.74%",
            height: "17.78%",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="65%" data={chartData}>
              <PolarGrid stroke="#29191A" strokeOpacity={0.15} />
              <PolarAngleAxis
                dataKey="label"
                tick={{ fontSize: 20 * scale, fill: "#29191A" }}
              />
              <Radar
                dataKey="value"
                stroke="#29191A"
                fill="#29191A"
                fillOpacity={0.25}
                dot={{
                  r: 2 * scale,
                  fillOpacity: 1,
                  fill: "#29191A",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
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
