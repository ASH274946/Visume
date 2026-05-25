import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CustomSelect from '../components/CustomSelect';

const initialPipelineData = {
  applied: [
    {
      id: 'c1',
      name: "Alexandria Chen", role: "UX/UI Designer", match: "94%", 
      img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&h=256&q=80",
      tags: ["Figma", "React"],
      actions: [{icon: 'visibility', color: 'primary-container'}, {icon: 'calendar_today', color: 'status-interview'}, {icon: 'close', color: 'danger'}]
    },
    {
      id: 'c2',
      name: "Marcus Thorne", role: "Sr. Interaction Lead", match: "88%", 
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80",
      actions: [{icon: 'visibility', color: 'primary-container'}, {icon: 'calendar_today', color: 'status-interview'}, {icon: 'chevron_right', color: 'primary-container'}]
    }
  ],
  review: [
    {
      id: 'c3',
      name: "Elena Rodriguez", role: "Lead Visual Designer", match: "91%", className: "border-l-4 border-l-status-review",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80",
      additionalContent: <span className="text-[10px] text-status-review font-medium uppercase tracking-widest">Watching 2m 14s</span>,
      actions: [{icon: 'visibility', color: 'primary-container'}]
    }
  ],
  shortlist: [
    {
      id: 'c4',
      name: "Jordan Smith", role: "Principal UI Engineer", match: "97%", indicatorColor: "primary-container",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&h=256&q=80",
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
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&h=256&q=80",
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
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
    }
  ]
};

const pipelinesData = {
  'senior-product-designer': initialPipelineData,
  'frontend-engineer': {
    applied: [
      {
        id: 'f1',
        name: "Jessica Wong", role: "React Developer", match: "95%",
        img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80",
        tags: ["React", "TypeScript", "Redux"],
        actions: [{icon: 'visibility', color: 'primary-container'}]
      },
      {
        id: 'f2',
        name: "Samuel Jackson", role: "Frontend UI Engineer", match: "89%",
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80",
        tags: ["Vue", "React"],
        actions: [{icon: 'visibility', color: 'primary-container'}, {icon: 'close', color: 'danger'}]
      },
      {
        id: 'f3',
        name: "Aiden Pearce", role: "Junior Web Developer", match: "78%",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
        tags: ["HTML", "CSS"],
        actions: [{icon: 'visibility', color: 'primary-container'}]
      }
    ],
    review: [
      {
        id: 'f4',
        name: "Clara Oswald", role: "Senior Frontend Engineer", match: "98%", className: "border-l-4 border-l-status-review",
        img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&h=256&q=80",
        additionalContent: <span className="text-[10px] text-status-review font-medium uppercase tracking-widest">Watching 1m 02s</span>,
        actions: [{icon: 'visibility', color: 'primary-container'}]
      }
    ],
    shortlist: [
      {
        id: 'f5',
        name: "David Tennant", role: "Frontend Architect", match: "99%", indicatorColor: "primary-container",
        img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&h=256&q=80",
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
    interview: [],
    hired: []
  }
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
  const location = useLocation();
  const [activePipeline, setActivePipeline] = useState(location.state?.pipeline || 'senior-product-designer');
  const [columns, setColumns] = useState(pipelinesData[activePipeline] || pipelinesData['senior-product-designer']);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);

  useEffect(() => {
    setColumns(pipelinesData[activePipeline] || pipelinesData['senior-product-designer']);
  }, [activePipeline]);

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
          <CustomSelect
            name="pipeline"
            value={activePipeline}
            onChange={(e) => setActivePipeline(e.target.value)}
            options={[
              { value: 'senior-product-designer', label: 'Senior Product Designer' },
              { value: 'frontend-engineer', label: 'Frontend Engineer (React)' }
            ]}
            className="w-80 font-display text-headline-sm text-text-primary font-bold border-none bg-transparent hover:bg-surface-container"
          />
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
