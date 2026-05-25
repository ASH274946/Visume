import React, { useState } from 'react';

const candidatesData = [
  {
    id: 1,
    name: "Julian Vance",
    role: "UX/UI Design Lead",
    location: "San Francisco, CA",
    match: "94%",
    skills: ["Figma", "Prototyping", "User Research"],
    experience: "8 years",
    imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlKIqavd7BZl-9QDY-2sJxoe32jflqHra0k9pX2Rs0x5YPNAs6pqgI-5P5d9TCImBjlW01w4StzoikmaOX2A28tgFWyZjZN7L4uR2IRa5RVuRM11mKBW0BY20sorz40qF-kJfjxWRaM0QpTnyNpedRxmY1xDPo416BFd5uw_ER8f6VNCo75WTMSfwS-Oa0sx1PChTNY5ej_xmxcqnVl1HGVi2Ik7odzC4_dp-XFi-6cNtDO2g7Epd3yXMeaBNnIJjAzHbMyFnZ7Y4"
  },
  {
    id: 2,
    name: "Lila Chen",
    role: "Senior Product Architect",
    location: "Remote",
    match: "91%",
    skills: ["Growth", "SaaS", "Strategy"],
    experience: "6 years",
    imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRB-8eb0mm0mj3bIRrxa_i3FqMCwkhopnm_2AELOGoyjCmQHqHJkKYTfCufEaAwJLmQ-xS1vKpJaTLHpwYHZ5FpjK_NkxbJPDtjx6uEYZBHqeUd3pes-VhhclRpuQsnupq5SuTGKZcYML7xhtPBBSsNOpjrFeUnXRDqMP77vUaUeaI0kdNy1XwrWSiB6-CG86-YJuNljRqWyG26OsUviRCwOZHOAnhpkx9ZE_J1K5kX0zufACc2KdloIbfXr_xXQfCRi8DEx7zFmc"
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "Frontend Developer",
    location: "New York, NY",
    match: "88%",
    skills: ["React", "TypeScript", "Tailwind"],
    experience: "4 years",
    imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDr8iCAVAhPScb_vdkwDSM7i-rKehbjU9T_oH_R_LzauB3AK0hSLlYufoBO69nrWY8Blwa8jc7ma2oYYuOm9py4Ov4EAiDv0zUm2-xfXdUiIkH8mKOQdvQJ8LJiDmrcGy7fUCvQb7huHv_xEoRdXKsHXqPvUAtNiLp3wzi06JcnPGt5SJAjB9lR7DwlrnVdhdJnixqda_Qo651DsBjwFSHpriGOu2FM8g0UU-nM06NmNoMIVOaR8YnS_nJF11HG-ewhQSgxnzM-Ey8"
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    role: "Full Stack Engineer",
    location: "London, UK",
    match: "85%",
    skills: ["Node.js", "MongoDB", "AWS"],
    experience: "5 years",
    imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCif7mMcFeEQhrivL3z3iYapnS9er2kQ7XYLd4MuR0k9XdNq69mXT5OGqxxd69TMzoGOukTENlAj2Sv83x4bkp_Sv3X7SsVVYxKY7DqVn0lMSDDdn5UtHszx8X9yons-XE3U_VNoMV1yN3AoBQnPxsK20QsLD5z0mjpDq2EzinhRsjgwIgYS8hd_RebazNQGulE_Vbs5L86pkRVPmk1pUNont5dxsmD-5DVsS4EK_WczWR-gcIEqbw6IQdA7DRj3RSgR-GlT_7d1-Q"
  },
  {
    id: 5,
    name: "David Kim",
    role: "Product Manager",
    location: "Seattle, WA",
    match: "82%",
    skills: ["Agile", "Jira", "Roadmapping"],
    experience: "7 years",
    imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkfy9Feu-zDXjrtSO-Djz6s4KPq9x30a3IShW_hgguKUiS5VAxFHn-3YThX51z9mpVeMbiOsRjNmSGpSz8_1nHWQw1_n9gU4NvSsGLEZDerT-JTzuwRr1IBDx2Z_x0BJmZ8XlLRwW1GA8zjp_hsKqhhqf546R9ZOJ-sMFDtfYS_BO4LbZoXSpJKkA5f1DDH69RmnNdrGUmwg3DRJaHowy3wJZGMbjhoI7v2B-hKtjB7dWPNASplmpIlr5qIrv_4M5lLHOLIk8IRPI"
  },
  {
    id: 6,
    name: "Elena Rodriguez",
    role: "Data Scientist",
    location: "Remote",
    match: "79%",
    skills: ["Python", "Machine Learning", "SQL"],
    experience: "3 years",
    imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRB-8eb0mm0mj3bIRrxa_i3FqMCwkhopnm_2AELOGoyjCmQHqHJkKYTfCufEaAwJLmQ-xS1vKpJaTLHpwYHZ5FpjK_NkxbJPDtjx6uEYZBHqeUd3pes-VhhclRpuQsnupq5SuTGKZcYML7xhtPBBSsNOpjrFeUnXRDqMP77vUaUeaI0kdNy1XwrWSiB6-CG86-YJuNljRqWyG26OsUviRCwOZHOAnhpkx9ZE_J1K5kX0zufACc2KdloIbfXr_xXQfCRi8DEx7zFmc"
  }
];

const FindCandidatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Candidates');
  const [showFilters, setShowFilters] = useState(false);
  
  // Advanced filters state
  const [experienceLevel, setExperienceLevel] = useState('Any');
  const [minMatchScore, setMinMatchScore] = useState(70);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const allSkillsList = [
    "React", "TypeScript", "Node.js", "Python", "AWS", 
    "Figma", "Machine Learning", "SQL", "Agile", "Strategy"
  ];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
  };

  const filteredCandidates = candidatesData.filter((candidate) => {
    // 1. Filter by Quick Filter
    let matchesFilter = true;
    if (activeFilter === 'UX/UI Designers') {
      matchesFilter = candidate.role.includes('Design') || candidate.skills.includes('Figma');
    } else if (activeFilter === 'Frontend Engineers') {
      matchesFilter = candidate.role.includes('Frontend') || candidate.role.includes('Engineer') || candidate.skills.includes('React');
    } else if (activeFilter === 'Product Managers') {
      matchesFilter = candidate.role.includes('Product Manager');
    } else if (activeFilter === 'Remote Only') {
      matchesFilter = candidate.location.includes('Remote');
    }

    // 2. Filter by Search Term
    let matchesSearch = true;
    if (searchTerm.trim() !== '') {
      const lowerSearch = searchTerm.toLowerCase();
      matchesSearch = 
        candidate.name.toLowerCase().includes(lowerSearch) ||
        candidate.role.toLowerCase().includes(lowerSearch) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(lowerSearch));
    }

    // 3. Filter by Advanced Filters
    let matchesAdvanced = true;
    if (experienceLevel !== 'Any') {
      const expYears = parseInt(candidate.experience) || 0;
      if (experienceLevel === 'Entry (0-2y)' && expYears > 2) matchesAdvanced = false;
      if (experienceLevel === 'Mid (3-5y)' && (expYears < 3 || expYears > 5)) matchesAdvanced = false;
      if (experienceLevel === 'Senior (5y+)' && expYears < 5) matchesAdvanced = false;
    }
    
    const candidateScore = parseInt(candidate.match) || 0;
    if (candidateScore < minMatchScore) {
      matchesAdvanced = false;
    }

    if (selectedSkills.length > 0) {
      // Must have ALL selected skills
      const hasAllSkills = selectedSkills.every(skill => 
        candidate.skills.some(candidateSkill => candidateSkill.toLowerCase() === skill.toLowerCase())
      );
      if (!hasAllSkills) matchesAdvanced = false;
    }

    return matchesFilter && matchesSearch && matchesAdvanced;
  });

  const filterOptions = [
    'All Candidates',
    'UX/UI Designers',
    'Frontend Engineers',
    'Product Managers',
    'Remote Only'
  ];

  return (
    <div className="space-y-lg pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-xl">
        <div>
          <h1 className="font-display text-headline-lg font-bold text-text-primary">Find Candidates</h1>
          <p className="text-body-md text-text-muted">Discover top talent matching your open roles.</p>
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <div className="bg-surface-container border border-outline-variant rounded-xl p-md shadow-lg flex flex-col md:flex-row gap-4 items-center mb-4">
        <div className="relative flex-grow w-full">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">search</span>
          <input 
            type="text" 
            placeholder="Search by role, skills, or keywords..." 
            className="w-full bg-surface-container-low border border-border-input rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all text-body-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 border px-6 py-3 rounded-lg transition-all font-bold w-full md:w-auto justify-center shrink-0 whitespace-nowrap ${showFilters ? 'bg-primary-container/10 border-primary-container text-primary-container' : 'bg-surface-container border-outline-variant text-text-primary hover:bg-surface-bright/20'}`}
        >
          <span className="material-symbols-outlined">tune</span>
          Filters
        </button>
        <button className="bg-primary-container text-white px-8 py-3 rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-container/20 w-full md:w-auto shrink-0">
          Search
        </button>
      </div>

      {/* Advanced Filters Drawer */}
      {showFilters && (
        <div className="bg-surface-container-low border border-outline-variant rounded-xl p-lg mb-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
            <div className="space-y-4">
              <h3 className="font-label-md text-label-md text-text-muted uppercase tracking-wider">Experience Level</h3>
              <div className="flex flex-wrap gap-2">
                {['Any', 'Entry (0-2y)', 'Mid (3-5y)', 'Senior (5y+)'].map(level => (
                  <button 
                    key={level}
                    onClick={() => setExperienceLevel(level)}
                    className={`px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wide transition-all ${experienceLevel === level ? 'bg-primary text-white border-transparent' : 'bg-surface-container-highest text-text-muted hover:text-text-primary border border-transparent hover:border-outline-variant'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-label-md text-label-md text-text-muted uppercase tracking-wider">Min. AI Match Score</h3>
                <span className="text-body-sm text-secondary font-bold">{minMatchScore}%</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="100" 
                value={minMatchScore}
                onChange={(e) => setMinMatchScore(parseInt(e.target.value))}
                className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-secondary" 
              />
              <div className="flex justify-between text-[10px] text-text-muted font-bold">
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-label-md text-label-md text-text-muted uppercase tracking-wider">Must Have Skills</h3>
              <div className="flex flex-wrap gap-2">
                {allSkillsList.map(skill => (
                  <button 
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wide transition-all ${selectedSkills.includes(skill) ? 'bg-primary text-white border-transparent' : 'bg-surface-container-highest text-text-muted hover:text-text-primary border border-transparent hover:border-outline-variant'}`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6 pt-4 border-t border-outline-variant/50">
            <button 
              onClick={() => {
                setExperienceLevel('Any');
                setMinMatchScore(70);
                setSelectedSkills([]);
                setSearchTerm('');
                setActiveFilter('All Candidates');
              }}
              className="text-primary-container font-label-md hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-xl mt-4">
        {filterOptions.map((filter) => (
          <span 
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`px-4 py-1.5 rounded-full font-label-md cursor-pointer transition-colors ${
              activeFilter === filter 
                ? 'bg-primary-container/10 border border-primary-container text-primary-container' 
                : 'bg-surface-container border border-outline-variant text-text-muted hover:text-text-primary'
            }`}
          >
            {filter}
          </span>
        ))}
      </div>

      {/* Candidate Grid */}
      {filteredCandidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="bg-card-bg border border-border-input rounded-xl p-6 hover:-translate-y-1 hover:border-primary-container/50 hover:shadow-xl transition-all group flex flex-col h-full">
              <div className="flex gap-4 items-start mb-6">
                <div className="w-16 h-16 rounded-full border-2 border-primary-container/20 overflow-hidden shrink-0 group-hover:border-primary-container transition-colors">
                  <img src={candidate.imgSrc} alt={candidate.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-display text-headline-sm font-bold text-text-primary">{candidate.name}</h3>
                  <p className="text-body-sm text-text-muted">{candidate.role}</p>
                  <div className="flex items-center gap-1 mt-1 text-label-md text-text-muted">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    {candidate.location}
                  </div>
                </div>
              </div>
              
              <div className="mb-6 flex-grow">
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-surface-container-highest rounded text-[11px] font-bold text-text-muted tracking-wide uppercase">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-6 bg-surface-container/50 p-3 rounded-lg border border-outline-variant/30">
                <div>
                  <p className="text-[11px] text-text-muted uppercase tracking-wider font-bold mb-1">AI Match Score</p>
                  <div className="flex items-center gap-2">
                    <span className="text-secondary font-bold text-body-lg">{candidate.match}</span>
                    <div className="w-16 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: candidate.match }}></div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-text-muted uppercase tracking-wider font-bold mb-1">Experience</p>
                  <p className="text-text-primary font-bold">{candidate.experience}</p>
                </div>
              </div>
              
              <div className="flex gap-3 mt-auto">
                <button className="flex-1 bg-primary text-white py-2.5 rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all text-body-sm shadow-md shadow-primary/20">
                  View Visume
                </button>
                <button className="flex-1 bg-surface-container border border-outline-variant text-text-primary py-2.5 rounded-lg font-bold hover:bg-surface-bright/20 active:scale-95 transition-all text-body-sm">
                  Shortlist
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-surface-container border border-outline-variant rounded-xl p-lg flex flex-col items-center justify-center min-h-[300px] text-center">
          <span className="material-symbols-outlined text-5xl text-text-muted mb-4">search_off</span>
          <h3 className="font-display text-headline-sm font-bold text-text-primary mb-2">No candidates found</h3>
          <p className="text-body-md text-text-muted max-w-md">We couldn't find any candidates matching your current filters. Try adjusting your search terms or clearing filters.</p>
          <button 
            onClick={() => { setSearchTerm(''); setActiveFilter('All Candidates'); }}
            className="mt-6 border border-primary-container text-primary-container px-6 py-2 rounded-lg font-bold hover:bg-primary-container/10 transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FindCandidatesPage;
