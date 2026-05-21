'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBuilder } from '@/context/BuilderContext';
import Editable from '@/components/Editable';

export default function Navbar() {
  const { config } = useBuilder();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="fixed top-0 left-0 right-0 z-[1000] px-8 py-6 flex justify-between items-center bg-black/20 backdrop-blur-md border-b border-white/5"
        >
          <div className="flex items-center gap-6 group cursor-pointer">
            <motion.div
              whileHover="hover"
              className="relative"
            >
              <motion.div 
                variants={{
                  hover: { opacity: 1, scale: 1.5, filter: "blur(20px)" }
                }}
                initial={{ opacity: 0 }}
                className="absolute inset-0 bg-accent/30 rounded-full"
              />
              
              <motion.div
                variants={{
                  hover: { rotateY: 360, scale: 1.15 }
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative z-10"
              >
                <Editable path="branding.logoPath" type="image">
                  <img 
                    src={config.branding.logoPath || "/assets/logo_transparent.jpg"} 
                    alt="1% Club" 
                    className="w-14 h-14 object-contain"
                  />
                </Editable>
              </motion.div>
            </motion.div>
            
            <div className="flex flex-col">
              <Editable path="branding.name">
                <span className="font-black italic tracking-tighter text-2xl leading-none">{config.branding.name || "THE 1% CLUB"}</span>
              </Editable>
              <Editable path="branding.subtitle">
                <span className="text-[8px] font-mono tracking-[0.5em] text-white/30 uppercase group-hover:text-accent transition-colors">
                  {config.branding.subtitle || "Execution Pipeline"}
                </span>
              </Editable>
            </div>
          </div>

          <div className="hidden md:flex gap-12">
            {config.navigation.links.map((link, i) => (
              <a 
                key={i}
                href={link.href} 
                className="nav-item hover:text-accent transition-colors relative group py-2"
              >
                <Editable path={`navigation.links.${i}.name`}>
                  {link.name}
                </Editable>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </div>

          <Editable path="navigation.cta">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-black rounded-xl font-black tracking-widest text-[11px] uppercase transition-all"
            >
              {config.navigation.cta || "Enter Terminal"}
            </motion.button>
          </Editable>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
