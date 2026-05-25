import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HeroSection = ({ profileData }) => {
  const fullName = profileData?.fullName || "Jordan Sterling";
  const headline = profileData?.headline || "Senior Product Designer & Motion Specialist";
  const location = profileData?.location || "San Francisco, CA";
  
  const formattedDob = profileData?.dob 
    ? new Date(profileData.dob).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : "August 15, 1995";

  return (
  <section className="card-bg border border-border-input rounded-xl p-lg relative overflow-hidden hero-gradient">
    <div className="flex flex-col md:flex-row items-center md:items-end gap-lg relative z-10">
      <div className="w-24 h-24 rounded-full border-4 border-primary ring-4 ring-primary/20 overflow-hidden shadow-2xl shrink-0">
        <img alt="Candidate" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkfy9Feu-zDXjrtSO-Djz6s4KPq9x30a3IShW_hgguKUiS5VAxFHn-3YThX51z9mpVeMbiOsRjNmSGpSz8_1nHWQw1_n9gU4NvSsGLEZDerT-JTzuwRr1IBDx2Z_x0BJmZ8XlLRwW1GA8zjp_hsKqhhqf546R9ZOJ-sMFDtfYS_BO4LbZoXSpJKkA5f1DDH69RmnNdrGUmwg3DRJaHowy3wJZGMbjhoI7v2B-hKtjB7dWPNASplmpIlr5qIrv_4M5lLHOLIk8IRPI"/>
      </div>
      <div className="flex-grow text-center md:text-left space-y-2">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
          <h1 className="font-headline-lg text-headline-lg font-bold text-text-primary">{fullName}</h1>
          <span className="inline-flex items-center gap-1 bg-[#00CEC9]/10 text-[#00CEC9] border border-[#00CEC9]/30 px-3 py-1 rounded-full text-label-md font-label-md uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            KYC Verified
          </span>
        </div>
        <p className="font-body-lg text-body-lg text-text-muted">{headline}</p>
        <div className="flex items-center justify-center md:justify-start gap-4 text-text-muted font-body-sm text-body-sm">
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> {location}</span>
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">cake</span> {formattedDob}</span>
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> Available Immediately</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
        <button className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:scale-[0.98] transition-all flex items-center justify-center gap-2 font-body-md text-body-md shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined">calendar_today</span>
          Schedule Interview
        </button>
        <button className="bg-surface-container border border-outline-variant text-text-primary font-bold py-3 px-8 rounded-lg hover:border-primary transition-all font-body-md text-body-md flex items-center justify-center gap-2 group">
          <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">picture_as_pdf</span>
          View Resume
        </button>
      </div>
    </div>
  </section>
  );
};

const VideoResume = () => (
  <section className="space-y-md">
    <div className="flex items-center justify-between">
      <h2 className="font-headline-md text-headline-md font-bold text-text-primary flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">videocam</span>
        Video Resume
      </h2>
      <div className="flex gap-4 text-text-muted font-label-md text-label-md">
        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">visibility</span> 1.2k Views</span>
        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">timer</span> 01:45</span>
      </div>
    </div>
    <div className="aspect-video w-full rounded-xl bg-surface-dim border border-border-input relative overflow-hidden group cursor-pointer">
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center z-10">
        <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
        </div>
      </div>
      <img alt="Video Resume Cover" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlKIqavd7BZl-9QDY-2sJxoe32jflqHra0k9pX2Rs0x5YPNAs6pqgI-5P5d9TCImBjlW01w4StzoikmaOX2A28tgFWyZjZN7L4uR2IRa5RVuRM11mKBW0BY20sorz40qF-kJfjxWRaM0QpTnyNpedRxmY1xDPo416BFd5uw_ER8f6VNCo75WTMSfwS-Oa0sx1PChTNY5ej_xmxcqnVl1HGVi2Ik7odzC4_dp-XFi-6cNtDO2g7Epd3yXMeaBNnIJjAzHbMyFnZ7Y4"/>
      <div className="absolute bottom-0 left-0 right-0 p-lg bg-gradient-to-t from-black/80 to-transparent z-10">
        <p className="font-headline-sm text-headline-sm text-white">"Designing the Future of SaaS Interfaces"</p>
      </div>
    </div>
  </section>
);

