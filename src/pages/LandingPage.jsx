import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ClipboardCheck,
  Trophy,
  FolderGit2,
  Sparkles,
  Shield,
  ArrowRight,
  Layers,
  CheckCircle2,
  Calculator
} from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function LandingPage() {
  const navigate = useNavigate();
  const { switchPersona } = useApp();

  const handleStudentEntry = () => {
    switchPersona('student');
    navigate('/dashboard');
  };

  const handleAdminEntry = () => {
    switchPersona('admin');
    navigate('/admin');
  };

  const coreModules = [
    {
      id: "learning",
      title: "Course Curriculum & Syllabus",
      description: "Structured pattern-based learning modules with interactive lesson drawers and completion tracking.",
      icon: BookOpen,
      route: "/courses",
      actionLabel: "View Courses"
    },
    {
      id: "assessments",
      title: "Timed Milestone Assessments",
      description: "Multiple-choice evaluations with live countdown, question palette, instant grading, and explanation reviews.",
      icon: ClipboardCheck,
      route: "/assessments/quiz-dsa-01",
      actionLabel: "Launch Sample Quiz"
    },
    {
      id: "contests",
      title: "Competitive Sprints",
      description: "Scheduled algorithmic arenas with time bounds, question guidelines, and participation toggles.",
      icon: Trophy,
      route: "/contests",
      actionLabel: "Browse Contests"
    },
    {
      id: "portfolio",
      title: "Project Portfolio & Verification",
      description: "Student repository management with GitHub links, live demos, and faculty audit status queues.",
      icon: FolderGit2,
      route: "/projects",
      actionLabel: "Open Portfolio"
    },
    {
      id: "readiness",
      title: "Placement Readiness Calculator",
      description: "Interactive normalized mathematical formula (PRS) balancing Technical, Academics, Projects, and Contests.",
      icon: Calculator,
      route: "/readiness",
      actionLabel: "Run PRS Calculator"
    },
    {
      id: "governance",
      title: "Dean & Admin Governance",
      description: "Institutional oversight: Student project verification queue, course publishing, and contest management.",
      icon: Shield,
      route: "/admin",
      actionLabel: "Open Admin Center"
    }
  ];

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 border-b border-white/[0.07]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
            <span>Engineering & Placement Readiness Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight leading-tight">
            Integrated Learning, Competitions & <br />
            <span className="text-indigo-400">Placement-Readiness Platform</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive campus platform uniting curriculum coursework, timed algorithmic evaluations, verified engineering repositories, and normalized mathematical scoring.
          </p>

          {/* Action Hub */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleStudentEntry}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <span>Enter Student Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleAdminEntry}
              className="px-5 py-2.5 rounded-lg bg-[#141824] hover:bg-[#1a2030] border border-white/[0.1] text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Enter Faculty / Admin Portal</span>
            </button>

            <Link
              to="/readiness"
              className="px-5 py-2.5 rounded-lg bg-[#141824] hover:bg-[#1a2030] border border-white/[0.1] text-slate-300 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive PRS Calculator</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Platform Modules Grid */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white font-heading">
            Campus Platform Capabilities & Architecture
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Explore dedicated workflows engineered for students, faculty evaluators, and campus placement directors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                className="surface-card p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-500/25 text-indigo-400 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white font-heading">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.06]">
                  <Link
                    to={mod.route}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300"
                  >
                    <span>{mod.actionLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
