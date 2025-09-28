'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CardProps } from '@/data/types';

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  ...props
}) => {
  const baseStyles = 'bg-gray-900 border border-gray-800 rounded-lg p-6 transition-all duration-200';
  const hoverStyles = hover ? 'hover:border-gray-700 hover:bg-gray-800 cursor-pointer' : '';
  
  return (
    <div
      className={cn(
        baseStyles,
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;