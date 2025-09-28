'use client';

import { useState, useEffect } from 'react';
import UnityEmbed from '@/components/UnityEmbed';
import Terminal from '@/components/Terminal';
import Button from '@/components/Button';
import AsciiPanel from '@/components/AsciiPanel';
import { SimEvent, SimCommand } from '@/types/sim';

export default function DemoPage() {
  const [selectedSim, setSelectedSim] = useState('maze');
  const [selectedModel, setSelectedModel] = useState('chatgpt');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [isRunning, setIsRunning] = useState(false);
  const [events, setEvents] = useState<SimEvent[]>([]);

  const simulations = [
    { id: 'maze', name: 'Maze Navigator' },
    { id: 'obstacle', name: 'Obstacle Course' },
    { id: 'climb', name: 'Wall Climber' },
    { id: 'pushblock', name: 'Push Block Puzzle' },
    { id: 'pyramids', name: 'Pyramid Builder' },
    { id: 'food_collector', name: 'Food Collector' },
  ];

  const models = [
    { id: 'chatgpt', name: 'ChatGPT' },
    { id: 'claude', name: 'Claude' },
    { id: 'grok', name: 'Grok' },
    { id: 'gemini', name: 'Gemini' },
  ];

  const difficulties = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
    { id: 'expert', name: 'Expert' },
  ];

  const startSimulation = async () => {
    setIsRunning(true);
    setEvents([]);

    const command: SimCommand = {
      course: selectedSim as any,
      model: selectedModel as any,
      difficulty: selectedDifficulty as any,
      seed: Math.floor(Math.random() * 1000000),
    };

    try {
      const response = await fetch('/api/sim/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(command),
      });

      const data = await response.json();

      if (data.success) {
        // Simulate events for demo
        simulateEvents();
      }
    } catch (error) {
      console.error('Failed to start simulation:', error);
      setIsRunning(false);
    }
  };

  const simulateEvents = () => {
    const eventTypes = ['LOG', 'STATUS', 'METRIC', 'COMPLETE', 'ERROR'];
    const messages = [
      'Initializing simulation...',
      'Loading environment...',
      'Spawning agent...',
      'Starting challenge...',
      'Agent is learning...',
      'Adapting strategy...',
      'Making progress...',
      'Overcoming obstacles...',
      'Simulation completed!',
    ];

    let eventIndex = 0;
    const interval = setInterval(() => {
      if (eventIndex >= messages.length) {
        clearInterval(interval);
        setIsRunning(false);
        return;
      }

      const event: SimEvent = {
        t: Date.now(),
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)] as any,
        message: messages[eventIndex],
        metric: Math.random() > 0.5 ? {
          key: 'progress',
          value: Math.floor(Math.random() * 100),
        } : undefined,
      };

      setEvents(prev => [...prev, event]);
      eventIndex++;
    }, 1000);
  };

  const pauseSimulation = () => {
    setIsRunning(false);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setEvents([]);
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-mono text-gray-900 mb-4">
            Live Simulation Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch AI agents compete in real-time 3D simulations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Unity Embed */}
          <div>
            <h2 className="text-2xl font-bold font-mono text-gray-900 mb-4">
              Simulation View
            </h2>
            <UnityEmbed
              simulationId={selectedSim}
              onEvent={(event) => {
                console.log('Unity event:', event);
              }}
              onReady={() => {
                console.log('Unity ready');
              }}
              onError={(error) => {
                console.error('Unity error:', error);
              }}
              className="mb-6"
            />
          </div>

          {/* Right Panel - Terminal */}
          <div>
            <h2 className="text-2xl font-bold font-mono text-gray-900 mb-4">
              Event Log
            </h2>
            <Terminal
              events={events}
              className="mb-6"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8">
          <AsciiPanel className="mb-6">
            <h3 className="text-lg font-bold font-mono text-gray-900 mb-4">
              SIMULATION CONTROLS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Simulation
                </label>
                <select
                  value={selectedSim}
                  onChange={(e) => setSelectedSim(e.target.value)}
                  className="w-full p-2 border-2 border-gray-300 rounded font-mono"
                  disabled={isRunning}
                >
                  {simulations.map(sim => (
                    <option key={sim.id} value={sim.id}>
                      {sim.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  AI Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full p-2 border-2 border-gray-300 rounded font-mono"
                  disabled={isRunning}
                >
                  {models.map(model => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Difficulty
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full p-2 border-2 border-gray-300 rounded font-mono"
                  disabled={isRunning}
                >
                  {difficulties.map(diff => (
                    <option key={diff.id} value={diff.id}>
                      {diff.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </AsciiPanel>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={startSimulation}
              disabled={isRunning}
            >
              [ START ]
            </Button>
            <Button
              variant="warning"
              size="lg"
              onClick={pauseSimulation}
              disabled={!isRunning}
            >
              [ PAUSE ]
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={resetSimulation}
            >
              [ RESET ]
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
