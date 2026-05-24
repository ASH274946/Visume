import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TopNav = () => (
  <nav className="fixed top-0 z-50 w-full h-16 bg-surface-container/70 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-gutter max-w-container-max mx-auto left-0 right-0">
    <div className="flex items-center gap-8">
      <Link to="/" className="font-display text-headline-md font-bold text-primary-container">Visume</Link>
      <div className="hidden md:flex items-center gap-6">
        <Link className="text-primary-container font-bold border-b-2 border-primary-container pb-1" to="/discover">Discover</Link>
        <Link className="text-text-muted font-medium hover:text-text-primary transition-colors" to="/applications">Applications</Link>
        <Link className="text-text-muted font-medium hover:text-text-primary transition-colors" to="/dashboard">Messages</Link>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <Link to="/recorder" className="hidden md:flex items-center gap-2 bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all active:scale-95">
        <span className="material-symbols-outlined text-[20px]">videocam</span>
        Upload Video
      </Link>
      <Link to="/settings" state={{ role: 'candidate' }} className="w-10 h-10 rounded-full border-2 border-outline-variant overflow-hidden hover:border-primary transition-all">
        <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpwpLefYN84jpH8f4wFaL4A5turgZSIciHwj8h8C1LkCsekK2uDKaLCBoyLvL7ERBi63YDv4nJztwF-QmrNMj11AUujXKilseKCO6hhxFtUjtOhTK-hlsrJNk9oZzL4QsuJSVdEOcX0A1aZ-Ls8zj5o-x4cLEURN8aFd5lnAihxE5uLOmD2a3igzboWPe_xBFEcrtZ0i3ncx5Vc3yCVCp8p3SomzS3GZVwS2G9B-fpxM6K2-wAbj44unXMwkvBS8gXub7cBEyBNA4" />
      </Link>
    </div>
  </nav>
);

const FilterSidebar = () => (
  <aside className="fixed left-4 top-[80px] bottom-4 w-sidebar-width bg-surface-container border border-outline-variant rounded-2xl shadow-xl shadow-black/40 sidebar-scroll overflow-y-auto hidden lg:flex flex-col p-6 gap-8 z-40">
    <div className="flex items-center justify-between">
      <h2 className="font-display text-headline-sm font-bold text-text-primary">Filter Jobs</h2>
      <span className="material-symbols-outlined text-text-muted cursor-pointer hover:text-primary">tune</span>
    </div>
    
    <div className="relative">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">search</span>
      <input className="w-full bg-surface-container-low border border-border-input rounded-lg pl-10 pr-4 py-3 text-body-sm focus:outline-none focus:border-primary-container transition-all" placeholder="Search roles, skills..." type="text"/>
    </div>
    
    <div className="space-y-4">
      <h3 className="font-label-md text-label-md text-text-muted uppercase tracking-wider">Work Mode</h3>
      <div className="flex flex-wrap gap-2">
        <button className="px-4 py-2 rounded-full border border-primary-container bg-primary-container/10 text-primary-container text-body-sm font-medium">Remote</button>
        <button className="px-4 py-2 rounded-full border border-outline text-text-muted hover:border-text-primary hover:text-text-primary text-body-sm transition-all">Hybrid</button>
        <button className="px-4 py-2 rounded-full border border-outline text-text-muted hover:border-text-primary hover:text-text-primary text-body-sm transition-all">Onsite</button>
      </div>
    </div>
    
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-label-md text-label-md text-text-muted uppercase tracking-wider">Salary (Annual)</h3>
        <span className="text-body-sm text-primary-container font-bold">₹4L — ₹18L</span>
      </div>
      <input className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary-container" max="50" min="4" type="range" defaultValue="18"/>
    </div>
    
    <div className="space-y-4">
      <h3 className="font-label-md text-label-md text-text-muted uppercase tracking-wider">Experience</h3>
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input className="w-5 h-5 rounded border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container" type="checkbox"/>
          <span className="text-body-sm text-on-surface-variant group-hover:text-text-primary">Entry Level (0-2y)</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input defaultChecked className="w-5 h-5 rounded border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container" type="checkbox"/>
          <span className="text-body-sm text-on-surface-variant group-hover:text-text-primary">Intermediate (2-5y)</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input className="w-5 h-5 rounded border-outline-variant bg-surface-container-low text-primary-container focus:ring-primary-container" type="checkbox"/>
          <span className="text-body-sm text-on-surface-variant group-hover:text-text-primary">Senior (5y+)</span>
        </label>
      </div>
    </div>
    
    <div className="p-4 rounded-xl bg-secondary-container/5 border border-secondary-container/20 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <span className="text-body-sm font-bold text-tertiary">AI Smart Match</span>
        </div>
        <div className="relative inline-flex items-center cursor-pointer">
          <input defaultChecked className="sr-only peer" type="checkbox"/>
          <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tertiary-container"></div>
        </div>
      </div>
      <p className="text-label-md text-text-muted leading-tight">Only show roles with 80%+ match to your Visume profile.</p>
    </div>
    
    <button className="w-full bg-primary-container text-white py-3 rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all mt-auto">
      Apply Filters
    </button>
  </aside>
);

