import React, { useState } from 'react';
import { Award, Flame, Zap } from 'lucide-react';
import { mockLeaderboards } from '../mock/mockLeaderboard.js';
import { useApp } from '../context/AppContext.jsx';

export default function LeaderboardPage() {
  const [tab, setTab] = useState('college');
  const { studentUser } = useApp();

  const board = mockLeaderboards[tab] || mockLeaderboards.college;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <span className="text-[11px] font-mono text-indigo-400 uppercase">
            Performance Rankings
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-heading mt-0.5">
            Competitive Leaderboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ordered by cumulative points earned through milestone evaluations and completed coursework.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center p-1 rounded-lg bg-[#141824] border border-white/[0.08]">
          <button
            onClick={() => setTab('college')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              tab === 'college' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            College
          </button>
          <button
            onClick={() => setTab('branch')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              tab === 'branch' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Branch (AIDS)
          </button>
          <button
            onClick={() => setTab('global')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              tab === 'global' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Overall
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="surface-card overflow-hidden">
        <div className="p-3 border-b border-white/[0.06] text-[11px] font-mono text-slate-400 uppercase flex items-center justify-between">
          <span>Rank & Student</span>
          <span>Points</span>
        </div>

        <div className="divide-y divide-white/[0.05]">
          {board.map((row) => {
            const isUser = row.isCurrentUser;

            return (
              <div
                key={row.rank}
                className={`p-3.5 flex items-center justify-between text-xs transition-colors ${
                  isUser ? 'bg-indigo-950/30 border-l-2 border-indigo-500' : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 font-mono font-bold text-slate-400 text-center">
                    #{row.rank}
                  </span>
                  <div>
                    <span className="font-semibold text-white block">
                      {isUser ? studentUser.name : row.name} {isUser && <span className="text-[10px] text-indigo-400 font-normal">(You)</span>}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {isUser ? studentUser.department : row.department}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 font-mono">
                  <span className="text-slate-400 text-[11px]">{row.streak}d streak</span>
                  <span className="font-bold text-white text-sm">
                    {isUser ? studentUser.points : row.points} <span className="text-slate-500 text-[10px] font-normal">XP</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
