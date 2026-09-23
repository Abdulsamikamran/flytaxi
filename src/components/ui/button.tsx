import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-lg font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-primary text-white hover:bg-[#1270d4] shadow-sm",
        variant === "outline" &&
          "border border-stroke bg-white text-primary-dark hover:bg-[#f1f5f9]",
        variant === "ghost" && "text-subtext hover:text-primary-dark",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2.5 text-sm",
        size === "lg" && "px-6 py-3.5 text-base",
        className,
      )}
      {...props}
    />
  );
}
