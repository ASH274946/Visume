import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HowItWorksPage = () => {
  const [activeTab, setActiveTab] = useState('candidate');

  const candidateSteps = [
    {
      num: '01',
      title: 'Record Your Video',
      description: 'Use our web teleprompter or upload a 60-second video of yourself answering core industry questions. Show off your communication skills and personality.',
      icon: 'videocam',
      color: 'text-primary bg-primary/10 border-primary/20',
      badge: 'PROMPTER INCLUDED'
    },
    {
      num: '02',
      title: 'AI Analysis & Matching',
      description: 'Our proprietary AI parses your soft skills, tone, and spoken credentials to match you with hiring managers looking for exactly your profile.',
      icon: 'psychology',
      color: 'text-secondary bg-secondary/10 border-secondary/20',
      badge: '94% ACCURACY'
    },
    {
      num: '03',
      title: 'Skip Screenings, Get Offers',
      description: 'Instead of sending 100 PDFs, let recruiters see the human behind the screen. Secure direct interview requests straight to your dashboard.',
      icon: 'bolt',
      color: 'text-tertiary bg-tertiary/10 border-tertiary/20',
      badge: 'FAST TRACK'
    }
  ];

  const recruiterSteps = [
    {
      num: '01',
      title: 'Define Job & Soft Skills',
      description: 'Post your job opening and list the key behavioral traits, communication levels, and experience required. Our system structures the search profile.',
      icon: 'post_add',
      color: 'text-secondary bg-secondary/10 border-secondary/20',
      badge: '1-MIN SETUP'
    },
    {
      num: '02',
      title: 'Review Video Profiles',
      description: 'Browse filtered candidate profiles. Watch short video summaries with auto-generated transcripts and AI match scoring. Skip the resumes.',
      icon: 'contacts',
      color: 'text-primary bg-primary/10 border-primary/20',
      badge: 'SAVE 80% TIME'
    },
    {
      num: '03',
      title: 'Instant Pipeline Scheduling',
      description: 'Drag candidates through your visual hiring pipeline, trigger automatic email notifications, and schedule one-click interviews directly.',
      icon: 'schedule',
      color: 'text-tertiary bg-tertiary/10 border-tertiary/20',
      badge: 'INTEGRATED CALENDAR'
    }
  ];

  const currentSteps = activeTab === 'candidate' ? candidateSteps : recruiterSteps;

  return (
    <div className="bg-background text-text-primary font-body-md min-h-screen flex flex-col pt-24">
      <Navbar />

      <main className="flex-1 max-w-container-max mx-auto px-gutter py-20 w-full relative">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none"></div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            How <span className="text-primary">Visume</span> Works
          </h1>
          <p className="font-body-lg text-text-muted">
            The next generation of recruitment connects candidates and recruiters through high-fidelity video profiles and intelligence-driven matching.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-surface-container border border-border-input p-1.5 rounded-xl flex gap-2">
            <button
              onClick={() => setActiveTab('candidate')}
              className={`px-6 py-2.5 rounded-lg font-label-md transition-all duration-300 ${
                activeTab === 'candidate'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              For Candidates
            </button>
            <button
              onClick={() => setActiveTab('recruiter')}
              className={`px-6 py-2.5 rounded-lg font-label-md transition-all duration-300 ${
                activeTab === 'recruiter'
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              For Recruiters
            </button>
          </div>
        </div>

        {/* Step List / Interactive Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {currentSteps.map((step, idx) => (
            <div key={idx} className="bg-card-bg border border-border-input p-8 rounded-xl relative flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group shadow-xl">
              <div>
                {/* Step number and badge */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-display text-5xl font-black text-outline-variant/30 group-hover:text-primary/30 transition-colors">
                    {step.num}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${step.color}`}>
                    {step.badge}
                  </span>
                </div>

                {/* Icon box */}
                <div className="w-14 h-14 bg-surface-container border border-border-input rounded-xl flex items-center justify-center mb-6 text-text-primary group-hover:border-primary/50 transition-all duration-300">
                  <span className="material-symbols-outlined text-[28px]">{step.icon}</span>
                </div>

                <h3 className="font-headline-sm font-bold text-white mb-4">{step.title}</h3>
                <p className="text-text-muted leading-relaxed font-body-md">{step.description}</p>
              </div>

              {/* Decorative pointer line between steps for md screens */}
              {idx < 2 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-border-input">
                  <span className="material-symbols-outlined text-4xl">arrow_forward</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-24 text-center max-w-2xl mx-auto bg-surface-container-low border border-border-input rounded-2xl p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
          <h3 className="font-display text-3xl font-extrabold text-white mb-4 relative z-10">
            Ready to experience the future?
          </h3>
          <p className="text-text-muted font-body-md mb-8 relative z-10">
            Get started right now. Signing up takes less than 2 minutes.
          </p>
          <a
            href="/login"
            className="inline-block bg-primary text-white font-label-md px-8 py-3.5 rounded-xl hover:scale-105 transition-transform duration-200 shadow-xl relative z-10"
          >
            Start Now
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;
