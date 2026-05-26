import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import { useUpload } from '../contexts/UploadContext';
import Toggle from '../components/Toggle';
import { auth, db, storage } from '../firebase';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

import CustomSelect from '../components/CustomSelect';

import CustomDatePicker from '../components/CustomDatePicker';

const SettingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { docUploadStatus, startDocumentUpload } = useUpload();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleDeactivateAccount = () => {
    if (window.confirm("Are you sure you want to deactivate your account? You can reactivate it by logging in again.")) {
      alert("Account deactivated.");
      handleLogout();
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you ABSOLUTELY sure you want to permanently delete your account? This action cannot be undone.")) {
      try {
        const user = auth.currentUser;
        if (user) {
          await deleteUser(user);
        }
        localStorage.removeItem('visume_profile_data');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('visume_role');
        alert("Account permanently deleted.");
        navigate('/register');
      } catch (error) {
        console.error("Error deleting account:", error);
        if (error.code === 'auth/requires-recent-login') {
          alert("For security reasons, please log out and log back in before deleting your account.");
        } else {
          alert("Error deleting account: " + error.message);
        }
      }
    }
  };
  
  // Set role from router state, local storage, or default to candidate
  const initialRole = location.state?.role || localStorage.getItem('visume_role') || 'candidate';
  const [role, setRole] = useState(initialRole);
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'profile');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state?.tab]);
  
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
  const [formData, setFormData] = useState(() => {
    const defaultData = {
      // Profile
      fullName: initialRole === 'recruiter' ? 'Sarah Jenkins' : 'Ashwin Kumar',
      profileImage: initialRole === 'recruiter' 
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
        : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80",
      email: initialRole === 'recruiter' ? 'sarah.jenkins@novastream.ai' : 'ashwin.kumar@gmail.com',
      headline: initialRole === 'recruiter' ? 'Talent Acquisition Director' : 'Senior React Developer & UI Specialist',
      location: initialRole === 'recruiter' ? 'Bengaluru, India' : 'Chennai, India',
      address: initialRole === 'recruiter' ? '' : '123 Tech Park, OMR, Chennai',
      previousExperience: initialRole === 'recruiter' ? '' : '3 years as Frontend Developer',
      education: initialRole === 'recruiter' ? '' : 'BFA in Interactive Design, Academy of Art University, SF (Class of 2018)',
      bio: initialRole === 'recruiter' ? 'Building the future of streaming technology at NovaStream AI.' : 'Passionate frontend engineer with 5+ years of experience building immersive and performant user experiences.',
      designation: initialRole === 'recruiter' ? 'Talent Acquisition Director' : '',
      department: initialRole === 'recruiter' ? 'Human Resources' : '',
      dob: initialRole === 'recruiter' ? '1988-03-12' : '1995-08-15',
      phone: '+91 9876543210',
      linkedin: 'linkedin.com/in/ashwinkumar',
      portfolio: 'ashwinkumar.dev',
      resumeName: '',
      documentResumes: [],
      
      // Video / AI
      webcam: 'webcam-0',
      microphone: 'mic-1',
      resolution: '1080p',
      promptTemplate: 'Hi, I\'m [Name], a [Title]. Today I wanted to share details about my recent project where we achieved a 40% speed up in page load times by leveraging dynamic import routines...',
      aiSmartMatch: true,

      // Company
      companyName: 'NovaStream AI',
      companyLogo: 'https://logo.clearbit.com/stripe.com',
      cin: 'U72900KA2021PTC123456',
      registeredAddress: '123 Tech Park, Outer Ring Road, Bengaluru',
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
    };

    const savedData = localStorage.getItem('visume_profile_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Ensure missing fields are populated with defaults, and empty string overrides don't break uncontrolled inputs completely.
        return { ...defaultData, ...parsed };
      } catch (e) {
        console.error("Failed to parse saved profile data", e);
      }
    }
    return defaultData;
  });

  useEffect(() => {
    // Keep local storage synchronized
    localStorage.setItem('visume_role', role);
  }, [role]);

  // Handle inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file' && name !== 'resumeName') {
      setFormData(prev => ({ ...prev, [name]: files[0]?.name || '' }));
      return;
    }
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
      profileImage: newRole === 'recruiter' 
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
        : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80",
      email: newRole === 'recruiter' ? 'sarah.jenkins@novastream.ai' : 'ashwin.kumar@gmail.com',
      headline: newRole === 'recruiter' ? 'Talent Acquisition Director' : 'Senior React Developer & UI Specialist',
      location: newRole === 'recruiter' ? 'Bengaluru, India' : 'Chennai, India',
    }));
  };

  const handleUploadResume = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    startDocumentUpload(file, role);
    e.target.value = null;
  };

  const confirmDeleteResume = async (resumeIdToDelete) => {
    const resumeToDelete = formData.documentResumes?.find(r => r.id === resumeIdToDelete);
    if (!resumeToDelete && resumeIdToDelete !== 'legacy') {
        setShowDeleteConfirm(false);
        return;
    }

    setShowDeleteConfirm(false);
    
    try {
      // 1. Delete Local File
      const localUrl = resumeToDelete ? resumeToDelete.localUrl : formData.localResumeUrl;
      if (localUrl) {
        try {
          await fetch('http://localhost:5000/api/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileUrl: localUrl })
          });
        } catch (e) {
          console.warn("Failed to delete local resume file", e);
        }
      }

      // 2. Delete Global File (Firebase Storage)
      const globalUrl = resumeToDelete ? resumeToDelete.url : formData.resumeUrl;
      if (globalUrl && globalUrl !== 'mock_url') {
        try {
          const fileRef = ref(storage, globalUrl);
          await deleteObject(fileRef);
        } catch (e) {
          console.warn("Failed to delete global resume file", e);
        }
      }

      setFormData(prev => {
        const newData = { ...prev };
        if (resumeToDelete) {
           newData.documentResumes = prev.documentResumes.filter(r => r.id !== resumeIdToDelete);
        } else {
           delete newData.resumeName;
           delete newData.resumeUrl;
           delete newData.localResumeUrl;
        }
        
        localStorage.setItem('visume_profile_data', JSON.stringify(newData));
        if (auth.currentUser) {
          const collectionName = role === 'recruiter' ? 'recruiters' : 'candidates';
          if (resumeToDelete) {
              setDoc(doc(db, collectionName, auth.currentUser.uid), {
                 documentResumes: newData.documentResumes
              }, { merge: true }).catch(console.error);
          } else {
              setDoc(doc(db, collectionName, auth.currentUser.uid), {
                 resumeName: null,
                 resumeUrl: null,
                 localResumeUrl: null
              }, { merge: true }).catch(console.error);
          }
        }
        return newData;
      });
      
      alert("Resume deleted completely!");

    } catch (err) {
      console.error("Error deleting resume:", err);
      alert("Failed to delete resume completely.");
    }
  };

  // Form submission and Firebase sync
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    // If the user wants to update their password
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        alert("New passwords do not match!");
        setSaving(false);
        return;
      }
      if (!formData.currentPassword) {
        alert("Please enter your current password to verify it's you.");
        setSaving(false);
        return;
      }
      
      try {
        const user = auth.currentUser;
        if (user && user.email) {
          // Re-authenticate first to ensure security
          const credential = EmailAuthProvider.credential(user.email, formData.currentPassword);
          await reauthenticateWithCredential(user, credential);
          
          // Then update the password in Firebase
          await updatePassword(user, formData.newPassword);
          
          // Clear the password fields so they don't persist in local storage unnecessarily
          setFormData(prev => ({
            ...prev,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          }));
        } else {
          alert("You are not fully authenticated. Please log out and log back in.");
          setSaving(false);
          return;
        }
      } catch (error) {
        console.error("Error updating password:", error);
        alert("Failed to update password: " + error.message);
        setSaving(false);
        return;
      }
    }

    // Save all other profile data to local storage
    localStorage.setItem('visume_profile_data', JSON.stringify(formData));
    
    try {
      if (auth.currentUser) {
        const collectionName = role === 'recruiter' ? 'recruiters' : 'candidates';
        await setDoc(doc(db, collectionName, auth.currentUser.uid), formData, { merge: true });
      }
    } catch (err) {
      console.error("Error updating Firestore data", err);
    }

    setSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-144px)] overflow-hidden">


      {/* Content Container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-lg min-h-0 overflow-hidden">
        {/* Sub Navigation Tabs */}
        <div className="lg:col-span-1 flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2 pb-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label-md font-bold text-left transition-all ${activeTab === 'profile' ? 'bg-primary-container/10 border border-primary-container text-primary-container' : 'border border-transparent text-text-muted hover:bg-surface-container hover:text-text-primary'}`}
          >
            <span className="material-symbols-outlined">person</span>
            My Profile
          </button>
          {role === 'candidate' && (
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label-md font-bold text-left transition-all ${activeTab === 'video' ? 'bg-primary-container/10 border border-primary-container text-primary-container' : 'border border-transparent text-text-muted hover:bg-surface-container hover:text-text-primary'}`}
            >
              <span className="material-symbols-outlined">videocam</span>
              Configure Visume
            </button>
          )}
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
            Security and Accessibility
          </button>
          
          <div className="h-px bg-outline-variant my-2"></div>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-label-md font-bold text-left text-danger hover:bg-danger/10 border border-transparent transition-all"
          >
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>

        {/* Form Settings Panels */}
        <div className="lg:col-span-3 overflow-y-auto custom-scrollbar pr-2 pb-10">
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
                        src={formData.profileImage}
                        referrerPolicy="no-referrer"
                      />
                      <div 
                        onClick={() => {
                          const newUrl = window.prompt("Enter new Profile Image URL (Leave blank to cancel):", formData.profileImage);
                          if (newUrl) setFormData(prev => ({ ...prev, profileImage: newUrl }));
                        }}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-white text-sm">photo_camera</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <p className="font-headline-sm text-text-primary font-bold">{formData.fullName}</p>
                    <p className="font-body-sm text-text-muted">{role === 'recruiter' ? 'Verified Corporate Recruiter' : 'KYC Status: Verified'}</p>
                    <button 
                      type="button" 
                      onClick={() => {
                        const newUrl = window.prompt("Enter new Profile Image URL (Leave blank to cancel):", formData.profileImage);
                        if (newUrl) setFormData(prev => ({ ...prev, profileImage: newUrl }));
                      }}
                      className="border border-outline-variant hover:border-primary px-4 py-1.5 rounded-lg text-label-md font-bold transition-all text-text-primary bg-surface-container-low hover:bg-surface-container-high"
                    >
                      Update Profile Picture
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
                    <label className="text-label-md text-text-primary font-bold">Location / City</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                    />
                  </div>
                  
                  {role === 'candidate' && (
                    <>
                      <div className="flex flex-col gap-2">
                        <label className="text-label-md text-text-primary font-bold">Full Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-label-md text-text-primary font-bold">Previous Experience (Summary)</label>
                        <input
                          type="text"
                          name="previousExperience"
                          value={formData.previousExperience}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-label-md text-text-primary font-bold">Education Details</label>
                        <textarea
                          name="education"
                          value={formData.education}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all min-h-[100px] resize-y"
                          placeholder="Degree, University, Graduation Year"
                        />
                      </div>
                    </>
                  )}
                  
                  {role === 'recruiter' && (
                    <>
                      <div className="flex flex-col gap-2">
                        <label className="text-label-md text-text-primary font-bold">Designation</label>
                        <input
                          type="text"
                          name="designation"
                          value={formData.designation}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-label-md text-text-primary font-bold">Department</label>
                        <input
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                        />
                      </div>
                    </>
                  )}

                  {role === 'candidate' && (
                    <>
                      <div className="flex flex-col gap-2">
                        <label className="text-label-md text-text-primary font-bold">Date of Birth</label>
                    <CustomDatePicker
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-label-md text-text-primary font-bold">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-label-md text-text-primary font-bold">LinkedIn URL</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-label-md text-text-primary font-bold">Portfolio URL</label>
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                    />
                  </div>
                    </>
                  )}
                </div>

                {role === 'candidate' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md items-start">
                  <div className="flex flex-col gap-2">
                    <label className="text-label-md text-text-primary font-bold">Short Bio</label>
                    <textarea
                      rows="6"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all custom-scrollbar"
                    />
                  </div>

                  <div className="flex flex-col gap-2 h-full">
                    <label className="text-label-md text-text-primary font-bold">Resume</label>
                    <div className="relative flex flex-col justify-center w-full min-h-[9.5rem] mb-2">
                      <label htmlFor="resume-upload" className={`flex flex-col items-center justify-center w-full h-full border-2 border-border-input border-dashed rounded-lg bg-surface-container transition-all ${docUploadStatus === 'uploading' ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:bg-surface-bright/5 hover:border-primary'}`}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {docUploadStatus === 'uploading' ? (
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                          ) : (
                            <span className="material-symbols-outlined text-text-muted mb-2 text-3xl">upload_file</span>
                          )}
                          <p className="mb-1 text-label-md text-text-muted">
                            <span className="font-bold text-text-primary">{docUploadStatus === 'uploading' ? 'Uploading...' : 'Click to upload'}</span> {docUploadStatus === 'uploading' ? '' : 'or drag and drop'}
                          </p>
                          <p className="text-[11px] text-text-muted uppercase tracking-wider">PDF files only (Max 5MB)</p>
                        </div>
                        <input id="resume-upload" name="resumeName" type="file" accept=".pdf" className="hidden" onChange={handleUploadResume} disabled={docUploadStatus === 'uploading'} />
                      </label>
                    </div>
                    <div className="flex flex-col gap-2 max-h-[150px] overflow-y-auto custom-scrollbar pr-2">
                      {formData.documentResumes && formData.documentResumes.length > 0 ? (
                        formData.documentResumes.map(resume => (
                          <div key={resume.id} className="flex items-center gap-2 px-4 py-3 bg-surface-container border border-border-input rounded-lg text-body-sm text-text-primary">
                            <span className="material-symbols-outlined text-primary">picture_as_pdf</span>
                            <span className="flex-1 font-bold truncate" title={resume.name}>{resume.name}</span>
                            <button type="button" onClick={() => {
                               if (window.confirm('Delete this resume?')) {
                                   confirmDeleteResume(resume.id);
                               }
                            }} className="text-text-muted hover:text-danger flex items-center justify-center">
                              <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                          </div>
                        ))
                      ) : formData.resumeName ? (
                        <div className="flex items-center gap-2 px-4 py-3 bg-surface-container border border-border-input rounded-lg text-body-sm text-text-primary">
                          <span className="material-symbols-outlined text-primary">picture_as_pdf</span>
                          <span className="flex-1 font-bold truncate" title={formData.resumeName}>{formData.resumeName}</span>
                          <button type="button" onClick={() => {
                             if (window.confirm('Delete this legacy resume?')) {
                                 confirmDeleteResume('legacy');
                             }
                          }} className="text-text-muted hover:text-danger flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                )}
              </div>
            )}

            {/* Video & AI Configuration Tab */}
            {activeTab === 'video' && role === 'candidate' && (
              <div className="flex flex-col gap-md animate-in fade-in duration-300">
                <h2 className="font-display text-headline-sm text-text-primary flex items-center gap-2 border-b border-border-input pb-2">
                  <span className="material-symbols-outlined text-primary">videocam</span>
                  Configure Visume
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div className="flex flex-col gap-2">
                    <label className="text-label-md text-text-primary font-bold">Default Webcam Source</label>
                    <CustomSelect
                      name="webcam"
                      value={formData.webcam}
                      onChange={handleInputChange}
                      options={[
                        { value: 'webcam-0', label: 'Integrated HD Webcam (1280x720)' },
                        { value: 'webcam-1', label: 'External USB Camera (1920x1080)' },
                        { value: 'webcam-2', label: 'Virtual OBS Cam Plugin' }
                      ]}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-label-md text-text-primary font-bold">Default Audio Source</label>
                    <CustomSelect
                      name="microphone"
                      value={formData.microphone}
                      onChange={handleInputChange}
                      options={[
                        { value: 'mic-0', label: 'Default Internal Audio Input' },
                        { value: 'mic-1', label: 'External USB Podcasting Microphone' },
                        { value: 'mic-2', label: 'Bluetooth Wireless Earbuds Mic' }
                      ]}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-label-md text-text-primary font-bold">Recording Quality Mode</label>
                    <CustomSelect
                      name="resolution"
                      value={formData.resolution}
                      onChange={handleInputChange}
                      options={[
                        { value: '720p', label: '720p HD (Balanced Performance)' },
                        { value: '1080p', label: '1080p Full HD (Recommended)' },
                        { value: '4k', label: '4K Ultra HD (High Bandwidth)' }
                      ]}
                    />
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
                      <Toggle
                        name="aiSmartMatch"
                        checked={formData.aiSmartMatch}
                        onChange={handleInputChange}
                      />
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

                <div className="flex flex-col md:flex-row gap-md items-center mb-sm">
                  <div className="relative group shrink-0">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-outline-variant relative bg-surface-bright flex items-center justify-center p-2">
                      <img
                        alt="Company Logo"
                        className="max-w-full max-h-full object-contain"
                        src={formData.companyLogo || "https://logo.clearbit.com/stripe.com"}
                        referrerPolicy="no-referrer"
                      />
                      <div 
                        onClick={() => {
                          const newUrl = window.prompt("Enter new Company Logo URL (Leave blank to cancel):", formData.companyLogo);
                          if (newUrl) setFormData(prev => ({ ...prev, companyLogo: newUrl }));
                        }}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl"
                      >
                        <span className="material-symbols-outlined text-white text-sm">photo_camera</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <p className="font-headline-sm text-text-primary font-bold">{formData.companyName}</p>
                    <p className="font-body-sm text-text-muted">Enterprise Plan</p>
                    <button 
                      type="button" 
                      onClick={() => {
                        const newUrl = window.prompt("Enter new Company Logo URL (Leave blank to cancel):", formData.companyLogo);
                        if (newUrl) setFormData(prev => ({ ...prev, companyLogo: newUrl }));
                      }}
                      className="border border-outline-variant hover:border-primary px-4 py-1.5 rounded-lg text-label-md font-bold transition-all text-text-primary bg-surface-container-low hover:bg-surface-container-high"
                    >
                      Update Company Logo
                    </button>
                  </div>
                </div>

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
                    <label className="text-label-md text-text-primary font-bold">Company Registration Number (CIN)</label>
                    <input
                      type="text"
                      name="cin"
                      value={formData.cin}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-label-md text-text-primary font-bold">Registered Company Address</label>
                    <input
                      type="text"
                      name="registeredAddress"
                      value={formData.registeredAddress}
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
                    <CustomSelect
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      options={[
                        { value: '1-10', label: '1–10 employees' },
                        { value: '11-50', label: '11–50 employees' },
                        { value: '50-200', label: '50–200 employees' },
                        { value: '200-1000', label: '200–1000 employees' },
                        { value: '1000+', label: '1000+ employees' }
                      ]}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <label className="text-label-md text-text-primary font-bold">Default AI Screening Questions</label>
                  <div className="flex flex-col gap-3">
                    {formData.defaultQuestions?.map((q, idx) => (
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
                  Security and Accessibility
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
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-label-md text-text-muted">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Re-enter password"
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
                      <Toggle
                        name="twoFactor"
                        checked={formData.twoFactor}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex items-center justify-between bg-surface-container border border-border-input p-3 rounded-xl">
                      <div>
                        <p className="text-label-md font-bold text-text-primary">Email Notifications</p>
                        <p className="text-[11px] text-text-muted mt-0.5 leading-snug">Receive daily match notifications.</p>
                      </div>
                      <Toggle
                        name="emailNotifications"
                        checked={formData.emailNotifications}
                        onChange={handleInputChange}
                      />
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

                <div className="border-t border-border-input/50 pt-md mt-sm flex flex-col gap-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-danger/5 border border-danger/20 p-4 rounded-xl gap-md">
                    <div>
                      <p className="text-body-sm font-bold text-text-primary">Deactivate Account</p>
                      <p className="text-[11px] text-text-muted mt-0.5">Temporarily hide your profile and job history. You can reactivate anytime.</p>
                    </div>
                    <button type="button" onClick={handleDeactivateAccount} className="bg-danger/20 text-danger border border-danger hover:bg-danger hover:text-white px-5 py-2 rounded-lg font-label-md text-label-md font-bold transition-all shrink-0">
                      Deactivate Account
                    </button>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-danger/5 border border-danger/20 p-4 rounded-xl gap-md">
                    <div>
                      <p className="text-body-sm font-bold text-text-primary">Delete Account & Metadata</p>
                      <p className="text-[11px] text-text-muted mt-0.5">Permanently remove profile records, videos, transcript data, and job history.</p>
                    </div>
                    <button type="button" onClick={handleDeleteAccount} className="bg-danger/20 text-danger border border-danger hover:bg-danger hover:text-white px-5 py-2 rounded-lg font-label-md text-label-md font-bold transition-all shrink-0">
                      Delete Account
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div 
            className="bg-surface-container border border-outline-variant rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center text-danger">
                  <span className="material-symbols-outlined">warning</span>
                </div>
                <h3 className="text-headline-md font-display text-text-primary">Confirm Deletion</h3>
              </div>
              <button onClick={() => setShowDeleteConfirm(false)} className="text-text-muted hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-body-md text-text-muted mb-6">
              Are you sure you want to completely delete <strong>{formData.resumeName}</strong>? This action cannot be undone and will remove the file from all systems.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="px-6 py-2.5 rounded-lg border border-outline-variant text-text-primary hover:bg-surface-container-highest transition-colors font-bold"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDeleteResume}
                className="px-6 py-2.5 rounded-lg bg-danger text-white hover:bg-danger/90 transition-colors font-bold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div 
            className="bg-surface-container border border-outline-variant rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                  <span className="material-symbols-outlined">logout</span>
                </div>
                <h3 className="text-headline-md font-display text-text-primary">Confirm Logout</h3>
              </div>
              <button onClick={() => setShowLogoutConfirm(false)} className="text-text-muted hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-body-md text-text-muted mb-6">
              Are you sure you want to log out of your account? You will need to sign in again to access your dashboard.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="px-6 py-2.5 rounded-lg border border-outline-variant text-text-primary hover:bg-surface-container-highest transition-colors font-bold"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className="px-6 py-2.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-bold"
              >
                Yes, Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
