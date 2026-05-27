import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUpload } from '../contexts/UploadContext';

const DashboardNavbar = ({ role = 'candidate' }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { uploadStatus, uploadProgress, docUploadStatus, docUploadProgress, startDocumentUpload } = useUpload();

  const handleDocumentUploadClick = () => {
    document.getElementById('navbar-resume-upload').click();
  };
  
  const handleDocumentFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      startDocumentUpload(file, role);
    }
    e.target.value = null; // reset
  };

  const getPageName = (path) => {
    switch (path) {
      case '/dashboard': return 'Dashboard';
      case '/profile': return 'My Profile';
      case '/discover': return 'Browse Jobs';
      case '/applications': return 'Applications';
      case '/recorder': return 'Video Resume';
      case '/recruiter': return 'Dashboard';
      case '/find-candidates': return 'Find Candidates';
      case '/pipeline': return 'Pipeline';
      case '/post-job': return 'Post Job';
      case '/settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  const pageName = getPageName(currentPath);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Removed hardcoded notifications

  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const profileData = JSON.parse(localStorage.getItem('visume_profile_data')) || {};
  const profileImage = profileData.profileImage || (role === 'recruiter'
    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
    : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80");

  const [showNotifications, setShowNotifications] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const notificationRef = useRef(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    import('../firebase').then(({ db, auth }) => {
      import('firebase/firestore').then(({ collection, query, where, onSnapshot, orderBy, limit }) => {
        if (!auth.currentUser) return;
        const currentUserId = auth.currentUser.uid;
        const virtualCurrentUserId = `${currentUserId}_${role === 'recruiter' ? 'recruiter' : 'candidate'}`;
        
        const q = query(
          collection(db, 'notifications'),
          where('userId', '==', virtualCurrentUserId),
          orderBy('timestamp', 'desc'),
          limit(10)
        );
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const notifs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setNotifications(notifs);
        });
        
        return () => unsubscribe();
      });
    });
  }, [role]);

  const markAllRead = async () => {
    try {
      const { db } = await import('../firebase');
      const { doc, deleteDoc } = await import('firebase/firestore');
      for (const n of notifications) {
        await deleteDoc(doc(db, 'notifications', n.id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleNotificationClick = (n) => {
    if (n.type === 'message' && n.chatId) {
      window.dispatchEvent(new CustomEvent('openMessages', { detail: { chatId: n.chatId } }));
    }
    import('../firebase').then(({ db }) => {
      import('firebase/firestore').then(({ doc, deleteDoc }) => {
        deleteDoc(doc(db, 'notifications', n.id));
      });
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
        setIsExpanded(false); // Reset expansion state when closing
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.length;

  return (
    <header className="absolute top-0 left-0 right-0 z-40 px-lg pt-4 pb-2 backdrop-blur-xl bg-background/25 pointer-events-none">
      <nav className="h-16 bg-surface-container/60 border border-outline-variant/65 rounded-xl flex items-center justify-between px-6 pointer-events-auto shadow-lg relative">
        <div className="flex items-center gap-8">
          <h1 className="font-display text-headline-sm font-bold text-text-primary">
            {pageName}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {role === 'candidate' ? (
            <div className="flex items-center gap-2">
              <input 
                type="file" 
                id="navbar-resume-upload" 
                accept=".pdf" 
                className="hidden" 
                onChange={handleDocumentFileChange} 
              />
              <button
                onClick={handleDocumentUploadClick}
                disabled={docUploadStatus === 'uploading'}
                className={`px-5 py-2 rounded-lg text-white font-bold transition-all font-body-md text-body-md shadow-md flex items-center gap-2 ${docUploadStatus === 'uploading' ? 'bg-primary/80 cursor-wait' : docUploadStatus === 'success' ? 'bg-secondary' : docUploadStatus === 'error' ? 'bg-danger' : 'bg-primary hover:opacity-90 active:scale-95'}`}
              >
                {docUploadStatus === 'uploading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Doc... {docUploadProgress}%
                  </>
                ) : docUploadStatus === 'success' ? (
                  <>
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    Uploaded
                  </>
                ) : docUploadStatus === 'error' ? (
                  <>
                    <span className="material-symbols-outlined text-[18px]">error</span>
                    Failed
                  </>
                ) : (
                  'Upload Resume'
                )}
              </button>
              
              <Link
                to="/recorder"
                className={`px-5 py-2 rounded-lg text-white font-bold transition-all font-body-md text-body-md shadow-md flex items-center gap-2 ${uploadStatus === 'uploading' ? 'bg-primary/80 cursor-wait' : uploadStatus === 'success' ? 'bg-secondary' : uploadStatus === 'error' ? 'bg-danger' : 'bg-primary hover:opacity-90 active:scale-95'}`}
                style={{ pointerEvents: uploadStatus === 'uploading' ? 'none' : 'auto' }}
              >
                {uploadStatus === 'uploading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Video... {uploadProgress}%
                  </>
                ) : uploadStatus === 'success' ? (
                  <>
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    Uploaded
                  </>
                ) : uploadStatus === 'error' ? (
                  <>
                    <span className="material-symbols-outlined text-[18px]">error</span>
                    Failed
                  </>
                ) : (
                  'Upload Video'
                )}
              </Link>
            </div>
          ) : (
            <Link
              to="/post-job"
              className="bg-primary px-5 py-2 rounded-lg text-white font-bold hover:opacity-90 active:scale-95 transition-all font-body-md text-body-md shadow-md"
            >
              Post a Job
            </Link>
          )}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant hover:border-primary transition-all text-text-muted hover:text-text-primary shrink-0"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-danger rounded-full border border-surface-container animate-pulse"></span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-surface-container-highest border border-outline-variant rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container">
                  <h3 className="font-bold text-text-primary font-body-md">Notifications</h3>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-primary font-bold hover:underline">Mark all read</button>
                  )}
                </div>
                <div className={`overflow-y-auto custom-scrollbar transition-all duration-300 ${isExpanded ? 'max-h-[60vh]' : 'max-h-64'}`}>
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-text-muted text-sm">No new notifications.</div>
                  ) : (
                    notifications.map(n => {
                      return (
                        <div 
                          key={n.id} 
                          onClick={() => handleNotificationClick(n)}
                          className={`p-4 border-b border-outline-variant/50 cursor-pointer transition-colors flex items-start gap-3 bg-primary-container/10 border-l-2 border-l-primary`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-primary text-white`}>
                            <span className="material-symbols-outlined text-[16px]">{n.type === 'message' ? 'forum' : 'notifications'}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm mb-1 text-text-primary font-bold`}>{n.title}</p>
                            <p className="text-xs text-text-muted mb-1 truncate">{n.body}</p>
                            <p className="text-[10px] text-text-muted">
                              {n.timestamp?.toDate ? n.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="p-3 border-t border-outline-variant text-center bg-surface-container">
                  <button onClick={() => setIsExpanded(!isExpanded)} className="text-sm text-primary font-bold hover:underline">
                    {isExpanded ? 'Show Less' : 'View All'}
                  </button>
                </div>
              </div>
            )}
          </div>
          <Link
            to="/settings"
            state={{ role: role, tab: 'profile' }}
            className="w-10 h-10 rounded-full bg-surface-bright flex items-center justify-center border border-outline-variant overflow-hidden cursor-pointer hover:border-primary transition-all shrink-0"
          >
            <img alt="Profile" className="w-full h-full object-cover" src={profileImage} referrerPolicy="no-referrer" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default DashboardNavbar;
