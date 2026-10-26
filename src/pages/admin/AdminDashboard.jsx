import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  FileCheck,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

export default function AdminDashboard() {
  const { pendingVerifications, approveVerification, adminUser, courses, contests } = useApp();

  const pendingCount = pendingVerifications.filter((v) => v.status === 'Pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="surface-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-emerald-400 uppercase">
            <span className="text-emerald-300 font-medium">{adminUser.college}</span>
            <span>•</span>
            <span>{adminUser.roleTitle}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-heading mt-1">
            Faculty Governance & Audit Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Logged in as <strong className="text-white">{adminUser.name}</strong> • <span className="text-slate-300">{adminUser.department}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/courses"
            className="btn-secondary text-xs"
          >
            Manage Courses
          </Link>
          <Link
            to="/admin/contests"
            className="btn-secondary text-xs"
          >
            Schedule Contest
          </Link>
        </div>
      </div>

      {/* Verification Queue (Core Functionality) */}
      <div className="surface-card p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>Student Project Verification Queue ({pendingCount} Pending)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Review student repository architectures and approve claims to credit their Practical Development PRS component.
            </p>
          </div>
        </div>

        <div className="divide-y divide-white/[0.05]">
          {pendingVerifications.map((item) => {
            const isApproved = item.status === 'Approved';

            return (
              <div
                key={item.id}
                className="py-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{item.studentName}</span>
                    <span className="text-[11px] font-mono text-slate-400">({item.rollNumber})</span>
                    <span className="text-[10px] font-mono bg-[#141824] px-1.5 py-0.2 rounded text-slate-400 border border-white/[0.06]">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-medium text-slate-200 text-xs">
                    {item.projectTitle}
                  </h3>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="text-emerald-400 font-mono font-medium">{item.claimedPrs} Claim</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-md bg-[#141824] border border-white/[0.08] text-slate-300 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    <span>Inspect Code</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {isApproved ? (
                    <span className="px-3 py-1.5 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified ✓</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => approveVerification(item.id)}
                      className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Claim</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Overview of Active Courses & Contests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="surface-card p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Active Courses ({courses.length})
            </h3>
            <Link to="/admin/courses" className="text-xs text-indigo-400 hover:underline">
              Manage &rarr;
            </Link>
          </div>
          <div className="space-y-2">
            {courses.slice(0, 3).map((c) => (
              <div key={c.id} className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-300">{c.title}</span>
                <span className="font-mono text-slate-400">{c.category}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Coordinated Contests ({contests.length})
            </h3>
            <Link to="/admin/contests" className="text-xs text-indigo-400 hover:underline">
              Schedule &rarr;
            </Link>
          </div>
          <div className="space-y-2">
            {contests.slice(0, 3).map((c) => (
              <div key={c.id} className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-300">{c.title}</span>
                <span className="text-[10px] font-mono uppercase text-slate-400">{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
