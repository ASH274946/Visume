import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import VisumeLandingPage from './pages/VisumeLandingPage';
import CandidateDashboard from './pages/CandidateDashboard';
import VideoResumeRecorder from './pages/VideoResumeRecorder';
import JobDiscoveryPage from './pages/JobDiscoveryPage';
import RecruiterDashboard from './pages/RecruiterDashboard';
import HiringPipeline from './pages/HiringPipeline';
import CandidateRegistration from './pages/CandidateRegistration';
import CandidateProfile from './pages/CandidateProfile';
import VisumeLoginPage from './pages/VisumeLoginPage';
import PostJob from './pages/PostJob';
import SettingsPage from './pages/SettingsPage';
import ApplicationsTracker from './pages/ApplicationsTracker';
import HowItWorksPage from './pages/HowItWorksPage';
import PricingPage from './pages/PricingPage';
import AboutUsPage from './pages/AboutUsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import './index.css';

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ redirectTo: location.pathname }} replace />;
  }
  return children;
}

function PublicRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const role = localStorage.getItem('visume_role') || 'candidate';

  if (isLoggedIn) {
    return <Navigate to={role === 'recruiter' ? "/recruiter" : "/dashboard"} replace />;
  }
  return children;
}

import DashboardLayout from './components/DashboardLayout';

import FindCandidatesPage from './pages/FindCandidatesPage';

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('visume_theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  return (
    <Router>
      <div className="bg-background text-text-primary min-h-screen font-body-md selection:bg-primary-container/30">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<PublicRoute><VisumeLandingPage /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><CandidateRegistration /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><VisumeLoginPage /></PublicRoute>} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />

          {/* Protected Dashboard Pages with Static Sidebar and Navbar */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<ProtectedRoute><CandidateDashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<CandidateProfile />} />
            <Route path="/discover" element={<ProtectedRoute><JobDiscoveryPage /></ProtectedRoute>} />
            <Route path="/recorder" element={<ProtectedRoute><VideoResumeRecorder /></ProtectedRoute>} />
            <Route path="/recruiter" element={<ProtectedRoute><RecruiterDashboard /></ProtectedRoute>} />
            <Route path="/pipeline" element={<ProtectedRoute><HiringPipeline /></ProtectedRoute>} />
            <Route path="/post-job" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
            <Route path="/find-candidates" element={<ProtectedRoute><FindCandidatesPage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/applications" element={<ProtectedRoute><ApplicationsTracker /></ProtectedRoute>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
