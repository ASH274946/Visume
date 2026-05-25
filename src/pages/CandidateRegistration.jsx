import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomSelect from '../components/CustomSelect';

const TopNav = () => (
  <nav className="glass-header sticky top-0 z-50 h-16 flex items-center px-gutter w-full">
    <div className="max-w-container-max mx-auto w-full flex justify-between items-center">
      <Link to="/" className="font-display text-headline-md font-bold text-primary-container">Visume</Link>
      <div className="hidden md:flex gap-sm items-center">
        <span className="text-text-muted font-body-sm">Already have an account?</span>
        <Link className="text-primary-container font-label-md hover:underline" to="/login">Log In</Link>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="mt-auto border-t border-outline-variant bg-surface-container-lowest py-lg">
    <div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row justify-between items-center gap-md">
      <span className="font-display text-headline-sm font-bold text-text-primary">Visume</span>
      <div className="flex gap-lg">
        <Link className="font-label-md text-text-muted hover:text-secondary transition-colors" to="/privacy">Privacy Policy</Link>
        <Link className="font-label-md text-text-muted hover:text-secondary transition-colors" to="/terms">Terms of Service</Link>
        <Link className="font-label-md text-text-muted hover:text-secondary transition-colors" to="/login" state={{ redirectTo: '/recruiter' }}>For Recruiters</Link>
      </div>
      <p className="font-body-sm text-text-muted">© 2024 Visume. Personality-driven hiring.</p>
    </div>
  </footer>
);

const ProgressBar = ({ currentStep }) => {
  return (
    <div className="mb-xxl">
      <div className="flex justify-between items-center mb-sm">
        <div className="flex flex-col items-center flex-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${currentStep >= 1 ? 'bg-primary-container text-on-primary' : 'bg-surface-container text-text-muted'}`}>
            {currentStep > 1 ? <span className="material-symbols-outlined text-[16px]">check</span> : '1'}
          </div>
          <span className={`font-label-md mt-xs ${currentStep >= 1 ? 'text-primary-container' : 'text-text-muted'}`}>Account Setup</span>
        </div>
        <div className={`h-px flex-1 mb-6 transition-all duration-300 ${currentStep >= 2 ? 'bg-primary-container' : 'bg-outline-variant'}`}></div>
        
        <div className="flex flex-col items-center flex-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${currentStep >= 2 ? 'bg-primary-container text-on-primary' : 'bg-surface-container text-text-muted'}`}>
            {currentStep > 2 ? <span className="material-symbols-outlined text-[16px]">check</span> : '2'}
          </div>
          <span className={`font-label-md mt-xs ${currentStep >= 2 ? 'text-primary-container' : 'text-text-muted'}`}>KYC Verification</span>
        </div>
        <div className={`h-px flex-1 mb-6 transition-all duration-300 ${currentStep >= 3 ? 'bg-primary-container' : 'bg-outline-variant'}`}></div>
        
        <div className="flex flex-col items-center flex-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${currentStep >= 3 ? 'bg-primary-container text-on-primary' : 'bg-surface-container text-text-muted'}`}>
            3
          </div>
          <span className={`font-label-md mt-xs ${currentStep >= 3 ? 'text-primary-container' : 'text-text-muted'}`}>Profile</span>
        </div>
      </div>
    </div>
  );
};

const Step1 = ({ onNext, role, setRole }) => {

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-lg">
        <h1 className="font-headline-lg text-headline-lg text-text-primary mb-xs">Create Your Account</h1>
        <p className="font-body-md text-text-muted">Start your journey with a personality-first application.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md mb-lg">
        <div 
          onClick={() => setRole('candidate')}
          className={`cursor-pointer p-lg border rounded-xl flex flex-col items-center transition-all duration-300 ${role === 'candidate' ? 'border-primary-container shadow-[0_0_20px_rgba(108,92,231,0.2)] bg-primary-container/5' : 'border-border-input'}`}
        >
          <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-md">
            <span className={`material-symbols-outlined ${role === 'candidate' ? 'text-primary-container' : 'text-text-muted'}`} style={{ fontVariationSettings: role === 'candidate' ? "'FILL' 1" : "'FILL' 0" }}>person</span>
          </div>
          <span className="font-headline-sm text-headline-sm text-text-primary">I'm a Candidate</span>
          <p className="font-body-sm text-text-muted text-center mt-xs">I want to showcase my personality and find a job.</p>
        </div>
        
        <div 
          onClick={() => setRole('recruiter')}
          className={`cursor-pointer p-lg border rounded-xl flex flex-col items-center transition-all duration-300 ${role === 'recruiter' ? 'border-primary-container shadow-[0_0_20px_rgba(108,92,231,0.2)] bg-primary-container/5' : 'border-border-input'}`}
        >
          <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-md">
            <span className={`material-symbols-outlined ${role === 'recruiter' ? 'text-primary-container' : 'text-text-muted'}`} style={{ fontVariationSettings: role === 'recruiter' ? "'FILL' 1" : "'FILL' 0" }}>work</span>
          </div>
          <span className="font-headline-sm text-headline-sm text-text-primary">I'm a Recruiter</span>
          <p className="font-body-sm text-text-muted text-center mt-xs">I want to hire talent through video-first screening.</p>
        </div>
      </div>
      
      <div className="space-y-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-text-muted">Full Name</label>
            <input className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="John Doe" type="text"/>
          </div>
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-text-muted">Email Address</label>
            <input className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="john@example.com" type="email"/>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-text-muted">Password</label>
            <input className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="••••••••" type="password"/>
          </div>
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-text-muted">Confirm Password</label>
            <input className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="••••••••" type="password"/>
          </div>
        </div>
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-text-muted">Phone Number</label>
          <input className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="+1 (555) 000-0000" type="tel"/>
        </div>
        
        {role === 'candidate' && (
          <div className="space-y-md border-t border-outline-variant pt-md mt-sm">
            <h3 className="font-label-md text-text-primary uppercase tracking-wider">Candidate Details</h3>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-text-muted">Address</label>
              <input className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="City, State, Country" type="text"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-text-muted">Previous Experience</label>
                <input className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="e.g. 3 yrs Frontend Dev" type="text"/>
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-text-muted">Portfolio / Website</label>
                <input className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="https://" type="url"/>
              </div>
            </div>
          </div>
        )}

        {role === 'recruiter' && (
          <div className="space-y-md border-t border-outline-variant pt-md mt-sm">
            <h3 className="font-label-md text-text-primary uppercase tracking-wider">Recruiter Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-text-muted">Designation</label>
                <input className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="e.g. Talent Acquisition" type="text"/>
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-text-muted">Department</label>
                <input className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="e.g. Human Resources" type="text"/>
              </div>
            </div>
          </div>
        )}
        <button onClick={() => onNext()} className="w-full bg-primary-container text-white font-label-md py-md rounded-lg hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-wider font-bold mt-4">Continue</button>
        
        <div className="flex items-center gap-4 py-2 mt-4">
          <div className="h-px bg-border-input flex-1"></div>
          <span className="text-text-muted font-label-md text-sm">OR</span>
          <div className="h-px bg-border-input flex-1"></div>
        </div>

        <button 
          onClick={() => onNext()}
          type="button"
          className="w-full bg-surface-container border border-border-input text-text-primary font-label-md py-md rounded-lg hover:bg-surface-dim active:scale-[0.98] transition-all font-bold flex items-center justify-center gap-3 mt-4"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign up with Google
        </button>
      </div>
    </section>
  );
};

const Step2 = ({ onNext, onBack, role }) => (
  <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="mb-lg">
      <button onClick={() => onBack()} className="flex items-center gap-1 text-text-muted hover:text-primary-container font-label-md transition-colors mb-sm group w-max">
        <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
        Back
      </button>
      <h1 className="font-headline-lg text-headline-lg text-text-primary mb-xs">
        {role === 'recruiter' ? 'Company KYC Verification' : 'Verify Your Identity'}
      </h1>
      <p className="font-body-md text-text-muted">
        {role === 'recruiter' 
          ? 'Required for company verification and secure job postings.' 
          : 'Required for profile trust badge and secure application processing.'}
      </p>
    </div>

    <div className="bg-surface-container border border-border-input rounded-xl p-lg flex flex-col sm:flex-row items-center justify-between gap-md mb-lg">
      <div className="flex items-center gap-md">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-outline-variant p-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/DigiLocker_logo.svg/512px-DigiLocker_logo.svg.png" alt="DigiLocker" className="w-full h-full object-contain" />
        </div>
        <div>
          <h3 className="font-headline-sm text-text-primary text-left">Instant KYC with DigiLocker</h3>
          <p className="font-body-sm text-text-muted mt-1 text-left">Fetch your official documents securely in seconds.</p>
        </div>
      </div>
      <button onClick={() => alert('Redirecting to DigiLocker OAuth for secure document fetch...')} className="bg-[#183a66] hover:bg-[#122b4d] text-white font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-md w-full sm:w-auto">
        <span className="material-symbols-outlined text-[20px]">cloud_sync</span>
        Connect DigiLocker
      </button>
    </div>

    <div className="flex items-center gap-4 py-2 mb-lg">
      <div className="h-px bg-border-input flex-1"></div>
      <span className="text-text-muted font-label-md text-sm uppercase tracking-wider">Or Upload Manually</span>
      <div className="h-px bg-border-input flex-1"></div>
    </div>
    
    {role === 'recruiter' ? (
      <>
        <div className="space-y-md mb-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-text-muted">Company Name</label>
              <input className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="Acme Corp" type="text"/>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-text-muted">Company Registration Number (CIN)</label>
              <input className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="U12345MH2024PTC123456" type="text"/>
            </div>
          </div>
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-text-muted">Registered Company Address</label>
            <input className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="123 Business Park, City, State, ZIP" type="text"/>
          </div>
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-text-muted">Company Website</label>
            <input className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="https://" type="url"/>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md mb-xl">
          <div className="p-lg border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center bg-card-bg group hover:border-primary-container transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-text-muted group-hover:text-primary-container mb-sm text-xl" style={{ fontSize: '40px' }}>upload_file</span>
            <span className="font-headline-sm text-text-primary text-center">Certificate of Incorporation</span>
            <div className="mt-md bg-[#ffc107]/10 text-[#ffc107] px-md py-1 rounded-full font-label-md">Pending Upload</div>
          </div>
          <div className="p-lg border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center bg-card-bg group hover:border-primary-container transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-text-muted group-hover:text-primary-container mb-sm text-xl" style={{ fontSize: '40px' }}>upload_file</span>
            <span className="font-headline-sm text-text-primary text-center">Company PAN Card</span>
            <div className="mt-md bg-[#ffc107]/10 text-[#ffc107] px-md py-1 rounded-full font-label-md">Pending Upload</div>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md mb-lg">
          <div className="p-lg border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center bg-card-bg group hover:border-primary-container transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-text-muted group-hover:text-primary-container mb-sm text-xl" style={{ fontSize: '40px' }}>upload_file</span>
            <span className="font-headline-sm text-text-primary text-center">Upload Aadhaar Card</span>
            <div className="mt-md bg-[#ffc107]/10 text-[#ffc107] px-md py-1 rounded-full font-label-md">Pending Verification</div>
          </div>
          <div className="p-lg border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center bg-card-bg group hover:border-primary-container transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-text-muted group-hover:text-primary-container mb-sm text-xl" style={{ fontSize: '40px' }}>upload_file</span>
            <span className="font-headline-sm text-text-primary text-center">Upload PAN Card</span>
            <div className="mt-md bg-[#ffc107]/10 text-[#ffc107] px-md py-1 rounded-full font-label-md">Pending Verification</div>
          </div>
        </div>
        <div className="mb-xl">
          <div className="bg-card-bg border border-border-input rounded-xl p-xl flex flex-col items-center justify-center text-center">
            <button className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary-container/20 transition-all border border-border-input group">
              <span className="material-symbols-outlined text-text-primary group-hover:text-primary-container" style={{ fontSize: '32px' }}>photo_camera</span>
            </button>
            <span className="font-headline-sm text-text-primary mt-md">Take Selfie or Upload Photo</span>
            <p className="font-body-sm text-text-muted mt-xs max-w-sm">Ensure your face is clearly visible and well-lit for automated verification.</p>
          </div>
        </div>
      </>
    )}
    <button onClick={() => onNext()} className="w-full bg-primary-container text-white font-label-md py-md rounded-lg hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-wider font-bold">Submit for Verification</button>
  </section>
);

const Step3 = ({ onBack, role }) => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState(['React', 'Tailwind CSS']);
  const [inputVal, setInputVal] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputVal.trim() !== '') {
      e.preventDefault();
      setSkills([...skills, inputVal.trim()]);
      setInputVal('');
    }
  };

  const removeSkill = (indexToRemove) => {
    setSkills(skills.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-lg">
        <button onClick={() => onBack()} className="flex items-center gap-1 text-text-muted hover:text-primary-container font-label-md transition-colors mb-sm group w-max">
          <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Back
        </button>
        <h1 className="font-headline-lg text-headline-lg text-text-primary mb-xs">Profile Setup</h1>
        <p className="font-body-md text-text-muted">Complete your professional identity to start applying.</p>
      </div>
      <div className="flex justify-center mb-xl">
        <div className="relative w-[96px] h-[96px] group cursor-pointer">
          <img alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-primary-container" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&h=256&q=80"/>
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-white">photo_camera</span>
          </div>
        </div>
      </div>
      <div className="space-y-md">
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-text-muted">
            {role === 'recruiter' ? 'Hiring Focus / Headline' : 'Professional Headline'}
          </label>
          <input className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder={role === 'recruiter' ? 'e.g. Seeking top engineering talent' : 'e.g. Senior Frontend Developer with 5 years experience'} type="text"/>
        </div>
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-text-muted">
            {role === 'recruiter' ? 'Roles Hiring For (Press Enter to add)' : 'Skills (Press Enter to add)'}
          </label>
          <div className="bg-border-base border border-border-input rounded-lg px-md py-2 flex flex-wrap gap-2 min-h-[46px]">
            {skills.map((skill, idx) => (
              <span key={idx} className="bg-primary-container/20 text-primary-container text-label-md px-3 py-1 rounded-full flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                {skill} 
                <span className="material-symbols-outlined text-[14px] cursor-pointer" onClick={() => removeSkill(idx)}>close</span>
              </span>
            ))}
            <input 
              className="bg-transparent border-none outline-none focus:ring-0 p-1 flex-1 text-body-sm text-text-primary min-w-[100px]" 
              placeholder="Type + Enter" 
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-text-muted">Location</label>
            <input 
              className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" 
              placeholder="Type or select a city..." 
              type="text"
              list="locations"
            />
            <datalist id="locations">
              <option value="San Francisco, CA" />
              <option value="New York, NY" />
              <option value="Los Angeles, CA" />
              <option value="Chicago, IL" />
              <option value="Austin, TX" />
              <option value="London, UK" />
              <option value="Berlin, Germany" />
              <option value="Paris, France" />
              <option value="Toronto, Canada" />
              <option value="Vancouver, Canada" />
              <option value="Sydney, Australia" />
              <option value="Melbourne, Australia" />
              <option value="Bengaluru, India" />
              <option value="Mumbai, India" />
              <option value="Delhi, India" />
              <option value="Singapore" />
              <option value="Dubai, UAE" />
              <option value="Tokyo, Japan" />
              <option value="Seoul, South Korea" />
              <option value="Remote" />
            </datalist>
          </div>
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-text-muted">LinkedIn URL <span className="text-text-muted opacity-60">(Optional)</span></label>
            <input className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="linkedin.com/in/username" type="url"/>
          </div>
        </div>
        <button onClick={() => navigate('/dashboard')} className="w-full bg-primary-container text-white font-label-md py-md rounded-lg hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-wider font-bold mt-4">Complete Profile</button>
      </div>
    </section>
  );
};

const CandidateRegistration = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('candidate');

  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-text-primary font-body-md">
      <TopNav />
      <main className="max-w-3xl mx-auto px-gutter py-xl min-h-[calc(100vh-64px-100px)]">
        <ProgressBar currentStep={step} />
        {step === 1 && <Step1 onNext={nextStep} role={role} setRole={setRole} />}
        {step === 2 && <Step2 onNext={nextStep} onBack={prevStep} role={role} />}
        {step === 3 && <Step3 onBack={prevStep} role={role} />}
      </main>
      <Footer />
    </div>
  );
};

export default CandidateRegistration;
