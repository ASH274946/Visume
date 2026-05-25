import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => (
  <header className="flex justify-between items-center mb-xl">
    <div className="flex items-center gap-4">
      <h1 className="font-display text-headline-lg text-text-primary">Welcome back, Ashwin</h1>
      <span className="flex items-center gap-1 bg-tertiary-container/15 text-tertiary px-3 py-1 rounded-full text-[12px] font-bold border border-tertiary/20">
        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
        KYC Verified
      </span>
    </div>
    <div className="flex gap-4">
      <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant hover:border-primary-container transition-all">
        <span className="material-symbols-outlined">notifications</span>
      </button>
      <button className="bg-primary-container text-white px-lg py-3 rounded-lg font-bold hover:shadow-[0_0_15px_rgba(108,92,231,0.4)] transition-all">
        Record New Visume
      </button>
    </div>
  </header>
);

const StatsRow = () => (
  <section className="grid grid-cols-1 md:grid-cols-4 gap-md mb-xl">
    <div className="bg-card-bg border border-outline-variant p-md rounded-xl hover:border-primary-container/50 hover:-translate-y-1 transition-all group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-primary-container text-[36px] font-display font-bold">12</span>
        <span className="material-symbols-outlined text-text-muted group-hover:text-primary-container">send</span>
      </div>
      <p className="text-text-muted font-body-sm">Jobs Applied</p>
    </div>
    <div className="bg-card-bg border border-outline-variant p-md rounded-xl hover:border-primary-container/50 hover:-translate-y-1 transition-all group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-primary-container text-[36px] font-display font-bold">284</span>
        <span className="material-symbols-outlined text-text-muted group-hover:text-primary-container">visibility</span>
      </div>
      <p className="text-text-muted font-body-sm">Profile Views</p>
    </div>
    <div className="bg-card-bg border border-outline-variant p-md rounded-xl hover:border-primary-container/50 hover:-translate-y-1 transition-all group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-primary-container text-[36px] font-display font-bold">3</span>
        <span className="material-symbols-outlined text-text-muted group-hover:text-primary-container">call</span>
      </div>
      <p className="text-text-muted font-body-sm">Interview Calls</p>
    </div>
    <div className="bg-card-bg border border-outline-variant p-md rounded-xl hover:border-primary-container/50 hover:-translate-y-1 transition-all group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-secondary text-[36px] font-display font-bold">97%</span>
        <span className="material-symbols-outlined text-text-muted group-hover:text-secondary">psychology</span>
      </div>
      <p className="text-text-muted font-body-sm">Top Match</p>
    </div>
  </section>
);

const VideoResumeCard = () => (
  <section className="bg-card-bg border border-outline-variant rounded-xl p-lg mb-xl flex flex-col md:flex-row gap-lg items-center">
    <div className="w-full md:w-1/2 aspect-video rounded-xl overflow-hidden relative group cursor-pointer border border-outline-variant">
      <img alt="Video Resume Preview" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80" />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
        <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[12px] font-bold">
        01:42
      </div>
    </div>
    <div className="w-full md:w-1/2">
      <h2 className="font-display text-headline-md text-text-primary mb-2">My Video Resume</h2>
      <div className="flex gap-4 text-text-muted font-body-sm mb-6">
        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">calendar_month</span> Uploaded: Oct 12, 2023</span>
        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">visibility</span> 142 Views</span>
      </div>
      <div className="flex gap-4">
        <Link to="/recorder" className="flex-1 text-center border border-primary-container text-primary-container py-3 rounded-lg font-bold hover:bg-primary-container/10 transition-colors block">
          Replace Video
        </Link>
        <Link to="/recorder" className="flex-1 text-center text-text-muted py-3 rounded-lg font-bold hover:bg-surface-bright/5 transition-colors block">
          Re-record
        </Link>
      </div>
    </div>
  </section>
);

