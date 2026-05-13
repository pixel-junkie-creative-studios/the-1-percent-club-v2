'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    title: "Global Liquidity Node",
    desc: "Exchange currency at 0.5% fees—engineered for founders operating across international markets.",
    stat: "0.5%"
  },
  {
    title: "Integrated Architecture",
    desc: "Seamless physical and digital payments with integrated NFC technology and instant settlement.",
    stat: "100%"
  },
  {
    title: "Ecosystem Privileges",
    desc: "Exclusive offers, high-yield cashbacks, and vouchers on major cloud and software platforms.",
    stat: "15%+"
  }
];

export default function FintechSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="fintech" className="py-32 px-4 md:px-20 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32">
        
        {/* Glass Box Container for Card */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex-1 glass p-12 rounded-[50px] relative group border border-white/10"
        >
          <div className="absolute inset-0 bg-accent/20 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div style={{ transform: "translateZ(100px)" }} className="relative z-10">
            <img 
              src="/assets/card.jpg" 
              alt="The 1% Card" 
              className="w-full max-w-sm mx-auto rounded-[24px] shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            />
            <div className="mt-12 text-center">
              <h4 className="text-2xl font-black italic tracking-tighter mb-2 uppercase text-white">THE 1% CARD</h4>
              <p className="text-[10px] text-accent font-mono uppercase tracking-[0.6em] font-bold">Hardware Execution Layer</p>
            </div>
          </div>
        </motion.div>

        <div className="flex-[1.4]">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="nav-item text-accent mb-6 tracking-[0.6em] font-bold uppercase">// FINANCIAL INFRASTRUCTURE</p>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-16 leading-[1] text-white">
              Universal Access.<br/>Minimal Friction.
            </h2>
            
            <div className="space-y-16">
              {features.map((f, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-16 items-start group"
                >
                  <div className="text-6xl font-black text-white/10 group-hover:text-white transition-colors duration-500 w-32 shrink-0">
                    {f.stat}
                  </div>
                  <div className="flex-1 border-l border-white/5 pl-10 group-hover:border-accent transition-colors duration-500">
                    <h4 className="text-3xl font-bold mb-4 tracking-tight text-white group-hover:text-accent transition-colors">{f.title}</h4>
                    <p className="text-white/60 text-lg font-light leading-relaxed max-w-xl">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "var(--accent)" }}
              whileTap={{ scale: 0.95 }}
              className="mt-24 px-16 py-8 bg-white text-black rounded-2xl font-black tracking-[0.3em] text-[12px] uppercase transition-all duration-500 shadow-2xl"
            >
              Initialize Card Access
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
