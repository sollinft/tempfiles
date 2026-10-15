/* oxlint-disable react/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { SpringOptions } from "framer-motion";


interface CursorContextType {
  cursorPos: { x: number; y: number };
  cursorText: string;
  setCursorText: (text: string) => void;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorPos: { x: 0, y: 0 },
  cursorText: "",
  setCursorText: () => {},
  isHovered: false,
  setIsHovered: () => {},
});

export const useCursor = () => useContext(CursorContext);

export interface CursorProviderProps {
  children: React.ReactNode;
  global?: boolean;
}

export const CursorProvider: React.FC<CursorProviderProps> = ({ children }) => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <CursorContext.Provider
      value={{ cursorPos, cursorText, setCursorText, isHovered, setIsHovered }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const Cursor: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { cursorPos } = useCursor();

  return (
    <motion.div
      className={`fixed top-0 left-0 w-3 h-3 bg-[#D4B26F] rounded-full pointer-events-none z-[9999] mix-blend-difference ${className}`}
      animate={{
        x: cursorPos.x - 6,
        y: cursorPos.y - 6,
      }}
      transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
    />
  );
};

export interface CursorFollowProps {
  children?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  transition?: SpringOptions;
  className?: string;
}

export const CursorFollow: React.FC<CursorFollowProps> = ({
  children,
  side = "bottom",
  sideOffset = 15,
  align = "end",
  alignOffset = 5,
  transition = { stiffness: 500, damping: 50, bounce: 0 },
  className = "",
}) => {
  const { cursorPos, cursorText } = useCursor();
  const content = cursorText || children;

  if (!content) return null;

  let xOffset = alignOffset;
  let yOffset = sideOffset;

  if (align === "start") xOffset = -20 + alignOffset;
  if (align === "center") xOffset = alignOffset;
  if (side === "top") yOffset = -35 - sideOffset;
  if (side === "left") xOffset = -60 - alignOffset;


  return (
    <motion.div
      className={`fixed top-0 left-0 px-3 py-1 bg-[#161412] text-[#FAF6F0] text-[10px] font-mono uppercase tracking-[0.2em] rounded-full shadow-lg border border-[#D4B26F]/40 pointer-events-none z-[9998] backdrop-blur-md ${className}`}
      animate={{
        x: cursorPos.x + xOffset,
        y: cursorPos.y + yOffset,
      }}
      transition={transition}
    >
      {content}
    </motion.div>
  );
};
