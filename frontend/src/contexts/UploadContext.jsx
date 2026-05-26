import React, { createContext, useState, useContext } from 'react';
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, doc, setDoc } from 'firebase/firestore';

const UploadContext = createContext();

const withTimeout = (promise, ms, name) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`${name} timed out after ${ms}ms`)), ms))
  ]);
};

export const useUpload = () => useContext(UploadContext);

export const UploadProvider = ({ children }) => {
  const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle', 'uploading', 'success', 'error'
  const [uploadProgress, setUploadProgress] = useState(0);

  const [docUploadStatus, setDocUploadStatus] = useState('idle');
  const [docUploadProgress, setDocUploadProgress] = useState(0);

  const startVideoUpload = async (recordedVideoUrl, resumeData, activeResumeId) => {
    if (!auth.currentUser) {
      alert("You must be logged in to save videos.");
      return;
    }
    
    setUploadStatus('uploading');
    setUploadProgress(0);
    let finalVideoUrl = recordedVideoUrl;
    let localVideoUrl = null;

    try {
      if (recordedVideoUrl && recordedVideoUrl.startsWith('blob:')) {
        const response = await fetch(recordedVideoUrl);
        const blob = await response.blob();
        
        const fileExtension = blob.type.split('/')[1] || 'webm';
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;

        // 1. Upload to Local Backend (10s timeout)
        const formData = new FormData();
        formData.append('file', blob, fileName);
        
        const localUploadPromise = withTimeout(fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/upload`, {
          method: 'POST',
          body: formData
        }), 10000, 'Local Backend Upload')
          .then(res => res.json())
          .then(data => {
            console.log("Local Backend Upload Success:", data.localUrl);
            return data.localUrl;
          })
          .catch(err => {
            console.warn("Local Backend Upload Failed or Timed Out:", err.message);
            return null;
          });

        // 2. Upload to Global Firebase Storage (60s timeout)
        const storageRef = ref(storage, `video-resumes/${auth.currentUser.uid}/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);
        
        const firebaseUploadPromise = withTimeout(new Promise((resolve, reject) => {
          uploadTask.on('state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / Math.max(snapshot.totalBytes, 1)) * 100;
              setUploadProgress(Math.round(progress));
            },
            (error) => reject(error),
            () => resolve()
          );
        }), 60000, 'Firebase Video Upload')
          .then(() => getDownloadURL(storageRef))
          .catch(err => {
            console.warn("Global Firebase Upload skipped or failed:", err.message);
            return null;
          });

        console.log("Waiting for both uploads to finish (or timeout)...");
        const [localVideoUrlResult, finalVideoUrlResult] = await Promise.all([localUploadPromise, firebaseUploadPromise]);
        console.log("Uploads finished. Local:", localVideoUrlResult, "Firebase:", finalVideoUrlResult);
        
        localVideoUrl = localVideoUrlResult;
        if (finalVideoUrlResult) {
          finalVideoUrl = finalVideoUrlResult;
        } else {
          finalVideoUrl = null; // Do not save the dead blob URL
        }
      }

      const finalResumeData = {
        ...resumeData,
        videoUrl: finalVideoUrl,
        localVideoUrl: localVideoUrl
      };

      const videosRef = collection(db, 'candidates', auth.currentUser.uid, 'videoResumes');
      
      if (activeResumeId === 'new') {
        const newDocRef = doc(videosRef);
        await setDoc(newDocRef, finalResumeData);
      } else {
        const docRef = doc(videosRef, activeResumeId);
        await setDoc(docRef, finalResumeData, { merge: true });
      }

      setUploadStatus('success');
      setTimeout(() => {
        setUploadStatus('idle');
        window.location.reload();
      }, 1000);
      window.dispatchEvent(new CustomEvent('visumeVideoUpdated'));
      
    } catch (error) {
      console.error("Error saving video resume in background:", error);
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 5000);
    }
  };

  const startDocumentUpload = async (file, role) => {
    if (!auth.currentUser) {
      alert("You must be logged in to save resumes.");
      return;
    }
    
    setDocUploadStatus('uploading');
    setDocUploadProgress(0);

    try {
      const fileName = `${Date.now()}_${file.name}`;
      const currentProfileData = JSON.parse(localStorage.getItem('visume_profile_data')) || {};

      const formData = new FormData();
      formData.append('file', file);
      
      const localUploadPromise = withTimeout(fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/upload`, {
        method: 'POST',
        body: formData
      }), 10000, 'Local Document Upload')
        .then(res => res.json())
        .then(data => {
          console.log("Local Backend Upload Success:", data.localUrl);
          return data.localUrl;
        })
        .catch(err => {
          console.warn("Local Backend Upload Failed or Timed Out:", err.message);
          return null;
        });

      const storageRef = ref(storage, `resumes/${auth.currentUser.uid}/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      const firebaseUploadPromise = withTimeout(new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / Math.max(snapshot.totalBytes, 1)) * 100;
            setDocUploadProgress(Math.round(progress));
          },
          (error) => reject(error),
          () => resolve()
        );
      }), 60000, 'Firebase Document Upload')
        .then(() => getDownloadURL(storageRef))
        .catch(err => {
          console.warn("Global Firebase Upload skipped or failed:", err.message);
          return null;
        });

      console.log("Waiting for both doc uploads to finish (or timeout)...");
      const [localDocUrl, finalDocUrl] = await Promise.all([localUploadPromise, firebaseUploadPromise]);
      console.log("Doc uploads finished. Local:", localDocUrl, "Firebase:", finalDocUrl);

      const existingResumes = Array.isArray(currentProfileData.documentResumes) ? currentProfileData.documentResumes : [];
      if (existingResumes.length === 0 && currentProfileData.resumeUrl) {
         existingResumes.push({
           id: Date.now() - 1000,
           name: currentProfileData.resumeName || 'Old Resume.pdf',
           url: currentProfileData.resumeUrl,
           localUrl: currentProfileData.localResumeUrl || null,
           uploadedAt: Date.now() - 1000
         });
      }

      const newResume = {
         id: Date.now(),
         name: file.name,
         url: finalDocUrl || null,
         localUrl: localDocUrl || null,
         uploadedAt: Date.now()
      };

      const newData = {
        ...currentProfileData,
        documentResumes: [...existingResumes, newResume],
        resumeName: file.name,
        localResumeUrl: localDocUrl,
        resumeUrl: finalDocUrl || currentProfileData.resumeUrl
      };
      
      localStorage.setItem('visume_profile_data', JSON.stringify(newData));
      const collectionName = role === 'recruiter' ? 'recruiters' : 'candidates';
      await setDoc(doc(db, collectionName, auth.currentUser.uid), newData, { merge: true });

      setDocUploadStatus('success');
      setTimeout(() => {
        setDocUploadStatus('idle');
        window.location.reload();
      }, 1000);
      
      window.dispatchEvent(new CustomEvent('visumeProfileUpdated', { detail: newData }));
      
    } catch (error) {
      console.error("Error saving document in background:", error);
      setDocUploadStatus('error');
      setTimeout(() => setDocUploadStatus('idle'), 5000);
    }
  };

  return (
    <UploadContext.Provider value={{ 
      uploadStatus, 
      uploadProgress, 
      startVideoUpload,
      docUploadStatus,
      docUploadProgress,
      startDocumentUpload
    }}>
      {children}
    </UploadContext.Provider>
  );
};
