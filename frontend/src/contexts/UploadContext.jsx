import React, { createContext, useState, useContext } from 'react';
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, doc, setDoc } from 'firebase/firestore';

const UploadContext = createContext();

export const useUpload = () => useContext(UploadContext);

export const UploadProvider = ({ children }) => {
  const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle', 'uploading', 'success', 'error'
  const [uploadProgress, setUploadProgress] = useState(0);

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

        // 1. Upload to Local Backend
        const formData = new FormData();
        formData.append('file', blob, fileName);
        try {
          const backendRes = await fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            body: formData
          });
          const backendData = await backendRes.json();
          localVideoUrl = backendData.localUrl;
          console.log("Local Backend Upload Success:", localVideoUrl);
        } catch (err) {
          console.error("Local Backend Upload Failed:", err);
        }

        // 2. Upload to Global Firebase Storage with Timeout
        const storageRef = ref(storage, `video-resumes/${auth.currentUser.uid}/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);
        
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / Math.max(snapshot.totalBytes, 1)) * 100;
          setUploadProgress(Math.round(progress));
        });

        // Create a timeout promise (15 seconds)
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Firebase upload timed out')), 15000)
        );

        try {
          // Wait for upload to complete or timeout
          await Promise.race([uploadTask, timeoutPromise]);
          finalVideoUrl = await getDownloadURL(storageRef);
        } catch (err) {
          console.warn("Global Firebase Upload skipped or failed:", err.message);
          // If it fails or times out, we still have the localVideoUrl!
          finalVideoUrl = null; // Do not save the dead blob URL
        }
      }

      // Update the resumeData object with the new URLs
      const finalResumeData = {
        ...resumeData,
        videoUrl: finalVideoUrl,
        localVideoUrl: localVideoUrl
      };

      // 3. Save to Firestore
      const videosRef = collection(db, 'candidates', auth.currentUser.uid, 'videoResumes');
      
      if (activeResumeId === 'new') {
        const newDocRef = doc(videosRef);
        await setDoc(newDocRef, finalResumeData);
      } else {
        const docRef = doc(videosRef, activeResumeId);
        await setDoc(docRef, finalResumeData, { merge: true });
      }

      setUploadStatus('success');
      setTimeout(() => setUploadStatus('idle'), 5000); // Reset to idle after 5 seconds
      
    } catch (error) {
      console.error("Error saving video resume in background:", error);
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 5000); // Reset to idle after 5 seconds
    }
  };

  return (
    <UploadContext.Provider value={{ uploadStatus, uploadProgress, startVideoUpload }}>
      {children}
    </UploadContext.Provider>
  );
};
