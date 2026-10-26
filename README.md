# LearnLeague — College Learning, Competitions & Placement-Readiness Platform


LearnLeague consolidates university coursework, timed milestone assessments, peer knowledge sharing, student project verification, and a normalized **Placement Readiness Score (PRS)** calculator into one unified platform.

---

## ⚡ Tech Stack

- **Core & Logic**: React 19 + Modern JavaScript (ES6+ JSX, zero TypeScript)
- **Styling**: Tailwind CSS v4 with bespoke obsidian/zinc SaaS tokens
- **Routing**: React Router v7 (`react-router-dom`)
- **Icons**: Lucide React
- **Evaluation Celebration**: Canvas Confetti
- **State & Engine**: Centralized reactive React Context (`AppContext.jsx`) with dynamic mathematical PRS calculator

---

## 🚀 Quick Setup & Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Local Server
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 🧭 Implemented Modules & Workflows

| Route | Functional Scope |
|---|---|
| `/` | **Public Overview**: Feature directory and instant navigation into student and faculty workflows. |
| `/features` | **System Specification**: Architectural overview of all 6 platform pillars. |
| `/login` & `/register` | **Authentication Gateway**: 1-Click fast access for **Student** and **Faculty Admin** test personas. |
| `/dashboard` | **Student Workspace**: Quick workflow shortcuts, active course syllabi, scheduled contests, and live PRS score indicator. |
| `/courses` | **Course Catalogue**: Search and category filters (DSA, System Design, DevOps), difficulty badges, and course modules. |
| `/courses/:id` | **Syllabus & Lesson Drawer**: Collapsible module curriculum with code snippet drawer and milestone evaluation launcher. |
| `/assessments/:id` | **Milestone Assessment Engine**: Timed single-choice quiz with countdown timer, question palette, confirmation dialog, instant grading, and detailed question explanations. |
| `/contests` | **Coding Competitions**: Live and upcoming contest schedules with rules modal and one-click registration toggle. |
| `/leaderboard` | **Ranking System**: Filter by College, Branch, and Overall standings with current user highlight. |
| `/projects` | **Project Portfolio**: Repository manager with GitHub/demo links, audit status badges, and interactive project submission modal. |
| `/opportunities` | **Opportunities Board**: Technical internships, hackathons, and research roles filtered by student PRS eligibility. |
| `/community` | **Discussion Board**: Filter by technical channels, publish new topics, reactive upvoting, and threaded replies. |
| `/readiness` & `/academics` | **Interactive PRS Calculator**: Real-time slider engine implementing the blueprint formula: `PRS = Σ(w_i × s_i)` across Technical (25%), Academics (20%), Projects (20%), Coursework (15%), Contests (10%), and Activities (10%). Includes 6-semester SGPA records. |
| `/profile` | **Profile Settings**: Academic credentials, verified skill proficiencies, milestone badges, and live editable profile modal. |
| `/admin` & `/admin/*` | **Faculty Governance**: Active **Student Project Verification Queue** with one-click **"Approve Claim"** action, course publishing modal, contest scheduler, and departmental analytics. |
