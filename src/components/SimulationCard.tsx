'use client';

import { Simulation } from '@/types/sim';
import StatusBadge from './StatusBadge';
import Button from './Button';
import Link from 'next/link';

interface SimulationCardProps {
  simulation: Simulation;
  className?: string;
}

export default function SimulationCard({ simulation, className = '' }: SimulationCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'hard':
        return 'text-orange-600';
      case 'expert':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`simulation-card bg-white border-2 border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold font-mono text-gray-900">
            {simulation.name}
          </h3>
          <StatusBadge status={simulation.status} />
        </div>
        <p className="text-gray-600 text-sm mb-3">
          {simulation.synopsis}
        </p>
      </div>

      <div className="mb-4">
        <div className="ascii-preview bg-gray-50 border border-gray-200 rounded p-3 font-mono text-xs">
          <pre className="whitespace-pre-wrap text-center">
            {simulation.placeholder.ascii}
          </pre>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Difficulty:</span>
          <span className={`text-sm font-bold ${getDifficultyColor(simulation.difficulty)}`}>
            {simulation.difficulty.toUpperCase()}
          </span>
        </div>
        
        <div className="mb-2">
          <span className="text-sm font-semibold text-gray-700">Skills:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {simulation.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded border"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <span className="text-sm font-semibold text-gray-700">Tags:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {simulation.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600">
          <div className="mb-1">
            <span className="font-semibold">Primary Metric:</span> {simulation.metrics.primary}
          </div>
          <div>
            <span className="font-semibold">Secondary:</span> {simulation.metrics.secondary.join(', ')}
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <Link href={`/sims/${simulation.id}`}>
          <Button variant="primary" size="sm" className="flex-1">
            VIEW DETAILS
          </Button>
        </Link>
        {simulation.status === 'available' && (
          <Link href={`/demo?sim=${simulation.id}`}>
            <Button variant="success" size="sm" className="flex-1">
              TRY DEMO
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
