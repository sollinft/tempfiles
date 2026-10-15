import React from "react";

export interface GlowingBadgeProps {
  variant?: "default" | "success" | "warning" | "error" | "info";
  pulse?: boolean;
  dot?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const GlowingBadge: React.FC<GlowingBadgeProps> = ({
  variant = "default",
  pulse = true,
  dot = true,
  children,
  className = "",
}) => {
  // Bespoke Warm Muted Status Color Styles
  const variantStyles = {
    default: {
      bg: "bg-[#F3ECE2]",
      text: "text-[#161412]",
      border: "border-[#E4D9C8]",
      dotColor: "bg-[#D4B26F]",
      ringColor: "bg-[#D4B26F]/40",
    },
    success: {
      bg: "bg-[#2D5A46]/10",
      text: "text-[#2D5A46]",
      border: "border-[#2D5A46]/30",
      dotColor: "bg-[#2D5A46]",
      ringColor: "bg-[#2D5A46]/40",
    },
    warning: {
      bg: "bg-[#D4B26F]/15",
      text: "text-[#8A6A27]",
      border: "border-[#D4B26F]/40",
      dotColor: "bg-[#D4B26F]",
      ringColor: "bg-[#D4B26F]/50",
    },
    error: {
      bg: "bg-[#A84232]/10",
      text: "text-[#A84232]",
      border: "border-[#A84232]/30",
      dotColor: "bg-[#A84232]",
      ringColor: "bg-[#A84232]/40",
    },
    info: {
      bg: "bg-[#1E2338]/10",
      text: "text-[#1E2338]",
      border: "border-[#1E2338]/30",
      dotColor: "bg-[#1E2338]",
      ringColor: "bg-[#1E2338]/40",
    },
  };

  const style = variantStyles[variant] || variantStyles.default;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-[0.18em] border backdrop-blur-md transition-all ${style.bg} ${style.text} ${style.border} ${className}`}
    >
      {dot && (
        <span className="relative flex h-2 w-2 items-center justify-center">
          {pulse && (
            <span
              className={`absolute inline-flex h-full w-full rounded-full animate-pulse-ring ${style.ringColor}`}
            />
          )}
          <span className={`relative inline-flex h-2 w-2 rounded-full ${style.dotColor}`} />
        </span>
      )}
      <span>{children}</span>
    </div>
  );
};
