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
  Wallet,
  LineChart
} from 'lucide-react';

const services = [
  {
    title: "Strategic Brand Positioning",
    description: "Developing market-dominant identities and high-velocity growth strategies for venture-backed entities. We translate raw potential into institutional-grade brand equity.",
    icon: Palette,
    tag: "Branding"
  },
  {
    title: "Global Supply Chain Orchestration",
    description: "End-to-end logistics infrastructure and supply chain management engineered for scale, efficiency, and zero-latency movement of physical assets.",
    icon: Truck,
    tag: "Logistics"
  },
  {
    title: "Fiscal Compliance & Strategic Audit",
    description: "Institutional-grade tax planning and technical audit systems to ensure global regulatory alignment and optimized fiscal performance.",
    icon: FileText,
    tag: "Tax & Audit"
  },
  {
    title: "Personal Trading & Portfolio Management",
    description: "Direct stock investment support, crypto asset management, and wallet protection protocols. Strategic capital allocation designed for high-performance ecosystem growth.",
    icon: LineChart,
    tag: "Investment"
  },
  {
    title: "Institutional Asset Architecture",
    description: "Sophisticated portfolio management and capital alignment strategies for high-performance assets, ensuring long-term value preservation and growth.",
    icon: Briefcase,
    tag: "Asset Management"
  },
  {
    title: "Full-Stack Technical Engineering",
    description: "Engineering of web, mobile, and software ecosystems with a focus on performance, scalability, and clinical-grade technical execution.",
    icon: Code,
    tag: "Development"
  }
];

export default function Services() {
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
          <p className="nav-item text-accent mb-4 tracking-[0.8em] font-bold">// SERVICE INFRASTRUCTURE</p>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            Full-Spectrum<br/>Execution.
          </h2>
          <p className="mt-8 text-xl text-white/40 max-w-3xl font-light leading-relaxed">
            Operating as a high-performance execution layer, we provide the technical and financial 
            infrastructure required to transition raw concepts into market-dominant entities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[32px] border border-white/5 hover:border-accent transition-all duration-500 flex flex-col group h-full"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent transition-colors duration-500">
                  <service.icon size={24} className="text-white" />
                </div>
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{service.tag}</span>
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed font-light flex-1">
                {service.description}
              </p>
              <div className="mt-8 pt-6 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-mono text-accent cursor-pointer hover:underline">ACCESS_PROTOCOL()</span>
              </div>
            </motion.div>
          ))}
          
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
                 <h3 className="text-4xl font-black italic tracking-tighter uppercase">Global Exchange Protocol</h3>
               </div>
               <p className="text-xl text-white/60 font-light leading-relaxed mb-8">
                 Bypassing traditional financial friction with our hyper-low-fee exchange protocol. 
                 Execute global capital movements at 0.5% fees—engineered for high-velocity founders.
               </p>
               <div className="flex gap-8">
                 <div>
                    <p className="text-2xl font-bold text-white">0.5%</p>
                    <p className="text-[10px] uppercase tracking-widest text-white/20">Protocol Fee</p>
                 </div>
                 <div>
                    <p className="text-2xl font-bold text-white">INSTANT</p>
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
