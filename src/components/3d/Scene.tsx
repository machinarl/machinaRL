'use client';

import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Grid, Stats } from '@react-three/drei';
import { SCENE_CONFIG, PERFORMANCE } from '@/lib/constants';
import * as THREE from 'three';

interface SceneProps {
  children?: React.ReactNode;
  enableControls?: boolean;
  enableStats?: boolean;
  cameraPosition?: [number, number, number];
  className?: string;
}

// Performance monitor component
function PerformanceMonitor() {
  const { gl } = useThree();
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const fps = useRef(60);

  useFrame(() => {
    frameCount.current++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime.current >= 1000) {
      fps.current = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current));
      frameCount.current = 0;
      lastTime.current = currentTime;
      
      // Adjust quality based on performance
      if (fps.current < PERFORMANCE.LOW_FPS_THRESHOLD) {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, PERFORMANCE.PIXEL_RATIO_FALLBACK));
      } else if (fps.current > PERFORMANCE.TARGET_FPS * 0.9) {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    }
  });

  return null;
}

// Lighting setup component
function Lighting() {
  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight 
        intensity={SCENE_CONFIG.AMBIENT_LIGHT_INTENSITY} 
        color="#404040" 
      />
      
      {/* Main directional light */}
      <directionalLight
        position={SCENE_CONFIG.DIRECTIONAL_LIGHT_POSITION}
        intensity={SCENE_CONFIG.DIRECTIONAL_LIGHT_INTENSITY}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Fill light from the opposite side */}
      <directionalLight
        position={[-10, 5, -5]}
        intensity={0.3}
        color="#4080ff"
      />
      
      {/* Rim light for edge definition */}
      <directionalLight
        position={[0, 10, -10]}
        intensity={0.2}
        color="#8040ff"
      />
    </>
  );
}

// Scene error boundary fallback
function SceneErrorFallback() {
  return (
    <div className="flex items-center justify-center h-64 bg-gray-900 rounded-lg border border-gray-800">
      <div className="text-center">
        <div className="text-gray-400 mb-2">⚠️</div>
        <p className="text-gray-400">3D scene unavailable</p>
        <p className="text-gray-500 text-sm">Please refresh the page or check WebGL support</p>
      </div>
    </div>
  );
}

// Loading fallback
function SceneLoader() {
  return (
    <div className="flex items-center justify-center h-64 bg-gray-900 rounded-lg border border-gray-800 animate-pulse">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-gray-400">Loading 3D scene...</p>
      </div>
    </div>
  );
}

const Scene: React.FC<SceneProps> = ({
  children,
  enableControls = true,
  enableStats = false,
  cameraPosition = SCENE_CONFIG.CAMERA_POSITION,
  className = "w-full h-64"
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Check WebGL support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        console.warn('WebGL not supported');
      }
    }
  }, []);

  return (
    <div className={className}>
      <Suspense fallback={<SceneLoader />}>
        <Canvas
          ref={canvasRef}
          camera={{
            position: cameraPosition,
            fov: SCENE_CONFIG.CAMERA_FOV,
            near: SCENE_CONFIG.CAMERA_NEAR,
            far: SCENE_CONFIG.CAMERA_FAR
          }}
          shadows
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
          onCreated={({ gl, scene }) => {
            // Configure renderer
            gl.setClearColor('#030712', 0);
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.2;
            
            // Configure scene
            scene.fog = new THREE.Fog('#030712', 10, 100);
            
            // Set initial pixel ratio
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          }}
          onError={(error) => {
            console.error('Canvas error:', error);
          }}
        >
          {/* Performance monitoring */}
          <PerformanceMonitor />
          
          {/* Lighting setup */}
          <Lighting />
          
          {/* Environment and atmosphere */}
          <Environment preset="night" />
          
          {/* Ground grid for reference */}
          <Grid
            args={[20, 20]}
            position={[0, -0.01, 0]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#1e293b"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#334155"
            fadeDistance={30}
            fadeStrength={1}
            infiniteGrid
          />
          
          {/* Camera controls */}
          {enableControls && (
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={50}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 2}
              dampingFactor={0.05}
              enableDamping
            />
          )}
          
          {/* Performance stats */}
          {enableStats && <Stats />}
          
          {/* Scene content */}
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
};

// Error boundary wrapper
class SceneErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ComponentType }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Scene error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback || SceneErrorFallback;
      return <Fallback />;
    }

    return this.props.children;
  }
}

// Export wrapped component
export default function SceneWithErrorBoundary(props: SceneProps) {
  return (
    <SceneErrorBoundary>
      <Scene {...props} />
    </SceneErrorBoundary>
  );
}