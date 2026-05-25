import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const ApplicationsTracker = () => {
  const [filter, setFilter] = useState('all');

  const hardcodedApplications = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "Stellar AI Solutions",
      logo: "SA",
      location: "Remote",
      date: "Oct 12, 2023",
      status: "interview",
      statusText: "Interview Scheduled",
      colorClass: "secondary-container",
      details: {
        timeText: "Interview on May 28, 2026 at 3:00 PM",
        actionText: "Join Meet"
      }
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Nexus Creative",
      logo: "NC",
      location: "Hybrid",
      date: "Oct 10, 2023",
      status: "shortlisted",
      statusText: "Shortlisted",
      colorClass: "primary-container"
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "CloudFlow",
      logo: "CF",
      location: "Remote",
      date: "Oct 14, 2023",
      status: "review",
      statusText: "Under Review",
      colorClass: "status-review"
    },
    {
      id: 4,
      title: "Motion Designer",
      company: "Peak Studio",
      logo: "PS",
      location: "Onsite",
      date: "Oct 15, 2023",
      status: "applied",
      statusText: "Applied",
      colorClass: "status-applied"
    },
    {
      id: 5,
      title: "UI Engineer",
      company: "Tech Innovators",
      logo: "TI",
      location: "Remote",
      date: "Sep 20, 2023",
      status: "rejected",
      statusText: "Rejected",
      colorClass: "danger"
    }
  ];

  // Get applications from localStorage
  const userApplications = JSON.parse(localStorage.getItem('visume_applications') || '[]');
  
  // Combine hardcoded and user applications, removing duplicates
  const allApplications = [
    ...hardcodedApplications,
    ...userApplications.filter(userApp => 
      !hardcodedApplications.some(hApp => hApp.title === userApp.title && hApp.company === userApp.company)
    )
  ];

  const applications = allApplications;

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  return (
    <>
      <header className="mb-lg">
        <h1 className="font-display text-headline-lg text-text-primary">My Applications</h1>
      </header>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-xl overflow-x-auto pb-2 custom-scrollbar">
        <button 
          onClick={() => setFilter('all')}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${filter === 'all' ? 'bg-primary-container text-white border-primary-container' : 'border-border-input text-text-muted hover:text-text-primary hover:border-text-muted'}`}
        >
          All ({applications.length})
        </button>
        <button 
          onClick={() => setFilter('applied')}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${filter === 'applied' ? 'bg-primary-container text-white border-primary-container' : 'border-border-input text-text-muted hover:text-text-primary hover:border-text-muted'}`}
        >
          Applied ({applications.filter(a => a.status === 'applied').length})
        </button>
        <button 
          onClick={() => setFilter('review')}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${filter === 'review' ? 'bg-primary-container text-white border-primary-container' : 'border-border-input text-text-muted hover:text-text-primary hover:border-text-muted'}`}
        >
          Under Review ({applications.filter(a => a.status === 'review').length})
        </button>
        <button 
          onClick={() => setFilter('shortlisted')}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${filter === 'shortlisted' ? 'bg-primary-container text-white border-primary-container' : 'border-border-input text-text-muted hover:text-text-primary hover:border-text-muted'}`}
        >
          Shortlisted ({applications.filter(a => a.status === 'shortlisted').length})
        </button>
        <button 
          onClick={() => setFilter('interview')}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${filter === 'interview' ? 'bg-primary-container text-white border-primary-container' : 'border-border-input text-text-muted hover:text-text-primary hover:border-text-muted'}`}
        >
          Interview ({applications.filter(a => a.status === 'interview').length})
        </button>
        <button 
          onClick={() => setFilter('rejected')}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${filter === 'rejected' ? 'bg-primary-container text-white border-primary-container' : 'border-border-input text-text-muted hover:text-text-primary hover:border-text-muted'}`}
        >
          Rejected ({applications.filter(a => a.status === 'rejected').length})
        </button>
      </div>

      {/* Applications List */}
      <div className="flex flex-col gap-4 w-full">
        {filteredApplications.map(app => (
          <div 
            key={app.id} 
            className={`bg-card-bg border border-border-base rounded-xl p-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-lg ${app.status === 'rejected' ? 'opacity-70 hover:opacity-100' : ''}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center border border-border-input flex-shrink-0">
                <span className="text-text-muted font-bold">{app.logo}</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-headline-sm text-text-primary font-bold">{app.title}</h3>
                <p className="text-text-muted text-sm">{app.company} • <span className="bg-surface-container px-2 py-0.5 rounded text-xs border border-border-input">{app.location}</span></p>
                <p className="text-text-muted text-xs mt-1">Applied: {app.date}</p>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-3 w-full md:w-auto mt-4 md:mt-0">
              <div className="flex items-center gap-4 justify-between md:justify-end w-full">
                <span className={`bg-${app.status === 'interview' ? 'secondary' : app.status === 'shortlisted' ? 'primary' : app.status === 'review' ? 'status-review' : app.status === 'applied' ? 'status-applied' : 'danger'}/20 text-${app.status === 'interview' ? 'secondary' : app.status === 'shortlisted' ? 'primary-fixed' : app.status === 'review' ? 'status-review' : app.status === 'applied' ? 'status-applied' : 'danger'} px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap`}>
                  {app.statusText}
                </span>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:bg-surface-container hover:text-text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                  <button className="w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:bg-surface-container hover:text-text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </div>
              </div>

              {app.details && (
                <div className="bg-surface-container border border-border-input rounded-lg p-3 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-sm text-text-primary">
                    <span className="font-bold text-secondary">{app.details.timeText.split('on')[0]}on</span>
                    {app.details.timeText.split('on')[1]}
                  </span>
                  <button className="bg-secondary text-[#0A0A0F] px-4 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#46eae5] transition-colors whitespace-nowrap">
                    <span className="material-symbols-outlined text-[18px]">videocam</span> 
                    {app.details.actionText}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ApplicationsTracker;
