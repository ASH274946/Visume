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

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <div className="bg-background text-text-primary min-h-screen font-body-md selection:bg-primary-container/30">
        <Routes>
          <Route path="/" element={<PublicRoute><VisumeLandingPage /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><CandidateRegistration /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><VisumeLoginPage /></PublicRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><CandidateDashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<CandidateProfile />} />
          <Route path="/discover" element={<JobDiscoveryPage />} />
          <Route path="/recorder" element={<ProtectedRoute><VideoResumeRecorder /></ProtectedRoute>} />
          <Route path="/recruiter" element={<ProtectedRoute><RecruiterDashboard /></ProtectedRoute>} />
          <Route path="/pipeline" element={<ProtectedRoute><HiringPipeline /></ProtectedRoute>} />
          <Route path="/post-job" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/applications" element={<ProtectedRoute><ApplicationsTracker /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
