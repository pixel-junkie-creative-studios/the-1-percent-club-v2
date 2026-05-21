'use client';

import React, { useState, useEffect } from 'react';
import { useBuilder } from '@/context/BuilderContext';
import { motion } from 'framer-motion';
import { X, Save, ChevronRight, Terminal, Upload } from 'lucide-react';

export default function BuilderSidebar() {
  const { config, isBuilderMode, selectedElement, setSelectedElement, updateConfig, toggleBuilderMode } = useBuilder();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [ghToken, setGhToken] = useState('');
  const [showInitButton, setShowInitButton] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setGhToken(localStorage.getItem('1percent_club_gh_token') || '');
      
      const urlParams = new URLSearchParams(window.location.search);
      const hasEditParam = urlParams.has('edit') || urlParams.has('admin');
      const wasAdminBefore = localStorage.getItem('1percent_club_is_admin') === 'true';

      if (hasEditParam || wasAdminBefore) {
        setShowInitButton(true);
        localStorage.setItem('1percent_club_is_admin', 'true');
      }
    }
  }, []);

  useEffect(() => {
    if (!isBuilderMode) return;
    
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.builder-sidebar') && !target.closest('.editable-element')) {
        setSelectedElement(null);
      }
    };
    
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isBuilderMode, setSelectedElement]);

  const getNestedValue = (path: string) => {
    try {
      return path.split('.').reduce((obj, key) => obj[key], config as any);
    } catch (e) {
      return '';
    }
  };

  const handleValueChange = (value: any) => {
    if (selectedElement) {
      updateConfig(selectedElement, value);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const res = await fetch('/api/save-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-github-token': localStorage.getItem('1percent_club_gh_token') || '',
        },
        body: JSON.stringify({ config })
      });
      const data = await res.json();
      if (data.success) {
        alert("CONFIGURATION_SYNCHRONIZED: Changes committed to repository. Vercel is now building your live site!");
      } else {
        alert(`Sync failed: ${data.message || data.error}`);
      }
    } catch (e) {
      console.error(e);
      alert("Network error: failed to publish changes.");
    } finally {
      setIsPublishing(false);
    }
  };

  if (!isBuilderMode) {
    if (!showInitButton) return null;
    return (
      <button 
        onClick={toggleBuilderMode}
        className="fixed bottom-8 left-8 z-[2000] bg-white text-black p-4 rounded-2xl shadow-2xl hover:scale-110 transition-transform font-black tracking-widest text-[10px] uppercase flex items-center gap-3 border border-accent/20"
      >
        <Terminal size={16} className="text-accent" />
        Initialize_Builder
      </button>
    );
  }

  const isImageField = selectedElement && (
    selectedElement.includes('logo') || 
    selectedElement.includes('Asset') || 
    selectedElement.includes('asset') ||
    selectedElement.includes('Path') ||
    selectedElement.endsWith('image')
  );

  return (
    <div className="fixed inset-y-0 right-0 w-[400px] z-[2000] flex builder-sidebar">
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        className="relative w-full h-full glass border-l border-white/10 bg-black/80 backdrop-blur-xl p-10 flex flex-col gap-10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
      >
        <header className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Visual Builder</h2>
            <p className="text-[9px] text-white/30 tracking-widest uppercase mt-2">Real-Time Execution</p>
          </div>
          <button onClick={toggleBuilderMode} className="text-white/20 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-8">
          {/* GitHub Auth Settings */}
          <div className="space-y-4 p-5 border border-white/5 bg-white/5 rounded-2xl">
            <label className="text-[9px] uppercase tracking-[0.2em] text-white/40 block font-bold">GitHub Token (Vercel Deployments)</label>
            <input 
              type="password" 
              placeholder="Paste GitHub PAT (repo scope)..." 
              value={ghToken}
              onChange={(e) => {
                setGhToken(e.target.value);
                localStorage.setItem('1percent_club_gh_token', e.target.value);
              }}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 font-mono text-[10px] text-white outline-none focus:border-accent"
            />
            <p className="text-[8px] text-white/25 leading-normal uppercase">
              Only required if running on Vercel. Saves in your local browser storage.
            </p>
          </div>

          <div className="h-px bg-white/5" />

          {selectedElement ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.3em] text-accent font-black">Path: {selectedElement}</label>
                <div className="h-px bg-white/10 w-full" />
              </div>

              {isImageField ? (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[9px] uppercase tracking-widest text-white/40">Asset URL / Path</label>
                    <input 
                      type="text"
                      value={getNestedValue(selectedElement) || ''}
                      onChange={(e) => handleValueChange(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 font-mono text-[11px] text-white outline-none focus:border-accent"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[9px] uppercase tracking-widest text-white/40">Upload New Asset</label>
                    <div className="relative border border-dashed border-white/25 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-accent transition-colors bg-white/[0.02]">
                      <Upload size={24} className="text-white/40" />
                      <span className="text-[10px] text-white/50 text-center font-mono">Drag image or click to upload</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        disabled={isUploading}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          const formData = new FormData();
                          formData.append('file', file);

                          setIsUploading(true);
                          try {
                            const res = await fetch('/api/upload-image', {
                              method: 'POST',
                              headers: {
                                'x-github-token': localStorage.getItem('1percent_club_gh_token') || '',
                              },
                              body: formData
                            });
                            const data = await res.json();
                            if (data.success) {
                              handleValueChange(data.url);
                              alert("Asset uploaded successfully!");
                            } else {
                              alert(`Upload failed: ${data.message || data.error}`);
                            }
                          } catch (err) {
                            console.error(err);
                            alert("Error uploading asset.");
                          } finally {
                            setIsUploading(false);
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                    {isUploading && (
                      <p className="text-[9px] text-accent animate-pulse text-center font-mono uppercase">Uploading binary payload...</p>
                    )}
                  </div>
                </div>
              ) : typeof getNestedValue(selectedElement) === 'string' ? (
                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-widest text-white/40">Text Content</label>
                  <textarea 
                    value={getNestedValue(selectedElement) || ''}
                    onChange={(e) => handleValueChange(e.target.value)}
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 font-mono text-[11px] text-white outline-none focus:border-accent resize-none"
                  />
                </div>
              ) : (
                <div className="text-[10px] text-white/30 italic">Select an element to modify its parameters.</div>
              )}
            </div>
          ) : (
            <div className="h-40 flex flex-col items-center justify-center text-center space-y-6 opacity-30">
               <ChevronRight size={48} className="text-white/20 animate-pulse" />
               <p className="text-[10px] uppercase tracking-[0.4em] font-black leading-relaxed">
                 Click any element on the website<br/>to begin surgical modification.
               </p>
            </div>
          )}
        </div>

        <footer className="pt-10 border-t border-white/10 flex flex-col gap-4">
          <button 
            onClick={handlePublish}
            disabled={isPublishing}
            className="w-full py-5 bg-white text-black font-black tracking-[0.3em] text-[11px] uppercase rounded-2xl hover:bg-accent hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isPublishing ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent" />
            ) : (
              <Save size={16} />
            )}
            {isPublishing ? "PUBLISHING_CHANGES..." : "PUBLISH_TO_LIVE_SITE"}
          </button>
          <p className="text-[8px] text-center text-white/20 uppercase tracking-widest font-mono">Execution Node v1.0.0-Builder</p>
        </footer>
      </motion.div>
    </div>
  );
}