const Skills = () => (
  <div className="card-bg border border-border-input rounded-xl p-lg space-y-md">
    <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary">Technical Expertise</h3>
    <div className="flex flex-wrap gap-2">
      <span className="bg-surface-container border border-outline-variant px-4 py-2 rounded-full text-text-primary font-body-sm text-body-sm hover:border-primary transition-colors cursor-default">Figma</span>
      <span className="bg-surface-container border border-outline-variant px-4 py-2 rounded-full text-text-primary font-body-sm text-body-sm hover:border-primary transition-colors cursor-default">After Effects</span>
      <span className="bg-surface-container border border-outline-variant px-4 py-2 rounded-full text-text-primary font-body-sm text-body-sm hover:border-primary transition-colors cursor-default">Three.js</span>
      <span className="bg-surface-container border border-outline-variant px-4 py-2 rounded-full text-text-primary font-body-sm text-body-sm hover:border-primary transition-colors cursor-default">Webflow</span>
      <span className="bg-surface-container border border-outline-variant px-4 py-2 rounded-full text-text-primary font-body-sm text-body-sm hover:border-primary transition-colors cursor-default">Prototyping</span>
      <span className="bg-[#00CEC9]/10 text-[#00CEC9] border border-[#00CEC9]/20 px-4 py-2 rounded-full text-text-primary font-body-sm text-body-sm">AI-Driven Design</span>
    </div>
  </div>
);

const Experience = () => (
  <div className="card-bg border border-border-input rounded-xl p-lg space-y-lg">
    <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary">Professional Journey</h3>
    <div className="relative space-y-lg timeline-line pl-8">
      <div className="relative">
        <div className="absolute -left-8 mt-1 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 z-10"></div>
        <div className="space-y-1">
          <span className="text-primary font-label-md text-label-md font-bold">JAN 2022 — PRESENT</span>
          <h4 className="font-headline-sm text-headline-sm text-text-primary">Lead Experience Designer</h4>
          <p className="text-text-muted font-body-md text-body-md">Stellar Systems • Full-time</p>
          <p className="text-text-muted font-body-sm text-body-sm mt-2 leading-relaxed">Pioneered the design of a next-gen analytics dashboard, reducing user bounce rate by 34% through motion-driven navigation and intuitive data visualization.</p>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -left-8 mt-1 w-4 h-4 rounded-full bg-outline-variant z-10"></div>
        <div className="space-y-1">
          <span className="text-text-muted font-label-md text-label-md font-bold">2019 — 2021</span>
          <h4 className="font-headline-sm text-headline-sm text-text-primary">UI/UX Designer</h4>
          <p className="text-text-muted font-body-md text-body-md">Vivid Digital Agency • Contract</p>
          <p className="text-text-muted font-body-sm text-body-sm mt-2 leading-relaxed">Collaborated with Fortune 500 clients to build interactive prototypes and design systems for global consumer applications.</p>
        </div>
      </div>
    </div>
  </div>
);

const Education = () => (
  <div className="card-bg border border-border-input rounded-xl p-lg space-y-md">
    <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary">Education</h3>
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-primary">school</span>
      </div>
      <div>
        <h4 className="font-headline-sm text-headline-sm text-text-primary">BFA in Interactive Design</h4>
        <p className="text-text-muted font-body-md text-body-md">Academy of Art University, SF</p>
        <p className="text-text-muted font-label-md text-label-md">Class of 2018</p>
      </div>
    </div>
  </div>
);

