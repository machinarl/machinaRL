'use client';

import { useState, useEffect } from 'react';
import SimulationCard from '@/components/SimulationCard';
import Button from '@/components/Button';
import { simulations } from '@/data/sims';

export default function SimulationsPage() {
  const [filteredSims, setFilteredSims] = useState(simulations);
  const [filters, setFilters] = useState({
    difficulty: '',
    status: '',
    tag: '',
  });

  useEffect(() => {
    let filtered = simulations;

    if (filters.difficulty) {
      filtered = filtered.filter(sim => sim.difficulty === filters.difficulty);
    }

    if (filters.status) {
      filtered = filtered.filter(sim => sim.status === filters.status);
    }

    if (filters.tag) {
      filtered = filtered.filter(sim => sim.tags.includes(filters.tag));
    }

    setFilteredSims(filtered);
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      difficulty: '',
      status: '',
      tag: '',
    });
  };

  const allTags = Array.from(new Set(simulations.flatMap(sim => sim.tags)));

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-mono text-gray-900 mb-4">
            Simulations Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our collection of 3D simulation challenges designed to test AI agents
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold font-mono text-gray-900 mb-4">
            FILTERS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="w-full p-2 border-2 border-gray-300 rounded font-mono"
              >
                <option value="">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full p-2 border-2 border-gray-300 rounded font-mono"
              >
                <option value="">All Status</option>
                <option value="available">Available</option>
                <option value="prototype">Prototype</option>
                <option value="coming_soon">Coming Soon</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tag
              </label>
              <select
                value={filters.tag}
                onChange={(e) => handleFilterChange('tag', e.target.value)}
                className="w-full p-2 border-2 border-gray-300 rounded font-mono"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <Button
                variant="secondary"
                size="md"
                onClick={clearFilters}
                className="w-full"
              >
                [ CLEAR FILTERS ]
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-mono">
            Showing {filteredSims.length} of {simulations.length} simulations
          </p>
        </div>

        {/* Simulations Grid */}
        {filteredSims.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSims.map((sim) => (
              <SimulationCard key={sim.id} simulation={sim} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-6">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold font-mono text-gray-900 mb-2">
                No Simulations Found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters to see more results
              </p>
            </div>
            <Button variant="primary" onClick={clearFilters}>
              [ CLEAR FILTERS ]
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}