// Scheduled Competitions

export const mockContests = [
  {
    id: "contest-algosprint",
    title: "Algorithmic Sprint #1",
    status: "live",
    startTime: "Active Now",
    endTime: "Ends in 1 hour",
    duration: "2 Hours",
    difficulty: "Medium",
    totalQuestions: 4,
    xpReward: 200,
    isRegistered: true,
    organizer: "Department of Computer Science",
    description: "Timed problem-solving round covering graph traversals, two-pointer arrays, and greedy algorithms.",
    rules: [
      "Submissions are automatically tested against boundary and edge test cases.",
      "Time penalty applies for incorrect attempts.",
      "Strict plagiarism verification across all submitted solutions."
    ]
  },
  {
    id: "contest-system-sprint",
    title: "System Design Evaluation",
    status: "upcoming",
    startTime: "Saturday, 2:00 PM",
    endTime: "Saturday, 4:00 PM",
    duration: "2 Hours",
    difficulty: "Hard",
    totalQuestions: 2,
    xpReward: 250,
    isRegistered: false,
    organizer: "Engineering Academic Cell",
    description: "Structured architecture evaluation focusing on rate limiting, schema sharding, and messaging queues.",
    rules: [
      "Written schema and architectural diagram submission required.",
      "Single attempt evaluation."
    ]
  },
  {
    id: "contest-sql-challenge",
    title: "SQL & Query Optimization",
    status: "upcoming",
    startTime: "Next Wednesday, 6:00 PM",
    endTime: "Next Wednesday, 7:30 PM",
    duration: "1.5 Hours",
    difficulty: "Medium",
    totalQuestions: 5,
    xpReward: 150,
    isRegistered: false,
    organizer: "Database Systems Lab",
    description: "Write high-performance window functions, recursive CTEs, and query plans.",
    rules: [
      "Execution time on Postgres test instance determines score ordering."
    ]
  }
];
