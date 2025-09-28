'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { FAQ_ITEMS } from '@/lib/constants';
import Accordion from '@/components/ui/Accordion';

const FAQ: React.FC = () => {
  return (
    <section className="py-24 bg-gray-950">
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
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            variants={staggerItem}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Everything you need to know about machinaRL and how it works
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={staggerItem}>
            <Accordion
              items={FAQ_ITEMS}
              className="space-y-4"
            />
          </motion.div>
        </motion.div>

        {/* Additional help section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-display font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Our documentation covers technical details, API references, and advanced usage patterns. 
              You can also join our community for discussions and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/docs"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
              >
                Read Documentation
              </a>
              <a
                href="https://github.com/machinarl/discussions"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors"
              >
                Join Community
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;