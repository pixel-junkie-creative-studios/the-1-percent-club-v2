'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, Suspense } from 'react';
import { Float, useTexture, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { useBuilder } from '@/context/BuilderContext';
import Editable from '@/components/Editable';

function CoinMesh({ url }: { url: string }) {
  const texture = useTexture(url || '/assets/coin_final.png');
  
  useEffect(() => {
    if (texture) {
      texture.anisotropy = 16;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.flipY = false; 
      texture.needsUpdate = true;
    }
  }, [texture, url]);

  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.2; 
    groupRef.current.rotation.x = Math.cos(t * 0.12) * 0.1;
    groupRef.current.rotation.z += 0.0015; 
  });

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
      <group ref={groupRef} scale={1.35}>
        <mesh position={[0, 0, 0.1]}>
          <circleGeometry args={[3.4, 64]} />
          <meshBasicMaterial 
            map={texture} 
            transparent={true}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0, -0.1]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[3.4, 64]} />
          <meshBasicMaterial 
            map={texture} 
            transparent={true}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[3.4, 3.4, 0.2, 64]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>
    </Float>
  );
}

export default function CoinSection() {
  const { config } = useBuilder();
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
          
          <Editable path="tokenomics.coinAsset" type="image" className="w-full h-full">
            {isMounted && (
              <div className="w-full h-full relative z-10">
                <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
                  <Suspense fallback={null}>
                    <CoinMesh url={config.tokenomics?.coinAsset || '/assets/coin_final.png'} />
                    <Preload all />
                  </Suspense>
                </Canvas>
              </div>
            )}
          </Editable>

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
            <Editable path="tokenomics.badge">
              <p className="nav-item text-accent mb-6 tracking-[0.6em] font-bold uppercase">
                {config.tokenomics?.badge || "// LIQUIDITY INFRASTRUCTURE"}
              </p>
            </Editable>
            
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 leading-[1] text-white">
              <Editable path="tokenomics.titleTop">Surgical</Editable>
              <br/>
              <Editable path="tokenomics.titleBottom">Tokenomics.</Editable>
            </h2>

            <Editable path="tokenomics.description">
              <p className="text-2xl text-white/50 font-light leading-relaxed mb-16 max-w-2xl">
                {config.tokenomics?.description || "The $1XC Token is the definitive unit of account within the ecosystem. It provides the clinical hardware required for zero-friction cross-border settlements and institutional liquidity provisioning."}
              </p>
            </Editable>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {config.tokenomics?.stats?.map((stat: any, i: number) => (
                <div key={i} className="glass p-10 rounded-[40px] border border-white/5">
                  <Editable path={`tokenomics.stats.${i}.label`}>
                    <h4 className="text-accent font-mono text-[11px] mb-4 uppercase tracking-widest">{stat.label}</h4>
                  </Editable>
                  <Editable path={`tokenomics.stats.${i}.value`}>
                    <p className="text-4xl font-black italic tracking-tighter text-white">{stat.value}</p>
                  </Editable>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
