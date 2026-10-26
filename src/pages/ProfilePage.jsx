import React, { useState, useEffect } from 'react';
import {
  User,
  GraduationCap,
  Building,
  GitBranch,
  Globe,
  Code,
  Award,
  Shield,
  Mail,
  CheckCircle2,
  Plus,
  Trash2,
  Save,
  Sliders,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import BadgeCard from '../components/BadgeCard.jsx';

export default function ProfilePage() {
  const {
    currentRole,
    switchPersona,
    studentUser,
    adminUser,
    updateProfile,
    updateAdminProfile,
    currentPRS
  } = useApp();

  // Active Tab: 'academic' | 'skills' | 'portfolio' | 'badges' for student; 'admin' | 'governance' for admin
  const [activeTab, setActiveTab] = useState(currentRole === 'admin' ? 'admin' : 'academic');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Student Form State
  const [name, setName] = useState(studentUser.name || '');
  const [college, setCollege] = useState(studentUser.college || '');
  const [department, setDepartment] = useState(studentUser.department || '');
  const [year, setYear] = useState(studentUser.year || '3rd Year');
  const [customYear, setCustomYear] = useState('');
  const [isCustomYear, setIsCustomYear] = useState(false);
  const [semester, setSemester] = useState(studentUser.semester || 6);
  const [rollNumber, setRollNumber] = useState(studentUser.rollNumber || '');
  const [bio, setBio] = useState(studentUser.bio || '');
  const [github, setGithub] = useState(studentUser.socialLinks?.github || '');
  const [linkedin, setLinkedin] = useState(studentUser.socialLinks?.linkedin || '');
  const [leetcode, setLeetcode] = useState(studentUser.socialLinks?.leetcode || '');
  const [skills, setSkills] = useState(studentUser.skills || []);

  // Admin Form State
  const [adminName, setAdminName] = useState(adminUser.name || '');
  const [adminCollege, setAdminCollege] = useState(adminUser.college || '');
  const [adminDept, setAdminDept] = useState(adminUser.department || '');
  const [adminRoleTitle, setAdminRoleTitle] = useState(adminUser.roleTitle || '');
  const [adminEmail, setAdminEmail] = useState(adminUser.email || '');

  // Synchronize state when studentUser or adminUser updates in context
  useEffect(() => {
    setName(studentUser.name || '');
    setCollege(studentUser.college || '');
    setDepartment(studentUser.department || '');
    const currentYr = studentUser.year || '3rd Year';
    const standardYears = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate'];
    if (standardYears.includes(currentYr)) {
      setYear(currentYr);
      setIsCustomYear(false);
    } else {
      setYear('custom');
      setCustomYear(currentYr);
      setIsCustomYear(true);
    }
    setSemester(studentUser.semester || 6);
    setRollNumber(studentUser.rollNumber || '');
    setBio(studentUser.bio || '');
    setGithub(studentUser.socialLinks?.github || '');
    setLinkedin(studentUser.socialLinks?.linkedin || '');
    setLeetcode(studentUser.socialLinks?.leetcode || '');
    setSkills(studentUser.skills || []);
  }, [studentUser]);

  useEffect(() => {
    setAdminName(adminUser.name || '');
    setAdminCollege(adminUser.college || '');
    setAdminDept(adminUser.department || '');
    setAdminRoleTitle(adminUser.roleTitle || '');
    setAdminEmail(adminUser.email || '');
  }, [adminUser]);

  // Keep active tab aligned when user toggles role
  useEffect(() => {
    if (currentRole === 'admin') {
      setActiveTab('admin');
    } else {
      if (activeTab === 'admin' || activeTab === 'governance') {
        setActiveTab('academic');
      }
    }
  }, [currentRole]);

  const handleStudentSave = (e) => {
    e.preventDefault();
    const finalYear = isCustomYear && customYear.trim() ? customYear.trim() : year;
    updateProfile({
      name,
      college,
      department,
      year: finalYear,
      semester: Number(semester),
      rollNumber,
      bio,
      socialLinks: { github, linkedin, leetcode },
      skills
    });
    setSaveSuccessMsg('Student academic profile updated and persisted successfully.');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleAdminSave = (e) => {
    e.preventDefault();
    updateAdminProfile({
      name: adminName,
      college: adminCollege,
      department: adminDept,
      roleTitle: adminRoleTitle,
      email: adminEmail
    });
    setSaveSuccessMsg('Administrator governance profile updated and persisted successfully.');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleYearChange = (e) => {
    const val = e.target.value;
    if (val === 'custom') {
      setIsCustomYear(true);
      setYear('custom');
    } else {
      setIsCustomYear(false);
      setYear(val);
    }
  };

  const handleSkillLevelChange = (index, newLevel) => {
    const updated = [...skills];
    updated[index].level = Number(newLevel);
    setSkills(updated);
  };

  const handleSkillNameChange = (index, newName) => {
    const updated = [...skills];
    updated[index].name = newName;
    setSkills(updated);
  };

  const handleAddSkill = () => {
    setSkills([...skills, { name: "New Skill Domain", level: 75 }]);
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Success Notification Banner */}
      {saveSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{saveSuccessMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setSaveSuccessMsg('')}
            className="text-emerald-400 hover:text-emerald-200 text-xs font-semibold px-2 py-0.5"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Profile Overview Card */}
      <div className="surface-card p-6 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            {/* Avatar */}
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shrink-0 text-2xl font-bold font-heading border shadow-inner ${
                currentRole === 'admin'
                  ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300'
                  : 'bg-indigo-950/80 border-indigo-500/30 text-indigo-300'
              }`}
            >
              {currentRole === 'admin'
                ? (adminName ? adminName[0] : 'A')
                : (name ? name[0] : 'S')}
            </div>

            {/* Profile Meta */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white font-heading tracking-tight">
                  {currentRole === 'admin' ? (adminName || 'Institutional Administrator') : name}
                </h1>
                {currentRole === 'student' ? (
                  <span className="text-[11px] font-mono uppercase bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">
                    {(isCustomYear ? customYear : year) || studentUser.year} • Semester {semester}
                  </span>
                ) : (
                  <span className="text-[11px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                    {adminRoleTitle || 'Institutional Administration'}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 font-medium">
                {currentRole === 'admin' ? (adminDept || 'Academic & Placement Governance') : department}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Building className={`w-3.5 h-3.5 ${currentRole === 'admin' ? 'text-emerald-400' : 'text-indigo-400'}`} />
                  <span className="font-medium text-slate-200">
                    {currentRole === 'admin' ? (adminCollege || 'D. Y. Patil College Of Engineering, Akurdi') : college}
                  </span>
                </span>
                <span className="text-slate-600">•</span>
                {currentRole === 'student' ? (
                  <>
                    <span className="font-mono text-slate-400">Roll: {rollNumber}</span>
                    <span className="text-slate-600">•</span>
                    <span className="font-mono text-indigo-400 font-bold">PRS: {currentPRS}</span>
                  </>
                ) : (
                  <span className="font-mono text-slate-300">{adminEmail || 'admin@dypcoeakurdi.ac.in'}</span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Persona Switcher & Fast Save */}
          <div className="flex flex-col sm:items-end gap-2.5 self-stretch sm:self-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/[0.08]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={currentRole === 'admin' ? handleAdminSave : handleStudentSave}
                className="btn-primary text-xs flex items-center gap-1.5 py-1.5 px-3.5 shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Persona:
              </span>
              <div className="inline-flex rounded-lg bg-[#0a0c12] border border-white/[0.08] p-0.5 gap-1">
                <button
                  type="button"
                  onClick={() => {
                    switchPersona('student');
                    setActiveTab('academic');
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    currentRole === 'student'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => {
                    switchPersona('admin');
                    setActiveTab('admin');
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    currentRole === 'admin'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation - Direct Access to Student and Admin Settings */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] overflow-x-auto pb-1 text-xs">
        <button
          type="button"
          onClick={() => {
            switchPersona('student');
            setActiveTab('academic');
          }}
          className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'academic'
              ? 'border-indigo-500 text-indigo-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
          <span>Student Academic Details</span>
        </button>

        <button
          type="button"
          onClick={() => {
            switchPersona('student');
            setActiveTab('skills');
          }}
          className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'skills'
              ? 'border-indigo-500 text-indigo-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Skills & Proficiencies ({skills.length})
        </button>

        <button
          type="button"
          onClick={() => {
            switchPersona('student');
            setActiveTab('portfolio');
          }}
          className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'portfolio'
              ? 'border-indigo-500 text-indigo-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Linked Profiles
        </button>

        <button
          type="button"
          onClick={() => {
            switchPersona('student');
            setActiveTab('badges');
          }}
          className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'badges'
              ? 'border-indigo-500 text-indigo-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Milestone Badges ({studentUser.badges.length})
        </button>

        <div className="h-4 w-px bg-white/[0.1] mx-1 shrink-0"></div>

        <button
          type="button"
          onClick={() => {
            switchPersona('admin');
            setActiveTab('admin');
          }}
          className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'admin'
              ? 'border-emerald-500 text-emerald-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-emerald-300'
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Faculty & Administrator Profile</span>
        </button>

        <button
          type="button"
          onClick={() => {
            switchPersona('admin');
            setActiveTab('governance');
          }}
          className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'governance'
              ? 'border-emerald-500 text-emerald-300 font-semibold'
              : 'border-transparent text-slate-400 hover:text-emerald-300'
          }`}
        >
          Governance Scope
        </button>
      </div>

      {/* TAB CONTENT: STUDENT ACADEMIC & COLLEGE SETTINGS */}
      {currentRole === 'student' && activeTab === 'academic' && (
        <div className="surface-card p-6 sm:p-7 space-y-6">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Academic & College Information
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Modify and save your college, academic year, semester, and engineering credentials.
            </p>
          </div>

          <form onSubmit={handleStudentSave} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Full Student Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aryan Rajendra Shete"
                  className="w-full input-standard"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  University Roll Number / Student ID *
                </label>
                <input
                  type="text"
                  required
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="e.g. BEAIDA071"
                  className="w-full input-standard font-mono"
                />
              </div>
            </div>

            {/* College / University Name  */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-slate-300 font-medium">
                  College / University Name *
                </label>
                <span className="text-[11px] text-slate-400">
                  Updates across all certificates and reports
                </span>
              </div>
              <input
                type="text"
                required
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="D. Y Patil College Of Engineering, Akurdi"
                className="w-full input-standard font-medium text-slate-100"
              />
            </div>

            {/* Department / Branch */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Department / Engineering Branch *
              </label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Artificial Intelligence and Data Science"
                className="w-full input-standard"
              />
            </div>

            {/* Year of Study & Current Semester */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Year of Study *
                </label>
                <div className="space-y-2">
                  <select
                    value={isCustomYear ? 'custom' : year}
                    onChange={handleYearChange}
                    className="w-full input-standard bg-[#0c0e14]"
                  >
                    <option value="1st Year">1st Year </option>
                    <option value="2nd Year">2nd Year </option>
                    <option value="3rd Year">3rd Year </option>
                    <option value="4th Year">4th Year </option>
                    <option value="Postgraduate">Postgraduate / Masters</option>
                    <option value="custom">Other / Custom Year Format</option>
                  </select>

                  {isCustomYear && (
                    <input
                      type="text"
                      required
                      value={customYear}
                      onChange={(e) => setCustomYear(e.target.value)}
                      placeholder="Type custom year (e.g. 2nd Year, 4th Year, Final Year)"
                      className="w-full input-standard"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Current Academic Semester *
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(Number(e.target.value))}
                  className="w-full input-standard bg-[#0c0e14]"
                >
                  <option value={1}>Semester 1</option>
                  <option value={2}>Semester 2</option>
                  <option value={3}>Semester 3</option>
                  <option value={4}>Semester 4</option>
                  <option value={5}>Semester 5</option>
                  <option value={6}>Semester 6</option>
                  <option value={7}>Semester 7</option>
                  <option value={8}>Semester 8</option>
                </select>
              </div>
            </div>

            {/* Technical Bio / Career Summary */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Technical Bio & Focus Areas
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                
                className="w-full input-standard leading-relaxed"
              ></textarea>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="btn-primary text-xs flex items-center gap-2 px-5 py-2.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Academic Profile</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB CONTENT: STUDENT SKILLS & PROFICIENCIES */}
      {currentRole === 'student' && activeTab === 'skills' && (
        <div className="surface-card p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
                Technical Skill Proficiencies
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Adjust proficiency sliders or add technical proficiencies verified in course assessments.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddSkill}
              className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/30 flex items-center gap-1.5 font-medium transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill Domain</span>
            </button>
          </div>

          <div className="space-y-3">
            {skills.map((s, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#0a0c12] border border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="w-full sm:w-1/2">
                  <input
                    type="text"
                    value={s.name}
                    onChange={(e) => handleSkillNameChange(idx, e.target.value)}
                    className="w-full bg-transparent text-white text-xs font-medium focus:outline-none focus:border-b border-indigo-500"
                  />
                </div>

                <div className="w-full sm:w-1/2 flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={s.level}
                    onChange={(e) => handleSkillLevelChange(idx, e.target.value)}
                    className="flex-1 accent-indigo-500 h-1.5 cursor-pointer bg-white/[0.1] rounded-lg"
                  />
                  <span className="font-mono text-xs font-bold text-indigo-400 w-12 text-right">
                    {s.level}%
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(idx)}
                    className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                    title="Remove Skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleStudentSave}
              className="btn-primary text-xs flex items-center gap-2 px-5 py-2.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Skill Proficiencies</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: STUDENT PORTFOLIO & REPOSITORIES */}
      {currentRole === 'student' && activeTab === 'portfolio' && (
        <div className="surface-card p-6 sm:p-7 space-y-6">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Linked Version Control & Profiles
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Connect external development repositories and professional profiles.
            </p>
          </div>

          <form onSubmit={handleStudentSave} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1.5 flex items-center gap-2">
                <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
                <span>GitHub Repository Profile</span>
              </label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/username"
                className="w-full input-standard font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1.5 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>LinkedIn Professional Profile</span>
              </label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="w-full input-standard font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1.5 flex items-center gap-2">
                <Code className="w-3.5 h-3.5 text-indigo-400" />
                <span>LeetCode / Competitive Programming Handle</span>
              </label>
              <input
                type="url"
                value={leetcode}
                onChange={(e) => setLeetcode(e.target.value)}
                placeholder="https://leetcode.com/username"
                className="w-full input-standard font-mono"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="btn-primary text-xs flex items-center gap-2 px-5 py-2.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Links</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB CONTENT: STUDENT MILESTONE BADGES */}
      {currentRole === 'student' && activeTab === 'badges' && (
        <div className="surface-card p-6 sm:p-7 space-y-6">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Earned Milestone Credentials ({studentUser.badges.length})
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Badges awarded through verified milestones in coursework, contests, and faculty project audits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {studentUser.badges.map((b) => (
              <BadgeCard key={b.id} badge={b} />
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: ADMIN INSTITUTIONAL PROFILE */}
      {currentRole === 'admin' && activeTab === 'admin' && (
        <div className="surface-card p-6 sm:p-7 space-y-6">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Faculty & Institutional Administrator Profile
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Update institutional credentials, academic cell, and governance title.
            </p>
          </div>

          <form onSubmit={handleAdminSave} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Administrator Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full input-standard"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Administrative Designation / Role Title *
                </label>
                <input
                  type="text"
                  required
                  value={adminRoleTitle}
                  onChange={(e) => setAdminRoleTitle(e.target.value)}
                  className="w-full input-standard"
                />
              </div>
            </div>

            {/* Institution / College Name (Fully Editable) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-slate-300 font-medium">
                  Institution / College / University Name *
                </label>
                <span className="text-[11px] text-slate-400">
                  Campus entity for institutional governance
                </span>
              </div>
              <input
                type="text"
                required
                value={adminCollege}
                onChange={(e) => setAdminCollege(e.target.value)}
                className="w-full input-standard font-medium text-slate-100"
              />
            </div>

            {/* Academic Department / Cell */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Academic Department / Placement Cell *
              </label>
              <input
                type="text"
                required
                value={adminDept}
                onChange={(e) => setAdminDept(e.target.value)}
                className="w-full input-standard"
              />
            </div>

            {/* Official Email */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">
                Official Institutional Email Address *
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full input-standard font-mono"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="btn-primary text-xs flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Administrator Profile</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB CONTENT: ADMIN GOVERNANCE & VERIFICATION SCOPE */}
      {currentRole === 'admin' && activeTab === 'governance' && (
        <div className="surface-card p-6 sm:p-7 space-y-6">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Governance Privileges & Campus Audit Scope
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Active administrative authority assigned to {adminUser.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#0a0c12] border border-white/[0.06] space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Shield className="w-4 h-4" />
                <span>Institutional Verification Authority</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Empowered to audit student project repositories, verify technical milestones, and approve PRS practical weight credits.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0a0c12] border border-white/[0.06] space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold">
                <Building className="w-4 h-4" />
                <span>Campus Institution Oversight</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Authorized for {adminUser.college} campus management, scheduling competitive algorithmic rounds, and department curriculum indexing.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
