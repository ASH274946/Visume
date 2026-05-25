import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const DashboardNavbar = ({ role = 'candidate' }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getPageName = (path) => {
    switch (path) {
      case '/dashboard': return 'Dashboard';
      case '/profile': return 'My Profile';
      case '/discover': return 'Browse Jobs';
      case '/applications': return 'Applications';
      case '/recorder': return 'Video Resume';
      case '/recruiter': return 'Dashboard';
      case '/find-candidates': return 'Find Candidates';
      case '/pipeline': return 'Pipeline';
      case '/post-job': return 'Post Job';
      case '/settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  const pageName = getPageName(currentPath);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const notifications = [
    { id: 1, icon: '✉️', title: 'Interview Invitation', body: 'Stellar AI Solutions invited you for an interview.', time: '2h ago' },
    { id: 2, icon: '⭐', title: 'New Recommended Role', body: 'A new job matching your profile is available.', time: '1d ago' },
    { id: 3, icon: '🔔', title: 'Profile Viewed', body: 'Company Nexus Creative viewed your profile.', time: '3d ago' }
  ];

  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const profileImage = role === 'recruiter'
    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
    : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80";

  const [showNotifications, setShowNotifications] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
        setIsExpanded(false); // Reset expansion state when closing
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 z-40 px-lg pt-4 pb-2 backdrop-blur-xl bg-background/25 pointer-events-none">
      <nav className="h-16 bg-surface-container/60 border border-outline-variant/65 rounded-xl flex items-center justify-between px-6 pointer-events-auto shadow-lg relative">
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
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant hover:border-primary transition-all text-text-muted hover:text-text-primary shrink-0"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full border border-surface-container"></span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-surface-container-highest border border-outline-variant rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container">
                  <h3 className="font-bold text-text-primary font-body-md">Notifications</h3>
                  <button onClick={() => setShowNotifications(false)} className="text-xs text-primary font-bold hover:underline">Mark all read</button>
                </div>
                <div className={`overflow-y-auto custom-scrollbar transition-all duration-300 ${isExpanded ? 'max-h-[60vh]' : 'max-h-64'}`}>
                  <div className="p-4 border-b border-outline-variant/50 hover:bg-surface-container/50 cursor-pointer transition-colors">
                    <p className="text-sm text-text-primary mb-1"><span className="font-bold">Sarah Jenkins</span> applied for <span className="font-bold text-primary">Senior Frontend Engineer</span></p>
                    <p className="text-xs text-text-muted">2 hours ago</p>
                  </div>
                  <div className="p-4 border-b border-outline-variant/50 hover:bg-surface-container/50 cursor-pointer transition-colors">
                    <p className="text-sm text-text-primary mb-1">Your job post <span className="font-bold text-primary">UX Designer</span> is expiring soon</p>
                    <p className="text-xs text-text-muted">1 day ago</p>
                  </div>
                  <div className="p-4 border-b border-outline-variant/50 hover:bg-surface-container/50 cursor-pointer transition-colors">
                    <p className="text-sm text-text-primary mb-1"><span className="font-bold">Michael Chen</span> submitted a video response</p>
                    <p className="text-xs text-text-muted">1 day ago</p>
                  </div>
                  <div className="p-4 border-b border-outline-variant/50 hover:bg-surface-container/50 cursor-pointer transition-colors">
                    <p className="text-sm text-text-primary mb-1">New AI matches for <span className="font-bold text-primary">Product Manager</span></p>
                    <p className="text-xs text-text-muted">2 days ago</p>
                  </div>
                  <div className="p-4 hover:bg-surface-container/50 cursor-pointer transition-colors">
                    <p className="text-sm text-text-primary mb-1">System maintenance scheduled for weekend</p>
                    <p className="text-xs text-text-muted">3 days ago</p>
                  </div>
                </div>
                <div className="p-3 border-t border-outline-variant text-center bg-surface-container">
                  <button onClick={() => setIsExpanded(!isExpanded)} className="text-sm text-primary font-bold hover:underline">
                    {isExpanded ? 'Show Less' : 'View All'}
                  </button>
                </div>
              </div>
            )}
          </div>
          <Link
            to="/settings"
            state={{ role: role, tab: 'profile' }}
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
