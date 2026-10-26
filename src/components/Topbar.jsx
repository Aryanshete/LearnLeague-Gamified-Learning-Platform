import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  User,
  Shield,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function Topbar({ onToggleSidebar }) {
  const navigate = useNavigate();
  const {
    currentRole,
    switchPersona,
    currentUser,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotificationsCount,
    currentPRS
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleRole = () => {
    const nextRole = currentRole === 'student' ? 'admin' : 'student';
    switchPersona(nextRole);
    if (nextRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('course') || q.includes('dsa')) navigate('/courses');
    else if (q.includes('quiz') || q.includes('assess')) navigate('/assessments/quiz-dsa-01');
    else if (q.includes('contest')) navigate('/contests');
    else if (q.includes('readiness') || q.includes('prs')) navigate('/readiness');
    else if (q.includes('project')) navigate('/projects');
    else navigate('/courses');
  };

  return (
    <header className="sticky top-0 z-30 h-14 bg-[#090b10]/95 backdrop-blur-md border-b border-white/[0.07] px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile hamburger & Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <form onSubmit={handleSearch} className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, contests, assessments..."
            className="w-48 sm:w-64 pl-8 pr-3 py-1.5 rounded-lg bg-[#12151e] border border-white/[0.08] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </form>
      </div>

      {/* Right: Dynamic PRS Score pill, Persona Switcher, Notifications, User */}
      <div className="flex items-center gap-2 sm:gap-3">
        {currentRole === 'student' && (
          <Link
            to="/readiness"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#12151e] border border-white/[0.08] text-xs hover:border-indigo-500/50 transition-colors"
            title="Current Placement Readiness Score"
          >
            <span className="text-slate-400">PRS:</span>
            <span className="font-mono font-bold text-indigo-400">{currentPRS}</span>
          </Link>
        )}

        {/* Role toggle */}
        <button
          onClick={toggleRole}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
            currentRole === 'student'
              ? 'bg-[#12151e] border-white/[0.08] text-slate-300 hover:text-white'
              : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
          }`}
          title="Switch view between Student and Admin"
        >
          {currentRole === 'student' ? (
            <>
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>Role: Student</span>
            </>
          ) : (
            <>
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Role: Admin</span>
            </>
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-900 relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl bg-[#12151e] border border-white/[0.1] shadow-xl p-3 z-50 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08] text-xs">
                <span className="font-semibold text-white">System Events</span>
                {unreadNotificationsCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-indigo-400 hover:underline text-[11px]"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="max-h-60 overflow-y-auto space-y-1.5">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationAsRead(n.id)}
                    className="p-2 rounded-lg bg-[#090b10] border border-white/[0.05] text-xs space-y-0.5 cursor-pointer"
                  >
                    <div className="font-medium text-white">{n.title}</div>
                    <div className="text-slate-400 text-[11px]">{n.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Link */}
        <Link
          to="/profile"
          className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-white/5 text-xs text-slate-300"
        >
          <div className="w-6 h-6 rounded-md bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center font-bold text-[11px]">
            {currentUser.name[0]}
          </div>
          <span className="hidden md:inline font-medium">{currentUser.name.split(' ')[0]}</span>
        </Link>
      </div>
    </header>
  );
}
