import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomVideoPlayer from '../components/CustomVideoPlayer';
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
const HeroSection = ({ profileData, onScheduleInterview, onViewResume, onUploadResume, onHeroDeleteResume, isUploadingResume }) => {
  const fullName = profileData?.fullName || "Jordan Sterling";
  const headline = profileData?.headline || "Senior Product Designer & Motion Specialist";
  const hasResume = !!(profileData?.resumeUrl || profileData?.localResumeUrl);

  return (
  <section className="card-bg border border-border-input rounded-xl p-lg relative overflow-hidden hero-gradient">
    <div className="flex flex-col md:flex-row items-center md:items-center gap-lg relative z-10">
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
      </div>
      <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
        <button onClick={onScheduleInterview} className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:scale-[0.98] active:scale-95 transition-all flex items-center justify-center gap-2 font-body-md text-body-md shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined">calendar_today</span>
          Schedule Interview
        </button>
        {hasResume ? (
          <div className="flex gap-2">
            <button onClick={onViewResume} className="flex-1 bg-surface-container border border-outline-variant text-text-primary font-bold py-3 px-6 rounded-lg hover:border-primary transition-all font-body-md text-body-md flex items-center justify-center gap-2 group overflow-hidden">
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform shrink-0">picture_as_pdf</span>
              <span className="truncate max-w-[150px]">{profileData?.resumeName || 'View Resume'}</span>
            </button>
            <label className="bg-surface-container border border-outline-variant text-text-primary font-bold py-3 px-4 rounded-lg hover:border-primary transition-all flex items-center justify-center cursor-pointer group" title="Update Resume">
              {isUploadingResume ? (
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">edit</span>
              )}
              <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={onUploadResume} disabled={isUploadingResume} />
            </label>
            <button onClick={onHeroDeleteResume} className="bg-surface-container border border-outline-variant text-danger font-bold py-3 px-4 rounded-lg hover:border-danger hover:bg-danger/10 transition-all flex items-center justify-center cursor-pointer group" title="Delete Resume">
              <span className="material-symbols-outlined text-danger group-hover:scale-110 transition-transform">delete</span>
            </button>
          </div>
        ) : (
          <label className="bg-surface-container border border-outline-variant text-text-primary font-bold py-3 px-8 rounded-lg hover:border-primary transition-all font-body-md text-body-md flex items-center justify-center gap-2 group cursor-pointer">
            <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">upload_file</span>
            {isUploadingResume ? 'Uploading...' : 'Upload Resume'}
            <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={onUploadResume} disabled={isUploadingResume} />
          </label>
        )}
      </div>
    </div>
  </section>
  );
};

