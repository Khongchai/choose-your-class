"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function AssessmentIntroPage() {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/assessment/quiz");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="animate-page flex min-h-dvh flex-col items-center justify-center px-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-dark-brown text-center leading-snug">
        {t("journey.title")}
      </h1>
    </div>
  );
}
