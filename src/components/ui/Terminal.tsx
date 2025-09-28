'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalProps {
  logs: string[];
  title?: string;
  className?: string;
}

const Terminal: React.FC<TerminalProps> = ({ 
  logs, 
  title = "AGENT ACTIVITY LOG",
  className = "" 
}) => {
  const [displayLogs, setDisplayLogs] = useState<string[]>([]);

  useEffect(() => {
    setDisplayLogs(logs.slice(-6)); // Show last 6 logs
  }, [logs]);

  return (
    <div className={`bg-black/95 backdrop-blur-sm border border-[#00FF00]/30 font-mono ${className}`}>
      {/* Terminal header */}
      <div className="border-b border-[#00FF00]/30 px-4 py-2 bg-[#00FF00]/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF3355]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFD700]"></div>
            <div className="w-3 h-3 rounded-full bg-[#00FF00]"></div>
          </div>
          <div className="text-[#00FF00] text-xs">
            {title}
          </div>
        </div>
      </div>

      {/* Terminal content */}
      <div className="p-4">
        <div className="text-[#00FF00] mb-2 text-xs">
          ┌─ {title} ─────────────────────────────────────────┐
        </div>
        
        <div className="h-32 overflow-hidden">
          <AnimatePresence>
            {displayLogs.map((log, index) => (
              <motion.div
                key={`${log}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="text-[#00FF00] text-xs mb-1 font-mono"
              >
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="text-[#00FF00] text-xs">
          └──────────────────────────────────────────────────┘
        </div>
        
        {/* Blinking cursor */}
        <div className="flex items-center mt-2">
          <span className="text-[#00FF00] text-xs mr-1">$</span>
          <div className="w-2 h-4 bg-[#00FF00] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;