'use client';

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Suspense } from 'react';
import Galaxy from './Galaxy';

export default function GalaxyWrapper() {
  return (
    <div className="fixed inset-0 w-full h-full bg-black z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }} 
        dpr={[1, 2]}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance" 
        }}
        style={{ 
          width: '100%', 
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <Suspense fallback={null}>
          <Galaxy />
          <Preload all />
        </Suspense>
      </Canvas>
      
      {/* Absolute Background Branding - LAYERED BEHIND CONTENT */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-20">
        <h2 className="text-[18vw] font-black text-white/[0.04] uppercase tracking-tighter select-none whitespace-nowrap">
          99% Execution // 1% Idea
        </h2>
      </div>
    </div>
  );
}
