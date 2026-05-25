import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomVideoPlayer from '../components/CustomVideoPlayer';

const HeroSection = ({ profileData, onScheduleInterview, onViewResume }) => {
  const fullName = profileData?.fullName || "Jordan Sterling";
  const headline = profileData?.headline || "Senior Product Designer & Motion Specialist";
  const location = profileData?.location || "San Francisco, CA";
  const address = profileData?.address || "123 Tech Park, OMR, Chennai";
  
  const formattedDob = profileData?.dob 
    ? new Date(profileData.dob).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : "August 15, 1995";

  return (
  <section className="card-bg border border-border-input rounded-xl p-lg relative overflow-hidden hero-gradient">
    <div className="flex flex-col md:flex-row items-center md:items-end gap-lg relative z-10">
      <div className="w-24 h-24 rounded-full border-4 border-primary ring-4 ring-primary/20 overflow-hidden shadow-2xl shrink-0">
        <img alt="Candidate" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&h=256&q=80"/>
      </div>
      <div className="flex-grow text-center md:text-left space-y-2">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
          <h1 className="font-headline-lg text-headline-lg font-bold text-text-primary">{fullName}</h1>
          <span className="inline-flex items-center gap-1 bg-[#00CEC9]/10 text-[#00CEC9] border border-[#00CEC9]/30 px-3 py-1 rounded-full text-label-md font-label-md uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            KYC Verified
          </span>
        </div>
        <p className="font-body-lg text-body-lg text-text-muted">{headline}</p>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 text-text-muted font-body-sm text-body-sm">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> {location}</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">home</span> {address}</span>
          </div>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">cake</span> {formattedDob}</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> Available Immediately</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
        <button onClick={onScheduleInterview} className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:scale-[0.98] active:scale-95 transition-all flex items-center justify-center gap-2 font-body-md text-body-md shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined">calendar_today</span>
          Schedule Interview
        </button>
        <button onClick={onViewResume} className="bg-surface-container border border-outline-variant text-text-primary font-bold py-3 px-8 rounded-lg hover:border-primary transition-all font-body-md text-body-md flex items-center justify-center gap-2 group">
          <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">picture_as_pdf</span>
          View Resume
        </button>
      </div>
    </div>
  </section>
  );
};

