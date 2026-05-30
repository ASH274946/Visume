import { useState, useEffect, useCallback, useRef } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, getDocs, doc, getDoc } from 'firebase/firestore';

const CustomVideoPlayer = ({ src, poster }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const prog = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(prog || 0);
  };

  const handleSeek = (e) => {
    const seekTo = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTo;
    setProgress(e.target.value);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden bg-surface-dim border border-outline-variant/30 w-full max-h-[300px]">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover max-h-[300px]"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        playsInline
        onClick={togglePlay}
      />
      {/* Overlay Play Button (when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none transition-all">
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-xl">
            <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          </div>
        </div>
      )}
      
      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
        <input 
          type="range" 
          min="0" max="100" 
          value={progress} 
          onChange={handleSeek}
          className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary" 
        />
        <div className="flex items-center gap-4 text-white">
          <button onClick={togglePlay} className="hover:text-primary transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <button onClick={toggleMute} className="hover:text-primary transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const candidatesData = [
  {
    id: 1,
    name: "Julian Vance",
    role: "UX/UI Design Lead",
    location: "San Francisco, CA",
    match: `${Math.min(99, 65 + (["Figma", "Prototyping", "User Research"].length * 7))}%`,
    skills: ["Figma", "Prototyping", "User Research"],
    experience: "8 years",
    imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    id: 2,
    name: "Lila Chen",
    role: "Senior Product Architect",
    location: "Remote",
    match: `${Math.min(99, 65 + (["Growth", "SaaS", "Strategy"].length * 7))}%`,
    skills: ["Growth", "SaaS", "Strategy"],
    experience: "6 years",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "Frontend Developer",
    location: "New York, NY",
    match: `${Math.min(99, 65 + (["React", "TypeScript", "Tailwind"].length * 7))}%`,
    skills: ["React", "TypeScript", "Tailwind"],
    experience: "4 years",
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    role: "Full Stack Engineer",
    location: "London, UK",
    match: `${Math.min(99, 65 + (["Node.js", "MongoDB", "AWS"].length * 7))}%`,
    skills: ["Node.js", "MongoDB", "AWS"],
    experience: "5 years",
    imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    id: 5,
    name: "David Kim",
    role: "Product Manager",
    location: "Seattle, WA",
    match: `${Math.min(99, 65 + (["Agile", "Jira", "Roadmapping"].length * 7))}%`,
    skills: ["Agile", "Jira", "Roadmapping"],
    experience: "7 years",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80"
  },
  {
    id: 6,
    name: "Elena Rodriguez",
    role: "Data Scientist",
    location: "Remote",
    match: `${Math.min(99, 65 + (["Python", "Machine Learning", "SQL"].length * 7))}%`,
    skills: ["Python", "Machine Learning", "SQL"],
    experience: "3 years",
    imgSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&h=256&q=80"
  }
];

const getPlayableMediaUrl = (url) => {
  if (!url || url === 'mock_url') return null;
  if (url.startsWith('/uploads')) return `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}${url}`;
  return url;
};

const FindCandidatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Candidates');
  const [showFilters, setShowFilters] = useState(false);
  
  // Advanced filters state
  const [experienceLevel, setExperienceLevel] = useState('Any');
  const [minMatchScore, setMinMatchScore] = useState(70);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [liveCandidates, setLiveCandidates] = useState([]);
  const [profileModal, setProfileModal] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileVideos, setProfileVideos] = useState([]);
  const [profileResume, setProfileResume] = useState(null);

  const closeProfileModal = useCallback(() => {
    setProfileModal(null);
    setProfileVideos([]);
    setProfileResume(null);
  }, []);

  const allSkillsList = [
    "React", "TypeScript", "Node.js", "Python", "AWS", 
    "Figma", "Machine Learning", "SQL", "Agile", "Strategy"
  ];

  // Real-time subscription to Firestore 'candidates' collection
  useEffect(() => {
    let unsubscribe = null;

    const fetchCandidates = async () => {
      try {
        // Try real-time listener first
        unsubscribe = onSnapshot(collection(db, 'candidates'), (snapshot) => {
          console.log(`[FindCandidates] onSnapshot received ${snapshot.docs.length} candidates`);
          const candidates = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            const skills = data.skills || [];
            const expMatch = (data.previousExperience || data.bio || '').match(/(\d+)\+?\s*years?/i);
            const expYears = expMatch ? parseInt(expMatch[1]) : 2;

            return {
              id: `live-${docSnap.id}`,
              name: data.fullName || 'Unknown Candidate',
              role: data.headline || 'Candidate',
              location: data.location || 'Remote',
              match: `${Math.min(99, 65 + ((data.skills || []).length * 7))}%`,
              skills: skills,
              experience: `${expYears} years`,
              imgSrc: data.profileImage || data.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.fullName || 'U')}&background=6C5CE7&color=fff&size=256`,
              isLive: true
            };
          });
          setLiveCandidates(candidates);
        }, (error) => {
          console.error('[FindCandidates] onSnapshot error (likely Firestore rules). Falling back to getDocs:', error.message);
          // Fallback: one-time fetch
          fallbackFetch();
        });
      } catch (err) {
        console.error('[FindCandidates] Setup error:', err);
        fallbackFetch();
      }
    };

    const fallbackFetch = async () => {
      try {
        const { getDocs } = await import('firebase/firestore');
        const snapshot = await getDocs(collection(db, 'candidates'));
        console.log(`[FindCandidates] getDocs fallback received ${snapshot.docs.length} candidates`);
        const candidates = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          const skills = data.skills || [];
          const expMatch = (data.previousExperience || data.bio || '').match(/(\d+)\+?\s*years?/i);
          const expYears = expMatch ? parseInt(expMatch[1]) : 2;

          return {
            id: `live-${docSnap.id}`,
            name: data.fullName || 'Unknown Candidate',
            role: data.headline || 'Candidate',
            location: data.location || 'Remote',
            match: `${Math.floor(Math.random() * 15) + 85}%`,
            skills: skills,
            experience: `${expYears} years`,
            imgSrc: data.profileImage || data.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.fullName || 'U')}&background=6C5CE7&color=fff&size=256`,
            isLive: true
          };
        });
        setLiveCandidates(candidates);
      } catch (fallbackErr) {
        console.error('[FindCandidates] getDocs fallback also failed:', fallbackErr.message);
      }
    };

    fetchCandidates();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!profileModal) return;

    const appScrollContainer = document.querySelector('main');
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousMainOverflow = appScrollContainer?.style.overflow;
    const previousMainOverflowY = appScrollContainer?.style.overflowY;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    appScrollContainer?.style.setProperty('overflow', 'hidden', 'important');
    appScrollContainer?.style.setProperty('overflow-y', 'hidden', 'important');

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeProfileModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      if (appScrollContainer) {
        appScrollContainer.style.overflow = previousMainOverflow || '';
        appScrollContainer.style.overflowY = previousMainOverflowY || '';
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [profileModal, closeProfileModal]);

  // Merge live candidates at the top with mock candidates
  const allCandidates = [...liveCandidates, ...candidatesData];

  const handleInitiateChat = async (e, candidate) => {
    e.stopPropagation();
    if (candidate.isDemo) {
      alert("Cannot chat with mock candidates.");
      return;
    }
    try {
      const { initiateChat } = await import('../components/MessagesInbox');
      const { auth } = await import('../firebase');
      const uid = candidate.id.replace('live-', '');
      const profileData = JSON.parse(localStorage.getItem('visume_profile_data') || '{}');
      const recruiterName = profileData.fullName || auth.currentUser?.displayName || 'Recruiter';
      
      const chatId = await initiateChat(
        'direct_message',
        uid,
        candidate.name,
        candidate.role || 'Candidate',
        auth.currentUser.uid,
        recruiterName
      );
      
      window.dispatchEvent(new CustomEvent('openMessages', { detail: { chatId } }));
    } catch (err) {
      console.error('Error initiating chat:', err);
    }
  };

  const handleViewProfile = async (candidate) => {
    setProfileModal(candidate);
    setProfileLoading(true);
    setProfileVideos([]);
    setProfileResume(null);

    // Only fetch from Firestore for live candidates
    if (candidate.isLive && candidate.id) {
      const uid = candidate.id.replace('live-', '');
      try {
        // Fetch candidate's profile doc first to get defaults
        const candidateDoc = await getDoc(doc(db, 'candidates', uid));
        let data = {};
        if (candidateDoc.exists()) {
          data = candidateDoc.data();
        }

        // Fetch video resumes
        const videosRef = collection(db, 'candidates', uid, 'videoResumes');
        const videosSnap = await getDocs(videosRef);
        const videos = [];
        videosSnap.forEach(d => {
          videos.push({ id: d.id, ...d.data() });
        });

        const defaultVideoId = data.defaultVideoResumeId;
        if (defaultVideoId) {
          const defaultVideo = videos.find(v => v.id === defaultVideoId);
          setProfileVideos(defaultVideo ? [defaultVideo] : []);
        } else if (videos.length > 0) {
          // Fallback to the most recently added (usually last in array or could sort)
          setProfileVideos([videos[videos.length - 1]]);
        } else {
          setProfileVideos([]);
        }

        // Document Resume logic
        const defaultDocId = data.defaultDocumentResumeId;
        if (data.documentResumes && Array.isArray(data.documentResumes) && data.documentResumes.length > 0) {
          const defaultDoc = data.documentResumes.find(r => r.id === defaultDocId);
          const docToShow = defaultDoc || data.documentResumes[data.documentResumes.length - 1]; // fallback to last
          if (docToShow) {
            setProfileResume({
              name: docToShow.name,
              url: docToShow.url && docToShow.url !== 'mock_url' ? docToShow.url : docToShow.localUrl
            });
          }
        } else if (data.resumeUrl || data.localResumeUrl) {
          // Legacy single resume
          setProfileResume({
            name: data.resumeName || 'Resume Document',
            url: (data.resumeUrl && data.resumeUrl !== 'mock_url') ? data.resumeUrl : data.localResumeUrl
          });
        }
      } catch (err) {
        console.error('[FindCandidates] Error fetching profile data:', err);
      }
    }
    setProfileLoading(false);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
  };

  const filteredCandidates = allCandidates.filter((candidate) => {
    // 1. Filter by Quick Filter
    let matchesFilter = true;
    if (activeFilter === 'UX/UI Designers') {
      matchesFilter = candidate.role.includes('Design') || candidate.skills.includes('Figma');
    } else if (activeFilter === 'Frontend Engineers') {
      matchesFilter = candidate.role.includes('Frontend') || candidate.role.includes('Engineer') || candidate.skills.includes('React');
    } else if (activeFilter === 'Product Managers') {
      matchesFilter = candidate.role.includes('Product Manager');
    } else if (activeFilter === 'Remote Only') {
      matchesFilter = candidate.location.includes('Remote');
    }

    // 2. Filter by Search Term
    let matchesSearch = true;
    if (searchTerm.trim() !== '') {
      const lowerSearch = searchTerm.toLowerCase();
      matchesSearch = 
        candidate.name.toLowerCase().includes(lowerSearch) ||
        candidate.role.toLowerCase().includes(lowerSearch) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(lowerSearch));
    }

    // 3. Filter by Advanced Filters
    let matchesAdvanced = true;
    if (experienceLevel !== 'Any') {
      const expYears = parseInt(candidate.experience) || 0;
      if (experienceLevel === 'Entry (0-2y)' && expYears > 2) matchesAdvanced = false;
      if (experienceLevel === 'Mid (3-5y)' && (expYears < 3 || expYears > 5)) matchesAdvanced = false;
      if (experienceLevel === 'Senior (5y+)' && expYears < 5) matchesAdvanced = false;
    }
    
    const candidateScore = parseInt(candidate.match) || 0;
    if (candidateScore < minMatchScore) {
      matchesAdvanced = false;
    }

    if (selectedSkills.length > 0) {
      // Must have ALL selected skills
      const hasAllSkills = selectedSkills.every(skill => 
        candidate.skills.some(candidateSkill => candidateSkill.toLowerCase() === skill.toLowerCase())
      );
      if (!hasAllSkills) matchesAdvanced = false;
    }

    return matchesFilter && matchesSearch && matchesAdvanced;
  });

  const filterOptions = [
    'All Candidates',
    'UX/UI Designers',
    'Frontend Engineers',
    'Product Managers',
    'Remote Only'
  ];

  return (
    <div className="space-y-lg pb-20">
      
      {/* Search and Filter Section */}
      <div className="bg-surface-container border border-outline-variant rounded-xl p-md shadow-lg flex flex-col md:flex-row gap-4 items-center mb-4">
        <div className="relative flex-grow w-full">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">search</span>
          <input 
            type="text" 
            placeholder="Search by role, skills, or keywords..." 
            className="w-full bg-surface-container-low border border-border-input rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all text-body-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 border px-6 py-3 rounded-lg transition-all font-bold w-full md:w-auto justify-center shrink-0 whitespace-nowrap ${showFilters ? 'bg-primary-container/10 border-primary-container text-primary-container' : 'bg-surface-container border-outline-variant text-text-primary hover:bg-surface-bright/20'}`}
        >
          <span className="material-symbols-outlined">tune</span>
          Filters
        </button>
        <button className="bg-primary-container text-white px-8 py-3 rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-container/20 w-full md:w-auto shrink-0">
          Search
        </button>
      </div>

      {/* Advanced Filters Drawer */}
      {showFilters && (
        <div className="bg-surface-container-low border border-outline-variant rounded-xl p-lg mb-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
            <div className="space-y-4">
              <h3 className="font-label-md text-label-md text-text-muted uppercase tracking-wider">Experience Level</h3>
              <div className="flex flex-wrap gap-2">
                {['Any', 'Entry (0-2y)', 'Mid (3-5y)', 'Senior (5y+)'].map(level => (
                  <button 
                    key={level}
                    onClick={() => setExperienceLevel(level)}
                    className={`px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wide transition-all ${experienceLevel === level ? 'bg-primary text-white border-transparent' : 'bg-surface-container-highest text-text-muted hover:text-text-primary border border-transparent hover:border-outline-variant'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-label-md text-label-md text-text-muted uppercase tracking-wider">Min. AI Match Score</h3>
                <span className="text-body-sm text-secondary font-bold">{minMatchScore}%</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="100" 
                value={minMatchScore}
                onChange={(e) => setMinMatchScore(parseInt(e.target.value))}
                className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-secondary" 
              />
              <div className="flex justify-between text-[10px] text-text-muted font-bold">
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-label-md text-label-md text-text-muted uppercase tracking-wider">Must Have Skills</h3>
              <div className="flex flex-wrap gap-2">
                {allSkillsList.map(skill => (
                  <button 
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wide transition-all ${selectedSkills.includes(skill) ? 'bg-primary text-white border-transparent' : 'bg-surface-container-highest text-text-muted hover:text-text-primary border border-transparent hover:border-outline-variant'}`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6 pt-4 border-t border-outline-variant/50">
            <button 
              onClick={() => {
                setExperienceLevel('Any');
                setMinMatchScore(70);
                setSelectedSkills([]);
                setSearchTerm('');
                setActiveFilter('All Candidates');
              }}
              className="text-primary-container font-label-md hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-xl mt-4">
        {filterOptions.map((filter) => (
          <span 
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`px-4 py-1.5 rounded-full font-label-md cursor-pointer transition-colors ${
              activeFilter === filter 
                ? 'bg-primary-container/10 border border-primary-container text-primary-container' 
                : 'bg-surface-container border border-outline-variant text-text-muted hover:text-text-primary'
            }`}
          >
            {filter}
          </span>
        ))}
      </div>

      {/* Candidate Grid */}
      {filteredCandidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="bg-card-bg border border-border-input rounded-xl p-6 hover:-translate-y-1 hover:border-primary-container/50 hover:shadow-xl transition-all group flex flex-col h-full">
              <div className="flex gap-4 items-start mb-6">
                <div className="w-16 h-16 rounded-full border-2 border-primary-container/20 overflow-hidden shrink-0 group-hover:border-primary-container transition-colors">
                  <img src={candidate.imgSrc} alt={candidate.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <h3 className="font-display text-headline-sm font-bold text-text-primary truncate">{candidate.name}</h3>
                    <p className="text-body-sm text-text-muted truncate">{candidate.role}</p>
                    <div className="flex items-center gap-1 mt-1 text-label-md text-text-muted">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      {candidate.location}
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleInitiateChat(e, candidate)}
                    className="p-1.5 rounded-full hover:bg-primary/10 text-primary transition-colors flex items-center justify-center shrink-0 border border-transparent hover:border-primary/20"
                    title="Chat with candidate"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6 bg-surface-container/50 p-3 rounded-lg border border-outline-variant/30 flex-grow mt-4">
                <div>
                  <p className="text-[11px] text-text-muted uppercase tracking-wider font-bold mb-1">AI Match Score</p>
                  <div className="flex items-center gap-2">
                    <span className="text-secondary font-bold text-body-lg">{candidate.match}</span>
                    <div className="w-16 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: candidate.match }}></div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-text-muted uppercase tracking-wider font-bold mb-1">Experience</p>
                  <p className="text-text-primary font-bold">{candidate.experience}</p>
                </div>
              </div>
              
              <div className="mt-auto">
                <button
                  onClick={() => handleViewProfile(candidate)}
                  className="w-full bg-primary text-white py-2.5 rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all text-body-sm shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-surface-container border border-outline-variant rounded-xl p-lg flex flex-col items-center justify-center min-h-[300px] text-center">
          <span className="material-symbols-outlined text-5xl text-text-muted mb-4">search_off</span>
          <h3 className="font-display text-headline-sm font-bold text-text-primary mb-2">No candidates found</h3>
          <p className="text-body-md text-text-muted max-w-md">We couldn't find any candidates matching your current filters. Try adjusting your search terms or clearing filters.</p>
          <button 
            onClick={() => { setSearchTerm(''); setActiveFilter('All Candidates'); }}
            className="mt-6 border border-primary-container text-primary-container px-6 py-2 rounded-lg font-bold hover:bg-primary-container/10 transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Profile Modal */}
      {profileModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm pt-24 px-4 pb-10 overflow-hidden" onClick={closeProfileModal}>
          <div className="bg-surface-container border border-outline-variant rounded-2xl w-full max-w-2xl shadow-2xl max-h-[calc(100vh-8.5rem)] flex flex-col" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="candidate-profile-title">
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-outline-variant/30">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-full border-2 border-primary-container/30 overflow-hidden shrink-0">
                  <img src={profileModal.imgSrc} alt={profileModal.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <h3 id="candidate-profile-title" className="font-display text-headline-sm font-bold text-text-primary">{profileModal.name}</h3>
                    <button
                      onClick={(e) => handleInitiateChat(e, profileModal)}
                      className="p-1.5 rounded-full hover:bg-primary/10 text-primary transition-colors flex items-center justify-center shrink-0"
                      title="Chat with candidate"
                    >
                      <span className="material-symbols-outlined text-[20px]">chat</span>
                    </button>
                  </div>
                  <p className="text-body-sm text-text-muted">{profileModal.role}</p>
                  <div className="flex items-center gap-1 mt-1 text-label-md text-text-muted">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    {profileModal.location}
                  </div>
                </div>
              </div>
              <button onClick={closeProfileModal} className="text-text-muted hover:text-white transition-colors p-1" aria-label="Close profile window">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-6 custom-scrollbar space-y-6">
              {/* Skills & Stats */}
              <div className="flex flex-wrap gap-2">
                {profileModal.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-primary-container/10 border border-primary-container/30 rounded-full text-[11px] font-bold text-primary-container tracking-wide uppercase">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <div className="flex-1 bg-surface-container/50 p-3 rounded-lg border border-outline-variant/30 text-center">
                  <p className="text-[11px] text-text-muted uppercase tracking-wider font-bold mb-1">AI Match</p>
                  <span className="text-secondary font-bold text-body-lg">{profileModal.match}</span>
                </div>
                <div className="flex-1 bg-surface-container/50 p-3 rounded-lg border border-outline-variant/30 text-center">
                  <p className="text-[11px] text-text-muted uppercase tracking-wider font-bold mb-1">Experience</p>
                  <span className="text-text-primary font-bold text-body-lg">{profileModal.experience}</span>
                </div>
              </div>

              {profileLoading ? (
                <div className="flex flex-col items-center py-10">
                  <div className="w-8 h-8 border-2 border-primary-container border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p className="text-text-muted text-body-sm">Loading profile data...</p>
                </div>
              ) : (
                <>
                  {/* Video Resumes Section */}
                  <div>
                    <h4 className="font-label-lg text-label-lg text-text-primary mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>videocam</span>
                      Video Resumes
                    </h4>
                    {profileVideos.length > 0 ? (
                      <div className="space-y-3">
                        {profileVideos.map((video, idx) => {
                          const playableVideoUrl = getPlayableMediaUrl(video.videoUrl) || getPlayableMediaUrl(video.localVideoUrl);

                          return (
                          <div key={idx} className="bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden">
                            {playableVideoUrl ? (
                              <CustomVideoPlayer src={playableVideoUrl} poster={video.thumbnailUrl || undefined} />
                            ) : (
                              <div className="flex min-h-[220px] flex-col items-center justify-center gap-2 bg-surface-container-low text-center">
                                <span className="material-symbols-outlined text-4xl text-text-muted opacity-50">videocam_off</span>
                                <p className="text-body-sm text-text-muted">This video resume does not have a playable file attached.</p>
                              </div>
                            )}
                            <div className="p-3 flex items-center justify-between">
                              <div>
                                <p className="text-body-sm font-bold text-text-primary">{video.title || 'Untitled Video'}</p>
                                <p className="text-[11px] text-text-muted">{video.date || ''} {video.duration ? `• ${video.duration}` : ''}</p>
                              </div>
                            </div>
                          </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-6 border border-dashed border-outline-variant rounded-xl bg-surface-container-low">
                        <span className="material-symbols-outlined text-3xl text-text-muted mb-2 opacity-50">videocam_off</span>
                        <p className="text-body-sm text-text-muted">No video resumes available.</p>
                      </div>
                    )}
                  </div>

                  {/* Document Resume Section */}
                  <div>
                    <h4 className="font-label-lg text-label-lg text-text-primary mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                      Document Resume
                    </h4>
                    {profileResume ? (
                      <a
                        href={getPlayableMediaUrl(profileResume.url) || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-surface-container-low border border-outline-variant/30 rounded-xl hover:border-primary-container/50 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-primary text-[24px]">picture_as_pdf</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-body-sm font-bold text-text-primary truncate">{profileResume.name}</p>
                          <p className="text-[11px] text-text-muted">Click to view document</p>
                        </div>
                        <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors">open_in_new</span>
                      </a>
                    ) : (
                      <div className="text-center py-6 border border-dashed border-outline-variant rounded-xl bg-surface-container-low">
                        <span className="material-symbols-outlined text-3xl text-text-muted mb-2 opacity-50">description</span>
                        <p className="text-body-sm text-text-muted">No document resume uploaded.</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default FindCandidatesPage;
