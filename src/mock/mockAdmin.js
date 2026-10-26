// Admin & Faculty Oversight Models

export const mockPendingVerifications = [
  {
    id: "verif-1",
    studentName: "Aryan Rajendra Shete",
    rollNumber: "BEAIDA071",
    projectTitle: "Placement Readiness Analyzer",
    category: "Web & Analytics",
    githubUrl: "https://github.com/example/readiness-analyzer",
    liveDemo: "https://analyzer.example.com",
    claimedPrs: "+3.5 Points",
    status: "Pending"
  },
  {
    id: "verif-2",
    studentName: "Samruddhi Bhagwat",
    rollNumber: "BEAIDA067",
    projectTitle: "Real-Time Traffic Violation Detection using AI",
    category: "Machine Learning & Data Analysis",
    githubUrl: "https://github.com/example/encrypted-files",
    liveDemo: "https://files.example.com",
    claimedPrs: "+3.0 Points",
    status: "Pending"
  }
];

export const mockAdminCourses = [
  {
    id: "cs-dsa-101",
    title: "Data Structures & Algorithmic Patterns",
    category: "Data Structures",
    instructor: "Prof. Arvind Rao",
    status: "Published",
    enrolledCount: 140,
    modulesCount: 2
  },
  {
    id: "cs-sys-201",
    title: "Distributed System Design Fundamentals",
    category: "System Design",
    instructor: "Neha Sundaram",
    status: "Published",
    enrolledCount: 95,
    modulesCount: 2
  },
  {
    id: "cs-cloud-301",
    title: "Cloud Infrastructure & Containerization",
    category: "DevOps",
    instructor: "Marcus Vance",
    status: "Draft",
    enrolledCount: 0,
    modulesCount: 1
  }
];

export const departmentStats = [
  { department: "Artificial Intelligence", enrolled: 200, avgPrs: 85.0 },
  { department: "Computer Science", enrolled: 320, avgPrs: 81.2 },
  { department: "Information Tech", enrolled: 220, avgPrs: 78.4 },
  { department: "Electronics & Comm", enrolled: 280, avgPrs: 72.0 }
];
