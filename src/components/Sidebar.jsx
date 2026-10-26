import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  Trophy,
  Award,
  FolderGit2,
  Briefcase,
  Users,
  GraduationCap,
  Calculator,
  User,
  Shield,
  Zap,
  BarChart3,
  CalendarDays,
  Settings,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function Sidebar({ isOpen, onClose }) {
  const { currentRole, currentUser } = useApp();

  const studentItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Course Curriculum', path: '/courses', icon: BookOpen },
    { label: 'Milestone Assessment', path: '/assessments/quiz-dsa-01', icon: ClipboardCheck },
    { label: 'Coding Contests', path: '/contests', icon: Trophy },
    { label: 'Leaderboard', path: '/leaderboard', icon: Award },
    { label: 'Project Portfolio', path: '/projects', icon: FolderGit2 },
    { label: 'Opportunities', path: '/opportunities', icon: Briefcase },
    { label: 'Discussion Board', path: '/community', icon: Users },
    { label: 'PRS Calculator', path: '/readiness', icon: Calculator },
    { label: 'Academic SGPA', path: '/academics', icon: GraduationCap },
    { label: 'Profile Settings', path: '/profile', icon: User }
  ];

  const adminItems = [
    { label: 'Admin Overview', path: '/admin', icon: Shield },
    { label: 'Course Management', path: '/admin/courses', icon: BookOpen },
    { label: 'Contest Scheduler', path: '/admin/contests', icon: CalendarDays },
    { label: 'Readiness Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Admin Settings', path: '/profile', icon: Settings },
    { label: 'Switch to Student View', path: '/dashboard', icon: LayoutDashboard }
  ];

  const items = currentRole === 'admin' ? adminItems : studentItems;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0a0c12] border-r border-white/[0.07] flex flex-col transition-transform duration-150 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-white/[0.07]">
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-white" />
            </div>
            <span className="font-heading font-bold text-white text-sm tracking-tight">
              LearnLeague
            </span>
          </NavLink>
          <span className="text-[10px] font-mono uppercase bg-white/[0.05] border border-white/[0.08] text-slate-300 px-2 py-0.5 rounded">
            {currentRole}
          </span>
        </div>

        {/* Current User Card */}
        <div className="p-3 border-b border-white/[0.06]">
          <NavLink
            to="/profile"
            className="p-2.5 rounded-lg bg-[#11131a] border border-white/[0.06] hover:border-white/[0.14] transition-all flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0">
              {currentUser.name ? currentUser.name[0] : 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">
                {currentUser.name}
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {currentRole === 'admin' ? currentUser.roleTitle : currentUser.department}
              </div>
            </div>
            <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
          </NavLink>
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-0.5">
          <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider px-2.5 mb-1.5">
            {currentRole === 'admin' ? 'Institutional Oversight' : 'Workspaces & Modules'}
          </div>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </aside>
    </>
  );
}