const VideoResumesGrid = ({ onPlayVideo, resumes }) => {
  if (!resumes || resumes.length === 0) return null;

  return (
    <section className="space-y-md">
      <div className="flex items-center justify-between">
        <h2 className="font-headline-md text-headline-md font-bold text-text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">videocam</span>
          Video Resumes
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {resumes.map(resume => (
          <div key={resume.id} onClick={() => onPlayVideo(resume)} className="aspect-video w-full rounded-xl bg-surface-dim border border-border-input relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center z-10">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </div>
            </div>
            <img alt={resume.title} className="w-full h-full object-cover" src={resume.thumbnailUrl}/>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-10 flex justify-between items-end">
              <p className="font-headline-sm text-headline-sm text-white truncate pr-2">{resume.title}</p>
              <div className="flex gap-3 text-white/80 font-label-sm text-label-sm shrink-0">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">visibility</span> {resume.views}</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">timer</span> {resume.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Skills = () => (
  <div className="card-bg border border-border-input rounded-xl p-lg space-y-md">
    <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary">Technical Expertise</h3>
    <div className="flex flex-wrap gap-2">
      <span className="bg-surface-container border border-outline-variant px-4 py-2 rounded-full text-text-primary font-body-sm text-body-sm hover:border-primary transition-colors cursor-default">Figma</span>
      <span className="bg-surface-container border border-outline-variant px-4 py-2 rounded-full text-text-primary font-body-sm text-body-sm hover:border-primary transition-colors cursor-default">After Effects</span>
      <span className="bg-surface-container border border-outline-variant px-4 py-2 rounded-full text-text-primary font-body-sm text-body-sm hover:border-primary transition-colors cursor-default">Three.js</span>
      <span className="bg-surface-container border border-outline-variant px-4 py-2 rounded-full text-text-primary font-body-sm text-body-sm hover:border-primary transition-colors cursor-default">Webflow</span>
      <span className="bg-surface-container border border-outline-variant px-4 py-2 rounded-full text-text-primary font-body-sm text-body-sm hover:border-primary transition-colors cursor-default">Prototyping</span>
      <span className="bg-[#00CEC9]/10 text-[#00CEC9] border border-[#00CEC9]/20 px-4 py-2 rounded-full text-text-primary font-body-sm text-body-sm">AI-Driven Design</span>
    </div>
  </div>
);

const Experience = ({ profileData }) => {
  const previousExperience = profileData?.previousExperience || "3 years as Frontend Developer";

  return (
    <div className="card-bg border border-border-input rounded-xl p-lg space-y-lg">
      <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary">Professional Journey</h3>
      <div className="relative space-y-lg timeline-line pl-8">
        <div className="relative">
          <div className="absolute -left-8 mt-1 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 z-10"></div>
          <div className="space-y-1">
            <span className="text-primary font-label-md text-label-md font-bold">RECENT</span>
            <h4 className="font-headline-sm text-headline-sm text-text-primary">Previous Experience Summary</h4>
            <p className="text-text-muted font-body-md text-body-md">Most recent role highlights</p>
            <p className="text-text-muted font-body-sm text-body-sm mt-2 leading-relaxed">{previousExperience}</p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-8 mt-1 w-4 h-4 rounded-full bg-outline-variant z-10"></div>
          <div className="space-y-1">
            <span className="text-text-muted font-label-md text-label-md font-bold">2019 — 2021</span>
            <h4 className="font-headline-sm text-headline-sm text-text-primary">UI/UX Designer</h4>
            <p className="text-text-muted font-body-md text-body-md">Vivid Digital Agency • Contract</p>
            <p className="text-text-muted font-body-sm text-body-sm mt-2 leading-relaxed">Collaborated with Fortune 500 clients to build interactive prototypes and design systems for global consumer applications.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Education = () => (
  <div className="card-bg border border-border-input rounded-xl p-lg space-y-md">
    <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary">Education</h3>
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-primary">school</span>
      </div>
      <div>
        <h4 className="font-headline-sm text-headline-sm text-text-primary">BFA in Interactive Design</h4>
        <p className="text-text-muted font-body-md text-body-md">Academy of Art University, SF</p>
        <p className="text-text-muted font-label-md text-label-md">Class of 2018</p>
      </div>
    </div>
  </div>
);

const StatsCard = () => (
  <div className="card-bg border border-border-input rounded-xl p-lg">
    <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary mb-md">Talent Insights</h3>
    <div className="grid grid-cols-2 gap-md">
      <div className="bg-surface-container/50 p-md rounded-lg border border-outline-variant/30">
        <p className="text-text-muted font-label-md text-label-md">Match Rate</p>
        <p className="text-headline-md font-headline-md text-secondary mt-1">98%</p>
      </div>
      <div className="bg-surface-container/50 p-md rounded-lg border border-outline-variant/30">
        <p className="text-text-muted font-label-md text-label-md">Applications</p>
        <p className="text-headline-md font-headline-md text-text-primary mt-1">12</p>
      </div>
      <div className="bg-surface-container/50 p-md rounded-lg border border-outline-variant/30 col-span-2">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-text-muted font-label-md text-label-md">Response Velocity</p>
            <p className="text-headline-md font-headline-md text-text-primary mt-1">High</p>
          </div>
          <div className="flex gap-1">
            <div className="w-1.5 h-4 bg-primary/30 rounded-full"></div>
            <div className="w-1.5 h-6 bg-primary/60 rounded-full"></div>
            <div className="w-1.5 h-8 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Portfolio = ({ onViewProject, profileData }) => {
  const portfolioUrl = profileData?.portfolio || 'https://ashwinkumar.dev';
  
  return (
  <div className="space-y-md">
    <div className="flex justify-between items-center">
      <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary">Featured Portfolio</h3>
      <a href={portfolioUrl.startsWith('http') ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noopener noreferrer" className="text-primary text-label-md hover:underline flex items-center gap-1">
        Personal Site <span className="material-symbols-outlined text-[14px]">open_in_new</span>
      </a>
    </div>
    <div className="space-y-md">
      <div onClick={() => onViewProject('Stellar Finance UI')} className="card-bg border border-border-input rounded-xl overflow-hidden group cursor-pointer hover:border-primary transition-all">
        <div className="h-40 overflow-hidden">
          <img alt="Project 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80"/>
        </div>
        <div className="p-md">
          <h4 className="font-headline-sm text-headline-sm text-text-primary">Stellar Finance UI</h4>
          <p className="text-text-muted font-body-sm text-body-sm mt-1">Full redesign of an enterprise financial dashboard.</p>
          <div className="flex items-center gap-2 mt-4 text-primary font-bold text-body-sm">
            View Project <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </div>
        </div>
      </div>
      <div onClick={() => onViewProject('Motion Identity Pack')} className="card-bg border border-border-input rounded-xl overflow-hidden group cursor-pointer hover:border-primary transition-all">
        <div className="h-40 overflow-hidden">
          <img alt="Project 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80"/>
        </div>
        <div className="p-md">
          <h4 className="font-headline-sm text-headline-sm text-text-primary">Motion Identity Pack</h4>
          <p className="text-text-muted font-body-sm text-body-sm mt-1">A collection of custom motion components for SaaS apps.</p>
          <div className="flex items-center gap-2 mt-4 text-primary font-bold text-body-sm">
            View Project <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

const CandidateProfile = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const role = localStorage.getItem('visume_role') || 'candidate';
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeVideoTitle, setActiveVideoTitle] = useState('');
  const [activeVideoDuration, setActiveVideoDuration] = useState('');
  const [activeVideoUrl, setActiveVideoUrl] = useState('');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [videoResumes, setVideoResumes] = useState(() => JSON.parse(localStorage.getItem('visume_video_resumes') || '[]'));
  
  let profileData = null;
  const savedData = localStorage.getItem('visume_profile_data');
  if (savedData) {
    try {
      profileData = JSON.parse(savedData);
    } catch (e) {
      console.error(e);
    }
  }

  const handleScheduleInterview = () => {
    setShowInterviewModal(true);
  };

  const handleViewResume = () => {
    alert('Resume download would be initiated here. In a real app, this would download the PDF.');
  };

  const handlePlayVideo = (resume) => {
    setActiveVideoTitle(resume.title);
    setActiveVideoDuration(resume.duration);
    setActiveVideoUrl(resume.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4");
    setShowVideoModal(true);
  };

  const handleViewProject = (projectName) => {
    setSelectedProject(projectName);
    setShowProjectModal(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowVideoModal(false);
        setShowInterviewModal(false);
        setShowProjectModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isLoggedIn) {
    return (
      <div className="space-y-lg">
        <HeroSection 
          profileData={profileData} 
          onScheduleInterview={handleScheduleInterview}
          onViewResume={handleViewResume}
        />
        <VideoResumesGrid onPlayVideo={handlePlayVideo} resumes={videoResumes} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          <div className="lg:col-span-7 space-y-lg">
            <Skills />
            <Experience profileData={profileData} />
            <Education />
          </div>
          <div className="lg:col-span-5 space-y-lg">
            <StatsCard />
            <Portfolio onViewProject={handleViewProject} profileData={profileData} />
          </div>
        </div>

        {/* Interview Modal */}
        {showInterviewModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={() => setShowInterviewModal(false)}
          >
            <div 
              className="bg-surface-container border border-outline-variant rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-headline-md font-display text-text-primary">Schedule Interview</h3>
                <button onClick={() => setShowInterviewModal(false)} className="text-text-muted hover:text-white transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <p className="text-body-md text-text-muted mb-6">Select a time slot for your interview with Jordan Sterling.</p>
              <div className="space-y-3 mb-6">
                <button className="w-full p-3 border border-outline-variant rounded-lg text-left text-body-md text-text-primary hover:bg-surface-container-highest transition-colors">
                   Tomorrow, 2:00 PM - 3:00 PM
                </button>
                <button className="w-full p-3 border border-outline-variant rounded-lg text-left text-body-md text-text-primary hover:bg-surface-container-highest transition-colors">
                   Next Monday, 10:00 AM - 11:00 AM
                </button>
                <button className="w-full p-3 border border-outline-variant rounded-lg text-left text-body-md text-text-primary hover:bg-surface-container-highest transition-colors">
                   Next Wednesday, 3:00 PM - 4:00 PM
                </button>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowInterviewModal(false)} className="flex-1 py-2 border border-border-input text-text-muted font-bold rounded-lg hover:bg-surface-container-highest transition-colors">
                  Cancel
                </button>
                <button onClick={() => { setShowInterviewModal(false); alert('Interview scheduled successfully!'); }} className="flex-1 py-2 bg-primary text-white font-bold rounded-lg hover:brightness-110 transition-all">
                  Confirm
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

        {/* Project Modal */}
        {showProjectModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={() => setShowProjectModal(false)}
          >
            <div 
              className="bg-surface-container border border-outline-variant rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-headline-md font-display text-text-primary">{selectedProject}</h3>
                <button onClick={() => setShowProjectModal(false)} className="text-text-muted hover:text-white transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="mb-6 rounded-lg overflow-hidden border border-outline-variant">
                <img alt={selectedProject} className="w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTGX0qfW3OBHO-GncgYEDe4VsgT5F9r_zfw3DJPN2gTumHa10C41bh77ET3KJqu4vzdu1goYVk05FB73cva0gGTJZkuL-5mShFSRzoficAmqPUfjFiWI1Whj--x5O4-DU1TlFRfL5AOgo4YHONlT3Msx30AO9F4pqjtoQXwNPn9PYML4JJbQ9EbIiiOY13LW47bF_E-xxVVv7AvZHNgnJDE5GmKFJtPJNPoryNTjQ0Ld2zRMU8FKBE4hl0nc3_zrOyndQBdCNzDek" />
              </div>
              <p className="text-body-md text-text-muted mb-6">
                {selectedProject === 'Stellar Finance UI' 
                  ? 'Full redesign of an enterprise financial dashboard with advanced data visualization and real-time analytics.'
                  : 'A collection of custom motion components for SaaS apps, designed for seamless integration and smooth animations.'
                }
              </p>
              <div className="flex gap-3">
                <button onClick={() => setShowProjectModal(false)} className="flex-1 py-2 border border-border-input text-text-muted font-bold rounded-lg hover:bg-surface-container-highest transition-colors">
                  Close
                </button>
                <button onClick={() => { setShowProjectModal(false); alert('Opening project in external link...'); }} className="flex-1 py-2 bg-primary text-white font-bold rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
                  View Full Project <span className="material-symbols-outlined text-sm">arrow_outward</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-primary font-body-md pt-24">
      <Navbar />
      <main className="max-w-container-max mx-auto px-gutter py-lg space-y-lg">
        <HeroSection 
          profileData={profileData}
          onScheduleInterview={handleScheduleInterview}
          onViewResume={handleViewResume}
        />
        <VideoResumesGrid onPlayVideo={handlePlayVideo} resumes={videoResumes} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          <div className="lg:col-span-7 space-y-lg">
            <Skills />
            <Experience profileData={profileData} />
            <Education />
          </div>
          <div className="lg:col-span-5 space-y-lg">
            <StatsCard />
            <Portfolio onViewProject={handleViewProject} profileData={profileData} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CandidateProfile;
