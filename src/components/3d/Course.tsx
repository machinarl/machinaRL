'use client';

import React, { useMemo } from 'react';
import { Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { Course as CourseType } from '@/data/types';

interface CourseProps {
  course: CourseType;
  showBounds?: boolean;
}

// Material configurations for different course elements
const MATERIALS = {
  wall: new THREE.MeshStandardMaterial({
    color: '#374151',
    metalness: 0.1,
    roughness: 0.8
  }),
  obstacle: new THREE.MeshStandardMaterial({
    color: '#dc2626',
    metalness: 0.2,
    roughness: 0.6,
    emissive: '#7f1d1d',
    emissiveIntensity: 0.1
  }),
  start: new THREE.MeshStandardMaterial({
    color: '#10b981',
    metalness: 0.3,
    roughness: 0.4,
    emissive: '#047857',
    emissiveIntensity: 0.2
  }),
  goal: new THREE.MeshStandardMaterial({
    color: '#3b82f6',
    metalness: 0.3,
    roughness: 0.4,
    emissive: '#1e40af',
    emissiveIntensity: 0.2
  }),
  bounds: new THREE.MeshBasicMaterial({
    color: '#6b7280',
    transparent: true,
    opacity: 0.1,
    wireframe: true
  })
};

// Wall component
function Wall({ position, size }: { position: [number, number, number]; size: [number, number, number] }) {
  return (
    <Box
      position={position}
      args={size}
      material={MATERIALS.wall}
      castShadow
      receiveShadow
    />
  );
}

// Obstacle component
function Obstacle({ position, size }: { position: [number, number, number]; size: [number, number, number] }) {
  return (
    <Box
      position={position}
      args={size}
      material={MATERIALS.obstacle}
      castShadow
      receiveShadow
    />
  );
}

// Start marker
function StartMarker({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Cylinder
        args={[0.5, 0.5, 0.1]}
        material={MATERIALS.start}
        receiveShadow
      />
      <Cylinder
        args={[0.6, 0.6, 0.05]}
        position={[0, 0.075, 0]}
        material={MATERIALS.start}
      />
    </group>
  );
}

// Goal marker
function GoalMarker({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Cylinder
        args={[0.5, 0.5, 0.1]}
        material={MATERIALS.goal}
        receiveShadow
      />
      <Cylinder
        args={[0.6, 0.6, 0.05]}
        position={[0, 0.075, 0]}
        material={MATERIALS.goal}
      />
      {/* Animated goal effect */}
      <Cylinder
        args={[0.7, 0.7, 0.02]}
        position={[0, 0.15, 0]}
        material={new THREE.MeshBasicMaterial({
          color: '#3b82f6',
          transparent: true,
          opacity: 0.3
        })}
      />
    </group>
  );
}

// Course bounds visualization
function CourseBounds({ size }: { size: [number, number, number] }) {
  return (
    <Box
      position={[size[0] / 2, size[1] / 2, size[2] / 2]}
      args={size}
      material={MATERIALS.bounds}
    />
  );
}

const Course: React.FC<CourseProps> = ({
  course,
  showBounds = false
}) => {
  // Process wall data into renderable components
  const walls = useMemo(() => {
    if (!course.environment.walls) return [];
    
    return course.environment.walls.map((wall, index) => {
      // Wall format: [x, y, z, width, height, depth]
      const [x, y, z, width, height, depth] = wall;
      const position: [number, number, number] = [
        x + width / 2,
        y + height / 2,
        z + depth / 2
      ];
      const size: [number, number, number] = [width, height, depth];
      
      return (
        <Wall
          key={`wall-${index}`}
          position={position}
          size={size}
        />
      );
    });
  }, [course.environment.walls]);

  // Process obstacle data into renderable components
  const obstacles = useMemo(() => {
    if (!course.environment.obstacles) return [];
    
    return course.environment.obstacles.map((obstacle, index) => {
      // Obstacle format: [x, y, z, width, height, depth]
      const [x, y, z, width, height, depth] = obstacle;
      const position: [number, number, number] = [
        x + width / 2,
        y + height / 2,
        z + depth / 2
      ];
      const size: [number, number, number] = [width, height, depth];
      
      return (
        <Obstacle
          key={`obstacle-${index}`}
          position={position}
          size={size}
        />
      );
    });
  }, [course.environment.obstacles]);

  return (
    <group>
      {/* Course bounds */}
      {showBounds && <CourseBounds size={course.environment.size} />}
      
      {/* Walls */}
      <group>{walls}</group>
      
      {/* Obstacles */}
      <group>{obstacles}</group>
      
      {/* Start marker */}
      <StartMarker position={course.environment.start} />
      
      {/* Goal marker */}
      <GoalMarker position={course.environment.goal} />
      
      {/* Ground plane */}
      <Box
        position={[
          course.environment.size[0] / 2,
          -0.05,
          course.environment.size[2] / 2
        ]}
        args={[
          course.environment.size[0],
          0.1,
          course.environment.size[2]
        ]}
        material={new THREE.MeshStandardMaterial({
          color: '#1f2937',
          metalness: 0.1,
          roughness: 0.9
        })}
        receiveShadow
      />
    </group>
  );
};

// Utility function to get course preview (simplified version for thumbnails)
export function CoursePreview({ course, scale = 0.1 }: { course: CourseType; scale?: number }) {
  return (
    <group scale={scale}>
      <Course course={course} showBounds={true} />
    </group>
  );
}

export default Course;