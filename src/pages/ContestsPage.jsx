import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Calendar,
  Clock,
  Award,
  CheckCircle2,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function ContestsPage() {
  const { contests, toggleRegisterContest } = useApp();
  const [filter, setFilter] = useState('all');
  const [selectedContest, setSelectedContest] = useState(null);

  const filtered = contests.filter((c) => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <span className="text-[11px] font-mono text-indigo-400 uppercase">
            Timed Competitions
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-heading mt-0.5">
            Coding Contests & Sprints
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Scheduled algorithmic evaluations with timed submissions and automated test case grading.
          </p>
        </div>

        <Link
          to="/leaderboard"
          className="btn-secondary text-xs flex items-center gap-1.5"
        >
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Leaderboard</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5">
        {['all', 'live', 'upcoming'].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
              filter === st
                ? 'bg-indigo-600 text-white'
                : 'bg-[#141824] border border-white/[0.08] text-slate-400 hover:text-white'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Contest Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((contest) => {
          const isLive = contest.status === 'live';

          return (
            <div
              key={contest.id}
              className="surface-card p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span
                    className={`font-mono uppercase font-semibold ${
                      isLive ? 'text-emerald-400' : 'text-slate-400'
                    }`}
                  >
                    ● {contest.status.toUpperCase()}
                  </span>
                  <span className="text-slate-400 font-mono">{contest.duration}</span>
                </div>

                <h3 className="text-base font-bold text-white font-heading">
                  {contest.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {contest.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                  <span>Schedule: <strong className="text-slate-300 font-normal">{contest.startTime}</strong></span>
                  <span>•</span>
                  <span>{contest.totalQuestions} Questions</span>
                  <span>•</span>
                  <span className="text-indigo-400">+{contest.xpReward} XP</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedContest(contest)}
                  className="flex-1 py-1.5 px-3 rounded-md bg-[#141824] border border-white/[0.08] text-slate-300 hover:text-white text-xs text-center"
                >
                  Rules & Details
                </button>

                <button
                  type="button"
                  onClick={() => toggleRegisterContest(contest.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                    contest.isRegistered
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                      : 'btn-primary text-xs'
                  }`}
                >
                  {contest.isRegistered ? 'Registered ✓' : 'Register'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rules Modal */}
      {selectedContest && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#11141d] border border-white/[0.1] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-sm font-bold text-white font-heading">
                {selectedContest.title} — Rules
              </h3>
              <button
                type="button"
                onClick={() => setSelectedContest(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p className="text-slate-400">{selectedContest.description}</p>
              <div className="pt-2">
                <span className="font-semibold text-white block mb-1">Competition Rules:</span>
                <ul className="space-y-1 text-slate-400">
                  {selectedContest.rules.map((r, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-indigo-400">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedContest(null)}
                className="btn-secondary text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
