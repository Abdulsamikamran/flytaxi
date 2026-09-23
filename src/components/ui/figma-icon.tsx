import Image from "next/image";

import { cn } from "@/lib/utils";

type FigmaIconProps = {
  src: string;
  alt?: string;
  className?: string;
  size?: number;
};

export function FigmaIcon({
  src,
  alt = "",
  className,
  size = 24,
}: FigmaIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      unoptimized
    />
  );
}
