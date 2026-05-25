import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardNavbar from './DashboardNavbar';

const DashboardLayout = () => {
  const location = useLocation();
  const path = location.pathname.substring(1);
  let activePage = path;

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
    </div>
  );
};

export default DashboardLayout;
