import React from 'react';

const Sidebar = () => (
  <aside className="fixed left-0 top-0 h-full w-[240px] bg-surface-container border-r border-outline-variant flex flex-col py-md z-50">
    <div className="px-gutter mb-xl">
      <h1 className="font-display text-headline-sm font-bold text-primary-container">Visume</h1>
      <p className="font-body-sm text-body-sm text-text-muted">Video-First Hiring</p>
    </div>
    
    <nav className="flex-1 flex flex-col gap-1">
      <a className="flex items-center gap-3 text-text-muted px-4 py-3 hover:bg-surface-bright/5 hover:text-text-primary transition-all duration-300" href="#">
        <span className="material-symbols-outlined">dashboard</span>
        <span className="font-label-md text-label-md">Dashboard</span>
      </a>
      <a className="flex items-center gap-3 bg-sidebar-active-glow text-primary-container border-l-4 border-primary-container px-4 py-3 font-bold" href="#">
        <span className="material-symbols-outlined">work</span>
        <span className="font-label-md text-label-md">Jobs</span>
      </a>
      <a className="flex items-center gap-3 text-text-muted px-4 py-3 hover:bg-surface-bright/5 hover:text-text-primary transition-all duration-300" href="#">
        <span className="material-symbols-outlined">videocam</span>
        <span className="font-label-md text-label-md">Video Resume</span>
      </a>
      <a className="flex items-center gap-3 text-text-muted px-4 py-3 hover:bg-surface-bright/5 hover:text-text-primary transition-all duration-300" href="#">
        <span className="material-symbols-outlined">chat</span>
        <span className="font-label-md text-label-md">Messages</span>
      </a>
      <a className="flex items-center gap-3 text-text-muted px-4 py-3 hover:bg-surface-bright/5 hover:text-text-primary transition-all duration-300" href="#">
        <span className="material-symbols-outlined">settings</span>
        <span className="font-label-md text-label-md">Settings</span>
      </a>
    </nav>
    
    <div className="px-gutter mt-auto mb-md">
      <button className="w-full bg-primary-container text-white py-3 rounded-lg font-label-md text-label-md font-bold hover:brightness-110 transition-all">
        Record New Visume
      </button>
    </div>
    
    <div className="flex flex-col gap-1 border-t border-outline-variant pt-md">
      <a className="flex items-center gap-3 text-text-muted px-4 py-2 hover:text-text-primary" href="#">
        <span className="material-symbols-outlined">help</span>
        <span className="font-label-md text-label-md">Help Center</span>
      </a>
      <a className="flex items-center gap-3 text-text-muted px-4 py-2 hover:text-text-primary" href="#">
        <span className="material-symbols-outlined">logout</span>
        <span className="font-label-md text-label-md">Logout</span>
      </a>
    </div>
  </aside>
);

const TopBar = () => (
  <header className="h-16 flex justify-between items-center px-gutter w-full glass-header sticky top-0 z-40 bg-surface-container/70">
    <div className="flex items-center gap-4">
      <h2 className="font-headline-md text-headline-md text-text-primary">Senior Product Designer</h2>
      <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold border border-secondary/20">Active</span>
    </div>
    
    <div className="flex items-center gap-gutter">
      <div className="flex items-center gap-6">
        <a className="text-text-muted font-medium hover:text-text-primary text-body-md font-body-md transition-colors" href="#">Discover</a>
        <a className="text-primary-container font-bold border-b-2 border-primary-container pb-1 text-body-md font-body-md" href="#">Applications</a>
        <a className="text-text-muted font-medium hover:text-text-primary text-body-md font-body-md transition-colors" href="#">Messages</a>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-surface-bright/10 p-2 rounded-full hover:bg-surface-bright/20 transition-colors">
          <span className="material-symbols-outlined text-text-primary">search</span>
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
          <img alt="Recruiter Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNf2pjUzrkRvM99OTMYedpfBrRYOSG-5UPAj6qQ6cIPo2L33Fm5Jq39erhvobw6e_WZT_lykFSQ_AZVn20xTjCiJOUgUz5-eDAXvMTz9-xcbod8siIyiAm_AtZiBlg25B43ctasBZcoGJsUozrMmZutznU9iMgqWR9jw8NMW1uWfJyO6rM5zdMwtLU0a8eOnB7LpjjN1BL5ywIOivbPgQwBZux3jlfQz65oNm6diIcOqCCJUIRPp7UnvVAU87HkNnfUmd3jnK9NB0" />
        </div>
      </div>
    </div>
  </header>
);