const StatsCard = () => (
  <div className="card-bg border border-border-input rounded-xl p-lg">
    <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary mb-md">Talent Insights</h3>
    <div className="grid grid-cols-2 gap-md">
      <div className="bg-surface-container/50 p-md rounded-lg border border-outline-variant/30">
        <p className="text-text-muted font-label-md text-label-md">Match Rate</p>
        <p className="text-headline-md font-headline-md text-secondary mt-1">98%</p>
      </div>
      <div className="bg-surface-container/50 p-md rounded-lg border border-outline-variant/30">
        <p className="text-text-muted font-label-md text-label-md">Applications</p>
        <p className="text-headline-md font-headline-md text-text-primary mt-1">12</p>
      </div>
      <div className="bg-surface-container/50 p-md rounded-lg border border-outline-variant/30 col-span-2">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-text-muted font-label-md text-label-md">Response Velocity</p>
            <p className="text-headline-md font-headline-md text-text-primary mt-1">High</p>
          </div>
          <div className="flex gap-1">
            <div className="w-1.5 h-4 bg-primary/30 rounded-full"></div>
            <div className="w-1.5 h-6 bg-primary/60 rounded-full"></div>
            <div className="w-1.5 h-8 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Portfolio = () => (
  <div className="space-y-md">
    <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary">Featured Portfolio</h3>
    <div className="space-y-md">
      <div className="card-bg border border-border-input rounded-xl overflow-hidden group cursor-pointer hover:border-primary transition-all">
        <div className="h-40 overflow-hidden">
          <img alt="Project 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTGX0qfW3OBHO-GncgYEDe4VsgT5F9r_zfw3DJPN2gTumHa10C41bh77ET3KJqu4vzdu1goYVk05FB73cva0gGTJZkuL-5mShFSRzoficAmqPUfjFiWI1Whj--x5O4-DU1TlFRfL5AOgo4YHONlT3Msx30AO9F4pqjtoQXwNPn9PYML4JJbQ9EbIiiOY13LW47bF_E-xxVVv7AvZHNgnJDE5GmKFJtPJNPoryNTjQ0Ld2zRMU8FKBE4hl0nc3_zrOyndQBdCNzDek"/>
        </div>
        <div className="p-md">
          <h4 className="font-headline-sm text-headline-sm text-text-primary">Stellar Finance UI</h4>
          <p className="text-text-muted font-body-sm text-body-sm mt-1">Full redesign of an enterprise financial dashboard.</p>
          <div className="flex items-center gap-2 mt-4 text-primary font-bold text-body-sm">
            View Project <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </div>
        </div>
      </div>
      <div className="card-bg border border-border-input rounded-xl overflow-hidden group cursor-pointer hover:border-primary transition-all">
        <div className="h-40 overflow-hidden">
          <img alt="Project 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR0_fgL7pdShqXyJUUq6Ed5T6z2cWyAT2amtNYotqW54wpMB_HZMju8I_bd3egObQyuVAuIdjhWPmgG_uzwBOStlln7IT5hnCbDx4X77uGnhdY1TmVZdx7kBkzGhJqGOhlEg0ktIXjgopaNQX1cGYISrmQUHUWMiYeurRIYAQKfmMp1kV-Akddnb5zAzdy3y_1kzMAqSU3yVlDVa7u9jopoOwUra6q5IYioV72T6oGn_CmDMTH4NNPF_c3rCoME18AxwKXsuvasY4"/>
        </div>
        <div className="p-md">
          <h4 className="font-headline-sm text-headline-sm text-text-primary">Motion Identity Pack</h4>
          <p className="text-text-muted font-body-sm text-body-sm mt-1">A collection of custom motion components for SaaS apps.</p>
          <div className="flex items-center gap-2 mt-4 text-primary font-bold text-body-sm">
            View Project <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CandidateProfile = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const role = localStorage.getItem('visume_role') || 'candidate';
  
  let profileData = null;
  const savedData = localStorage.getItem('visume_profile_data');
  if (savedData) {
    try {
      profileData = JSON.parse(savedData);
    } catch (e) {
      console.error(e);
    }
  }

  if (isLoggedIn) {
    return (
      <div className="space-y-lg">
        <HeroSection profileData={profileData} />
        <VideoResume />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          <div className="lg:col-span-7 space-y-lg">
            <Skills />
            <Experience />
            <Education />
          </div>
          <div className="lg:col-span-5 space-y-lg">
            <StatsCard />
            <Portfolio />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-primary font-body-md pt-24">
      <Navbar />
      <main className="max-w-container-max mx-auto px-gutter py-lg space-y-lg">
        <HeroSection profileData={profileData} />
        <VideoResume />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          <div className="lg:col-span-7 space-y-lg">
            <Skills />
            <Experience />
            <Education />
          </div>
          <div className="lg:col-span-5 space-y-lg">
            <StatsCard />
            <Portfolio />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CandidateProfile;
