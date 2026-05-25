import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Header = ({ onNotifications, onRecordVideo }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const notifications = [
    { id: 1, icon: '✉️', title: 'Interview Invitation', body: 'Stellar AI Solutions invited you for an interview.', time: '2h ago' },
    { id: 2, icon: '⭐', title: 'New Role', body: 'A new job matching your profile is available.', time: '1d ago' }
  ];

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    if (open) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

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
        <div className="relative" ref={ref}>
          <button onClick={() => setOpen(o => !o)} className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant hover:border-primary-container transition-all relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger rounded-full border border-surface-container"></span>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-80 bg-surface-container border border-outline-variant rounded-lg shadow-xl z-50 p-3">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-display text-sm font-bold">Notifications</h4>
                <button onClick={() => setOpen(false)} className="text-text-muted hover:text-white"><span className="material-symbols-outlined">close</span></button>
              </div>
              <ul className="space-y-3">
                {notifications.map(n => (
                  <li key={n.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-surface-container-high">
                    <div className="w-9 h-9 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container font-bold">{n.icon}</div>
                    <div>
                      <p className="text-body-sm text-text-primary font-medium">{n.title}</p>
                      <p className="text-[13px] text-text-muted">{n.body}</p>
                      <p className="text-[11px] text-text-muted mt-1">{n.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
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

const VideoResumeCard = () => (
  <section className="bg-card-bg border border-outline-variant rounded-xl p-lg mb-xl flex flex-col md:flex-row gap-lg items-center">
    <div className="w-full md:w-1/2 aspect-video rounded-xl overflow-hidden relative group cursor-pointer border border-outline-variant">
      <img alt="Video Resume Preview" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_GF5MJ5bsHxGVaK7hfiEk4JsPfW918undolrN6k6kvZSaSeW9lED9IULTwqvgxAYRBxQfpwoBK3PGEUowoHLkakXcdbtyuyfq9ysOhcyMWScdoUe1MXt6-V-NrVOcz5ytnycpVDaqQNfnVRTjMvpesUrhRfjIaS0LXQGsl1DtIyRaAuZIlhhKsZVLkHt0ZoufCLH9b5tmDDhMm_h6hILURl6Agw71lEOM1rgLpQZNuKTI9YvySXZHIyGmMKYsvh3vTinIB_3Hnco" />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
        <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[12px] font-bold">
        01:42
      </div>
    </div>
    <div className="w-full md:w-1/2">
      <h2 className="font-display text-headline-md text-text-primary mb-2">My Video Resume</h2>
      <div className="flex gap-4 text-text-muted font-body-sm mb-6">
        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">calendar_month</span> Uploaded: Oct 12, 2023</span>
        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">visibility</span> 142 Views</span>
      </div>
      <div className="flex gap-4">
        <Link to="/recorder" className="flex-1 text-center border border-primary-container text-primary-container py-3 rounded-lg font-bold hover:bg-primary-container/10 transition-colors block">
          Replace Video
        </Link>
        <Link to="/recorder" className="flex-1 text-center text-text-muted py-3 rounded-lg font-bold hover:bg-surface-bright/5 transition-colors block">
          Re-record
        </Link>
      </div>
    </div>
  </section>
);

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
              <img alt="Company Logo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzKPmbzbR76U4h2XDpCWhDK4r1MxV_fxJrT1PDyDBQN0J0ZiGg_i1Dsz1e0cY08_LSOWF0jCvrddSgI9qhsFr5Po6yCN9w3ViUDimQJ8k7qo0Qs_wIsQoEGBbcGPIwWP67FORaWTgj-Cx2gz6VDAQ6V4bhrzrdYf6pJRGNbtcRRHWmlWIeDNfvwUSrDdupp0WFhaAFIhn4qrC6BBbiP1MlRm4T0rZPLQQoDr30mQNx6jecOdfH-s7OKYcoIMu5gD9wKY3ZzeR4uIE" />
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
              <img alt="Company Logo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiZC7QvM4WWJjYrKE_YJOGoHxaepeutJan3fxUnBZ4mqW-FtYIAWrSb4HqXrW7go6GePkBPSmxUKjgtIgXDGIFyCNndbQeAQZ77IeFjU2s-u0zE398Xc2qn2ttFVPDrbCWFq7A7UwTlVVNXn2CY_nSwivijM1n7VHc-67DiCqRomEElpwdIqqYGKUnDqFskPBFcCi9Gz31RYt4Z-tz0506I_3FmWxoJmNjiUNZ1cgsPtM61nSgTDYqUthZfa3H6OkmHDPn4gSnC_I" />
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
  const [userApplications, setUserApplications] = useState(() => JSON.parse(localStorage.getItem('visume_applications') || '[]'));

  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem('visume_applications') || '[]');
    setUserApplications(apps);
  }, []);

  const handleRecordVideo = () => {
    navigate('/recorder');
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

  return (
    <>
      <Header onNotifications={handleNotifications} onRecordVideo={handleRecordVideo} />
      <StatsRow />
      <VideoResumeCard />
      <AppliedJobsSection applications={userApplications} />
      <RecommendedJobs onApplyJob={handleApplyJob} />
      <Footer />

      {/* Apply Confirmation Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container border border-outline-variant rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
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
    </>
  );
};

export default CandidateDashboard;
