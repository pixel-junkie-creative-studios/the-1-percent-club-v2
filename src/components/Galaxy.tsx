'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const STAR_COUNT = 30000; // High density for maximum visibility

const vertexShader = `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2 uMouse;

  attribute float aSize;
  attribute float aSpeed;
  attribute vec3 aOffset;

  varying float vOpacity;

  void main() {
    vec3 pos = position;
    
    // Smooth Orbit Logic
    float angle = uTime * aSpeed * 0.05;
    pos.x += cos(angle + aOffset.x) * 3.0;
    pos.y += sin(angle + aOffset.y) * 3.0;
    pos.z += sin(angle * 0.5 + aOffset.z) * 2.0;

    // High-Intensity Mouse Repulsion
    float dist = distance(pos.xy, uMouse * 12.0);
    if (dist < 4.0) {
      pos.xy += normalize(pos.xy - uMouse * 12.0) * (4.0 - dist) * 0.8;
    }

    vec4 viewPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    
    // REFINED POINT SIZE - FOR BALANCED VISIBILITY
    // Reduced size to prevent obscuring text while maintaining "shining" effect
    gl_PointSize = (aSize * 6.0 + 2.0) * uPixelRatio * (12.0 / length(viewPosition.xyz));
    
    // Constant peak opacity for "shining" dots
    vOpacity = 1.0; 
  }
`;

const fragmentShader = `
  varying float vOpacity;

  void main() {
    // Sharp circular points with soft glow
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    
    // Brighter core
    float strength = 1.0 - (dist * 2.0);
    strength = pow(strength, 1.5);
    
    gl_FragColor = vec4(1.0, 1.0, 1.0, strength * vOpacity);
  }
`;

export default function Galaxy() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const [positions, sizes, speeds, offsets] = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3);
    const s = new Float32Array(STAR_COUNT);
    const sp = new Float32Array(STAR_COUNT);
    const off = new Float32Array(STAR_COUNT * 3);

    for (let i = 0; i < STAR_COUNT; i++) {
      // Vast field that fills the entire camera frustum
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;

      s[i] = Math.random();
      sp[i] = 0.5 + Math.random() * 2.0;
      
      off[i * 3] = Math.random() * Math.PI * 2;
      off[i * 3 + 1] = Math.random() * Math.PI * 2;
      off[i * 3 + 2] = Math.random() * Math.PI * 2;
    }

    return [pos, s, sp, off];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uMouse.value.lerp(mouse.current, 0.05);
      material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    }
  });

  // Track mouse for repulsion - Global Listener
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Convert screen coords to normalized device coordinates
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={STAR_COUNT}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={STAR_COUNT}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          count={STAR_COUNT}
          array={speeds}
          itemSize={1}
          args={[speeds, 1]}
        />
        <bufferAttribute
          attach="attributes-aOffset"
          count={STAR_COUNT}
          array={offsets}
          itemSize={3}
          args={[offsets, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthTest={false}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uPixelRatio: { value: 2.0 },
          uMouse: { value: new THREE.Vector2(0, 0) }
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </points>
  );
}
