import React, { useState } from 'react';
import {
  FolderGit2,
  Plus,
  ExternalLink,
  GitBranch,
  CheckCircle2,
  Clock,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function ProjectsPage() {
  const { projects, addProject } = useApp();
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addProject({
      title,
      description,
      techStack: techStack.split(',').map((s) => s.trim()).filter(Boolean),
      githubUrl: githubUrl || 'https://github.com/example/repo',
      liveDemoUrl: liveDemoUrl || 'https://demo.example.com'
    });

    setTitle('');
    setDescription('');
    setTechStack('');
    setGithubUrl('');
    setLiveDemoUrl('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <span className="text-[11px] font-mono text-indigo-400 uppercase">
            Portfolio Management
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-heading mt-0.5">
            Student Projects & Verifications
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Submit repositories for faculty audit. Verified projects contribute to the Practical Development PRS component.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn-primary text-xs flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => {
          const isVerified = project.verificationStatus === 'Verified';

          return (
            <div
              key={project.id}
              className="surface-card p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-white font-heading">
                    {project.title}
                  </h3>
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-medium shrink-0 ${
                      isVerified
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {project.verificationStatus}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141824] border border-white/[0.06] text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-1.5 px-2.5 rounded-md bg-[#141824] border border-white/[0.08] text-slate-300 hover:text-white text-xs flex items-center justify-center gap-1.5"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Repository</span>
                </a>
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-1.5 px-2.5 rounded-md bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/30 text-xs flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#11141d] border border-white/[0.1] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-sm font-bold text-white font-heading">
                Submit Project for Faculty Audit
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Distributed Key-Value Store"
                  className="w-full px-3 py-2 rounded-lg bg-[#090b10] border border-white/[0.08] text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Technical Summary</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="System design, concurrency model, and database structures..."
                  className="w-full px-3 py-2 rounded-lg bg-[#090b10] border border-white/[0.08] text-white focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Technologies Used (Comma-separated)</label>
                <input
                  type="text"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  placeholder="React, Go, PostgreSQL, Docker"
                  className="w-full px-3 py-2 rounded-lg bg-[#090b10] border border-white/[0.08] text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-lg bg-[#090b10] border border-white/[0.08] text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Demo URL</label>
                  <input
                    type="url"
                    value={liveDemoUrl}
                    onChange={(e) => setLiveDemoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg bg-[#090b10] border border-white/[0.08] text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs"
                >
                  Submit for Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
