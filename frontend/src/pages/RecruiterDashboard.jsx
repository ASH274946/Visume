import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';

const getStoredProfile = () => {
  try {
    return JSON.parse(localStorage.getItem('visume_profile_data') || '{}');
  } catch {
    return {};
  }
};

const demoCandidates = [
  {
    id: 'demo-julian-vance',
    name: 'Julian Vance',
    role: 'UX/UI Design Lead',
    location: 'San Francisco, CA',
    skills: ['Figma', 'Prototyping', 'User Research'],
    experience: '8 years',
    imgSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&h=256&q=80',
    isDemo: true
  },
  {
    id: 'demo-lila-chen',
    name: 'Lila Chen',
    role: 'Senior Product Architect',
    location: 'Remote',
    skills: ['Growth', 'SaaS', 'Strategy'],
    experience: '6 years',
    imgSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    isDemo: true
  },
  {
    id: 'demo-marcus-thorne',
    name: 'Marcus Thorne',
    role: 'Frontend Developer',
    location: 'New York, NY',
    skills: ['React', 'TypeScript', 'Tailwind'],
    experience: '4 years',
    imgSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80',
    isDemo: true
  },
  {
    id: 'demo-sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Full Stack Engineer',
    location: 'London, UK',
    skills: ['Node.js', 'MongoDB', 'AWS'],
    experience: '5 years',
    imgSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
    isDemo: true
  },
  {
    id: 'demo-david-kim',
    name: 'David Kim',
    role: 'Product Manager',
    location: 'Seattle, WA',
    skills: ['Agile', 'Jira', 'Roadmapping'],
    experience: '7 years',
    imgSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    isDemo: true
  },
  {
    id: 'demo-elena-rodriguez',
    name: 'Elena Rodriguez',
    role: 'Data Scientist',
    location: 'Remote',
    skills: ['Python', 'Machine Learning', 'SQL'],
    experience: '3 years',
    imgSrc: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&h=256&q=80',
    isDemo: true
  }
];

const getMediaUrl = (url) => {
  if (!url || url === 'mock_url') return null;
  if (url.startsWith('/uploads')) return `http://localhost:5000${url}`;
  return url;
};

const getTimestamp = (value) => {
  if (!value) return Date.now();
  if (typeof value.toDate === 'function') return value.toDate().getTime();
  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? Date.now() : parsed;
};

const formatRelativeTime = (value) => {
  const diff = Date.now() - getTimestamp(value);
  const minutes = Math.max(1, Math.floor(diff / 60000));
  if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
};

const getDeterministicMatch = (candidate, jobs) => {
  const candidateSkills = (candidate.skills || []).map(skill => skill.toLowerCase());
  const jobSkills = jobs.flatMap(job => job.skills || []).map(skill => String(skill).toLowerCase());
  const sharedSkills = candidateSkills.filter(skill => jobSkills.includes(skill)).length;
  const nameSeed = (candidate.name || candidate.id || '').split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return Math.min(99, 82 + sharedSkills * 4 + (nameSeed % 8));
};

const HeaderSection = () => {
  const profileData = getStoredProfile();
  const userName = profileData.fullName ? profileData.fullName.split(' ')[0] : 'Sarah';

  return (
    <header className="mb-lg">
      <div className="space-y-1">
        <h1 className="font-headline-lg text-headline-lg text-text-primary">Good morning, {userName}</h1>
        <p className="font-body-md text-text-muted">Here's what's happening with your hiring pipeline today.</p>
      </div>
    </header>
  );
};

