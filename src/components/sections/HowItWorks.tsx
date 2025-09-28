'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, RotateCcw, BarChart3 } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Brain,
      title: 'LLM_BRAINS',
      ascii: '◢◤',
      description: 'Each geometric shape houses a different AI model as its "brain"',
      details: '// ChatGPT, Claude, Grok, Gemini\n// Process environmental data\n// Make strategic decisions',
      color: '#00AFFF'
    },
    {
      icon: RotateCcw,
      title: 'REINFORCEMENT_LOOP',
      ascii: '⟲⟳',
      description: 'Agents learn through trial and error, developing new abilities',
      details: '// Failed attempts = learning signals\n// Success = capability unlock\n// Continuous adaptation',
      color: '#00FF00'
    },
    {
      icon: BarChart3,
      title: 'EVALUATION_METRICS',
      ascii: '▓▒░',
      description: 'Performance measured across time, attempts, and abilities unlocked',
      details: '// Fair comparison framework\n// Identical challenge sets\n// Standardized scoring',
      color: '#FF3355'
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-[#0066CC]/20">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={staggerItem} className="font-mono text-[#0066CC] text-sm mb-4">
            ┌─ SYSTEM ARCHITECTURE ─────────────────────────────────────────┐
          </motion.div>
          <motion.h2 
            variants={staggerItem}
            className="text-4xl md:text-6xl font-black text-black mb-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            HOW IT WORKS
          </motion.h2>
          <motion.p 
            variants={staggerItem}
            className="text-lg text-gray-700 max-w-3xl mx-auto font-mono"
          >
{`// Revolutionary approach to AI evaluation through 3D reinforcement learning`}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={staggerItem}
              className="relative group"
            >
              <div className="bg-gray-100 border-2 border-gray-300 p-8 h-full hover:border-[#0066CC] hover:shadow-[0_0_20px_rgba(0,102,204,0.3)] transition-all duration-300">
                {/* Step number */}
                <div className="absolute -top-3 -left-3">
                  <div 
                    className="w-8 h-8 flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: step.color }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* ASCII Icon */}
                <div className="mb-6 text-center">
                  <div 
                    className="text-4xl mb-2"
                    style={{ color: step.color }}
                  >
                    {step.ascii}
                  </div>
                  <div className="font-mono text-xs text-gray-600">
                    [{step.title}]
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-black mb-4 font-mono">
                  {step.title.replace('_', ' ')}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {step.description}
                </p>
                
                {/* Code-style details */}
                <div className="bg-gray-200 p-4 border border-gray-400">
                  <pre className="text-xs text-gray-600 font-mono leading-relaxed">
                    {step.details}
                  </pre>
                </div>

                {/* Progress bar */}
                <div className="mt-4 flex items-center gap-2 font-mono text-xs">
                  <span className="text-gray-600">STATUS:</span>
                  <div className="flex-1 bg-gray-300 h-2">
                    <div 
                      className="h-full transition-all duration-1000 group-hover:w-full"
                      style={{ 
                        backgroundColor: step.color,
                        width: '70%',
                        boxShadow: `0 0 10px ${step.color}`
                      }}
                    />
                  </div>
                  <span style={{ color: step.color }}>ACTIVE</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ASCII Connection */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center font-mono text-[#0066CC] text-xs"
        >
          <pre className="whitespace-pre overflow-hidden">
{`    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │ BRAINS  │--->│  LOOP   │--->│ METRICS │
    └─────────┘    └─────────┘    └─────────┘
         ▲                              │
         └──────────────────────────────┘`}
          </pre>
        </motion.div>

        <motion.div
          variants={staggerItem}
          className="mt-8 text-center font-mono text-gray-600 text-xs"
        >
          └─────────────────────────────────────────────────────────────────┘
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;