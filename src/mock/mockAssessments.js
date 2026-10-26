// Centralized Mock Assessments & Quiz Engine Data

export const mockAssessments = {
  "quiz-dsa-01": {
    id: "quiz-dsa-01",
    courseId: "cs-dsa-101",
    courseTitle: "Mastering Data Structures & Algorithmic Patterns",
    title: "Milestone Assessment: Two Pointers, Trees & Graph Traversals",
    durationMinutes: 15,
    totalQuestions: 5,
    passingScorePercentage: 70,
    xpReward: 150,
    badgeReward: {
      id: "b2",
      title: "DSA Pattern Ace",
      tier: "Platinum",
      icon: "trophy"
    },
    instructions: [
      "Each question carries 20 points. Passing mark is 70% (4 out of 5 correct).",
      "Timer counts down continuously. You can navigate freely between questions.",
      "Review your answers before submitting. Points and placement score will update immediately."
    ],
    questions: [
      {
        id: "q1",
        question: "Given a singly linked list, which approach detects the presence of a cycle in O(N) time and O(1) auxiliary space?",
        options: [
          { id: "a", text: "Hash Table storing visited node pointers" },
          { id: "b", text: "Floyd's Tortoise and Hare algorithm using slow and fast pointers" },
          { id: "c", text: "Recursive depth-first search marking node values" },
          { id: "d", text: "Sorting the node references in an array" }
        ],
        correctOptionId: "b",
        explanation: "Floyd's cycle-finding algorithm maintains two pointers moving at different speeds (1 step and 2 steps). If a cycle exists, they must meet within the loop using strictly O(1) space."
      },
      {
        id: "q2",
        question: "What is the worst-case time complexity of searching for an element in an unbalanced Binary Search Tree (BST) with N nodes?",
        options: [
          { id: "a", text: "O(log N)" },
          { id: "b", text: "O(N log N)" },
          { id: "c", text: "O(N)" },
          { id: "d", text: "O(1)" }
        ],
        correctOptionId: "c",
        explanation: "In the worst case (e.g. inserting already sorted numbers 1, 2, 3... into an unbalanced BST), the tree degenerates into a linear linked list where height = N, leading to O(N) search time."
      },
      {
        id: "q3",
        question: "Consider an unweighted graph with V vertices and E edges. Which traversal algorithm is guaranteed to find the shortest path between a source and destination?",
        options: [
          { id: "a", text: "Breadth-First Search (BFS)" },
          { id: "b", text: "Depth-First Search (DFS)" },
          { id: "c", text: "In-order Tree Traversal" },
          { id: "d", text: "Bellman-Ford Algorithm with negative cycles" }
        ],
        correctOptionId: "a",
        explanation: "In an unweighted graph, BFS explores nodes level by level in increasing order of distance from the source vertex, guaranteeing the shortest path with O(V + E) complexity."
      },
      {
        id: "q4",
        question: "When applying the Sliding Window pattern on an array of positive integers to find the minimal subarray length whose sum >= Target, how do the window pointers move?",
        options: [
          { id: "a", text: "Both pointers increment at every step simultaneously" },
          { id: "b", text: "Expand the right pointer until sum >= Target, then shrink left pointer while sum remains >= Target" },
          { id: "c", text: "Reset the left pointer to index 0 whenever the sum exceeds Target" },
          { id: "d", text: "Move both pointers from right to left in reverse order" }
        ],
        correctOptionId: "b",
        explanation: "The right pointer expands the window to acquire enough sum. Once the threshold is met, the left pointer shrinks the window to find the minimal valid window length before continuing."
      },
      {
        id: "q5",
        question: "Which of the following data structures is optimal for implementing Dijkstra's single-source shortest path algorithm?",
        options: [
          { id: "a", text: "Min-Heap / Priority Queue" },
          { id: "b", text: "Stack" },
          { id: "c", text: "Double-ended Queue (Deque)" },
          { id: "d", text: "Circular Linked List" }
        ],
        correctOptionId: "a",
        explanation: "A Min-Heap allows extracting the vertex with the current minimum tentative distance in O(log V) time, resulting in an overall time complexity of O((V + E) log V)."
      }
    ]
  },
  "quiz-sys-01": {
    id: "quiz-sys-01",
    courseId: "cs-sys-201",
    courseTitle: "Full-Stack System Design & Scalable Architecture",
    title: "System Design Sprint: Caching, CAP & High Availability",
    durationMinutes: 10,
    totalQuestions: 3,
    passingScorePercentage: 70,
    xpReward: 120,
    instructions: [
      "Review architectural trade-offs in distributed systems.",
      "Submit to evaluate system design readiness."
    ],
    questions: [
      {
        id: "qs1",
        question: "Under network partition in the CAP theorem, choosing Consistency (C) over Availability (A) implies:",
        options: [
          { id: "a", text: "The system returns stale data to maintain response speed" },
          { id: "b", text: "The system refuses or delays writes/reads if replicas cannot synchronize" },
          { id: "c", text: "The system shuts down all database servers immediately" },
          { id: "d", text: "The system switches automatically to peer-to-peer gossip protocol" }
        ],
        correctOptionId: "b",
        explanation: "When partitions occur, a CP system guarantees all read clients see the same data by rejecting requests if consensus cannot be verified."
      },
      {
        id: "qs2",
        question: "Which cache eviction policy discards the items that have not been accessed for the longest period of time?",
        options: [
          { id: "a", text: "LFU (Least Frequently Used)" },
          { id: "b", text: "FIFO (First In First Out)" },
          { id: "c", text: "LRU (Least Recently Used)" },
          { id: "d", text: "Random Replacement" }
        ],
        correctOptionId: "c",
        explanation: "LRU tracks access recency, evicting the least recently accessed item when the cache capacity is exhausted."
      },
      {
        id: "qs3",
        question: "What pattern solves the 'dual-write' problem between a database and a message broker (e.g. Kafka)?",
        options: [
          { id: "a", text: "Transactional Outbox Pattern" },
          { id: "b", text: "Singleton Pattern" },
          { id: "c", text: "Proxy Pattern" },
          { id: "d", text: "Circuit Breaker Pattern" }
        ],
        correctOptionId: "a",
        explanation: "The Transactional Outbox pattern writes domain entities and an outbox event in the same atomic database transaction, ensuring events are reliably dispatched."
      }
    ]
  }
};