const StatsRow = ({ metrics }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter mb-xl">
    {[
      { label: 'Active Jobs', value: metrics.activeJobs, detail: `${metrics.pausedJobs} paused` },
      { label: 'Total Applicants', value: metrics.totalApplicants, detail: `${metrics.totalViews} profile views` },
      { label: 'Interviews Today', value: metrics.interviewsToday, detail: metrics.nextInterview || 'No interviews scheduled' },
      { label: 'Hires This Month', value: metrics.hiresThisMonth, detail: `Goal: ${metrics.hiringGoal}` }
    ].map((item) => (
      <div key={item.label} className="bg-card-bg border border-border-base p-md rounded-xl hover:border-primary/50 transition-all group">
        <p className="font-label-md text-text-muted uppercase tracking-wider mb-xs">{item.label}</p>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-headline-lg text-text-primary group-hover:text-primary transition-colors">{item.value}</span>
          <span className="text-secondary text-label-md font-bold">{item.detail}</span>
        </div>
      </div>
    ))}
  </div>
);

const AIMatchedCandidates = ({ candidates, onViewProfile }) => (
  <section className="lg:w-[70%]">
    <div className="flex items-center justify-between mb-md">
      <h2 className="font-headline-md text-headline-md text-text-primary">AI-Matched Candidates</h2>
    </div>

    {candidates.length === 0 ? (
      <div className="bg-card-bg border border-dashed border-outline-variant rounded-xl p-lg text-center text-text-muted">
        No candidate profiles are available yet.
      </div>
    ) : (
      <div className="flex gap-md overflow-x-auto pb-gutter snap-x custom-scrollbar">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="min-w-[320px] bg-card-bg border border-border-base rounded-xl p-md snap-start hover:shadow-2xl hover:shadow-primary/10 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150"></div>
            <div className="flex items-start gap-md mb-md relative">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 p-0.5">
                <img alt={candidate.name} className="w-full h-full object-cover rounded-full" src={candidate.imgSrc} />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-secondary rounded-full border-2 border-card-bg"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-headline-sm text-headline-sm text-text-primary truncate">{candidate.name}</h3>
                <p className="font-label-md text-text-muted truncate">{candidate.role}</p>
                <p className="font-label-md text-text-muted text-[12px] truncate">{candidate.location}</p>
              </div>
            </div>

            <div className="space-y-md mb-md">
              <div className="flex flex-wrap gap-1.5 min-h-7">
                {candidate.skills.slice(0, 3).map(tag => (
                  <span key={tag} className="bg-surface-bright/20 px-2 py-0.5 rounded-full text-[10px] text-text-muted font-bold uppercase tracking-widest">{tag}</span>
                ))}
              </div>
              <div className="bg-secondary-container text-secondary px-3 py-2 rounded-lg flex items-center justify-between">
                <span className="font-label-md font-bold">AI Match Score</span>
                <span className="font-headline-sm">{candidate.match}%</span>
              </div>
            </div>

            <button
              onClick={() => onViewProfile(candidate)}
              className="w-full bg-primary text-white py-2.5 rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all text-body-sm shadow-md shadow-primary/20 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
              View Profile
            </button>
          </div>
        ))}
      </div>
    )}
  </section>
);

