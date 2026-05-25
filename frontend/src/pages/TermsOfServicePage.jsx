import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfServicePage = () => {
  return (
    <div className="bg-background text-text-primary font-body-md min-h-screen flex flex-col pt-24">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-gutter py-20 w-full">
        {/* Title */}
        <div className="mb-12 border-b border-border-input pb-8">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4">Terms of Service</h1>
          <p className="text-text-muted text-sm">Last updated: May 25, 2026</p>
        </div>

        {/* TOS Summary Callout */}
        <div className="bg-surface-container border border-border-input p-6 rounded-xl mb-12">
          <h3 className="font-headline-sm font-bold text-white mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">gavel</span>
            Quick Terms Overview
          </h3>
          <p className="text-text-muted text-sm leading-relaxed">
            By signing up, recording videos, or posting job profiles on Visume, you agree to respect our community guidelines. That means: no inappropriate or offensive video content, accurate descriptions of qualifications, and respecting recruiters/candidates in communications.
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-10 font-body-md text-text-muted leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Visume platform, website, and services, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, please do not access or use the platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-white">2. Account Registration</h2>
            <p>
              To record resumes or browse/post jobs, you must create a secure account. You are responsible for safeguarding your credentials and for any actions taken under your account. You agree to provide accurate, current, and complete information during registration.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-white">3. Video Content & Acceptable Use</h2>
            <p>
              Visume is a professional hiring and networking space. You retain ownership of all video pitches and text materials you create, but you grant us a standard license to display them to recruiters/candidates in accordance with your visibility choices.
            </p>
            <p className="bg-surface-container-low border-l-4 border-primary p-4 rounded-r-lg text-sm text-text-muted">
              <strong>Forbidden Content:</strong> You may not record, upload, or post anything that is defamatory, offensive, harassing, illegal, or infringes on third-party trademark/intellectual property. Visume reserves the right to delete accounts that violate this rule.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-white">4. Subscription Plans & Fees</h2>
            <p>
              Some services, such as Candidate Pro or Enterprise Recruiter features, are subject to payment plans. Payments are made monthly or annually in advance. All sales are final, and plans will auto-renew until cancelled via the account settings console.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-white">5. Limitation of Liability</h2>
            <p>
              Visume is provided "as is" and "as available". We do not guarantee job offers, placements, or that recruiter messages will result in hires. In no event shall Visume, its team, or partners be liable for any indirect, incidental, or consequential damages resulting from your use of the platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-white">6. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to Visume at our discretion, without notice, if you violate these terms. You can also terminate your agreement at any time by deleting your account from the dashboard.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
