"use client";

import { useGame } from "@/context/GameContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Only Thai and English letters, spaces allowed
const NAME_REGEX = /^[a-zA-Zก-๙\s]+$/;

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setNickname } = useGame();

  const handleChange = (value: string) => {
    setName(value);
    if (error) setError("");
  };

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter a name");
      return;
    }
    if (!NAME_REGEX.test(trimmed)) {
      setError("Letters only (Thai or English) — no numbers or symbols");
      return;
    }
    setNickname(trimmed);
    router.push("/gender");
  };

  const handleCancel = () => {
    router.push("/consent");
  };

  return (
    <div className="animate-page flex min-h-dvh flex-col items-center justify-center px-6 py-12 sm:py-16">
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center gap-8 sm:gap-10">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-dark-brown">
            Create a Player Profile
          </h1>
          <p className="mt-3 text-dark-brown/60 text-sm sm:text-base">
            Feel free to use a nickname or alias — no real names required
          </p>
        </div>

        {/* Input Card */}
        <div className="w-full bg-cream/80 rounded-lg p-6 sm:p-10 flex flex-col items-center gap-6">
          <label className="text-dark-brown font-semibold text-lg sm:text-xl">
            Enter Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Enter your name"
            className="w-full rounded-lg border-2 border-dark-brown/20 bg-white px-4 py-3 text-dark-brown text-base placeholder:text-dark-brown/30 focus:border-dark-brown/50 focus:outline-none transition-colors"
          />
          {error && <p className="text-red-700 text-sm -mt-3">{error}</p>}

          {/* Buttons */}
          <div className="stagger flex gap-4 w-full">
            <button
              onClick={handleSubmit}
              className="animate-item flex-1 py-3.5 rounded-lg text-base font-semibold tracking-wide transition-all duration-200 cursor-pointer bg-dark-brown text-peach hover:opacity-90 hover:scale-105 active:scale-95"
            >
              Confirm
            </button>
            <button
              onClick={handleCancel}
              className="animate-item flex-1 py-3.5 rounded-lg text-base font-semibold tracking-wide transition-all duration-200 cursor-pointer bg-dark-brown text-peach hover:opacity-90 hover:scale-105 active:scale-95"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