const RecentActivity = ({ activities }) => (
  <section className="lg:w-[30%]">
    <div className="flex items-center justify-between mb-md">
      <h2 className="font-headline-md text-headline-md text-text-primary">Recent Activity</h2>
    </div>

    <div className="bg-card-bg border border-border-base rounded-xl overflow-hidden">
      <div className="p-md space-y-lg">
        {activities.length === 0 ? (
          <p className="text-body-sm text-text-muted text-center py-8">Activity will appear as candidates view jobs and jobs are updated.</p>
        ) : (
          activities.map((activity, index) => (
            <div key={activity.id} className="flex gap-md relative">
              {index < activities.length - 1 && <div className="absolute left-5 top-10 bottom-[-24px] w-0.5 bg-outline-variant/30"></div>}
              <div className="w-10 h-10 rounded-full border border-primary/20 p-0.5 shrink-0 bg-surface-container flex items-center justify-center overflow-hidden">
                {activity.image ? (
                  <img alt="" className="w-full h-full object-cover rounded-full" src={activity.image} />
                ) : (
                  <span className="material-symbols-outlined text-secondary text-[20px]">{activity.icon}</span>
                )}
              </div>
              <div className="space-y-1">
                <p className="font-body-sm text-text-primary">{activity.text}</p>
                <p className="font-label-md text-text-muted">{formatRelativeTime(activity.time)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </section>
);

const ActivePipelines = ({ jobs }) => (
  <section className="mt-xl">
    <h2 className="font-headline-md text-headline-md text-text-primary mb-md">Active Jobs</h2>
    {jobs.length === 0 ? (
      <div className="bg-card-bg border border-dashed border-outline-variant rounded-xl p-lg text-center text-text-muted">
        No active jobs yet. Use Post a Job to create one.
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {jobs.slice(0, 4).map(job => {
          const viewers = Array.isArray(job.viewers) ? job.viewers : [];
          return (
            <Link key={job.id} to="/post-job" className="bg-card-bg border border-border-base rounded-xl p-md flex items-center justify-between group cursor-pointer hover:border-primary/40 transition-all">
              <div className="flex items-center gap-md min-w-0">
                <div className="w-12 h-12 rounded-lg bg-surface-bright flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[28px]">work</span>
                </div>
                <div className="min-w-0">
                  <h4 className="font-body-md font-bold text-text-primary truncate">{job.title}</h4>
                  <p className="font-label-md text-text-muted">{viewers.length} viewer{viewers.length === 1 ? '' : 's'} • {job.status || 'active'}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors">chevron_right</span>
            </Link>
          );
        })}
      </div>
    )}
  </section>
);

const CandidateProfileModal = ({ candidate, loading, onClose }) => {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm pt-24 px-4 pb-10 overflow-hidden" onClick={onClose}>
      <div className="bg-surface-container border border-outline-variant rounded-2xl w-full max-w-2xl shadow-2xl max-h-[calc(100vh-8.5rem)] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between p-6 border-b border-outline-variant/30">
          <div className="flex gap-4 min-w-0">
            <img src={candidate.imgSrc} alt={candidate.name} className="w-16 h-16 rounded-full border-2 border-primary-container/30 object-cover shrink-0" />
            <div className="min-w-0">
              <h3 className="font-display text-headline-sm font-bold text-text-primary truncate">{candidate.name}</h3>
              <p className="text-body-sm text-text-muted">{candidate.role}</p>
              <p className="mt-1 flex items-center gap-1 text-label-md text-text-muted">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                {candidate.location}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-white transition-colors p-1">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-6 custom-scrollbar space-y-6">
          {loading ? (
            <div className="flex flex-col items-center py-10 text-text-muted">
              <div className="w-8 h-8 border-2 border-primary-container border-t-transparent rounded-full animate-spin mb-3"></div>
              Loading profile...
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-primary-container/10 border border-primary-container/30 rounded-full text-[11px] font-bold text-primary-container tracking-wide uppercase">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container/50 p-3 rounded-lg border border-outline-variant/30 text-center">
                  <p className="text-[11px] text-text-muted uppercase tracking-wider font-bold mb-1">AI Match</p>
                  <span className="text-secondary font-bold text-body-lg">{candidate.match}%</span>
                </div>
                <div className="bg-surface-container/50 p-3 rounded-lg border border-outline-variant/30 text-center">
                  <p className="text-[11px] text-text-muted uppercase tracking-wider font-bold mb-1">Experience</p>
                  <span className="text-text-primary font-bold text-body-lg">{candidate.experience}</span>
                </div>
              </div>

              <section>
                <h4 className="font-label-lg text-label-lg text-text-primary mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">videocam</span>
                  Video Resumes
                </h4>
                {candidate.videos?.length > 0 ? (
                  <div className="space-y-3">
                    {candidate.videos.map(video => {
                      const videoUrl = getMediaUrl(video.videoUrl) || getMediaUrl(video.localVideoUrl);
                      return (
                        <div key={video.id} className="bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden">
                          {videoUrl ? (
                            <video src={videoUrl} controls preload="metadata" playsInline poster={video.thumbnailUrl || undefined} className="w-full max-h-[300px] object-contain bg-black" />
                          ) : (
                            <div className="min-h-[180px] flex items-center justify-center text-text-muted">No playable video file.</div>
                          )}
                          <div className="p-3">
                            <p className="text-body-sm font-bold text-text-primary">{video.title || 'Untitled Video'}</p>
                            <p className="text-[11px] text-text-muted">{video.date || ''} {video.duration ? `• ${video.duration}` : ''}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-center py-6 border border-dashed border-outline-variant rounded-xl bg-surface-container-low text-body-sm text-text-muted">No video resumes available.</p>
                )}
              </section>

              <section>
                <h4 className="font-label-lg text-label-lg text-text-primary mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">description</span>
                  Document Resume
                </h4>
                {candidate.resume ? (
                  <a href={getMediaUrl(candidate.resume.url)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-surface-container-low border border-outline-variant/30 rounded-xl hover:border-primary-container/50 transition-all">
                    <span className="material-symbols-outlined text-primary">picture_as_pdf</span>
                    <span className="flex-1 truncate font-bold text-text-primary">{candidate.resume.name}</span>
                    <span className="material-symbols-outlined text-text-muted">open_in_new</span>
                  </a>
                ) : (
                  <p className="text-center py-6 border border-dashed border-outline-variant rounded-xl bg-surface-container-low text-body-sm text-text-muted">No document resume uploaded.</p>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const RecruiterDashboard = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const closeCandidateProfile = useCallback(() => {
    setSelectedCandidate(null);
  }, []);

  useEffect(() => {
    if (!selectedCandidate) return;

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
        closeCandidateProfile();
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
  }, [selectedCandidate, closeCandidateProfile]);

  useEffect(() => {
    const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const profileData = getStoredProfile();
      const companyName = profileData.companyName || profileData.fullName || 'Unknown Company';
      const recruiterId = auth.currentUser?.uid || '';
      const jobs = snapshot.docs
        .map(docSnap => ({ id: docSnap.id, ...docSnap.data() }))
        .filter(job => (recruiterId ? job.recruiterId === recruiterId : job.company === companyName));
      setPostedJobs(jobs);
    }, (error) => {
      console.error('Error fetching dashboard jobs:', error);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'candidates'), (snapshot) => {
      const loadedCandidates = snapshot.docs.map(docSnap => {
        const data = docSnap.data();
        const skills = Array.isArray(data.skills) ? data.skills : [];
        const expMatch = (data.previousExperience || data.bio || '').match(/(\d+)\+?\s*years?/i);
        return {
          id: docSnap.id,
          name: data.fullName || 'Unknown Candidate',
          role: data.headline || 'Candidate',
          location: data.location || 'Remote',
          skills,
          experience: expMatch ? `${parseInt(expMatch[1])} years` : '2 years',
          imgSrc: data.profileImage || data.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.fullName || 'Candidate')}&background=6C5CE7&color=fff&size=256`,
          isDemo: false
        };
      });
      setCandidates(loadedCandidates);
    }, (error) => {
      console.error('Error fetching dashboard candidates:', error);
    });

    return () => unsubscribe();
  }, []);

  const matchedCandidates = useMemo(() => {
    const liveMatches = candidates
      .map(candidate => ({ ...candidate, match: getDeterministicMatch(candidate, postedJobs) }))
      .sort((a, b) => b.match - a.match);
    const demoMatches = demoCandidates
      .map(candidate => ({ ...candidate, match: getDeterministicMatch(candidate, postedJobs) }))
      .sort((a, b) => b.match - a.match);

    return [...liveMatches, ...demoMatches];
  }, [candidates, postedJobs]);

  const metrics = useMemo(() => {
    const activeJobs = postedJobs.filter(job => (job.status || 'active') === 'active').length;
    const pausedJobs = postedJobs.filter(job => job.status === 'paused').length;
    const allViewers = postedJobs.flatMap(job => Array.isArray(job.viewers) ? job.viewers : []);
    const totalViews = postedJobs.reduce((sum, job) => sum + (job.viewCount || (Array.isArray(job.viewers) ? job.viewers.length : 0)), 0);
    const totalApplicants = new Set(allViewers.map(viewer => viewer.uid || viewer.name)).size;
    const today = new Date().toISOString().slice(0, 10);
    const interviews = JSON.parse(localStorage.getItem('visume_interviews') || '[]');
    const todaysInterviews = interviews.filter(interview => String(interview.date || '').startsWith(today));
    const hires = JSON.parse(localStorage.getItem('visume_hires') || '[]');
    const currentMonth = new Date().toISOString().slice(0, 7);
    const hiresThisMonth = hires.filter(hire => String(hire.date || '').startsWith(currentMonth)).length;

    return {
      activeJobs,
      pausedJobs,
      totalApplicants,
      totalViews,
      interviewsToday: todaysInterviews.length,
      nextInterview: todaysInterviews[0]?.time ? `Next at ${todaysInterviews[0].time}` : '',
      hiresThisMonth,
      hiringGoal: 5
    };
  }, [postedJobs]);

  const activities = useMemo(() => {
    const jobCreated = postedJobs.map(job => ({
      id: `job-${job.id}`,
      time: job.createdAt,
      icon: 'work',
      text: `${job.title || 'A job'} was posted.`
    }));
    const jobViewed = postedJobs.flatMap(job => (
      (Array.isArray(job.viewers) ? job.viewers : []).map(viewer => ({
        id: `view-${job.id}-${viewer.uid || viewer.name}`,
        time: viewer.viewedAt,
        image: viewer.profileImage,
        text: `${viewer.name || 'A candidate'} viewed ${job.title || 'your job'}.`
      }))
    ));

    return [...jobCreated, ...jobViewed]
      .sort((a, b) => getTimestamp(b.time) - getTimestamp(a.time))
      .slice(0, 5);
  }, [postedJobs]);

  const openCandidateProfile = async (candidate) => {
    setSelectedCandidate({ ...candidate, videos: [], resume: null });

    if (candidate.isDemo) {
      setProfileLoading(false);
      return;
    }

    setProfileLoading(true);

    try {
      const candidateDoc = await getDoc(doc(db, 'candidates', candidate.id));
      const candidateData = candidateDoc.exists() ? candidateDoc.data() : {};
      const videosSnap = await getDocs(collection(db, 'candidates', candidate.id, 'videoResumes'));
      const videos = videosSnap.docs.map(videoDoc => ({ id: videoDoc.id, ...videoDoc.data() }));
      setSelectedCandidate({
        ...candidate,
        skills: candidateData.skills || candidate.skills,
        name: candidateData.fullName || candidate.name,
        role: candidateData.headline || candidate.role,
        location: candidateData.location || candidate.location,
        imgSrc: candidateData.profileImage || candidateData.photoURL || candidate.imgSrc,
        videos,
        resume: candidateData.resumeUrl || candidateData.localResumeUrl
          ? {
              name: candidateData.resumeName || 'Resume Document',
              url: candidateData.resumeUrl || candidateData.localResumeUrl
            }
          : null
      });
    } catch (error) {
      console.error('Error loading candidate profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  return (
    <>
      <HeaderSection />
      <StatsRow metrics={metrics} />
      <div className="flex flex-col lg:flex-row gap-gutter">
        <AIMatchedCandidates candidates={matchedCandidates} onViewProfile={openCandidateProfile} />
        <RecentActivity activities={activities} />
      </div>
      <ActivePipelines jobs={postedJobs.filter(job => (job.status || 'active') === 'active')} />
      <CandidateProfileModal candidate={selectedCandidate} loading={profileLoading} onClose={closeCandidateProfile} />
    </>
  );
};

export default RecruiterDashboard;
