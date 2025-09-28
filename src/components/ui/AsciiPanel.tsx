'use client';

import React from 'react';

interface AsciiPanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  borderColor?: string;
}

const AsciiPanel: React.FC<AsciiPanelProps> = ({ 
  children, 
  className = '', 
  title,
  borderColor = '#0066CC' 
}) => {
  return (
    <div className={`bg-gray-100 border-2 p-6 font-mono ${className}`} style={{ borderColor }}>
      {title && (
        <div className="mb-4">
          <div className="text-sm font-bold mb-2" style={{ color: borderColor }}>
            ┌─ {title.toUpperCase()} {'─'.repeat(Math.max(0, 50 - title.length))}┐
          </div>
        </div>
      )}
      <div className="text-black">
        {children}
      </div>
      {title && (
        <div className="mt-4">
          <div className="text-sm font-bold" style={{ color: borderColor }}>
            └{'─'.repeat(52)}┘
          </div>
        </div>
      )}
    </div>
  );
};

export default AsciiPanel;
