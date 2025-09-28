'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { staggerContainer, staggerItem } from '@/lib/animations';

const Courses: React.FC = () => {
  const courses = [
    {
      id: 'soccer',
      name: 'SOCCER',
      description: 'Team coordination and ball control in competitive matches with strategic gameplay.',
      difficulty: 'HARD',
      avgTime: '45.2s',
      topModel: 'CLAUDE',
      features: ['TEAMWORK', 'STRATEGY', 'BALL_CONTROL'],
      color: '#00AFFF',
      status: '[████████░░] 80% SUCCESS'
    },
    {
      id: 'ball3d',
      name: '3D_BALL',
      description: 'Balance and precision control in a 3D environment with physics-based challenges.',
      difficulty: 'MEDIUM',
      avgTime: '38.5s',
      topModel: 'GPT-4',
      features: ['BALANCE', 'PRECISION', 'PHYSICS'],
      color: '#FF6600',
      status: '[██████████] 90% SUCCESS'
    },
    {
      id: 'obstacle',
      name: 'DUNGEON_ESCAPE',
      description: 'Navigate through treacherous dungeon corridors and overcome obstacles.',
      difficulty: 'HARD',
      avgTime: '62.7s',
      topModel: 'GROK',
      features: ['TIMING', 'AGILITY', 'ADAPTATION'],
      color: '#00FF00',
      status: '[██████░░░░] 60% SUCCESS'
    },
    {
      id: 'wallclimb',
      name: 'CLIMBING_WALL',
      description: 'Precision, planning, and vertical movement in a challenging climbing environment.',
      difficulty: 'EXPERT',
      avgTime: '78.3s',
      topModel: 'CLAUDE',
      features: ['PLANNING', 'CONTROL', 'COORDINATION'],
      color: '#FF0066',
      status: '[████░░░░░░] 40% SUCCESS'
    }
  ];

  // Helper function to get thumbnail path for each course
  const getThumbnailPath = (courseId: string): string | null => {
    const thumbnailMap: Record<string, string | null> = {
      'soccer': '/thumbs/soccer.png',
      'ball3d': '/thumbs/3dball.png',
      'obstacle': '/thumbs/dungeon.png',
      'wallclimb': '/thumbs/wallclimb.png',
      'pushblock': '/thumbs/pushblock.png',
      'pyramids': '/thumbs/pyramids.png',
      'food_collector': '/thumbs/foodcollector.png',
      'hallway': '/thumbs/Hallway.png',
      'gridworld': '/thumbs/Gridworld.png',
      'walker': '/thumbs/Walker.png',
      'crawler': '/thumbs/Crawler.png',
    };
    return thumbnailMap[courseId] || null;
  };

  return (
    <section className="py-24 bg-white border-t border-[#006600]/20">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={staggerItem} className="font-mono text-[#006600] text-sm mb-4">
            ┌─ TRAINING ENVIRONMENTS ───────────────────────────────────────┐
          </motion.div>
          <motion.h2 
            variants={staggerItem}
            className="text-4xl md:text-6xl font-black text-black mb-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            TRAINING COURSES
          </motion.h2>
          <motion.p 
            variants={staggerItem}
            className="text-lg text-gray-700 max-w-3xl mx-auto font-mono"
          >
{`// Each course tests different aspects of AI intelligence and adaptability`}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              variants={staggerItem}
              className="group relative"
            >
              <div className="bg-gray-100 border-2 border-gray-300 overflow-hidden hover:border-[#0066CC] hover:shadow-[0_0_20px_rgba(0,102,204,0.3)] transition-all duration-300">
                {/* Course ID */}
                <div className="absolute top-4 left-4 z-10">
                  <div 
                    className="px-2 py-1 text-white font-bold text-xs"
                    style={{ backgroundColor: course.color }}
                  >
                    COURSE_{String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Course Visualization */}
                <div className="relative h-48 bg-gray-200 flex items-center justify-center p-2">
                  <div className="relative w-full h-full" style={{ aspectRatio: '16/9' }}>
                    <Image 
                      src={getThumbnailPath(course.id)!}
                      alt={`${course.name} thumbnail`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Difficulty badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-white border border-gray-400 text-black text-xs font-mono">
                      {course.difficulty}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-black mb-3 font-mono">
                    {course.name.replace('_', ' ')}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                    {course.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-600 mb-2 font-mono">REQUIRED_SKILLS:</div>
                    <div className="flex flex-wrap gap-1">
                      {course.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-gray-300 text-gray-700 text-xs font-mono border border-gray-400"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="bg-gray-200 p-3 mb-4 border border-gray-400">
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <div className="text-gray-600">AVG_TIME:</div>
                        <div className="text-black">{course.avgTime}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">LEADER:</div>
                        <div style={{ color: course.color }}>{course.topModel}</div>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-600 mb-1 font-mono">STATUS:</div>
                    <div className="text-xs font-mono" style={{ color: course.color }}>
                      {course.status}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link 
                    href={`/livesim?course=${course.id}`}
                    className="block w-full py-2 border-2 border-gray-400 text-gray-700 font-mono text-sm hover:border-[#0066CC] hover:text-[#0066CC] hover:shadow-[0_0_10px_rgba(0,102,204,0.3)] transition-all duration-300 text-center"
                  >
                    [ INITIALIZE_COURSE ]
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all courses CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link 
            href="/livesim"
            className="inline-block px-8 py-4 bg-[#006600] text-white font-bold text-lg hover:bg-[#006600]/90 hover:shadow-[0_0_20px_#006600] transition-all duration-300"
          >
            [ EXPLORE_ALL_COURSES ]
          </Link>
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

export default Courses;