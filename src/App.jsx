import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import FeaturesPage from './pages/FeaturesPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import AppLayout from './components/AppLayout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import CoursesPage from './pages/CoursesPage.jsx';
import CourseDetailPage from './pages/CourseDetailPage.jsx';
import AssessmentPage from './pages/AssessmentPage.jsx';
import ContestsPage from './pages/ContestsPage.jsx';
import LeaderboardPage from './pages/LeaderboardPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import OpportunitiesPage from './pages/OpportunitiesPage.jsx';
import CommunityPage from './pages/CommunityPage.jsx';
import AcademicsPage from './pages/AcademicsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminCourses from './pages/admin/AdminCourses.jsx';
import AdminContests from './pages/admin/AdminContests.jsx';
import AdminAnalytics from './pages/admin/AdminAnalytics.jsx';

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />

      {/* Authenticated Prototype Journeys */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Learning & Courses */}
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />

        {/* Milestone Assessments & Quizzes */}
        <Route path="/assessments/:id" element={<AssessmentPage />} />

        {/* Competitions & Rankings */}
        <Route path="/contests" element={<ContestsPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />

        {/* Portfolio & Opportunities */}
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/opportunities" element={<OpportunitiesPage />} />

        {/* Campus Community */}
        <Route path="/community" element={<CommunityPage />} />

        {/* Academics & Placement Readiness Score (PRS) */}
        <Route path="/academics" element={<AcademicsPage />} />
        <Route path="/readiness" element={<AcademicsPage />} />

        {/* Student Profile */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* Institutional Administration Subroutes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/contests" element={<AdminContests />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
      </Route>

      {/* Catch-all redirect to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
