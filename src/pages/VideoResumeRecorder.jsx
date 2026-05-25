import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const VideoResumeRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const toggleRecording = () => setIsRecording(!isRecording);
  const togglePrompt = () => setShowPrompt(!showPrompt);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-lg items-stretch">
        {/* Left Panel: Recording Interface */}
        <section className="lg:w-[60%] flex flex-col gap-sm">
          <div className="flex justify-between items-end mb-2">
            <h1 className="font-headline-lg text-headline-lg text-text-primary">Record Your Visume</h1>
            <div className="flex items-center gap-2 text-text-muted">
              <span className="material-symbols-outlined text-body-sm">help</span>
              <span className="font-label-md text-label-md uppercase tracking-wider">Instructions</span>
            </div>
          </div>
          
          <div className="relative w-full camera-area rounded-xl overflow-hidden bg-surface-dim border border-border-input flex flex-col items-center justify-center group aspect-video">
            {/* Placeholder UI */}
            {!isRecording && (
              <div className="flex flex-col items-center gap-4 text-text-muted z-20">
                <div className="w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center border border-outline-variant">
                  <span className="material-symbols-outlined text-[40px]">videocam</span>
                </div>
                <p className="font-body-md text-body-md">Camera will appear here</p>
              </div>
            )}
            
            {/* Active Recording Overlay */}
            {isRecording && (
              <div className="absolute inset-0 z-20 pointer-events-none p-md flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-danger/30">
                    <span className="w-2.5 h-2.5 bg-danger rounded-full recording-pulse animate-pulse"></span>
                    <span className="font-label-md text-label-md font-bold text-danger tracking-widest">REC</span>
                  </div>
                  <div className="bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
                    <span className="font-mono text-body-md text-white">00:47 / 02:00</span>
                  </div>
                </div>
                
                {/* Teleprompter Area */}
                {showPrompt && (
                  <div className="max-w-md mx-auto bg-black/60 backdrop-blur-md p-md rounded-xl border border-white/5 text-center mb-4">
                    <p className="font-body-md text-white/90 leading-relaxed italic">
                      "Hi, I'm a Senior Product Designer with 6 years of experience in AI-driven platforms. I'm passionate about building human-centric tools that solve complex data problems..."
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Video Background simulation */}
            <img 
              className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:opacity-30 transition-opacity z-10" 
              alt="Studio Background"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuADcgmg_gOsBnBOrEA-z9hCrjge7rRhCcdQ2wwbPtCubR_od0pzjKBg-JdWg3wKV7NOiBEJc76xLQQSJj3fEzmh1eucqm_m6cE0KTq1XNhmwk76NEzMlboCyBuxgKYY1ei_6nQr57q16zw3LODP7medT7fat1FIId7pCp3fF5ORSzzNQauGj9uyF9QcVCjetJVIG5J9GANfzAytlvLWo5bNrFPEjSREhce3gKCsu-33ZdRNSLYgC0IDE6b92E_mzPRtgIveNg3QbMQ" 
            />
          </div>
          
          {/* Controls */}
          <div className="glass-panel p-md rounded-xl flex items-center justify-between" style={{ background: 'rgba(19, 19, 26, 0.7)', backdropFilter: 'blur(12px)', border: '1px solid #2A2A3E' }}>
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleRecording}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg font-headline-sm transition-all hover:brightness-110 active:scale-95 shadow-lg ${isRecording ? 'bg-danger text-white' : 'bg-primary-container text-on-primary-container shadow-primary-container/20'}`}
              >
                <span className="material-symbols-outlined" style={isRecording ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  {isRecording ? 'pause' : 'mic'}
                </span>
                {isRecording ? 'Stop' : 'Record'}
              </button>
              <button className="w-12 h-12 flex items-center justify-center border border-outline-variant rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-bright/10 transition-colors">
                <span className="material-symbols-outlined">stop_circle</span>
              </button>
              <button className="flex items-center gap-2 text-text-muted font-body-md hover:text-text-primary px-3 py-2 transition-colors">
                <span className="material-symbols-outlined">replay</span>
                Re-record
              </button>
            </div>
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={showPrompt} onChange={togglePrompt} />
                <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
              </label>
              <span className="font-label-md text-label-md text-text-muted">Teleprompter</span>
            </div>
          </div>
        </section>
        
        {/* Right Panel: Tips & Upload */}
        <aside className="lg:w-[40%] flex flex-col gap-lg">
          <div className="glass-panel p-lg rounded-xl flex flex-col gap-md" style={{ background: 'rgba(19, 19, 26, 0.7)', backdropFilter: 'blur(12px)', border: '1px solid #2A2A3E' }}>
            <h2 className="font-headline-md text-headline-md text-text-primary flex items-center gap-2">
              Tips for a Great Visume
              <span className="material-symbols-outlined text-secondary">tips_and_updates</span>
            </h2>
            <ul className="flex flex-col gap-sm">
              {[
                "Keep it under 2 minutes for maximum engagement.",
                "Ensure your face is well-lit and the background is clean.",
                "Speak clearly and maintain \"eye contact\" with the lens.",
                "Start with a strong hook about your unique value.",
                "Wear professional attire that reflects your industry."
              ].map((tip, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'wght' 700" }}>check</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant">{tip}</p>
                </li>
              ))}
            </ul>
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest text-text-muted bg-[#13131A] px-4 w-fit mx-auto">
                OR
              </div>
            </div>
            
            <div className="border-2 border-dashed border-outline-variant rounded-xl p-lg flex flex-col items-center justify-center text-center hover:border-primary-container/50 hover:bg-surface-bright/5 transition-all cursor-pointer group">
              <span className="material-symbols-outlined text-[32px] text-text-muted group-hover:text-primary-container transition-colors mb-3">cloud_upload</span>
              <h3 className="font-headline-sm text-headline-sm text-text-primary mb-1">Upload Existing Video</h3>
              <p className="font-body-sm text-body-sm text-text-muted">Supports MP4, MOV, or WEBM (Max 100MB)</p>
            </div>
            
            <button className="w-full bg-primary-container text-on-primary-container font-headline-sm py-4 rounded-lg shadow-lg shadow-primary-container/10 hover:brightness-110 active:scale-[0.98] transition-all mt-4">
              Save & Publish My Visume
            </button>
          </div>
          
          {/* Minimal Footer for right sidebar */}
          <div className="mt-auto pt-lg">
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
