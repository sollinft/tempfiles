import { useRef, type PointerEvent, type PropsWithChildren } from "react";

type SpotlightCardProps = PropsWithChildren<{
  className?: string;
  spotlightColor?: string;
}>;

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 45, 56, 0.14)",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
    cardRef.current.style.setProperty("--spotlight-color", spotlightColor);
  }

  return (
    <div ref={cardRef} onPointerMove={handlePointerMove} className={`card-spotlight ${className}`}>
      {children}
    </div>
  );
}
