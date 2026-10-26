import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, Shield, User, ArrowRight, Lock, Mail, Building, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import Navbar from '../components/Navbar.jsx';

export default function AuthPage() {
  const navigate = useNavigate();
  const { switchPersona, studentUser, adminUser } = useApp();

  const [activeTab, setActiveTab] = useState('student'); // 'student' | 'admin'
  const [email, setEmail] = useState(studentUser.email || 'student@university.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [adminEmailInput, setAdminEmailInput] = useState(adminUser.email || 'admin@university.edu');
  const [adminPassword, setAdminPassword] = useState('••••••••••••');

  const handleStudentLogin = (e) => {
    e.preventDefault();
    switchPersona('student');
    navigate('/dashboard');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    switchPersona('admin');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md surface-card p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto">
              <Zap className="w-5 h-5 fill-indigo-400" />
            </div>
            <h1 className="text-xl font-bold text-white font-heading tracking-tight">
              Sign In to LearnLeague
            </h1>
            <p className="text-xs text-slate-400">
              Campus learning, skill milestones & placement-readiness platform.
            </p>
          </div>

          {/* Role Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-[#0a0c12] border border-white/[0.08] gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('student')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'student'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Student Portal</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('admin')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'admin'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Faculty & Admin</span>
            </button>
          </div>

          {/* STUDENT LOGIN FORM */}
          {activeTab === 'student' ? (
            <form onSubmit={handleStudentLogin} className="space-y-4 text-xs">
              <div className="p-3 rounded-lg bg-[#0e111a] border border-white/[0.06] space-y-1">
                <div className="text-[11px] text-slate-400 font-medium">Configured Student Profile:</div>
                <div className="font-semibold text-white">{studentUser.name}</div>
                <div className="text-[11px] text-indigo-300">
                  {studentUser.college} • {studentUser.year} (Sem {studentUser.semester})
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Student University Email</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0c0e14] border border-white/[0.08] text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0c0e14] border border-white/[0.08] text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded accent-indigo-500" />
                  <span>Remember active session</span>
                </label>
                <span className="text-indigo-400 hover:underline cursor-pointer">Need access?</span>
              </div>

              <button
                type="submit"
                className="w-full btn-primary text-xs py-2.5 flex items-center justify-center gap-2 mt-2"
              >
                <span>Sign In as Student</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            /* ADMIN LOGIN FORM */
            <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
              <div className="p-3 rounded-lg bg-[#0a1410] border border-emerald-500/20 space-y-1">
                <div className="text-[11px] text-emerald-400 font-medium">Configured Institutional Officer:</div>
                <div className="font-semibold text-white">{adminUser.name}</div>
                <div className="text-[11px] text-emerald-300">
                  {adminUser.college} • {adminUser.roleTitle}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Administrator Official Email</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={adminEmailInput}
                    onChange={(e) => setAdminEmailInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0c0e14] border border-white/[0.08] text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Administrative Password</label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0c0e14] border border-white/[0.08] text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded accent-emerald-500" />
                  <span>Enforce 2FA institutional verification</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full btn-primary text-xs py-2.5 flex items-center justify-center gap-2 mt-2 bg-emerald-600 hover:bg-emerald-500"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Sign In to Institutional Admin Portal</span>
              </button>
            </form>
          )}

          <div className="pt-3 border-t border-white/[0.06] text-center text-xs text-slate-400">
            <span>LearnLeague Enterprise Campus Platform</span>
          </div>
        </div>
      </div>
    </div>
  );
}
