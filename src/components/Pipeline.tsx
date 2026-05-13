'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ScrambleText from './ScrambleText';

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  {
    title: "CONCEPT",
    desc: "A clinical pipeline for transitioning community ideas into tradeable global entities.",
    id: "01"
  },
  {
    title: "VALIDATION",
    desc: "Rigorous stress testing of business models and market fit.",
    id: "02"
  },
  {
    title: "ACCELERATION",
    desc: "Rapid deployment of capital and strategic resources.",
    id: "03"
  },
  {
    title: "ASSET",
    desc: "Institutional grade entities ready for global scaling.",
    id: "04"
  }
];

export default function Pipeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    const totalWidth = container.scrollWidth - window.innerWidth;

    gsap.to(container, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: () => `+=${totalWidth}`,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-black overflow-hidden border-y border-white/5">
      <div className="absolute top-10 left-10 z-20">
        <h2 className="text-xs font-mono text-muted tracking-[0.3em]">
          <ScrambleText text="03 // PIPELINE" />
        </h2>
      </div>

      <div 
        ref={containerRef}
        className="horizontal-scroll-container h-full items-center pl-[20vw] pr-[20vw]"
      >
        {PHASES.map((phase) => (
          <div key={phase.id} className="w-[80vw] flex-shrink-0 flex flex-col justify-center px-20">
            <span className="text-[15rem] font-bold text-white/5 leading-none absolute -translate-y-1/2 opacity-20">
              {phase.id}
            </span>
            <h3 className="text-8xl font-bold tracking-tighter mb-8 relative z-10">{phase.title}</h3>
            <p className="max-w-md text-xl text-muted font-mono leading-relaxed relative z-10 uppercase">
              {phase.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
