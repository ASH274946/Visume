import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup, db } from '../firebase';
import { getAdditionalUserInfo, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import CustomSelect from '../components/CustomSelect';

const countryCodes = [
  {"name":"Afghanistan","code":"+93"},{"name":"Albania","code":"+355"},{"name":"Algeria","code":"+213"},{"name":"Andorra","code":"+376"},{"name":"Angola","code":"+244"},{"name":"Argentina","code":"+54"},{"name":"Armenia","code":"+374"},{"name":"Australia","code":"+61"},{"name":"Austria","code":"+43"},{"name":"Azerbaijan","code":"+994"},{"name":"Bahrain","code":"+973"},{"name":"Bangladesh","code":"+880"},{"name":"Belarus","code":"+375"},{"name":"Belgium","code":"+32"},{"name":"Belize","code":"+501"},{"name":"Benin","code":"+229"},{"name":"Bhutan","code":"+975"},{"name":"Bolivia","code":"+591"},{"name":"Bosnia and Herzegovina","code":"+387"},{"name":"Botswana","code":"+267"},{"name":"Brazil","code":"+55"},{"name":"Brunei","code":"+673"},{"name":"Bulgaria","code":"+359"},{"name":"Burkina Faso","code":"+226"},{"name":"Burundi","code":"+257"},{"name":"Cambodia","code":"+855"},{"name":"Cameroon","code":"+237"},{"name":"Canada","code":"+1"},{"name":"Cape Verde","code":"+238"},{"name":"Central African Republic","code":"+236"},{"name":"Chad","code":"+235"},{"name":"Chile","code":"+56"},{"name":"China","code":"+86"},{"name":"Colombia","code":"+57"},{"name":"Comoros","code":"+269"},{"name":"Congo","code":"+242"},{"name":"Costa Rica","code":"+506"},{"name":"Croatia","code":"+385"},{"name":"Cuba","code":"+53"},{"name":"Cyprus","code":"+357"},{"name":"Czech Republic","code":"+420"},{"name":"Denmark","code":"+45"},{"name":"Djibouti","code":"+253"},{"name":"Dominican Republic","code":"+1"},{"name":"Ecuador","code":"+593"},{"name":"Egypt","code":"+20"},{"name":"El Salvador","code":"+503"},{"name":"Equatorial Guinea","code":"+240"},{"name":"Eritrea","code":"+291"},{"name":"Estonia","code":"+372"},{"name":"Ethiopia","code":"+251"},{"name":"Fiji","code":"+679"},{"name":"Finland","code":"+358"},{"name":"France","code":"+33"},{"name":"Gabon","code":"+241"},{"name":"Gambia","code":"+220"},{"name":"Georgia","code":"+995"},{"name":"Germany","code":"+49"},{"name":"Ghana","code":"+233"},{"name":"Greece","code":"+30"},{"name":"Guatemala","code":"+502"},{"name":"Guinea","code":"+224"},{"name":"Guyana","code":"+592"},{"name":"Haiti","code":"+509"},{"name":"Honduras","code":"+504"},{"name":"Hungary","code":"+36"},{"name":"Iceland","code":"+354"},{"name":"India","code":"+91"},{"name":"Indonesia","code":"+62"},{"name":"Iran","code":"+98"},{"name":"Iraq","code":"+964"},{"name":"Ireland","code":"+353"},{"name":"Israel","code":"+972"},{"name":"Italy","code":"+39"},{"name":"Jamaica","code":"+1"},{"name":"Japan","code":"+81"},{"name":"Jordan","code":"+962"},{"name":"Kazakhstan","code":"+7"},{"name":"Kenya","code":"+254"},{"name":"Kiribati","code":"+686"},{"name":"North Korea","code":"+850"},{"name":"South Korea","code":"+82"},{"name":"Kuwait","code":"+965"},{"name":"Kyrgyzstan","code":"+996"},{"name":"Laos","code":"+856"},{"name":"Latvia","code":"+371"},{"name":"Lebanon","code":"+961"},{"name":"Lesotho","code":"+266"},{"name":"Liberia","code":"+231"},{"name":"Libya","code":"+218"},{"name":"Liechtenstein","code":"+423"},{"name":"Lithuania","code":"+370"},{"name":"Luxembourg","code":"+352"},{"name":"Madagascar","code":"+261"},{"name":"Malawi","code":"+265"},{"name":"Malaysia","code":"+60"},{"name":"Maldives","code":"+960"},{"name":"Mali","code":"+223"},{"name":"Malta","code":"+356"},{"name":"Mauritania","code":"+222"},{"name":"Mauritius","code":"+230"},{"name":"Mexico","code":"+52"},{"name":"Micronesia","code":"+691"},{"name":"Moldova","code":"+373"},{"name":"Monaco","code":"+377"},{"name":"Mongolia","code":"+976"},{"name":"Montenegro","code":"+382"},{"name":"Morocco","code":"+212"},{"name":"Mozambique","code":"+258"},{"name":"Myanmar","code":"+95"},{"name":"Namibia","code":"+264"},{"name":"Nauru","code":"+674"},{"name":"Nepal","code":"+977"},{"name":"Netherlands","code":"+31"},{"name":"New Zealand","code":"+64"},{"name":"Nicaragua","code":"+505"},{"name":"Niger","code":"+227"},{"name":"Nigeria","code":"+234"},{"name":"Norway","code":"+47"},{"name":"Oman","code":"+968"},{"name":"Pakistan","code":"+92"},{"name":"Palau","code":"+680"},{"name":"Panama","code":"+507"},{"name":"Papua New Guinea","code":"+675"},{"name":"Paraguay","code":"+595"},{"name":"Peru","code":"+51"},{"name":"Philippines","code":"+63"},{"name":"Poland","code":"+48"},{"name":"Portugal","code":"+351"},{"name":"Qatar","code":"+974"},{"name":"Romania","code":"+40"},{"name":"Russia","code":"+7"},{"name":"Rwanda","code":"+250"},{"name":"Samoa","code":"+685"},{"name":"San Marino","code":"+378"},{"name":"Saudi Arabia","code":"+966"},{"name":"Senegal","code":"+221"},{"name":"Serbia","code":"+381"},{"name":"Seychelles","code":"+248"},{"name":"Sierra Leone","code":"+232"},{"name":"Singapore","code":"+65"},{"name":"Slovakia","code":"+421"},{"name":"Slovenia","code":"+386"},{"name":"Solomon Islands","code":"+677"},{"name":"Somalia","code":"+252"},{"name":"South Africa","code":"+27"},{"name":"Spain","code":"+34"},{"name":"Sri Lanka","code":"+94"},{"name":"Sudan","code":"+249"},{"name":"Suriname","code":"+597"},{"name":"Swaziland","code":"+268"},{"name":"Sweden","code":"+46"},{"name":"Switzerland","code":"+41"},{"name":"Syria","code":"+963"},{"name":"Taiwan","code":"+886"},{"name":"Tajikistan","code":"+992"},{"name":"Tanzania","code":"+255"},{"name":"Thailand","code":"+66"},{"name":"Togo","code":"+228"},{"name":"Tonga","code":"+676"},{"name":"Trinidad and Tobago","code":"+1"},{"name":"Tunisia","code":"+216"},{"name":"Turkey","code":"+90"},{"name":"Turkmenistan","code":"+993"},{"name":"Tuvalu","code":"+688"},{"name":"Uganda","code":"+256"},{"name":"Ukraine","code":"+380"},{"name":"United Arab Emirates","code":"+971"},{"name":"United Kingdom","code":"+44"},{"name":"United States","code":"+1"},{"name":"Uruguay","code":"+598"},{"name":"Uzbekistan","code":"+998"},{"name":"Vanuatu","code":"+678"},{"name":"Vatican City","code":"+379"},{"name":"Venezuela","code":"+58"},{"name":"Vietnam","code":"+84"},{"name":"Yemen","code":"+967"},{"name":"Zambia","code":"+260"},{"name":"Zimbabwe","code":"+263"}
];

const PREDEFINED_SKILLS = [
  "React", "React Native", "Angular", "Vue.js", "Svelte", "Node.js", "Express", "Django", "Flask", "Spring Boot",
  "Python", "JavaScript", "TypeScript", "Java", "C++", "C#", "Ruby", "Go", "Rust", "PHP", "Swift", "Kotlin",
  "SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Firebase", "AWS", "Google Cloud", "Azure", "Docker", "Kubernetes",
  "Full Stack Developer", "Frontend Developer", "Backend Developer", "Data Scientist", "Machine Learning Engineer",
  "DevOps Engineer", "UI/UX Designer", "Product Manager", "Project Manager", "Scrum Master", "Agile", "Jira",
  "Figma", "Adobe XD", "Photoshop", "Illustrator", "Premiere Pro", "After Effects",
  "HTML", "CSS", "Tailwind CSS", "Sass", "Less", "Bootstrap", "Material-UI", "Chakra UI", "Next.js", "Nuxt.js",
  "GraphQL", "REST API", "Redux", "Zustand", "Context API", "Webpack", "Vite", "Babel", "Jest", "Cypress", "Playwright",
  "Git", "GitHub", "GitLab", "Bitbucket", "CI/CD", "Jenkins", "Travis CI", "CircleCI", "Linux", "Bash", "Shell Scripting"
];

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

const Step1 = ({ onNext, role, setRole, formData, updateFormData }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [isGoogleLinked, setIsGoogleLinked] = useState(false);
  
  const handleInputChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleManualSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    if (!isGoogleLinked) {
      alert("You must link a Google Account before continuing.");
      return;
    }
    
    try {
      if (isGoogleLinked) {
        // They already created the account via Google. Let's add the password so they can log in manually too!
        const { updatePassword } = await import('firebase/auth');
        if (auth.currentUser) {
          try {
            await updatePassword(auth.currentUser, password);
          } catch (pwdErr) {
            console.error("Error setting password for Google account", pwdErr);
          }
        }
      } else {
        // They didn't link Google. Let's create an email/password account!
        await createUserWithEmailAndPassword(auth, formData.email, password);
      }
      onNext();
    } catch (error) {
      console.error("Error creating account", error);
      if (error.code === 'auth/email-already-in-use') {
        alert("This email is already registered. Please log in instead.");
      } else {
        alert("Error creating account: " + error.message);
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const additionalInfo = getAdditionalUserInfo(result);

      if (result.user.email) {
         updateFormData({ email: result.user.email });
      }
      if (result.user.displayName) {
         updateFormData({ fullName: result.user.displayName });
      }
      if (result.user.photoURL) {
         updateFormData({ profileImage: result.user.photoURL });
      }

      if (!additionalInfo.isNewUser) {
        let docRef = doc(db, 'candidates', result.user.uid);
        let docSnap = await getDoc(docRef);
        let foundRole = 'candidate';
        
        if (!docSnap.exists()) {
          docRef = doc(db, 'recruiters', result.user.uid);
          docSnap = await getDoc(docRef);
          foundRole = 'recruiter';
        }

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.kycStatus === 'verified' && data.profileComplete) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('visume_role', foundRole);
            localStorage.setItem('visume_profile_data', JSON.stringify(data));
            alert("Welcome back! You already have an account, so we've logged you in.");
            navigate(foundRole === 'recruiter' ? '/recruiter' : '/dashboard', { replace: true });
            return;
          }
        }
        
        alert("Your account setup is incomplete. Please finish the remaining steps.");
        setIsGoogleLinked(true);
        return;
      }

      // New user successfully linked Google account. 
      setIsGoogleLinked(true);
      alert("Google Account successfully linked! You may now click Continue.");
    } catch (error) {
      console.error("Error signing up with Google", error);
      alert("Error linking Google account: " + error.message);
    }
  };

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
      
      <form onSubmit={handleManualSignUp} className="space-y-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-text-muted">Full Name</label>
            <input name="fullName" value={formData.fullName || ''} onChange={handleInputChange} className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="John Doe" type="text" required/>
          </div>
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-text-muted">Email Address</label>
            <input name="email" value={formData.email || ''} onChange={handleInputChange} className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="john@example.com" type="email" required/>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-text-muted">Password</label>
            <input className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="••••••••" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength="6"/>
          </div>
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-text-muted">Confirm Password</label>
            <input className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="••••••••" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required minLength="6"/>
          </div>
        </div>
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-text-muted">Phone Number</label>
          <div className="flex gap-2">
            <select 
              name="countryCode"
              className="bg-border-base border border-border-input rounded-lg px-sm py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary w-1/3 min-w-[120px]"
              value={formData.countryCode || '+1'}
              onChange={handleInputChange}
            >
              <option value="+1">🇺🇸 US (+1)</option>
              <option value="+91">🇮🇳 IN (+91)</option>
              <option value="+44">🇬🇧 UK (+44)</option>
              <option disabled>──────────</option>
              {countryCodes.map((country, idx) => (
                <option key={idx} value={country.code}>
                  {country.name} ({country.code})
                </option>
              ))}
            </select>
            <input name="phone" value={formData.phone || ''} onChange={handleInputChange} className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary flex-1" placeholder="(555) 000-0000" type="tel" required/>
          </div>
        </div>
        
        {role === 'candidate' && (
          <div className="space-y-md border-t border-outline-variant pt-md mt-sm">
            <h3 className="font-label-md text-text-primary uppercase tracking-wider">Candidate Details</h3>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-text-muted">Address</label>
              <input name="address" value={formData.address || ''} onChange={handleInputChange} className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="City, State, Country" type="text" required/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-text-muted">Previous Experience</label>
                <input name="previousExperience" value={formData.previousExperience || ''} onChange={handleInputChange} className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="e.g. 3 yrs Frontend Dev" type="text" required/>
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-text-muted">Portfolio / Website</label>
                <input name="portfolio" value={formData.portfolio || ''} onChange={handleInputChange} className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="https://" type="url" required/>
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
                <input name="designation" value={formData.designation || ''} onChange={handleInputChange} className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="e.g. Talent Acquisition" type="text" required/>
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-text-muted">Department</label>
                <input name="department" value={formData.department || ''} onChange={handleInputChange} className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="e.g. Human Resources" type="text" required/>
              </div>
            </div>
          </div>
        )}
        <button 
          onClick={handleGoogleSignUp}
          type="button"
          className={`w-full border font-label-md py-md rounded-lg active:scale-[0.98] transition-all font-bold flex items-center justify-center gap-3 mt-4 ${isGoogleLinked ? 'bg-secondary/10 border-secondary text-secondary' : 'bg-surface-container border-border-input text-text-primary hover:bg-surface-dim'}`}
        >
          {isGoogleLinked ? (
            <>
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Google Account Linked
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Link Google Account
            </>
          )}
        </button>

        <button type="submit" className="w-full bg-primary-container text-white font-label-md py-md rounded-lg hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-wider font-bold mt-4">Continue</button>
      </form>
    </section>
  );
};

