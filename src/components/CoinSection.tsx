'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, Suspense } from 'react';
import { Float, useTexture, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';

function CoinMesh() {
  const texture = useTexture('/assets/coin_final.png');
  
  useEffect(() => {
    if (texture) {
      // Maximize texture sharpness
      texture.anisotropy = 16;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.flipY = false; 
      texture.needsUpdate = true;
    }
  }, [texture]);

  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // ULTRA-SLOW ROTATION to prevent blur and ensure visibility
    groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.2; 
    groupRef.current.rotation.x = Math.cos(t * 0.12) * 0.1;
    groupRef.current.rotation.z += 0.0015; 
  });

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
      {/* Reduced size by ~15% (from 1.6 to 1.35) as requested */}
      <group ref={groupRef} scale={1.35}>
        {/* Front Face */}
        <mesh position={[0, 0, 0.1]}>
          <circleGeometry args={[3.4, 64]} />
          <meshBasicMaterial 
            map={texture} 
            transparent={true}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Back Face */}
        <mesh position={[0, 0, -0.1]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[3.4, 64]} />
          <meshBasicMaterial 
            map={texture} 
            transparent={true}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Side Body */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[3.4, 3.4, 0.2, 64]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>
    </Float>
  );
}

export default function CoinSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="liquidity" className="py-40 px-4 md:px-20 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex-1 aspect-square max-w-xl w-full rounded-[60px] relative flex items-center justify-center bg-white/[0.03] border border-white/10 overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-accent/5 blur-[20px] rounded-full opacity-10 pointer-events-none" />
          
          {isMounted && (
            <div className="w-full h-full relative z-10">
              <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
                <Suspense fallback={null}>
                  <CoinMesh />
                  <Preload all />
                </Suspense>
              </Canvas>
            </div>
          )}

          <div className="absolute top-12 left-12 pointer-events-none z-20">
            <p className="nav-item opacity-40 mb-3 tracking-[0.4em] font-bold uppercase text-[10px]">Institutional_Asset</p>
            <h3 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">$1XC CRYPTO TOKEN</h3>
          </div>
        </motion.div>

        <div className="flex-[1.4]">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p className="nav-item text-accent mb-6 tracking-[0.6em] font-bold uppercase">// LIQUIDITY INFRASTRUCTURE</p>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 leading-[1] text-white">
              Surgical<br/>Tokenomics.
            </h2>
            <p className="text-2xl text-white/50 font-light leading-relaxed mb-16 max-w-2xl">
              The $1XC Token is the definitive unit of account within the ecosystem. It provides the 
              clinical hardware required for zero-friction cross-border settlements and institutional 
              liquidity provisioning.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="glass p-10 rounded-[40px] border border-white/5">
                <h4 className="text-accent font-mono text-[11px] mb-4 uppercase tracking-widest">Circulating Supply</h4>
                <p className="text-4xl font-black italic tracking-tighter text-white">21,000,000 $1XC</p>
              </div>
              <div className="glass p-10 rounded-[40px] border border-white/5">
                <h4 className="text-accent font-mono text-[11px] mb-4 uppercase tracking-widest">Deployment Speed</h4>
                <p className="text-4xl font-black italic tracking-tighter text-white">INSTANT</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
