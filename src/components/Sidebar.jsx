import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role = 'candidate', activePage = '' }) => {
  if (role === 'recruiter') {
    return (
      <aside className="w-[240px] flex-shrink-0 bg-surface-container border border-outline-variant flex flex-col h-[calc(100vh-32px)] my-4 ml-4 rounded-2xl shadow-xl shadow-black/40 z-50">
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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface-bright overflow-hidden">
              <img alt="Company Logo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr8iCAVAhPScb_vdkwDSM7i-rKehbjU9T_oH_R_LzauB3AK0hSLlYufoBO69nrWY8Blwa8jc7ma2oYYuOm9py4Ov4EAiDv0zUm2-xfXdUiIkH8mKOQdvQJ8LJiDmrcGy7fUCvQb7huHv_xEoRdXKsHXqPvUAtNiLp3wzi06JcnPGt5SJAjB9lR7DwlrnVdhdJnixqda_Qo651DsBjwFSHpriGOu2FM8g0UU-nM06NmNoMIVOaR8YnS_nJF11HG-ewhQSgxnzM-Ey8" />
            </div>
            <div className="overflow-hidden">
              <p className="font-body-sm text-text-primary font-bold truncate">NovaStream AI</p>
              <p className="font-label-md text-text-muted text-[11px]">Enterprise Plan</p>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-[240px] flex-shrink-0 bg-surface-container border border-outline-variant flex flex-col h-[calc(100vh-32px)] my-4 ml-4 rounded-2xl shadow-xl shadow-black/40 z-50">
      <div className="p-md">
        <Link to="/" className="font-display text-headline-sm font-bold text-primary-container">Visume</Link>
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
        <div className="flex items-center gap-3">
          <div className="relative">
            <img alt="User Profile" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCif7mMcFeEQhrivL3z3iYapnS9er2kQ7XYLd4MuR0k9XdNq69mXT5OGqxxd69TMzoGOukTENlAj2Sv83x4bkp_Sv3X7SsVVYxKY7DqVn0lMSDDdn5UtHszx8X9yons-XE3U_VNoMV1yN3AoBQnPxsK20QsLD5z0mjpDq2EzinhRsjgwIgYS8hd_RebazNQGulE_Vbs5L86pkRVPmk1pUNont5dxsmD-5DVsS4EK_WczWR-gcIEqbw6IQdA7DRj3RSgR-GlT_7d1-Q" />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-surface-container"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-body-sm text-text-primary font-bold">Ashwin Kumar</span>
            <div className="flex items-center gap-1">
              <span className="bg-tertiary-container/20 text-tertiary text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">KYC Verified</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
