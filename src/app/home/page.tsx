"use client";

import { FlickerImage } from "@/components/FlickerImage";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

type ImageTuple = [string, string];

const classes = [
  {
    id: "warrior",
    label: "Warrior",
    image: [
      "/sillhouettes/warrior1.webp",
      "/sillhouettes/warrior2.webp",
    ] as ImageTuple,
  },
  {
    id: "druid",
    label: "Druid",
    image: [
      "/sillhouettes/druid1.webp",
      "/sillhouettes/druid2.webp",
    ] as ImageTuple,
  },
  {
    id: "mage",
    label: "Mage",
    image: [
      "/sillhouettes/mage1.webp",
      "/sillhouettes/mage2.webp",
    ] as ImageTuple,
  },
  {
    id: "alchemist",
    label: "Alchemist",
    image: [
      "/sillhouettes/alchemist1.webp",
      "/sillhouettes/alchemist2.webp",
    ] as ImageTuple,
  },
];

const chooseYourClassText = [
  "/sillhouettes/cyc_1.webp",
  "/sillhouettes/cyc_2.webp",
] as ImageTuple;

export default function ChooseClass() {
  const router = useRouter();
  const { t } = useTranslation();

  const handlePlay = () => {
    router.push("/consent");
  };

  return (
    <div className="animate-page flex min-h-dvh flex-col items-center justify-between px-6 py-16 sm:py-24">
      {/* Top section */}
      <div className="flex flex-col items-center gap-4">
        <FlickerImage
          src={chooseYourClassText}
          alt="Choose Your Class"
          className="pointer-events-none select-none w-70 sm:w-90"
          width={320}
          height={160}
          priority
        />
      </div>

      {/* Class icons */}
      <div className="flex items-center justify-center gap-3 sm:gap-20 my-12 sm:my-16">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="w-16 h-24 sm:w-20 sm:h-28 scale-110 sm:scale-200"
          >
            <FlickerImage
              src={cls.image}
              alt={cls.label}
              width={256}
              height={363}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Bottom section */}
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={handlePlay}
          className="px-16 sm:px-20 py-3.5 text-white sm:py-4 rounded-lg text-lg sm:text-xl font-semibold tracking-wide transition-colors duration-200 cursor-pointer bg-dark-brown  hover:bg-dark-brown/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-brown"
        >
          {t("home.play")}
        </button>
        <p className="text-dark-brown/50 text-xs sm:text-sm">
          {t("home.duration")}
        </p>
      </div>
    </div>
  );
}
