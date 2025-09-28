'use client';

interface StatusBadgeProps {
  status: 'prototype' | 'coming_soon' | 'available' | 'maintenance';
  className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'available':
        return {
          text: 'AVAILABLE',
          color: 'bg-green-100 text-green-800 border-green-300',
          ascii: '✓',
        };
      case 'prototype':
        return {
          text: 'PROTOTYPE',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
          ascii: '⚠',
        };
      case 'coming_soon':
        return {
          text: 'COMING SOON',
          color: 'bg-blue-100 text-blue-800 border-blue-300',
          ascii: '⏳',
        };
      case 'maintenance':
        return {
          text: 'MAINTENANCE',
          color: 'bg-red-100 text-red-800 border-red-300',
          ascii: '🔧',
        };
      default:
        return {
          text: 'UNKNOWN',
          color: 'bg-gray-100 text-gray-800 border-gray-300',
          ascii: '?',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={`
        inline-flex items-center px-2 py-1 rounded border font-mono text-xs font-bold
        ${config.color}
        ${className}
      `}
    >
      <span className="mr-1">{config.ascii}</span>
      {config.text}
    </span>
  );
}
