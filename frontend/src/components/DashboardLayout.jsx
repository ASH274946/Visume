import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardNavbar from './DashboardNavbar';
import MessagesInbox from './MessagesInbox';

const DashboardLayout = () => {
  const location = useLocation();
  const path = location.pathname.substring(1);
  let activePage = path;

  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [initialChatId, setInitialChatId] = useState(null);

  useEffect(() => {
    const handleOpenMessages = (e) => {
      if (e.detail?.chatId) {
        setInitialChatId(e.detail.chatId);
      }
      setIsMessagesOpen(true);
    };
    window.addEventListener('openMessages', handleOpenMessages);
    return () => window.removeEventListener('openMessages', handleOpenMessages);
  }, []);

  // Recruiter routes vs Candidate routes
  const recruiterRoutes = ['recruiter', 'post-job', 'pipeline', 'find-candidates'];
  const candidateRoutes = ['dashboard', 'profile', 'discover', 'recorder', 'applications'];

  let role = localStorage.getItem('visume_role') || 'candidate';

  // Override role based on current path to ensure correct navigation logic
  if (recruiterRoutes.includes(path)) {
    role = 'recruiter';
    localStorage.setItem('visume_role', 'recruiter');
  } else if (candidateRoutes.includes(path)) {
    role = 'candidate';
    localStorage.setItem('visume_role', 'candidate');
  } else if (path === 'settings' && location.state?.role) {
    role = location.state.role;
    localStorage.setItem('visume_role', role);
  }

  if (path === 'recruiter') activePage = 'dashboard';

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background text-text-primary font-body-md selection:bg-primary/30 selection:text-primary antialiased">
      <Sidebar role={role} activePage={activePage} />
      <div className="flex-grow flex flex-col h-screen overflow-hidden relative">
        <DashboardNavbar role={role} />
        <main key={location.pathname} className="flex-1 overflow-y-auto custom-scrollbar p-lg pt-[112px] page-transition">
          <Outlet />
        </main>
      </div>

      {/* Persistent Messages FAB */}
      <button 
        onClick={() => setIsMessagesOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 border-4 border-background"
      >
        <span className="material-symbols-outlined text-[28px]">chat</span>
      </button>

      <MessagesInbox 
        isOpen={isMessagesOpen} 
        onClose={() => setIsMessagesOpen(false)} 
        initialChatId={initialChatId}
        isRecruiter={role === 'recruiter'} 
      />
    </div>
  );
};

export default DashboardLayout;
