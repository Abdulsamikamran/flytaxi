import Image from "next/image";
import Link from "next/link";

import { figmaIcons } from "@/assets/figma-icons";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "header" | "footer";
};

export function Logo({ className, variant = "header" }: LogoProps) {
  const src =
    variant === "footer" ? figmaIcons.logoFooter : figmaIcons.logoHeader;

  return (
    <Link href="/" className={cn("inline-flex items-center", className)}>
      <Image
        src={src}
        alt="FLYTAXI"
        width={variant === "footer" ? 84 : 57}
        height={variant === "footer" ? 72 : 46}
        className="h-auto w-auto object-contain"
        unoptimized
      />
    </Link>
  );
}
