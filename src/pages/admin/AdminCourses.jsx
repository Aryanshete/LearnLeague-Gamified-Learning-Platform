import React, { useState } from 'react';
import { BookOpen, Plus, X } from 'lucide-react';
import { mockAdminCourses } from '../../mock/mockAdmin.js';
import { useApp } from '../../context/AppContext.jsx';

export default function AdminCourses() {
  const { adminUser } = useApp();
  const [courses, setCourses] = useState(mockAdminCourses);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Data Structures');
  const [instructor, setInstructor] = useState(adminUser.name || 'Faculty Administrator');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setCourses([
      {
        id: `cs-c-${Date.now()}`,
        title,
        category,
        instructor,
        status: 'Published',
        enrolledCount: 1,
        modulesCount: 1
      },
      ...courses
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
            Curriculum Authoring
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-heading mt-0.5">
            Course Management & Publishing
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Author engineering syllabus, manage lesson modules, and publish course evaluations.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn-primary text-xs flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Publish Course</span>
        </button>
      </div>

      {/* Courses Table */}
      <div className="surface-card overflow-hidden">
        <div className="p-3 border-b border-white/[0.06] text-[11px] font-mono text-slate-400 uppercase flex items-center justify-between">
          <span>Course Title</span>
          <span>Status & Category</span>
        </div>

        <div className="divide-y divide-white/[0.05]">
          {courses.map((c) => (
            <div
              key={c.id}
              className="p-3.5 flex items-center justify-between text-xs hover:bg-white/[0.02]"
            >
              <div>
                <span className="font-semibold text-white block">{c.title}</span>
                <span className="text-[11px] text-slate-400">Instructor: {c.instructor}</span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-slate-400">{c.category}</span>
                <span
                  className={`text-[10px] uppercase px-2 py-0.5 rounded font-medium ${
                    c.status === 'Published'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-amber-500/10 text-amber-400'
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
                Publish Course
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Distributed Consensus in Go"
                  className="w-full px-3 py-1.5 rounded-md bg-[#090b10] border border-white/[0.08] text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-md bg-[#090b10] border border-white/[0.08] text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Data Structures">Data Structures</option>
                  <option value="System Design">System Design</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Web Development">Web Development</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Lead Instructor</label>
                <input
                  type="text"
                  required
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-md bg-[#090b10] border border-white/[0.08] text-white focus:outline-none focus:border-indigo-500"
                />
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
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
