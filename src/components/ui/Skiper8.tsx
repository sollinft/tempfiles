import React from "react";
import { motion } from "framer-motion";

export interface Skiper8Props {
  onEnter: () => void;
  title?: string;
  subtitle?: string;
}

export const Skiper8: React.FC<Skiper8Props> = ({
  onEnter,
  title = "NEXT-GEN AI SOLANA LAUNCHPAD",
  subtitle = "Deploy Metaplex Core collections with 90% cheaper rent, dynamic bonding curves & autonomous floor protection.",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 max-w-4xl mx-auto text-center px-4 py-8"
    >
      {/* Kinetic Kinetic Shimmer Line */}
      <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4B26F] to-transparent mx-auto mb-6" />

      {/* Subtitle Banner */}
      <p className="text-xs font-mono text-[#D4B26F] tracking-widest uppercase mb-4">{title}</p>
      <p className="text-xs text-[#6E675F] max-w-md mx-auto mb-6 hidden">{subtitle}</p>

      {/* Main Action Callout */}

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onEnter}
        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#161412] text-[#FAF6F0] font-heading font-semibold text-lg shadow-[0_15px_35px_rgba(22,20,18,0.15)] border border-[#D4B26F]/60 overflow-hidden transition-all duration-300"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-[#D4B26F]/20 via-[#C4B5FD]/20 to-[#D4B26F]/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <span className="relative z-10 flex items-center gap-2 text-[#FAF6F0]">
          <span>🚀 LAUNCH APP</span>
          <span className="text-[#D4B26F] group-hover:translate-x-1 transition-transform">→</span>
        </span>
      </motion.button>
    </motion.div>
  );
};
