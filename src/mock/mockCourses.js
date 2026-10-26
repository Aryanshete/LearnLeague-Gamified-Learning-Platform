// Structured Course Curriculum Models

export const mockCourses = [
  {
    id: "cs-dsa-101",
    title: "Data Structures & Algorithmic Patterns",
    category: "Data Structures",
    level: "Intermediate",
    instructor: "Prof. Arvind Rao",
    estimatedHours: 30,
    progress: 60,
    isEnrolled: true,
    assessmentId: "quiz-dsa-01",
    description: "Covers Two-Pointer traversal, Sliding Window bounds, Binary Trees, and Graph search patterns with complexity analysis.",
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Linear Arrays & Pointers",
        completed: true,
        lessons: [
          { id: "les-1-1", title: "Time and Space Complexity Principles", duration: "25 min", type: "theory", completed: true, content: "Big-O notation, memory hierarchies, and worst vs amortized complexity." },
          { id: "les-1-2", title: "Two Pointers Strategy", duration: "35 min", type: "code", completed: true, content: "Opposite-end and fast-slow pointer traversals for partitions and cycles." },
          { id: "les-1-3", title: "Sliding Window Bounds", duration: "40 min", type: "code", completed: true, content: "Fixed vs dynamic window expansion for optimal subarray solutions." }
        ]
      },
      {
        id: "mod-2",
        title: "Module 2: Hierarchical Trees & Graphs",
        completed: false,
        lessons: [
          { id: "les-2-1", title: "Binary Search Tree Invariants", duration: "40 min", type: "theory", completed: true, content: "In-order traversal, search, insertion, and tree balancing invariants." },
          { id: "les-2-2", title: "BFS and DFS State Space Search", duration: "50 min", type: "code", completed: false, content: "Queue-based breadth-first and recursive depth-first graph traversal." }
        ]
      }
    ],
    prerequisites: ["Proficiency in C++, Java, or Python", "Basic discrete mathematics"],
    learningOutcomes: [
      "Analyze algorithmic time and space trade-offs",
      "Implement core graph and tree traversal routines",
      "Pass the milestone evaluation to unlock placement points"
    ]
  },
  {
    id: "cs-sys-201",
    title: "Distributed System Design Fundamentals",
    category: "System Design",
    level: "Advanced",
    instructor: "Neha Sundaram",
    estimatedHours: 25,
    progress: 20,
    isEnrolled: true,
    assessmentId: "quiz-sys-01",
    description: "Architectural patterns for high availability: Caching tiers, CAP theorem trade-offs, and asynchronous event processing.",
    modules: [
      {
        id: "mod-sys-1",
        title: "Module 1: Scalability & Caching",
        completed: true,
        lessons: [
          { id: "les-s1-1", title: "Load Balancing & Horizontal Scaling", duration: "30 min", type: "theory", completed: true, content: "Stateless application tiers, reverse proxies, and health checking." },
          { id: "les-s1-2", title: "Cache Eviction and Consistency", duration: "40 min", type: "code", completed: false, content: "Cache-aside vs write-through patterns, LRU eviction, and TTL strategies." }
        ]
      }
    ],
    prerequisites: ["Understanding of HTTP, client-server models, and SQL databases"],
    learningOutcomes: [
      "Evaluate consistency vs availability trade-offs in distributed services",
      "Design multi-tier caching architectures with invalidation strategies"
    ]
  },
  {
    id: "cs-cloud-301",
    title: "Cloud Infrastructure & Containerization",
    category: "DevOps & Cloud",
    level: "Intermediate",
    instructor: "Marcus Vance",
    estimatedHours: 20,
    progress: 0,
    isEnrolled: false,
    assessmentId: "quiz-dsa-01",
    description: "Docker multi-stage builds, container isolation, and automated CI/CD pipeline configuration.",
    modules: [
      {
        id: "mod-cloud-1",
        title: "Module 1: Container Workflows",
        completed: false,
        lessons: [
          { id: "les-c1-1", title: "Multi-stage Dockerfiles", duration: "35 min", type: "code", completed: false, content: "Optimizing image layer caching and creating minimal runtime artifacts." }
        ]
      }
    ],
    prerequisites: ["Command line basics and Git version control"],
    learningOutcomes: [
      "Author secure, multi-stage Docker build files",
      "Automate testing and deployment pipelines"
    ]
  }
];
