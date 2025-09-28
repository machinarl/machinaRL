'use client';

import { useState, useEffect, useRef } from 'react';
import { SimEvent } from '@/types/sim';

interface TerminalProps {
  events: SimEvent[];
  className?: string;
  maxLines?: number;
  autoScroll?: boolean;
}

export default function Terminal({
  events,
  className = '',
  maxLines = 100,
  autoScroll = true,
}: TerminalProps) {
  const [displayedEvents, setDisplayedEvents] = useState<SimEvent[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayedEvents(prev => {
      const newEvents = [...prev, ...events].slice(-maxLines);
      return newEvents;
    });
  }, [events, maxLines]);

  useEffect(() => {
    if (autoScroll && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedEvents, autoScroll]);

  const formatEvent = (event: SimEvent) => {
    const timestamp = new Date(event.t).toLocaleTimeString();
    const type = event.type.padEnd(8);
    
    switch (event.type) {
      case 'LOG':
        return `[${timestamp}] ${type} ${event.message || ''}`;
      case 'STATUS':
        return `[${timestamp}] ${type} ${event.status?.abilityUnlocked ? `Ability unlocked: ${event.status.abilityUnlocked}` : ''} ${event.status?.bodyEvolvedTo ? `Body evolved to: ${event.status.bodyEvolvedTo}` : ''}`;
      case 'METRIC':
        return `[${timestamp}] ${type} ${event.metric?.key}: ${event.metric?.value}`;
      case 'COMPLETE':
        return `[${timestamp}] ${type} Simulation completed successfully`;
      case 'ERROR':
        return `[${timestamp}] ${type} ${event.message || 'Unknown error'}`;
      default:
        return `[${timestamp}] ${type} ${event.message || ''}`;
    }
  };

  const getEventColor = (event: SimEvent) => {
    switch (event.type) {
      case 'LOG':
        return 'text-gray-700';
      case 'STATUS':
        return 'text-green-600';
      case 'METRIC':
        return 'text-blue-600';
      case 'COMPLETE':
        return 'text-green-800 font-bold';
      case 'ERROR':
        return 'text-red-600 font-bold';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className={`terminal ${className}`}>
      <div className="border-2 border-gray-300 bg-black text-green-400 font-mono text-sm">
        <div className="border-b border-gray-600 bg-gray-800 px-4 py-2">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-gray-300">machinaRL Terminal</span>
          </div>
        </div>
        <div
          ref={terminalRef}
          className="h-64 overflow-y-auto p-4 space-y-1"
        >
          {displayedEvents.length === 0 ? (
            <div className="text-gray-500 italic">
              Waiting for simulation events...
            </div>
          ) : (
            displayedEvents.map((event, index) => (
              <div
                key={index}
                className={`${getEventColor(event)} whitespace-pre-wrap`}
              >
                {formatEvent(event)}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
