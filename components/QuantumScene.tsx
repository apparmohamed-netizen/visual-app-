/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Cylinder, Stars, Environment, Capsule } from '@react-three/drei';
import * as THREE from 'three';

// Fix: Add missing type definitions for React Three Fiber intrinsic elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      meshStandardMaterial: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
    }
  }
}

const BacteriaCell = ({ position, color, scale = 1, rotation = [0,0,0] }: { position: [number, number, number]; color: string; scale?: number; rotation?: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.1;
      ref.current.rotation.x = rotation[0] + t * 0.1;
      ref.current.rotation.z = rotation[2] + t * 0.05;
    }
  });

  return (
    <Capsule ref={ref} args={[0.5, 1.5, 4, 8]} position={position} scale={scale} rotation={rotation as any}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        metalness={0.1}
        roughness={0.4}
        distort={0.3}
        speed={1}
      />
    </Capsule>
  );
};

const DNAStrand = () => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.y = t * 0.2;
       ref.current.rotation.z = Math.sin(t * 0.1) * 0.1;
    }
  });

  return (
    <group ref={ref} rotation={[Math.PI / 4, 0, 0]}>
       {/* Simplified Helix Visualization using twisted Torus segments or particles could go here, 
           but for aesthetic abstract we use a twisted ring structure */}
      <Torus args={[3.5, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
         <meshStandardMaterial color="#2A9D8F" emissive="#2A9D8F" emissiveIntensity={0.2} transparent opacity={0.4} wireframe />
      </Torus>
      <Torus args={[3.5, 0.05, 16, 100]} rotation={[Math.PI / 2.2, 0, 0]}>
         <meshStandardMaterial color="#C5A059" emissive="#C5A059" emissiveIntensity={0.2} transparent opacity={0.4} wireframe />
      </Torus>
    </group>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          {/* Central DNA-like abstract structure */}
          <DNAStrand />
        </Float>
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
           <BacteriaCell position={[-3, 1, -2]} color="#2A9D8F" scale={0.8} rotation={[0.5, 0.5, 0]} />
           <BacteriaCell position={[3, -2, -3]} color="#E9C46A" scale={0.6} rotation={[-0.5, 0, 0.5]} />
           <BacteriaCell position={[4, 2, -5]} color="#264653" scale={0.5} rotation={[0, 0.5, 0]} />
        </Float>

        <Environment preset="park" />
      </Canvas>
    </div>
  );
};

export const QuantumComputerScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />
        <Environment preset="studio" />
        
        <Float rotationIntensity={0.2} floatIntensity={0.2} speed={1}>
          <group rotation={[0, 0, Math.PI/4]} position={[0, 0, 0]}>
            {/* Abstract representation of a Plasmid Loop */}
            <Torus args={[1.5, 0.2, 32, 100]}>
                <meshStandardMaterial 
                    color="#2A9D8F" 
                    roughness={0.3} 
                    metalness={0.6}
                    emissive="#2A9D8F"
                    emissiveIntensity={0.2}
                />
            </Torus>
            
            {/* Gene Insert (The 'cut' section) */}
            <Torus args={[1.5, 0.22, 32, 20]} position={[0,0,0]} rotation={[0,0,1]}>
                 <meshStandardMaterial color="#E76F51" roughness={0.2} metalness={0.1} />
            </Torus>

            {/* Floating enzyme particles */}
             <Sphere args={[0.1, 16, 16]} position={[1.5, 0.5, 0.5]}>
                <meshStandardMaterial color="#C5A059" />
             </Sphere>
             <Sphere args={[0.1, 16, 16]} position={[-1.2, -0.8, -0.5]}>
                <meshStandardMaterial color="#C5A059" />
             </Sphere>
          </group>
        </Float>
      </Canvas>
    </div>
  );
}