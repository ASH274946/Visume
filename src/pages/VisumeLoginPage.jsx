import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const VisumeLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    // Set a flag in localStorage that the user is logged in
    localStorage.setItem('isLoggedIn', 'true');
    
    // Get the redirect path from state, default to '/dashboard'
    const from = location.state?.redirectTo || '/dashboard';
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-text-primary font-body-md flex flex-col">
      <nav className="glass-header sticky top-0 z-50 h-16 flex items-center px-gutter w-full border-b border-border-base">
        <div className="max-w-container-max mx-auto w-full flex justify-between items-center">
          <Link className="font-display text-headline-md font-bold text-primary-container" to="/">Visume</Link>
          <div className="hidden md:flex gap-sm">
            <span className="text-text-muted font-body-sm">Don't have an account?</span>
            <Link className="text-primary-container font-label-md hover:underline" to="/register">Sign Up</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-md">
        <div className="w-full max-w-md bg-card-bg border border-border-input rounded-xl p-lg shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center mb-xl">
            <h1 className="font-display text-headline-lg font-bold text-text-primary mb-2">Welcome Back</h1>
            <p className="text-text-muted font-body-sm">Log in to continue your job search journey.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-md">
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-text-muted">Email Address</label>
              <input 
                className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" 
                placeholder="you@example.com" 
                type="email"
              />
            </div>
            
            <div className="flex flex-col gap-xs">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-text-muted">Password</label>
                <a href="#" className="text-primary-container font-label-md text-[12px] hover:underline">Forgot password?</a>
              </div>
              <input 
                className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" 
                placeholder="••••••••" 
                type="password"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-primary-container text-white font-label-md py-md rounded-lg hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-wider font-bold mt-4"
            >
              Log In
            </button>
            
            <div className="flex items-center gap-4 py-2">
              <div className="h-px bg-border-input flex-1"></div>
              <span className="text-text-muted font-label-md text-sm">OR</span>
              <div className="h-px bg-border-input flex-1"></div>
            </div>

            <button 
              type="button"
              className="w-full bg-surface-container border border-border-input text-text-primary font-label-md py-md rounded-lg hover:bg-surface-dim active:scale-[0.98] transition-all font-bold flex items-center justify-center gap-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
          </form>
          
          <div className="mt-lg text-center md:hidden">
            <span className="text-text-muted font-body-sm">Don't have an account? </span>
            <Link className="text-primary-container font-label-md hover:underline" to="/register">Sign Up</Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-outline-variant bg-surface-container-lowest py-lg">
        <div className="max-w-container-max mx-auto px-gutter text-center">
          <p className="font-body-sm text-text-muted">© 2024 Visume. Personality-driven hiring.</p>
        </div>
      </footer>
    </div>
  );
};

export default VisumeLoginPage;
