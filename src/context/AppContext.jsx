import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { mockUsers, mockNotifications as initialNotifications } from '../mock/mockAuth.js';
import { mockCourses as initialCourses } from '../mock/mockCourses.js';
import { mockAssessments } from '../mock/mockAssessments.js';
import { mockContests as initialContests } from '../mock/mockContests.js';
import { mockProjects as initialProjects } from '../mock/mockProjects.js';
import { mockOpportunities as initialOpportunities } from '../mock/mockOpportunities.js';
import { mockCommunityPosts as initialPosts } from '../mock/mockCommunity.js';
import { prsComponentWeights, initialStudentScores, semesterRecords } from '../mock/mockReadiness.js';
import { mockPendingVerifications as initialVerifications } from '../mock/mockAdmin.js';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Current active persona ('student' or 'admin')
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('ll_role') || 'student';
  });

  // Persistent student state with auto-migration from any legacy dummy data
  const [studentUser, setStudentUser] = useState(() => {
    const saved = localStorage.getItem('ll_student');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Automatically migrate if localStorage held the old Alex Morgan placeholder
        if (parsed && parsed.name && parsed.name !== 'Alex Morgan' && parsed.rollNumber !== 'CS-2023-084') {
          return {
            ...mockUsers.student,
            ...parsed
          };
        }
      } catch (e) { /* ignore */ }
    }
    localStorage.setItem('ll_student', JSON.stringify(mockUsers.student));
    return mockUsers.student;
  });

  // Persistent admin state
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('ll_admin');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    localStorage.setItem('ll_admin', JSON.stringify(mockUsers.admin));
    return mockUsers.admin;
  });

  useEffect(() => {
    localStorage.setItem('ll_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('ll_student', JSON.stringify(studentUser));
  }, [studentUser]);

  useEffect(() => {
    localStorage.setItem('ll_admin', JSON.stringify(adminUser));
  }, [adminUser]);

  // Load disk-persisted profile data on initialization
  useEffect(() => {
    fetch('/api/profile')
      .then((res) => {
        if (!res.ok) throw new Error('API not available');
        return res.json();
      })
      .then((data) => {
        if (data && data.studentUser && data.studentUser.name) {
          setStudentUser(data.studentUser);
          localStorage.setItem('ll_student', JSON.stringify(data.studentUser));
        }
        if (data && data.adminUser && data.adminUser.name) {
          setAdminUser(data.adminUser);
          localStorage.setItem('ll_admin', JSON.stringify(data.adminUser));
        }
      })
      .catch(() => {
        // Fallback gracefully to localStorage or bundled JSON
      });
  }, []);

  // App collections
  const [courses, setCourses] = useState(initialCourses);
  const [contests, setContests] = useState(initialContests);
  const [projects, setProjects] = useState(initialProjects);
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [posts, setPosts] = useState(initialPosts);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [pendingVerifications, setPendingVerifications] = useState(initialVerifications);

  // Dynamic PRS Component Scores (0 - 100)
  const [prsScores, setPrsScores] = useState(initialStudentScores);

  // Quiz state
  const [quizResults, setQuizResults] = useState({});

  // Active user depending on role
  const currentUser = currentRole === 'admin' ? adminUser : studentUser;

  // Calculate PRS from exact blueprint formula: PRS = sum(w_i * s_i)
  const calculatePRS = (scoresObj) => {
    let sum = 0;
    prsComponentWeights.forEach((comp) => {
      const score = scoresObj[comp.id] !== undefined ? scoresObj[comp.id] : 75;
      sum += comp.weight * score;
    });
    return Number(sum.toFixed(1));
  };

  const currentPRS = calculatePRS(prsScores);

  // Update component score directly (interactive calculator)
  const setComponentScore = (compId, newScore) => {
    const val = Math.max(0, Math.min(100, Number(newScore)));
    setPrsScores((prev) => ({
      ...prev,
      [compId]: val
    }));
  };

  const switchPersona = (role) => {
    setCurrentRole(role);
  };

  // Student profile update handler - updates ALL academic & personal fields and persists to disk
  const updateProfile = (updates) => {
    setStudentUser((prev) => {
      const nextUser = {
        ...prev,
        ...updates,
        socialLinks: { ...prev.socialLinks, ...(updates.socialLinks || {}) },
        skills: updates.skills || prev.skills
      };
      localStorage.setItem('ll_student', JSON.stringify(nextUser));
      // Persist permanently to disk via /api/profile
      fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentUser: nextUser })
      }).catch(() => {});
      return nextUser;
    });
  };

  // Admin profile update handler - updates ALL institution & admin fields and persists to disk
  const updateAdminProfile = (updates) => {
    setAdminUser((prev) => {
      const nextAdmin = {
        ...prev,
        ...updates
      };
      localStorage.setItem('ll_admin', JSON.stringify(nextAdmin));
      // Persist permanently to disk via /api/profile
      fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminUser: nextAdmin })
      }).catch(() => {});
      return nextAdmin;
    });
  };

  const toggleEnrollCourse = (courseId) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const newStatus = !c.isEnrolled;
          return {
            ...c,
            isEnrolled: newStatus,
            progress: newStatus ? (c.progress || 10) : 0
          };
        }
        return c;
      })
    );
  };

  const markLessonComplete = (courseId, lessonId) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const updatedModules = c.modules.map((m) => ({
            ...m,
            lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, completed: true } : l))
          }));
          return {
            ...c,
            modules: updatedModules,
            progress: Math.min(100, (c.progress || 0) + 20)
          };
        }
        return c;
      })
    );
  };

  const submitQuiz = (quizId, scorePercentage, correctCount, totalCount) => {
    const passed = scorePercentage >= 70;
    const xpEarned = passed ? 100 : 25;

    if (passed) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    setQuizResults((prev) => ({
      ...prev,
      [quizId]: {
        scorePercentage,
        correctCount,
        totalCount,
        passed,
        xpEarned,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    }));

    // Award XP
    setStudentUser((prev) => ({
      ...prev,
      points: prev.points + xpEarned
    }));

    // Update technical score in PRS formula dynamically
    setPrsScores((prev) => ({
      ...prev,
      tech: Math.min(100, prev.tech + (passed ? 5 : 1))
    }));

    const newNotif = {
      id: `notif_${Date.now()}`,
      title: `Assessment Submitted (+${xpEarned} XP)`,
      message: `Score: ${scorePercentage}%. Technical PRS component updated.`,
      time: 'Just now',
      read: false,
      type: 'assessment'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return { passed, xpEarned };
  };

  const toggleRegisterContest = (contestId) => {
    setContests((prev) =>
      prev.map((c) => (c.id === contestId ? { ...c, isRegistered: !c.isRegistered } : c))
    );
  };

  const addProject = (projectData) => {
    const newProj = {
      id: `proj-${Date.now()}`,
      verificationStatus: 'Under Review',
      reviewer: 'Faculty Reviewer',
      verifiedDate: 'Submitted',
      featured: false,
      ...projectData
    };
    setProjects((prev) => [newProj, ...prev]);

    const adminQueueItem = {
      id: `verif-${Date.now()}`,
      studentName: studentUser.name,
      rollNumber: studentUser.rollNumber,
      projectTitle: projectData.title,
      category: 'Software Project',
      githubUrl: projectData.githubUrl,
      liveDemo: projectData.liveDemoUrl,
      claimedPrs: '+4.0 Points',
      status: 'Pending'
    };
    setPendingVerifications((prev) => [adminQueueItem, ...prev]);
  };

  const approveVerification = (verifId) => {
    let approvedTitle = '';
    setPendingVerifications((prev) =>
      prev.map((item) => {
        if (item.id === verifId) {
          approvedTitle = item.projectTitle;
          return { ...item, status: 'Approved' };
        }
        return item;
      })
    );

    // Update student projects status
    setProjects((prev) =>
      prev.map((p) =>
        p.title === approvedTitle ? { ...p, verificationStatus: 'Verified' } : p
      )
    );

    // Boost practical development score in PRS
    setPrsScores((prev) => ({
      ...prev,
      proj: Math.min(100, prev.proj + 5)
    }));

    const notif = {
      id: `notif_${Date.now()}`,
      title: 'Project Verified by Faculty',
      message: 'Practical Development component in PRS updated.',
      time: 'Just now',
      read: false,
      type: 'project'
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const toggleApplyOpportunity = (oppId) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === oppId ? { ...o, applied: !o.applied } : o))
    );
  };

  const toggleUpvotePost = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const hasUpvoted = !p.hasUpvoted;
          return {
            ...p,
            hasUpvoted,
            upvotes: hasUpvoted ? p.upvotes + 1 : p.upvotes - 1
          };
        }
        return p;
      })
    );
  };

  const addCommunityPost = ({ title, category, content, tags }) => {
    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        name: currentUser.name,
        role: currentRole === 'admin' ? 'Faculty Admin' : `${studentUser.year} • ${studentUser.department}`,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'
      },
      title,
      category,
      content,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      upvotes: 0,
      hasUpvoted: false,
      commentsCount: 0,
      timeAgo: 'Just now',
      comments: []
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const addCommentToPost = (postId, commentText) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            author: {
              name: currentUser.name,
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'
            },
            timeAgo: 'Just now',
            content: commentText
          };
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [...(p.comments || []), newComment]
          };
        }
        return p;
      })
    );
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        switchPersona,
        currentUser,
        studentUser,
        adminUser,
        updateProfile,
        updateAdminProfile,

        // Learning & Courses
        courses,
        toggleEnrollCourse,
        markLessonComplete,

        // Assessments & Quizzes
        quizResults,
        submitQuiz,

        // Contests & Sprints
        contests,
        toggleRegisterContest,

        // Projects & Portfolio
        projects,
        addProject,
        pendingVerifications,
        approveVerification,

        // Opportunities
        opportunities,
        toggleApplyOpportunity,

        // Community
        posts,
        toggleUpvotePost,
        addCommunityPost,
        addCommentToPost,

        // Dynamic PRS Calculator & Academics
        prsComponentWeights,
        prsScores,
        setComponentScore,
        currentPRS,
        semesterRecords,

        // Notifications
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount: notifications.filter((n) => !n.read).length
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
