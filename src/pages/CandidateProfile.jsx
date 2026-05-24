import React from 'react';

const TopNav = () => (
  <nav className="bg-surface-container/70 backdrop-blur-md docked full-width top-0 sticky z-50 border-b border-outline-variant h-16">
    <div className="flex justify-between items-center px-gutter w-full max-w-container-max mx-auto h-full">
      <div className="flex items-center gap-8">
        <span className="font-display text-headline-md font-bold text-primary-container">Visume</span>
        <div className="hidden md:flex gap-6 items-center">
          <a className="text-primary-container font-bold border-b-2 border-primary-container pb-1 font-body-md text-body-md" href="#">Discover</a>
          <a className="text-text-muted font-medium hover:text-text-primary transition-colors font-body-md text-body-md" href="#">Applications</a>
          <a className="text-text-muted font-medium hover:text-text-primary transition-colors font-body-md text-body-md" href="#">Messages</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-primary px-6 py-2 rounded-lg text-white font-bold hover:opacity-90 transition-all font-body-md text-body-md">Upload Video</button>
        <div className="w-10 h-10 rounded-full bg-surface-bright flex items-center justify-center border border-outline-variant overflow-hidden cursor-pointer">
          <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgpXjc86YyzolUjVehHfDX0ooaKQXmLeZk0qzHnZBk43XIBdu5eA_qSjZGTyX2DOq9Jg2YjG_n3-cdMoxG8ccG3YcENmmaHiKuoDBaocNVtQqYYFTVW7kKXl_fRQgxXYdsniqJZHqnm62h4v4wYHWI900FAaWTAvbHRJ4ePrn7xK1bbkiDqIqa1Vxd5UZhlh0f12gjgxhZKG_6FfpMoo9rrw_r4l6xrKRJa2J0olJcD4Zw019VtvIk6Udowo350FHxXM3vFLrJfJE"/>
        </div>
      </div>
    </div>
  </nav>
);

const HeroSection = () => (
  <section className="card-bg border border-border-input rounded-xl p-lg relative overflow-hidden hero-gradient">
    <div className="flex flex-col md:flex-row items-center md:items-end gap-lg relative z-10">
      <div className="w-24 h-24 rounded-full border-4 border-primary ring-4 ring-primary/20 overflow-hidden shadow-2xl shrink-0">
        <img alt="Candidate" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkfy9Feu-zDXjrtSO-Djz6s4KPq9x30a3IShW_hgguKUiS5VAxFHn-3YThX51z9mpVeMbiOsRjNmSGpSz8_1nHWQw1_n9gU4NvSsGLEZDerT-JTzuwRr1IBDx2Z_x0BJmZ8XlLRwW1GA8zjp_hsKqhhqf546R9ZOJ-sMFDtfYS_BO4LbZoXSpJKkA5f1DDH69RmnNdrGUmwg3DRJaHowy3wJZGMbjhoI7v2B-hKtjB7dWPNASplmpIlr5qIrv_4M5lLHOLIk8IRPI"/>
      </div>
      <div className="flex-grow text-center md:text-left space-y-2">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
          <h1 className="font-headline-lg text-headline-lg font-bold text-text-primary">Jordan Sterling</h1>
          <span className="inline-flex items-center gap-1 bg-[#00CEC9]/10 text-[#00CEC9] border border-[#00CEC9]/30 px-3 py-1 rounded-full text-label-md font-label-md uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            KYC Verified
          </span>
        </div>
        <p className="font-body-lg text-body-lg text-text-muted">Senior Product Designer &amp; Motion Specialist</p>
        <div className="flex items-center justify-center md:justify-start gap-4 text-text-muted font-body-sm text-body-sm">
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> San Francisco, CA</span>
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> Available Immediately</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
        <button className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:scale-[0.98] transition-all flex items-center justify-center gap-2 font-body-md text-body-md shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined">calendar_today</span>
          Schedule Interview
        </button>
        <button className="bg-surface-container border border-outline-variant text-text-primary font-bold py-3 px-8 rounded-lg hover:bg-surface-bright/20 transition-all font-body-md text-body-md">
          Download CV
        </button>
      </div>
    </div>
  </section>
);

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
  return (
    <div className="min-h-screen bg-background text-text-primary font-body-md">
      <TopNav />
      <main className="max-w-container-max mx-auto px-gutter py-lg space-y-lg">
        <HeroSection />
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
      <footer className="bg-surface-container-lowest border-t border-outline-variant mt-xxl">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter py-lg w-full max-w-container-max mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-display text-headline-sm font-bold text-text-primary">Visume</span>
            <p className="text-text-muted font-body-sm text-body-sm">© 2024 Visume. Personality-driven hiring.</p>
          </div>
          <div className="flex gap-8 mt-lg md:mt-0">
            <a className="text-text-muted hover:text-secondary transition-colors font-label-md text-label-md" href="#">Privacy Policy</a>
            <a className="text-text-muted hover:text-secondary transition-colors font-label-md text-label-md" href="#">Terms of Service</a>
            <a className="text-text-muted hover:text-secondary transition-colors font-label-md text-label-md" href="#">For Recruiters</a>
            <a className="text-text-muted hover:text-secondary transition-colors font-label-md text-label-md" href="#">About Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CandidateProfile;
