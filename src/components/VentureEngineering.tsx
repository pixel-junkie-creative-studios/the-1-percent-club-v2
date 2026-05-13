'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Cpu } from 'lucide-react';

const pillars = [
  {
    title: "Capital Deployment",
    description: "Direct-to-venture investment interface facilitating rapid capital allocation for high-signal initiatives. We bypass traditional gatekeepers to prioritize speed-to-market.",
    icon: Shield,
    stats: "Instant Funding"
  },
  {
    title: "Market Transition",
    description: "Surgical pipelines engineered to transition early-stage concepts into tradeable, institutional-grade global assets through rigorous stress-testing and market alignment.",
    icon: Zap,
    stats: "Clinical Precision"
  },
  {
    title: "Liquidity Provisioning",
    description: "Distributed liquidity nodes utilizing the $1X Coin to ensure seamless internal transactions and ecosystem stability during high-velocity growth phases.",
    icon: Globe,
    stats: "Native Asset Layer"
  },
  {
    title: "Technical Architecture",
    description: "Hardware-accelerated web infrastructure designed for real-time monitoring and management of venture performance at an elite agency scale.",
    icon: Cpu,
    stats: "120 FPS Execution"
  }
];

export default function VentureEngineering() {
  return (
    <section className="py-32 px-4 md:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <p className="nav-item text-accent mb-4 tracking-[0.6em] font-bold">// CORE INFRASTRUCTURE</p>
          <h2 className="section-title">Technical<br/>Foundations</h2>
          <p className="mt-8 text-xl text-white/40 max-w-2xl font-light leading-relaxed">
            Operating on the philosophy that while ideas are the catalyst, execution is the definitive value driver. 
            We provide the hardware and logic required to ship.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[40px] group hover:border-accent transition-all duration-500 flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-accent transition-colors duration-500">
                  <pillar.icon size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-6 tracking-tight">{pillar.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-light mb-8">
                  {pillar.description}
                </p>
              </div>
              <div className="pt-6 border-t border-white/5">
                <p className="font-mono text-[10px] text-accent uppercase tracking-widest">{pillar.stats}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
