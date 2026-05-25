import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomVideoPlayer from '../components/CustomVideoPlayer';


const Header = ({ onNotifications, onRecordVideo }) => {
  return (
    <header className="flex justify-between items-center mb-xl">
      <div className="flex items-center gap-4">
        <h1 className="font-display text-headline-lg text-text-primary">Welcome back, Ashwin</h1>
        <span className="flex items-center gap-1 bg-tertiary-container/15 text-tertiary px-3 py-1 rounded-full text-[12px] font-bold border border-tertiary/20">
          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          KYC Verified
        </span>
      </div>
      <div className="flex gap-4">
        <button onClick={onRecordVideo} className="bg-primary-container text-white px-lg py-3 rounded-lg font-bold hover:shadow-[0_0_15px_rgba(108,92,231,0.4)] active:scale-95 transition-all">
          Record New Visume
        </button>
      </div>
    </header>
  );
};

const StatsRow = () => (
  <section className="grid grid-cols-1 md:grid-cols-4 gap-md mb-xl">
    <div className="bg-card-bg border border-outline-variant p-md rounded-xl hover:border-primary-container/50 hover:-translate-y-1 transition-all group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-primary-container text-[36px] font-display font-bold">12</span>
        <span className="material-symbols-outlined text-text-muted group-hover:text-primary-container">send</span>
      </div>
      <p className="text-text-muted font-body-sm">Jobs Applied</p>
    </div>
    <div className="bg-card-bg border border-outline-variant p-md rounded-xl hover:border-primary-container/50 hover:-translate-y-1 transition-all group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-primary-container text-[36px] font-display font-bold">284</span>
        <span className="material-symbols-outlined text-text-muted group-hover:text-primary-container">visibility</span>
      </div>
      <p className="text-text-muted font-body-sm">Profile Views</p>
    </div>
    <div className="bg-card-bg border border-outline-variant p-md rounded-xl hover:border-primary-container/50 hover:-translate-y-1 transition-all group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-primary-container text-[36px] font-display font-bold">3</span>
        <span className="material-symbols-outlined text-text-muted group-hover:text-primary-container">call</span>
      </div>
      <p className="text-text-muted font-body-sm">Interview Calls</p>
    </div>
    <div className="bg-card-bg border border-outline-variant p-md rounded-xl hover:border-primary-container/50 hover:-translate-y-1 transition-all group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-secondary text-[36px] font-display font-bold">97%</span>
        <span className="material-symbols-outlined text-text-muted group-hover:text-secondary">psychology</span>
      </div>
      <p className="text-text-muted font-body-sm">Top Match</p>
    </div>
  </section>
);

