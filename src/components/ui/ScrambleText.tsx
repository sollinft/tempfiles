import React, { useCallback, useEffect, useImperativeHandle, useState } from "react";

export interface ScrambleTextHandle {
  start: () => void;
  reset: () => void;
}

export interface ScrambleTextProps {
  text: string;
  scrambleSpeed?: number;
  scrambledLetterCount?: number;
  characters?: string;
  className?: string;
  scrambledClassName?: string;
  autoStart?: boolean;
  delay?: number;
  onStart?: () => void;
  onComplete?: () => void;
}

export const ScrambleText = React.forwardRef<ScrambleTextHandle, ScrambleTextProps>(
  (
    {
      text,
      scrambleSpeed = 40,
      scrambledLetterCount = 2,
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?",
      className = "",
      scrambledClassName = "text-[#C4B5FD]",
      autoStart = true,
      delay = 0,
      onStart,
      onComplete,
    },
    ref
  ) => {
    const [revealedLength, setRevealedLength] = useState(0);
    const [scrambledChars, setScrambledChars] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);

    const startAnimation = useCallback(() => {
      onStart?.();
      setRevealedLength(0);
      setIsAnimating(true);
    }, [onStart]);

    const resetAnimation = useCallback(() => {
      setIsAnimating(false);
      setRevealedLength(0);
      setScrambledChars("");
    }, []);

    useImperativeHandle(ref, () => ({
      start: startAnimation,
      reset: resetAnimation,
    }), [startAnimation, resetAnimation]);

    useEffect(() => {
      if (autoStart) {
        const timer = setTimeout(() => {
          startAnimation();
        }, delay);
        return () => clearTimeout(timer);
      }
    }, [text, autoStart, delay, startAnimation]);

    useEffect(() => {
      if (!isAnimating) return;

      const interval = setInterval(() => {
        setRevealedLength((prev) => {
          if (prev >= text.length) {
            setIsAnimating(false);
            clearInterval(interval);
            onComplete?.();
            return text.length;
          }
          return prev + 1;
        });

        let randomStr = "";
        for (let i = 0; i < Math.min(scrambledLetterCount, text.length - revealedLength); i++) {
          randomStr += characters[Math.floor(Math.random() * characters.length)];
        }
        setScrambledChars(randomStr);
      }, scrambleSpeed);

      return () => clearInterval(interval);
    }, [isAnimating, revealedLength, text, scrambleSpeed, characters, scrambledLetterCount, onComplete]);

    return (
      <span className="inline-block font-mono">
        <span className={className}>{text.slice(0, revealedLength)}</span>
        <span className={scrambledClassName}>{scrambledChars}</span>
      </span>
    );
  }
);

ScrambleText.displayName = "ScrambleText";
