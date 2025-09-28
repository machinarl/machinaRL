'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AI_MODELS } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/animations';

const Hero: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]);



  return (
    <>
      {/* Resource HUD */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-[#0066CC]/30">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <div className="flex gap-6">
              <div className="text-[#006600]">
                [██████████] AGENTS ONLINE
              </div>
              <div className="text-[#006600]">
                [████████░░] PROCESSING
              </div>
              <div className="text-[#006600]">
                [███████░░░] LEARNING
              </div>
            </div>
            <div className="text-[#0066CC]">
              SYSTEM STATUS: ACTIVE
            </div>
          </div>
        </div>
      </div>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-24">
        {/* Floating background shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-8 h-8 border border-[#0066CC]/30 rotate-45 animate-spin-slow"></div>
          <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-[#0066CC]/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-3/4 w-4 h-4 border-2 border-[#006600]/40 animate-bounce"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center">
            {/* Giant machinaRL title */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="mb-8"
            >
              <motion.h1 
                variants={staggerItem}
                className="text-6xl md:text-8xl lg:text-9xl font-black text-black mb-4 tracking-tight"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                machinaRL
              </motion.h1>
              
              {/* ASCII banner */}
              <motion.div 
                variants={staggerItem}
                className="font-mono text-[#0066CC] text-xs md:text-sm leading-none mb-8 opacity-60"
              >
                <pre className="whitespace-pre overflow-hidden">
{`    ╔══════════════════════════════════════╗
    ║  3D LLM SANDBOX • REINFORCEMENT LOOP ║
    ╚══════════════════════════════════════╝`}
                </pre>
              </motion.div>

              <motion.p 
                variants={staggerItem}
                className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-mono"
              >
                Autonomous agents start as shapes. They learn through reinforcement.
                <br />
                <span className="text-[#0066CC] font-bold">[WATCH AI EVOLVE IN REAL-TIME]</span>
              </motion.p>
            </motion.div>

            {/* CTA Buttons with ASCII theme */}
            <motion.div 
              variants={staggerItem}
              initial="initial"
              animate="animate"
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link href="/livesim">
                <button className="group px-8 py-4 bg-[#0066CC] text-white font-bold text-lg hover:bg-[#0066CC]/90 hover:shadow-[0_0_20px_#0066CC] transition-all duration-300 min-w-[200px] font-mono border-2 border-[#0066CC]">
                  [LIVE SIM]
                </button>
              </Link>
              
              <Link href="/leaderboard">
                <button className="group px-8 py-4 border-2 border-[#006600] text-[#006600] font-bold text-lg hover:bg-[#006600]/10 hover:shadow-[0_0_20px_#006600] transition-all duration-300 min-w-[200px] font-mono bg-white">
                  [LEADERBOARD]
                </button>
              </Link>
              
              <Link href="/docs">
                <button className="group px-8 py-4 border-2 border-gray-400 text-gray-700 font-bold text-lg hover:border-black hover:text-black hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all duration-300 min-w-[200px] font-mono bg-white">
                  [DOCUMENTATION]
                </button>
              </Link>
            </motion.div>

            {/* Agent Status Grid */}
            <motion.div 
              variants={staggerItem}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              {AI_MODELS.map((model) => (
                <div 
                  key={model.id}
                  className={`p-4 border font-mono text-sm transition-all cursor-pointer ${
                    selectedModel.id === model.id
                      ? 'border-[#0066CC] bg-[#0066CC]/10 shadow-[0_0_10px_#0066CC]'
                      : 'border-gray-300 hover:border-gray-500 bg-gray-100/50'
                  }`}
                  onClick={() => setSelectedModel(model)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div 
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: model.color }}
                    ></div>
                    <span className="text-[#006600] text-xs">ONLINE</span>
                  </div>
                  <h3 className="text-black font-bold text-xs mb-1">{model.name.toUpperCase()}</h3>
                  <div className="text-gray-600 text-xs">
                    [████████░░] READY
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Hero;