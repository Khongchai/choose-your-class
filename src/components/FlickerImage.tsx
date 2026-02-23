"use client";

import Image from "next/image";
import { ComponentProps, useEffect, useState } from "react";

type FlickerImageProps = Omit<ComponentProps<typeof Image>, "src"> & {
  src: [string, string];
};

export function FlickerImage({ src, ...props }: FlickerImageProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === 0 ? 1 : 0));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return <Image {...props} src={src[index]} alt="" />;
}
