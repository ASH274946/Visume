import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const initialPipelineData = {
  applied: [
    {
      id: 'c1',
      name: "Alexandria Chen", role: "UX/UI Designer", match: "94%", 
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCb7aycUNrC_dcxW5mCfNPMdbLUmmBy5DomHlX7GcBOzNVzU2u4qBlqovfKd25iG9iVJYz3RUbAtVV6iRh7P64NOiPAzHrQUeItgkxA6LopELrYU-9mx_yuvh5FE5UJWBpBfd4np1w6HYiNfsBHPg3FZM0morVkYbxFYdNaa6pU3K-n4n-Swirqjo7CmbgWb3U1bhe-KgYKQ3d1IRdDQPu1C5ImZbGMCVAlWsm_QdCunzq75K0mlcawC8Cy6Ab0kA_0xLdAmzpqL8M",
      tags: ["Figma", "React"],
      actions: [{icon: 'visibility', color: 'primary-container'}, {icon: 'calendar_today', color: 'status-interview'}, {icon: 'close', color: 'danger'}]
    },
    {
      id: 'c2',
      name: "Marcus Thorne", role: "Sr. Interaction Lead", match: "88%", 
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZctDYqtMjFv0u7J6PhTjTJksL2v6gifATEojpKm6WU7HhzAmRLvYFDPSKUqs36w2uTBnsV2kZOQW3UFj4QySBLWqHCW0v9lZb4S-EoUOp1nl97I4Hbwkx4r23Iaz--jimHhqzS9EuQJ4htRv-kxp_K717x1mXyqh-nNNgBPOgUjHh5ysRhKtnRSRWofqz0QwzWB1wsKYdxpWWjOCpB71o3-6_SViwvTA6uQ1t4Zv2DBMTOnZ_FBQ-90ldb4CgBe48C6iBSPdoSgw",
      actions: [{icon: 'visibility', color: 'primary-container'}, {icon: 'calendar_today', color: 'status-interview'}, {icon: 'chevron_right', color: 'primary-container'}]
    }
  ],
  review: [
    {
      id: 'c3',
      name: "Elena Rodriguez", role: "Lead Visual Designer", match: "91%", className: "border-l-4 border-l-status-review",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlwDQAy5QlGpWNLolDggCYwF9JluVPSf3tAU1v319-dpA1ORD_iEi-1s1__afCtCZK7jnrW0vrbkx9DfnrAhy6HmAWclhfKkxyVyfyXgrwIzFJ8LOFVH5OoNmtHZJO9yqRPZHZTy1WncZLZUmrkCClfvMjOG04YePel9Q5-6esPJusratx2IxZzOWeYuPp61qL86TUV9vfRDRHaU2222-RnVu_etNTBn52SfPnIYcH67y_y0xSTtp4NcUrLwKZ-518lM2oHgErI38",
      additionalContent: <span className="text-[10px] text-status-review font-medium uppercase tracking-widest">Watching 2m 14s</span>,
      actions: [{icon: 'visibility', color: 'primary-container'}]
    }
  ],
  shortlist: [
    {
      id: 'c4',
      name: "Jordan Smith", role: "Principal UI Engineer", match: "97%", indicatorColor: "primary-container",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHxrOwaCtrGnO4Bj7ORGWcUNAn9hnXh2iBj2fwieaWtwLC_dsAB00rMbzAdjVcDe5w_PSiOdK7JofsLfhXKKVp3XLI1ew3pJ1HXugTOvf-kuo40F-MZ3Pdqk-rHkHjEfnUVtxHiUt6vu6Z5Z1WtYgVDVqwExKZVb3dTC5qaJlkZTTNca6M5cR8ekkV9KrtM6eOlR5SFyZmxoWeoeU0NkANT_VHxeBusxkWLYUvb4R7IEe4YbKPvs-6wdJ6dVj-zJlMF7AidWJ3iZU",
      additionalContent: (
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          <span className="w-2 h-2 rounded-full bg-primary/40"></span>
          <span className="w-2 h-2 rounded-full bg-primary/20"></span>
        </div>
      ),
      actions: [{icon: 'calendar_today', color: 'status-interview'}]
    }
  ],
  interview: [
    {
      id: 'c5',
      name: "Sophie Varma", role: "Creative Strategist", match: "92%",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCr8TaMDc7SQideTS3fz1XQl9QnecnFn_axBahlB4ApmIB6KCdvo5fukzape7_aYkMP3gbAEaFHrE0ARpQvMdfJfeoGhu3T2X8ULkb4RiNrRyDNjj-vjH9nc1EowBySl8MKHTuPAu3nVRWVp8koag7d_gYRgTkdzqTynTbFHCNYHW5pG8TZTpqekVr6fUzF29rKJrdAQiu8HRKH8dXrwwZ4n-YZdh_dOGsK080HENtVD5tZG6iEmW8doDP9_FlxM9VjvxZGhDoD_jo",
      additionalContent: (
        <div className="p-2 bg-status-interview/5 border border-status-interview/20 rounded-lg w-full mr-4">
          <p className="text-[10px] text-status-interview font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">event</span> TOMORROW 2:00 PM
          </p>
        </div>
      )
    }
  ],
  hired: [
    {
      id: 'c6',
      name: "David Kim", role: "UX Design Lead", indicatorColor: "status-hired", className: "bg-status-hired/5 border-status-hired/20",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhqMEsCHIL-1Vp14FRKuDCnKRM1CP0_WDpLMQm8gJcj_B-rRSeQ07xQUYU8F9wMJSEKDu07eRlQTKF2PT8sFnfEklp3Wj8S1oZ5Rac-srkI_1GruEhLeFO5JSErp8pcqkt_xjgNiG8_jXjf1weKseBp33HWtI7eTtcM1ZcGvFroq03_bIfLfSs-CRhLUtKRy5Xalq51R7IgB13Yvft9CNvtQJUFDeDKR-S49P6mqZXNQhjOeHN3WX10qFxPzmg9006tjeGCgSEK-4"
    }
  ]
};

const CandidateCard = ({ candidate, columnId, onDragStart, onDragEnd, isDragged }) => {
  const [isDraggable, setIsDraggable] = useState(false);
  const { name, role, match, img, tags, actions, indicatorColor, additionalContent, className } = candidate;

  return (
    <div 
      draggable={isDraggable}
      onDragStart={(e) => onDragStart(e, candidate.id, columnId)}
      onDragEnd={onDragEnd}
      className={`candidate-card p-4 rounded-xl relative group ${className || ''} ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''} ${isDragged ? 'opacity-40 grayscale-[0.5] scale-[0.98]' : ''}`}
    >
      <div 
        className="absolute left-2 top-1/2 -translate-y-1/2 drag-handle w-6 h-10 flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsDraggable(true)}
        onMouseLeave={() => setIsDraggable(false)}
        onTouchStart={() => setIsDraggable(true)}
        onTouchEnd={() => setIsDraggable(false)}
      >
        <span className="material-symbols-outlined text-text-muted text-sm">drag_indicator</span>
      </div>
      <div className="flex justify-between items-start mb-3 ml-4">
        <div className={`w-12 h-12 rounded-lg overflow-hidden border ${indicatorColor ? `border-${indicatorColor}/40 ring-2 ring-${indicatorColor}/40` : 'border-outline-variant'}`}>
          <img alt={name} className="w-full h-full object-cover pointer-events-none" src={img} />
        </div>
        <div className="text-right pointer-events-none">
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
      <div className="ml-4 pointer-events-none">
        <h4 className="font-bold text-text-primary text-body-md mb-1">{name}</h4>
        <p className="text-text-muted text-label-md">{role}</p>
      </div>
      
      {(tags || actions || additionalContent) && (
        <div className="mt-4 flex justify-between items-center ml-4">
          {tags && (
            <div className="flex -space-x-2 pointer-events-none">
              {tags.map(tag => (
                <span key={tag} className="bg-surface-container-high text-[10px] px-2 py-1 rounded-full text-text-muted border border-outline-variant/30">{tag}</span>
              ))}
            </div>
          )}
          <div className="pointer-events-none">{additionalContent}</div>
          
          {actions && (
            <div className="quick-actions flex gap-1 ml-auto">
              {actions.map((act, i) => (
                <button key={i} className={`p-1.5 hover:bg-${act.color}/20 rounded-md text-text-muted hover:text-${act.color} transition-colors z-10 relative`}>
                  <span className="material-symbols-outlined text-sm">{act.icon}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const KanbanColumn = ({ columnId, title, count, colorClass, candidates, onDragStart, onDragEnd, onDragOver, onDrop, isDropping, draggedItemId }) => {
  return (
    <div 
      className={`kanban-column flex flex-col transition-colors duration-200 ${isDropping ? 'bg-surface-bright/10 ring-2 ring-primary-container/50' : ''}`}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, columnId)}
    >
      <div className="p-4 flex items-center justify-between border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${colorClass}`}></span>
          <span className="font-headline-sm text-headline-sm text-text-primary">{title}</span>
        </div>
        <span className="bg-surface-container-highest px-2 py-0.5 rounded text-xs text-text-muted font-bold">{count}</span>
      </div>
      <div className={`flex-1 overflow-y-auto p-3 flex flex-col gap-3 no-scrollbar ${columnId === 'hired' ? 'opacity-70 grayscale-[0.2]' : ''}`}>
        {candidates.map(candidate => (
          <CandidateCard 
            key={candidate.id} 
            candidate={candidate} 
            columnId={columnId} 
            onDragStart={onDragStart} 
            onDragEnd={onDragEnd}
            isDragged={draggedItemId === candidate.id}
          />
        ))}
      </div>
    </div>
  );
};

const HiringPipeline = () => {
  const [columns, setColumns] = useState(initialPipelineData);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);

  const handleDragStart = (e, candidateId, sourceColumnId) => {
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
      setDraggedItem({ candidateId, sourceColumnId });
    }, 0);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    if (dropTarget !== columnId) {
      setDropTarget(columnId);
    }
  };

  const handleDragLeave = () => {
    setDropTarget(null);
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    setDropTarget(null);
    if (!draggedItem) return;

    const { candidateId, sourceColumnId } = draggedItem;
    if (sourceColumnId === targetColumnId) {
      setDraggedItem(null);
      return;
    }

    setColumns(prev => {
      const sourceCol = [...prev[sourceColumnId]];
      const targetCol = [...prev[targetColumnId]];
      
      const itemIndex = sourceCol.findIndex(item => item.id === candidateId);
      if (itemIndex === -1) return prev; // Should not happen, but safeguard
      
      const [item] = sourceCol.splice(itemIndex, 1);
      targetCol.push(item);

      return {
        ...prev,
        [sourceColumnId]: sourceCol,
        [targetColumnId]: targetCol
      };
    });
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDropTarget(null);
  };

  return (
    <>
      {/* Page Header */}
      <div className="px-gutter pt-lg pb-md flex justify-between items-center bg-background border-b border-outline-variant/30 shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="font-display text-headline-md text-text-primary font-bold">Senior Product Designer</h2>
          <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold border border-secondary/20">Active</span>
        </div>
      </div>

      {/* Kanban Board Area */}
      <div className="flex-1 overflow-x-auto p-gutter no-scrollbar bg-background h-full">
        <div className="flex gap-gutter h-full pb-8" onDragLeave={handleDragLeave}>
          
          <KanbanColumn 
            columnId="applied" title="Applied" count={columns.applied.length} colorClass="bg-status-applied"
            candidates={columns.applied} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={(e) => handleDragOver(e, 'applied')} onDrop={handleDrop} isDropping={dropTarget === 'applied'}
            draggedItemId={draggedItem?.candidateId}
          />
          <KanbanColumn 
            columnId="review" title="Under Review" count={columns.review.length} colorClass="bg-status-review"
            candidates={columns.review} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={(e) => handleDragOver(e, 'review')} onDrop={handleDrop} isDropping={dropTarget === 'review'}
            draggedItemId={draggedItem?.candidateId}
          />
          <KanbanColumn 
            columnId="shortlist" title="Shortlisted" count={columns.shortlist.length} colorClass="bg-status-shortlist"
            candidates={columns.shortlist} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={(e) => handleDragOver(e, 'shortlist')} onDrop={handleDrop} isDropping={dropTarget === 'shortlist'}
            draggedItemId={draggedItem?.candidateId}
          />
          <KanbanColumn 
            columnId="interview" title="Interview Scheduled" count={columns.interview.length} colorClass="bg-status-interview"
            candidates={columns.interview} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={(e) => handleDragOver(e, 'interview')} onDrop={handleDrop} isDropping={dropTarget === 'interview'}
            draggedItemId={draggedItem?.candidateId}
          />
          <KanbanColumn 
            columnId="hired" title="Hired" count={columns.hired.length} colorClass="bg-status-hired"
            candidates={columns.hired} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={(e) => handleDragOver(e, 'hired')} onDrop={handleDrop} isDropping={dropTarget === 'hired'}
            draggedItemId={draggedItem?.candidateId}
          />
          
          <div className="w-gutter h-full flex-shrink-0"></div>
        </div>
      </div>
    </>
  );
};

export default HiringPipeline;
