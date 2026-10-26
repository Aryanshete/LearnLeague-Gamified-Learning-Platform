import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function OpportunitiesPage() {
  const { opportunities, toggleApplyOpportunity, currentPRS } = useApp();
  const [filter, setFilter] = useState('All');

  const types = ['All', 'Internship', 'Hackathon', 'Research'];

  const filtered = opportunities.filter((o) => {
    if (filter === 'All') return true;
    return o.type === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <span className="text-[11px] font-mono text-indigo-400 uppercase">
            Career Gateway
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-heading mt-0.5">
            Technical Opportunities & Internships
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Roles and hackathons filtered by minimum Placement Readiness Score (Current PRS: <strong className="text-indigo-400 font-mono">{currentPRS}</strong>).
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                filter === t
                  ? 'bg-indigo-600 text-white'
                  : 'bg-[#141824] border border-white/[0.08] text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((opp) => {
          const eligible = currentPRS >= opp.minPrs;

          return (
            <div
              key={opp.id}
              className="surface-card p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-indigo-400">
                      {opp.type} • {opp.organization}
                    </span>
                    <h3 className="text-sm font-bold text-white font-heading mt-0.5">
                      {opp.title}
                    </h3>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border shrink-0 ${
                      eligible
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-slate-800 text-slate-400 border-white/[0.06]'
                    }`}
                  >
                    Min PRS: {opp.minPrs}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {opp.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                  <span>{opp.location}</span>
                  <span>•</span>
                  <span>{opp.duration}</span>
                  <span>•</span>
                  <span>Deadline: {opp.deadline}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => toggleApplyOpportunity(opp.id)}
                  className={`w-full py-1.5 rounded-md text-xs font-medium border transition-colors ${
                    opp.applied
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                      : 'btn-primary'
                  }`}
                >
                  {opp.applied ? 'Application Submitted ✓' : 'Submit Application'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
