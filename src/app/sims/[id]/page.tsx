'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { getSimById, SimCatalogItem, CourseId } from '@/data/sims';
import SimulationDetail from '@/components/sims/SimulationDetail';

const SimulationDetailPage: React.FC = () => {
  const params = useParams();
  const [sim, setSim] = useState<SimCatalogItem | null>(null);
  const [mockMetrics, setMockMetrics] = useState<Record<string, number> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const simData = getSimById(params.id as CourseId);
      if (simData) {
        setSim(simData);
        
        // Generate mock metrics
        setMockMetrics({
          time_ms: Math.floor(Math.random() * 100000) + 10000,
          success_rate: Math.random() * 0.8 + 0.2,
          attempts: Math.floor(Math.random() * 50) + 10
        });
      }
      setIsLoading(false);
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="font-mono text-[#0066CC] text-lg">
              [ LOADING SIMULATION DETAILS... ]
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!sim) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-gray-100 border-2 border-[#CC0000] p-8 font-mono">
              <div className="text-2xl text-[#CC0000] mb-4">
                [ SIMULATION NOT FOUND ]
              </div>
              <div className="text-gray-700 mb-6">
                The requested simulation does not exist or has been removed.
              </div>
              <Link 
                href="/sims"
                className="px-6 py-3 bg-[#0066CC] text-white font-mono text-sm hover:bg-[#0066CC]/90 hover:shadow-[0_0_20px_#0066CC] transition-all duration-300"
              >
                [ RETURN TO SIMULATIONS ]
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="container mx-auto px-4">
        {/* Back Button and Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 font-mono"
        >
          <div className="flex items-center justify-between mb-4">
            <Link 
              href="/sims"
              className="flex items-center gap-2 px-4 py-2 border-2 border-gray-400 text-gray-700 hover:border-[#0066CC] hover:text-[#0066CC] hover:shadow-[0_0_10px_rgba(0,102,204,0.3)] transition-all duration-300"
            >
              <span>←</span>
              <span>[ BACK TO SIMULATIONS ]</span>
            </Link>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/sims" className="hover:text-[#0066CC] transition-colors">
              [ SIMULATIONS ]
            </Link>
            <span>/</span>
            <span className="text-black">{sim.name.toUpperCase()}</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={staggerItem}>
            <SimulationDetail sim={sim} mockMetrics={mockMetrics} />
          </motion.div>
        </motion.div>

        {/* Back to Simulations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link 
            href="/sims"
            className="px-8 py-4 bg-[#0066CC] text-white font-bold text-lg hover:bg-[#0066CC]/90 hover:shadow-[0_0_20px_#0066CC] transition-all duration-300 font-mono"
          >
            [ EXPLORE ALL SIMULATIONS ]
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={staggerItem}
          className="mt-16 text-center font-mono text-gray-600 text-xs"
        >
          └─────────────────────────────────────────────────────────────────┘
        </motion.div>
      </div>
    </div>
  );
};

export default SimulationDetailPage;
