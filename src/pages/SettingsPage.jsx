import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';


const SettingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };
  
  // Set role from router state, local storage, or default to candidate
  const initialRole = location.state?.role || localStorage.getItem('visume_role') || 'candidate';
  const [role, setRole] = useState(initialRole);
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('visume_theme') !== 'light';
  });

  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    localStorage.setItem('visume_theme', nextMode ? 'dark' : 'light');
    if (nextMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };


  // Form states
  const [formData, setFormData] = useState({
    // Profile
    fullName: initialRole === 'recruiter' ? 'Sarah Jenkins' : 'Ashwin Kumar',
    email: initialRole === 'recruiter' ? 'sarah.jenkins@novastream.ai' : 'ashwin.kumar@gmail.com',
    headline: initialRole === 'recruiter' ? 'Talent Acquisition Director' : 'Senior React Developer & UI Specialist',
    location: initialRole === 'recruiter' ? 'Bengaluru, India' : 'Chennai, India',
    bio: initialRole === 'recruiter' ? 'Building the future of streaming technology at NovaStream AI.' : 'Passionate frontend engineer with 5+ years of experience building immersive and performant user experiences.',
    
    // Video / AI
    webcam: 'webcam-0',
    microphone: 'mic-1',
    resolution: '1080p',
    promptTemplate: 'Hi, I\'m [Name], a [Title]. Today I wanted to share details about my recent project where we achieved a 40% speed up in page load times by leveraging dynamic import routines...',
    aiSmartMatch: true,

    // Company
    companyName: 'NovaStream AI',
    companySize: '50-200',
    website: 'https://novastream.ai',
    defaultQuestions: [
      'Tell us about a time you solved a complex scalability bug.',
      'Why are you excited to join NovaStream AI?',
      'Walk us through your design system process.'
    ],

    // Security & notifications
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: false,
    emailNotifications: true,
    interviewReminders: true
  });

  useEffect(() => {
    // Keep local storage synchronized
    localStorage.setItem('visume_role', role);
  }, [role]);

  // Handle inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRoleToggle = (newRole) => {
    setRole(newRole);
    // Adjust profile name based on role for prototype demo consistency
    setFormData(prev => ({
      ...prev,
      fullName: newRole === 'recruiter' ? 'Sarah Jenkins' : 'Ashwin Kumar',
      email: newRole === 'recruiter' ? 'sarah.jenkins@novastream.ai' : 'ashwin.kumar@gmail.com',
      headline: newRole === 'recruiter' ? 'Talent Acquisition Director' : 'Senior React Developer & UI Specialist',
      location: newRole === 'recruiter' ? 'Bengaluru, India' : 'Chennai, India',
    }));
  };

  // Mock saving process
  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background text-text-primary font-body-md selection:bg-primary/30 selection:text-primary antialiased">
      <Sidebar role={role} activePage="settings" />
      <div className="flex-grow flex flex-col h-screen overflow-hidden relative">
        <DashboardNavbar role={role} />
        <main className="flex-grow overflow-y-auto custom-scrollbar p-lg pt-[104px]">
        {/* Top Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-lg border-b border-outline-variant pb-md">
          <div className="space-y-1">
            <h1 className="font-display text-headline-lg text-text-primary">System Settings</h1>
            <p className="font-body-md text-text-muted">Configure and customize your Visume account preferences.</p>
          </div>

        </header>

        {/* Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-lg">
          {/* Sub Navigation Tabs */}
          <div className="lg:col-span-1 flex flex-col gap-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label-md font-bold text-left transition-all ${activeTab === 'profile' ? 'bg-primary-container/10 border border-primary-container text-primary-container' : 'border border-transparent text-text-muted hover:bg-surface-container hover:text-text-primary'}`}
            >
              <span className="material-symbols-outlined">person</span>
              My Profile
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label-md font-bold text-left transition-all ${activeTab === 'video' ? 'bg-primary-container/10 border border-primary-container text-primary-container' : 'border border-transparent text-text-muted hover:bg-surface-container hover:text-text-primary'}`}
            >
              <span className="material-symbols-outlined">videocam</span>
              Video & AI Config
            </button>
            {role === 'recruiter' && (
              <button
                onClick={() => setActiveTab('company')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label-md font-bold text-left transition-all ${activeTab === 'company' ? 'bg-primary-container/10 border border-primary-container text-primary-container' : 'border border-transparent text-text-muted hover:bg-surface-container hover:text-text-primary'}`}
              >
                <span className="material-symbols-outlined">domain</span>
                Company Profile
              </button>
            )}
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label-md font-bold text-left transition-all ${activeTab === 'security' ? 'bg-primary-container/10 border border-primary-container text-primary-container' : 'border border-transparent text-text-muted hover:bg-surface-container hover:text-text-primary'}`}
            >
              <span className="material-symbols-outlined">shield</span>
              Security & Accs
            </button>
            
            <div className="h-px bg-outline-variant my-2"></div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-label-md font-bold text-left text-danger hover:bg-danger/10 border border-transparent transition-all"
            >
              <span className="material-symbols-outlined">logout</span>
              Logout
            </button>
          </div>

          {/* Form Settings Panels */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-card-bg border border-border-input rounded-xl p-md md:p-lg flex flex-col gap-lg shadow-2xl relative">
              {/* Profile Settings Tab */}
              {activeTab === 'profile' && (
                <div className="flex flex-col gap-md animate-in fade-in duration-300">
                  <h2 className="font-display text-headline-sm text-text-primary flex items-center gap-2 border-b border-border-input pb-2">
                    <span className="material-symbols-outlined text-primary">person</span>
                    Profile Settings
                  </h2>

                  <div className="flex flex-col md:flex-row gap-md items-center mb-sm">
                    <div className="relative group shrink-0">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-outline-variant relative">
                        <img
                          alt="Avatar"
                          className="w-full h-full object-cover"
                          src={role === 'recruiter' 
                            ? "https://lh3.googleusercontent.com/aida-public/AB6AXuDNf2pjUzrkRvM99OTMYedpfBrRYOSG-5UPAj6qQ6cIPo2L33Fm5Jq39erhvobw6e_WZT_lykFSQ_AZVn20xTjCiJOUgUz5-eDAXvMTz9-xcbod8siIyiAm_AtZiBlg25B43ctasBZcoGJsUozrMmZutznU9iMgqWR9jw8NMW1uWfJyO6rM5zdMwtLU0a8eOnB7LpjjN1BL5ywIOivbPgQwBZux3jlfQz65oNm6diIcOqCCJUIRPp7UnvVAU87HkNnfUmd3jnK9NB0"
                            : "https://lh3.googleusercontent.com/aida-public/AB6AXuCif7mMcFeEQhrivL3z3iYapnS9er2kQ7XYLd4MuR0k9XdNq69mXT5OGqxxd69TMzoGOukTENlAj2Sv83x4bkp_Sv3X7SsVVYxKY7DqVn0lMSDDdn5UtHszx8X9yons-XE3U_VNoMV1yN3AoBQnPxsK20QsLD5z0mjpDq2EzinhRsjgwIgYS8hd_RebazNQGulE_Vbs5L86pkRVPmk1pUNont5dxsmD-5DVsS4EK_WczWR-gcIEqbw6IQdA7DRj3RSgR-GlT_7d1-Q"
                          }
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                          <span className="material-symbols-outlined text-white text-sm">photo_camera</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2 text-center md:text-left">
                      <p className="font-headline-sm text-text-primary font-bold">{formData.fullName}</p>
                      <p className="font-body-sm text-text-muted">{role === 'recruiter' ? 'Verified Corporate Recruiter' : 'KYC Status: Verified'}</p>
                      <button type="button" className="border border-outline-variant hover:border-primary px-4 py-1.5 rounded-lg text-label-md font-bold transition-all text-text-primary bg-surface-container-low hover:bg-surface-container-high">
                        Upload New Avatar
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <div className="flex flex-col gap-2">
                      <label className="text-label-md text-text-primary font-bold">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-label-md text-text-primary font-bold">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-label-md text-text-primary font-bold">Professional Headline</label>
                      <input
                        type="text"
                        name="headline"
                        value={formData.headline}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-label-md text-text-primary font-bold">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-label-md text-text-primary font-bold">Short Bio</label>
                    <textarea
                      rows="4"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all custom-scrollbar"
                    />
                  </div>
                </div>
              )}

              {/* Video & AI Configuration Tab */}
              {activeTab === 'video' && (
                <div className="flex flex-col gap-md animate-in fade-in duration-300">
                  <h2 className="font-display text-headline-sm text-text-primary flex items-center gap-2 border-b border-border-input pb-2">
                    <span className="material-symbols-outlined text-primary">videocam</span>
                    Video & AI Config
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <div className="flex flex-col gap-2">
                      <label className="text-label-md text-text-primary font-bold">Default Webcam Source</label>
                      <select
                        name="webcam"
                        value={formData.webcam}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all appearance-none"
                      >
                        <option value="webcam-0">Integrated HD Webcam (1280x720)</option>
                        <option value="webcam-1">External USB Camera (1920x1080)</option>
                        <option value="webcam-2">Virtual OBS Cam Plugin</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-label-md text-text-primary font-bold">Default Audio Source</label>
                      <select
                        name="microphone"
                        value={formData.microphone}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all appearance-none"
                      >
                        <option value="mic-0">Default Internal Audio Input</option>
                        <option value="mic-1">External USB Podcasting Microphone</option>
                        <option value="mic-2">Bluetooth Wireless Earbuds Mic</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-label-md text-text-primary font-bold">Recording Quality Mode</label>
                      <select
                        name="resolution"
                        value={formData.resolution}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all appearance-none"
                      >
                        <option value="720p">720p HD (Balanced Performance)</option>
                        <option value="1080p">1080p Full HD (Recommended)</option>
                        <option value="4k">4K Ultra HD (High Bandwidth)</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2 justify-center pt-2">
                      <div className="flex items-center justify-between bg-surface-container border border-border-input p-3 rounded-xl">
                        <div>
                          <p className="text-label-md font-bold text-text-primary flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-secondary text-sm">auto_awesome</span>
                            AI Smart Match Filter
                          </p>
                          <p className="text-[11px] text-text-muted mt-0.5 leading-snug">Limit job listings to 80%+ fit.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="aiSmartMatch"
                            checked={formData.aiSmartMatch}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <label className="text-label-md text-text-primary font-bold">Teleprompter Default Script</label>
                    <textarea
                      rows="4"
                      name="promptTemplate"
                      value={formData.promptTemplate}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all custom-scrollbar"
                    />
                    <p className="text-[11px] text-text-muted mt-0.5 leading-snug">This text overlay will scroll on the video recorder screen to help you review script prompts while keeping eye-contact.</p>
                  </div>
                </div>
              )}

              {/* Company Profile Settings Tab (Recruiter Only) */}
              {activeTab === 'company' && role === 'recruiter' && (
                <div className="flex flex-col gap-md animate-in fade-in duration-300">
                  <h2 className="font-display text-headline-sm text-text-primary flex items-center gap-2 border-b border-border-input pb-2">
                    <span className="material-symbols-outlined text-primary">domain</span>
                    Company Profile
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <div className="flex flex-col gap-2">
                      <label className="text-label-md text-text-primary font-bold">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-label-md text-text-primary font-bold">Website URL</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-label-md text-text-primary font-bold">Company Size</label>
                      <select
                        name="companySize"
                        value={formData.companySize}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all appearance-none"
                      >
                        <option value="1-10">1–10 employees</option>
                        <option value="11-50">11–50 employees</option>
                        <option value="50-200">50–200 employees</option>
                        <option value="200-1000">200–1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <label className="text-label-md text-text-primary font-bold">Default AI Screening Questions</label>
                    <div className="flex flex-col gap-3">
                      {formData.defaultQuestions.map((q, idx) => (
                        <div key={idx} className="flex gap-2 items-center bg-surface-container border border-border-input px-4 py-3 rounded-lg text-text-primary">
                          <span className="w-5 h-5 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs shrink-0">{idx + 1}</span>
                          <span className="text-body-sm flex-1">{q}</span>
                          <span className="material-symbols-outlined text-text-muted hover:text-danger cursor-pointer text-sm">delete</span>
                        </div>
                      ))}
                    </div>
                    <button type="button" className="border border-dashed border-outline-variant hover:border-primary px-4 py-3 rounded-lg text-label-md font-bold transition-all text-text-muted hover:text-text-primary mt-2 flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-sm">add</span> Add Custom Screening Question
                    </button>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="flex flex-col gap-md animate-in fade-in duration-300">
                  <h2 className="font-display text-headline-sm text-text-primary flex items-center gap-2 border-b border-border-input pb-2">
                    <span className="material-symbols-outlined text-primary">shield</span>
                    Security & System Preferences
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <div className="flex flex-col gap-md">
                      <h3 className="font-label-md text-label-md text-text-muted uppercase tracking-wider">Change Password</h3>
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-label-md text-text-muted">Current Password</label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-container transition-all"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-label-md text-text-muted">New Password</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          placeholder="Min 8 characters"
                          className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-primary-container transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-md border-l border-border-input/50 pl-0 md:pl-md">
                      <h3 className="font-label-md text-label-md text-text-muted uppercase tracking-wider">System Settings</h3>
                      
                      <div className="flex items-center justify-between bg-surface-container border border-border-input p-3 rounded-xl">
                        <div>
                          <p className="text-label-md font-bold text-text-primary">Two-Factor Authentication</p>
                          <p className="text-[11px] text-text-muted mt-0.5 leading-snug">Secure account login.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="twoFactor"
                            checked={formData.twoFactor}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between bg-surface-container border border-border-input p-3 rounded-xl">
                        <div>
                          <p className="text-label-md font-bold text-text-primary">Email Notifications</p>
                          <p className="text-[11px] text-text-muted mt-0.5 leading-snug">Receive daily match notifications.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="emailNotifications"
                            checked={formData.emailNotifications}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between bg-surface-container border border-border-input p-3 rounded-xl">
                        <div>
                          <p className="text-label-md font-bold text-text-primary">Theme Appearance</p>
                          <p className="text-[11px] text-text-muted mt-0.5 leading-snug">Switch between dark and light themes.</p>
                        </div>
                        <button
                          type="button"
                          onClick={toggleTheme}
                          className="bg-surface-container-highest border border-border-input hover:border-primary-container px-3.5 py-1.5 rounded-lg font-label-md text-label-md font-bold transition-all text-text-primary flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {isDarkMode ? 'dark_mode' : 'light_mode'}
                          </span>
                          {isDarkMode ? 'Dark' : 'Light'}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border-input/50 pt-md mt-sm flex flex-col gap-2">
                    <h3 className="font-label-md text-label-md text-danger uppercase tracking-wider">Danger Zone</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-danger/5 border border-danger/20 p-4 rounded-xl gap-md">
                      <div>
                        <p className="text-body-sm font-bold text-text-primary">Delete Account & Metadata</p>
                        <p className="text-[11px] text-text-muted mt-0.5">Permanently remove profile records, videos, transcript data, and job history.</p>
                      </div>
                      <button type="button" className="bg-danger/20 text-danger border border-danger hover:bg-danger hover:text-white px-5 py-2 rounded-lg font-label-md text-label-md font-bold transition-all shrink-0">
                        Deactivate Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Action Controls */}
              <div className="border-t border-border-input pt-md flex items-center justify-between mt-sm">
                <div>
                  {saveSuccess && (
                    <span className="text-secondary font-bold font-label-md flex items-center gap-1.5 animate-bounce">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      Settings updated successfully!
                    </span>
                  )}
                </div>
                <div className="flex gap-sm">
                  <button type="button" className="px-6 py-2.5 rounded-lg border border-border-input text-text-muted hover:bg-surface-container hover:text-text-primary transition-all font-bold">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 bg-primary-container text-white px-6 py-2.5 rounded-lg font-bold hover:shadow-[0_0_15px_rgba(108,92,231,0.4)] hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all min-w-[140px] justify-center"
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px]">save</span>
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};

export default SettingsPage;
