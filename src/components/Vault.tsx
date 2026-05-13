'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Environment, View } from '@react-three/drei';
import * as THREE from 'three';
import ScrambleText from './ScrambleText';

const VENTURES = [
  { name: "Property Lab", logo: "/assets/logos/1.jpg" },
  { name: "Syndicate Motors", logo: "/assets/logos/2.jpg" },
  { name: "Kult Absolute", logo: "/assets/logos/3.jpg" },
  { name: "Nexus Equity", logo: "/assets/logos/4.jpg" },
  { name: "Apex Labs", logo: "/assets/logos/5.jpg" },
];

function Card({ url, index, total }: { url: string; index: number; total: number }) {
  const ref = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    const angle = (index / total) * Math.PI * 2 + state.clock.getElapsedTime() * 0.15;
    const radius = 6;
    ref.current.position.x = Math.sin(angle) * radius;
    ref.current.position.z = Math.cos(angle) * radius;
    ref.current.rotation.y = angle + Math.PI;
    ref.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.5;
  });

  return (
    <group ref={ref}>
      <mesh castShadow>
        <planeGeometry args={[3, 4.5]} />
        <meshPhysicalMaterial color="#050505" metalness={1} roughness={0.1} clearcoat={1} />
      </mesh>
      <Image url={url} transparent scale={[2.5, 2.5]} position={[0, 0, 0.02]} />
    </group>
  );
}

export default function Vault() {
  return (
    <section className="relative h-screen bg-transparent overflow-hidden">
      <View className="absolute inset-0 z-0">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        {VENTURES.map((venture, i) => (
          <Card key={i} url={venture.logo} index={i} total={VENTURES.length} />
        ))}
        <Environment preset="apartment" />
      </View>

      <div className="relative z-10 text-right p-20 mix-blend-difference pointer-events-none">
        <h2 className="text-[10px] font-mono text-white/40 tracking-[0.5em] mb-4 uppercase">
          <ScrambleText text="04 // ACCELERATED VAULT" />
        </h2>
        <p className="text-8xl font-bold tracking-tighter text-white uppercase">VENTURE NODES</p>
      </div>
    </section>
  );
}
