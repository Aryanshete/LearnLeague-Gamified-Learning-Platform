// Placement Readiness Score (PRS) Specification
// Based on Section 9 & Section 12 of LearnLeague MVP Blueprint
// Formula: PRS = sum(weight_i * score_i)

export const prsComponentWeights = [
  {
    id: "tech",
    name: "Technical Skills & Assessments",
    weight: 0.25,
    weightPct: "25%",
    description: "Evaluations from timed milestone assessments and pattern quizzes."
  },
  {
    id: "acad",
    name: "Academic Performance (CGPA)",
    weight: 0.20,
    weightPct: "20%",
    description: "Normalized cumulative grade point average (CGPA / 10 * 100)."
  },
  {
    id: "proj",
    name: "Projects & Practical Development",
    weight: 0.20,
    weightPct: "20%",
    description: "Audited and faculty-verified engineering repositories."
  },
  {
    id: "learn",
    name: "Learning Progress & Coursework",
    weight: 0.15,
    weightPct: "15%",
    description: "Completion rate of curriculum modules and active study streak."
  },
  {
    id: "contest",
    name: "Contests & Problem Solving",
    weight: 0.10,
    weightPct: "10%",
    description: "Performance and problem accuracy in timed coding competitions."
  },
  {
    id: "activity",
    name: "Professional Activities & Badges",
    weight: 0.10,
    weightPct: "10%",
    description: "Verified certificates, hackathon participations, and peer reviews."
  }
];

export const initialStudentScores = {
  tech: 85,
  acad: 88,
  proj: 80,
  learn: 75,
  contest: 70,
  activity: 75
};

export const semesterRecords = [
  { semester: "Semester 1", sgpa: 8.4, credits: 22, status: "Passed" },
  { semester: "Semester 2", sgpa: 8.6, credits: 22, status: "Passed" },
  { semester: "Semester 3", sgpa: 8.9, credits: 24, status: "Passed" },
  { semester: "Semester 4", sgpa: 8.7, credits: 24, status: "Passed" },
  { semester: "Semester 5", sgpa: 9.1, credits: 20, status: "Passed" },
  { semester: "Semester 6", sgpa: 9.2, credits: 20, status: "In Progress" }
];
