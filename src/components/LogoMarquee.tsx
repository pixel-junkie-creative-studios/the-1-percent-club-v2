'use client';

import { motion } from 'framer-motion';

const logos = Array.from({ length: 30 }, (_, i) => `/logos/${i + 1}.jpg`);

export default function LogoMarquee() {
  return (
    <div className="w-full overflow-hidden bg-transparent py-10 relative">
      <div className="absolute inset-0 z-10 pointer-events-none bg-transparent" />
      
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{
          x: [0, -2000],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="flex-shrink-0 w-32 h-32 relative group">
            <img
              src={logo}
              alt={`Startup Logo ${index % 30 + 1}`}
              className="w-full h-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
