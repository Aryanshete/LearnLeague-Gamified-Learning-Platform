// Community Forum Topics & Discussion Feed

export const mockCommunityPosts = [
  {
    id: "post-1",
    author: {
      name: "Riya Sen",
      role: "Student (CSE)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
    },
    title: "Key Algorithmic Patterns Tested in Software Engineering Rounds",
    category: "Data Structures",
    content: "When preparing for technical assessments, focus on Two Pointers for array partitioning and BFS/DFS for graph connectivity. Edge case validation on null and empty inputs is essential.",
    tags: ["DSA", "Algorithms", "Preparation"],
    upvotes: 12,
    hasUpvoted: false,
    commentsCount: 2,
    timeAgo: "2 hours ago",
    comments: [
      {
        id: "c-1",
        author: {
          name: "Aryan Rajendra Shete",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120"
        },
        timeAgo: "1 hour ago",
        content: "Good summary. Tree depth recursion limits should also be checked."
      }
    ]
  },
  {
    id: "post-2",
    author: {
      name: "Prof. Arvind Rao",
      role: "Faculty Advisor",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
    },
    title: "Semester Project Verification Guidelines",
    category: "Projects",
    content: "Repositories submitted for faculty verification must include a README with setup instructions, Dockerfile if applicable, and passing automated test suites.",
    tags: ["Academics", "Verification", "Guidelines"],
    upvotes: 24,
    hasUpvoted: true,
    commentsCount: 1,
    timeAgo: "Yesterday",
    comments: []
  }
];

export const mockCategories = [
  "All Topics",
  "Data Structures",
  "System Design",
  "Projects",
  "Announcements"
];
