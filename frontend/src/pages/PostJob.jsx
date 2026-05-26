import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, orderBy, query, updateDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import CustomSelect from '../components/CustomSelect';
import CustomDatePicker from '../components/CustomDatePicker';
import CustomVideoPlayer from '../components/CustomVideoPlayer';

const RequiredMark = () => <span className="text-red-500">*</span>;

const formatViewerDate = (value) => {
  if (!value) return 'Recently';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Recently';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getMediaUrl = (url) => {
  if (!url || url === 'mock_url') return null;
  if (url.startsWith('/uploads')) return `http://localhost:5000${url}`;
  return url;
};

const skillCatalog = [
  'React', 'React Native', 'Next.js', 'Vue.js', 'Angular', 'Svelte', 'JavaScript', 'TypeScript', 'HTML', 'CSS',
  'Tailwind CSS', 'Bootstrap', 'Sass', 'Redux', 'Zustand', 'GraphQL', 'REST APIs', 'Node.js', 'Express.js',
  'NestJS', 'Python', 'Django', 'Flask', 'FastAPI', 'Java', 'Spring Boot', 'Kotlin', 'C#', '.NET', 'PHP',
  'Laravel', 'Ruby on Rails', 'Go', 'Rust', 'C++', 'C', 'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis',
  'Firebase', 'Supabase', 'Prisma', 'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform',
  'CI/CD', 'Git', 'GitHub Actions', 'Jenkins', 'Linux', 'Microservices', 'System Design', 'Data Structures',
  'Algorithms', 'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision',
  'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Power BI', 'Tableau', 'Excel', 'Data Analysis', 'Data Engineering',
  'ETL', 'Apache Spark', 'Hadoop', 'Figma', 'UI Design', 'UX Design', 'User Research', 'Wireframing',
  'Prototyping', 'Design Systems', 'Adobe XD', 'Photoshop', 'Illustrator', 'After Effects', 'Product Management',
  'Roadmapping', 'Agile', 'Scrum', 'Jira', 'Confluence', 'QA Testing', 'Automation Testing', 'Selenium',
  'Cypress', 'Playwright', 'Performance Testing', 'Security', 'DevOps', 'SEO', 'Content Strategy',
  'Digital Marketing', 'Google Analytics', 'Salesforce', 'HubSpot', 'Customer Success', 'Communication',
  'Leadership', 'Problem Solving', 'Project Management'
];

