import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ClipboardCheck,
  Trophy,
  FolderGit2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Calculator
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import BadgeCard from '../components/BadgeCard.jsx';

export default function DashboardPage() {
  const { studentUser, courses, contests, currentPRS, prsScores } = useApp();

  const enrolledCourses = courses.filter((c) => c.isEnrolled);

  return (
    <div className="space-y-6">
      <div className="surface-card p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400 uppercase">
            <span className="text-slate-300 font-medium">{studentUser.college}</span>
            <span>•</span>
            <span className="text-indigo-400">{studentUser.department}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-heading mt-1">
            {studentUser.name}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            <span className="font-mono text-slate-300">Roll: {studentUser.rollNumber}</span> • <span className="text-indigo-300 font-medium">{studentUser.year} (Semester {studentUser.semester})</span>
          </p>
        </div>

        {/* Dynamic Score Indicator */}
        <div className="p-3.5 rounded-xl bg-[#141824] border border-white/[0.08] flex items-center gap-4 shrink-0">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Placement Score</span>
            <div className="text-2xl font-bold text-indigo-400 font-mono">
              {currentPRS} <span className="text-xs text-slate-500 font-normal">/ 100</span>
            </div>
          </div>
          <Link
            to="/readiness"
            className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/30 flex items-center gap-1 font-medium"
          >
            <span>Calculator</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Quick Action Workflow Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          to="/courses"
          className="surface-card p-3.5 hover:border-indigo-500/40 flex items-center gap-3 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Coursework</div>
            <div className="text-[11px] text-slate-400">View Modules</div>
          </div>
        </Link>

        <Link
          to="/assessments/quiz-dsa-01"
          className="surface-card p-3.5 hover:border-indigo-500/40 flex items-center gap-3 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Evaluation</div>
            <div className="text-[11px] text-slate-400">Take Assessment</div>
          </div>
        </Link>

        <Link
          to="/projects"
          className="surface-card p-3.5 hover:border-indigo-500/40 flex items-center gap-3 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <FolderGit2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Portfolio</div>
            <div className="text-[11px] text-slate-400">Submit Repo</div>
          </div>
        </Link>

        <Link
          to="/contests"
          className="surface-card p-3.5 hover:border-indigo-500/40 flex items-center gap-3 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Competitions</div>
            <div className="text-[11px] text-slate-400">View Sprints</div>
          </div>
        </Link>
      </div>

      {/* Main Grid: Enrolled Courses & Contests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Enrolled Courses */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Enrolled Course Modules ({enrolledCourses.length})
            </h2>
            <Link to="/courses" className="text-xs text-indigo-400 hover:underline">
              Browse Catalogue &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="surface-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase">
                      {course.category}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[11px] text-slate-400">{course.level}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{course.modules.length} Modules</span>
                    <span>•</span>
                    <span>Progress: {course.progress}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Link
                    to={`/courses/${course.id}`}
                    className="flex-1 sm:flex-initial text-xs px-3 py-1.5 rounded-lg bg-[#141824] border border-white/[0.08] text-slate-300 hover:text-white text-center"
                  >
                    Open Syllabus
                  </Link>
                  <Link
                    to={`/assessments/${course.assessmentId}`}
                    className="flex-1 sm:flex-initial text-xs px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-center"
                  >
                    Take Quiz
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Contests & Badges */}
        <div className="space-y-6">
          <div className="surface-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Scheduled Contests
              </h3>
              <Link to="/contests" className="text-xs text-indigo-400 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {contests.slice(0, 2).map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-lg bg-[#141824] border border-white/[0.06] space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span
                      className={`font-semibold uppercase text-[10px] ${
                        c.status === 'live' ? 'text-emerald-400' : 'text-slate-400'
                      }`}
                    >
                      ● {c.status.toUpperCase()}
                    </span>
                    <span className="text-slate-400">{c.duration}</span>
                  </div>
                  <h4 className="text-xs font-medium text-white">{c.title}</h4>
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-400">{c.startTime}</span>
                    <span className="font-mono text-indigo-300">+{c.xpReward} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges strip */}
          <div className="surface-card p-5 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Earned Badges
            </h3>
            <div className="space-y-2">
              {studentUser.badges.slice(0, 2).map((b) => (
                <BadgeCard key={b.id} badge={b} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
