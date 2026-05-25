import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUsPage = () => {
  return (
    <div className="bg-background text-text-primary font-body-md min-h-screen flex flex-col pt-24">
      <Navbar />

      <main className="flex-1 max-w-container-max mx-auto px-gutter py-20 w-full relative">
        {/* Glows */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-label-md uppercase tracking-widest bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full inline-block mb-4">
            Our Mission
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Humanizing the Hiring <br/>Process Through <span className="text-secondary">Video</span>
          </h1>
          <p className="font-body-lg text-text-muted max-w-2xl mx-auto">
            We believe that you are much more than list of bullet points on a static document. Visume was built to bring personality, expression, and energy back to the hiring landscape.
          </p>
        </div>

        {/* Brand Story / Split Row */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32 border-b border-border-input pb-20">
          <div>
            <h2 className="font-display text-4xl font-bold text-white mb-6">The Story of Visume</h2>
            <div className="space-y-6 font-body-md text-text-muted leading-relaxed">
              <p>
                Founded in 2024, Visume was born out of frustration. Our founders realized that qualified, creative, and passionate candidates were being auto-rejected by automated resume parsers before getting a single conversation.
              </p>
              <p>
                At the same time, recruiters spent hours sorting through dry, look-alike templates, missing out on matching candidate communication and cultural suitability.
              </p>
              <p>
                We built a platform that allows job seekers to introduce themselves face-to-face via short, professional video pitches. Backed by conversational AI metrics, we help recruiters find the perfect candidates in seconds while letting candidates demonstrate their true selves.
              </p>
            </div>
          </div>
          <div className="relative">
            {/* Embedded mockup visual card */}
            <div className="bg-card-bg border border-border-input p-8 rounded-2xl relative shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="flex gap-4 items-center mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[24px]">favorite</span>
                </div>
                <div>
                  <h4 className="font-headline-sm font-bold text-white text-base">Built with Authenticity</h4>
                  <p className="text-text-muted text-xs">Personality first, resume second.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-surface-container border border-border-input p-4 rounded-xl">
                  <p className="text-white text-sm font-bold mb-1">Our Core Value</p>
                  <p className="text-text-muted text-xs leading-relaxed">
                    Giving voice and representation to applicants who thrive on communication, emotional intelligence, and presentation.
                  </p>
                </div>
                <div className="bg-surface-container border border-border-input p-4 rounded-xl">
                  <p className="text-white text-sm font-bold mb-1">The Goal</p>
                  <p className="text-text-muted text-xs leading-relaxed">
                    To eliminate bias and dry text metrics, replacing them with interactive, high-fidelity human previews.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-white mb-2">Our Core Values</h2>
          <p className="text-text-muted font-body-md max-w-xl mx-auto">
            What drives our team to build, innovate, and support the Visume platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-surface-container-low border border-border-input p-8 rounded-xl hover:border-primary/50 transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-[28px]">campaign</span>
            </div>
            <h3 className="font-headline-sm font-bold text-white mb-3">Authenticity</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              We empower people to speak in their own voice, ensuring that truth and capability shine above template keywords.
            </p>
          </div>

          <div className="bg-surface-container-low border border-border-input p-8 rounded-xl hover:border-secondary/50 transition-all duration-300">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-secondary text-[28px]">star</span>
            </div>
            <h3 className="font-headline-sm font-bold text-white mb-3">Quality & Innovation</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              We employ advanced AI and video tooling to give both job seekers and hirers premium tools that feel seamless and modern.
            </p>
          </div>

          <div className="bg-surface-container-low border border-border-input p-8 rounded-xl hover:border-tertiary/50 transition-all duration-300">
            <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-tertiary text-[28px]">diversity_1</span>
            </div>
            <h3 className="font-headline-sm font-bold text-white mb-3">Equal Opportunity</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              We strive to build bias-reducing analytics that focus on talent, drive, and expression, creating a more inclusive marketplace.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