const PostJob = () => {
  const [deadline, setDeadline] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [workMode, setWorkMode] = useState('remote');
  const [location, setLocation] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [postedJobs, setPostedJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [viewerProfile, setViewerProfile] = useState(null);
  const [viewerProfileLoading, setViewerProfileLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const profileData = JSON.parse(localStorage.getItem('visume_profile_data') || '{}');
      const companyName = profileData.companyName || profileData.fullName || 'Unknown Company';
      const recruiterId = auth.currentUser?.uid || '';

      const jobs = snapshot.docs
        .map(docSnap => ({ id: docSnap.id, ...docSnap.data() }))
        .filter(job => (
          recruiterId ? job.recruiterId === recruiterId : job.company === companyName
        ));

      setPostedJobs(jobs);
      setJobsLoading(false);
    }, (error) => {
      console.error('Error fetching posted jobs:', error);
      setJobsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (jobId, status) => {
    try {
      await updateDoc(doc(db, 'jobs', jobId), { status });
    } catch (error) {
      console.error('Error updating job status:', error);
      alert('Unable to update this job. Please try again.');
    }
  };

  const openViewerProfile = async (viewer) => {
    setViewerProfileLoading(true);
    setViewerProfile({ ...viewer, videos: [], resume: null });

    try {
      const candidateDoc = await getDoc(doc(db, 'candidates', viewer.uid));
      const candidateData = candidateDoc.exists() ? candidateDoc.data() : {};
      const videosSnap = await getDocs(collection(db, 'candidates', viewer.uid, 'videoResumes'));
      let videos = videosSnap.docs.map(videoDoc => ({ id: videoDoc.id, ...videoDoc.data() }));

      if (viewer.resumeId) {
        videos = videos.filter(v => v.id === viewer.resumeId);
      }

      setViewerProfile({
        ...viewer,
        ...candidateData,
        name: candidateData.fullName || viewer.name || 'Candidate',
        headline: candidateData.headline || viewer.headline || 'Candidate',
        location: candidateData.location || viewer.location || 'Remote',
        profileImage: candidateData.profileImage || viewer.profileImage || '',
        videos,
        resume: viewer.includeDocumentResume !== false && (candidateData.resumeUrl || candidateData.localResumeUrl)
          ? {
              name: candidateData.resumeName || 'Resume Document',
              url: candidateData.resumeUrl || candidateData.localResumeUrl
            }
          : null
      });
    } catch (error) {
      console.error('Error loading viewer profile:', error);
    } finally {
      setViewerProfileLoading(false);
    }
  };

  const matchingSkills = skillInput.trim()
    ? skillCatalog
        .filter(skill =>
          skill.toLowerCase().includes(skillInput.trim().toLowerCase()) &&
          !skills.some(selectedSkill => selectedSkill.toLowerCase() === skill.toLowerCase())
        )
        .slice(0, 8)
    : [];

  const addSkill = (skill) => {
    const val = skill.trim();
    if (!val) return;

    setSkills(prev => (
      prev.some(existingSkill => existingSkill.toLowerCase() === val.toLowerCase())
        ? prev
        : [...prev, val]
    ));
    setSkillInput('');
    setShowSkillSuggestions(false);
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(matchingSkills[0] || skillInput);
    }

    if (e.key === 'Escape') {
      setShowSkillSuggestions(false);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(prev => prev.filter(s => s !== skillToRemove));
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();

    const pendingSkill = skillInput.trim();
    const finalSkills = pendingSkill && !skills.includes(pendingSkill)
      ? [...skills, pendingSkill]
      : skills;

    if (!title.trim()) {
      alert('Please enter a job title.');
      return;
    }
    if (!department) {
      alert('Please select a department.');
      return;
    }
    if (!workMode) {
      alert('Please select a work mode.');
      return;
    }
    if (!location.trim()) {
      alert('Please enter a location.');
      return;
    }
    if (!salaryMin.trim()) {
      alert('Please enter the minimum salary.');
      return;
    }
    if (!salaryMax.trim()) {
      alert('Please enter the maximum salary.');
      return;
    }
    if (parseInt(salaryMax) < parseInt(salaryMin)) {
      alert('Maximum salary must be greater than or equal to minimum salary.');
      return;
    }
    if (!experience) {
      alert('Please select the required experience.');
      return;
    }
    if (finalSkills.length === 0) {
      alert('Please add at least one required skill.');
      return;
    }
    if (!description.trim()) {
      alert('Please enter a job description.');
      return;
    }
    if (!deadline) {
      alert('Please select an application deadline.');
      return;
    }

    setIsSubmitting(true);
    try {
      const profileData = JSON.parse(localStorage.getItem('visume_profile_data') || '{}');
      const companyName = profileData.companyName || profileData.fullName || 'Unknown Company';

      const minVal = parseInt(salaryMin) || 0;
      const maxVal = parseInt(salaryMax) || 0;
      const salaryDisplay = minVal && maxVal
        ? `₹${minVal}L - ₹${maxVal}L`
        : minVal ? `₹${minVal}L+` : maxVal ? `Up to ₹${maxVal}L` : 'Not disclosed';

      const experienceMap = {
        'fresher': 'Entry',
        '1-3': 'Intermediate',
        '3-5': 'Intermediate',
        '5+': 'Senior'
      };

      const jobData = {
        title: title.trim(),
        company: companyName,
        department: department || '',
        workMode: workMode.charAt(0).toUpperCase() + workMode.slice(1),
        location: location.trim(),
        salaryMin: minVal,
        salaryMax: maxVal,
        salaryDisplay,
        experience: experienceMap[experience] || 'Entry',
        skills: finalSkills,
        description: description.trim(),
        deadline,
        status: 'active',
        viewCount: 0,
        viewers: [],
        type: 'Full-time',
        recruiterId: auth.currentUser?.uid || '',
        recruiterName: profileData.fullName || '',
        recruiterPhoto: auth.currentUser?.photoURL || profileData.profileImage || '',
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'jobs'), jobData);

      setShowSuccess(true);
      // Reset form
      setTitle('');
      setDepartment('');
      setWorkMode('remote');
      setLocation('');
      setSalaryMin('');
      setSalaryMax('');
      setExperience('');
      setSkills([]);
      setSkillInput('');
      setDescription('');
      setDeadline('');

      setTimeout(() => setShowSuccess(false), 4000);
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-[100] bg-secondary text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 fade-in duration-300">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <div>
            <p className="font-bold">Job Posted Successfully!</p>
            <p className="text-sm opacity-90">It's now live on the candidate feed.</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-[720px] mx-auto">
        <section className="mb-lg bg-card-bg border border-border-base rounded-xl p-lg md:p-xl shadow-2xl">
          <div className="mb-lg">
            <div>
              <h2 className="font-display text-headline-md text-text-primary">Posted Jobs</h2>
              <p className="text-text-muted mt-1">Track jobs you have posted and review interested candidates.</p>
            </div>
          </div>

          {jobsLoading ? (
            <div className="py-10 text-center text-text-muted">Loading posted jobs...</div>
          ) : postedJobs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-outline-variant bg-surface-container-low p-8 text-center">
              <span className="material-symbols-outlined text-4xl text-text-muted opacity-60">work_off</span>
              <p className="mt-3 font-bold text-text-primary">No jobs posted yet</p>
              <p className="mt-1 text-body-sm text-text-muted">Create your first posting below.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {postedJobs.map(job => {
                const viewers = Array.isArray(job.viewers) ? job.viewers : [];
                const appliedCandidates = Array.isArray(job.applicants) ? job.applicants : [];
                const viewCount = Math.max(job.viewCount || 0, viewers.length, appliedCandidates.length);
                return (
                  <article key={job.id} className="rounded-xl border border-outline-variant/50 bg-surface-container-low p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-headline-sm text-text-primary">{job.title}</h3>
                          <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${job.status === 'closed' ? 'bg-danger/10 text-danger' : job.status === 'paused' ? 'bg-status-review/10 text-status-review' : 'bg-secondary/10 text-secondary'}`}>
                            {job.status || 'active'}
                          </span>
                        </div>
                        <p className="mt-1 text-body-sm text-text-muted">{job.department || 'General'} • {job.location} • {job.workMode}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {(job.skills || []).map(skill => (
                            <span key={skill} className="rounded-full border border-primary-container/30 bg-primary-container/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-container">{skill}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col gap-3 md:items-end">
                        <div className="rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-2 text-center">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Views</p>
                          <p className="text-headline-sm font-bold text-secondary">{viewCount}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {['active', 'paused', 'closed'].map(status => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => handleStatusChange(job.id, status)}
                              className={`rounded-lg border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide transition-colors ${(job.status || 'active') === status ? 'border-primary-container bg-primary-container/10 text-primary-container' : 'border-outline-variant text-text-muted hover:text-text-primary'}`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-outline-variant/40 pt-4">
                      <div className="mb-3 flex items-center justify-between">
                        <h4 className="font-bold text-text-primary">Applied Candidates</h4>
                        <span className="text-label-md text-text-muted">{appliedCandidates.length} candidate{appliedCandidates.length === 1 ? '' : 's'}</span>
                      </div>
                      {appliedCandidates.length === 0 ? (
                        <p className="rounded-lg border border-dashed border-outline-variant/60 bg-surface-container/40 p-4 text-center text-body-sm text-text-muted">No applications yet.</p>
                      ) : (
                        <div className="space-y-2">
                          {appliedCandidates.map(viewer => (
                            <button
                              key={viewer.uid}
                              type="button"
                              onClick={() => openViewerProfile(viewer)}
                              className="flex w-full items-center gap-3 rounded-lg border border-outline-variant/40 bg-surface-container p-3 text-left transition-colors hover:border-primary-container/60 hover:bg-primary-container/5"
                            >
                              <img
                                src={viewer.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(viewer.name || 'Candidate')}&background=6C5CE7&color=fff&size=128`}
                                alt={viewer.name || 'Candidate'}
                                className="h-10 w-10 shrink-0 rounded-full object-cover"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="truncate font-bold text-text-primary">{viewer.name || 'Candidate'}</p>
                                <p className="truncate text-[12px] text-text-muted">{viewer.headline || 'Candidate'} • Applied {formatViewerDate(viewer.appliedAt || viewer.viewedAt)}</p>
                              </div>
                              <span className="material-symbols-outlined text-text-muted">person_search</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Form Card */}
        <div id="post-job-form" className="bg-card-bg border border-border-base rounded-xl p-lg md:p-xl shadow-2xl scroll-mt-28">
          <header className="mb-lg">
            <h1 className="font-display text-headline-lg text-text-primary">Post a New Job</h1>
            <p className="text-text-muted mt-2">Fill in the details to create a new job posting.</p>
          </header>

          <form className="flex flex-col gap-md" onSubmit={handleSubmit}>
            {/* Job Title */}
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-text-primary font-bold">Job Title <RequiredMark /></label>
              <input
                type="text"
                required
                placeholder="e.g. Senior React Developer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-label-md text-text-primary font-bold">Department <RequiredMark /></label>
              <CustomSelect
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                options={[
                  { value: 'engineering', label: 'Engineering' },
                  { value: 'design', label: 'Design' },
                  { value: 'marketing', label: 'Marketing' },
                  { value: 'sales', label: 'Sales' },
                  { value: 'hr', label: 'HR' },
                  { value: 'finance', label: 'Finance' }
                ]}
                placeholder="Select a department"
              />
            </div>

            {/* Work Mode */}
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-text-primary font-bold">Work Mode <RequiredMark /></label>
              <div className="flex flex-wrap gap-3">
                {['remote', 'hybrid', 'onsite'].map(mode => (
                  <label key={mode} className="cursor-pointer">
                    <input
                      type="radio"
                      name="work_mode"
                      value={mode}
                      checked={workMode === mode}
                      onChange={(e) => setWorkMode(e.target.value)}
                      className="peer hidden"
                    />
                    <div className="px-5 py-2.5 rounded-full border border-border-input text-text-muted peer-checked:bg-primary-container/20 peer-checked:text-primary-container peer-checked:border-primary-container font-medium transition-all">
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-text-primary font-bold">Location <RequiredMark /></label>
              <input
                type="text"
                required
                placeholder="e.g. Hyderabad, India"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
              />
            </div>

            {/* Salary Range */}
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-text-primary font-bold">Salary Range (Yearly) <RequiredMark /></label>
              <div className="flex gap-4">
                <input
                  type="text"
                  required
                  placeholder="Min ₹"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-1/2 bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                />
                <input
                  type="text"
                  required
                  placeholder="Max ₹"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-1/2 bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-label-md text-text-primary font-bold">Experience Required <RequiredMark /></label>
              <CustomSelect
                name="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                options={[
                  { value: 'fresher', label: 'Fresher' },
                  { value: '1-3', label: '1–3 yrs' },
                  { value: '3-5', label: '3–5 yrs' },
                  { value: '5+', label: '5+ yrs' }
                ]}
                placeholder="Select experience level"
              />
            </div>

            {/* Required Skills */}
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-text-primary font-bold">Required Skills <RequiredMark /></label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type a skill, then select a match"
                  value={skillInput}
                  onChange={(e) => {
                    setSkillInput(e.target.value);
                    setShowSkillSuggestions(true);
                  }}
                  onFocus={() => setShowSkillSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSkillSuggestions(false), 120)}
                  onKeyDown={handleSkillKeyDown}
                  className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                />
                {showSkillSuggestions && matchingSkills.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-40 mt-2 max-h-56 overflow-y-auto rounded-xl border border-outline-variant bg-surface-container-highest py-1 shadow-xl custom-scrollbar">
                    {matchingSkills.map(skill => (
                      <button
                        key={skill}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => addSkill(skill)}
                        className="flex w-full items-center justify-between px-4 py-2.5 text-left text-body-sm text-text-primary transition-colors hover:bg-primary-container/20 hover:text-primary-container"
                      >
                        <span>{skill}</span>
                        <span className="material-symbols-outlined text-[16px] text-text-muted">add</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-primary-container text-primary-container bg-primary-container/10 text-sm">
                      {skill}
                      <span
                        onClick={() => removeSkill(skill)}
                        className="material-symbols-outlined text-[14px] cursor-pointer hover:text-white"
                      >close</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Job Description */}
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-text-primary font-bold">Job Description <RequiredMark /></label>
              <textarea
                rows="6"
                required
                placeholder="Describe the role, responsibilities, and requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all custom-scrollbar"
              ></textarea>
            </div>

            {/* Application Deadline */}
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-text-primary font-bold">Application Deadline <RequiredMark /></label>
              <CustomDatePicker name="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>

            <hr className="border-border-base my-sm" />

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <button type="button" className="px-6 py-3 rounded-lg border border-border-input text-text-muted hover:bg-surface-container hover:text-text-primary transition-all font-bold">
                  Save as Draft
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center justify-center gap-2 bg-primary-container text-white px-6 py-3 rounded-lg font-bold hover:shadow-[0_0_15px_rgba(108,92,231,0.4)] transition-all ${isSubmitting ? 'opacity-60 pointer-events-none' : ''}`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">auto_awesome</span>
                      Post Job &amp; Generate AI Match
                    </>
                  )}
                </button>
              </div>
              <p className="text-center text-label-md text-text-muted mt-2">AI will automatically rank matching candidates after posting.</p>
            </div>

          </form>
        </div>
      </div>

      {viewerProfile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setViewerProfile(null)}
        >
          <div
            className="flex max-h-[calc(100vh-4rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="viewer-profile-title"
          >
            <div className="flex items-start justify-between border-b border-outline-variant/30 p-6">
              <div className="flex min-w-0 gap-4">
                <img
                  src={viewerProfile.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(viewerProfile.name || 'Candidate')}&background=6C5CE7&color=fff&size=128`}
                  alt={viewerProfile.name || 'Candidate'}
                  className="h-16 w-16 shrink-0 rounded-full border-2 border-primary-container/30 object-cover"
                />
                <div className="min-w-0">
                  <h3 id="viewer-profile-title" className="font-display text-headline-sm font-bold text-text-primary">{viewerProfile.name || 'Candidate'}</h3>
                  <p className="text-body-sm text-text-muted">{viewerProfile.headline || 'Candidate'}</p>
                  <p className="mt-1 flex items-center gap-1 text-label-md text-text-muted">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    {viewerProfile.location || 'Remote'}
                  </p>
                </div>
              </div>
              <button type="button" onClick={() => setViewerProfile(null)} className="p-1 text-text-muted transition-colors hover:text-white" aria-label="Close viewer profile">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-6 custom-scrollbar">
              {viewerProfileLoading ? (
                <div className="flex flex-col items-center justify-center py-10 text-text-muted">
                  <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-primary-container border-t-transparent"></div>
                  Loading candidate profile...
                </div>
              ) : (
                <>
                  {viewerProfile.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {viewerProfile.skills.map(skill => (
                        <span key={skill} className="rounded-full border border-primary-container/30 bg-primary-container/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-container">{skill}</span>
                      ))}
                    </div>
                  )}

                  <section>
                    <h4 className="mb-3 flex items-center gap-2 font-bold text-text-primary">
                      <span className="material-symbols-outlined text-primary">videocam</span>
                      Video Resumes
                    </h4>
                    {viewerProfile.videos?.length > 0 ? (
                      <div className="space-y-3">
                        {viewerProfile.videos.map(video => {
                          const videoUrl = getMediaUrl(video.videoUrl) || getMediaUrl(video.localVideoUrl);
                          return (
                            <div key={video.id} className="overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-low">
                              {videoUrl ? (
                                <CustomVideoPlayer src={videoUrl} className="aspect-video w-full rounded-xl" />
                              ) : (
                                <div className="flex min-h-[180px] items-center justify-center text-text-muted">No playable video file.</div>
                              )}
                              <div className="p-3">
                                <p className="font-bold text-text-primary">{video.title || 'Untitled Video'}</p>
                                <p className="text-[11px] text-text-muted">{video.date || ''} {video.duration ? `• ${video.duration}` : ''}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="rounded-xl border border-dashed border-outline-variant bg-surface-container-low p-5 text-center text-body-sm text-text-muted">No video resumes available.</p>
                    )}
                  </section>

                  <section>
                    <h4 className="mb-3 flex items-center gap-2 font-bold text-text-primary">
                      <span className="material-symbols-outlined text-primary">description</span>
                      Document Resume
                    </h4>
                    {viewerProfile.resume ? (
                      <a
                        href={getMediaUrl(viewerProfile.resume.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-xl border border-outline-variant/30 bg-surface-container-low p-4 transition-colors hover:border-primary-container/50"
                      >
                        <span className="material-symbols-outlined text-primary">picture_as_pdf</span>
                        <span className="min-w-0 flex-1 truncate font-bold text-text-primary">{viewerProfile.resume.name}</span>
                        <span className="material-symbols-outlined text-text-muted">open_in_new</span>
                      </a>
                    ) : (
                      <p className="rounded-xl border border-dashed border-outline-variant bg-surface-container-low p-5 text-center text-body-sm text-text-muted">No document resume uploaded.</p>
                    )}
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostJob;
