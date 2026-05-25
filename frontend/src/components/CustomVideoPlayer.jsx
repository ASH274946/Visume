import React, { useState, useRef } from 'react';

const CustomVideoPlayer = ({ src, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  
  const playbackRef = useRef(null);

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

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

  return (
    <div className={`relative group/player bg-black flex flex-col overflow-hidden ${className}`}>
      <video 
        ref={playbackRef}
        src={src}
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
  );
};

export default CustomVideoPlayer;