const RecommendedJobs = () => (
  <section>
    <div className="flex justify-between items-end mb-lg">
      <h2 className="font-display text-headline-md text-text-primary">Recommended for You</h2>
      <Link className="text-primary-container font-label-md text-label-md hover:underline" to="/discover">View All Openings</Link>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
      <div className="bg-card-bg border border-border-base rounded-xl p-lg hover:border-primary-container transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full bg-surface-bright/20 flex items-center justify-center border border-outline-variant overflow-hidden">
              <img alt="Company Logo" className="w-full h-full object-cover" src="https://logo.clearbit.com/spotify.com" />
            </div>
            <div>
              <h3 className="font-display text-headline-sm text-text-primary">Lead UI Designer</h3>
              <p className="text-text-muted text-label-md">Stellar AI Solutions</p>
            </div>
          </div>
          <div className="bg-secondary/10 text-secondary px-3 py-1.5 rounded-full flex flex-col items-center">
            <span className="text-[18px] font-bold">98%</span>
            <span className="text-[8px] uppercase font-bold">Match</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 rounded-full bg-surface-container-high text-text-muted text-[12px] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">location_on</span> San Francisco
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-container-high text-text-muted text-[12px] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">home_work</span> Remote
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-container-high text-text-muted text-[12px] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">payments</span> $140k - $180k
          </span>
        </div>
        <div className="flex gap-2 mb-6">
          <span className="bg-border-base text-text-muted px-3 py-1 rounded-full text-[11px] font-medium border border-outline-variant/30">Figma</span>
          <span className="bg-border-base text-text-muted px-3 py-1 rounded-full text-[11px] font-medium border border-outline-variant/30">Product Strategy</span>
          <span className="bg-border-base text-text-muted px-3 py-1 rounded-full text-[11px] font-medium border border-outline-variant/30">Design Systems</span>
        </div>
        <button className="w-full bg-primary-container text-white py-3 rounded-lg font-bold hover:bg-on-primary-fixed-variant transition-colors">
          Apply Now
        </button>
      </div>

      <div className="bg-card-bg border border-border-base rounded-xl p-lg hover:border-primary-container transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full bg-surface-bright/20 flex items-center justify-center border border-outline-variant overflow-hidden">
              <img alt="Company Logo" className="w-full h-full object-cover" src="https://logo.clearbit.com/airbnb.com" />
            </div>
            <div>
              <h3 className="font-display text-headline-sm text-text-primary">Product Manager</h3>
              <p className="text-text-muted text-label-md">Nexus Creative</p>
            </div>
          </div>
          <div className="bg-secondary/10 text-secondary px-3 py-1.5 rounded-full flex flex-col items-center">
            <span className="text-[18px] font-bold">92%</span>
            <span className="text-[8px] uppercase font-bold">Match</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 rounded-full bg-surface-container-high text-text-muted text-[12px] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">location_on</span> New York
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-container-high text-text-muted text-[12px] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">apartment</span> Hybrid
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-container-high text-text-muted text-[12px] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">payments</span> $120k - $160k
          </span>
        </div>
        <div className="flex gap-2 mb-6">
          <span className="bg-border-base text-text-muted px-3 py-1 rounded-full text-[11px] font-medium border border-outline-variant/30">Agile</span>
          <span className="bg-border-base text-text-muted px-3 py-1 rounded-full text-[11px] font-medium border border-outline-variant/30">Data Analysis</span>
          <span className="bg-border-base text-text-muted px-3 py-1 rounded-full text-[11px] font-medium border border-outline-variant/30">User Testing</span>
        </div>
        <button className="w-full bg-primary-container text-white py-3 rounded-lg font-bold hover:bg-on-primary-fixed-variant transition-colors">
          Apply Now
        </button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="mt-xxl pt-lg border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-md text-text-muted pb-lg">
    <span className="font-label-md text-label-md">© 2024 Visume. Personality-driven hiring.</span>
    <div className="flex gap-lg">
      <Link className="font-label-md text-label-md hover:text-secondary transition-colors" to="/">Privacy Policy</Link>
      <Link className="font-label-md text-label-md hover:text-secondary transition-colors" to="/">Terms of Service</Link>
      <Link className="font-label-md text-label-md hover:text-secondary transition-colors" to="/recruiter">For Recruiters</Link>
      <Link className="font-label-md text-label-md hover:text-secondary transition-colors" to="/">About Us</Link>
    </div>
  </footer>
);

const CandidateDashboard = () => {
  return (
    <>
      <Header />
      <StatsRow />
      <VideoResumeCard />
      <RecommendedJobs />
      <Footer />
    </>
  );
};

export default CandidateDashboard;
