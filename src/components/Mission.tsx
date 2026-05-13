'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ScrambleText from './ScrambleText';

export default function Mission() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const words = "SCALING ENTREPRENEURIAL DREAMS. 1% Idea. 99% Execution. We eliminate intermediation to prioritize raw shipping speed.".split(" ");

  return (
    <section ref={containerRef} className="relative min-h-[150vh] flex items-center justify-center bg-transparent px-8 overflow-hidden">
      <motion.div 
        style={{ y, opacity }}
        className="max-w-6xl w-full"
      >
        <h2 className="text-[10px] font-mono text-white/30 mb-12 tracking-[0.5em] uppercase">
          <ScrambleText text="02 // MISSION STATEMENT" />
        </h2>
        <div className="flex flex-wrap gap-x-6 gap-y-4">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              viewport={{ once: false, margin: "-10%" }}
              className="text-5xl md:text-8xl font-bold tracking-tighter text-white uppercase mix-blend-difference"
            >
              {word}
            </motion.span>
          ))}
        </div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
          {[
            { label: "Infrastructure", val: "Institutional" },
            { label: "Pipeline", val: "Clinical" },
            { label: "Scaling", val: "Exponential" }
          ].map((item, i) => (
            <div key={i} className="font-mono">
              <p className="text-[9px] text-white/30 uppercase tracking-widest mb-2">{item.label}</p>
              <p className="text-xl text-white uppercase">{item.val}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
