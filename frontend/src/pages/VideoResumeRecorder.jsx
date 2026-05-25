import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toggle from '../components/Toggle';

const VideoResumeRecorder = () => {
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(false);
  
  const [videoResumes, setVideoResumes] = useState(() => {
    return JSON.parse(localStorage.getItem('visume_video_resumes') || '[]');
  });
  const [activeResumeId, setActiveResumeId] = useState(null);
  const [activeTitle, setActiveTitle] = useState('');

  // Recording & Playback states
  const [recordingStatus, setRecordingStatus] = useState('idle'); // 'idle' | 'recording' | 'recorded'
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
  
  // Custom Video Player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [rawDuration, setRawDuration] = useState(0);
  
  const videoRef = useRef(null);
  const playbackRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    if (videoResumes.length > 0 && !activeResumeId) {
      handleSelectResume(videoResumes[0].id);
    } else if (videoResumes.length === 0 && !activeResumeId) {
      handleCreateNew();
    }
  }, [videoResumes, activeResumeId]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const resetPlaybackState = () => {
    setIsPlaying(false);
    setVideoProgress(0);
    setCurrentTime('00:00');
    setDuration('00:00');
    setRawDuration(0);
  };

  const handleSelectResume = (id) => {
    const resume = videoResumes.find(r => r.id === id);
    if (resume) {
      setActiveResumeId(id);
      setActiveTitle(resume.title);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      setRecordingStatus('idle');
      setRecordedVideoUrl(null);
      chunksRef.current = [];
      resetPlaybackState();
    }
  };

  const handleCreateNew = () => {
    setActiveResumeId('new');
    setActiveTitle('My Video Resume');
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setRecordingStatus('idle');
    setRecordedVideoUrl(null);
    chunksRef.current = [];
    resetPlaybackState();
  };

  const togglePrompt = () => setShowPrompt(!showPrompt);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        videoRef.current.play();
      }
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
        resetPlaybackState();
      };

      mediaRecorder.start();
      setRecordingStatus('recording');
    } catch (err) {
      console.error("Error accessing media devices.", err);
      alert("Could not access camera/microphone. Please ensure permissions are granted.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingStatus === 'recording') {
      mediaRecorderRef.current.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      setRecordingStatus('recorded');
    }
  };

  const toggleRecording = () => {
    if (recordingStatus === 'idle') {
      startRecording();
    } else if (recordingStatus === 'recording') {
      stopRecording();
    }
  };

  const handleReRecord = () => {
    if (recordingStatus === 'recorded') {
      const confirm = window.confirm("Are you sure you want to discard this recording and start over?");
      if (confirm) {
        setRecordedVideoUrl(null);
        setRecordingStatus('idle');
        chunksRef.current = [];
        resetPlaybackState();
      }
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type or extension as a fallback
      if (!file.type.startsWith('video/') && !file.name.match(/\.(mp4|webm|ogg|mov|mkv|avi)$/i)) {
        alert("Please upload a valid video file.");
        e.target.value = null;
        return;
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (mediaRecorderRef.current && recordingStatus === 'recording') {
        mediaRecorderRef.current.stop();
      }

      const fileUrl = URL.createObjectURL(file);
      setRecordedVideoUrl(fileUrl);
      setRecordingStatus('recorded');
      
      // Properly extract filename without extension
      const lastDotIndex = file.name.lastIndexOf('.');
      const nameWithoutExtension = lastDotIndex !== -1 ? file.name.substring(0, lastDotIndex) : file.name;
      setActiveTitle(nameWithoutExtension);
      
      resetPlaybackState();
    }
    // Reset the input value so the same file can be uploaded again if needed
    e.target.value = null;
  };

  // Custom Video Player Handlers
  const handlePlayPause = (e) => {
    if (e) e.stopPropagation();
    if (playbackRef.current) {
      if (isPlaying) {
        playbackRef.current.pause();
      } else {
        playbackRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (playbackRef.current) {
      const current = playbackRef.current.currentTime;
      const dur = playbackRef.current.duration || 0;
      setVideoProgress((current / dur) * 100);
      setCurrentTime(formatTime(current));
    }
  };

  const handleLoadedMetadata = () => {
    if (playbackRef.current) {
      const dur = playbackRef.current.duration;
      setRawDuration(dur);
      setDuration(formatTime(dur));
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    if (playbackRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      playbackRef.current.currentTime = pos * playbackRef.current.duration;
    }
  };

  const handleSave = () => {
    if (!activeTitle.trim()) {
      alert("Please enter a title for your video resume.");
      return;
    }
    
    let updatedResumes = [...videoResumes];
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const finalDuration = duration === '00:00' ? '01:45' : duration;
    
    const thumbnailUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80';
    
    if (activeResumeId === 'new') {
      const newResume = {
        id: Date.now().toString(),
        title: activeTitle,
        date: currentDate,
        duration: finalDuration,
        views: 0,
        thumbnailUrl: thumbnailUrl
      };
      updatedResumes.push(newResume);
      setActiveResumeId(newResume.id);
    } else {
      updatedResumes = updatedResumes.map(r => 
        r.id === activeResumeId ? { ...r, title: activeTitle, date: currentDate, duration: finalDuration } : r
      );
    }
    
    setVideoResumes(updatedResumes);
    localStorage.setItem('visume_video_resumes', JSON.stringify(updatedResumes));
    alert('Video Resume saved successfully!');
    navigate('/dashboard');
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm("Are you sure you want to delete this video resume?");
    if (confirmDelete) {
      const updated = videoResumes.filter(r => r.id !== id);
      setVideoResumes(updated);
      localStorage.setItem('visume_video_resumes', JSON.stringify(updated));
      if (activeResumeId === id) {
        setActiveResumeId(null);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-lg items-stretch">
        {/* Left Panel: Recording Interface */}
        <section className="lg:w-[65%] flex flex-col gap-sm">
          <div className="flex justify-between items-end mb-2">
            <h1 className="font-headline-lg text-headline-lg text-text-primary">
              {activeResumeId === 'new' ? 'Record New Visume' : 'Edit Visume'}
            </h1>
            <div className="flex items-center gap-2 text-text-muted">
              <span className="material-symbols-outlined text-body-sm">help</span>
              <span className="font-label-md text-label-md uppercase tracking-wider">Instructions</span>
            </div>
          </div>

          <div className="mb-4 bg-surface-container border border-outline-variant p-4 rounded-xl flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-body-sm text-text-muted mb-1 font-bold">Resume Title</label>
              <input 
                type="text" 
                value={activeTitle}
                onChange={(e) => setActiveTitle(e.target.value)}
                placeholder="e.g. Lead Designer Pitch, Remote Developer Video..."
                className="w-full bg-surface-bright border border-border-input rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-primary transition-colors font-headline-sm"
              />
            </div>
          </div>
          
          <div className="relative w-full camera-area rounded-xl overflow-hidden bg-surface-dim border border-border-input flex flex-col items-center justify-center group aspect-video bg-black">
            
            {recordingStatus === 'idle' && (
              <div className="flex flex-col items-center gap-4 text-text-muted z-20 absolute inset-0 justify-center bg-black/80">
                <div className="w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center border border-outline-variant">
                  <span className="material-symbols-outlined text-[40px]">videocam</span>
                </div>
                <p className="font-body-md text-body-md">Click Record or Upload to begin</p>
              </div>
            )}
            
            {/* Live Camera Stream */}
            <video 
              ref={videoRef}
              className={`w-full h-full object-cover ${(recordingStatus === 'idle' || recordingStatus === 'recorded') ? 'hidden' : 'block'}`}
            />
            
            {/* Recorded Video Playback with Custom Controls */}
            {recordingStatus === 'recorded' && recordedVideoUrl && (
              <div className="absolute inset-0 z-20 group/player bg-black flex flex-col">
                <video 
                  ref={playbackRef}
                  src={recordedVideoUrl}
                  className="w-full h-full object-contain cursor-pointer"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                  onClick={handlePlayPause}
                />
                
                {/* Custom Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity duration-300 flex flex-col gap-3">
                  {/* Progress Bar */}
                  <div 
                    className="w-full h-2 bg-white/20 rounded-full cursor-pointer relative group/progress"
                    onClick={handleSeek}
                  >
                    <div 
                      className="absolute top-0 left-0 h-full bg-primary rounded-full pointer-events-none transition-all duration-75" 
                      style={{ width: `${videoProgress}%` }}
                    />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity"
                      style={{ left: `calc(${videoProgress}% - 8px)` }}
                    />
                  </div>
                  
                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={handlePlayPause}
                      className="text-white hover:text-primary transition-colors flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10"
                    >
                      <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {isPlaying ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                    <span className="text-white font-mono text-label-md bg-black/40 px-3 py-1 rounded-full border border-white/10">
                      {currentTime} / {duration}
                    </span>
                  </div>
                </div>
                
                {/* Center Play Button Overlay (when paused) */}
                {!isPlaying && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-[0_0_30px_rgba(108,92,231,0.5)] backdrop-blur-sm transform transition-transform scale-100 hover:scale-110">
                      <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {recordingStatus === 'recording' && (
              <div className="absolute inset-0 z-20 pointer-events-none p-md flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-danger/30">
                    <span className="w-2.5 h-2.5 bg-danger rounded-full recording-pulse animate-pulse"></span>
                    <span className="font-label-md text-label-md font-bold text-danger tracking-widest">REC</span>
                  </div>
                </div>
                
                {showPrompt && (
                  <div className="max-w-md mx-auto bg-black/60 backdrop-blur-md p-md rounded-xl border border-white/5 text-center mb-4">
                    <p className="font-body-md text-white/90 leading-relaxed italic">
                      "Hi, I'm a Senior Product Designer with 6 years of experience in AI-driven platforms. I'm passionate about building human-centric tools that solve complex data problems..."
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="glass-panel p-md rounded-xl flex items-center justify-between mt-2" style={{ background: 'rgba(19, 19, 26, 0.7)', backdropFilter: 'blur(12px)', border: '1px solid #2A2A3E' }}>
            <div className="flex items-center gap-4">
              {recordingStatus !== 'recorded' && (
                <button 
                  onClick={toggleRecording}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg font-headline-sm transition-all hover:brightness-110 active:scale-95 shadow-lg ${recordingStatus === 'recording' ? 'bg-danger text-white' : 'bg-primary-container text-on-primary-container shadow-primary-container/20'}`}
                >
                  <span className="material-symbols-outlined" style={recordingStatus === 'recording' ? { fontVariationSettings: "'FILL' 1" } : {}}>
                    {recordingStatus === 'recording' ? 'stop' : 'mic'}
                  </span>
                  {recordingStatus === 'recording' ? 'Stop Recording' : 'Start Recording'}
                </button>
              )}
              
              <button 
                onClick={handleReRecord}
                disabled={recordingStatus !== 'recorded'}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-body-md transition-colors ${recordingStatus === 'recorded' ? 'text-text-primary bg-surface-container hover:bg-surface-bright border border-outline-variant' : 'text-text-muted opacity-50 cursor-not-allowed'}`}
              >
                <span className="material-symbols-outlined">replay</span>
                Re-record
              </button>
              
              <label className={`flex items-center gap-2 font-body-md px-3 py-2 transition-colors cursor-pointer ml-2 ${recordingStatus === 'recording' ? 'text-text-muted opacity-50 cursor-not-allowed' : 'text-text-muted hover:text-text-primary'}`}>
                <span className="material-symbols-outlined">upload</span>
                Upload
                <input 
                  type="file" 
                  accept="video/*" 
                  className="hidden" 
                  disabled={recordingStatus === 'recording'}
                  onChange={handleFileUpload} 
                />
              </label>
            </div>
            <div className="flex items-center gap-3">
              <Toggle
                checked={showPrompt}
                onChange={togglePrompt}
              />
              <span className="font-label-md text-label-md text-text-muted">Teleprompter</span>
            </div>
          </div>
        </section>
        
        {/* Right Panel: Video Resume Library */}
        <aside className="lg:w-[35%] flex flex-col gap-lg">
          <div className="glass-panel p-lg rounded-xl flex flex-col gap-md flex-1" style={{ background: 'rgba(19, 19, 26, 0.7)', backdropFilter: 'blur(12px)', border: '1px solid #2A2A3E' }}>
            <div className="flex justify-between items-center border-b border-border-input pb-4 mb-2">
              <h2 className="font-headline-md text-headline-md text-text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container">video_library</span>
                My Visumes
              </h2>
              <button 
                onClick={handleCreateNew} 
                className="bg-surface-bright hover:bg-surface-container border border-outline-variant text-text-primary p-2 rounded-lg transition-colors flex items-center"
                title="Create New"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3 pr-2" style={{ maxHeight: 'calc(100vh - 350px)' }}>
              {videoResumes.length === 0 ? (
                <div className="text-center py-8 px-4 text-text-muted border border-dashed border-outline-variant rounded-xl">
                  <span className="material-symbols-outlined text-4xl mb-2 opacity-50">videocam_off</span>
                  <p className="font-body-md">You haven't saved any video resumes yet. Record your first one to get started!</p>
                </div>
              ) : (
                videoResumes.map(resume => (
                  <div 
                    key={resume.id} 
                    onClick={() => handleSelectResume(resume.id)}
                    className={`flex gap-3 p-3 rounded-xl border transition-all cursor-pointer ${activeResumeId === resume.id ? 'bg-primary-container/10 border-primary-container' : 'bg-surface-container border-border-input hover:border-outline-variant hover:bg-surface-container-high'}`}
                  >
                    <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 relative border border-outline-variant/30">
                      <img src={resume.thumbnailUrl} alt={resume.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-1 right-1 bg-black/70 px-1 rounded text-[9px] font-bold">{resume.duration}</div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center overflow-hidden">
                      <h4 className="font-label-lg text-label-lg text-text-primary truncate">{resume.title}</h4>
                      <p className="text-text-muted text-[11px] mt-1">{resume.date} • {resume.views} Views</p>
                    </div>
                    <div className="flex flex-col justify-center shrink-0">
                      <button 
                        onClick={(e) => handleDelete(resume.id, e)}
                        className="text-text-muted hover:text-danger p-1 rounded-md transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-border-input mt-auto">
              <button onClick={handleSave} className="w-full bg-primary-container text-on-primary-container font-headline-sm py-4 rounded-lg shadow-lg shadow-primary-container/10 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">save</span>
                Save & Publish Visume
              </button>
            </div>
          </div>
          
          <div className="mt-auto pt-4">
            <p className="font-body-sm text-body-sm text-text-muted text-center mb-4">© 2024 Visume. Personality-driven hiring.</p>
            <div className="flex justify-center gap-6">
              <Link className="font-label-md text-label-md text-text-muted hover:text-secondary transition-colors" to="/privacy">Privacy Policy</Link>
              <Link className="font-label-md text-label-md text-text-muted hover:text-secondary transition-colors" to="/terms">Terms</Link>
              <Link className="font-label-md text-label-md text-text-muted hover:text-secondary transition-colors" to="/about">About Us</Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default VideoResumeRecorder;
