'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { Agent as AgentType, AIModel } from '@/data/types';
import { AI_MODELS } from '@/lib/constants';

interface AgentProps {
  agent: AgentType;
  animated?: boolean;
  showLabel?: boolean;
  scale?: number;
  opacity?: number;
}

// Material configurations for different AI models
const getModelMaterial = (model: AIModel, opacity: number = 1) => {
  const baseColor = new THREE.Color(model.color);
  
  return new THREE.MeshStandardMaterial({
    color: baseColor,
    metalness: 0.3,
    roughness: 0.4,
    transparent: opacity < 1,
    opacity,
    emissive: baseColor.clone().multiplyScalar(0.1),
    emissiveIntensity: 0.2
  });
};

// Geometry components for different shapes
function CubeGeometry({ material, scale }: { material: THREE.Material; scale: number }) {
  return (
    <mesh material={material} castShadow receiveShadow scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

function SphereGeometry({ material, scale }: { material: THREE.Material; scale: number }) {
  return (
    <mesh material={material} castShadow receiveShadow scale={scale}>
      <sphereGeometry args={[0.5, 32, 32]} />
    </mesh>
  );
}

function PyramidGeometry({ material, scale }: { material: THREE.Material; scale: number }) {
  return (
    <mesh material={material} castShadow receiveShadow scale={scale}>
      <coneGeometry args={[0.5, 1, 4]} />
    </mesh>
  );
}

// Ability indicators (small floating icons around the agent)
function AbilityIndicators({ abilities, position }: { abilities: AgentType['abilities']; position: [number, number, number] }) {
  const unlockedAbilities = abilities.filter(ability => ability.unlocked);
  
  return (
    <group position={position}>
      {unlockedAbilities.map((ability, index) => {
        const angle = (index / unlockedAbilities.length) * Math.PI * 2;
        const radius = 1.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = 1 + Math.sin(Date.now() * 0.001 + index) * 0.2;
        
        return (
          <group key={ability.id} position={[x, y, z]}>
            <mesh>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial
                color="#3b82f6"
                emissive="#1e40af"
                emissiveIntensity={0.5}
                transparent
                opacity={0.8}
              />
            </mesh>
            <Text
              position={[0, 0.3, 0]}
              fontSize={0.2}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              font="/fonts/inter-medium.woff"
            >
              {ability.name.charAt(0)}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

const Agent: React.FC<AgentProps> = ({
  agent,
  animated = false,
  showLabel = true,
  scale = 1,
  opacity = 1
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  
  // Create material based on AI model
  const material = useMemo(() => {
    const mat = getModelMaterial(agent.model, opacity);
    materialRef.current = mat;
    return mat;
  }, [agent.model, opacity]);

  // Animation loop
  useFrame((state) => {
    if (!groupRef.current || !animated) return;
    
    // Gentle floating animation
    groupRef.current.position.y = agent.position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    
    // Subtle rotation based on shape
    if (agent.shape === 'cube') {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    } else if (agent.shape === 'pyramid') {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    
    // Pulsing emissive effect
    if (materialRef.current) {
      const intensity = 0.1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
      materialRef.current.emissiveIntensity = intensity;
    }
  });

  // Render appropriate geometry based on shape
  const renderGeometry = () => {
    switch (agent.shape) {
      case 'cube':
        return <CubeGeometry material={material} scale={scale} />;
      case 'sphere':
        return <SphereGeometry material={material} scale={scale} />;
      case 'pyramid':
        return <PyramidGeometry material={material} scale={scale} />;
      default:
        return <CubeGeometry material={material} scale={scale} />;
    }
  };

  return (
    <group
      ref={groupRef}
      position={agent.position}
      rotation={agent.rotation}
    >
      {/* Main geometry */}
      {renderGeometry()}
      
      {/* Model label */}
      {showLabel && (
        <Text
          position={[0, scale + 0.5, 0]}
          fontSize={0.3}
          color={agent.model.color}
          anchorX="center"
          anchorY="bottom"
          font="/fonts/inter-bold.woff"
        >
          {agent.model.name}
        </Text>
      )}
      
      {/* Ability indicators */}
      {agent.abilities.some(ability => ability.unlocked) && (
        <AbilityIndicators 
          abilities={agent.abilities} 
          position={[0, 0, 0]} 
        />
      )}
      
      {/* Selection glow effect */}
      <mesh scale={scale * 1.1}>
        {agent.shape === 'cube' && <boxGeometry args={[1, 1, 1]} />}
        {agent.shape === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
        {agent.shape === 'pyramid' && <coneGeometry args={[0.5, 1, 4]} />}
        <meshBasicMaterial
          color={agent.model.color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// Utility function to create agent from model and shape
export function createAgent(
  modelId: string,
  shape: 'cube' | 'sphere' | 'pyramid',
  position: [number, number, number] = [0, 0, 0],
  abilities: AgentType['abilities'] = []
): AgentType {
  const model = AI_MODELS.find(m => m.id === modelId);
  if (!model) {
    throw new Error(`Model with id ${modelId} not found`);
  }
  
  return {
    shape,
    model,
    abilities,
    position,
    rotation: [0, 0, 0]
  };
}

export default Agent;