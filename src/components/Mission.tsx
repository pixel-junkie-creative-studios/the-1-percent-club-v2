'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ScrambleText from './ScrambleText';
import { useBuilder } from '@/context/BuilderContext';
import Editable from '@/components/Editable';
import { Plus, Trash2 } from 'lucide-react';

export default function Mission() {
  const { config, isBuilderMode, addItem, removeItem } = useBuilder();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const words = (config.mission?.text || "SCALING ENTREPRENEURIAL DREAMS. 1% Idea. 99% Execution. We eliminate intermediation to prioritize raw shipping speed.").split(" ");

  return (
    <section id="mission" ref={containerRef} className="relative min-h-[150vh] flex items-center justify-center bg-transparent px-8 overflow-hidden">
      <motion.div 
        style={{ y, opacity }}
        className="max-w-6xl w-full"
      >
        <h2 className="text-[10px] font-mono text-white/30 mb-12 tracking-[0.5em] uppercase">
          <Editable path="mission.badge">
            <ScrambleText text={config.mission?.badge || "02 // MISSION STATEMENT"} />
          </Editable>
        </h2>
        
        <Editable path="mission.text" className="flex flex-wrap gap-x-6 gap-y-4">
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
        </Editable>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12 relative group/section">
          {config.mission?.boxes?.map((item: any, i: number) => (
            <div key={i} className="font-mono relative group">
              <Editable path={`mission.boxes.${i}.title`}>
                <p className="text-[9px] text-white/30 uppercase tracking-widest mb-2">{item.title}</p>
              </Editable>
              <Editable path={`mission.boxes.${i}.text`}>
                <p className="text-xl text-white uppercase">{item.text}</p>
              </Editable>
              
              {isBuilderMode && (
                <button 
                  onClick={() => removeItem('mission.boxes', i)}
                  className="absolute -top-2 -right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          ))}

          {isBuilderMode && (
            <button 
              onClick={() => addItem('mission.boxes', { title: "NEW LABEL", text: "NEW VALUE" })}
              className="border border-dashed border-white/10 rounded-xl p-4 flex items-center justify-center text-white/20 hover:border-accent hover:text-accent transition-all"
            >
              <Plus size={16} />
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
