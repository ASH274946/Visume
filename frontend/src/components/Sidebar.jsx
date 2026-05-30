import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role = 'candidate', activePage = '' }) => {
  const profileData = JSON.parse(localStorage.getItem('visume_profile_data')) || {};
  const userName = profileData.fullName || (role === 'recruiter' ? 'Sarah Jenkins' : 'Ashwin Kumar');
  const profileImage = profileData.profileImage || (role === 'recruiter'
    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
    : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80");
  const companyName = profileData.companyName || 'NovaStream AI';
  const companyLogo = profileData.companyLogo || "https://logo.clearbit.com/stripe.com";

  if (role === 'recruiter') {
    return (
      <aside className="w-[240px] flex-shrink-0 bg-surface-container border border-outline-variant flex flex-col h-[calc(125vh-32px)] my-4 ml-4 rounded-2xl shadow-xl shadow-black/40 z-50">
        <div className="p-md">
          <div className="flex items-center gap-xs">
            <Link to="/" className="font-display text-headline-sm font-bold text-primary-container">Visume</Link>
            <span className="bg-primary-container/20 text-primary-container text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Recruiter</span>
          </div>
        </div>
        <nav className="flex-1 mt-sm flex flex-col gap-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <Link 
            className={`flex items-center gap-3 px-4 py-3 font-label-md text-label-md transition-all duration-300 ${activePage === 'dashboard' ? 'bg-sidebar-active-glow text-primary-container border-l-4 border-primary-container' : 'text-text-muted hover:bg-surface-bright/5 hover:text-text-primary'}`} 
            to="/recruiter"
          >
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>

          <Link 
            className={`flex items-center gap-3 px-4 py-3 font-label-md text-label-md transition-all duration-300 ${activePage === 'post-job' ? 'bg-sidebar-active-glow text-primary-container border-l-4 border-primary-container' : 'text-text-muted hover:bg-surface-bright/5 hover:text-text-primary'}`} 
            to="/post-job"
          >
            <span className="material-symbols-outlined">work</span>
            Job Postings
          </Link>
          <Link 
            className={`flex items-center gap-3 px-4 py-3 font-label-md text-label-md transition-all duration-300 ${activePage === 'find-candidates' ? 'bg-sidebar-active-glow text-primary-container border-l-4 border-primary-container' : 'text-text-muted hover:bg-surface-bright/5 hover:text-text-primary'}`} 
            to="/find-candidates"
          >
            <span className="material-symbols-outlined">person_search</span>
            Find Candidates
          </Link>
          <Link 
            className={`flex items-center gap-3 px-4 py-3 font-label-md text-label-md transition-all duration-300 ${activePage === 'pipeline' ? 'bg-sidebar-active-glow text-primary-container border-l-4 border-primary-container' : 'text-text-muted hover:bg-surface-bright/5 hover:text-text-primary'}`} 
            to="/pipeline"
          >
            <span className="material-symbols-outlined">account_tree</span>
            Pipeline
          </Link>
        </nav>
        <div className="flex flex-col gap-1 mb-2">
          <Link 
            className={`flex items-center gap-3 px-4 py-3 font-label-md text-label-md transition-all duration-300 ${activePage === 'settings' ? 'bg-sidebar-active-glow text-primary-container border-l-4 border-primary-container' : 'text-text-muted hover:bg-surface-bright/5 hover:text-text-primary'}`} 
            to="/settings" 
            state={{ role: 'recruiter' }}
          >
            <span className="material-symbols-outlined">settings</span>
            Settings
          </Link>
        </div>
        <div className="p-4 border-t border-outline-variant">
          <Link to="/settings" state={{ role: 'recruiter', tab: 'profile' }} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-lg bg-surface-bright overflow-hidden shrink-0">
              <img alt="Company Logo" className="w-full h-full object-cover" src={companyLogo} referrerPolicy="no-referrer" />
            </div>
            <div className="overflow-hidden">
              <p className="font-body-sm text-text-primary font-bold truncate">{companyName}</p>
              <p className="font-label-md text-text-muted text-[11px]">Enterprise Plan</p>
            </div>
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-[240px] flex-shrink-0 bg-surface-container border border-outline-variant flex flex-col h-[calc(125vh-32px)] my-4 ml-4 rounded-2xl shadow-xl shadow-black/40 z-50">
      <div className="p-md">
        <div className="flex items-center gap-xs">
          <Link to="/" className="font-display text-headline-sm font-bold text-primary-container">Visume</Link>
          <span className="bg-primary-container/20 text-primary-container text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Candidate</span>
        </div>
      </div>
      <nav className="flex-1 mt-sm flex flex-col gap-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <Link 
          className={`flex items-center gap-3 px-4 py-3 transition-all duration-300 ${activePage === 'dashboard' ? 'bg-sidebar-active-glow text-primary-container border-l-4 border-primary-container' : 'text-text-muted hover:bg-surface-bright/5 hover:text-text-primary'}`} 
          to="/dashboard"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-md text-label-md">Dashboard</span>
        </Link>
        <Link 
          className={`flex items-center gap-3 px-4 py-3 transition-all duration-300 ${activePage === 'profile' ? 'bg-sidebar-active-glow text-primary-container border-l-4 border-primary-container' : 'text-text-muted hover:bg-surface-bright/5 hover:text-text-primary'}`} 
          to="/profile"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-md text-label-md">My Profile</span>
        </Link>
        <Link 
          className={`flex items-center gap-3 px-4 py-3 transition-all duration-300 ${activePage === 'recorder' ? 'bg-sidebar-active-glow text-primary-container border-l-4 border-primary-container' : 'text-text-muted hover:bg-surface-bright/5 hover:text-text-primary'}`} 
          to="/recorder"
        >
          <span className="material-symbols-outlined">videocam</span>
          <span className="font-label-md text-label-md">Video Resume</span>
        </Link>
        <Link 
          className={`flex items-center gap-3 px-4 py-3 transition-all duration-300 ${activePage === 'discover' ? 'bg-sidebar-active-glow text-primary-container border-l-4 border-primary-container' : 'text-text-muted hover:bg-surface-bright/5 hover:text-text-primary'}`} 
          to="/discover"
        >
          <span className="material-symbols-outlined">work</span>
          <span className="font-label-md text-label-md">Browse Jobs</span>
        </Link>
        <Link 
          className={`flex items-center gap-3 px-4 py-3 transition-all duration-300 ${activePage === 'applications' ? 'bg-sidebar-active-glow text-primary-container border-l-4 border-primary-container' : 'text-text-muted hover:bg-surface-bright/5 hover:text-text-primary'}`} 
          to="/applications"
        >
          <span className="material-symbols-outlined">assignment</span>
          <span className="font-label-md text-label-md">Applications</span>
        </Link>
      </nav>
      <div className="flex flex-col gap-1 mb-2">
        <Link 
          className={`flex items-center gap-3 px-4 py-3 transition-all duration-300 ${activePage === 'settings' ? 'bg-sidebar-active-glow text-primary-container border-l-4 border-primary-container' : 'text-text-muted hover:bg-surface-bright/5 hover:text-text-primary'}`} 
          to="/settings" 
          state={{ role: 'candidate' }}
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-md text-label-md">Settings</span>
        </Link>
      </div>
      <div className="p-4 border-t border-outline-variant">
        <Link to="/settings" state={{ role: 'candidate', tab: 'profile' }} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="relative shrink-0">
            <img alt="User Profile" className="w-10 h-10 rounded-full object-cover" src={profileImage} referrerPolicy="no-referrer" />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-surface-container"></div>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-body-sm text-text-primary font-bold truncate">{userName}</span>
            <div className="flex items-center gap-1">
              <span className="bg-tertiary-container/20 text-tertiary text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">KYC Verified</span>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