const CandidateCard = ({ name, role, match, img, tags, actions, indicatorColor, additionalContent, className }) => (
  <div className={`candidate-card p-4 rounded-xl relative group ${className || ''}`}>
    <div className="absolute left-2 top-1/2 -translate-y-1/2 drag-handle">
      <span className="material-symbols-outlined text-text-muted text-sm">drag_indicator</span>
    </div>
    <div className="flex justify-between items-start mb-3 ml-4">
      <div className={`w-12 h-12 rounded-lg overflow-hidden border ${indicatorColor ? `border-${indicatorColor}/40 ring-2 ring-${indicatorColor}/40` : 'border-outline-variant'}`}>
        <img alt={name} className="w-full h-full object-cover" src={img} />
      </div>
      <div className="text-right">
        {match && (
          <span className="text-secondary font-bold text-label-md flex items-center gap-1 bg-secondary/10 px-2 py-0.5 rounded-full border border-secondary/20">
            <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span> {match}
          </span>
        )}
        {!match && indicatorColor && (
          <span className={`material-symbols-outlined text-${indicatorColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        )}
      </div>
    </div>
    <div className="ml-4">
      <h4 className="font-bold text-text-primary text-body-md mb-1">{name}</h4>
      <p className="text-text-muted text-label-md">{role}</p>
    </div>
    
    {(tags || actions || additionalContent) && (
      <div className="mt-4 flex justify-between items-center ml-4">
        {tags && (
          <div className="flex -space-x-2">
            {tags.map(tag => (
              <span key={tag} className="bg-surface-container-high text-[10px] px-2 py-1 rounded-full text-text-muted border border-outline-variant/30">{tag}</span>
            ))}
          </div>
        )}
        {additionalContent}
        
        {actions && (
          <div className="quick-actions flex gap-1 ml-auto">
            {actions.map((act, i) => (
              <button key={i} className={`p-1.5 hover:bg-${act.color}/20 rounded-md text-text-muted hover:text-${act.color} transition-colors`}>
                <span className="material-symbols-outlined text-sm">{act.icon}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
);

const HiringPipeline = () => {
  return (
    <div className="flex min-h-screen bg-background text-text-primary font-body-md overflow-x-hidden">
      <Sidebar />
      <main className="ml-[240px] flex-1 flex flex-col h-screen overflow-hidden">
        <TopBar />
        
        {/* Kanban Board Area */}
        <div className="flex-1 overflow-x-auto p-gutter no-scrollbar bg-background">
          <div className="flex gap-gutter h-full">
            
            {/* Applied Column */}
            <div className="kanban-column flex flex-col">
              <div className="p-4 flex items-center justify-between border-b border-outline-variant/30">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-status-applied"></span>
                  <span className="font-headline-sm text-headline-sm text-text-primary">Applied</span>
                </div>
                <span className="bg-surface-container-highest px-2 py-0.5 rounded text-xs text-text-muted font-bold">12</span>
              </div>
              <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 no-scrollbar">
                <CandidateCard 
                  name="Alexandria Chen" role="UX/UI Designer" match="94%" 
                  img="https://lh3.googleusercontent.com/aida-public/AB6AXuCb7aycUNrC_dcxW5mCfNPMdbLUmmBy5DomHlX7GcBOzNVzU2u4qBlqovfKd25iG9iVJYz3RUbAtVV6iRh7P64NOiPAzHrQUeItgkxA6LopELrYU-9mx_yuvh5FE5UJWBpBfd4np1w6HYiNfsBHPg3FZM0morVkYbxFYdNaa6pU3K-n4n-Swirqjo7CmbgWb3U1bhe-KgYKQ3d1IRdDQPu1C5ImZbGMCVAlWsm_QdCunzq75K0mlcawC8Cy6Ab0kA_0xLdAmzpqL8M"
                  tags={["Figma", "React"]}
                  actions={[{icon: 'visibility', color: 'primary-container'}, {icon: 'calendar_today', color: 'status-interview'}, {icon: 'close', color: 'danger'}]}
                />
                <CandidateCard 
                  name="Marcus Thorne" role="Sr. Interaction Lead" match="88%" 
                  img="https://lh3.googleusercontent.com/aida-public/AB6AXuCZctDYqtMjFv0u7J6PhTjTJksL2v6gifATEojpKm6WU7HhzAmRLvYFDPSKUqs36w2uTBnsV2kZOQW3UFj4QySBLWqHCW0v9lZb4S-EoUOp1nl97I4Hbwkx4r23Iaz--jimHhqzS9EuQJ4htRv-kxp_K717x1mXyqh-nNNgBPOgUjHh5ysRhKtnRSRWofqz0QwzWB1wsKYdxpWWjOCpB71o3-6_SViwvTA6uQ1t4Zv2DBMTOnZ_FBQ-90ldb4CgBe48C6iBSPdoSgw"
                  actions={[{icon: 'visibility', color: 'primary-container'}, {icon: 'calendar_today', color: 'status-interview'}, {icon: 'chevron_right', color: 'primary-container'}]}
                />
              </div>
            </div>
            
            {/* Under Review Column */}
            <div className="kanban-column flex flex-col">
              <div className="p-4 flex items-center justify-between border-b border-outline-variant/30">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-status-review"></span>
                  <span className="font-headline-sm text-headline-sm text-text-primary">Under Review</span>
                </div>
                <span className="bg-surface-container-highest px-2 py-0.5 rounded text-xs text-text-muted font-bold">8</span>
              </div>
              <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 no-scrollbar">
                <CandidateCard 
                  name="Elena Rodriguez" role="Lead Visual Designer" match="91%" className="border-l-4 border-l-status-review"
                  img="https://lh3.googleusercontent.com/aida-public/AB6AXuAlwDQAy5QlGpWNLolDggCYwF9JluVPSf3tAU1v319-dpA1ORD_iEi-1s1__afCtCZK7jnrW0vrbkx9DfnrAhy6HmAWclhfKkxyVyfyXgrwIzFJ8LOFVH5OoNmtHZJO9yqRPZHZTy1WncZLZUmrkCClfvMjOG04YePel9Q5-6esPJusratx2IxZzOWeYuPp61qL86TUV9vfRDRHaU2222-RnVu_etNTBn52SfPnIYcH67y_y0xSTtp4NcUrLwKZ-518lM2oHgErI38"
                  additionalContent={<span className="text-[10px] text-status-review font-medium uppercase tracking-widest">Watching 2m 14s</span>}
                  actions={[{icon: 'visibility', color: 'primary-container'}]}
                />
              </div>
            </div>
            
            {/* Shortlisted Column */}
            <div className="kanban-column flex flex-col">
              <div className="p-4 flex items-center justify-between border-b border-outline-variant/30">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-status-shortlist"></span>
                  <span className="font-headline-sm text-headline-sm text-text-primary">Shortlisted</span>
                </div>
                <span className="bg-surface-container-highest px-2 py-0.5 rounded text-xs text-text-muted font-bold">4</span>
              </div>
              <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 no-scrollbar">
                <CandidateCard 
                  name="Jordan Smith" role="Principal UI Engineer" match="97%" indicatorColor="primary-container"
                  img="https://lh3.googleusercontent.com/aida-public/AB6AXuDHxrOwaCtrGnO4Bj7ORGWcUNAn9hnXh2iBj2fwieaWtwLC_dsAB00rMbzAdjVcDe5w_PSiOdK7JofsLfhXKKVp3XLI1ew3pJ1HXugTOvf-kuo40F-MZ3Pdqk-rHkHjEfnUVtxHiUt6vu6Z5Z1WtYgVDVqwExKZVb3dTC5qaJlkZTTNca6M5cR8ekkV9KrtM6eOlR5SFyZmxoWeoeU0NkANT_VHxeBusxkWLYUvb4R7IEe4YbKPvs-6wdJ6dVj-zJlMF7AidWJ3iZU"
                  additionalContent={
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      <span className="w-2 h-2 rounded-full bg-primary/40"></span>
                      <span className="w-2 h-2 rounded-full bg-primary/20"></span>
                    </div>
                  }
                  actions={[{icon: 'calendar_today', color: 'status-interview'}]}
                />
              </div>
            </div>
            
            {/* Interview Scheduled Column */}
            <div className="kanban-column flex flex-col">
              <div className="p-4 flex items-center justify-between border-b border-outline-variant/30">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-status-interview"></span>
                  <span className="font-headline-sm text-headline-sm text-text-primary">Interview Scheduled</span>
                </div>
                <span className="bg-surface-container-highest px-2 py-0.5 rounded text-xs text-text-muted font-bold">3</span>
              </div>
              <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 no-scrollbar">
                <CandidateCard 
                  name="Sophie Varma" role="Creative Strategist" match="92%"
                  img="https://lh3.googleusercontent.com/aida-public/AB6AXuCr8TaMDc7SQideTS3fz1XQl9QnecnFn_axBahlB4ApmIB6KCdvo5fukzape7_aYkMP3gbAEaFHrE0ARpQvMdfJfeoGhu3T2X8ULkb4RiNrRyDNjj-vjH9nc1EowBySl8MKHTuPAu3nVRWVp8koag7d_gYRgTkdzqTynTbFHCNYHW5pG8TZTpqekVr6fUzF29rKJrdAQiu8HRKH8dXrwwZ4n-YZdh_dOGsK080HENtVD5tZG6iEmW8doDP9_FlxM9VjvxZGhDoD_jo"
                  additionalContent={
                    <div className="p-2 bg-status-interview/5 border border-status-interview/20 rounded-lg w-full mr-4">
                      <p className="text-[10px] text-status-interview font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">event</span> TOMORROW 2:00 PM
                      </p>
                    </div>
                  }
                />
              </div>
            </div>
            
            {/* Hired Column */}
            <div className="kanban-column flex flex-col">
              <div className="p-4 flex items-center justify-between border-b border-outline-variant/30">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-status-hired"></span>
                  <span className="font-headline-sm text-headline-sm text-text-primary">Hired</span>
                </div>
                <span className="bg-surface-container-highest px-2 py-0.5 rounded text-xs text-text-muted font-bold">2</span>
              </div>
              <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 no-scrollbar opacity-70 grayscale-[0.2]">
                <CandidateCard 
                  name="David Kim" role="UX Design Lead" indicatorColor="status-hired" className="bg-status-hired/5 border-status-hired/20"
                  img="https://lh3.googleusercontent.com/aida-public/AB6AXuBhqMEsCHIL-1Vp14FRKuDCnKRM1CP0_WDpLMQm8gJcj_B-rRSeQ07xQUYU8F9wMJSEKDu07eRlQTKF2PT8sFnfEklp3Wj8S1oZ5Rac-srkI_1GruEhLeFO5JSErp8pcqkt_xjgNiG8_jXjf1weKseBp33HWtI7eTtcM1ZcGvFroq03_bIfLfSs-CRhLUtKRy5Xalq51R7IgB13Yvft9CNvtQJUFDeDKR-S49P6mqZXNQhjOeHN3WX10qFxPzmg9006tjeGCgSEK-4"
                />
              </div>
            </div>
            
            <div className="w-gutter h-full flex-shrink-0"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HiringPipeline;
