import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VisumeLandingPage from './pages/VisumeLandingPage';
import CandidateDashboard from './pages/CandidateDashboard';
import VideoResumeRecorder from './pages/VideoResumeRecorder';
import JobDiscoveryPage from './pages/JobDiscoveryPage';
import RecruiterDashboard from './pages/RecruiterDashboard';
import HiringPipeline from './pages/HiringPipeline';
import CandidateRegistration from './pages/CandidateRegistration';
import CandidateProfile from './pages/CandidateProfile';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VisumeLandingPage />} />
        <Route path="/register" element={<CandidateRegistration />} />
        <Route path="/dashboard" element={<CandidateDashboard />} />
        <Route path="/profile" element={<CandidateProfile />} />
        <Route path="/recorder" element={<VideoResumeRecorder />} />
        <Route path="/discover" element={<JobDiscoveryPage />} />
        <Route path="/recruiter" element={<RecruiterDashboard />} />
        <Route path="/pipeline" element={<HiringPipeline />} />
      </Routes>
    </Router>
  );
}

export default App;
