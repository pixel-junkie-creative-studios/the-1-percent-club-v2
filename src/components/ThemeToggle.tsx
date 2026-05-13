'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsDark(!isDark)}
      className="fixed top-8 right-8 z-[100] w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/20 backdrop-blur-md overflow-hidden group"
    >
      <motion.div
        animate={{
          rotate: isDark ? 0 : 360,
          y: isDark ? 0 : 0
        }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="relative"
      >
        {isDark ? (
          <Moon className="text-white group-hover:text-blue-400 transition-colors" size={20} />
        ) : (
          <Sun className="text-yellow-400" size={20} />
        )}
      </motion.div>
      
      {/* Background sweep animation */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ y: "100%" }}
        animate={{ y: isDark ? "100%" : "0%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ zIndex: -1 }}
      />
    </motion.button>
  );
}
