'use client';

import React from 'react';

interface ASCIIArtProps {
  type: 'logo' | 'separator' | 'box' | 'agents';
  className?: string;
}

const ASCIIArt: React.FC<ASCIIArtProps> = ({ type, className = '' }) => {
  const artMap = {
    logo: `
    ╔══════════════════════════════════════╗
    ║  3D LLM SANDBOX • REINFORCEMENT LOOP ║
    ╚══════════════════════════════════════╝`,
    
    separator: `
    ────────────────────────────────────────`,
    
    box: `
    ┌─────────────────────────────────────┐
    │                                     │
    └─────────────────────────────────────┘`,
    
    agents: `
    ◆ CUBE    ● SPHERE    ▲ PYRAMID
    ├─ GROK   ├─ CLAUDE   ├─ GEMINI
    └─ GPT-4  └─ SONNET   └─ ULTRA`
  };

  return (
    <pre className={`font-mono text-[#00AFFF] leading-none select-none ${className}`}>
      {artMap[type]}
    </pre>
  );
};

export default ASCIIArt;