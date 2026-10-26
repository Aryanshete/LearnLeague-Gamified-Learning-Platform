import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ClipboardCheck,
  Trophy,
  FolderGit2,
  Calculator,
  Shield,
  ArrowRight,
  Check
} from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function FeaturesPage() {
  const pillars = [
    {
      title: "1. Learning Curriculum & Lesson Engine",
      description: "Modular syllabi structured around core engineering patterns. Lessons open in interactive review drawers with syntax-highlighted code samples and progress tracking.",
      items: [
        "Two Pointers, Sliding Window, and Tree traversal patterns",
        "Granular module and lesson completion states",
        "Direct connection to timed milestone evaluations"
      ],
      route: "/courses",
      action: "Explore Courses"
    },
    {
      title: "2. Milestone Assessment Engine",
      description: "Timed multiple-choice evaluations that automatically grade student comprehension and dynamically update technical score components in the Placement Readiness Score.",
      items: [
        "Live countdown timer and single-choice radio controls",
        "Question palette navigation (unvisited, answered, active)",
        "Instant grading with technical solution explanations"
      ],
      route: "/assessments/quiz-dsa-01",
      action: "Launch Assessment"
    },
    {
      title: "3. Competitive Arena & Sprints",
      description: "Scheduled algorithmic coding battles between departments and colleges. Supports registration toggles, strict time limits, and anti-plagiarism verification.",
      items: [
        "Live and upcoming sprint schedule management",
        "One-click participant registration state toggle",
        "Rankings linked to student point ledger"
      ],
      route: "/contests",
      action: "View Contests"
    },
    {
      title: "4. Project Portfolio & Faculty Audit",
      description: "Replaces unverified resumes with faculty-audited repository records. Students submit GitHub links and live demos which queue directly for review.",
      items: [
        "Submit project modal with tech stack and demo links",
        "Faculty review queue with 'Verified' and 'Under Review' tags",
        "Successful audits award points toward the Practical Development PRS component"
      ],
      route: "/projects",
      action: "Open Portfolio"
    },
    {
      title: "5. Placement Readiness Score (PRS) Formulation",
      description: "A normalized mathematical model based on Section 9 & 12 of the blueprint. Replaces arbitrary claims with an explainable, weighted formula: PRS = Σ(w_i × s_i).",
      items: [
        "Technical Skills (25%) + Academic CGPA (20%) + Projects (20%)",
        "Coursework (15%) + Contests (10%) + Professional Activities (10%)",
        "Interactive real-time calculator sliders to simulate score impacts"
      ],
      route: "/readiness",
      action: "Use PRS Calculator"
    },
    {
      title: "6. Dean & Admin Institutional Governance",
      description: "Administrative console enabling academic heads and placement officers to review student repository claims, author new courses, and coordinate coding arenas.",
      items: [
        "Live verification approval queue with one-click 'Approve Claim'",
        "Course authoring and draft publishing workflow",
        "Contest coordination with date/time scheduler"
      ],
      route: "/admin",
      action: "Open Admin Console"
    }
  ];

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col">
      <Navbar />

      <section className="py-12 border-b border-white/[0.07]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <span className="text-[11px] font-mono text-indigo-400 uppercase">
            System Specification
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-white font-heading">
            LearnLeague Architecture & Features
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Detailed breakdown of the core workflows and technical modules across the platform.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map((p, idx) => (
            <div key={idx} className="surface-card p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <h2 className="text-sm font-bold text-white font-heading">
                  {p.title}
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {p.description}
                </p>

                <ul className="space-y-1.5 pt-1 text-xs text-slate-300">
                  {p.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px]">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-white/[0.06]">
                <Link
                  to={p.route}
                  className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  <span>{p.action}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
