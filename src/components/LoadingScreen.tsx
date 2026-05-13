'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [symbols, setSymbols] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Coding symbols/numbers animation - FASTER as requested
    const chars = '0123456789ABCDEF<>[]{}//--__==++**&&%%$$##@@!!';
    const symbolInterval = setInterval(() => {
      let result = '';
      for (let i = 0; i < 30; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setSymbols(result);
    }, 30); // Higher frequency for high-velocity look

    // Progress bar for 5 seconds
    const duration = 5000;
    const interval = 50;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          clearInterval(symbolInterval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onFinish, 1000);
          }, 500);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => {
      clearInterval(timer);
      clearInterval(symbolInterval);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[3000] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* High-Speed Background Matrix - LARGER TEXT as requested */}
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none flex flex-wrap gap-8 p-12 font-mono text-[16px] text-accent overflow-hidden break-all leading-relaxed mix-blend-screen">
             {Array.from({ length: 150 }).map((_, i) => (
               <motion.span 
                 key={i}
                 animate={{ opacity: [0.1, 0.8, 0.1] }}
                 transition={{ duration: 0.1, repeat: Infinity, delay: Math.random() }}
               >
                 {symbols}
               </motion.span>
             ))}
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.85, 1.05, 0.85], 
              opacity: 1,
              filter: ["blur(0px)", "blur(15px)", "blur(0px)"]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative mb-24"
          >
            <div className="absolute inset-0 bg-accent/40 blur-[120px] rounded-full scale-150" />
            <img 
              src="/assets/logo_transparent.jpg" 
              alt="1% Club" 
              className="w-48 h-48 md:w-72 md:h-72 object-contain relative z-10 brightness-[1.2]"
            />
          </motion.div>

          <div className="relative w-80 md:w-[600px]">
            <div className="flex justify-between items-end mb-6 font-mono text-[12px] uppercase tracking-[0.6em] font-black">
              <span className="text-accent animate-pulse">Initializing_Venture_Pipeline...</span>
              <span className="text-white">{Math.round(progress)}%</span>
            </div>
            <div className="h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-white shadow-[0_0_40px_#fff]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            {/* Added sub-bar for more detail */}
            <div className="mt-4 flex justify-between font-mono text-[8px] text-white/20 uppercase tracking-widest">
              <span>Memory_Allocated</span>
              <span>Buffer_Clear</span>
              <span>Sync_Complete</span>
            </div>
          </div>

          <div className="mt-16 font-mono text-[12px] text-accent/40 uppercase tracking-[0.8em] flex flex-col items-center gap-4">
            <span className="font-black">{symbols}</span>
            <span className="text-white/20">Institutional Technical Layer v9.2.1 Active</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
