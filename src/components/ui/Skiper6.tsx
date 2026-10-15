import React from "react";
import { motion } from "framer-motion";

export interface Skiper6Member {
  name: string;
  role: string;
  bio: string;
  avatarSrc?: string;
  twitterUrl?: string;
  githubUrl?: string;
  discordUrl?: string;
  badge?: string;
}

export interface Skiper6Props {
  member: Skiper6Member;
}

export const Skiper6: React.FC<Skiper6Props> = ({ member }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="glass-cream-card rounded-3xl p-6 relative overflow-hidden group border border-[#E4D9C8]"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4B26F]/10 to-[#C4B5FD]/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

      {/* Avatar Container */}
      <div className="relative w-24 h-24 rounded-2xl bg-[#161412] mx-auto mb-5 overflow-hidden border border-[#D4B26F]/40 shadow-lg flex items-center justify-center">
        {member.avatarSrc ? (
          <img
            src={member.avatarSrc}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="text-2xl font-bold font-mono text-[#D4B26F]">
            {member.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* Role Badge */}
      {member.badge && (
        <div className="text-center mb-3">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] bg-[#D4B26F]/15 text-[#8A6A27] border border-[#D4B26F]/40">
            {member.badge}
          </span>
        </div>
      )}

      {/* Name & Role */}
      <div className="text-center mb-3">
        <h3 className="font-heading font-bold text-xl text-[#161412] group-hover:text-[#8A6A27] transition-colors">
          {member.name}
        </h3>
        <p className="text-xs font-mono text-[#6E675F] mt-0.5">{member.role}</p>
      </div>

      {/* Bio */}
      <p className="text-xs text-[#6E675F] text-center leading-relaxed mb-6 font-body">
        {member.bio}
      </p>

      {/* Social Links */}
      <div className="flex items-center justify-center gap-3 pt-4 border-t border-[#E4D9C8]/60">
        {member.twitterUrl && (
          <a
            href={member.twitterUrl}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-[#161412] text-[#FAF6F0] hover:bg-[#D4B26F] hover:text-[#161412] flex items-center justify-center text-xs transition-colors"
          >
            𝕏
          </a>
        )}
        {member.githubUrl && (
          <a
            href={member.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-[#161412] text-[#FAF6F0] hover:bg-[#D4B26F] hover:text-[#161412] flex items-center justify-center text-xs transition-colors"
          >
            GH
          </a>
        )}
        {member.discordUrl && (
          <a
            href={member.discordUrl}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-[#161412] text-[#FAF6F0] hover:bg-[#D4B26F] hover:text-[#161412] flex items-center justify-center text-xs transition-colors"
          >
            DC
          </a>
        )}
      </div>
    </motion.div>
  );
};
