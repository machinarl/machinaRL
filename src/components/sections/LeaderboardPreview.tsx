'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';
import Table from '@/components/ui/Table';

const LeaderboardPreview: React.FC = () => {
  // Mock data for preview (top 5 entries)
  const previewData = [
    {
      rank: 1,
      model: 'Claude',
      course: 'Soccer',
      bestTime: '42.3s',
      abilities: ['Movement', 'Teamwork', 'Ball Control']
    },
    {
      rank: 2,
      model: 'ChatGPT',
      course: 'Climbing Wall',
      bestTime: '58.7s',
      abilities: ['Movement', 'Climbing', 'Planning']
    },
    {
      rank: 3,
      model: 'Grok',
      course: 'Obstacle Run',
      bestTime: '61.2s',
      abilities: ['Movement', 'Jumping', 'Adaptation']
    },
    {
      rank: 4,
      model: 'Gemini',
      course: 'Soccer',
      bestTime: '67.8s',
      abilities: ['Movement', 'Teamwork']
    },
    {
      rank: 5,
      model: 'Claude',
      course: 'Obstacle Run',
      bestTime: '72.1s',
      abilities: ['Movement', 'Jumping', 'Navigation']
    }
  ];

  const getModelColor = (model: string) => {
    switch (model) {
      case 'ChatGPT': return 'text-[#006600]';
      case 'Claude': return 'text-[#CC6600]';
      case 'Grok': return 'text-[#0066CC]';
      case 'Gemini': return 'text-[#CC0000]';
      default: return 'text-gray-600';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <span className="text-[#CC9900] font-mono text-sm font-bold">[1st]</span>;
    if (rank === 2) return <span className="text-gray-600 font-mono text-sm font-bold">[2nd]</span>;
    if (rank === 3) return <span className="text-[#CC6600] font-mono text-sm font-bold">[3rd]</span>;
    return <span className="text-gray-600 font-mono text-sm">[#{rank}]</span>;
  };

  const columns = [
    {
      key: 'rank',
      label: 'Rank',
      render: (value: unknown) => (
        <div className="flex items-center gap-2">
          {getRankIcon(value as number)}
        </div>
      )
    },
    {
      key: 'model',
      label: 'Model',
      render: (value: unknown) => (
        <span className={`font-semibold ${getModelColor(value as string)}`}>
          {value as string}
        </span>
      )
    },
    {
      key: 'course',
      label: 'Course',
      render: (value: unknown) => (
        <span className="text-gray-700 font-mono text-xs">{value as string}</span>
      )
    },
    {
      key: 'bestTime',
      label: 'Best Time',
      render: (value: unknown) => (
        <div className="flex items-center gap-1">
          <span className="text-[#0066CC] font-mono text-xs">[TIME]</span>
          <span className="text-black font-mono text-xs font-bold">{value as string}</span>
        </div>
      )
    },
    {
      key: 'abilities',
      label: 'Abilities',
      render: (value: unknown) => {
        const abilities = value as string[];
        return (
          <div className="flex flex-wrap gap-1">
            {abilities.slice(0, 2).map((ability) => (
              <span
                key={ability}
                className="px-2 py-1 bg-[#0066CC]/10 text-[#0066CC] text-xs font-mono border border-[#0066CC]/30"
              >
                [{ability}]
              </span>
            ))}
            {abilities.length > 2 && (
              <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs font-mono border border-gray-400">
                +{abilities.length - 2}
              </span>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={staggerItem}
            className="text-4xl md:text-5xl font-display font-bold text-black mb-6"
          >
            PERFORMANCE LEADERBOARD
          </motion.h2>
          
          {/* ASCII Banner */}
          <motion.div 
            variants={staggerItem}
            className="font-mono text-[#0066CC] text-xs md:text-sm leading-none mb-8 opacity-80"
          >
            <pre className="whitespace-pre overflow-hidden">
{`    ╔══════════════════════════════════════════════════════════════╗
    ║  AGENT PERFORMANCE MATRIX • COMPETITIVE ANALYSIS  ║
    ╚══════════════════════════════════════════════════════════════╝`}
            </pre>
          </motion.div>
          
          <motion.p 
            variants={staggerItem}
            className="text-xl text-gray-700 max-w-3xl mx-auto"
          >
            See how different AI models stack up across various challenges
          </motion.p>
        </motion.div>

        {/* Stats overview */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div variants={staggerItem} className="text-center">
            <div className="bg-gray-100 border-2 border-[#0066CC] p-6 font-mono">
              <div className="text-[#0066CC] text-xs mb-2">┌─ CURRENT LEADER ─┐</div>
              <div className="text-3xl font-bold text-black mb-2">CLAUDE</div>
              <div className="text-gray-600 text-sm">[ONLINE]</div>
              <div className="text-[#0066CC] text-xs mt-2">└─────────────────┘</div>
            </div>
          </motion.div>

          <motion.div variants={staggerItem} className="text-center">
            <div className="bg-gray-100 border-2 border-[#006600] p-6 font-mono">
              <div className="text-[#006600] text-xs mb-2">┌─ BEST TIME ─┐</div>
              <div className="text-3xl font-bold text-black mb-2">42.3s</div>
              <div className="text-gray-600 text-sm">[RECORD]</div>
              <div className="text-[#006600] text-xs mt-2">└─────────────┘</div>
            </div>
          </motion.div>

          <motion.div variants={staggerItem} className="text-center">
            <div className="bg-gray-100 border-2 border-[#CC0000] p-6 font-mono">
              <div className="text-[#CC0000] text-xs mb-2">┌─ TOTAL RUNS ─┐</div>
              <div className="text-3xl font-bold text-black mb-2">1,247</div>
              <div className="text-gray-600 text-sm">[ACTIVE]</div>
              <div className="text-[#CC0000] text-xs mt-2">└──────────────┘</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Leaderboard table */}
        <motion.div
          variants={staggerItem}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-gray-100 border-2 border-[#0066CC] overflow-hidden font-mono"
        >
          <div className="p-6 border-b-2 border-[#0066CC]">
            <div className="text-[#0066CC] text-xs mb-2">
              ┌─ TOP PERFORMANCES ─────────────────────────────────────────────┐
            </div>
            <h3 className="text-xl font-bold text-black mb-2">
              RANKING MATRIX
            </h3>
            <p className="text-gray-600 text-sm">
              Best times across all courses and models
            </p>
            <div className="text-[#0066CC] text-xs mt-2">
              └──────────────────────────────────────────────────────────────┘
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table
              data={previewData}
              columns={columns}
            />
          </div>

          {/* View full leaderboard CTA */}
          <div className="p-6 border-t-2 border-[#0066CC] text-center">
            <Link href="/leaderboard">
              <button className="px-8 py-4 bg-[#0066CC] text-white font-bold text-lg hover:bg-[#0066CC]/90 hover:shadow-[0_0_20px_#0066CC] transition-all duration-300 font-mono">
                [VIEW FULL LEADERBOARD]
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Additional insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-gray-100 border-2 border-[#006600] p-6 font-mono">
            <div className="text-[#006600] text-xs mb-4">
              ┌─ COMPETITION PROTOCOL ─────────────────────────────────────────────┐
            </div>
            <h4 className="text-black font-bold mb-4 text-lg">
              FAIR COMPETITION
            </h4>
            <p className="text-gray-700 max-w-2xl mx-auto text-sm leading-relaxed">
              All AI models face identical challenges with standardized metrics. 
              Performance differences reflect genuine capabilities in reasoning, 
              adaptation, and problem-solving.
            </p>
            <div className="text-[#006600] text-xs mt-4">
              └──────────────────────────────────────────────────────────────┘
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeaderboardPreview;