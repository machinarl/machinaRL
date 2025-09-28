'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import AsciiPanel from '@/components/AsciiPanel';
import SimulationCard from '@/components/SimulationCard';
import { simulations } from '@/data/sims';

export default function HomePage() {
  const [featuredSims, setFeaturedSims] = useState(simulations.slice(0, 6));
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch leaderboard data
    fetch('/api/leaderboard?limit=5')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setLeaderboardData(data.data.slice(0, 5));
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <AsciiPanel className="inline-block">
                <pre>
{`
    ┌─────────────────────────────────────────┐
    │  🧠 MACHINARL - LLM BRAINS IN 3D       │
    │                                         │
    │  ████████████████████████████████████████│
    │  █  █  █  █  █  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █  █  █  █  █  █│
    │  █  █  █  █  █  █  █  █  █  █  █  █  █│
    │  ████████████████████████████████████████│
    │                                         │
    │  Watch AI agents evolve through         │
    │  3D simulation challenges               │
    └─────────────────────────────────────────┘
`}
                </pre>
              </AsciiPanel>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold font-mono text-gray-900 mb-6">
              machinaRL
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              A web platform where LLM "brains" (ChatGPT, Claude, Grok, Gemini) compete in 3D simulations. 
              Watch agents evolve through challenges and unlock new abilities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  [ TRY DEMO ]
                </Button>
              </Link>
              <Link href="/sims">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  [ BROWSE SIMS ]
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the page content will be added in separate chunks */}
    </div>
  );
}