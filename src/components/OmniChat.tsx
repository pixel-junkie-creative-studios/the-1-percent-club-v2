'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

export default function OmniChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end gap-4">
      {/* Initial Popup Message */}
      <AnimatePresence>
        {showPopup && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="glass text-white p-6 rounded-2xl shadow-2xl max-w-[240px] text-[10px] font-mono relative border border-white/10"
          >
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute -top-2 -right-2 bg-white text-black p-1 rounded-full hover:scale-110 transition-transform"
            >
              <X size={10} />
            </button>
            <p className="leading-relaxed">
              <span className="text-accent font-black tracking-widest uppercase block mb-1">OMNI_LINK: ACTIVE</span> 
              Venture engineering interface established. Awaiting technical inquiry.
            </p>
            <div className="absolute bottom-[-6px] right-8 w-3 h-3 bg-black rotate-45 border-b border-r border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[400px] h-[600px] glass border border-white/10 rounded-[40px] overflow-hidden flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.6)] bg-black/80"
          >
            <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="relative">
                   <div className="w-3 h-3 bg-accent rounded-full animate-ping absolute inset-0" />
                   <div className="w-3 h-3 bg-accent rounded-full relative z-10 shadow-[0_0_15px_#3b82f6]" />
                </div>
                <span className="font-mono text-xs font-black tracking-[0.4em] uppercase text-white">Omni Interface</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 p-10 overflow-y-auto font-mono text-[11px] flex flex-col gap-8">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5 max-w-[90%]">
                <p className="text-white/20 mb-4 text-[9px] uppercase tracking-[0.3em] font-bold">System Status: OPTIMAL</p>
                <p className="leading-relaxed text-white/80">
                  Welcome to the 1% Club execution layer. I am Omni, your technical interface. 
                  Institutional Technical Layer v9.2.1 Active. Awaiting directives regarding asset transition, liquidity protocols, or card architecture.
                </p>
              </div>
              
              <div className="self-end bg-accent/20 p-5 rounded-3xl border border-accent/30 max-w-[80%]">
                <p className="text-white font-bold">Requesting 1% Card specifications.</p>
              </div>

              <div className="bg-white/5 p-6 rounded-3xl border border-white/5 max-w-[90%]">
                <p className="leading-relaxed text-white/80">
                  The 1% Card is a hardware-secured liquidity node providing 0.5% exchange fees 
                  and instant access to the ecosystem's internal digital assets. 
                  Current protocol version: v4.6_EXECUTION.
                </p>
              </div>
            </div>

            <div className="p-8 bg-white/[0.02] border-t border-white/5 flex gap-4">
              <input 
                type="text" 
                placeholder="EXECUTE_DIRECTIVE..." 
                className="flex-1 bg-black/60 border border-white/10 rounded-2xl px-6 py-4 font-mono text-[10px] text-white focus:outline-none focus:border-accent transition-colors"
              />
              <button className="bg-white text-black p-4 rounded-2xl hover:scale-110 transition-transform shadow-2xl">
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bot Icon with NEW BOT.gif */}
      <motion.button
        whileHover="hover"
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowPopup(false);
        }}
        className="w-16 h-16 bg-white text-black rounded-[24px] flex items-center justify-center shadow-2xl relative group overflow-hidden border-2 border-accent/20"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-10 border-[2px] border-black rounded-full scale-125"
        />
        
        {isOpen ? (
          <X size={18} />
        ) : (
          <div className="relative w-full h-full p-0">
            <img 
              src="/assets/bot.gif" 
              alt="OmniBot" 
              className="w-full h-full object-cover relative z-10 brightness-[1.1] scale-100"
            />
            
            {/* Glowing Eye Lens Effect - Positioned for the NEW BOT.gif */}
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              variants={{
                hover: {
                  scale: 3,
                  filter: "blur(10px)",
                  opacity: 1
                }
              }}
              className="absolute top-[36%] left-[30%] w-1.5 h-1.5 bg-accent rounded-full z-20 shadow-[0_0_15px_#3b82f6]"
            />
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              variants={{
                hover: {
                  scale: 3,
                  filter: "blur(10px)",
                  opacity: 1
                }
              }}
              className="absolute top-[36%] right-[30%] w-1.5 h-1.5 bg-accent rounded-full z-20 shadow-[0_0_15px_#3b82f6]"
            />
            
            <motion.div
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-accent/20 blur-xl rounded-full scale-110"
            />
          </div>
        )}
      </motion.button>
    </div>
  );
}
