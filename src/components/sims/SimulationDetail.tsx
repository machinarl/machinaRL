'use client';

import React from 'react';
import { SimCatalogItem } from '@/data/sims';
import StatusBadge from '@/components/ui/StatusBadge';
import AsciiPanel from '@/components/ui/AsciiPanel';
import WebGLIframe from '@/components/ui/WebGLIframe';

interface SimulationDetailProps {
  sim: SimCatalogItem;
  mockMetrics?: Record<string, number> | null;
}

const SimulationDetail: React.FC<SimulationDetailProps> = ({ sim, mockMetrics }) => {
  const defaultMetrics = {
    time_ms: Math.floor(Math.random() * 100000) + 10000,
    success_rate: Math.random() * 0.8 + 0.2,
    attempts: Math.floor(Math.random() * 50) + 10
  };

  const metrics = mockMetrics || defaultMetrics;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gray-100 border-2 border-[#0066CC] p-6 font-mono">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2 font-mono">
              {sim.name.toUpperCase()}
            </h1>
            <StatusBadge status={sim.status} />
          </div>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed">
          {sim.synopsis}
        </p>
      </div>

      {/* Unity WebGL Embed Panel */}
      <AsciiPanel title="Unity Simulation Viewport" borderColor="#0066CC">
        {sim.id === 'soccer' ? (
          <WebGLIframe
            src="/soccer/index.html"
            title={`${sim.name} Unity Simulation`}
            className="w-full"
            isPageReload={false}
            onLoad={() => console.log('WebGL simulation loaded')}
            onError={() => console.error('WebGL simulation failed to load')}
          />
        ) : (
          <div className="text-center py-8">
            <div className="mb-4">
              <pre className="text-2xl font-mono leading-tight text-[#0066CC]">
                {sim.placeholder.ascii.join('\n')}
              </pre>
            </div>
            <div className="text-gray-600 mb-4 text-sm">
              {sim.placeholder.note}
            </div>
            <div className="bg-gray-200 border-2 border-gray-400 p-4 text-center">
              <div className="text-lg font-mono text-gray-700 mb-2">
                ┌─────────────────────────────────────┐
              </div>
              <div className="text-sm font-mono text-gray-600 mb-2">
                UNITY BUILD: PENDING INTEGRATION
              </div>
              <div className="text-xs font-mono text-gray-500">
                drop /public/unity/{sim.id}/ here
              </div>
              <div className="text-lg font-mono text-gray-700 mt-2">
                └─────────────────────────────────────┘
              </div>
            </div>
          </div>
        )}
      </AsciiPanel>

      {/* Skills and Difficulty */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AsciiPanel title="Required Skills" borderColor="#006600">
          <div className="space-y-2">
            {sim.skills.map((skill, index) => (
              <div key={skill} className="flex items-center gap-2">
                <span className="text-xs text-gray-600 font-mono">
                  [{String(index + 1).padStart(2, '0')}]
                </span>
                <span className="px-3 py-1 bg-gray-200 border border-gray-400 text-gray-700 text-sm font-mono">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </AsciiPanel>

        <AsciiPanel title="Difficulty Levels" borderColor="#CC0000">
          <div className="space-y-2">
            {sim.difficulty.map((diff, index) => (
              <div key={diff} className="flex items-center gap-2">
                <span className="text-xs text-gray-600 font-mono">
                  [{String(index + 1).padStart(2, '0')}]
                </span>
                <span className="px-3 py-1 bg-gray-200 border border-gray-400 text-gray-700 text-sm font-mono">
                  {diff.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </AsciiPanel>
      </div>

      {/* Current Metrics */}
      <AsciiPanel title="Current Performance Metrics" borderColor="#0066CC">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#0066CC] font-mono mb-1">
              {metrics.time_ms.toLocaleString()}ms
            </div>
            <div className="text-xs text-gray-600 font-mono">AVERAGE TIME</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#006600] font-mono mb-1">
              {(metrics.success_rate * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-gray-600 font-mono">SUCCESS RATE</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#CC0000] font-mono mb-1">
              {metrics.attempts}
            </div>
            <div className="text-xs text-gray-600 font-mono">TOTAL ATTEMPTS</div>
          </div>
        </div>
      </AsciiPanel>

      {/* Planned Outputs */}
      <AsciiPanel title="Planned Metrics Output" borderColor="#006600">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sim.metrics.map((metric, index) => (
            <div key={metric} className="flex items-center gap-2">
              <span className="text-xs text-gray-600 font-mono">
                [{String(index + 1).padStart(2, '0')}]
              </span>
              <span className="px-3 py-1 bg-gray-200 border border-gray-400 text-gray-700 text-sm font-mono">
                {metric.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-gray-600 font-mono">
          {/* These metrics will be emitted by the Unity simulation when integrated */}
        </div>
      </AsciiPanel>

      {/* Evolution Rewards */}
      <AsciiPanel title="Likely Evolution Rewards" borderColor="#CC9900">
        <div className="space-y-2">
          {sim.evolutionRewards.map((reward, index) => (
            <div key={reward} className="flex items-center gap-2">
              <span className="text-xs text-gray-600 font-mono">
                [{String(index + 1).padStart(2, '0')}]
              </span>
              <span className="px-3 py-1 bg-gray-200 border border-gray-400 text-gray-700 text-sm font-mono">
                {reward.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-gray-600 font-mono">
          {/* Abilities and capabilities that AI agents may unlock through this simulation */}
        </div>
      </AsciiPanel>

      {/* Tags */}
      {sim.tags && sim.tags.length > 0 && (
        <AsciiPanel title="Simulation Tags" borderColor="#CC0000">
          <div className="flex flex-wrap gap-2">
            {sim.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-200 border border-gray-400 text-gray-700 text-sm font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </AsciiPanel>
      )}

      {/* Integration Status */}
      <AsciiPanel title="Integration Status" borderColor="#CC0000">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-gray-600">UNITY BUILD:</span>
            <span className="px-3 py-1 bg-gray-200 border border-gray-400 text-gray-700 text-sm font-mono">
              {sim.status === 'available' ? 'READY' : 'PENDING'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-gray-600">WEBGL EXPORT:</span>
            <span className="px-3 py-1 bg-gray-200 border border-gray-400 text-gray-700 text-sm font-mono">
              {sim.status === 'available' ? 'COMPLETE' : 'QUEUED'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-gray-600">API INTEGRATION:</span>
            <span className="px-3 py-1 bg-gray-200 border border-gray-400 text-gray-700 text-sm font-mono">
              {sim.status === 'available' ? 'ACTIVE' : 'PLANNED'}
            </span>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-600 font-mono">
          {/* PostMessage contract: SimCommand → Unity → SimEvent → SimResult */}
        </div>
      </AsciiPanel>
    </div>
  );
};

export default SimulationDetail;
