import React, { useState } from 'react';
import { Trophy, Plus, X } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

export default function AdminContests() {
  const { contests, adminUser } = useApp();
  const [list, setList] = useState(contests);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('Saturday, 2:00 PM');
  const [difficulty, setDifficulty] = useState('Medium');

  const handleSchedule = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setList([
      {
        id: `c-${Date.now()}`,
        title,
        status: 'upcoming',
        startTime,
        duration: '2 Hours',
        difficulty,
        totalQuestions: 4,
        xpReward: 200,
        isRegistered: false,
        organizer: adminUser.department || 'Academic Department',
        description: 'Scheduled algorithmic coding assessment.',
        rules: ['Standard test suite verification.']
      },
      ...list
    ]);

    setTitle('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <span className="text-[11px] font-mono text-emerald-400 uppercase">
            Arena Coordination
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-heading mt-0.5">
            Contest Scheduler
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Coordinate inter-department coding rounds and define assessment timing.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn-primary text-xs flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Schedule Contest</span>
        </button>
      </div>

      {/* Table */}
      <div className="surface-card overflow-hidden">
        <div className="p-3 border-b border-white/[0.06] text-[11px] font-mono text-slate-400 uppercase flex items-center justify-between">
          <span>Contest Title</span>
          <span>Status & Schedule</span>
        </div>

        <div className="divide-y divide-white/[0.05]">
          {list.map((c) => (
            <div
              key={c.id}
              className="p-3.5 flex items-center justify-between text-xs hover:bg-white/[0.02]"
            >
              <div>
                <span className="font-semibold text-white block">{c.title}</span>
                <span className="text-[11px] text-slate-400">{c.duration} • {c.difficulty}</span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-slate-300">{c.startTime}</span>
                <span
                  className={`text-[10px] uppercase px-2 py-0.5 rounded font-medium ${
                    c.status === 'live'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#11141d] border border-white/[0.1] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <h3 className="text-sm font-bold text-white font-heading">
                Schedule New Arena
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSchedule} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Contest Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Graph Algorithms Sprint"
                  className="w-full px-3 py-1.5 rounded-md bg-[#090b10] border border-white/[0.08] text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Date & Time</label>
                <input
                  type="text"
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="e.g. Saturday, 4:00 PM"
                  className="w-full px-3 py-1.5 rounded-md bg-[#090b10] border border-white/[0.08] text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-md bg-[#090b10] border border-white/[0.08] text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
