'use client';

import { motion } from 'framer-motion';
import { 
  Palette, 
  TrendingUp, 
  Truck, 
  FileText, 
  Briefcase, 
  Code, 
  RefreshCcw,
  ShieldCheck,
  Globe2,
  Plus,
  Trash2,
  LineChart
} from 'lucide-react';
import { useBuilder } from '@/context/BuilderContext';
import Editable from '@/components/Editable';

const iconMap: Record<string, any> = {
  "Strategic Brand Positioning": Palette,
  "Global Supply Chain Orchestration": Truck,
  "Fiscal Compliance & Strategic Audit": FileText,
  "Personal Trading & Portfolio Management": LineChart,
  "Institutional Asset Architecture": Briefcase,
  "Full-Stack Technical Engineering": Code
};

export default function Services() {
  const { config, isBuilderMode, addItem, removeItem } = useBuilder();

  return (
    <section id="services" className="py-32 px-4 md:px-20 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <Editable path="services.badge">
            <p className="nav-item text-accent mb-4 tracking-[0.8em] font-bold">
              {config.services?.badge || "// SERVICE INFRASTRUCTURE"}
            </p>
          </Editable>
          
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            <Editable path="services.titleTop">Full-Spectrum</Editable>
            <br/>
            <Editable path="services.titleBottom">Execution.</Editable>
          </h2>
          
          <Editable path="services.description" className="mt-8">
            <p className="text-xl text-white/40 max-w-3xl font-light leading-relaxed">
              {config.services?.description || "Operating as a high-performance execution layer, we provide the technical and financial infrastructure required to transition raw concepts into market-dominant entities."}
            </p>
          </Editable>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative group/section">
          {config.services?.items?.map((service: any, index: number) => {
            const Icon = iconMap[service.title] || Briefcase;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="glass p-10 rounded-[32px] border border-white/5 hover:border-accent transition-all duration-500 flex flex-col group h-full relative"
              >
                {isBuilderMode && (
                  <button 
                    onClick={() => removeItem('services.items', index)}
                    className="absolute top-6 right-6 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-50"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                <div className="flex justify-between items-start mb-10">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent transition-colors duration-500">
                    <Icon size={24} className="text-white" />
                  </div>
                  <Editable path={`services.items.${index}.tag`}>
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{service.tag}</span>
                  </Editable>
                </div>
                
                <Editable path={`services.items.${index}.title`}>
                  <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                </Editable>
                
                <Editable path={`services.items.${index}.desc`} className="flex-1">
                  <p className="text-sm text-white/40 leading-relaxed font-light">
                    {service.desc}
                  </p>
                </Editable>

                <div className="mt-8 pt-6 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-mono text-accent cursor-pointer hover:underline">ACCESS_PROTOCOL()</span>
                </div>
              </motion.div>
            );
          })}

          {isBuilderMode && (
            <button 
              onClick={() => addItem('services.items', { title: "New Service", desc: "Description...", tag: "Category" })}
              className="py-10 border-2 border-dashed border-white/10 rounded-[32px] text-white/20 hover:border-accent hover:text-accent transition-all flex flex-col items-center justify-center gap-4"
            >
              <Plus size={32} />
              <span className="text-[10px] uppercase tracking-widest">Add Service Box</span>
            </button>
          )}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-3 glass p-16 rounded-[40px] border border-accent/20 bg-accent/5 flex flex-col md:flex-row gap-12 items-center relative overflow-hidden"
          >
            <div className="flex-1">
               <div className="flex items-center gap-4 mb-6">
                 <RefreshCcw className="text-accent animate-spin-slow" size={32} />
                 <Editable path="exchange.title">
                   <h3 className="text-4xl font-black italic tracking-tighter uppercase">{config.exchange?.title || "Global Exchange Protocol"}</h3>
                 </Editable>
               </div>
               <Editable path="exchange.description">
                 <p className="text-xl text-white/60 font-light leading-relaxed mb-8">
                   {config.exchange?.description || "Bypassing traditional financial friction with our hyper-low-fee exchange protocol. Execute global capital movements at 0.5% fees—engineered for high-velocity founders."}
                 </p>
               </Editable>
               <div className="flex gap-8">
                 <div>
                    <Editable path="exchange.fee">
                      <p className="text-2xl font-bold text-white">{config.exchange?.fee || "0.5%"}</p>
                    </Editable>
                    <p className="text-[10px] uppercase tracking-widest text-white/20">Protocol Fee</p>
                 </div>
                 <div>
                    <Editable path="exchange.speed">
                      <p className="text-2xl font-bold text-white">{config.exchange?.speed || "INSTANT"}</p>
                    </Editable>
                    <p className="text-[10px] uppercase tracking-widest text-white/20">Settlement Speed</p>
                 </div>
               </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
               <div className="glass p-6 rounded-2xl border border-white/5 text-center">
                  <ShieldCheck className="mx-auto mb-3 text-accent" size={24} />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Secured</p>
               </div>
               <div className="glass p-6 rounded-2xl border border-white/5 text-center">
                  <Globe2 className="mx-auto mb-3 text-accent" size={24} />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Global</p>
               </div>
               <div className="lg:col-span-2 glass p-6 rounded-2xl border border-white/5 flex items-center justify-center">
                  <span className="text-[10px] font-mono text-white/40 tracking-[0.4em]">INITIATE_EXCHANGE_PIPELINE</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
