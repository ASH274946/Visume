import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DashboardNavbar = ({ role = 'candidate' }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getPageName = (path) => {
    switch (path) {
      case '/dashboard': return 'Dashboard';
      case '/discover': return 'Browse Jobs';
      case '/applications': return 'Applications';
      case '/recruiter': return 'Dashboard';
      case '/find-candidates': return 'Find Candidates';
      case '/pipeline': return 'Pipeline';
      case '/post-job': return 'Job Postings';
      case '/settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  const pageName = getPageName(currentPath);

  const profileImage = role === 'recruiter'
    ? "https://lh3.googleusercontent.com/aida-public/AB6AXuDNf2pjUzrkRvM99OTMYedpfBrRYOSG-5UPAj6qQ6cIPo2L33Fm5Jq39erhvobw6e_WZT_lykFSQ_AZVn20xTjCiJOUgUz5-eDAXvMTz9-xcbod8siIyiAm_AtZiBlg25B43ctasBZcoGJsUozrMmZutznU9iMgqWR9jw8NMW1uWfJyO6rM5zdMwtLU0a8eOnB7LpjjN1BL5ywIOivbPgQwBZux3jlfQz65oNm6diIcOqCCJUIRPp7UnvVAU87HkNnfUmd3jnK9NB0"
    : "https://lh3.googleusercontent.com/aida-public/AB6AXuCif7mMcFeEQhrivL3z3iYapnS9er2kQ7XYLd4MuR0k9XdNq69mXT5OGqxxd69TMzoGOukTENlAj2Sv83x4bkp_Sv3X7SsVVYxKY7DqVn0lMSDDdn5UtHszx8X9yons-XE3U_VNoMV1yN3AoBQnPxsK20QsLD5z0mjpDq2EzinhRsjgwIgYS8hd_RebazNQGulE_Vbs5L86pkRVPmk1pUNont5dxsmD-5DVsS4EK_WczWR-gcIEqbw6IQdA7DRj3RSgR-GlT_7d1-Q";

  return (
    <header className="absolute top-0 left-0 right-0 z-40 px-lg pt-4 pb-2 backdrop-blur-xl bg-background/25 pointer-events-none">
      <nav className="h-16 bg-surface-container/60 border border-outline-variant/65 rounded-xl flex items-center justify-between px-6 pointer-events-auto shadow-lg">
        <div className="flex items-center gap-8">
          <h1 className="font-display text-headline-sm font-bold text-text-primary">
            {pageName}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {role === 'candidate' ? (
            <Link
              to="/recorder"
              className="bg-primary px-5 py-2 rounded-lg text-white font-bold hover:opacity-90 active:scale-95 transition-all font-body-md text-body-md shadow-md"
            >
              Upload Video
            </Link>
          ) : (
            <Link
              to="/post-job"
              className="bg-primary px-5 py-2 rounded-lg text-white font-bold hover:opacity-90 active:scale-95 transition-all font-body-md text-body-md shadow-md"
            >
              Post a Job
            </Link>
          )}
          <button className="relative w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant hover:border-primary transition-all text-text-muted hover:text-text-primary shrink-0">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full border border-surface-container"></span>
          </button>
          <Link
            to="/settings"
            state={{ role: role }}
            className="w-10 h-10 rounded-full bg-surface-bright flex items-center justify-center border border-outline-variant overflow-hidden cursor-pointer hover:border-primary transition-all shrink-0"
          >
            <img alt="Profile" className="w-full h-full object-cover" src={profileImage} />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default DashboardNavbar;
