'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  attribute float size;
  attribute vec3 color;
  varying vec3 vColor;
  varying float vOpacity;
  
  void main() {
    vColor = color;
    vec3 pos = position;
    
    // Repulsion
    float dist = distance(pos.xy, uMouse);
    float force = 1.0 - smoothstep(0.0, 1.5, dist);
    pos.xy += normalize(pos.xy - uMouse) * force * 0.5;
    
    // Movement
    float angle = uTime * 0.05 + length(pos.xy) * 0.5;
    pos.x += sin(angle) * 0.1;
    pos.y += cos(angle) * 0.1;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (1000.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    
    vOpacity = force * 0.5 + 0.5;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vOpacity;
  
  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = (1.0 - dist * 2.0) * vOpacity;
    gl_FragColor = vec4(vColor, alpha * 0.8);
  }
`;

function Particles({ count = 25000 }) { // Lowered count for performance, increased size
  const points = useRef<THREE.Points>(null!);
  const { mouse, viewport } = useThree();

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const r = Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Gradient from blue to violet
      const mix = Math.random();
      colors[i * 3] = mix * 0.5; // R
      colors[i * 3 + 1] = 0.2; // G
      colors[i * 3 + 2] = 1.0; // B

      sizes[i] = 0.5 + Math.random() * 2.5;
    }
    return [positions, colors, sizes];
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) }
  }), []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uMouse.value.set(mouse.x * viewport.width / 2, mouse.y * viewport.height / 2);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function VortexBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#020205]">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Particles />
        <color attach="background" args={['#000002']} />
      </Canvas>
    </div>
  );
}
