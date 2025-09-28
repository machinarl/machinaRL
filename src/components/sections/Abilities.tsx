'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Move, 
  ArrowUp, 
  Mountain, 
  Compass, 
  Brain, 
  RefreshCw,
} from 'lucide-react';
import { staggerContainer, staggerItem, scaleOnHover } from '@/lib/animations';

const Abilities: React.FC = () => {
  const [selectedAbility, setSelectedAbility] = useState<string | null>(null);

  const abilities = [
    {
      id: 'movement',
      name: 'Movement',
      description: 'Basic locomotion and directional control',
      icon: Move,
      unlocked: true,
      unlockedBy: 'Default',
      details: 'Fundamental ability that allows agents to navigate in 3D space. Includes forward, backward, left, and right movement with smooth acceleration and deceleration.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'jumping',
      name: 'Jumping',
      description: 'Ability to leap over obstacles',
      icon: ArrowUp,
      unlocked: true,
      unlockedBy: 'Obstacle Course',
      details: 'Enables agents to overcome vertical barriers by calculating optimal jump timing and trajectory. Essential for obstacle courses.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'climbing',
      name: 'Climbing',
      description: 'Scale walls and vertical surfaces',
      icon: Mountain,
      unlocked: true,
      unlockedBy: 'Climbing Wall',
      details: 'Advanced motor skill allowing agents to ascend vertical surfaces by finding and utilizing handholds and footholds.',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'navigation',
      name: 'Navigation',
      description: 'Advanced pathfinding and spatial awareness',
      icon: Compass,
      unlocked: true,
      unlockedBy: 'Soccer',
      details: 'Sophisticated spatial reasoning that enables efficient route planning and obstacle avoidance in complex environments.',
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 'planning',
      name: 'Planning',
      description: 'Strategic thinking and multi-step reasoning',
      icon: Brain,
      unlocked: false,
      unlockedBy: 'Advanced Courses',
      details: 'High-level cognitive ability that allows agents to plan multiple moves ahead and develop complex strategies.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'adaptation',
      name: 'Adaptation',
      description: 'Learning from failures and adjusting strategy',
      icon: RefreshCw,
      unlocked: false,
      unlockedBy: 'Meta-Learning',
      details: 'The ultimate ability that enables agents to learn from their mistakes and continuously improve their performance.',
      color: 'from-indigo-500 to-blue-500'
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
            UNLOCKABLE ABILITIES
          </motion.h2>
          
          {/* ASCII Banner */}
          <motion.div 
            variants={staggerItem}
            className="font-mono text-[#0066CC] text-xs md:text-sm leading-none mb-8 opacity-80"
          >
            <pre className="whitespace-pre overflow-hidden">
{`    ╔══════════════════════════════════════════════════════════════╗
    ║  AGENT CAPABILITY MATRIX • NEURAL PATHWAY ACTIVATION  ║
    ╚══════════════════════════════════════════════════════════════╝`}
            </pre>
          </motion.div>
          
          <motion.p 
            variants={staggerItem}
            className="text-xl text-gray-700 max-w-3xl mx-auto"
          >
            As AI agents overcome challenges, they unlock new capabilities that expand their potential
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {abilities.map((ability) => (
            <motion.div
              key={ability.id}
              variants={staggerItem}
              whileHover={scaleOnHover.whileHover}
              whileTap={scaleOnHover.whileTap}
              transition={scaleOnHover.transition}
              onClick={() => setSelectedAbility(selectedAbility === ability.id ? null : ability.id)}
              className={`relative cursor-pointer group ${
                ability.unlocked ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <div className={`
                relative p-4 border-2 font-mono transition-all duration-300
                ${selectedAbility === ability.id 
                  ? 'border-[#0066CC] bg-[#0066CC]/5 shadow-[0_0_10px_#0066CC]' 
                  : ability.unlocked 
                    ? 'border-[#006600] hover:border-[#006600]/70 bg-gray-100' 
                    : 'border-gray-400 bg-gray-50'
                }
              `}>
                {/* ASCII Border */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#0066CC]"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#0066CC]"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#0066CC]"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#0066CC]"></div>

                {/* Icon */}
                <div className="relative z-10 mb-3">
                  <div className={`
                    w-10 h-10 border-2 flex items-center justify-center mb-2 font-mono text-xs
                    ${ability.unlocked 
                      ? 'border-[#006600] bg-[#006600]/10 text-[#006600]' 
                      : 'border-gray-400 bg-gray-100 text-gray-500'
                    }
                  `}>
                    {ability.unlocked ? '[ON]' : '[OFF]'}
                  </div>
                  
                  {/* Status indicator */}
                  <div className="absolute -top-1 -right-1 text-xs z-10">
                    {ability.unlocked ? '[ONLINE]' : '[LOCKED]'}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-black font-bold text-xs mb-1 uppercase tracking-wider">
                    {ability.name}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {ability.description}
                  </p>
                  
                  {/* ASCII Progress Bar */}
                  <div className="mt-2">
                    <div className="text-xs text-gray-500 mb-1">
                      [{ability.unlocked ? '██████████' : '░░░░░░░░░░'}] {ability.unlocked ? '100%' : '0%'}
                    </div>
                  </div>
                </div>

                {/* Unlock indicator */}
                {!ability.unlocked && (
                  <div className="absolute inset-0 bg-gray-100/60 flex items-end justify-center z-30 p-2">
                    <div className="text-center bg-red-100/90 p-2 rounded border border-red-300 shadow-lg">
                      <div className="text-xs text-red-700 font-mono font-bold">ACCESS DENIED</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed view */}
        {selectedAbility && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-100 border-2 border-[#0066CC] p-6 font-mono"
          >
            {(() => {
              const ability = abilities.find(a => a.id === selectedAbility);
              if (!ability) return null;

              return (
                <div className="space-y-6">
                  {/* ASCII Header */}
                  <div className="text-center">
                    <div className="text-[#0066CC] text-xs mb-2">
                      ┌─ ABILITY DETAILS ─────────────────────────────────────────────┐
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-2 uppercase tracking-wider">
                      {ability.name}
                    </h3>
                    <div className="text-[#0066CC] text-xs mb-4">
                      └──────────────────────────────────────────────────────────────┘
                    </div>
                  </div>

                  {/* Status */}
                  <div className="text-center">
                    <div className={`text-sm font-bold ${ability.unlocked ? 'text-[#006600]' : 'text-gray-500'}`}>
                      STATUS: {ability.unlocked ? '[ONLINE]' : '[OFFLINE]'}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {ability.unlocked ? '[ACTIVATED]' : '[LOCKED]'}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <div>
                      <div className="text-[#0066CC] text-xs mb-2">DESCRIPTION:</div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {ability.details}
                      </p>
                    </div>
                    
                    <div className="bg-gray-200 border border-gray-400 p-4">
                      <div className="text-[#0066CC] text-xs mb-2">UNLOCK CONDITION:</div>
                      <p className="text-gray-700 text-sm">
                        {ability.unlocked 
                          ? `[COMPLETED] ${ability.unlockedBy}`
                          : `[REQUIRED] ${ability.unlockedBy}`
                        }
                      </p>
                    </div>
                  </div>

                  {/* ASCII Footer */}
                  <div className="text-center text-[#0066CC] text-xs">
                    ┌──────────────────────────────────────────────────────────────┐
                    <br />
                    │  END OF ABILITY DATA • SYSTEM READY FOR NEXT QUERY  │
                    <br />
                    └──────────────────────────────────────────────────────────────┘
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-block bg-gray-100 border-2 border-[#0066CC] p-6 font-mono">
            <div className="text-[#0066CC] text-xs mb-4">
              ┌─ SYSTEM STATUS REPORT ─────────────────────────────────────────────┐
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <div className="text-black">
                  <span className="text-3xl font-bold">4</span>
                  <span className="text-gray-600 ml-1">/ 6</span>
                </div>
                <div className="text-gray-600">
                  <div className="text-sm font-bold">ABILITIES UNLOCKED</div>
                  <div className="text-xs mt-1">
                    [████████░░] 67% COMPLETE
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-600">
                STATUS: <span className="text-[#006600] font-bold">ACTIVE</span> | 
                NEXT TARGET: <span className="text-[#0066CC] font-bold">PLANNING</span>
              </div>
            </div>
            
            <div className="text-[#0066CC] text-xs mt-4">
              └──────────────────────────────────────────────────────────────┘
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Abilities;