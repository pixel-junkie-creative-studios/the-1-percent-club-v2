'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Cpu, Plus, Trash2 } from 'lucide-react';
import { useBuilder } from '@/context/BuilderContext';
import Editable from '@/components/Editable';

const iconMap: Record<string, any> = {
  "Capital Deployment": Shield,
  "Market Transition": Zap,
  "Liquidity Provisioning": Globe,
  "Technical Architecture": Cpu
};

export default function VentureEngineering() {
  const { config, isBuilderMode, addItem, removeItem } = useBuilder();

  return (
    <section id="infrastructure" className="py-32 px-4 md:px-20 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <Editable path="infrastructure.badge">
            <p className="nav-item text-accent mb-4 tracking-[0.6em] font-bold">
              {config.infrastructure?.badge || "// TECHNICAL FOUNDATIONS"}
            </p>
          </Editable>
          
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            <Editable path="infrastructure.titleTop">
               Technical
            </Editable>
            <br/>
            <Editable path="infrastructure.titleBottom">
               Foundations
            </Editable>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative group/section">
          {config.infrastructure?.items?.map((pillar: any, index: number) => {
            const Icon = iconMap[pillar.title] || Cpu;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-10 rounded-[40px] group hover:border-accent transition-all duration-500 flex flex-col justify-between h-full border border-white/5 relative"
              >
                {isBuilderMode && (
                  <button 
                    onClick={() => removeItem('infrastructure.items', index)}
                    className="absolute top-6 right-6 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-50"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-accent transition-colors duration-500">
                    <Icon size={28} className="text-white" />
                  </div>
                  <Editable path={`infrastructure.items.${index}.title`}>
                    <h3 className="text-2xl font-bold mb-2 tracking-tight">{pillar.title}</h3>
                  </Editable>
                  <Editable path={`infrastructure.items.${index}.label`}>
                    <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest mb-6">{pillar.label}</p>
                  </Editable>
                  <Editable path={`infrastructure.items.${index}.text`}>
                    <p className="text-sm text-white/40 leading-relaxed font-light mb-8">
                      {pillar.text}
                    </p>
                  </Editable>
                </div>
                <div className="pt-6 border-t border-white/5 opacity-40 group-hover:opacity-100 transition-opacity">
                  <p className="font-mono text-[10px] text-accent uppercase tracking-widest">INITIALIZE_PIPELINE()</p>
                </div>
              </motion.div>
            );
          })}

          {isBuilderMode && (
            <button 
              onClick={() => addItem('infrastructure.items', { title: "New Node", label: "Protocol", text: "Technical description..." })}
              className="py-10 border-2 border-dashed border-white/10 rounded-[40px] text-white/20 hover:border-accent hover:text-accent transition-all flex flex-col items-center justify-center gap-4"
            >
              <Plus size={32} />
              <span className="text-[10px] uppercase tracking-widest">Add Node</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
