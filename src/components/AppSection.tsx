'use client';

import { motion } from 'framer-motion';
import { Apple, Play } from 'lucide-react';

export default function AppSection() {
  return (
    <section id="app" className="py-40 px-4 md:px-20 relative overflow-hidden bg-transparent border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 relative"
        >
          {/* Pulsing Aura */}
          <div className="absolute inset-0 bg-accent/20 blur-[150px] rounded-full animate-pulse" />
          
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative z-10 glass p-12 rounded-[60px] border border-white/10 flex items-center justify-center aspect-square max-w-lg mx-auto"
          >
            <img 
              src="/assets/app_logo.jpg" 
              alt="1% Club App" 
              className="w-full h-full object-contain rounded-[40px] shadow-2xl"
            />
          </motion.div>
        </motion.div>

        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <p className="nav-item text-accent mb-6 tracking-[0.8em] font-bold uppercase text-[10px]">// MOBILE ECOSYSTEM</p>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 leading-[1] text-white">
              The Club.<br/>In Your Pocket.
            </h2>
            
            <p className="text-2xl text-white/50 font-light leading-relaxed mb-12 max-w-xl">
              Access the high-performance execution pipeline from anywhere. Monitor investments, 
              execute exchange protocols, and manage your 1% Card in real-time.
            </p>

            <div className="flex flex-wrap gap-6">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-4 px-10 py-5 bg-black/40 border border-white/10 rounded-2xl transition-all duration-500"
              >
                <Apple size={32} />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest opacity-40">Download on the</p>
                  <p className="text-lg font-bold">App Store</p>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-4 px-10 py-5 bg-black/40 border border-white/10 rounded-2xl transition-all duration-500"
              >
                <Play size={32} />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest opacity-40">Get it on</p>
                  <p className="text-lg font-bold">Google Play</p>
                </div>
              </motion.button>
            </div>

            <div className="mt-20 flex gap-12 items-center opacity-30">
               <div className="text-center">
                  <p className="text-2xl font-bold">4.9/5</p>
                  <p className="text-[9px] uppercase tracking-widest">User Rating</p>
               </div>
               <div className="w-px h-10 bg-white/20" />
               <div className="text-center">
                  <p className="text-2xl font-bold">500K+</p>
                  <p className="text-[9px] uppercase tracking-widest">Executions</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
