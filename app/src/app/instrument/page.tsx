"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";

const LETTERS_REGEX = /^[a-zA-Zก-๙\s]+$/;

export default function InstrumentPage() {
  const [instrument, setInstrument] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setInstrument: saveInstrument } = useGame();

  const handleChange = (value: string) => {
    setInstrument(value);
    if (error) setError("");
  };

  const handleSubmit = () => {
    const trimmed = instrument.trim();
    if (!trimmed) {
      setError("Please enter your instrument");
      return;
    }
    if (!LETTERS_REGEX.test(trimmed)) {
      setError("Letters only (Thai or English)");
      return;
    }
    saveInstrument(trimmed);
    router.push("/guild");
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-12 sm:py-16">
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center gap-8 sm:gap-10">
        {/* Info text */}
        <p className="text-dark-brown/60 text-sm sm:text-base text-center leading-relaxed">
          To balance the game and help our research, please provide your real
          information below. This information remains completely anonymous.
        </p>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-dark-brown">
            Equipped Gear
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-dark-brown">
            (Your Major Instrument)
          </p>
        </div>

        {/* Input */}
        <div className="flex flex-col items-center gap-4 w-full">
          <label className="text-dark-brown/70 text-base sm:text-lg">
            Choose your ONE primary instrument:
          </label>
          <input
            type="text"
            value={instrument}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Type your main instrument here..."
            className="w-full rounded-lg border-2 border-dark-brown/20 bg-white px-4 py-3 text-dark-brown text-base placeholder:text-dark-brown/30 focus:border-dark-brown/50 focus:outline-none transition-colors"
          />
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>

        {/* Next button */}
        <button
          onClick={handleSubmit}
          className="px-16 sm:px-20 py-3.5 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold tracking-wide transition-all duration-200 cursor-pointer bg-dark-brown text-peach hover:opacity-90 active:scale-95"
        >
          Next
        </button>
      </div>
    </div>
  );
}
