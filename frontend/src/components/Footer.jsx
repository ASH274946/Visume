import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant">
      <div className="max-w-container-max mx-auto px-gutter py-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-lg">
          <div className="space-y-4">
            <Link className="font-display text-headline-sm font-bold text-text-primary tracking-tight" to="/">
              Visume
            </Link>
            <p className="font-body-sm text-text-muted max-w-xs">
              Personality-driven hiring. Empowering candidates to showcase more than just a piece of paper.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            <div className="space-y-4">
              <p className="font-label-md text-white font-bold uppercase tracking-widest text-[12px]">Platform</p>
              <ul className="space-y-2">
                <li>
                  <Link className="text-text-muted hover:text-secondary transition-colors text-sm" to="/login" state={{ redirectTo: '/dashboard' }}>
                    For Candidates
                  </Link>
                </li>
                <li>
                  <Link className="text-text-muted hover:text-secondary transition-colors text-sm" to="/login" state={{ redirectTo: '/recruiter' }}>
                    For Recruiters
                  </Link>
                </li>
                <li>
                  <Link className="text-text-muted hover:text-secondary transition-colors text-sm" to="/pricing">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="font-label-md text-white font-bold uppercase tracking-widest text-[12px]">Company</p>
              <ul className="space-y-2">
                <li>
                  <Link className="text-text-muted hover:text-secondary transition-colors text-sm" to="/about">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="text-text-muted hover:text-secondary transition-colors text-sm" to="/privacy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-text-muted hover:text-secondary transition-colors text-sm" to="/terms">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-xl pt-lg border-t border-outline-variant flex flex-col md:flex-row justify-between gap-4">
          <p className="font-body-sm text-text-muted">© 2024 Visume. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="text-text-muted hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined text-sm">share</span>
            </a>
            <a className="text-text-muted hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined text-sm">public</span>
            </a>
            <a className="text-text-muted hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined text-sm">group</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
