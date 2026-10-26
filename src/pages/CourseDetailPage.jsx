import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function CourseDetailPage() {
  const { id } = useParams();
  const { courses, toggleEnrollCourse, markLessonComplete } = useApp();

  const course = courses.find((c) => c.id === id) || courses[0];
  const [openModuleId, setOpenModuleId] = useState(course.modules[0]?.id || '');
  const [activeLesson, setActiveLesson] = useState(null);

  const toggleModule = (modId) => {
    setOpenModuleId((prev) => (prev === modId ? '' : modId));
  };

  return (
    <div className="space-y-6">
      {/* Course Header Banner */}
      <div className="surface-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-indigo-400 uppercase bg-indigo-500/10 px-2 py-0.5 rounded">
              {course.category}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">{course.level}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white font-heading">
            {course.title}
          </h1>

          <p className="text-xs text-slate-400 leading-relaxed">
            {course.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
            <span>Instructor: <strong className="text-slate-300 font-normal">{course.instructor}</strong></span>
            <span>•</span>
            <span>{course.estimatedHours} Hours</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Progress: {course.progress}%</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-56 shrink-0">
          <Link
            to={`/assessments/${course.assessmentId}`}
            className="btn-primary text-xs text-center flex items-center justify-center gap-1.5"
          >
            <span>Take Milestone Quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => toggleEnrollCourse(course.id)}
            className="btn-secondary text-xs text-center"
          >
            {course.isEnrolled ? 'Drop Enrolment' : 'Enrol in Course'}
          </button>
        </div>
      </div>

      {/* Syllabus Modules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Syllabus & Lesson Modules
          </h2>
          <span className="text-xs text-slate-400">Click a lesson to open review drawer</span>
        </div>

        <div className="space-y-3">
          {course.modules.map((mod) => {
            const isOpen = openModuleId === mod.id;

            return (
              <div key={mod.id} className="surface-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleModule(mod.id)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-semibold text-white">{mod.title}</span>
                    <span className="text-[11px] text-slate-400">({mod.lessons.length} lessons)</span>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {isOpen && (
                  <div className="border-t border-white/[0.06] bg-[#0c0e14] divide-y divide-white/[0.04]">
                    {mod.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className="p-3 pl-5 flex items-center justify-between hover:bg-white/[0.03] cursor-pointer text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          {lesson.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                          )}
                          <span className="text-slate-200">{lesson.title}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lesson Drawer Modal */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#11141d] border border-white/[0.1] rounded-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-white/[0.08]">
              <div>
                <span className="text-[10px] font-mono uppercase text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                  {activeLesson.type.toUpperCase()} • {activeLesson.duration}
                </span>
                <h3 className="text-base font-bold text-white mt-1 font-heading">
                  {activeLesson.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveLesson(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>{activeLesson.content}</p>

              <div className="p-3 rounded-lg bg-[#090b10] border border-white/[0.06] font-mono text-xs text-indigo-300 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase pb-1 border-b border-white/[0.05]">
                  Example Code Snippet
                </div>
                <pre>{`// Algorithmic pattern routine
function solve(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    if (condition(arr[left], arr[right])) return true;
    left++;
    right--;
  }
  return false;
}`}</pre>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => setActiveLesson(null)}
                className="btn-secondary text-xs"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  markLessonComplete(course.id, activeLesson.id);
                  setActiveLesson((prev) => ({ ...prev, completed: true }));
                }}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                  activeLesson.completed
                    ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                    : 'btn-primary'
                }`}
              >
                {activeLesson.completed ? 'Completed ✓' : 'Mark Lesson Complete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