const VideoResumesSection = ({ resumes, onPlayVideo }) => {
  if (!resumes || resumes.length === 0) {
    return (
      <section className="bg-card-bg border border-outline-variant rounded-xl p-lg mb-xl flex flex-col items-center justify-center text-center py-12">
        <span className="material-symbols-outlined text-5xl text-text-muted mb-4">videocam_off</span>
        <h2 className="font-display text-headline-md text-text-primary mb-2">No Video Resumes Yet</h2>
        <p className="text-text-muted font-body-sm mb-6 max-w-md">Record your first Visume to stand out to employers and increase your match rate.</p>
        <Link to="/recorder" className="bg-primary-container text-white px-6 py-3 rounded-lg font-bold hover:brightness-110 transition-all shadow-lg shadow-primary-container/20">
          Record Now
        </Link>
      </section>
    );
  }

  return (
    <section className="mb-xl">
      <div className="flex justify-between items-end mb-lg">
        <h2 className="font-display text-headline-md text-text-primary">My Video Resumes</h2>
        <Link className="text-primary-container font-label-md text-label-md hover:underline" to="/recorder">Manage Library</Link>
      </div>
      <div className="flex gap-lg overflow-x-auto custom-scrollbar pb-4 -mx-2 px-2 snap-x">
        {resumes.map(resume => (
          <div key={resume.id} onClick={() => onPlayVideo(resume)} className="w-[300px] md:w-[400px] flex-none bg-card-bg border border-outline-variant rounded-xl p-md snap-start hover:border-primary-container transition-all group cursor-pointer">
            <div className="w-full aspect-video rounded-lg overflow-hidden relative border border-outline-variant mb-4">
              {resume.videoUrl ? (
                <video className="w-full h-full object-cover pointer-events-none" src={resume.videoUrl} preload="metadata" muted playsInline />
              ) : (
                <img alt={resume.title} className="w-full h-full object-cover pointer-events-none" src={resume.thumbnailUrl} />
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[11px] font-bold text-white">
                {resume.duration}
              </div>
            </div>
            <div>
              <h3 className="font-display text-headline-sm text-text-primary truncate">{resume.title}</h3>
              <div className="flex justify-between text-text-muted font-body-sm mt-2">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">calendar_month</span> {resume.date}</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">visibility</span> {resume.views} Views</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const RecommendedJobs = ({ onApplyJob }) => (
  <section>
    <div className="flex justify-between items-end mb-lg">
      <h2 className="font-display text-headline-md text-text-primary">Recommended for You</h2>
      <Link className="text-primary-container font-label-md text-label-md hover:underline" to="/discover">View All Openings</Link>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
      <div className="bg-card-bg border border-border-base rounded-xl p-lg hover:border-primary-container transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full bg-surface-bright/20 flex items-center justify-center border border-outline-variant overflow-hidden">
              <img alt="Company Logo" className="w-full h-full object-cover" src="https://logo.clearbit.com/spotify.com" />
            </div>
            <div>
              <h3 className="font-display text-headline-sm text-text-primary">Lead UI Designer</h3>
              <p className="text-text-muted text-label-md">Stellar AI Solutions</p>
            </div>
          </div>
          <div className="bg-secondary/10 text-secondary px-3 py-1.5 rounded-full flex flex-col items-center">
            <span className="text-[18px] font-bold">98%</span>
            <span className="text-[8px] uppercase font-bold">Match</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 rounded-full bg-surface-container-high text-text-muted text-[12px] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">location_on</span> San Francisco
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-container-high text-text-muted text-[12px] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">home_work</span> Remote
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-container-high text-text-muted text-[12px] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">payments</span> $140k - $180k
          </span>
        </div>
        <div className="flex gap-2 mb-6">
          <span className="bg-border-base text-text-muted px-3 py-1 rounded-full text-[11px] font-medium border border-outline-variant/30">Figma</span>
          <span className="bg-border-base text-text-muted px-3 py-1 rounded-full text-[11px] font-medium border border-outline-variant/30">Product Strategy</span>
          <span className="bg-border-base text-text-muted px-3 py-1 rounded-full text-[11px] font-medium border border-outline-variant/30">Design Systems</span>
        </div>
        <button onClick={() => onApplyJob('Lead UI Designer', 'Stellar AI Solutions')} className="w-full bg-primary-container text-white py-3 rounded-lg font-bold hover:bg-on-primary-fixed-variant active:scale-95 transition-all">
          Apply Now
        </button>
      </div>

      <div className="bg-card-bg border border-border-base rounded-xl p-lg hover:border-primary-container transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full bg-surface-bright/20 flex items-center justify-center border border-outline-variant overflow-hidden">
              <img alt="Company Logo" className="w-full h-full object-cover" src="https://logo.clearbit.com/airbnb.com" />
            </div>
            <div>
              <h3 className="font-display text-headline-sm text-text-primary">Product Manager</h3>
              <p className="text-text-muted text-label-md">Nexus Creative</p>
            </div>
          </div>
          <div className="bg-secondary/10 text-secondary px-3 py-1.5 rounded-full flex flex-col items-center">
            <span className="text-[18px] font-bold">92%</span>
            <span className="text-[8px] uppercase font-bold">Match</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 rounded-full bg-surface-container-high text-text-muted text-[12px] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">location_on</span> New York
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-container-high text-text-muted text-[12px] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">apartment</span> Hybrid
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-container-high text-text-muted text-[12px] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">payments</span> $120k - $160k
          </span>
        </div>
        <div className="flex gap-2 mb-6">
          <span className="bg-border-base text-text-muted px-3 py-1 rounded-full text-[11px] font-medium border border-outline-variant/30">Agile</span>
          <span className="bg-border-base text-text-muted px-3 py-1 rounded-full text-[11px] font-medium border border-outline-variant/30">Data Analysis</span>
          <span className="bg-border-base text-text-muted px-3 py-1 rounded-full text-[11px] font-medium border border-outline-variant/30">User Testing</span>
        </div>
        <button onClick={() => onApplyJob('Product Manager', 'Nexus Creative')} className="w-full bg-primary-container text-white py-3 rounded-lg font-bold hover:bg-on-primary-fixed-variant active:scale-95 transition-all">
          Apply Now
        </button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="mt-xxl pt-lg border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-md text-text-muted pb-lg">
    <span className="font-label-md text-label-md">© 2024 Visume. Personality-driven hiring.</span>
    <div className="flex gap-lg">
      <Link className="font-label-md text-label-md hover:text-secondary transition-colors" to="/">Privacy Policy</Link>
      <Link className="font-label-md text-label-md hover:text-secondary transition-colors" to="/">Terms of Service</Link>
      <Link className="font-label-md text-label-md hover:text-secondary transition-colors" to="/recruiter">For Recruiters</Link>
      <Link className="font-label-md text-label-md hover:text-secondary transition-colors" to="/">About Us</Link>
    </div>
  </footer>
);

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [appliedJob, setAppliedJob] = useState(null);
  
  // Video Modal State
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeVideoTitle, setActiveVideoTitle] = useState('');
  const [activeVideoDuration, setActiveVideoDuration] = useState('');
  const [activeVideoUrl, setActiveVideoUrl] = useState('');

  const [userApplications, setUserApplications] = useState(() => JSON.parse(localStorage.getItem('visume_applications') || '[]'));
  const [videoResumes, setVideoResumes] = useState(() => JSON.parse(localStorage.getItem('visume_video_resumes') || '[]'));

  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem('visume_applications') || '[]');
    setUserApplications(apps);
    const resumes = JSON.parse(localStorage.getItem('visume_video_resumes') || '[]');
    setVideoResumes(resumes);
  }, []);

  const handleRecordVideo = () => {
    navigate('/recorder');
  };

  const handlePlayVideo = (resume) => {
    setActiveVideoTitle(resume.title);
    setActiveVideoDuration(resume.duration);
    setActiveVideoUrl(resume.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4");
    setShowVideoModal(true);
  };

  const handleNotifications = () => {
    alert('You have 2 new notifications:\n\n1. Interview invitation from Stellar AI Solutions\n2. New job matching your profile available');
  };

  const handleApplyJob = (jobTitle, company) => {
    // Save to localStorage
    const existingApplications = JSON.parse(localStorage.getItem('visume_applications') || '[]');
    
    // Check if already applied
    const alreadyApplied = existingApplications.some(
      app => app.title === jobTitle && app.company === company
    );
    
    if (!alreadyApplied) {
      const newApplication = {
        id: Date.now(),
        title: jobTitle,
        company: company,
        logo: company.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase(),
        location: company === 'Stellar AI Solutions' ? 'Remote' : 'Hybrid',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        status: 'applied',
        statusText: 'Applied',
        colorClass: 'status-applied'
      };
      
      existingApplications.push(newApplication);
      localStorage.setItem('visume_applications', JSON.stringify(existingApplications));
      // update local UI state
      setUserApplications(existingApplications);
    }
    
    setAppliedJob({ jobTitle, company });
    setShowApplyModal(true);
  };

  const AppliedJobsSection = ({ applications }) => {
    if (!applications || applications.length === 0) return null;
    return (
      <section className="mb-xl">
        <div className="flex justify-between items-end mb-lg">
          <h2 className="font-display text-headline-md text-text-primary">Your Applications</h2>
          <Link className="text-primary-container font-label-md text-label-md hover:underline" to="/applications">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {applications.slice(0,4).map((app) => (
            <div key={app.id} className="bg-card-bg border border-border-base rounded-xl p-lg hover:border-primary-container transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-surface-bright/20 flex items-center justify-center border border-outline-variant overflow-hidden">
                    <span className="font-display font-bold">{app.logo}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-headline-sm text-text-primary">{app.title}</h3>
                    <p className="text-text-muted text-label-md">{app.company}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end text-text-muted">
                  <span className="text-[13px]">{app.date}</span>
                  <span className="text-[12px] mt-1 px-2 py-1 rounded-full bg-surface-container-high text-text-muted">{app.statusText}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to="/applications" className="w-full text-center border border-border-input text-text-muted py-2.5 rounded-lg font-bold hover:bg-surface-container-highest transition-colors">View Application</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowVideoModal(false);
        setShowApplyModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Header onNotifications={handleNotifications} onRecordVideo={handleRecordVideo} />
      <StatsRow />
      <VideoResumesSection resumes={videoResumes} onPlayVideo={handlePlayVideo} />
      <AppliedJobsSection applications={userApplications} />
      <RecommendedJobs onApplyJob={handleApplyJob} />
      <Footer />

      {/* Apply Confirmation Modal */}
      {showApplyModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setShowApplyModal(false)}
        >
          <div 
            className="bg-surface-container border border-outline-variant rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-headline-md font-display text-text-primary">Application Submitted!</h3>
              <button onClick={() => setShowApplyModal(false)} className="text-text-muted hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="mb-6 space-y-3">
              <div className="bg-surface-container-high p-4 rounded-lg">
                <p className="text-body-sm text-text-muted mb-1">Position</p>
                <p className="text-headline-sm font-display text-text-primary">{appliedJob?.jobTitle}</p>
              </div>
              <div className="bg-surface-container-high p-4 rounded-lg">
                <p className="text-body-sm text-text-muted mb-1">Company</p>
                <p className="text-headline-sm font-display text-text-primary">{appliedJob?.company}</p>
              </div>
              <div className="bg-secondary-container/20 p-4 rounded-lg border border-secondary/20">
                <p className="text-body-md text-secondary flex items-center gap-2">
                  <span className="material-symbols-outlined">check_circle</span>
                  Your application has been sent successfully!
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowApplyModal(false)} className="flex-1 py-2 border border-border-input text-text-muted font-bold rounded-lg hover:bg-surface-container-highest transition-colors">
                Close
              </button>
              <button onClick={() => { setShowApplyModal(false); navigate('/applications'); }} className="flex-1 py-2 bg-primary-container text-white font-bold rounded-lg hover:brightness-110 transition-all">
                View Applications
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setShowVideoModal(false)}
        >
          <div 
            className="bg-surface-container border border-outline-variant rounded-2xl overflow-hidden w-full max-w-3xl shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-black">
              <CustomVideoPlayer src={activeVideoUrl} className="w-full aspect-video" />
            </div>
            <div className="p-6 flex justify-between items-center bg-surface-container border-t border-outline-variant/30">
              <div>
                <h3 className="text-headline-md font-display text-text-primary">{activeVideoTitle}</h3>
                <p className="text-body-md text-text-muted mt-1">Duration: {activeVideoDuration}</p>
              </div>
              <button onClick={() => setShowVideoModal(false)} className="text-text-muted hover:text-white transition-colors bg-surface-container-high hover:bg-surface-container-highest w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CandidateDashboard;
