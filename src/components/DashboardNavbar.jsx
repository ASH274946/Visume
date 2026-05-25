import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DashboardNavbar = ({ role = 'candidate' }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const candidateLinks = [
    { label: 'Browse Jobs', path: '/discover' },
    { label: 'Applications', path: '/applications' }
  ];

  const recruiterLinks = [
    { label: 'Find Candidates', path: '/find-candidates' },
    { label: 'Pipeline', path: '/pipeline' },
    { label: 'Job Postings', path: '/post-job' }
  ];

  const links = role === 'recruiter' ? recruiterLinks : candidateLinks;

  const profileImage = role === 'recruiter'
    ? "https://lh3.googleusercontent.com/aida-public/AB6AXuDNf2pjUzrkRvM99OTMYedpfBrRYOSG-5UPAj6qQ6cIPo2L33Fm5Jq39erhvobw6e_WZT_lykFSQ_AZVn20xTjCiJOUgUz5-eDAXvMTz9-xcbod8siIyiAm_AtZiBlg25B43ctasBZcoGJsUozrMmZutznU9iMgqWR9jw8NMW1uWfJyO6rM5zdMwtLU0a8eOnB7LpjjN1BL5ywIOivbPgQwBZux3jlfQz65oNm6diIcOqCCJUIRPp7UnvVAU87HkNnfUmd3jnK9NB0"
    : "https://lh3.googleusercontent.com/aida-public/AB6AXuCif7mMcFeEQhrivL3z3iYapnS9er2kQ7XYLd4MuR0k9XdNq69mXT5OGqxxd69TMzoGOukTENlAj2Sv83x4bkp_Sv3X7SsVVYxKY7DqVn0lMSDDdn5UtHszx8X9yons-XE3U_VNoMV1yN3AoBQnPxsK20QsLD5z0mjpDq2EzinhRsjgwIgYS8hd_RebazNQGulE_Vbs5L86pkRVPmk1pUNont5dxsmD-5DVsS4EK_WczWR-gcIEqbw6IQdA7DRj3RSgR-GlT_7d1-Q";

  return (
    <header className="absolute top-0 left-0 right-0 z-40 px-lg pt-4 pb-2 backdrop-blur-xl bg-background/25 pointer-events-none">
      <nav className="h-16 bg-surface-container/60 border border-outline-variant/65 rounded-xl flex items-center justify-between px-6 pointer-events-auto shadow-lg">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-display text-headline-sm font-bold text-primary-container">
            Visume
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            {links.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <Link
                  key={link.label}
                  className={`font-body-md text-body-md transition-colors ${
                    isActive
                      ? 'text-primary-container font-bold border-b-2 border-primary-container pb-0.5'
                      : 'text-text-muted font-medium hover:text-text-primary'
                  }`}
                  to={link.path}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
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
          <Link
            to="/settings"
            state={{ role: role }}
            className="w-10 h-10 rounded-full bg-surface-bright flex items-center justify-center border border-outline-variant overflow-hidden cursor-pointer hover:border-primary transition-all shrink-0"
          >
            <img alt="Profile" className="w-full h-full object-cover" src={profileImage} />
          </Link>
        </div>
      </nav>
      <div className="absolute top-full left-0 w-full h-12 bg-gradient-to-b from-background/20 to-transparent pointer-events-none"></div>
    </header>
  );
};

export default DashboardNavbar;
