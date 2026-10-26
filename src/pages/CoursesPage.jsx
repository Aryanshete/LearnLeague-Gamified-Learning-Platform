import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Filter,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function CoursesPage() {
  const { courses, toggleEnrollCourse } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Data Structures', 'System Design', 'DevOps & Cloud'];

  const filtered = courses.filter((c) => {
    const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <span className="text-[11px] font-mono text-indigo-400 uppercase">
            Academic Syllabus
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-heading mt-0.5">
            Course Curriculum
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse engineering modules, review technical lessons, and complete milestone assessments.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search topics..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#11141d] border border-white/[0.08] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-[#141824] border border-white/[0.08] text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((course) => (
          <div
            key={course.id}
            className="surface-card p-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono text-indigo-400 uppercase">{course.category}</span>
                <span className="text-slate-400">{course.level}</span>
              </div>

              <h3 className="text-base font-bold text-white font-heading">
                {course.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                {course.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                <span>Instructor: <strong className="text-slate-300 font-normal">{course.instructor}</strong></span>
                <span>•</span>
                <span>{course.estimatedHours} hrs</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2">
              <Link
                to={`/courses/${course.id}`}
                className="flex-1 py-1.5 px-3 rounded-md bg-[#141824] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-medium text-center"
              >
                View Modules
              </Link>

              <button
                type="button"
                onClick={() => toggleEnrollCourse(course.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                  course.isEnrolled
                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                    : 'btn-primary text-xs'
                }`}
              >
                {course.isEnrolled ? 'Enrolled ✓' : 'Enrol'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
