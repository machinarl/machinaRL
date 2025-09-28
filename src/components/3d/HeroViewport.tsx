'use client';

import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AI_MODELS, ABILITIES } from '@/lib/constants';
import { HeroViewportProps } from '@/data/types';
import Scene from './Scene';
import Agent, { createAgent } from './Agent';
import Button from '@/components/ui/Button';

// Floating agent component for hero display (unused but kept for reference)
/*
function FloatingAgent({ selectedModel }: { selectedModel: HeroViewportProps['selectedModel'] }) {
  const agentRef = useRef<THREE.Group>(null);
  
  // Create agent with some basic abilities
  const agent = createAgent(
    selectedModel.id,
    'cube', // Default to cube for hero
    [0, 0, 0],
    ABILITIES.slice(0, 3).map(ability => ({ ...ability, unlocked: true }))
  );

  useFrame((state) => {
    if (!agentRef.current) return;
    
    // Smooth floating animation
    agentRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
    
    // Gentle rotation
    agentRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    agentRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
  });

  return (
    <group ref={agentRef}>
      <Agent
        agent={agent}
        animated={true}
        showLabel={false}
        scale={1.5}
      />
    </group>
  );
}
*/

// Model selector buttons
function ModelSelector({ selectedModel, onModelChange }: HeroViewportProps) {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
      <div className="flex gap-2 bg-gray-900/80 backdrop-blur-sm rounded-lg p-2 border border-gray-700">
        {AI_MODELS.map((model) => (
          <Button
            key={model.id}
            variant={selectedModel.id === model.id ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onModelChange(model)}
            className="min-w-[80px]"
          >
            {model.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

// Shape selector (for variety)
function ShapeSelector({ 
  selectedShape, 
  onShapeChange 
}: { 
  selectedShape: 'cube' | 'sphere' | 'pyramid';
  onShapeChange: (shape: 'cube' | 'sphere' | 'pyramid') => void;
}) {
  const shapes = [
    { id: 'cube', name: 'Cube', icon: '⬛' },
    { id: 'sphere', name: 'Sphere', icon: '⚪' },
    { id: 'pyramid', name: 'Pyramid', icon: '🔺' }
  ] as const;

  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="flex flex-col gap-1 bg-gray-900/80 backdrop-blur-sm rounded-lg p-2 border border-gray-700">
        {shapes.map((shape) => (
          <button
            key={shape.id}
            onClick={() => onShapeChange(shape.id)}
            className={`p-2 rounded text-sm transition-colors ${
              selectedShape === shape.id
                ? 'bg-primary-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            title={shape.name}
          >
            {shape.icon}
          </button>
        ))}
      </div>
    </div>
  );
}

// Enhanced floating agent with shape selection
function EnhancedFloatingAgent({ 
  selectedModel, 
  selectedShape 
}: { 
  selectedModel: HeroViewportProps['selectedModel'];
  selectedShape: 'cube' | 'sphere' | 'pyramid';
}) {
  const agentRef = useRef<THREE.Group>(null);
  
  // Create agent with selected shape
  const agent = createAgent(
    selectedModel.id,
    selectedShape,
    [0, 0, 0],
    ABILITIES.slice(0, 3).map(ability => ({ ...ability, unlocked: true }))
  );

  useFrame((state) => {
    if (!agentRef.current) return;
    
    // Smooth floating animation
    agentRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
    
    // Shape-specific rotation patterns
    if (selectedShape === 'cube') {
      agentRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      agentRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    } else if (selectedShape === 'sphere') {
      agentRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      agentRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.1;
    } else if (selectedShape === 'pyramid') {
      agentRef.current.rotation.y = state.clock.elapsedTime * 0.7;
    }
  });

  return (
    <group ref={agentRef}>
      <Agent
        agent={agent}
        animated={true}
        showLabel={false}
        scale={1.5}
      />
    </group>
  );
}

const HeroViewport: React.FC<HeroViewportProps> = ({
  selectedModel,
  onModelChange
}) => {
  const [selectedShape, setSelectedShape] = useState<'cube' | 'sphere' | 'pyramid'>('cube');

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden border border-gray-800">
      <Scene
        enableControls={true}
        enableStats={false}
        cameraPosition={[3, 3, 3]}
        className="w-full h-full"
      >
        <EnhancedFloatingAgent 
          selectedModel={selectedModel}
          selectedShape={selectedShape}
        />
      </Scene>
      
      {/* Model selector */}
      <ModelSelector
        selectedModel={selectedModel}
        onModelChange={onModelChange}
      />
      
      {/* Shape selector */}
      <ShapeSelector
        selectedShape={selectedShape}
        onShapeChange={setSelectedShape}
      />
      
      {/* Info overlay */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
          <h3 className="text-white font-semibold mb-1">{selectedModel.name}</h3>
          <p className="text-gray-400 text-sm max-w-48">{selectedModel.description}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroViewport;