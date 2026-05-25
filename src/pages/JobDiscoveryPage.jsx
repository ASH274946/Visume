import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toggle from '../components/Toggle';

const initialJobs = [
  {
    title: "Lead Product Designer",
    company: "Stripe",
    location: "Bengaluru, Remote",
    match: 94,
    type: "Full-time",
    salary: 32,
    salaryDisplay: "₹32L - ₹45L",
    tags: ["Figma", "React", "System Design"],
    experience: "Senior",
    workMode: "Remote",
    imgSrc: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
  },
  {
    title: "Senior Frontend Engineer",
    company: "Linear",
    location: "Remote, Worldwide",
    match: 88,
    type: "Contract",
    salary: 18,
    salaryDisplay: "₹18L - ₹24L",
    tags: ["TypeScript", "Next.js", "Tailwind"],
    experience: "Senior",
    workMode: "Remote",
    imgSrc: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80"
  },
  {
    title: "Growth Marketing Manager",
    company: "Airbnb",
    location: "Mumbai, Hybrid",
    match: 82,
    type: "Full-time",
    salary: 22,
    salaryDisplay: "₹22L - ₹28L",
    tags: ["SEO", "Analytics", "Content Strategy"],
    experience: "Intermediate",
    workMode: "Hybrid",
    imgSrc: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80"
  },
  {
    title: "iOS Developer (Visume Only)",
    company: "Discord",
    location: "Remote",
    match: 97,
    type: "Full-time",
    salary: 40,
    salaryDisplay: "₹40L - ₹55L",
    tags: ["SwiftUI", "Combine", "WebRTC"],
    experience: "Senior",
    workMode: "Remote",
    imgSrc: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
  },
  {
    title: "Backend Engineer",
    company: "Acme Corp",
    location: "Bengaluru, Onsite",
    match: 75,
    type: "Full-time",
    salary: 8,
    salaryDisplay: "₹8L - ₹12L",
    tags: ["Node.js", "MongoDB", "Express"],
    experience: "Entry",
    workMode: "Onsite",
    imgSrc: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"
  },
  {
    title: "Product Manager",
    company: "Notion",
    location: "Remote",
    match: 68,
    type: "Full-time",
    salary: 28,
    salaryDisplay: "₹28L - ₹40L",
    tags: ["Agile", "Strategy", "User Research"],
    experience: "Intermediate",
    workMode: "Remote",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"
  },
  {
    title: "Data Scientist",
    company: "DeepSense Labs",
    location: "Bengaluru, Remote",
    match: 90,
    type: "Full-time",
    salary: 36,
    salaryDisplay: "₹36L - ₹50L",
    tags: ["Python", "PyTorch", "NLP"],
    experience: "Senior",
    workMode: "Remote",
    imgSrc: "https://images.unsplash.com/photo-1526378724505-6f6a7b8de9f9?w=800&q=80"
  },
  {
    title: "DevOps Engineer",
    company: "CloudArc",
    location: "Pune, Hybrid",
    match: 78,
    type: "Full-time",
    salary: 20,
    salaryDisplay: "₹20L - ₹30L",
    tags: ["AWS", "Kubernetes", "CI/CD"],
    experience: "Intermediate",
    workMode: "Hybrid",
    imgSrc: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
  },
  {
    title: "HR Generalist",
    company: "PeopleFirst",
    location: "Chennai, Onsite",
    match: 64,
    type: "Full-time",
    salary: 10,
    salaryDisplay: "₹10L - ₹14L",
    tags: ["Recruitment", "Employee Relations"],
    experience: "Entry",
    workMode: "Onsite",
    imgSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
  },
  {
    title: "UX Researcher",
    company: "Canvas Studio",
    location: "Bengaluru, Hybrid",
    match: 85,
    type: "Contract",
    salary: 15,
    salaryDisplay: "₹15L - ₹20L",
    tags: ["User Research", "Usability", "Protoyping"],
    experience: "Intermediate",
    workMode: "Hybrid",
    imgSrc: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80"
  },
  {
    title: "Customer Success Manager",
    company: "BrightWave",
    location: "Remote",
    match: 71,
    type: "Full-time",
    salary: 12,
    salaryDisplay: "₹12L - ₹18L",
    tags: ["SaaS", "Onboarding", "Renewals"],
    experience: "Intermediate",
    workMode: "Remote",
    imgSrc: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&q=80"
  },
  {
    title: "QA Automation Engineer",
    company: "TestGrid",
    location: "Hyderabad, Onsite",
    match: 76,
    type: "Full-time",
    salary: 14,
    salaryDisplay: "₹14L - ₹19L",
    tags: ["Selenium", "Cypress", "Automation"],
    experience: "Intermediate",
    workMode: "Onsite",
    imgSrc: "https://images.unsplash.com/photo-1532619675605-9003ca6d82f1?w=800&q=80"
  },
  {
    title: "Motion Graphics Artist",
    company: "StudioFlux",
    location: "Mumbai, Hybrid",
    match: 83,
    type: "Contract",
    salary: 9,
    salaryDisplay: "₹9L - ₹13L",
    tags: ["After Effects", "Cinema4D", "Animation"],
    experience: "Intermediate",
    workMode: "Hybrid",
    imgSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
  },
  {
    title: "Sales Development Representative",
    company: "LeadFlow",
    location: "Bengaluru, Onsite",
    match: 60,
    type: "Full-time",
    salary: 6,
    salaryDisplay: "₹6L - ₹9L",
    tags: ["Outbound", "B2B Sales"],
    experience: "Entry",
    workMode: "Onsite",
    imgSrc: "https://images.unsplash.com/photo-1542223616-1c2b7f6f4b5f?w=800&q=80"
  }
];

const FilterSidebar = ({
  searchQuery, setSearchQuery,
  workModes, setWorkModes,
  jobTypes, setJobTypes,
  salaryMin, setSalaryMin,
  experience, setExperience,
  aiSmartMatch, setAiSmartMatch
}) => {
  const toggleWorkMode = (mode) => {
    setWorkModes(prev => prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]);
  };

  const toggleJobType = (type) => {
    setJobTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const toggleExperience = (exp) => {
    setExperience(prev => prev.includes(exp) ? prev.filter(e => e !== exp) : [...prev, exp]);
  };

  return (
    <aside className="bg-surface-container border border-outline-variant rounded-2xl shadow-xl sidebar-scroll overflow-y-auto flex flex-col p-4 gap-4 sticky top-0 max-h-[calc(100vh-120px)] w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-title-lg font-bold text-text-primary">Filter Jobs</h2>
        <span className="material-symbols-outlined text-[20px] text-text-muted cursor-pointer hover:text-primary">tune</span>
      </div>

      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-text-muted">search</span>
        <input 
          className="w-full bg-surface-container-low border border-border-input rounded-lg pl-9 pr-3 py-2.5 text-[13px] focus:outline-none focus:border-primary-container transition-all" 
          placeholder="Search roles..." 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-label-md text-[11px] text-text-muted uppercase tracking-wider">Work Mode</h3>
          <div className="flex flex-wrap gap-2 items-center">
          {['Remote', 'Hybrid', 'Onsite'].map(mode => (
            <button 
              key={mode}
              onClick={() => toggleWorkMode(mode)}
              className={`px-3 py-1.5 rounded-full border text-[12px] font-medium transition-all ${
                workModes.includes(mode) 
                  ? 'border-primary-container bg-primary-container/10 text-primary-container' 
                  : 'border-outline text-text-muted hover:border-text-primary hover:text-text-primary'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-label-md text-[11px] text-text-muted uppercase tracking-wider">Employment Type</h3>
        <div className="flex flex-wrap gap-2">
          {['Full-time', 'Part-time', 'Contract'].map(type => (
            <button 
              key={type}
              onClick={() => toggleJobType(type)}
              className={`px-3 py-1.5 rounded-full border text-[12px] font-medium transition-all ${
                jobTypes.includes(type) 
                  ? 'border-primary-container bg-primary-container/10 text-primary-container' 
                  : 'border-outline text-text-muted hover:border-text-primary hover:text-text-primary'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-label-md text-[11px] text-text-muted uppercase tracking-wider">Salary (Annual)</h3>
          <span className="text-[12px] text-primary-container font-bold">₹{salaryMin}L+</span>
        </div>
        <input 
          className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary-container mt-1" 
          max="50" min="4" type="range" 
          value={salaryMin}
          onChange={(e) => setSalaryMin(parseInt(e.target.value))}
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-label-md text-[11px] text-text-muted uppercase tracking-wider">Experience</h3>
        <div className="flex flex-col gap-2">
          {[
            { label: 'Entry Level (0-2y)', value: 'Entry' },
            { label: 'Intermediate (2-5y)', value: 'Intermediate' },
            { label: 'Senior (5y+)', value: 'Senior' }
          ].map(exp => (
            <label key={exp.value} className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  className="peer sr-only" 
                  type="checkbox" 
                  checked={experience.includes(exp.value)}
                  onChange={() => toggleExperience(exp.value)}
                />
                <div className="w-4 h-4 rounded border-[1.5px] border-outline-variant bg-transparent peer-checked:bg-primary peer-checked:border-primary transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[12px] opacity-0 peer-checked:opacity-100">check</span>
                </div>
              </div>
              <span className="text-[13px] text-on-surface-variant group-hover:text-text-primary">{exp.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="p-3 rounded-xl bg-secondary-container/5 border border-secondary-container/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <span className="text-[12px] font-bold text-tertiary">AI Smart Match</span>
          </div>
          <div className="scale-[0.8] origin-right">
            <Toggle checked={aiSmartMatch} onChange={() => setAiSmartMatch(!aiSmartMatch)} activeColor="tertiary" />
          </div>
        </div>
      </div>
    </aside>
  );
};

const JobGrid = ({ jobs, onApplied, selectedJob, setSelectedJob }) => {
  const navigate = useNavigate();
  const [applyingIdx, setApplyingIdx] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-muted col-span-2">
         <span className="material-symbols-outlined text-[48px] mb-4">search_off</span>
         <h3 className="text-title-lg font-bold text-text-primary">No jobs found</h3>
         <p className="mt-2 text-body-md">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-gutter">
        {jobs.map((job, idx) => (
          <div key={idx} className="bg-card-bg border border-border-base rounded-xl p-lg transition-all hover:border-primary-container shadow-lg">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center border border-outline-variant overflow-hidden p-2">
                  <img alt={job.company} className="w-full h-full object-contain" src={job.imgSrc} />
                </div>
                <div>
                  <h3 className="font-display text-headline-sm text-text-primary">{job.title}</h3>
                  <p className="text-text-muted text-label-md mt-1">{job.company} • {job.location}</p>
                </div>
              </div>
              <div className="bg-secondary/10 text-secondary px-3 py-1.5 rounded-full flex flex-col items-center">
                <span className="text-[14px] font-bold">{job.match}%</span>
                <span className="text-[9px] uppercase font-bold">Match</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-surface-container-high text-text-muted text-label-md">{job.type}</span>
                <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary-container text-label-md font-bold">{job.salaryDisplay}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {job.tags && job.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="px-3 py-1 rounded-full bg-border-base text-text-muted text-[12px] flex items-center gap-1 border border-outline-variant/30">{tag}</span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setSelectedJob(jobs[idx]); }}
                className="flex-1 text-center border border-border-input text-text-muted py-3 rounded-lg font-bold hover:bg-surface-container-highest transition-colors"
              >
                View Details
              </button>
              <button
                type="button"
                onClick={() => {
                  setApplyingIdx(idx);
                  setTimeout(() => {
                    setApplyingIdx(null);
                    setAppliedJobs(prev => new Set(prev).add(idx));

                    // Save to localStorage
                    const existingApplications = JSON.parse(localStorage.getItem('visume_applications') || '[]');
                    const alreadyApplied = existingApplications.some(
                      app => app.title === jobs[idx].title && app.company === jobs[idx].company
                    );

                    if (!alreadyApplied) {
                      const newApplication = {
                        id: Date.now(),
                        title: jobs[idx].title,
                        company: jobs[idx].company,
                        logo: jobs[idx].company.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase(),
                        location: jobs[idx].location.split(',')[1]?.trim() || jobs[idx].location,
                        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                        status: 'applied',
                        statusText: 'Applied',
                        colorClass: 'status-applied'
                      };

                      existingApplications.push(newApplication);
                      localStorage.setItem('visume_applications', JSON.stringify(existingApplications));
                      if (onApplied) onApplied();
                    }
                  }, 800);
                }}
                disabled={applyingIdx === idx || appliedJobs.has(idx)}
                className={`flex-1 py-3 bg-primary-container text-white rounded-lg font-bold active:scale-95 transition-all ${appliedJobs.has(idx) ? 'opacity-50 pointer-events-none' : ''}`}
              >
                {applyingIdx === idx ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : appliedJobs.has(idx) ? (
                  'Applied'
                ) : 'Apply Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container border border-outline-variant rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center border border-outline-variant overflow-hidden p-2">
                  <img alt={selectedJob.company} className="w-full h-full object-contain" src={selectedJob.imgSrc} />
                </div>
                <div>
                  <h3 className="text-headline-sm font-display text-text-primary mb-1">{selectedJob.title}</h3>
                  <p className="text-body-md text-text-muted">{selectedJob.company} • {selectedJob.location}</p>
                </div>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-text-muted hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary-container/10 text-tertiary text-label-md font-bold border border-tertiary/20">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                {selectedJob.match}% Match
              </div>
              <span className="px-3 py-1.5 rounded-lg bg-surface-container-highest text-text-muted text-label-md">{selectedJob.type}</span>
              <span className="px-3 py-1.5 rounded-lg bg-surface-container-highest text-primary-container text-label-md font-bold">{selectedJob.salaryDisplay}</span>
            </div>

            <div className="space-y-4 text-body-sm text-on-surface-variant mb-8">
              <p>This is a mockup job description. In the real application, you would see detailed requirements, responsibilities, and company information here.</p>
              <div className="flex flex-wrap gap-2">
                {selectedJob.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant text-label-md text-text-muted">{tag}</span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setSelectedJob(null)}
                className="flex-1 py-3 border border-border-input text-text-muted font-bold rounded-lg hover:bg-surface-container-highest transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // find index of the selected job in the jobs list
                  const idx = jobs.findIndex(j => j.title === selectedJob.title && j.company === selectedJob.company);

                  if (idx === -1) {
                    // fallback: just navigate
                    setSelectedJob(null);
                    navigate('/applications');
                    return;
                  }

                  // if already applied, go to applications
                  if (appliedJobs.has(idx)) {
                    setSelectedJob(null);
                    navigate('/applications');
                    return;
                  }

                  // run apply animation then save
                  setApplyingIdx(idx);
                  setTimeout(() => {
                    setApplyingIdx(null);
                    setAppliedJobs(prev => new Set(prev).add(idx));

                    // Save to localStorage
                    const existingApplications = JSON.parse(localStorage.getItem('visume_applications') || '[]');
                    const alreadyApplied = existingApplications.some(
                      app => app.title === jobs[idx].title && app.company === jobs[idx].company
                    );

                    if (!alreadyApplied) {
                      const newApplication = {
                        id: Date.now(),
                        title: jobs[idx].title,
                        company: jobs[idx].company,
                        logo: jobs[idx].company.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase(),
                        location: jobs[idx].location.split(',')[1]?.trim() || jobs[idx].location,
                        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                        status: 'applied',
                        statusText: 'Applied',
                        colorClass: 'status-applied'
                      };

                      existingApplications.push(newApplication);
                      localStorage.setItem('visume_applications', JSON.stringify(existingApplications));
                      if (onApplied) onApplied();
                    }

                    // close modal after applying
                    setSelectedJob(null);
                  }, 800);
                }}
                className="flex-1 py-3 bg-primary-container text-white font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-container/20"
              >
                {(() => {
                  const idx = jobs.findIndex(j => j.title === selectedJob.title && j.company === selectedJob.company);
                  if (applyingIdx === idx) return (<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>);
                  if (appliedJobs.has(idx)) return 'Go to Applications';
                  return 'Apply Now';
                })()}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const MobileNav = () => (
  <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-surface-container border-t border-outline-variant flex justify-around items-center px-4 z-50">
    <button className="flex flex-col items-center gap-1 text-primary-container">
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
      <span className="text-[10px] font-bold">Discover</span>
    </button>
    <button className="flex flex-col items-center gap-1 text-text-muted">
      <span className="material-symbols-outlined">work</span>
      <span className="text-[10px]">Applied</span>
    </button>
    <button className="flex flex-col items-center gap-1 text-text-muted">
      <span className="material-symbols-outlined">chat</span>
      <span className="text-[10px]">Messages</span>
    </button>
    <button className="flex flex-col items-center gap-1 text-text-muted">
      <span className="material-symbols-outlined">account_circle</span>
      <span className="text-[10px]">Profile</span>
    </button>
  </nav>
);

const Footer = () => (
  <footer className="mt-xxl border-t border-outline-variant py-lg flex flex-col md:flex-row justify-between items-center gap-6">
    <div className="text-center md:text-left">
      <span className="font-display text-headline-sm font-bold text-text-primary">Visume</span>
      <p className="font-body-sm text-body-sm text-text-muted mt-2">© 2024 Visume. Personality-driven hiring.</p>
    </div>
    <div className="flex flex-wrap justify-center gap-6">
      <Link className="text-label-md font-label-md text-text-muted hover:text-secondary transition-colors" to="/privacy">Privacy Policy</Link>
      <Link className="text-label-md font-label-md text-text-muted hover:text-secondary transition-colors" to="/terms">Terms of Service</Link>
      <Link className="text-label-md font-label-md text-text-muted hover:text-secondary transition-colors" to="/login" state={{ redirectTo: '/recruiter' }}>For Recruiters</Link>
      <Link className="text-label-md font-label-md text-text-muted hover:text-secondary transition-colors" to="/about">About Us</Link>
    </div>
  </footer>
);

const JobDiscoveryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [workModes, setWorkModes] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [salaryMin, setSalaryMin] = useState(4);
  const [experience, setExperience] = useState([]);
  const [aiSmartMatch, setAiSmartMatch] = useState(false);
  const [showApplied, setShowApplied] = useState(false);
  const [appsVersion, setAppsVersion] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = useMemo(() => {
    // load user applications from localStorage to hide applied jobs when needed
    const userApplications = JSON.parse(localStorage.getItem('visume_applications') || '[]');
    const appliedSet = new Set(userApplications.map(a => `${a.title}___${a.company}`));

    return initialJobs.filter(job => {
      const searchMatch = !searchQuery || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        
      if (!searchMatch) return false;
      if (workModes.length > 0 && !workModes.includes(job.workMode)) return false;
      if (jobTypes.length > 0 && !jobTypes.includes(job.type)) return false;
      if (experience.length > 0 && !experience.includes(job.experience)) return false;
      if (job.salary < salaryMin) return false;
      if (aiSmartMatch && job.match < 80) return false;

      // if user has applied and toggle is off, exclude this job
      const key = `${job.title}___${job.company}`;
      if (!showApplied && appliedSet.has(key)) return false;

      return true;
    });
  }, [searchQuery, workModes, jobTypes, salaryMin, experience, aiSmartMatch, showApplied, appsVersion]);

  const clearAll = () => {
     setSearchQuery("");
     setWorkModes([]);
     setJobTypes([]);
     setSalaryMin(4);
     setExperience([]);
     setAiSmartMatch(false);
  };

  return (
    <>
      <div className="flex gap-lg relative">
        <div className="hidden lg:block w-sidebar-width shrink-0">
          <FilterSidebar 
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            workModes={workModes} setWorkModes={setWorkModes}
            jobTypes={jobTypes} setJobTypes={setJobTypes}
            salaryMin={salaryMin} setSalaryMin={setSalaryMin}
            experience={experience} setExperience={setExperience}
            aiSmartMatch={aiSmartMatch} setAiSmartMatch={setAiSmartMatch}
          />
        </div>
        <div className="flex-grow space-y-8 min-w-0 pb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="font-display text-headline-lg font-bold">Discover Roles</h1>
              <p className="text-body-md text-text-muted">Showing {filteredJobs.length} jobs matching your profile and filters</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-body-sm text-text-muted">Sort by:</span>
              <button className="flex items-center gap-2 bg-surface-container border border-outline-variant px-4 py-2 rounded-lg text-body-sm font-medium">
                Best Match
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>
            </div>
          </div>

          {(workModes.length > 0 || jobTypes.length > 0 || salaryMin > 4 || experience.length > 0 || aiSmartMatch || searchQuery) && (
            <div className="flex flex-wrap gap-2">
              {workModes.map(mode => (
                <span key={mode} className="flex items-center gap-2 px-3 py-1 bg-surface-container border border-outline-variant rounded-full text-label-md text-on-surface-variant">
                  {mode}
                  <span onClick={() => setWorkModes(prev => prev.filter(m => m !== mode))} className="material-symbols-outlined text-[14px] cursor-pointer hover:text-danger">close</span>
                </span>
              ))}
              {salaryMin > 4 && (
                <span className="flex items-center gap-2 px-3 py-1 bg-surface-container border border-outline-variant rounded-full text-label-md text-on-surface-variant">
                  ₹{salaryMin}L+
                  <span onClick={() => setSalaryMin(4)} className="material-symbols-outlined text-[14px] cursor-pointer hover:text-danger">close</span>
                </span>
              )}
              {experience.map(exp => (
                <span key={exp} className="flex items-center gap-2 px-3 py-1 bg-surface-container border border-outline-variant rounded-full text-label-md text-on-surface-variant">
                  {exp} Level
                  <span onClick={() => setExperience(prev => prev.filter(e => e !== exp))} className="material-symbols-outlined text-[14px] cursor-pointer hover:text-danger">close</span>
                </span>
              ))}
              {jobTypes.map(type => (
                <span key={type} className="flex items-center gap-2 px-3 py-1 bg-surface-container border border-outline-variant rounded-full text-label-md text-on-surface-variant">
                  {type}
                  <span onClick={() => setJobTypes(prev => prev.filter(t => t !== type))} className="material-symbols-outlined text-[14px] cursor-pointer hover:text-danger">close</span>
                </span>
              ))}
              {aiSmartMatch && (
                <span className="flex items-center gap-2 px-3 py-1 bg-surface-container border border-outline-variant rounded-full text-label-md text-on-surface-variant">
                  AI Match &gt; 80%
                  <span onClick={() => setAiSmartMatch(false)} className="material-symbols-outlined text-[14px] cursor-pointer hover:text-danger">close</span>
                </span>
              )}
              
              <button onClick={clearAll} className="text-label-md text-primary-container font-bold hover:underline ml-2">Clear all</button>
              <button
                onClick={() => setShowApplied(prev => !prev)}
                className={`ml-2 px-3 py-1 rounded-full border text-[12px] font-medium transition-all ${showApplied ? 'bg-primary-container text-white border-primary-container' : 'border-outline text-text-muted'}`}
              >
                {showApplied ? 'Showing Applied' : 'Hide Applied'}
              </button>
            </div>
          )}

          <JobGrid jobs={filteredJobs} onApplied={() => setAppsVersion(v => v + 1)} selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
          <Footer />
        </div>
      </div>
      <MobileNav />
    </>
  );
};

export default JobDiscoveryPage;
