import React from 'react';
import { Award, Flame, Code, GitCommit, MessageSquare } from 'lucide-react';

export default function BadgeCard({ badge }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'flame': return Flame;
      case 'code': return Code;
      case 'git-commit': return GitCommit;
      case 'message-square': return MessageSquare;
      default: return Award;
    }
  };

  const Icon = getIcon(badge.icon);

  return (
    <div className="p-3 rounded-xl bg-[#141824] border border-white/[0.07] flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-1">
          <h4 className="text-xs font-semibold text-white truncate">{badge.title}</h4>
          <span className="text-[10px] font-mono text-slate-400 uppercase">{badge.tier}</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{badge.description}</p>
      </div>
    </div>
  );
}
