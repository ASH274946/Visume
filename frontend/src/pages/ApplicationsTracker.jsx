import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ApplicationsTracker = () => {
  const [filter, setFilter] = useState('all');
  const [userApplications, setUserApplications] = useState(() => JSON.parse(localStorage.getItem('visume_applications') || '[]'));
  const [withdrawnHardcoded, setWithdrawnHardcoded] = useState(() => JSON.parse(localStorage.getItem('visume_withdrawn_hardcoded') || '[]'));
  
  const [viewingApp, setViewingApp] = useState(null);
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const [videoResumes, setVideoResumes] = useState({});
  const [profileData, setProfileData] = useState({});
  const menuRef = useRef(null);

  const hardcodedApplications = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "Stellar AI Solutions",
      logo: "SA",
      location: "Remote",
      date: "Oct 12, 2023",
      status: "interview",
      statusText: "Interview Scheduled",
      colorClass: "secondary-container",
      details: {
        timeText: "Interview on May 28, 2026 at 3:00 PM",
        actionText: "Join Meet"
      }
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Nexus Creative",
      logo: "NC",
      location: "Hybrid",
      date: "Oct 10, 2023",
      status: "shortlisted",
      statusText: "Shortlisted",
      colorClass: "primary-container"
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "CloudFlow",
      logo: "CF",
      location: "Remote",
      date: "Oct 14, 2023",
      status: "review",
      statusText: "Under Review",
      colorClass: "status-review"
    },
    {
      id: 4,
      title: "Motion Designer",
      company: "Peak Studio",
      logo: "PS",
      location: "Onsite",
      date: "Oct 15, 2023",
      status: "applied",
      statusText: "Applied",
      colorClass: "status-applied"
    },
    {
      id: 5,
      title: "UI Engineer",
      company: "Tech Innovators",
      logo: "TI",
      location: "Remote",
      date: "Sep 20, 2023",
      status: "rejected",
      statusText: "Rejected",
      colorClass: "danger"
    }
  ];

  // Combine hardcoded and user applications, removing duplicates and withdrawn ones
  const applications = [
    ...hardcodedApplications.filter(hApp => !withdrawnHardcoded.includes(hApp.id)),
    ...userApplications.filter(userApp => 
      !hardcodedApplications.some(hApp => hApp.title === userApp.title && hApp.company === userApp.company)
    )
  ].sort((a, b) => b.id - a.id);

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  useEffect(() => {
    try {
      setProfileData(JSON.parse(localStorage.getItem('visume_profile_data') || '{}'));
    } catch(e) {}

    const fetchVideos = async () => {
      try {
        if (!auth.currentUser) return;
        const videosRef = collection(db, 'candidates', auth.currentUser.uid, 'videoResumes');
        const snapshot = await getDocs(videosRef);
        const videos = {};
        snapshot.forEach(doc => {
          videos[doc.id] = { id: doc.id, ...doc.data() };
        });
        setVideoResumes(videos);
      } catch (err) {
        console.error("Error fetching video resumes from Firestore:", err);
      }
    };
    
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) fetchVideos();
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpenFor(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleWithdraw = (app) => {
    const confirm = window.confirm(`Are you sure you want to withdraw your application for ${app.title} at ${app.company}?`);
    if (!confirm) return;

    if (userApplications.some(uApp => uApp.id === app.id)) {
      const updatedUserApps = userApplications.filter(uApp => uApp.id !== app.id);
      setUserApplications(updatedUserApps);
      localStorage.setItem('visume_applications', JSON.stringify(updatedUserApps));
    } else {
      const updated = [...withdrawnHardcoded, app.id];
      setWithdrawnHardcoded(updated);
      localStorage.setItem('visume_withdrawn_hardcoded', JSON.stringify(updated));
    }
    setMenuOpenFor(null);
    if (viewingApp?.id === app.id) setViewingApp(null);
  };

  const getFullUrl = (url) => {
    if (!url || url === 'mock_url') return null;
    if (url.startsWith('/uploads')) {
      return `http://localhost:5000${url}`;
    }
    return url;
  };

  return (
    <>
      <header className="mb-lg">
        <h1 className="font-display text-headline-lg text-text-primary">My Applications</h1>
      </header>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-xl overflow-x-auto pb-2 custom-scrollbar">
        <button 
          onClick={() => setFilter('all')}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${filter === 'all' ? 'bg-primary-container text-white border-primary-container' : 'border-border-input text-text-muted hover:text-text-primary hover:border-text-muted'}`}
        >
          All ({applications.length})
        </button>
        <button 
          onClick={() => setFilter('applied')}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${filter === 'applied' ? 'bg-primary-container text-white border-primary-container' : 'border-border-input text-text-muted hover:text-text-primary hover:border-text-muted'}`}
        >
          Applied ({applications.filter(a => a.status === 'applied').length})
        </button>
        <button 
          onClick={() => setFilter('review')}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${filter === 'review' ? 'bg-primary-container text-white border-primary-container' : 'border-border-input text-text-muted hover:text-text-primary hover:border-text-muted'}`}
        >
          Under Review ({applications.filter(a => a.status === 'review').length})
        </button>
        <button 
          onClick={() => setFilter('shortlisted')}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${filter === 'shortlisted' ? 'bg-primary-container text-white border-primary-container' : 'border-border-input text-text-muted hover:text-text-primary hover:border-text-muted'}`}
        >
          Shortlisted ({applications.filter(a => a.status === 'shortlisted').length})
        </button>
        <button 
          onClick={() => setFilter('interview')}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${filter === 'interview' ? 'bg-primary-container text-white border-primary-container' : 'border-border-input text-text-muted hover:text-text-primary hover:border-text-muted'}`}
        >
          Interview ({applications.filter(a => a.status === 'interview').length})
        </button>
        <button 
          onClick={() => setFilter('rejected')}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${filter === 'rejected' ? 'bg-primary-container text-white border-primary-container' : 'border-border-input text-text-muted hover:text-text-primary hover:border-text-muted'}`}
        >
          Rejected ({applications.filter(a => a.status === 'rejected').length})
        </button>
      </div>

      {/* Applications List */}
      <div className="flex flex-col gap-4 w-full">
        {filteredApplications.length === 0 ? (
          <div className="text-center py-12 px-4 border border-dashed border-outline-variant rounded-xl bg-surface-container-low">
            <p className="text-body-md text-text-muted">No applications found.</p>
          </div>
        ) : filteredApplications.map(app => (
          <div 
            key={app.id} 
            className={`bg-card-bg border border-border-base rounded-xl p-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-lg ${app.status === 'rejected' ? 'opacity-70 hover:opacity-100' : ''}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center border border-border-input flex-shrink-0">
                <span className="text-text-muted font-bold">{app.logo}</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-headline-sm text-text-primary font-bold">{app.title}</h3>
                <p className="text-text-muted text-sm">{app.company} • <span className="bg-surface-container px-2 py-0.5 rounded text-xs border border-border-input">{app.location}</span></p>
                <p className="text-text-muted text-xs mt-1">Applied: {app.date}</p>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-3 w-full md:w-auto mt-4 md:mt-0">
              <div className="flex items-center gap-4 justify-between md:justify-end w-full relative">
                <span className={`bg-${app.status === 'interview' ? 'secondary' : app.status === 'shortlisted' ? 'primary' : app.status === 'review' ? 'status-review' : app.status === 'applied' ? 'status-applied' : 'danger'}/20 text-${app.status === 'interview' ? 'secondary' : app.status === 'shortlisted' ? 'primary-fixed' : app.status === 'review' ? 'status-review' : app.status === 'applied' ? 'status-applied' : 'danger'} px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap`}>
                  {app.statusText}
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setViewingApp(app)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:bg-surface-container hover:text-text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">info</span>
                  </button>
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenFor(menuOpenFor === app.id ? null : app.id);
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:bg-surface-container hover:text-text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                    {menuOpenFor === app.id && (
                      <div ref={menuRef} className="absolute right-0 top-full mt-1 w-48 bg-surface-container-high border border-outline-variant/50 rounded-xl shadow-xl overflow-hidden z-20">
                        <button 
                          onClick={() => { setViewingApp(app); setMenuOpenFor(null); }}
                          className="w-full text-left px-4 py-3 text-sm text-text-primary hover:bg-primary-container/10 hover:text-primary transition-colors flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                          View Application
                        </button>
                        <button 
                          onClick={() => handleWithdraw(app)}
                          className="w-full text-left px-4 py-3 text-sm text-danger hover:bg-danger/10 transition-colors flex items-center gap-2 border-t border-outline-variant/20"
                        >
                          <span className="material-symbols-outlined text-[18px]">cancel</span>
                          Withdraw Application
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {app.details && (
                <div className="bg-surface-container border border-border-input rounded-lg p-3 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-sm text-text-primary">
                    <span className="font-bold text-secondary">{app.details.timeText.split('on')[0]}on</span>
                    {app.details.timeText.split('on')[1]}
                  </span>
                  <button className="bg-secondary text-[#0A0A0F] px-4 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#46eae5] transition-colors whitespace-nowrap">
                    <span className="material-symbols-outlined text-[18px]">videocam</span> 
                    {app.details.actionText}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View Application Modal */}
      {viewingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setViewingApp(null)}>
          <div className="bg-surface-container rounded-2xl border border-outline-variant w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-outline-variant/50 flex justify-between items-center bg-surface-container-high shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center border border-border-input flex-shrink-0">
                  <span className="text-text-muted font-bold">{viewingApp.logo}</span>
                </div>
                <div>
                  <h2 className="text-title-lg font-bold text-text-primary">{viewingApp.title}</h2>
                  <p className="text-text-muted text-sm">{viewingApp.company} • {viewingApp.location}</p>
                </div>
              </div>
              <button onClick={() => setViewingApp(null)} className="text-text-muted hover:text-text-primary transition-colors bg-surface-container-highest p-2 rounded-full">
                <span className="material-symbols-outlined text-[20px] block">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h4 className="font-label-lg text-label-lg text-text-muted uppercase tracking-wider">Application Status</h4>
                <div className="flex items-center gap-3">
                   <span className={`bg-${viewingApp.status === 'interview' ? 'secondary' : viewingApp.status === 'shortlisted' ? 'primary' : viewingApp.status === 'review' ? 'status-review' : viewingApp.status === 'applied' ? 'status-applied' : 'danger'}/20 text-${viewingApp.status === 'interview' ? 'secondary' : viewingApp.status === 'shortlisted' ? 'primary-fixed' : viewingApp.status === 'review' ? 'status-review' : viewingApp.status === 'applied' ? 'status-applied' : 'danger'} px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap`}>
                    {viewingApp.statusText}
                  </span>
                  <span className="text-body-sm text-text-muted">Applied on {viewingApp.date}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="font-label-lg text-label-lg text-text-muted uppercase tracking-wider">Submitted Resumes</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Video Resume */}
                  <div className="p-4 rounded-xl border border-outline-variant/30 bg-surface-container-high flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-primary text-[20px]">videocam</span>
                      <span className="font-bold text-text-primary text-body-md">Video Resume</span>
                    </div>
                    {viewingApp.resumeId && videoResumes[viewingApp.resumeId] ? (
                      <div className="relative rounded-lg overflow-hidden border border-outline-variant/30 bg-black aspect-video group mt-auto">
                        {videoResumes[viewingApp.resumeId].videoUrl && getFullUrl(videoResumes[viewingApp.resumeId].videoUrl) ? (
                          <video src={getFullUrl(videoResumes[viewingApp.resumeId].videoUrl)} className="w-full h-full object-cover" controls preload="metadata" />
                        ) : videoResumes[viewingApp.resumeId].localVideoUrl && getFullUrl(videoResumes[viewingApp.resumeId].localVideoUrl) ? (
                          <video src={getFullUrl(videoResumes[viewingApp.resumeId].localVideoUrl)} className="w-full h-full object-cover" controls preload="metadata" />
                        ) : (
                          <img src={videoResumes[viewingApp.resumeId].thumbnailUrl} alt="Video Thumbnail" className="w-full h-full object-cover" />
                        )}
                        <div className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[11px] text-white backdrop-blur-md">
                          {videoResumes[viewingApp.resumeId].title}
                        </div>
                      </div>
                    ) : (
                       <div className="p-4 rounded-lg bg-surface-container border border-dashed border-outline-variant/50 text-center mt-auto">
                         <p className="text-body-sm text-text-muted">No custom video attached</p>
                       </div>
                    )}
                  </div>

                  {/* Document Resume */}
                  <div className="p-4 rounded-xl border border-outline-variant/30 bg-surface-container-high flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-primary text-[20px]">description</span>
                      <span className="font-bold text-text-primary text-body-md">Document Resume</span>
                    </div>
                    {viewingApp.includeDocumentResume !== false && (profileData.resumeUrl || profileData.resumeName) ? (
                       <div className="p-4 rounded-lg bg-surface-container border border-outline-variant flex items-center justify-between gap-3 mt-auto">
                         <div className="flex items-center gap-3 overflow-hidden">
                           <span className="material-symbols-outlined text-danger text-[24px]">picture_as_pdf</span>
                           <span className="font-bold text-text-primary text-sm truncate">{profileData.resumeName || 'Profile Resume.pdf'}</span>
                         </div>
                         {(getFullUrl(profileData.resumeUrl) || getFullUrl(profileData.localResumeUrl)) && (
                           <a href={getFullUrl(profileData.resumeUrl) || getFullUrl(profileData.localResumeUrl)} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center bg-surface-container-high hover:bg-primary-container/20 text-primary transition-colors flex-shrink-0">
                             <span className="material-symbols-outlined text-[18px]">download</span>
                           </a>
                         )}
                       </div>
                    ) : (
                      <div className="p-4 rounded-lg bg-surface-container border border-dashed border-outline-variant/50 text-center mt-auto">
                        <p className="text-body-sm text-text-muted">No document resume attached</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationsTracker;
