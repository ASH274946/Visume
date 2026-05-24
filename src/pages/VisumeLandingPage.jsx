import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
          <Link to="/login" state={{ redirectTo: '/recorder' }} className="bg-primary text-white px-lg py-md rounded-xl font-label-md hover:scale-105 transition-transform active:scale-95 inline-block text-center">Record My Resume</Link>
          <Link to="/login" state={{ redirectTo: '/discover' }} className="border border-secondary text-secondary px-lg py-md rounded-xl font-label-md hover:bg-secondary/5 transition-colors inline-block text-center">Browse Jobs</Link>
        </div>
        {/* Stats Row */}
        <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-outline-variant mt-8 max-w-md">
          <div className="space-y-0.5">
            <p className="font-display text-headline-sm font-extrabold text-white">2,400+</p>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Candidates</p>
          </div>
          <div className="h-8 w-px bg-outline-variant"></div>
          <div className="space-y-0.5">
            <p className="font-display text-headline-sm font-extrabold text-white">380+</p>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Companies</p>
          </div>
          <div className="h-8 w-px bg-outline-variant"></div>
          <div className="space-y-0.5">
            <p className="font-display text-headline-sm font-extrabold text-secondary">94%</p>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Match Accuracy</p>
          </div>
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
              <Link to="/profile" className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-white text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </Link>
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

const Features = () => (
  <section className="pt-[120px] pb-xxl px-gutter max-w-container-max mx-auto">
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
        <Link to="/login" state={{ redirectTo: '/recorder' }} className="bg-white text-primary px-lg py-md rounded-xl font-bold hover:bg-on-primary-container transition-colors shadow-lg inline-block">Start Recording Now</Link>
      </div>
    </div>
  </section>
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
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default VisumeLandingPage;

