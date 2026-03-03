"use client";

import { useEffect } from "react";
import { useWebHaptics } from "web-haptics/react";

export default function HapticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { trigger } = useWebHaptics();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("button")) {
        trigger("light");
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [trigger]);

  return <>{children}</>;
}