const VideoResumesGrid = ({ onPlayVideo, onDeleteVideo, resumes }) => {
  if (!resumes || resumes.length === 0) return null;

  const getFullUrl = (url) => {
    if (!url || url === 'mock_url') return null;
    if (url.startsWith('blob:')) return url;
    if (url.startsWith('/uploads')) return `http://localhost:5000${url}`;
    return url;
  };

  return (
    <section className="space-y-md">
      <div className="flex items-center justify-between">
        <h2 className="font-headline-md text-headline-md font-bold text-text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">videocam</span>
          Video Resumes
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {resumes.map(resume => {
          const finalSrc = getFullUrl(resume.videoUrl) || getFullUrl(resume.localVideoUrl);
          return (
            <div key={resume.id} onClick={() => onPlayVideo(resume)} className="aspect-video w-full rounded-xl bg-surface-dim border border-border-input relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center z-10">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteVideo(resume.id, resume.title);
                }}
                className="absolute top-2 right-2 bg-black/60 hover:bg-danger/80 w-8 h-8 rounded flex items-center justify-center transition-colors z-20 opacity-0 group-hover:opacity-100"
                title="Delete Video"
              >
                <span className="material-symbols-outlined text-white text-[18px]">delete</span>
              </button>
              {finalSrc && !finalSrc.startsWith('blob:') ? (
                <video className="w-full h-full object-cover pointer-events-none" src={finalSrc} poster={resume.thumbnailUrl} preload="metadata" muted playsInline />
              ) : (
                <img alt={resume.title} className="w-full h-full object-cover" src={resume.thumbnailUrl}/>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-10 flex justify-between items-end">
                <p className="font-headline-sm text-headline-sm text-white truncate pr-2">{resume.title}</p>
                <div className="flex gap-3 text-white/80 font-label-sm text-label-sm shrink-0">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">visibility</span> {resume.views}</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">timer</span> {resume.duration}</span>
                </div>
              </div>
            </div>
          );
        })}
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

const Education = ({ profileData }) => {
  const education = profileData?.education || "BFA in Interactive Design, Academy of Art University, SF (Class of 2018)";
  return (
  <div className="card-bg border border-border-input rounded-xl p-lg space-y-md">
    <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary">Education</h3>
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-primary">school</span>
      </div>
      <div>
        <p className="text-text-muted font-body-md text-body-md whitespace-pre-wrap">{education}</p>
      </div>
    </div>
  </div>
  );
};

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
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState({ visible: false, type: null, id: null, title: null });
  
  const [videoResumes, setVideoResumes] = useState([]);
  
  useEffect(() => {
    const fetchVideos = async (userId) => {
      if (!userId) return;
      try {
        const { collection, getDocs } = await import('firebase/firestore');
        const videosRef = collection(db, 'candidates', userId, 'videoResumes');
        const snapshot = await getDocs(videosRef);
        const videos = [];
        snapshot.forEach(doc => {
          videos.push({ id: doc.id, ...doc.data() });
        });
        setVideoResumes(videos);
      } catch (err) {
        console.error("Error fetching video resumes from Firestore:", err);
      }
    };
    
    // Auth might take a moment to initialize
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) fetchVideos(user.uid);
    });
    
    return () => unsubscribe();
  }, []);

  const [profileState, setProfileState] = useState(() => {
    const savedData = localStorage.getItem('visume_profile_data');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  });

  const profileData = profileState;

  const handleScheduleInterview = () => {
    setShowInterviewModal(true);
  };

  const handleUploadResume = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploadingResume(true);
    try {
      // 1. Upload to Backend (Local Storage)
      const formData = new FormData();
      formData.append('file', file);
      const backendRes = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData
      });
      const backendData = await backendRes.json();
      console.log("Local Backend Upload Success:", backendData.localUrl);

      // 2. Upload to Firebase Storage (Global)
      if (auth.currentUser) {
        const storageRef = ref(storage, `resumes/${auth.currentUser.uid}/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        let downloadURL = null;
        try {
          await Promise.race([
            uploadTask,
            new Promise((_, reject) => setTimeout(() => reject(new Error('Firebase upload timeout')), 15000))
          ]);
          downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        } catch (fbError) {
          console.warn("Firebase upload timed out or failed, proceeding with local URL", fbError);
        }
        
        // Save to Firestore profile
        const userRef = doc(db, 'candidates', auth.currentUser.uid);
        const updateData = {
          localResumeUrl: backendData.localUrl,
          resumeName: file.name
        };
        if (downloadURL) updateData.resumeUrl = downloadURL;
        
        try {
          await updateDoc(userRef, updateData);
        } catch (e) {
          console.warn("Firestore update failed, but local storage will be updated", e);
        }

        // Update local state
        const newProfileData = { 
          ...profileData, 
          localResumeUrl: backendData.localUrl,
          resumeName: file.name 
        };
        if (downloadURL) newProfileData.resumeUrl = downloadURL;
        
        setProfileState(newProfileData);
        localStorage.setItem('visume_profile_data', JSON.stringify(newProfileData));
        alert("Resume uploaded successfully!");
      } else {
        // Just mock it if not authenticated
        const newProfileData = { 
          ...profileData, 
          resumeUrl: "mock_url", 
          localResumeUrl: backendData.localUrl,
          resumeName: file.name
        };
        setProfileState(newProfileData);
        localStorage.setItem('visume_profile_data', JSON.stringify(newProfileData));
        alert("Resume uploaded locally!");
      }
    } catch (err) {
      console.error("Resume upload failed:", err);
      alert("Failed to upload resume.");
    } finally {
      setIsUploadingResume(false);
    }
  };

  const handleViewResume = () => {
    const getFullUrl = (url) => {
      if (!url || url === 'mock_url') return null;
      if (url.startsWith('/uploads')) {
        return `http://localhost:5000${url}`;
      }
      return url;
    };

    const finalUrl = getFullUrl(profileData?.resumeUrl) || getFullUrl(profileData?.localResumeUrl);
    
    if (finalUrl) {
      window.open(finalUrl, '_blank');
    } else {
      alert('No valid resume found. Please upload a new one.');
    }
  };

  const handlePlayVideo = (resume) => {
    const getFullUrl = (url) => {
      if (!url || url === 'mock_url') return null;
      if (url.startsWith('blob:')) return url;
      if (url.startsWith('/uploads')) return `http://localhost:5000${url}`;
      return url;
    };
    const finalUrl = getFullUrl(resume.videoUrl) || getFullUrl(resume.localVideoUrl) || "https://www.w3schools.com/html/mov_bbb.mp4";

    setActiveVideoTitle(resume.title);
    setActiveVideoDuration(resume.duration);
    setActiveVideoUrl(finalUrl);
    setShowVideoModal(true);
  };

  const handleViewProject = (projectName) => {
    setSelectedProject(projectName);
    setShowProjectModal(true);
  };

  const handleDeleteResume = async () => {
    try {
      // 1. Delete Local File
      if (profileData?.localResumeUrl) {
        try {
          await fetch('http://localhost:5000/api/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileUrl: profileData.localResumeUrl })
          });
        } catch (e) {
          console.warn("Failed to delete local resume file", e);
        }
      }

      // 2. Delete Global File (Firebase Storage)
      if (profileData?.resumeUrl && profileData.resumeUrl !== 'mock_url') {
        try {
          const fileRef = ref(storage, profileData.resumeUrl);
          await deleteObject(fileRef);
        } catch (e) {
          console.warn("Failed to delete global resume file", e);
        }
      }

      // 3. Update Firestore (remove fields)
      if (auth.currentUser) {
        const { deleteField } = await import('firebase/firestore');
        const userRef = doc(db, 'candidates', auth.currentUser.uid);
        await updateDoc(userRef, {
          resumeUrl: deleteField(),
          localResumeUrl: deleteField(),
          resumeName: deleteField()
        });
      }

      // 4. Update Local State & UI
      const newProfileData = { ...profileData };
      delete newProfileData.resumeUrl;
      delete newProfileData.localResumeUrl;
      delete newProfileData.resumeName;
      
      setProfileState(newProfileData);
      localStorage.setItem('visume_profile_data', JSON.stringify(newProfileData));
      alert("Resume deleted completely!");
    } catch (err) {
      console.error("Error deleting resume:", err);
      alert("Failed to delete resume completely.");
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const videoToDelete = videoResumes.find(v => v.id === videoId);

      // 1. Delete Local File
      if (videoToDelete?.localVideoUrl) {
        try {
          await fetch('http://localhost:5000/api/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileUrl: videoToDelete.localVideoUrl })
          });
        } catch (e) {
          console.warn("Failed to delete local video file", e);
        }
      }

      // 2. Delete Global File (Firebase Storage)
      if (videoToDelete?.videoUrl) {
        try {
          const fileRef = ref(storage, videoToDelete.videoUrl);
          await deleteObject(fileRef);
        } catch (e) {
          console.warn("Failed to delete global video file", e);
        }
      }

      // 3. Delete Firestore Document
      if (auth.currentUser) {
        const { deleteDoc, doc: fsDoc } = await import('firebase/firestore');
        await deleteDoc(fsDoc(db, 'candidates', auth.currentUser.uid, 'videoResumes', videoId));
      }

      // 4. Update Local State & UI
      setVideoResumes(prev => prev.filter(v => v.id !== videoId));
      alert("Video resume deleted completely!");
    } catch (err) {
      console.error("Error deleting video:", err);
      alert("Failed to delete video completely.");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowVideoModal(false);
        setShowInterviewModal(false);
        setShowProjectModal(false);
        setShowDeleteConfirm({ visible: false, type: null, id: null, title: null });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const confirmDeleteAction = async () => {
    const { type, id } = showDeleteConfirm;
    setShowDeleteConfirm({ visible: false, type: null, id: null, title: null });
    
    if (type === 'resume') {
      await handleDeleteResume();
    } else if (type === 'video') {
      await handleDeleteVideo(id);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="space-y-lg">
        <HeroSection 
          profileData={profileData} 
          onScheduleInterview={handleScheduleInterview}
          onViewResume={handleViewResume}
          onUploadResume={handleUploadResume}
          onHeroDeleteResume={() => setShowDeleteConfirm({ visible: true, type: 'resume', title: 'Document Resume' })}
          isUploadingResume={isUploadingResume}
        />
        <VideoResumesGrid 
          onPlayVideo={handlePlayVideo} 
          onDeleteVideo={(id, title) => setShowDeleteConfirm({ visible: true, type: 'video', id, title })} 
          resumes={videoResumes} 
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          <div className="lg:col-span-7 space-y-lg">
            <Experience profileData={profileData} />
            <Education profileData={profileData} />
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

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm.visible && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={() => setShowDeleteConfirm({ visible: false, type: null, id: null, title: null })}
          >
            <div 
              className="bg-surface-container border border-outline-variant rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center text-danger">
                    <span className="material-symbols-outlined">warning</span>
                  </div>
                  <h3 className="text-headline-md font-display text-text-primary">Confirm Deletion</h3>
                </div>
                <button onClick={() => setShowDeleteConfirm({ visible: false, type: null, id: null, title: null })} className="text-text-muted hover:text-white transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <p className="text-body-md text-text-muted mb-6">
                Are you sure you want to completely delete <strong>{showDeleteConfirm.title}</strong>? This action cannot be undone and will remove the file from all systems.
              </p>
              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setShowDeleteConfirm({ visible: false, type: null, id: null, title: null })}
                  className="px-6 py-2.5 rounded-lg border border-outline-variant text-text-primary hover:bg-surface-container-highest transition-colors font-bold"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDeleteAction}
                  className="px-6 py-2.5 rounded-lg bg-danger text-white hover:bg-danger/90 transition-colors font-bold"
                >
                  Yes, Delete
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
          onUploadResume={handleUploadResume}
          isUploadingResume={isUploadingResume}
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
