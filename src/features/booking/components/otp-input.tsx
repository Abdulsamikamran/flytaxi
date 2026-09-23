"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
};

export function OtpInput({ value, onChange, length = 6 }: OtpInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const digits = value.padEnd(length, " ").slice(0, length).split("");

  const updateDigit = (index: number, digit: string) => {
    const next = digits.map((d, i) => (i === index ? digit : d.trim())).join("");
    onChange(next.replace(/\s/g, "").slice(0, length));
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3" dir="ltr">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[index]?.trim() ?? ""}
          onChange={(e) => {
            const digit = e.target.value.replace(/\D/g, "").slice(-1);
            updateDigit(index, digit);
            if (digit && index < length - 1) {
              inputsRef.current[index + 1]?.focus();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !digits[index]?.trim() && index > 0) {
              inputsRef.current[index - 1]?.focus();
            }
          }}
          className={cn(
            "h-12 w-10 rounded-[10px] border border-primary/30 bg-white text-center text-lg font-bold text-primary-2 outline-none transition sm:h-14 sm:w-12",
            "focus:border-primary focus:ring-2 focus:ring-primary/15",
          )}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
}
