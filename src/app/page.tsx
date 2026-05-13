'use client';

import { Suspense, useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import VentureEngineering from '@/components/VentureEngineering';
import Services from '@/components/Services';
import FintechSection from '@/components/FintechSection';
import CoinSection from '@/components/CoinSection';
import AppSection from '@/components/AppSection';
import LogoMarquee from '@/components/LogoMarquee';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import LoadingScreen from '@/components/LoadingScreen';
import OmniChat from '@/components/OmniChat';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && isMounted) {
      const sections = gsap.utils.toArray('section');
      sections.forEach((section: any) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }
  }, [isLoading, isMounted]);

  return (
    <div className="bg-transparent">
      <LoadingScreen onFinish={() => setIsLoading(false)} />
      
      {isMounted && !isLoading && (
        <SmoothScroll>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-transparent" 
          >
            <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            
            <CustomCursor />
            <Navbar />
            <OmniChat />
            
            <main className="relative z-10 bg-transparent">
              <section id="hero" className="bg-transparent">
                <Hero />
              </section>

              <section id="marquee" className="border-y border-white/5 bg-transparent">
                <div className="py-12 text-center">
                  <p className="nav-item opacity-40 mb-12 tracking-[1em] uppercase text-[10px]">Ecosystem Market Alignment</p>
                  <LogoMarquee />
                </div>
              </section>

              <section id="pillars" className="bg-transparent">
                <VentureEngineering />
              </section>

              <section id="services" className="bg-transparent">
                <Services />
              </section>

              <section id="mission" className="py-40 px-4 md:px-20 border-y border-white/5 bg-transparent">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                  >
                    <p className="nav-item text-accent mb-6 tracking-[0.8em] font-bold uppercase text-[12px]">// THE MISSION</p>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 leading-[1] text-white">
                      Prioritizing Raw<br/>Market Execution.
                    </h2>
                    <p className="text-2xl text-white/50 font-light leading-relaxed mb-12 max-w-2xl">
                      Standard intermediation creates friction that kills momentum. Our mission is to eliminate 
                      this barrier, providing founders with the clinical pipeline required to transition 
                      raw concepts into tradeable global assets at high velocity.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="glass p-16 rounded-[60px] border border-white/10 bg-transparent relative"
                  >
                    <h3 className="text-4xl font-black italic tracking-tighter mb-8 uppercase">Ecosystem Philosophy</h3>
                    <p className="text-lg text-white/60 font-light leading-relaxed mb-12">
                      We operate on the definitive philosophy that while many possess a "1% Idea," true value 
                      is generated through the "99% Execution" phase.
                    </p>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center py-5 border-b border-white/5">
                        <span className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-bold">Intermediation</span>
                        <span className="text-[11px] font-mono text-accent font-black">MINIMAL</span>
                      </div>
                      <div className="flex justify-between items-center py-5">
                        <span className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-bold">Shipping Speed</span>
                        <span className="text-[11px] font-mono text-accent font-black">MAXIMAL</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>
              
              <section id="fintech" className="bg-transparent">
                <FintechSection />
              </section>

              <section id="liquidity" className="bg-transparent">
                <CoinSection />
              </section>

              <section id="app" className="bg-transparent">
                <AppSection />
              </section>
            </main>

            <footer className="p-24 border-t border-white/5 font-mono text-[10px] text-muted flex flex-col md:flex-row justify-between items-center gap-12 bg-transparent relative z-10">
              <div className="flex gap-12">
                <span className="nav-item cursor-pointer font-bold text-white uppercase tracking-widest">THE 1% CLUB 2026</span>
              </div>
            </footer>
          </motion.div>
        </SmoothScroll>
      )}
    </div>
  );
}
