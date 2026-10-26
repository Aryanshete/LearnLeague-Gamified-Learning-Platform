import React, { useState } from 'react';
import {
  Calculator,
  GraduationCap,
  Sparkles,
  Info,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function AcademicsPage() {
  const {
    prsComponentWeights,
    prsScores,
    setComponentScore,
    currentPRS,
    semesterRecords
  } = useApp();

  const [activeTab, setActiveTab] = useState('calculator'); // 'calculator' | 'semesters'

  const resetToDefaults = () => {
    setComponentScore('tech', 85);
    setComponentScore('acad', 88);
    setComponentScore('proj', 80);
    setComponentScore('learn', 75);
    setComponentScore('contest', 70);
    setComponentScore('activity', 75);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <span className="text-[11px] font-mono text-indigo-400 uppercase">
            Mathematical Engine
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-heading mt-0.5">
            Placement Readiness Score (PRS) & Academics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Calculated using normalized components: Tech (25%) + Academics (20%) + Projects (20%) + Learning (15%) + Contests (10%) + Activities (10%).
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-lg bg-[#141824] border border-white/[0.08]">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'calculator'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            PRS Interactive Calculator
          </button>
          <button
            onClick={() => setActiveTab('semesters')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'semesters'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Semester SGPA Records
          </button>
        </div>
      </div>

      {activeTab === 'calculator' ? (
        /* INTERACTIVE CALCULATOR ENGINE */
        <div className="space-y-6">
          {/* Output Score Banner */}
          <div className="surface-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-[11px] font-mono uppercase bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">
                Formula: PRS = Σ(w_i × s_i)
              </span>
              <h2 className="text-lg font-bold text-white font-heading">
                Computed Placement Readiness Index
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Adjust the component sliders or values below to observe how improvements in assessments, project audits, or coursework alter the aggregate index in real-time.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141824] border border-white/[0.08] text-center w-full md:w-56 shrink-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Calculated PRS</span>
              <div className="text-4xl font-extrabold text-indigo-400 font-mono my-1">
                {currentPRS}
              </div>
              <span className="text-[11px] text-slate-400">Scale: 0.0 – 100.0</span>
            </div>
          </div>

          {/* Controls Table / Sliders */}
          <div className="surface-card p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Component Score Variables
              </h3>
              <button
                onClick={resetToDefaults}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Baseline</span>
              </button>
            </div>

            <div className="space-y-5">
              {prsComponentWeights.map((comp) => {
                const score = prsScores[comp.id] !== undefined ? prsScores[comp.id] : 75;
                const contribution = (comp.weight * score).toFixed(2);

                return (
                  <div
                    key={comp.id}
                    className="p-4 rounded-xl bg-[#141824] border border-white/[0.06] space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-semibold text-white">{comp.name}</h4>
                          <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.2 rounded">
                            Weight: {comp.weightPct}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{comp.description}</p>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                        <span className="text-slate-400">
                          Score: <strong className="text-white text-sm">{score}</strong>/100
                        </span>
                        <span className="text-indigo-400 font-medium">
                          +{contribution} pts
                        </span>
                      </div>
                    </div>

                    {/* Interactive Slider */}
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={score}
                        onChange={(e) => setComponentScore(comp.id, e.target.value)}
                        className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={score}
                        onChange={(e) => setComponentScore(comp.id, e.target.value)}
                        className="w-16 px-2 py-1 rounded bg-[#090b10] border border-white/[0.08] text-xs text-white text-center font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* SEMESTER RECORDS TABLE */
        <div className="surface-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Academic Grade History (CGPA: 8.85)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Semester SGPA records tracked for academic verification.
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-medium">0 Active Backlogs</span>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {semesterRecords.map((sem, idx) => (
              <div
                key={idx}
                className="py-3 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-white block">{sem.semester}</span>
                  <span className="text-[11px] text-slate-400">{sem.credits} Credits</span>
                </div>

                <div className="flex items-center gap-6 font-mono">
                  <span className="text-slate-300">
                    SGPA: <strong className="text-white text-sm">{sem.sgpa.toFixed(2)}</strong>
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                      sem.status === 'Passed'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-indigo-500/10 text-indigo-400'
                    }`}
                  >
                    {sem.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
