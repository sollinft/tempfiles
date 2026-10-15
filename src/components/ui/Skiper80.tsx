import React, { useState } from "react";
import { motion } from "framer-motion";
import { GlowingBadge } from "./GlowingBadge";
import { ScrambleText } from "./ScrambleText";

export interface Skiper80Props {
  title: string;
  creator: string;
  mintPrice: string;
  totalItems: number;
  mintedItems: number;
  imageSrc?: string;
  categoryTag?: string;
  safetyScore?: number;
  badgeVariant?: "default" | "success" | "warning" | "error" | "info";
  badgeText?: string;
  onMintClick?: () => void;
}

export const Skiper80: React.FC<Skiper80Props> = ({
  title,
  creator,
  mintPrice,
  totalItems,
  mintedItems,
  imageSrc,
  categoryTag = "METAPLEX CORE",
  safetyScore = 98,
  badgeVariant = "success",
  badgeText = "LIVE MINT",
  onMintClick,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -12;
    const rY = ((x - centerX) / centerX) * 12;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const progressPercent = Math.round((mintedItems / totalItems) * 100);

  return (
    <motion.div
      className="glass-cream-card rounded-3xl p-5 relative overflow-hidden group cursor-pointer transition-all duration-300"
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Holographic Foil Reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#D4B26F]/10 to-[#C4B5FD]/15 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl" />

      {/* Top Header Controls */}
      <div className="flex items-center justify-between mb-4">
        <GlowingBadge variant={badgeVariant}>{badgeText}</GlowingBadge>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#6E675F] bg-[#FAF6F0] px-2.5 py-1 rounded-full border border-[#E4D9C8]">
          🛡️ {safetyScore}/100 AUDIT
        </span>
      </div>

      {/* Artwork Showcase Box */}
      <div className="relative h-64 rounded-2xl bg-[#161412] overflow-hidden mb-4 border border-[#E4D9C8]/60 flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-[#D4B26F]/20 text-[#D4B26F] flex items-center justify-center mx-auto mb-3 text-2xl font-bold font-mono">
              SOL
            </div>
            <p className="text-xs font-mono text-[#D4B26F]">METAPLEX CORE ASSET</p>
          </div>
        )}
        <div className="absolute bottom-3 left-3 bg-[#161412]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-[#FAF6F0] border border-[#D4B26F]/40">
          {categoryTag}
        </div>
      </div>

      {/* Title & Creator */}
      <div className="mb-4">
        <h3 className="font-heading font-bold text-xl text-[#161412] group-hover:text-[#8A6A27] transition-colors">
          {title}
        </h3>
        <p className="text-xs font-mono text-[#6E675F] mt-1">by {creator}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs font-mono text-[#6E675F] mb-1.5">
          <span>MINT PROGRESS</span>
          <span className="font-bold text-[#161412]">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 bg-[#E4D9C8]/60 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#D4B26F] to-[#2D5A46]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-[11px] font-mono text-[#6E675F] mt-1">
          <span>{mintedItems} Minted</span>
          <span>{totalItems} Total</span>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="flex items-center justify-between pt-3 border-t border-[#E4D9C8]/60">
        <div>
          <span className="block text-[10px] font-mono uppercase text-[#6E675F]">MINT PRICE</span>
          <span className="font-mono-tech font-bold text-base text-[#161412]">
            <ScrambleText text={mintPrice} scrambleSpeed={30} />
          </span>
        </div>
        <button
          onClick={onMintClick}
          className="px-5 py-2.5 rounded-full bg-[#161412] text-[#FAF6F0] hover:bg-[#D4B26F] hover:text-[#161412] font-heading text-xs font-semibold tracking-wider transition-all duration-300 shadow-md"
        >
          QUICK MINT ⚡
        </button>
      </div>
    </motion.div>
  );
};
