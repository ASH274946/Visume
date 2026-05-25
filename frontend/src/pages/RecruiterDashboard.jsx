import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomSelect from '../components/CustomSelect';
const HeaderSection = () => {
  const profileData = JSON.parse(localStorage.getItem('visume_profile_data')) || {};
  const userName = profileData.fullName ? profileData.fullName.split(' ')[0] : 'Sarah';

  return (
  <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-lg">
    <div className="space-y-1">
      <h1 className="font-headline-lg text-headline-lg text-text-primary">Good morning, {userName}</h1>
      <p className="font-body-md text-text-muted">Here's what's happening with your hiring pipeline today.</p>
    </div>
    <Link to="/post-job" className="bg-primary text-[#FFFFFF] px-gutter py-3 rounded-lg font-label-md font-bold hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
      <span className="material-symbols-outlined">add</span>
      Post New Job
    </Link>
  </header>
  );
};

const StatsRow = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter mb-xl">
    <div className="bg-card-bg border border-border-base p-md rounded-xl hover:border-primary/50 transition-all group">
      <p className="font-label-md text-text-muted uppercase tracking-wider mb-xs">Active Jobs</p>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-headline-lg text-text-primary group-hover:text-primary transition-colors">8</span>
        <span className="text-secondary text-label-md font-bold">+2 this week</span>
      </div>
    </div>
    <div className="bg-card-bg border border-border-base p-md rounded-xl hover:border-primary/50 transition-all group">
      <p className="font-label-md text-text-muted uppercase tracking-wider mb-xs">Total Applicants</p>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-headline-lg text-text-primary group-hover:text-primary transition-colors">147</span>
        <span className="text-secondary text-label-md font-bold">+12%</span>
      </div>
    </div>
    <div className="bg-card-bg border border-border-base p-md rounded-xl hover:border-primary/50 transition-all group">
      <p className="font-label-md text-text-muted uppercase tracking-wider mb-xs">Interviews Today</p>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-headline-lg text-text-primary group-hover:text-primary transition-colors">4</span>
        <span className="text-text-muted text-label-md">Next at 2:00 PM</span>
      </div>
    </div>
    <div className="bg-card-bg border border-border-base p-md rounded-xl hover:border-primary/50 transition-all group">
      <p className="font-label-md text-text-muted uppercase tracking-wider mb-xs">Hires This Month</p>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-headline-lg text-text-primary group-hover:text-primary transition-colors">2</span>
        <span className="text-primary text-label-md font-bold">Goal: 5</span>
      </div>
    </div>
  </div>
);

