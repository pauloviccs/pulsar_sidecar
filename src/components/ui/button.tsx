import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "glass" | "ghost" | "icon";
};

export function Button({ className, variant = "glass", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
        variant === "primary" && "bg-primary px-5 py-2.5 text-primary-foreground shadow-coral hover:brightness-110",
        variant === "glass" && "glass-control px-4 py-2 text-foreground hover:bg-accent",
        variant === "ghost" && "px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground",
        variant === "icon" && "glass-control size-10 text-muted-foreground hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}