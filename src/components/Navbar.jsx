import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap, Shield, User, Menu, X, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { switchPersona, currentRole } = useApp();

  const links = [
    { label: 'Overview', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'Courses', path: '/courses' },
    { label: 'Assessments', path: '/assessments/quiz-dsa-01' },
    { label: 'Contests', path: '/contests' },
    { label: 'Portfolio', path: '/projects' },
    { label: 'PRS Calculator', path: '/readiness' }
  ];

  return (
    <header className="sticky top-0 z-50 nav-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <span className="font-heading font-bold text-base text-white tracking-tight">
              LearnLeague
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    active ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Persona Switchers & Enter Dashboard */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => {
                switchPersona('student');
                navigate('/dashboard');
              }}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>Student View</span>
            </button>

            <button
              onClick={() => {
                switchPersona('admin');
                navigate('/admin');
              }}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin View</span>
            </button>

            <Link
              to="/dashboard"
              className="btn-primary text-xs flex items-center gap-1.5 ml-1"
            >
              <span>Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-3 space-y-1">
          {links.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <Link
              to="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="text-center py-2 rounded-lg bg-indigo-600 text-white text-xs font-medium"
            >
              Open Dashboard
            </Link>
            <Link
              to="/admin"
              onClick={() => {
                switchPersona('admin');
                setMobileOpen(false);
              }}
              className="text-center py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium"
            >
              Open Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