const JobGrid = () => {
  const navigate = useNavigate();
  const [applyingIdx, setApplyingIdx] = useState(null);

  const jobs = [
    {
      title: "Lead Product Designer",
      company: "Stripe",
      location: "Bengaluru, Remote",
      match: "94%",
      type: "Full-time",
      salary: "₹32L - ₹45L",
      tags: ["Figma", "React", "System Design"],
      imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDV5e4vAgXZRv0Wi0xXXP-AUbs95CyYHPi3KB9g9CgpBrUUtV4bRDj42IQ8Xg6GzfVyjQDg2sBfS3zbUtPJ9CbFch0UE-QVdYdUv3PK6MOTYRWar9jLW-AG7Yq_GCO6EkspjoG5gkeCSmTrYQe_rKLfqkC4JB_odZpT4jJGKwIBQeNJGc5ohX3sr5EalT4Q0dI8T5aTWgkhPeePuspvxmslJqxOb37uFp6ocrtcNykzCTXGECmZNBxYXnNcFpESWzOUHyZhIrB_0s0"
    },
    {
      title: "Senior Frontend Engineer",
      company: "Linear",
      location: "Remote, Worldwide",
      match: "88%",
      type: "Contract",
      salary: "₹18L - ₹24L",
      tags: ["TypeScript", "Next.js", "Tailwind"],
      imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-lhqKOjGP6xHFcqBouv7dl2bE83smaRrnB-1K2RdX-L2qptNszpOeGQ5ib2B3aLtEkRO3kwk2PNoHEedIWQX1l0-PW6dCFJbJbD3HvofWPotf7hjRSP9hDwxeNZQogUYVoCDNYiaN02ufPRrBGuqPkvNXssgE5qouWboSLqUUw9tQ5BKYXmEqJaBeUKca7rWbNiEoCkmnj-Ak5Yld3Q3lCfN_mzYlYjYbK3QC6SK-6vTccj5pRDjRUi2W_nH4zpClvPA64kDVe-o"
    },
    {
      title: "Growth Marketing Manager",
      company: "Airbnb",
      location: "Mumbai, Hybrid",
      match: "82%",
      type: "Full-time",
      salary: "₹22L - ₹28L",
      tags: ["SEO", "Analytics", "Content Strategy"],
      imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxduIDdQnJKZfs_o2kWY8ZPhvweUTTxv4agnhI04KksPs2Ik5bF1hSfkCEBUMsxy3MEWiD5Wmm8ZTSyTNDtXIQlUUidz6_egF4OamUM5ibflmgOgZIhlHF6YbkBze4FL8panyBGYNUlpvD2PdXnYHZGZJr8RierMQ116fmv2-sjNs8nKUXnhx9-nZxLyP-oFO7382bfRzm99WwKRRKIeTspkYaNHWzfIEwJkksuMhiNC59qtPqKtsbfXwdJEdBNjhKhkldQdz1o3Q"
    },
    {
      title: "iOS Developer (Visume Only)",
      company: "Discord",
      location: "Remote",
      match: "97%",
      type: "Full-time",
      salary: "₹40L - ₹55L",
      tags: ["SwiftUI", "Combine", "WebRTC"],
      imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRB-8eb0mm0mj3bIRrxa_i3FqMCwkhopnm_2AELOGoyjCmQHqHJkKYTfCufEaAwJLmQ-xS1vKpJaTLHpwYHZ5FpjK_NkxbJPDtjx6uEYZBHqeUd3pes-VhhclRpuQsnupq5SuTGKZcYML7xhtPBBSsNOpjrFeUnXRDqMP77vUaUeaI0kdNy1XwrWSiB6-CG86-YJuNljRqWyG26OsUviRCwOZHOAnhpkx9ZE_J1K5kX0zufACc2KdloIbfXr_xXQfCRi8DEx7zFmc"
    }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-gutter">
      {jobs.map((job, idx) => (
        <div key={idx} className="job-card bg-surface-container border border-border-input p-6 rounded-xl transition-all duration-300 flex flex-col gap-5 hover:-translate-y-1 hover:border-primary-container shadow-lg">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center border border-outline-variant overflow-hidden p-2">
                <img alt={job.company} className="w-full h-full object-contain" src={job.imgSrc} />
              </div>
              <div>
                <h3 className="font-display text-headline-sm font-bold text-text-primary">{job.title}</h3>
                <p className="text-body-sm text-text-muted mt-1">{job.company} • {job.location}</p>
              </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-surface-bright text-text-muted transition-colors">
              <span className="material-symbols-outlined" style={idx === 1 ? { fontVariationSettings: "'FILL' 1", color: '#6c5ce7' } : {}}>bookmark</span>
            </button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-secondary-container/10 text-tertiary text-label-md font-bold">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              {job.match} Match
            </div>
            <span className="px-2 py-1 rounded bg-surface-container-highest text-text-muted text-label-md">{job.type}</span>
            <span className="px-2 py-1 rounded bg-surface-container-highest text-primary-container text-label-md font-bold">{job.salary}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag, tIdx) => (
              <span key={tIdx} className="px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-label-md text-text-muted">{tag}</span>
            ))}
          </div>
          
          <div className="flex gap-4 mt-auto">
            <button type="button" className="flex-1 py-2.5 rounded-lg border border-primary-container text-primary-container font-bold hover:bg-primary-container/10 transition-all">View Details</button>
            <button 
              type="button" 
              onClick={() => {
                setApplyingIdx(idx);
                setTimeout(() => {
                  alert(`Successfully applied to ${job.title} at ${job.company} using your Visume!`);
                  navigate('/applications');
                }, 800);
              }}
              disabled={applyingIdx !== null}
              className="flex-1 py-2.5 rounded-lg bg-primary-container text-white font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-container/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {applyingIdx === idx ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : "Quick Apply"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const MobileNav = () => (
  <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-surface-container border-t border-outline-variant flex justify-around items-center px-4 z-50">
    <button className="flex flex-col items-center gap-1 text-primary-container">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
      <span className="text-[10px] font-bold">Discover</span>
    </button>
    <button className="flex flex-col items-center gap-1 text-text-muted">
      <span className="material-symbols-outlined">work</span>
      <span className="text-[10px]">Applied</span>
    </button>
    <button className="flex flex-col items-center gap-1 text-text-muted">
      <span className="material-symbols-outlined">chat</span>
      <span className="text-[10px]">Messages</span>
    </button>
    <button className="flex flex-col items-center gap-1 text-text-muted">
      <span className="material-symbols-outlined">account_circle</span>
      <span className="text-[10px]">Profile</span>
    </button>
  </nav>
);

const Footer = () => (
  <footer className="mt-xxl border-t border-outline-variant py-lg flex flex-col md:flex-row justify-between items-center gap-6">
    <div className="text-center md:text-left">
      <span className="font-display text-headline-sm font-bold text-text-primary">Visume</span>
      <p className="font-body-sm text-body-sm text-text-muted mt-2">© 2024 Visume. Personality-driven hiring.</p>
    </div>
    <div className="flex flex-wrap justify-center gap-6">
      <Link className="text-label-md font-label-md text-text-muted hover:text-secondary transition-colors" to="/">Privacy Policy</Link>
      <Link className="text-label-md font-label-md text-text-muted hover:text-secondary transition-colors" to="/">Terms of Service</Link>
      <Link className="text-label-md font-label-md text-text-muted hover:text-secondary transition-colors" to="/recruiter">For Recruiters</Link>
      <Link className="text-label-md font-label-md text-text-muted hover:text-secondary transition-colors" to="/">About Us</Link>
    </div>
  </footer>
);

const JobDiscoveryPage = () => {
  return (
    <div className="bg-background text-text-primary overflow-x-hidden min-h-screen">
      <TopNav />
      <div className="flex pt-16 min-h-screen max-w-[1440px] mx-auto pb-20 md:pb-0">
        <FilterSidebar />
        <main className="flex-1 lg:ml-[272px] p-lg md:p-xl space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="font-display text-headline-lg font-bold">Discover Roles</h1>
              <p className="text-body-md text-text-muted">Showing 24 jobs matching your profile and filters</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-body-sm text-text-muted">Sort by:</span>
              <button className="flex items-center gap-2 bg-surface-container border border-outline-variant px-4 py-2 rounded-lg text-body-sm font-medium">
                Best Match
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-2 px-3 py-1 bg-surface-container border border-outline-variant rounded-full text-label-md text-on-surface-variant">
              Remote
              <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-danger">close</span>
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-surface-container border border-outline-variant rounded-full text-label-md text-on-surface-variant">
              ₹10L - ₹20L
              <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-danger">close</span>
            </span>
            <button className="text-label-md text-primary-container font-bold hover:underline">Clear all</button>
          </div>
          
          <JobGrid />
          <Footer />
        </main>
      </div>
      <MobileNav />
    </div>
  );
};

export default JobDiscoveryPage;
