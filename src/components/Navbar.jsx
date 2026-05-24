import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-gutter pt-4 pb-2 backdrop-blur-xl bg-background/25 pointer-events-none">
      <nav className="max-w-container-max mx-auto h-16 bg-surface-container/60 border border-outline-variant/65 rounded-xl shadow-xl flex items-center justify-between px-6 pointer-events-auto">
        <div className="flex items-center gap-12">
          <Link className="font-display text-headline-md font-bold text-primary tracking-tight" to="/">
            Visume
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link className="font-label-md text-text-muted hover:text-text-primary transition-colors" to="/how-it-works">
              How it Works
            </Link>
            <Link className="font-label-md text-text-muted hover:text-text-primary transition-colors" to="/login" state={{ redirectTo: '/dashboard' }}>
              For Candidates
            </Link>
            <Link className="font-label-md text-text-muted hover:text-text-primary transition-colors" to="/login" state={{ redirectTo: '/recruiter' }}>
              For Recruiters
            </Link>
            <Link className="font-label-md text-text-muted hover:text-text-primary transition-colors" to="/pricing">
              Pricing
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="font-label-md bg-primary text-white px-md py-xs rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center">
            Sign In
          </Link>
        </div>
      </nav>
      <div className="absolute top-full left-0 w-full h-12 bg-gradient-to-b from-background/20 to-transparent pointer-events-none"></div>
    </header>
  );
};

export default Navbar;
