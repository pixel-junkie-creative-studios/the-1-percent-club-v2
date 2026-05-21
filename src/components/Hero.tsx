'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, Send } from 'lucide-react';
import { useBuilder } from '@/context/BuilderContext';
import Editable from '@/components/Editable';

export default function Hero() {
  const { config } = useBuilder();
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    // GSAP Staggered Text Reveal
    const chars = gsap.utils.toArray('.char');
    gsap.fromTo(chars, 
      { opacity: 0, y: 100, rotateX: -90 },
      { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        duration: 1, 
        stagger: 0.02, 
        ease: "power4.out",
        delay: 0.5
      }
    );
  }, [config.hero.titleTop, config.hero.titleBottom]); // Re-run if text changes via builder

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block">{char === " " ? "\u00A0" : char}</span>
    ));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData);
    alert(`Proposal for "${data.concept}" submitted. Technical audit in progress. Notification sent to KULTXABSOLUTE@GMAIL.COM`);
    setIsFormOpen(false);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col justify-center px-4 md:px-20 overflow-hidden pt-20">
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Editable path="hero.badge">
            <span className="nav-item text-accent tracking-[1em] font-bold uppercase text-[12px]">
              {config.hero.badge || "// Venture Engineering Layer 01"}
            </span>
          </Editable>
        </motion.div>

        <h1 ref={textRef} className="text-6xl md:text-[160px] font-black leading-[0.85] tracking-tighter uppercase mb-16 perspective-[1000px]">
          <div className="overflow-hidden py-2">
            <Editable path="hero.titleTop">
              {splitText(config.hero.titleTop || "The 1%")}
            </Editable>
          </div>
          <div className="overflow-hidden py-2 text-white">
            <Editable path="hero.titleBottom">
              {splitText(config.hero.titleBottom || "Club.")}
            </Editable>
          </div>
        </h1>

        <div className="flex flex-col md:flex-row items-end justify-between gap-12">
          <Editable path="hero.description" className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-xl md:text-3xl text-white/40 font-light leading-tight"
            >
              {config.hero.description || "A high-performance infrastructure designed to bridge the gap between raw concept and market dominance."}
            </motion.p>
          </Editable>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex gap-4"
          >
             <Editable path="hero.primaryCta">
               <button 
                 onClick={() => window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' })}
                 className="px-10 py-5 bg-white text-black font-black tracking-widest text-[11px] uppercase rounded-xl hover:bg-accent hover:text-white transition-all duration-500 shadow-2xl"
               >
                  {config.hero.primaryCta || "Initialize Pipeline"}
               </button>
             </Editable>
             <Editable path="hero.secondaryCta">
               <button 
                 onClick={() => setIsFormOpen(true)}
                 className="px-10 py-5 border border-white/10 text-white font-black tracking-widest text-[11px] uppercase rounded-xl hover:bg-white/10 transition-all duration-500"
               >
                  {config.hero.secondaryCta || "Pitch Your Billion Dollar Idea"}
               </button>
             </Editable>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="relative z-10 w-full max-w-2xl glass p-12 rounded-[50px] border border-white/10"
            >
              <button 
                onClick={() => setIsFormOpen(false)}
                className="absolute top-10 right-10 text-white/20 hover:text-white transition-colors"
              >
                <X size={32} />
              </button>

              <h2 className="text-4xl font-black italic tracking-tighter mb-8 uppercase">Initiate Proposal</h2>
              <form onSubmit={handleFormSubmit} className="space-y-8">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Concept Name</label>
                  <input name="concept" required type="text" placeholder="Billion Dollar Concept..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 font-mono text-[11px] text-white focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Technical Details</label>
                  <textarea name="details" required rows={4} placeholder="Explain the technical infrastructure..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 font-mono text-[11px] text-white focus:outline-none focus:border-accent transition-colors resize-none" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 mb-3 block">Founder Contact</label>
                  <input name="contact" required type="email" placeholder="founder@domain.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 font-mono text-[11px] text-white focus:outline-none focus:border-accent transition-colors" />
                </div>
                <button type="submit" className="w-full py-6 bg-white text-black font-black tracking-[0.3em] text-[11px] uppercase rounded-2xl hover:bg-accent hover:text-white transition-all duration-500 shadow-2xl flex items-center justify-center gap-4">
                  <Send size={16} />
                  Transmit Proposal
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
