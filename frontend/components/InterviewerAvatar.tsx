'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface InterviewerAvatarProps {
  isSpeaking: boolean;
  isListening: boolean;
}

function AvatarModel({ isSpeaking, isListening }: InterviewerAvatarProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Subtle breathing animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      
      // Speaking animation
      if (isSpeaking) {
        headRef.current!.rotation.y = Math.sin(state.clock.elapsedTime * 5) * 0.1;
        headRef.current!.position.y = Math.sin(state.clock.elapsedTime * 10) * 0.05;
      }
      
      // Listening animation
      if (isListening) {
        headRef.current!.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#4B5563" />
      </mesh>

      {/* Body */}
      <mesh ref={bodyRef} position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1.5, 0.5]} />
        <meshStandardMaterial color="#6B7280" />
      </mesh>

      {/* Eyes */}
      <mesh position={[0.2, 1.6, 0.4]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-0.2, 1.6, 0.4]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Pupils */}
      <mesh position={[0.2, 1.6, 0.5]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[-0.2, 1.6, 0.5]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, 1.3, 0.4]}>
        <boxGeometry args={[0.3, 0.1, 0.1]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
    </group>
  );
}

export default function InterviewerAvatar({ isSpeaking, isListening }: InterviewerAvatarProps) {
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [0, 1, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <AvatarModel isSpeaking={isSpeaking} isListening={isListening} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
} 