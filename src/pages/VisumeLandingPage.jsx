import React, { useEffect } from 'react';

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 glass-nav border-b border-[#2A2A3E]">
    <div className="max-w-container-max mx-auto px-gutter h-16 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <a className="font-display text-headline-md font-bold text-primary tracking-tight" href="#">Visume</a>
        <div className="hidden md:flex items-center gap-8">
          <a className="font-label-md text-text-muted hover:text-text-primary transition-colors" href="#">How it Works</a>
          <a className="font-label-md text-text-muted hover:text-text-primary transition-colors" href="#">For Recruiters</a>
          <a className="font-label-md text-text-muted hover:text-text-primary transition-colors" href="#">Pricing</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="hidden sm:block font-label-md border border-primary text-primary px-sm py-xs rounded-lg hover:bg-primary/10 transition-all duration-200">Post a Job</button>
        <button className="font-label-md bg-primary text-white px-md py-xs rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200">Record Resume</button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-xxl pb-xl px-gutter max-w-container-max mx-auto overflow-hidden">
    <div className="hero-glow absolute inset-0 -z-10"></div>
    <div className="grid lg:grid-cols-2 gap-xl items-center pt-xl">
      <div className="space-y-lg">
        <h1 className="font-display text-[56px] leading-[1.1] font-extrabold tracking-tight">
          Get Hired by <br/> <span className="text-primary">Being Seen</span>
        </h1>
        <p className="font-body-lg text-text-muted max-w-lg">
          Ditch the static PDFs. Show your true personality, soft skills, and expertise through video resumes that speak louder than bullet points.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <button className="bg-primary text-white px-lg py-md rounded-xl font-label-md hover:scale-105 transition-transform active:scale-95">Record My Resume</button>
          <button className="border border-secondary text-secondary px-lg py-md rounded-xl font-label-md hover:bg-secondary/5 transition-colors">Browse Jobs</button>
        </div>
      </div>
      {/* Floating Video Card */}
      <div className="relative flex justify-center lg:justify-end">
        <div className="w-full max-w-[420px] bg-card-bg border border-border-input rounded-xl overflow-hidden shadow-2xl relative">
          <div className="aspect-[9/16] relative">
            <img 
              alt="Candidate profile video thumbnail" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDQ3tj9nezhfYkb39Tf8eyXO5DRnd7y-VjGi8sEjkzEr-9r_LkswXuT6W__y2BDQgqimDxLsGq8nKTPOMJaH3xJt-5eXhj1dm69clyBXR3huOYBD__BV2dsbF7ALTK6UQW8hfQCpzZKXwtbTm8yLj3SvIhg_6RGX5XRzPwQ4b9VQfeyY4jNVin2Zsj7iGZ9JohbtuiXzM9yteolIG_gp09ourdcPamQnhLnFuBvubNJ4gYfohxayaZuQc_aqwt3y_9lAg7YeDetTc"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            {/* AI Badge */}
            <div className="absolute top-4 right-4 bg-secondary-container backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 ai-badge-glow">
              <span className="material-symbols-outlined text-[16px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span className="text-secondary font-label-md font-bold tracking-wider">94% MATCH</span>
            </div>
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-white text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </div>
            </div>
            {/* Candidate Info */}
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-headline-sm text-white">Sarah Jenkins</h3>
              <p className="font-body-sm text-gray-300">Senior Product Designer & Creative Lead</p>
              <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
                <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest text-white border border-white/10">UI/UX</span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest text-white border border-white/10">Design Systems</span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest text-white border border-white/10">Team Lead</span>
              </div>
            </div>
          </div>
        </div>
        {/* Floating Decorative Element */}
        <div className="absolute -bottom-8 -left-8 hidden md:block bg-surface-container border border-border-input p-4 rounded-xl shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
            </div>
            <div>
              <p className="font-label-md text-white">New Interview Request</p>
              <p className="text-[10px] text-text-muted">From TechCorp Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Stats = () => (
  <section className="bg-surface-container py-lg mt-xl">
    <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-3 gap-md text-center">
      <div className="space-y-1">
        <p className="font-display text-headline-lg font-extrabold text-white">2,400+</p>
        <p className="font-label-md text-text-muted uppercase tracking-[2px]">Candidates</p>
      </div>
      <div className="space-y-1 border-y md:border-y-0 md:border-x border-outline-variant py-md md:py-0">
        <p className="font-display text-headline-lg font-extrabold text-white">380+</p>
        <p className="font-label-md text-text-muted uppercase tracking-[2px]">Companies</p>
      </div>
      <div className="space-y-1">
        <p className="font-display text-headline-lg font-extrabold text-secondary">94%</p>
        <p className="font-label-md text-text-muted uppercase tracking-[2px]">Match Accuracy</p>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-xxl px-gutter max-w-container-max mx-auto">
    <div className="text-center mb-xxl">
      <h2 className="font-display text-headline-lg font-bold mb-sm">Revolutionizing Recruitment</h2>
      <p className="text-text-muted max-w-2xl mx-auto font-body-md">We’ve built the technology to bridge the gap between human personality and professional skill sets.</p>
    </div>
    <div className="grid md:grid-cols-3 gap-lg">
      <div className="bg-card-bg border border-border-input p-lg rounded-xl card-hover transition-all duration-300">
        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-md">
          <span className="material-symbols-outlined text-primary text-[32px]">videocam</span>
        </div>
        <h3 className="font-headline-sm mb-sm text-white">Video Resume</h3>
        <p className="text-text-muted font-body-md leading-relaxed">
          Record yourself in 60 seconds with our built-in prompter and AI editor. No professional equipment needed.
        </p>
      </div>
      <div className="bg-card-bg border border-border-input p-lg rounded-xl card-hover transition-all duration-300">
        <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-md">
          <span className="material-symbols-outlined text-secondary text-[32px]">psychology</span>
        </div>
        <h3 className="font-headline-sm mb-sm text-white">AI Matching</h3>
        <p className="text-text-muted font-body-md leading-relaxed">
          Our smart scoring system analyzes sentiment, skills, and culture fit to find you the perfect role automatically.
        </p>
      </div>
      <div className="bg-card-bg border border-border-input p-lg rounded-xl card-hover transition-all duration-300">
        <div className="w-14 h-14 bg-tertiary-container/10 rounded-xl flex items-center justify-center mb-md">
          <span className="material-symbols-outlined text-tertiary text-[32px]">bolt</span>
        </div>
        <h3 className="font-headline-sm mb-sm text-white">Instant Interviews</h3>
        <p className="text-text-muted font-body-md leading-relaxed">
          Skip the screening calls. Recruiters reach you directly based on your video profile for one-click interview scheduling.
        </p>
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="max-w-container-max mx-auto px-gutter mb-xxl">
    <div className="relative bg-gradient-to-r from-primary to-[#4029ba] rounded-2xl p-xl overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-lg">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
      <div className="z-10">
        <h2 className="font-display text-headline-lg font-extrabold text-white mb-2">Ready to land your dream job?</h2>
        <p className="text-white/80 font-body-md">Join 2,000+ candidates who found their match this month.</p>
      </div>
      <div className="z-10">
        <button className="bg-white text-primary px-lg py-md rounded-xl font-bold hover:bg-on-primary-container transition-colors shadow-lg">Start Recording Now</button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-surface-container-lowest border-t border-outline-variant">
    <div className="max-w-container-max mx-auto px-gutter py-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-lg">
        <div className="space-y-4">
          <a className="font-display text-headline-sm font-bold text-text-primary tracking-tight" href="#">Visume</a>
          <p className="font-body-sm text-text-muted max-w-xs">Personality-driven hiring. Empowering candidates to showcase more than just a piece of paper.</p>
        </div>
        <div className="flex flex-wrap gap-x-12 gap-y-4">
          <div className="space-y-4">
            <p className="font-label-md text-white font-bold uppercase tracking-widest">Platform</p>
            <ul className="space-y-2">
              <li><a className="text-text-muted hover:text-secondary transition-colors text-sm" href="#">For Candidates</a></li>
              <li><a className="text-text-muted hover:text-secondary transition-colors text-sm" href="#">For Recruiters</a></li>
              <li><a className="text-text-muted hover:text-secondary transition-colors text-sm" href="#">Pricing</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="font-label-md text-white font-bold uppercase tracking-widest">Company</p>
            <ul className="space-y-2">
              <li><a className="text-text-muted hover:text-secondary transition-colors text-sm" href="#">About Us</a></li>
              <li><a className="text-text-muted hover:text-secondary transition-colors text-sm" href="#">Privacy Policy</a></li>
              <li><a className="text-text-muted hover:text-secondary transition-colors text-sm" href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-xl pt-lg border-t border-outline-variant flex flex-col md:flex-row justify-between gap-4">
        <p className="font-body-sm text-text-muted">© 2024 Visume. All rights reserved.</p>
        <div className="flex gap-6">
          <a className="text-text-muted hover:text-white transition-colors" href="#"><span className="material-symbols-outlined text-sm">share</span></a>
          <a className="text-text-muted hover:text-white transition-colors" href="#"><span className="material-symbols-outlined text-sm">public</span></a>
          <a className="text-text-muted hover:text-white transition-colors" href="#"><span className="material-symbols-outlined text-sm">group</span></a>
        </div>
      </div>
    </div>
  </footer>
);

const VisumeLandingPage = () => {
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        if (window.scrollY > 20) {
          nav.classList.add('bg-surface-container/90');
        } else {
          nav.classList.remove('bg-surface-container/90');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-background text-text-primary font-body-md selection:bg-primary/30 selection:text-primary min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default VisumeLandingPage;
