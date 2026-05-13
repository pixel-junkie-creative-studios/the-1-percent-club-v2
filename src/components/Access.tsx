'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Float, ContactShadows, Environment, View } from '@react-three/drei';
import * as THREE from 'three';
import ScrambleText from './ScrambleText';
import { motion } from 'framer-motion';

function AccessCard() {
  const texture = useTexture('/assets/card.jpg');
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 2) / 8;
    meshRef.current.rotation.y = Math.sin(t / 2) / 4 + Math.PI * 2 * (state.mouse.x * 0.1);
    meshRef.current.position.y = Math.sin(t / 1.5) / 10;
  });

  return (
    <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <boxGeometry args={[4.5, 2.8, 0.08]} />
        <meshPhysicalMaterial 
          map={texture} 
          metalness={1} 
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </mesh>
    </Float>
  );
}

export default function Access() {
  return (
    <section className="relative h-screen bg-transparent flex items-center justify-center overflow-hidden">
      <View className="absolute inset-0 z-0">
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <AccessCard />
        <Environment preset="night" />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={10} blur={3} far={4} color="#000000" />
      </View>

      <div className="relative z-10 text-center mix-blend-difference pointer-events-none">
        <h2 className="text-[10px] font-mono text-white/40 tracking-[0.5em] mb-4 uppercase">
          <ScrambleText text="05 // PHYSICAL ACCESS" />
        </h2>
        <motion.h3 className="text-[12rem] font-bold tracking-tighter uppercase leading-none text-white">
          <ScrambleText text="THE 1% CARD" />
        </motion.h3>
        <p className="max-w-xl mx-auto text-white/50 font-mono text-[10px] uppercase tracking-[0.4em] leading-loose mt-8">
          A titanium-substrate governance key for the elite execution tier. 
          Unlocking institutional scaling and global asset liquidity.
        </p>
      </div>

      <button className="absolute bottom-20 magnet border border-white/20 bg-white/5 backdrop-blur-md px-16 py-5 font-mono text-[10px] text-white uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-700">
        Request Governance Node
      </button>
    </section>
  );
}
