'use client';

import { Canvas } from '@react-three/fiber';
import { Preload, View } from '@react-three/drei';
import { Suspense } from 'react';
import Galaxy from './Galaxy';

export default function Scene() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[0]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ 
          antialias: true, 
          powerPreference: "high-performance",
          alpha: true 
        }}
        dpr={[1, 2]}
      >
        {/* Set background to black but ensure it's the layer 0 */}
        <color attach="background" args={['#000000']} />
        <Suspense fallback={null}>
          <Galaxy />
          <View.Port />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
