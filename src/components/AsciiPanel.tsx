'use client';

import { ReactNode } from 'react';

interface AsciiPanelProps {
  children: ReactNode;
  title?: string;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export default function AsciiPanel({
  children,
  title,
  className = '',
  variant = 'default',
}: AsciiPanelProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'border-green-500 bg-green-50 text-green-900';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50 text-yellow-900';
      case 'error':
        return 'border-red-500 bg-red-50 text-red-900';
      case 'info':
        return 'border-blue-500 bg-blue-50 text-blue-900';
      default:
        return 'border-gray-300 bg-white text-gray-900';
    }
  };

  return (
    <div className={`ascii-panel ${getVariantStyles()} ${className}`}>
      <div className="border-2 border-current p-4 font-mono text-sm">
        {title && (
          <div className="mb-4 border-b border-current pb-2">
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
        )}
        <div className="whitespace-pre-wrap">{children}</div>
      </div>
    </div>
  );
}