const Step2 = ({ onNext, onBack, role, formData, updateFormData }) => {
  const handleInputChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };
  
  return (
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
              <input name="companyName" value={formData.companyName || ''} onChange={handleInputChange} className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="Acme Corp" type="text"/>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-text-muted">Company Registration Number (CIN)</label>
              <input name="cin" value={formData.cin || ''} onChange={handleInputChange} className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="U12345MH2024PTC123456" type="text"/>
            </div>
          </div>
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-text-muted">Registered Company Address</label>
            <input name="registeredAddress" value={formData.registeredAddress || ''} onChange={handleInputChange} className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="123 Business Park, City, State, ZIP" type="text"/>
          </div>
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-text-muted">Company Website</label>
            <input name="website" value={formData.website || ''} onChange={handleInputChange} className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="https://" type="url"/>
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
};

const Step3 = ({ onBack, role, formData, updateFormData }) => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState(['React', 'Tailwind CSS']);
  const [inputVal, setInputVal] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputVal(val);
    if (val.trim()) {
      const filtered = PREDEFINED_SKILLS.filter(skill => 
        skill.toLowerCase().includes(val.toLowerCase()) && !skills.includes(skill)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleFormInputChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const addSkill = (skillToAdd) => {
    if (skillToAdd.trim() !== '' && !skills.includes(skillToAdd.trim())) {
      setSkills([...skills, skillToAdd.trim()]);
    }
    setInputVal('');
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputVal.trim() !== '') {
      e.preventDefault();
      addSkill(inputVal.trim());
    }
  };

  const removeSkill = (indexToRemove) => {
    setSkills(skills.filter((_, idx) => idx !== indexToRemove));
  };

  const handleComplete = async () => {
    // Save to local storage mimicking a DB save
    const completeData = {
      ...formData,
      role: role,
      kycStatus: 'verified',
      profileComplete: true,
      createdAt: new Date().toISOString(),
      skills: skills,
      // Default some structure if empty so settings page doesn't crash
      bio: '',
      dob: '',
      webcam: 'webcam-0',
      microphone: 'mic-1',
      resolution: '1080p',
      promptTemplate: "Hi, I'm [Name], a [Title]. Today I wanted to share details about my recent project where we achieved a 40% speed up in page load times by leveraging dynamic import routines...",
      aiSmartMatch: true,
      defaultQuestions: [
        'Tell us about a time you solved a complex scalability bug.',
        'Why are you excited to join NovaStream AI?',
        'Walk us through your design system process.'
      ],
      companySize: '50-200'
    };
    
    // Firestore throws errors if ANY value is strictly undefined. Remove them safely:
    Object.keys(completeData).forEach(key => completeData[key] === undefined && delete completeData[key]);
    
    try {
      if (auth.currentUser) {
        const collectionName = role === 'recruiter' ? 'recruiters' : 'candidates';
        await setDoc(doc(db, collectionName, auth.currentUser.uid), completeData);
      }
    } catch (error) {
      console.error("Error saving profile to Firestore", error);
      alert("There was an error saving your profile to the database. Please make sure the Firestore database is created and try again.");
      return;
    }
    
    localStorage.setItem('visume_profile_data', JSON.stringify(completeData));
    
    await auth.signOut();
    alert("Profile completely set up! Please log in to access your dashboard.");
    navigate('/login', { state: { redirectTo: role === 'recruiter' ? '/recruiter' : '/dashboard' } });
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
          <input name="headline" value={formData.headline || ''} onChange={handleFormInputChange} className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder={role === 'recruiter' ? 'e.g. Seeking top engineering talent' : 'e.g. Senior Frontend Developer with 5 years experience'} type="text"/>
        </div>
        <div className="flex flex-col gap-xs relative">
          <label className="font-label-md text-text-muted">
            {role === 'recruiter' ? 'Roles Hiring For (Press Enter to add)' : 'Skills (Press Enter to add)'}
          </label>
          <div className="bg-border-base border border-border-input rounded-lg px-md py-2 flex flex-wrap gap-2 min-h-[46px] relative">
            {skills.map((skill, idx) => (
              <span key={idx} className="bg-primary-container/20 text-primary-container text-label-md px-3 py-1 rounded-full flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                {skill} 
                <span className="material-symbols-outlined text-[14px] cursor-pointer" onClick={() => removeSkill(idx)}>close</span>
              </span>
            ))}
            <input 
              className="bg-transparent border-none outline-none focus:ring-0 p-1 flex-1 text-body-sm text-text-primary min-w-[100px]" 
              placeholder="Type to search..." 
              type="text"
              value={inputVal}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          {suggestions.length > 0 && (
            <div className="absolute top-[100%] left-0 w-full mt-1 bg-surface-container-high border border-border-input rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
              {suggestions.map((skill, idx) => (
                <div 
                  key={idx} 
                  className="px-md py-sm hover:bg-primary-container/10 cursor-pointer text-text-primary font-body-sm transition-colors"
                  onMouseDown={(e) => {
                    // use onMouseDown instead of onClick to prevent onBlur issues if we ever add onBlur
                    e.preventDefault(); 
                    addSkill(skill);
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-text-muted">Location</label>
            <input 
              name="location" value={formData.location || ''} onChange={handleFormInputChange}
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
            <input name="linkedin" value={formData.linkedin || ''} onChange={handleFormInputChange} className="bg-border-base border border-border-input rounded-lg px-md py-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-text-primary" placeholder="linkedin.com/in/username" type="url"/>
          </div>
        </div>
        <button onClick={handleComplete} className="w-full bg-primary-container text-white font-label-md py-md rounded-lg hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-wider font-bold mt-4">Complete Profile</button>
      </div>
    </section>
  );
};

const Registration = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('candidate');
  const [formData, setFormData] = useState({});

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

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
        {step === 1 && <Step1 onNext={nextStep} role={role} setRole={setRole} formData={formData} updateFormData={updateFormData} />}
        {step === 2 && <Step2 onNext={nextStep} onBack={prevStep} role={role} formData={formData} updateFormData={updateFormData} />}
        {step === 3 && <Step3 onBack={prevStep} role={role} formData={formData} updateFormData={updateFormData} />}
      </main>
      <Footer />
    </div>
  );
};

export default Registration;
