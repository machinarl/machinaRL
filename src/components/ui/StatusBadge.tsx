'use client';

import React from 'react';

interface StatusBadgeProps {
  status: 'coming_soon' | 'prototype' | 'available';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'available':
        return {
          text: '[ AVAILABLE ]',
          bgColor: '#006600',
          textColor: 'white'
        };
      case 'prototype':
        return {
          text: '[ PROTOTYPE ]',
          bgColor: '#0066CC',
          textColor: 'white'
        };
      case 'coming_soon':
        return {
          text: '[ COMING SOON ]',
          bgColor: '#CC9900',
          textColor: 'black'
        };
      default:
        return {
          text: '[ UNKNOWN ]',
          bgColor: '#CC0000',
          textColor: 'white'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span 
      className={`px-3 py-1 text-xs font-mono font-bold ${className}`}
      style={{ 
        backgroundColor: config.bgColor, 
        color: config.textColor 
      }}
    >
      {config.text}
    </span>
  );
};

export default StatusBadge;
