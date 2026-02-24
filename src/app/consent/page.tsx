"use client";

import { useGame } from "@/context/GameContext";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function ConsentPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { setConsentGiven } = useGame();

  const handleAgree = () => {
    setConsentGiven(true);
    router.push("/profile");
  };

  const handleDecline = () => {
    router.push("/");
  };

  return (
    <div className="animate-page flex min-h-dvh flex-col items-center justify-center px-6 py-12 sm:py-16">
      <div className="w-full max-w-md sm:max-w-xl flex flex-col items-center gap-8 sm:gap-10">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-dark-brown text-center">
          {t("consent.title")}
        </h1>

        {/* Consent Body */}
        <div className="w-full bg-cream/80 rounded-lg p-6 sm:p-10 text-dark-brown text-sm sm:text-base leading-relaxed space-y-5 max-h-[55dvh] overflow-y-auto">
          <p>{t("consent.intro")}</p>
          <p>
            <strong>Study Title:</strong> {t("consent.studyTitle")}
            <br />
            <strong>
              {t("consent.researcher").startsWith("Chanita")
                ? "Researcher: "
                : "ผู้วิจัย: "}
            </strong>
            {t("consent.researcher")}
          </p>
          <p className="whitespace-pre-line">{t("consent.reviewPrompt")}</p>

          <p>
            <strong>{t("consent.voluntaryTitle")}</strong>{" "}
            {t("consent.voluntaryBody")}
          </p>

          <p>
            <strong>{t("consent.dataTitle")}</strong> {t("consent.dataBody")}
          </p>

          {t("consent.contactBody") && (
            <p>
              <strong>{t("consent.contactTitle")}</strong>{" "}
              {t("consent.contactBody")}
            </p>
          )}

          <p className="text-dark-brown/50 text-xs sm:text-sm pt-2">
            {t("consent.agreement")}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 sm:gap-4">
          <button
            onClick={handleAgree}
            className="px-5 sm:px-8 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-semibold tracking-wide transition-colors duration-200 cursor-pointer bg-dark-brown text-peach hover:bg-dark-brown/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-brown"
          >
            {t("consent.agree")}
          </button>
          <button
            onClick={handleDecline}
            className="px-5 sm:px-8 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-semibold tracking-wide transition-colors duration-200 cursor-pointer bg-dark-brown text-peach hover:bg-dark-brown/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-brown"
          >
            {t("consent.decline")}
          </button>
        </div>
      </div>
    </div>
  );
}
