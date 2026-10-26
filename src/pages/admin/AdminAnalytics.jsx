import React from 'react';
import { BarChart3, Building } from 'lucide-react';
import { departmentStats } from '../../mock/mockAdmin.js';

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <span className="text-[11px] font-mono text-emerald-400 uppercase">
            Institutional Data
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-heading mt-0.5">
            Placement Readiness Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Department-level aggregate index calculated across semester records and verified project portfolios.
          </p>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="surface-card p-6 space-y-4">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Building className="w-4 h-4 text-emerald-400" />
          <span>Department Performance Benchmarks</span>
        </h2>

        <div className="space-y-4 pt-1">
          {departmentStats.map((dept, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-[#141824] border border-white/[0.06] space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">{dept.department}</h3>
                  <span className="text-[11px] text-slate-400">{dept.enrolled} Students Enrolled</span>
                </div>
                <div className="font-mono text-sm font-bold text-indigo-400">
                  {dept.avgPrs} <span className="text-slate-500 text-xs font-normal">/ 100</span>
                </div>
              </div>

              <div className="w-full bg-[#090b10] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${dept.avgPrs}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
