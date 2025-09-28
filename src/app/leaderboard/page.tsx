'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import AsciiPanel from '@/components/AsciiPanel';
import { LeaderboardRow } from '@/types/leaderboard';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    course: '',
    model: '',
    sortBy: 'bestTime',
    sortOrder: 'asc' as 'asc' | 'desc',
  });

  useEffect(() => {
    fetchLeaderboard();
  }, [filters]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.course) params.append('course', filters.course);
      if (filters.model) params.append('model', filters.model);
      params.append('sortBy', filters.sortBy);
      params.append('sortOrder', filters.sortOrder);

      const response = await fetch(`/api/leaderboard?${params}`);
      const data = await response.json();

      if (data.success) {
        setLeaderboard(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      course: '',
      model: '',
      sortBy: 'bestTime',
      sortOrder: 'asc',
    });
  };

  const formatTime = (ms?: number) => {
    if (!ms) return 'N/A';
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const formatSuccessRate = (rate?: number) => {
    if (!rate) return 'N/A';
    return `${rate.toFixed(1)}%`;
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-mono text-gray-900 mb-4">
            Leaderboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how different AI models perform across simulations
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold font-mono text-gray-900 mb-4">
            FILTERS & SORTING
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course
              </label>
              <select
                value={filters.course}
                onChange={(e) => handleFilterChange('course', e.target.value)}
                className="w-full p-2 border-2 border-gray-300 rounded font-mono"
              >
                <option value="">All Courses</option>
                <option value="maze">Maze</option>
                <option value="obstacle">Obstacle</option>
                <option value="climb">Climb</option>
                <option value="pushblock">Push Block</option>
                <option value="pyramids">Pyramids</option>
                <option value="food_collector">Food Collector</option>
                <option value="hallway">Hallway</option>
                <option value="gridworld">Grid World</option>
                <option value="walker">Walker</option>
                <option value="crawler">Crawler</option>
                <option value="ball3d">3D Ball</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Model
              </label>
              <select
                value={filters.model}
                onChange={(e) => handleFilterChange('model', e.target.value)}
                className="w-full p-2 border-2 border-gray-300 rounded font-mono"
              >
                <option value="">All Models</option>
                <option value="chatgpt">ChatGPT</option>
                <option value="claude">Claude</option>
                <option value="grok">Grok</option>
                <option value="gemini">Gemini</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full p-2 border-2 border-gray-300 rounded font-mono"
              >
                <option value="bestTime">Best Time</option>
                <option value="successRate">Success Rate</option>
                <option value="totalScore">Total Score</option>
                <option value="lastRun">Last Run</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Order
              </label>
              <select
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                className="w-full p-2 border-2 border-gray-300 rounded font-mono"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button
                variant="secondary"
                size="md"
                onClick={clearFilters}
                className="w-full"
              >
                [ CLEAR ]
              </Button>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="text-gray-500 font-mono">Loading leaderboard...</div>
            </div>
          ) : leaderboard.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-sm">
                <thead className="bg-gray-50 border-b-2 border-gray-300">
                  <tr>
                    <th className="text-left py-4 px-6 font-bold">RANK</th>
                    <th className="text-left py-4 px-6 font-bold">MODEL</th>
                    <th className="text-left py-4 px-6 font-bold">COURSE</th>
                    <th className="text-left py-4 px-6 font-bold">BEST TIME</th>
                    <th className="text-left py-4 px-6 font-bold">SUCCESS RATE</th>
                    <th className="text-left py-4 px-6 font-bold">ATTEMPTS</th>
                    <th className="text-left py-4 px-6 font-bold">EVOLUTION</th>
                    <th className="text-left py-4 px-6 font-bold">LAST RUN</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((row, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-200 hover:bg-gray-50 ${
                        index < 3 ? 'bg-yellow-50' : ''
                      }`}
                    >
                      <td className="py-4 px-6 font-bold">
                        {index < 3 ? (
                          <span className="text-yellow-600">
                            #{row.rank || index + 1}
                          </span>
                        ) : (
                          `#${row.rank || index + 1}`
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded border">
                          {row.model}
                        </span>
                      </td>
                      <td className="py-4 px-6">{row.course}</td>
                      <td className="py-4 px-6 font-mono">
                        {formatTime(row.bestTimeMs)}
                      </td>
                      <td className="py-4 px-6">
                        {formatSuccessRate(row.successRate)}
                      </td>
                      <td className="py-4 px-6">{row.attempts || 'N/A'}</td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded border">
                          {row.evolutionStage || 'Primitive'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs">
                        {row.lastRun
                          ? new Date(row.lastRun).toLocaleDateString()
                          : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold font-mono text-gray-900 mb-2">
                No Results Yet
              </h3>
              <p className="text-gray-600 mb-4">
                Be the first to complete a simulation and appear on the leaderboard!
              </p>
              <Button variant="primary" href="/demo">
                [ START DEMO ]
              </Button>
            </div>
          )}
        </div>

        {/* Stats */}
        {leaderboard.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <AsciiPanel>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {leaderboard.length}
                </div>
                <div className="text-sm text-gray-600">Total Entries</div>
              </div>
            </AsciiPanel>
            <AsciiPanel>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {new Set(leaderboard.map(row => row.model)).size}
                </div>
                <div className="text-sm text-gray-600">Unique Models</div>
              </div>
            </AsciiPanel>
            <AsciiPanel>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {new Set(leaderboard.map(row => row.course)).size}
                </div>
                <div className="text-sm text-gray-600">Courses Played</div>
              </div>
            </AsciiPanel>
          </div>
        )}
      </div>
    </div>
  );
}