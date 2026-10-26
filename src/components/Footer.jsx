import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#08090d] text-slate-400 text-xs py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center text-white">
              <Zap className="w-3 h-3 fill-white" />
            </div>
            <span className="font-heading font-semibold text-white">LearnLeague</span>
            <span className="text-slate-500">— Unified Engineering & Placement Platform</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
            <Link to="/assessments/quiz-dsa-01" className="hover:text-white transition-colors">Assessments</Link>
            <Link to="/contests" className="hover:text-white transition-colors">Contests</Link>
            <Link to="/projects" className="hover:text-white transition-colors">Portfolio</Link>
            <Link to="/readiness" className="hover:text-white transition-colors">PRS Engine</Link>
            <Link to="/admin" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
