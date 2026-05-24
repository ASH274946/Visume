import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';

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
    <div className="flex h-screen overflow-hidden bg-background text-text-primary font-body-md selection:bg-primary/30 selection:text-primary antialiased">
      <Sidebar role="recruiter" activePage="pipeline" />
      <div className="flex-grow flex flex-col h-screen overflow-hidden relative">
        <DashboardNavbar role="recruiter" />
        
        {/* Page Header (replaces local TopBar) */}
        <div className="px-gutter pt-lg pb-md flex justify-between items-center bg-background border-b border-outline-variant/30 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="font-display text-headline-md text-text-primary font-bold">Senior Product Designer</h2>
            <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold border border-secondary/20">Active</span>
          </div>
        </div>

        {/* Kanban Board Area */}
        <main className="flex-1 overflow-x-auto p-gutter pt-[104px] no-scrollbar bg-background">
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
        </main>
      </div>
    </div>
  );
};

export default HiringPipeline;
