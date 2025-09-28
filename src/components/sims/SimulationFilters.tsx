'use client';

import React, { useState, useCallback } from 'react';
import { SimCatalogItem, getAllTags, getAllDifficulties } from '@/data/sims';

interface SimulationFiltersProps {
  sims: SimCatalogItem[];
  onFilteredSims: (filteredSims: SimCatalogItem[]) => void;
}

const SimulationFilters: React.FC<SimulationFiltersProps> = ({ sims, onFilteredSims }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const allTags = getAllTags();
  const allDifficulties = getAllDifficulties();
  const allStatuses = ['available', 'prototype', 'coming_soon'];

  const applyFilters = useCallback(() => {
    let filtered = [...sims];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(sim => 
        sim.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sim.synopsis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sim.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(sim => 
        sim.tags && sim.tags.some(tag => selectedTags.includes(tag))
      );
    }

    // Difficulty filter
    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter(sim => 
        sim.difficulty.some(diff => selectedDifficulties.includes(diff))
      );
    }

    // Status filter
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(sim => 
        selectedStatuses.includes(sim.status)
      );
    }

    onFilteredSims(filtered);
  }, [sims, searchTerm, selectedTags, selectedDifficulties, selectedStatuses, onFilteredSims]);

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
  };

  const toggleDifficulty = (difficulty: string) => {
    const newDifficulties = selectedDifficulties.includes(difficulty)
      ? selectedDifficulties.filter(d => d !== difficulty)
      : [...selectedDifficulties, difficulty];
    setSelectedDifficulties(newDifficulties);
  };

  const toggleStatus = (status: string) => {
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter(s => s !== status)
      : [...selectedStatuses, status];
    setSelectedStatuses(newStatuses);
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedDifficulties([]);
    setSelectedStatuses([]);
    setSearchTerm('');
    onFilteredSims(sims);
  };

  // Apply filters when dependencies change
  React.useEffect(() => {
    applyFilters();
  }, [selectedTags, selectedDifficulties, selectedStatuses, searchTerm, sims, applyFilters]);

  return (
    <div className="bg-gray-100 border-2 border-[#0066CC] p-6 mb-8 font-mono">
      <div className="mb-4">
        <div className="text-sm font-bold mb-2 text-[#0066CC]">
          ┌─ FILTER CONTROLS {'─'.repeat(35)}┐
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="text-xs text-gray-600 mb-2 font-mono">SEARCH:</div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="[ SEARCH SIMULATIONS... ]"
          className="w-full p-2 border-2 border-gray-400 bg-white text-black font-mono text-sm focus:border-[#0066CC] focus:outline-none"
        />
      </div>

      {/* Tags */}
      <div className="mb-6">
        <div className="text-xs text-gray-600 mb-2 font-mono">TAGS:</div>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 text-xs font-mono border-2 transition-all duration-300 ${
                selectedTags.includes(tag)
                  ? 'bg-[#0066CC] text-white border-[#0066CC]'
                  : 'bg-gray-200 text-gray-700 border-gray-400 hover:border-[#0066CC]'
              }`}
            >
              [ {tag} ]
            </button>
          ))}
        </div>
      </div>

      {/* Difficulties */}
      <div className="mb-6">
        <div className="text-xs text-gray-600 mb-2 font-mono">DIFFICULTY:</div>
        <div className="flex flex-wrap gap-2">
          {allDifficulties.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => toggleDifficulty(difficulty)}
              className={`px-3 py-1 text-xs font-mono border-2 transition-all duration-300 ${
                selectedDifficulties.includes(difficulty)
                  ? 'bg-[#006600] text-white border-[#006600]'
                  : 'bg-gray-200 text-gray-700 border-gray-400 hover:border-[#006600]'
              }`}
            >
              [ {difficulty.toUpperCase()} ]
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mb-6">
        <div className="text-xs text-gray-600 mb-2 font-mono">STATUS:</div>
        <div className="flex flex-wrap gap-2">
          {allStatuses.map((status) => (
            <button
              key={status}
              onClick={() => toggleStatus(status)}
              className={`px-3 py-1 text-xs font-mono border-2 transition-all duration-300 ${
                selectedStatuses.includes(status)
                  ? 'bg-[#CC0000] text-white border-[#CC0000]'
                  : 'bg-gray-200 text-gray-700 border-gray-400 hover:border-[#CC0000]'
              }`}
            >
              [ {status.toUpperCase().replace('_', ' ')} ]
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <div className="text-center">
        <button
          onClick={clearFilters}
          className="px-4 py-2 border-2 border-gray-400 text-gray-700 font-mono text-sm hover:border-[#0066CC] hover:text-[#0066CC] hover:shadow-[0_0_10px_rgba(0,102,204,0.3)] transition-all duration-300"
        >
          [ CLEAR ALL FILTERS ]
        </button>
      </div>

      <div className="mt-4">
        <div className="text-sm font-bold text-[#0066CC]">
          └{'─'.repeat(52)}┘
        </div>
      </div>
    </div>
  );
};

export default SimulationFilters;
