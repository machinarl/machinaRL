'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SimCatalogItem, CourseId } from '@/data/sims';
import StatusBadge from '@/components/ui/StatusBadge';

interface SimulationCardProps {
  sim: SimCatalogItem;
}

const SimulationCard: React.FC<SimulationCardProps> = ({ sim }) => {
  const isClickable = sim.status === 'prototype' || sim.status === 'available';

  // Helper function to get thumbnail path for each course
  const getThumbnailPath = (courseId: CourseId): string | null => {
    const thumbnailMap: Record<CourseId, string | null> = {
      'soccer': '/thumbs/soccer.png',
      'ball3d': '/thumbs/3dball.png',
      'obstacle': '/thumbs/dungeon.png',
      'wallclimb': '/thumbs/wallclimb.png',
      'pushblock': '/thumbs/pushblock.png',
      'pyramids': '/thumbs/pyramids.png',
      'food_collector': '/thumbs/foodcollector.png',
      'hallway': '/thumbs/Hallway.png',
      'gridworld': '/thumbs/Gridworld.png',
      'walker': '/thumbs/Walker.png',
      'crawler': '/thumbs/Crawler.png',
      'basic': '/thumbs/basic.png',
      'match3': '/thumbs/Match3.png',
      'sorter': '/thumbs/Sorter.png',
      'worm': '/thumbs/worm.png',
    };
    return thumbnailMap[courseId] || null;
  };
  
  const CardContent = () => (
    <div className="bg-gray-100 border-2 border-gray-300 p-6 h-full hover:border-[#0066CC] hover:shadow-[0_0_20px_rgba(0,102,204,0.3)] transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-black mb-2 font-mono">
            {sim.name.toUpperCase()}
          </h3>
          <StatusBadge status={sim.status} />
        </div>
      </div>

      {/* Thumbnail */}
      <div className="mb-4">
        {getThumbnailPath(sim.id) ? (
          <div className="relative w-full bg-gray-200 border border-gray-400" style={{ aspectRatio: '16/9' }}>
            <Image 
              src={getThumbnailPath(sim.id)!}
              alt={`${sim.name} thumbnail`}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="p-4 bg-gray-200 border border-gray-400 text-center">
            <pre className="text-xs font-mono leading-tight text-[#0066CC]">
              {sim.placeholder.ascii.join('\n')}
            </pre>
          </div>
        )}
      </div>

      {/* Synopsis */}
      <p className="text-gray-700 mb-4 text-sm leading-relaxed">
        {sim.synopsis}
      </p>

      {/* Skills */}
      <div className="mb-4">
        <div className="text-xs text-gray-600 mb-2 font-mono">REQUIRED_SKILLS:</div>
        <div className="flex flex-wrap gap-1">
          {sim.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-gray-300 text-gray-700 text-xs font-mono border border-gray-400"
            >
              {skill}
            </span>
          ))}
          {sim.skills.length > 3 && (
            <span className="px-2 py-1 bg-gray-300 text-gray-700 text-xs font-mono border border-gray-400">
              +{sim.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Difficulty */}
      <div className="mb-4">
        <div className="text-xs text-gray-600 mb-1 font-mono">DIFFICULTY:</div>
        <div className="flex gap-1">
          {sim.difficulty.map((diff) => (
            <span
              key={diff}
              className="px-2 py-1 bg-gray-300 text-gray-700 text-xs font-mono border border-gray-400"
            >
              {diff.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Tags */}
      {sim.tags && sim.tags.length > 0 && (
        <div className="mb-4">
          <div className="text-xs text-gray-600 mb-1 font-mono">TAGS:</div>
          <div className="flex flex-wrap gap-1">
            {sim.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-200 text-gray-600 text-xs font-mono border border-gray-300"
              >
                {tag}
              </span>
            ))}
            {sim.tags.length > 2 && (
              <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs font-mono border border-gray-300">
                +{sim.tags.length - 2}
              </span>
            )}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-auto">
        <button 
          className={`w-full py-2 border-2 font-mono text-sm transition-all duration-300 ${
            isClickable 
              ? 'border-gray-400 text-gray-700 hover:border-[#0066CC] hover:text-[#0066CC] hover:shadow-[0_0_10px_rgba(0,102,204,0.3)]'
              : 'border-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!isClickable}
        >
          {isClickable ? '[ VIEW DETAILS ]' : '[ COMING SOON ]'}
        </button>
      </div>
    </div>
  );

  if (isClickable) {
    return (
      <Link href={`/sims/${sim.id}`} className="block h-full">
        <CardContent />
      </Link>
    );
  }

  return (
    <div className="h-full opacity-75">
      <CardContent />
    </div>
  );
};

export default SimulationCard;
