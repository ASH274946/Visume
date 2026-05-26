import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CustomSelect from '../components/CustomSelect';
import { db, auth } from '../firebase';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, getDoc } from 'firebase/firestore';

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
  const [recruiterJobs, setRecruiterJobs] = useState([]);
  const [activePipeline, setActivePipeline] = useState('');
  const [columns, setColumns] = useState({ applied: [], review: [], shortlist: [], interview: [], hired: [] });
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    const fetchJobs = async () => {
      const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
      unsubscribe = onSnapshot(q, (snapshot) => {
        const profileData = JSON.parse(localStorage.getItem('visume_profile_data') || '{}');
        const companyName = profileData.companyName || profileData.fullName || 'Unknown Company';
        const recruiterId = auth.currentUser?.uid || '';

        const jobs = snapshot.docs
          .map(docSnap => ({ id: docSnap.id, ...docSnap.data() }))
          .filter(job => (
            recruiterId ? job.recruiterId === recruiterId : job.company === companyName
          ));

        setRecruiterJobs(jobs);
        if (jobs.length > 0) {
           if (!activePipeline) setActivePipeline(location.state?.pipeline || jobs[0].id);
        }
        setJobsLoading(false);
      });
    };
    
    const authUnsubscribe = auth.onAuthStateChanged((user) => {
      if (user) fetchJobs();
    });

    return () => {
      authUnsubscribe();
      if (unsubscribe) unsubscribe();
    };
  }, [activePipeline, location.state?.pipeline]);

  useEffect(() => {
    if (!activePipeline || recruiterJobs.length === 0) return;
    const activeJob = recruiterJobs.find(job => job.id === activePipeline);
    if (!activeJob) return;

    const applicants = Array.isArray(activeJob.applicants) ? activeJob.applicants : [];
    const newCols = { applied: [], review: [], shortlist: [], interview: [], hired: [] };
    
    applicants.forEach(app => {
      const status = app.status || 'applied';
      if (newCols[status]) {
        newCols[status].push({
           id: app.uid,
           name: app.name || 'Candidate',
           role: activeJob.title,
           match: null, 
           img: app.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name || 'Candidate')}&background=6C5CE7&color=fff&size=128`,
           tags: app.skills || [],
           indicatorColor: status === 'shortlist' ? 'primary-container' : status === 'hired' ? 'status-hired' : null,
           actions: [{icon: 'visibility', color: 'primary-container'}],
           status: status,
           resumeId: app.resumeId,
           includeDocumentResume: app.includeDocumentResume
        });
      }
    });

    setColumns(newCols);
  }, [activePipeline, recruiterJobs]);

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

  const handleDrop = async (e, targetColumnId) => {
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
      if (itemIndex === -1) return prev;
      
      const [item] = sourceCol.splice(itemIndex, 1);
      targetCol.push(item);

      return {
        ...prev,
        [sourceColumnId]: sourceCol,
        [targetColumnId]: targetCol
      };
    });
    setDraggedItem(null);

    // Backend update
    try {
       const jobRef = doc(db, 'jobs', activePipeline);
       const jobSnap = await getDoc(jobRef);
       if (jobSnap.exists()) {
           const jobData = jobSnap.data();
           const applicants = Array.isArray(jobData.applicants) ? jobData.applicants : [];
           const updatedApplicants = applicants.map(app => {
              if (app.uid === candidateId) {
                 return { ...app, status: targetColumnId };
              }
              return app;
           });
           await updateDoc(jobRef, { applicants: updatedApplicants });
       }
    } catch (err) {
       console.error("Error updating candidate status", err);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDropTarget(null);
  };

  if (jobsLoading) {
    return <div className="p-8 text-text-muted">Loading pipeline...</div>;
  }

  if (recruiterJobs.length === 0) {
    return <div className="p-8 text-text-muted">No jobs posted yet. Please post a job to see the pipeline.</div>;
  }

  return (
    <>
      {/* Page Header */}
      <div className="px-gutter pt-lg pb-md flex justify-between items-center bg-background border-b border-outline-variant/30 shrink-0">
        <div className="flex items-center gap-4">
          <CustomSelect
            name="pipeline"
            value={activePipeline}
            onChange={(e) => setActivePipeline(e.target.value)}
            options={recruiterJobs.map(job => ({ value: job.id, label: job.title }))}
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
