"use client";

import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";

export default function ConsentPage() {
  const router = useRouter();
  const { setConsentGiven } = useGame();

  const handleAgree = () => {
    setConsentGiven(true);
    router.push("/assessment");
  };

  const handleDecline = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-12 sm:py-16">
      <div className="w-full max-w-md sm:max-w-xl flex flex-col items-center gap-8 sm:gap-10">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-dark-brown text-center">
          Informed Consent Statement
        </h1>

        {/* Consent Body */}
        <div className="w-full bg-cream/80 rounded-lg p-6 sm:p-10 text-dark-brown text-sm sm:text-base leading-relaxed space-y-5 max-h-[55dvh] overflow-y-auto">
          <p>
            This quiz is conducted as part of a doctoral course pilot project.
          </p>
          <p>
            <strong>Study Title:</strong> [Insert Title of Your Game/Quiz]
            <br />
            <strong>Researcher:</strong> Chanita Pongtanalert, PhD., Music
            Education, Division of Music Education, Department of Art, Music,
            and Dance Education, Faculty of Education, Chulalongkorn University
          </p>
          <p>
            Before we begin, please review how your information will be handled:
          </p>

          <p>
            <strong>Voluntary Participation &amp; Right to Withdraw:</strong>{" "}
            Your participation is entirely voluntary. You reserve the right to
            change your mind, withdraw your consent, and stop playing at any
            point during the quiz without any penalty.
          </p>

          <p>
            <strong>Data Confidentiality &amp; Retention:</strong> The
            researcher adheres to strict data protection protocols. All gameplay
            data collected will be used anonymously for academic research, kept
            strictly confidential, and securely destroyed upon the completion of
            this project. If the researcher wish to utilize this dataset for
            future studies, separate notification and additional consent will be
            sought.
          </p>

          <p>
            <strong>Contact Information:</strong> If you have any questions about
            this study or your data, please contact the researcher at [Your
            University Email Address].
          </p>

          <p className="text-dark-brown/50 text-xs sm:text-sm pt-2">
            By tapping &quot;I AGREE&quot;, you confirm that you have read the
            information above and voluntarily consent to participate.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 sm:gap-5">
          <button
            onClick={handleAgree}
            className="px-8 sm:px-12 py-3.5 sm:py-4 rounded-lg text-base sm:text-lg font-semibold tracking-wide transition-all duration-200 cursor-pointer bg-dark-brown text-peach hover:opacity-90 active:scale-95"
          >
            I AGREE - LET&apos;S PLAY
          </button>
          <button
            onClick={handleDecline}
            className="px-8 sm:px-12 py-3.5 sm:py-4 rounded-lg text-base sm:text-lg font-semibold tracking-wide transition-all duration-200 cursor-pointer bg-dark-brown text-peach hover:opacity-90 active:scale-95"
          >
            NO THANKS
          </button>
        </div>
      </div>
    </div>
  );
}