const AIMatchedCandidates = () => {
  const candidates = [
    {
      name: "Julian Vance",
      role: "UX/UI Design Lead",
      score: "94%",
      tags: ["Figma", "Prototyping", "User Res"],
      imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      name: "Lila Chen",
      role: "Senior Product Architect",
      score: "91%",
      tags: ["Growth", "SaaS", "Strategy"],
      imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80"
    },
    {
      name: "Marcus Thorne",
      role: "Visual Experience Design",
      score: "88%",
      tags: ["Cinema4D", "Motion", "Brand"],
      imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80"
    }
  ];

  return (
    <section className="lg:w-[70%]">
      <div className="flex items-center justify-between mb-md">
        <h2 className="font-headline-md text-headline-md text-text-primary">AI-Matched Candidates</h2>
        <div className="flex items-center gap-xs bg-surface-container border border-border-base rounded-lg px-3 py-1.5 min-w-[200px]">
          <span className="font-label-md text-text-muted">Job:</span>
          <CustomSelect
            name="jobFilter"
            value="senior-product-designer"
            onChange={() => { }}
            className="w-full"
            options={[
              { value: 'senior-product-designer', label: 'Senior Product Designer' },
              { value: 'frontend-engineer', label: 'Frontend Engineer' },
              { value: 'ai-specialist', label: 'AI Specialist' }
            ]}
          />
        </div>
      </div>
      <div className="flex gap-md overflow-x-auto pb-gutter snap-x custom-scrollbar">
        {candidates.map((cand, idx) => (
          <div key={idx} className="min-w-[320px] bg-card-bg border border-border-base rounded-xl p-md snap-start hover:shadow-2xl hover:shadow-primary/10 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150"></div>
            <div className="flex items-start gap-md mb-md">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 p-0.5">
                <img alt="Candidate" className="w-full h-full object-cover rounded-full" src={cand.imgSrc} />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-secondary rounded-full border-2 border-card-bg"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-headline-sm text-headline-sm text-text-primary">{cand.name}</h3>
                <p className="font-label-md text-text-muted">{cand.role}</p>
              </div>
            </div>

            <div className="space-y-md mb-md">
              <div className="flex flex-wrap gap-1.5">
                {cand.tags.map(tag => (
                  <span key={tag} className="bg-surface-bright/20 px-2 py-0.5 rounded-full text-[10px] text-text-muted font-bold uppercase tracking-widest">{tag}</span>
                ))}
              </div>
              <div className="bg-secondary-container text-secondary px-3 py-2 rounded-lg flex items-center justify-between">
                <span className="font-label-md font-bold">AI Match Score</span>
                <span className="font-headline-sm">{cand.score}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-sm">
              <button className="bg-primary text-white py-2 rounded-lg font-label-md font-bold hover:brightness-110">View Visume</button>
              <button className="border border-outline-variant text-text-primary py-2 rounded-lg font-label-md font-bold hover:bg-surface-bright/10">Shortlist</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const RecentActivity = () => (
  <section className="lg:w-[30%]">
    <div className="flex items-center justify-between mb-md">
      <h2 className="font-headline-md text-headline-md text-text-primary">Recent Activity</h2>
      <button className="text-primary font-label-md hover:underline">See All</button>
    </div>

    <div className="bg-card-bg border border-border-base rounded-xl overflow-hidden">
      <div className="p-md space-y-lg">
        <div className="flex gap-md relative">
          <div className="absolute left-5 top-10 bottom-[-24px] w-0.5 bg-outline-variant/30"></div>
          <div className="w-10 h-10 rounded-full border border-primary/20 p-0.5 shrink-0 bg-surface-container">
            <img alt="Recruiter" className="w-full h-full object-cover rounded-full" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80" />
          </div>
          <div className="space-y-1">
            <p className="font-body-sm text-text-primary"><span className="font-bold">Julia Smith</span> moved <span className="text-primary font-bold">Lila Chen</span> to Interview phase.</p>
            <p className="font-label-md text-text-muted">12 mins ago</p>
          </div>
        </div>

        <div className="flex gap-md relative">
          <div className="absolute left-5 top-10 bottom-[-24px] w-0.5 bg-outline-variant/30"></div>
          <div className="w-10 h-10 rounded-full border border-primary/20 p-0.5 shrink-0 bg-surface-container">
            <div className="w-full h-full rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>videocam</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-body-sm text-text-primary">New Visume uploaded for <span className="font-bold">Senior Product Designer</span>.</p>
            <p className="font-label-md text-text-muted">2 hours ago</p>
          </div>
        </div>

        <div className="flex gap-md relative">
          <div className="absolute left-5 top-10 bottom-[-24px] w-0.5 bg-outline-variant/30"></div>
          <div className="w-10 h-10 rounded-full border border-primary/20 p-0.5 shrink-0 bg-surface-container">
            <img alt="Candidate" className="w-full h-full object-cover rounded-full" src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&h=256&q=80" />
          </div>
          <div className="space-y-1">
            <p className="font-body-sm text-text-primary"><span className="font-bold">Marcus Thorne</span> accepted the interview invitation.</p>
            <p className="font-label-md text-text-muted">4 hours ago</p>
          </div>
        </div>

        <div className="flex gap-md relative">
          <div className="w-10 h-10 rounded-full border border-primary/20 p-0.5 shrink-0 bg-surface-container">
            <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-body-sm text-text-primary">Monthly pipeline report is ready for download.</p>
            <p className="font-label-md text-text-muted">Yesterday</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ActivePipelines = () => (
  <section className="mt-xl">
    <h2 className="font-headline-md text-headline-md text-text-primary mb-md">Active Pipelines</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
      <Link to="/pipeline" state={{ pipeline: 'senior-product-designer' }} className="bg-card-bg border border-border-base rounded-xl p-md flex items-center justify-between group cursor-pointer hover:border-primary/40 transition-all">
        <div className="flex items-center gap-md">
          <div className="w-12 h-12 rounded-lg bg-surface-bright flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[28px]">palette</span>
          </div>
          <div>
            <h4 className="font-body-md font-bold text-text-primary">Senior Product Designer</h4>
            <p className="font-label-md text-text-muted">6 Applicants • 1 Shortlisted</p>
          </div>
        </div>
        <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors">chevron_right</span>
      </Link>

      <Link to="/pipeline" state={{ pipeline: 'frontend-engineer' }} className="bg-card-bg border border-border-base rounded-xl p-md flex items-center justify-between group cursor-pointer hover:border-primary/40 transition-all">
        <div className="flex items-center gap-md">
          <div className="w-12 h-12 rounded-lg bg-surface-bright flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[28px]">code</span>
          </div>
          <div>
            <h4 className="font-body-md font-bold text-text-primary">Frontend Engineer (React)</h4>
            <p className="font-label-md text-text-muted">5 Applicants • 1 Shortlisted</p>
          </div>
        </div>
        <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors">chevron_right</span>
      </Link>
    </div>
  </section>
);

const RecruiterDashboard = () => {
  return (
    <>
      <HeaderSection />
      <StatsRow />
      <div className="flex flex-col lg:flex-row gap-gutter">
        <AIMatchedCandidates />
        <RecentActivity />
      </div>
      <ActivePipelines />
    </>
  );
};

export default RecruiterDashboard;
