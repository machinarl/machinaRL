'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { SIM_CATALOG, SimCatalogItem, CourseId } from '@/data/sims';
import WebGLIframe from '@/components/ui/WebGLIframe';
import HeroViewport from '@/components/3d/HeroViewport';
import { AI_MODELS } from '@/lib/constants';
import { SoccerChatMessage } from '@/lib/soccer-ai-service';
import { Ball3DChatMessage } from '@/lib/3dball-ai-service';
import { DungeonChatMessage } from '@/lib/dungeon-ai-service';
import { WallclimbChatMessage } from '@/lib/wallclimb-ai-service';
import { PushBlockChatMessage } from '@/lib/pushblock-ai-service';
import { PyramidsChatMessage } from '@/lib/pyramids-ai-service';
import { FoodCollectorChatMessage } from '@/lib/foodcollector-ai-service';
import { HallwayChatMessage } from '@/lib/hallway-ai-service';
import { GridWorldChatMessage } from '@/lib/gridworld-ai-service';
import { WalkerChatMessage } from '@/lib/walker-ai-service';

function LiveSimContent() {
  const searchParams = useSearchParams();
  const [logs, setLogs] = useState<string[]>([]);
  const [soccerChatLogs, setSoccerChatLogs] = useState<SoccerChatMessage[]>([]);
  const [ball3DChatLogs, setBall3DChatLogs] = useState<Ball3DChatMessage[]>([]);
  const [dungeonChatLogs, setDungeonChatLogs] = useState<DungeonChatMessage[]>([]);
  const [wallclimbChatLogs, setWallclimbChatLogs] = useState<WallclimbChatMessage[]>([]);
  const [pushblockChatLogs, setPushblockChatLogs] = useState<PushBlockChatMessage[]>([]);
  const [pyramidsChatLogs, setPyramidsChatLogs] = useState<PyramidsChatMessage[]>([]);
  const [foodcollectorChatLogs, setFoodcollectorChatLogs] = useState<FoodCollectorChatMessage[]>([]);
  const [hallwayChatLogs, setHallwayChatLogs] = useState<HallwayChatMessage[]>([]);
  const [gridworldChatLogs, setGridworldChatLogs] = useState<GridWorldChatMessage[]>([]);
  const [walkerChatLogs, setWalkerChatLogs] = useState<WalkerChatMessage[]>([]);
  const messageCounterRef = useRef(0);
  const chatMessageCounterRef = useRef(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [soccerChatScrollOffset, setSoccerChatScrollOffset] = useState(0);
  const [ball3DChatScrollOffset, setBall3DChatScrollOffset] = useState(0);
  const [dungeonChatScrollOffset, setDungeonChatScrollOffset] = useState(0);
  const [wallclimbChatScrollOffset, setWallclimbChatScrollOffset] = useState(0);
  const [pushblockChatScrollOffset, setPushblockChatScrollOffset] = useState(0);
  const [pyramidsChatScrollOffset, setPyramidsChatScrollOffset] = useState(0);
  const [foodcollectorChatScrollOffset, setFoodcollectorChatScrollOffset] = useState(0);
  const [hallwayChatScrollOffset, setHallwayChatScrollOffset] = useState(0);
  const [gridworldChatScrollOffset, setGridworldChatScrollOffset] = useState(0);
  const [walkerChatScrollOffset, setWalkerChatScrollOffset] = useState(0);
  const soccerChatSessionId = useRef(`soccer_chat_${Date.now()}`);
  const ball3DChatSessionId = useRef(`ball3d_chat_${Date.now()}`);
  const dungeonChatSessionId = useRef(`dungeon_chat_${Date.now()}`);
  const wallclimbChatSessionId = useRef(`wallclimb_chat_${Date.now()}`);
  const pushblockChatSessionId = useRef(`pushblock_chat_${Date.now()}`);
  const pyramidsChatSessionId = useRef(`pyramids_chat_${Date.now()}`);
  const foodcollectorChatSessionId = useRef(`foodcollector_chat_${Date.now()}`);
  const hallwayChatSessionId = useRef(`hallway_chat_${Date.now()}`);
  const gridworldChatSessionId = useRef(`gridworld_chat_${Date.now()}`);
  const walkerChatSessionId = useRef(`walker_chat_${Date.now()}`);
  const [isGeneratingSoccerChat, setIsGeneratingSoccerChat] = useState(false);
  const [isGeneratingBall3DChat, setIsGeneratingBall3DChat] = useState(false);
  const [isGeneratingDungeonChat, setIsGeneratingDungeonChat] = useState(false);
  const [isGeneratingWallclimbChat, setIsGeneratingWallclimbChat] = useState(false);
  const [isGeneratingPushblockChat, setIsGeneratingPushblockChat] = useState(false);
  const [isGeneratingPyramidsChat, setIsGeneratingPyramidsChat] = useState(false);
  const [isGeneratingFoodcollectorChat, setIsGeneratingFoodcollectorChat] = useState(false);
  const [isGeneratingHallwayChat, setIsGeneratingHallwayChat] = useState(false);
  const [isGeneratingGridworldChat, setIsGeneratingGridworldChat] = useState(false);
  const [isGeneratingWalkerChat, setIsGeneratingWalkerChat] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<SimCatalogItem | null>(null);
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]);
  const continuousChatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [serviceTimeout, setServiceTimeout] = useState(false);
  const serviceStartTimeRef = useRef<number>(Date.now());
  
  // User-based rate limiting
  const userRateLimitRef = useRef<Map<string, { count: number; resetTime: number }>>(new Map());
  const maxRequestsPerMinute = 10; // Per user

  // Rate limiting function
  const checkRateLimit = useCallback((userId: string): boolean => {
    const now = Date.now();
    const userLimit = userRateLimitRef.current.get(userId);
    
    if (!userLimit || now > userLimit.resetTime) {
      // Reset or initialize user limit
      userRateLimitRef.current.set(userId, {
        count: 1,
        resetTime: now + 60000 // Reset in 1 minute
      });
      return true;
    }
    
    if (userLimit.count >= maxRequestsPerMinute) {
      console.log(`Rate limit exceeded for user ${userId}`);
      return false;
    }
    
    // Increment count
    userLimit.count++;
    return true;
  }, [maxRequestsPerMinute]);

  // Helper function to get thumbnail path for each course
  const getThumbnailPath = (courseId: CourseId): string | null => {
    const thumbnailMap: Record<CourseId, string | null> = {
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
      'basic': '/thumbs/basic.png',
      'match3': '/thumbs/Match3.png',
      'sorter': '/thumbs/Sorter.png',
      'worm': '/thumbs/worm.png',
    };
    return thumbnailMap[courseId] || null;
  };

  // Handle course selection from URL parameter or localStorage
  useEffect(() => {
    const courseParam = searchParams.get('course');
    if (courseParam) {
      const course = SIM_CATALOG.find(sim => sim.id === courseParam as CourseId);
      if (course) {
        setSelectedCourse(course);
        // Save to localStorage for persistence
        localStorage.setItem('selectedSimulation', courseParam);
      }
    } else {
      // Try to restore from localStorage
      const savedSimulation = localStorage.getItem('selectedSimulation') as CourseId;
      const savedCourse = savedSimulation ? SIM_CATALOG.find(sim => sim.id === savedSimulation) : null;
      setSelectedCourse(savedCourse || SIM_CATALOG.find(sim => sim.id === 'soccer') || null);
    }
  }, [searchParams]);

  // Check for 30-minute service timeout
  useEffect(() => {
    const checkTimeout = () => {
      const elapsed = Date.now() - serviceStartTimeRef.current;
      const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
      
      if (elapsed >= thirtyMinutes && !serviceTimeout) {
        console.log('30-minute service timeout reached, stopping all AI services');
        setServiceTimeout(true);
        
        // Clear any running intervals
        if (continuousChatIntervalRef.current) {
          clearInterval(continuousChatIntervalRef.current);
          continuousChatIntervalRef.current = null;
        }
        
        // Clear all chat logs
        setSoccerChatLogs([]);
        setBall3DChatLogs([]);
        setDungeonChatLogs([]);
      }
    };

    // Check every minute
    const timeoutCheckInterval = setInterval(checkTimeout, 60000);
    
    return () => clearInterval(timeoutCheckInterval);
  }, [serviceTimeout]);

  // Function to generate a single soccer chat message
  const generateSoccerChatMessage = useCallback(async () => {
    if (isGeneratingSoccerChat || selectedCourse?.id !== 'soccer' || serviceTimeout) return;
    
    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Soccer chat rate limited');
      return;
    }
    
    setIsGeneratingSoccerChat(true);
    try {
      console.log('Generating continuous soccer chat message...');
      const response = await fetch('/api/soccer-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: soccerChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous soccer chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous soccer chat API response data:', data);
        if (data.success && data.messages) {
          console.log('Successfully received continuous soccer messages:', data.messages.length);
          setSoccerChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages
            
            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setSoccerChatScrollOffset(24);
            } else {
              setSoccerChatScrollOffset(0);
            }
            
            return sliced;
          });
        } else {
          console.log('Continuous soccer chat API returned error:', data.error);
          // Don't add error message to chat logs
        }
      } else {
        console.log('Continuous soccer chat API request failed with status:', response.status);
        // Don't add error message to chat logs
      }
    } catch (error) {
      console.error('Failed to generate continuous soccer chat:', error);
      // Don't add error message to chat logs
    } finally {
      setIsGeneratingSoccerChat(false);
    }
  }, [isGeneratingSoccerChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single 3D Ball chat message
  const generateBall3DChatMessage = useCallback(async () => {
    if (isGeneratingBall3DChat || selectedCourse?.id !== 'ball3d' || serviceTimeout) return;
    
    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('3D Ball chat rate limited');
      return;
    }
    
    setIsGeneratingBall3DChat(true);
    try {
      console.log('Generating continuous 3D Ball chat message...');
      const response = await fetch('/api/3dball-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: ball3DChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous 3D Ball chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous 3D Ball chat API response data:', data);
        if (data.success && data.messages) {
          console.log('Successfully received continuous 3D Ball messages:', data.messages.length);
          setBall3DChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages
            
            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setBall3DChatScrollOffset(24);
            } else {
              setBall3DChatScrollOffset(0);
            }
            
            return sliced;
          });
        } else {
          console.log('Continuous 3D Ball chat API returned error:', data.error);
          // Don't add error message to chat logs
        }
      } else {
        console.log('Continuous 3D Ball chat API request failed with status:', response.status);
        // Don't add error message to chat logs
      }
    } catch (error) {
      console.error('Failed to generate continuous 3D Ball chat:', error);
      // Don't add error message to chat logs
    } finally {
      setIsGeneratingBall3DChat(false);
    }
  }, [isGeneratingBall3DChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single Dungeon chat message
  const generateDungeonChatMessage = useCallback(async () => {
    if (isGeneratingDungeonChat || selectedCourse?.id !== 'obstacle' || serviceTimeout) return;
    
    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Dungeon chat rate limited');
      return;
    }
    
    setIsGeneratingDungeonChat(true);
    try {
      console.log('Generating continuous Dungeon chat message...');
      const response = await fetch('/api/dungeon-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: dungeonChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous Dungeon chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous Dungeon chat API response data:', data);
        if (data.success && data.messages) {
          console.log('Successfully received continuous Dungeon messages:', data.messages.length);
          setDungeonChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages
            
            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setDungeonChatScrollOffset(24);
            } else {
              setDungeonChatScrollOffset(0);
            }
            
            return sliced;
          });
        } else {
          console.log('Continuous Dungeon chat API returned error:', data.error);
          // Don't add error message to chat logs
        }
      } else {
        console.log('Continuous Dungeon chat API request failed with status:', response.status);
        // Don't add error message to chat logs
      }
    } catch (error) {
      console.error('Failed to generate continuous Dungeon chat:', error);
      // Don't add error message to chat logs
    } finally {
      setIsGeneratingDungeonChat(false);
    }
  }, [isGeneratingDungeonChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single Wallclimb chat message
  const generateWallclimbChatMessage = useCallback(async () => {
    if (isGeneratingWallclimbChat || selectedCourse?.id !== 'wallclimb' || serviceTimeout) return;
    
    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Wallclimb chat rate limited');
      return;
    }
    
    setIsGeneratingWallclimbChat(true);
    try {
      console.log('Generating continuous Wallclimb chat message...');
      const response = await fetch('/api/wallclimb-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: wallclimbChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous Wallclimb chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous Wallclimb chat API response data:', data);
        if (data.success && data.messages) {
          console.log('Successfully received continuous Wallclimb messages:', data.messages.length);
          setWallclimbChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages
            
            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setWallclimbChatScrollOffset(24);
            } else {
              setWallclimbChatScrollOffset(0);
            }
            
            return sliced;
          });
        } else {
          console.log('Continuous Wallclimb chat API returned error:', data.error);
          // Don't add error message to chat logs
        }
      } else {
        console.log('Continuous Wallclimb chat API request failed with status:', response.status);
        // Don't add error message to chat logs
      }
    } catch (error) {
      console.error('Failed to generate continuous Wallclimb chat:', error);
      // Don't add error message to chat logs
    } finally {
      setIsGeneratingWallclimbChat(false);
    }
  }, [isGeneratingWallclimbChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single Push Block chat message
  const generatePushblockChatMessage = useCallback(async () => {
    if (isGeneratingPushblockChat || selectedCourse?.id !== 'pushblock' || serviceTimeout) return;
    
    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Push Block chat rate limited');
      return;
    }
    
    setIsGeneratingPushblockChat(true);
    try {
      console.log('Generating continuous Push Block chat message...');
      const response = await fetch('/api/pushblock-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: pushblockChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous Push Block chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous Push Block chat API response data:', data);
        if (data.success && data.messages) {
          console.log('Successfully received continuous Push Block messages:', data.messages.length);
          setPushblockChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages
            
            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setPushblockChatScrollOffset(24);
            } else {
              setPushblockChatScrollOffset(0);
            }
            
            return sliced;
          });
        } else {
          console.log('Continuous Push Block chat API returned error:', data.error);
          // Don't add error message to chat logs
        }
      } else {
        console.log('Continuous Push Block chat API request failed with status:', response.status);
        // Don't add error message to chat logs
      }
    } catch (error) {
      console.error('Failed to generate continuous Push Block chat:', error);
      // Don't add error message to chat logs
    } finally {
      setIsGeneratingPushblockChat(false);
    }
  }, [isGeneratingPushblockChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single Pyramids chat message
  const generatePyramidsChatMessage = useCallback(async () => {
    if (isGeneratingPyramidsChat || selectedCourse?.id !== 'pyramids' || serviceTimeout) return;
    
    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Pyramids chat rate limited');
      return;
    }
    
    setIsGeneratingPyramidsChat(true);
    try {
      console.log('Generating continuous Pyramids chat message...');
      const response = await fetch('/api/pyramids-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: pyramidsChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous Pyramids chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous Pyramids chat API response data:', data);
        if (data.success && data.messages) {
          console.log('Successfully received continuous Pyramids messages:', data.messages.length);
          setPyramidsChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages
            
            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setPyramidsChatScrollOffset(24);
            } else {
              setPyramidsChatScrollOffset(0);
            }
            
            return sliced;
          });
        } else {
          console.log('Continuous Pyramids chat API returned error:', data.error);
          // Don't add error message to chat logs
        }
      } else {
        console.log('Continuous Pyramids chat API request failed with status:', response.status);
        // Don't add error message to chat logs
      }
    } catch (error) {
      console.error('Failed to generate continuous Pyramids chat:', error);
      // Don't add error message to chat logs
    } finally {
      setIsGeneratingPyramidsChat(false);
    }
  }, [isGeneratingPyramidsChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single Food Collector chat message
  const generateFoodcollectorChatMessage = useCallback(async () => {
    if (isGeneratingFoodcollectorChat || selectedCourse?.id !== 'food_collector' || serviceTimeout) return;
    
    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Food Collector chat rate limited');
      return;
    }
    
    setIsGeneratingFoodcollectorChat(true);
    try {
      console.log('Generating continuous Food Collector chat message...');
      const response = await fetch('/api/foodcollector-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: foodcollectorChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous Food Collector chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous Food Collector chat API response data:', data);
        if (data.success && data.messages) {
          console.log('Successfully received continuous Food Collector messages:', data.messages.length);
          setFoodcollectorChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages
            
            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setFoodcollectorChatScrollOffset(24);
            } else {
              setFoodcollectorChatScrollOffset(0);
            }
            
            return sliced;
          });
        } else {
          console.log('Continuous Food Collector chat API returned error:', data.error);
          // Don't add error message to chat logs
        }
      } else {
        console.log('Continuous Food Collector chat API request failed with status:', response.status);
        // Don't add error message to chat logs
      }
    } catch (error) {
      console.error('Failed to generate continuous Food Collector chat:', error);
      // Don't add error message to chat logs
    } finally {
      setIsGeneratingFoodcollectorChat(false);
    }
  }, [isGeneratingFoodcollectorChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single Hallway chat message
  const generateHallwayChatMessage = useCallback(async () => {
    if (isGeneratingHallwayChat || selectedCourse?.id !== 'hallway' || serviceTimeout) return;
    
    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Hallway chat rate limited');
      return;
    }
    
    setIsGeneratingHallwayChat(true);
    try {
      console.log('Generating continuous Hallway chat message...');
      const response = await fetch('/api/hallway-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: hallwayChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous Hallway chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous Hallway chat API response data:', data);
        if (data.success && data.messages) {
          console.log('Successfully received continuous Hallway messages:', data.messages.length);
          setHallwayChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages
            
            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setHallwayChatScrollOffset(24);
            } else {
              setHallwayChatScrollOffset(0);
            }
            
            return sliced;
          });
        } else {
          console.log('Continuous Hallway chat API returned error:', data.error);
          // Don't add error message to chat logs
        }
      } else {
        console.log('Continuous Hallway chat API request failed with status:', response.status);
        // Don't add error message to chat logs
      }
    } catch (error) {
      console.error('Failed to generate continuous Hallway chat:', error);
      // Don't add error message to chat logs
    } finally {
      setIsGeneratingHallwayChat(false);
    }
  }, [isGeneratingHallwayChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single GridWorld chat message
  const generateGridworldChatMessage = useCallback(async () => {
    if (isGeneratingGridworldChat || selectedCourse?.id !== 'gridworld' || serviceTimeout) return;
    
    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('GridWorld chat rate limited');
      return;
    }
    
    setIsGeneratingGridworldChat(true);
    try {
      console.log('Generating continuous GridWorld chat message...');
      const response = await fetch('/api/gridworld-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: gridworldChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous GridWorld chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous GridWorld chat API response data:', data);
        if (data.success && data.messages) {
          console.log('Successfully received continuous GridWorld messages:', data.messages.length);
          setGridworldChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages
            
            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setGridworldChatScrollOffset(24);
            } else {
              setGridworldChatScrollOffset(0);
            }
            
            return sliced;
          });
        } else {
          console.log('Continuous GridWorld chat API returned error:', data.error);
          // Don't add error message to chat logs
        }
      } else {
        console.log('Continuous GridWorld chat API request failed with status:', response.status);
        // Don't add error message to chat logs
      }
    } catch (error) {
      console.error('Failed to generate continuous GridWorld chat:', error);
      // Don't add error message to chat logs
    } finally {
      setIsGeneratingGridworldChat(false);
    }
  }, [isGeneratingGridworldChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Function to generate a single Walker chat message
  const generateWalkerChatMessage = useCallback(async () => {
    if (isGeneratingWalkerChat || selectedCourse?.id !== 'walker' || serviceTimeout) return;
    
    // Check rate limit
    const userId = 'user_' + Date.now(); // Simple user ID for demo
    if (!checkRateLimit(userId)) {
      console.log('Walker chat rate limited');
      return;
    }
    
    setIsGeneratingWalkerChat(true);
    try {
      console.log('Generating continuous Walker chat message...');
      const response = await fetch('/api/walker-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: walkerChatSessionId.current,
          agentLogs: logs.slice(-10)
        }),
      });

      console.log('Continuous Walker chat API response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Continuous Walker chat API response data:', data);
        if (data.success && data.messages) {
          console.log('Successfully received continuous Walker messages:', data.messages.length);
          setWalkerChatLogs(prev => {
            // Take the last 1-2 messages from the new conversation
            const recentMessages = data.messages.slice(-Math.floor(Math.random() * 2) + 1);
            const updated = [...prev, ...recentMessages];
            const sliced = updated.slice(-6); // Keep only last 6 messages
            
            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              setWalkerChatScrollOffset(24);
            } else {
              setWalkerChatScrollOffset(0);
            }
            
            return sliced;
          });
        } else {
          console.log('Continuous Walker chat API returned error:', data.error);
          // Don't add error message to chat logs
        }
      } else {
        console.log('Continuous Walker chat API request failed with status:', response.status);
        // Don't add error message to chat logs
      }
    } catch (error) {
      console.error('Failed to generate continuous Walker chat:', error);
      // Don't add error message to chat logs
    } finally {
      setIsGeneratingWalkerChat(false);
    }
  }, [isGeneratingWalkerChat, selectedCourse?.id, serviceTimeout, checkRateLimit]);

  // Clear chat logs when switching away from a simulation and set up new chat
  useEffect(() => {
    // ALWAYS clear any existing interval when switching courses
    if (continuousChatIntervalRef.current) {
      console.log('Clearing existing chat interval...');
      clearInterval(continuousChatIntervalRef.current);
      continuousChatIntervalRef.current = null;
    }

    // Clear all chat logs when switching
    setSoccerChatLogs([]);
    setBall3DChatLogs([]);
    setDungeonChatLogs([]);
    setWallclimbChatLogs([]);
    setPushblockChatLogs([]);
    setPyramidsChatLogs([]);
    setFoodcollectorChatLogs([]);
    setHallwayChatLogs([]);
    setGridworldChatLogs([]);
    setWalkerChatLogs([]);

    // Only start chat for specific simulations (if not timed out)
    if (!serviceTimeout) {
      if (selectedCourse?.id === 'soccer') {
        console.log('Soccer selected, initializing continuous chat...');
        
        // Generate initial soccer chat message
        generateSoccerChatMessage();
        
        // Set up continuous soccer chat every 8 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateSoccerChatMessage();
        }, 8000);
      } else if (selectedCourse?.id === 'ball3d') {
        console.log('3D Ball selected, initializing continuous chat...');
        
        // Generate initial 3D Ball chat message
        generateBall3DChatMessage();
        
        // Set up continuous 3D Ball chat every 8 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateBall3DChatMessage();
        }, 8000);
      } else if (selectedCourse?.id === 'obstacle') {
        console.log('Dungeon selected, initializing continuous chat...');
        
        // Generate initial Dungeon chat message
        generateDungeonChatMessage();
        
        // Set up continuous Dungeon chat every 8 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateDungeonChatMessage();
        }, 8000);
      } else if (selectedCourse?.id === 'wallclimb') {
        console.log('Wallclimb selected, initializing continuous chat...');
        
        // Generate initial Wallclimb chat message
        generateWallclimbChatMessage();
        
        // Set up continuous Wallclimb chat every 8 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateWallclimbChatMessage();
        }, 8000);
      } else if (selectedCourse?.id === 'pushblock') {
        console.log('Push Block selected, initializing continuous chat...');
        
        // Generate initial Push Block chat message
        generatePushblockChatMessage();
        
        // Set up continuous Push Block chat every 8 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generatePushblockChatMessage();
        }, 8000);
      } else if (selectedCourse?.id === 'pyramids') {
        console.log('Pyramids selected, initializing continuous chat...');
        
        // Generate initial Pyramids chat message
        generatePyramidsChatMessage();
        
        // Set up continuous Pyramids chat every 8 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generatePyramidsChatMessage();
        }, 8000);
      } else if (selectedCourse?.id === 'food_collector') {
        console.log('Food Collector selected, initializing continuous chat...');
        
        // Generate initial Food Collector chat message
        generateFoodcollectorChatMessage();
        
        // Set up continuous Food Collector chat every 8 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateFoodcollectorChatMessage();
        }, 8000);
      } else if (selectedCourse?.id === 'hallway') {
        console.log('Hallway selected, initializing continuous chat...');
        
        // Generate initial Hallway chat message
        generateHallwayChatMessage();
        
        // Set up continuous Hallway chat every 8 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateHallwayChatMessage();
        }, 8000);
      } else if (selectedCourse?.id === 'gridworld') {
        console.log('GridWorld selected, initializing continuous chat...');
        
        // Generate initial GridWorld chat message
        generateGridworldChatMessage();
        
        // Set up continuous GridWorld chat every 8 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateGridworldChatMessage();
        }, 8000);
      } else if (selectedCourse?.id === 'walker') {
        console.log('Walker selected, initializing continuous chat...');
        
        // Generate initial Walker chat message
        generateWalkerChatMessage();
        
        // Set up continuous Walker chat every 8 seconds
        continuousChatIntervalRef.current = setInterval(() => {
          generateWalkerChatMessage();
        }, 8000);
      } else {
        console.log('No chat-enabled simulation selected, stopping all chat services');
      }
    } else {
      console.log('Service timeout active, not starting chat services');
    }
  }, [selectedCourse?.id, serviceTimeout]);

  // Cleanup: Clear interval when component unmounts
  useEffect(() => {
    return () => {
      if (continuousChatIntervalRef.current) {
        clearInterval(continuousChatIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Handle Unity log messages from iframe
    function handleUnityMessage(event: MessageEvent) {
      // Check if message is from Unity iframe
      if (event.origin !== window.location.origin) return;
      
      // Increment message counters
      messageCounterRef.current += 1;
      chatMessageCounterRef.current += 1;
      
      // Only display every 40th message for agent log
      if (messageCounterRef.current % 40 === 0) {
      // Handle different types of Unity messages
      if (event.data?.type === "unity-log") {
        setLogs(prev => {
          const newLog = `> agent: ${event.data.text}`;
          const updated = [...prev, newLog];
          const sliced = updated.slice(-6); // Keep only last 6 logs
          
          // Update scroll offset based on number of logs
          if (sliced.length > 5) {
            // When we have 6 logs, scroll up by 24px to show the newest 5
            setScrollOffset(24);
          } else {
            // When we have 5 or fewer logs, no scroll needed
            setScrollOffset(0);
          }
          
          return sliced;
        });
      } else if (event.data && typeof event.data === 'string') {
        // Handle direct Unity console messages
        if (event.data.includes('Unity') || event.data.includes('3DBall') || event.data.includes('dungeon') || event.data.includes('loading')) {
          setLogs(prev => {
            const newLog = `> agent: ${event.data}`;
            const updated = [...prev, newLog];
            const sliced = updated.slice(-6);
            
            // Update scroll offset based on number of logs
            if (sliced.length > 5) {
              // When we have 6 logs, scroll up by 24px to show the newest 5
              setScrollOffset(24);
            } else {
              // When we have 5 or fewer logs, no scroll needed
              setScrollOffset(0);
            }
            
            return sliced;
          });
        }
      }
      }
      
      // Note: Chat generation is now handled by continuous interval, not Unity messages
    }

    window.addEventListener("message", handleUnityMessage);
    
    // Fallback: Add initial system message if no Unity logs received
    const fallbackTimer = setTimeout(() => {
      setLogs(prev => {
        if (prev.length === 0) {
          return ['> system: waiting for simulation logs...'];
        }
        return prev;
      });
    }, 2000);

    return () => {
      window.removeEventListener("message", handleUnityMessage);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="pb-32">
        <div className="container mx-auto px-4">
          {/* Unified Simulation Viewport with Terminal */}
          <div className="mb-8">
            <div className="bg-gray-100 border-2 border-[#0066CC] p-4">
              <div className="mb-4">
                <div className="text-center mb-4">
                  <h1 className="text-4xl md:text-6xl font-black text-black mb-2 tracking-tight">
                    machinaRL // LIVE SIM
                  </h1>
                  <p className="text-xl text-gray-700 mb-4">
                    Real-time AI agent simulation and learning
                  </p>
                </div>
                <div className="text-[#0066CC] text-xs mb-2">
                  ┌─ LIVE SIMULATION VIEWPORT ────────┐
                </div>
                <h2 className="text-2xl font-bold text-black mb-2 font-mono">
                  {selectedCourse ? selectedCourse.name.toUpperCase() : '3D SIMULATION VIEWPORT'}
                </h2>
                <div className="text-[#0066CC] text-xs mb-4">
                  └───────────────────────┘
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* WebGL Simulation */}
                <div className="lg:col-span-2">
                  {selectedCourse?.id === 'soccer' ? (
                    <WebGLIframe
                      src="/Scenes/soccer/index.html"
                      title="Soccer Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Soccer simulation loaded successfully')}
                      onError={() => console.error('Soccer simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'ball3d' ? (
                    <WebGLIframe
                      src="/Scenes/3dball/index.html"
                      title="3D Ball Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('3D Ball simulation loaded successfully')}
                      onError={() => console.error('3D Ball simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'obstacle' ? (
                    <WebGLIframe
                      src="/Scenes/dungeon/index.html"
                      title="Dungeon Escape Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Dungeon Escape simulation loaded successfully')}
                      onError={() => console.error('Dungeon Escape simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'wallclimb' ? (
                    <WebGLIframe
                      src="/Scenes/Wallclimb/index.html"
                      title="Climbing Wall Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Climbing Wall simulation loaded successfully')}
                      onError={() => console.error('Climbing Wall simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'pushblock' ? (
                    <WebGLIframe
                      src="/Scenes/PushBlock/index.html"
                      title="Push Block Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Push Block simulation loaded successfully')}
                      onError={() => console.error('Push Block simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'pyramids' ? (
                    <WebGLIframe
                      src="/Scenes/Pyramids/index.html"
                      title="Pyramids Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Pyramids simulation loaded successfully')}
                      onError={() => console.error('Pyramids simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'food_collector' ? (
                    <WebGLIframe
                      src="/Scenes/FoodCollection/index.html"
                      title="Food Collector Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Food Collector simulation loaded successfully')}
                      onError={() => console.error('Food Collector simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'hallway' ? (
                    <WebGLIframe
                      src="/Scenes/Hallway/index.html"
                      title="Hallway Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Hallway simulation loaded successfully')}
                      onError={() => console.error('Hallway simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'gridworld' ? (
                    <WebGLIframe
                      src="/Scenes/GridWorld/index.html"
                      title="GridWorld Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('GridWorld simulation loaded successfully')}
                      onError={() => console.error('GridWorld simulation failed to load - check console for details')}
                    />
                  ) : selectedCourse?.id === 'walker' ? (
                    <WebGLIframe
                      src="/Scenes/Walker/index.html"
                      title="Walker Unity Simulation"
                      isPageReload={true}
                      onLoad={() => console.log('Walker simulation loaded successfully')}
                      onError={() => console.error('Walker simulation failed to load - check console for details')}
                    />
                  ) : (
                    <div className="h-96">
                      <HeroViewport
                        selectedModel={selectedModel}
                        onModelChange={setSelectedModel}
                      />
                    </div>
                  )}
                </div>

                {/* Terminal Log Feed */}
                <div className="lg:col-span-1">
                  {(selectedCourse?.id === 'soccer' || selectedCourse?.id === 'ball3d' || selectedCourse?.id === 'obstacle' || selectedCourse?.id === 'wallclimb' || selectedCourse?.id === 'pushblock' || selectedCourse?.id === 'pyramids' || selectedCourse?.id === 'food_collector' || selectedCourse?.id === 'hallway' || selectedCourse?.id === 'gridworld' || selectedCourse?.id === 'walker') ? (
                    // Simulations with chat: Agent Log + Agents Chat
                    <div className="space-y-4">
                      {/* Agent Log */}
                      <div className="bg-white/95 backdrop-blur-sm border border-[#006600]/30 font-mono w-full" style={{ aspectRatio: '16/9' }}>
                        {/* Terminal header */}
                        <div className="border-b border-[#006600]/30 px-4 py-2 bg-[#006600]/5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-[#CC0000]"></div>
                              <div className="w-3 h-3 rounded-full bg-[#CC9900]"></div>
                              <div className="w-3 h-3 rounded-full bg-[#006600]"></div>
                            </div>
                            <div className="text-[#006600] text-xs">
                              AGENT LOG
                            </div>
                          </div>
                        </div>

                        {/* Terminal content */}
                        <div className="p-4 h-full flex flex-col">
                          <div className="text-[#006600] mb-2 text-xs flex-shrink-0">
                            ┌─ REAL-TIME AGENT COMMUNICATION ─────────────────────────────┐
                          </div>
                          
                          <div className="flex-1 overflow-hidden relative min-h-0">
                            <motion.div
                              className="space-y-1 h-full"
                              animate={{ 
                                y: -scrollOffset
                              }}
                              transition={{ 
                                duration: 0.4, 
                                ease: "easeOut"
                              }}
                            >
                              {logs.map((log, index) => {
                                const isNewest = index === logs.length - 1;
                                return (
                                  <motion.div
                                    key={`${log}-${index}`}
                                    initial={isNewest ? { opacity: 0, y: 20 } : false}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="text-[#006600] text-xs font-mono break-words overflow-hidden"
                                    style={{ 
                                      wordBreak: 'break-word',
                                      whiteSpace: 'pre-wrap',
                                      lineHeight: '1.5'
                                    }}
                                  >
                                    {log}
                                  </motion.div>
                                );
                              })}
                            </motion.div>
                          </div>
                          
                          <div className="text-[#006600] text-xs mt-2 flex-shrink-0">
                            └──────────────────────────┘
                          </div>
                          
                          {/* Blinking cursor */}
                          <div className="flex items-center mt-2 flex-shrink-0">
                            <span className="text-[#006600] text-xs mr-1">$</span>
                            <div className="w-2 h-3 bg-[#006600] animate-pulse"></div>
                          </div>
                        </div>
                      </div>

                      {/* Agents Chat Log */}
                      <div className="bg-white/95 backdrop-blur-sm border border-[#0066CC]/30 font-mono w-full" style={{ aspectRatio: '16/9' }}>
                        {/* Terminal header */}
                        <div className="border-b border-[#0066CC]/30 px-4 py-2 bg-[#0066CC]/5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-[#CC0000]"></div>
                              <div className="w-3 h-3 rounded-full bg-[#CC9900]"></div>
                              <div className="w-3 h-3 rounded-full bg-[#0066CC]"></div>
                            </div>
                            <div className="text-[#0066CC] text-xs">
                              AGENTS CHAT
                            </div>
                          </div>
                        </div>

                        {/* Terminal content */}
                        <div className="p-4 h-full flex flex-col">
                          <div className="text-[#0066CC] mb-2 text-xs flex-shrink-0">
                            ┌─ INTER-AGENT COMMUNICATION ─────────────────────────────────┐
                          </div>
                          
                          {serviceTimeout && (
                            <div className="flex-1 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-[#CC0000] text-sm font-mono mb-2">
                                  ⚠️ SERVICE TIMEOUT
                                </div>
                                <div className="text-[#0066CC] text-xs font-mono">
                                  Reload to continue to see logs
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {!serviceTimeout && (
                            <div className="flex-1 overflow-hidden relative min-h-0">
                              <motion.div
                                className="space-y-1 h-full"
                                animate={{ 
                                  y: selectedCourse?.id === 'soccer' ? -soccerChatScrollOffset : 
                                     selectedCourse?.id === 'ball3d' ? -ball3DChatScrollOffset : 
                                     -dungeonChatScrollOffset
                                }}
                                transition={{ 
                                  duration: 0.4, 
                                  ease: "easeOut"
                                }}
                              >
                              {selectedCourse?.id === 'soccer' && soccerChatLogs.map((log, index) => {
                                const isNewest = index === soccerChatLogs.length - 1;
                                const isGROK = log.agent === 'agent2';
                                const textColor = isGROK ? 'text-[#8B5CF6]' : 'text-[#0066CC]'; // Purple for GROK, Blue for ChatGPT
                                
                                return (
                                  <motion.div
                                    key={log.id}
                                    initial={isNewest ? { opacity: 0, y: 20 } : false}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                    style={{ 
                                      wordBreak: 'break-word',
                                      whiteSpace: 'pre-wrap',
                                      lineHeight: '1.5'
                                    }}
                                  >
                                    {`> ${log.agent === 'agent1' ? 'ChatGPT' : 'GROK'}: ${log.message}`}
                                  </motion.div>
                                );
                              })}
                              {selectedCourse?.id === 'ball3d' && ball3DChatLogs.map((log, index) => {
                                const isNewest = index === ball3DChatLogs.length - 1;
                                const textColor = 'text-[#0066CC]'; // Blue for Claude (solo agent)
                                
                                return (
                                  <motion.div
                                    key={log.id}
                                    initial={isNewest ? { opacity: 0, y: 20 } : false}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                    style={{ 
                                      wordBreak: 'break-word',
                                      whiteSpace: 'pre-wrap',
                                      lineHeight: '1.5'
                                    }}
                                  >
                                    {`> Claude: ${log.message}`}
                                  </motion.div>
                                );
                              })}
                              {selectedCourse?.id === 'obstacle' && dungeonChatLogs.map((log, index) => {
                                const isNewest = index === dungeonChatLogs.length - 1;
                                const textColor = 'text-[#EAB308]'; // Yellow for Gemini (observer)
                                
                                return (
                                  <motion.div
                                    key={log.id}
                                    initial={isNewest ? { opacity: 0, y: 20 } : false}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                    style={{ 
                                      wordBreak: 'break-word',
                                      whiteSpace: 'pre-wrap',
                                      lineHeight: '1.5'
                                    }}
                                  >
                                    {`> Gemini: ${log.message}`}
                                  </motion.div>
                                );
                              })}
                              {selectedCourse?.id === 'wallclimb' && wallclimbChatLogs.map((log, index) => {
                                const isNewest = index === wallclimbChatLogs.length - 1;
                                const textColor = 'text-[#0066CC]'; // Blue for Claude (solo climber)
                                
                                return (
                                  <motion.div
                                    key={log.id}
                                    initial={isNewest ? { opacity: 0, y: 20 } : false}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                    style={{ 
                                      wordBreak: 'break-word',
                                      whiteSpace: 'pre-wrap',
                                      lineHeight: '1.5'
                                    }}
                                  >
                                    {`> Claude: ${log.message}`}
                                  </motion.div>
                                );
                              })}
                              {selectedCourse?.id === 'pushblock' && pushblockChatLogs.map((log, index) => {
                                const isNewest = index === pushblockChatLogs.length - 1;
                                const textColor = 'text-[#EAB308]'; // Yellow for Gemini (observer)
                                
                                return (
                                  <motion.div
                                    key={log.id}
                                    initial={isNewest ? { opacity: 0, y: 20 } : false}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                    style={{ 
                                      wordBreak: 'break-word',
                                      whiteSpace: 'pre-wrap',
                                      lineHeight: '1.5'
                                    }}
                                  >
                                    {`> Gemini: ${log.message}`}
                                  </motion.div>
                                );
                              })}
                              {selectedCourse?.id === 'pyramids' && pyramidsChatLogs.map((log, index) => {
                                const isNewest = index === pyramidsChatLogs.length - 1;
                                const textColor = 'text-[#0066CC]'; // Blue for Claude (solo explorer)
                                
                                return (
                                  <motion.div
                                    key={log.id}
                                    initial={isNewest ? { opacity: 0, y: 20 } : false}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                    style={{ 
                                      wordBreak: 'break-word',
                                      whiteSpace: 'pre-wrap',
                                      lineHeight: '1.5'
                                    }}
                                  >
                                    {`> Claude: ${log.message}`}
                                  </motion.div>
                                );
                              })}
                              {selectedCourse?.id === 'food_collector' && foodcollectorChatLogs.map((log, index) => {
                                const isNewest = index === foodcollectorChatLogs.length - 1;
                                const textColor = 'text-[#EAB308]'; // Yellow for Gemini (observer)
                                
                                return (
                                  <motion.div
                                    key={log.id}
                                    initial={isNewest ? { opacity: 0, y: 20 } : false}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                    style={{ 
                                      wordBreak: 'break-word',
                                      whiteSpace: 'pre-wrap',
                                      lineHeight: '1.5'
                                    }}
                                  >
                                    {`> Gemini: ${log.message}`}
                                  </motion.div>
                                );
                              })}
                              {selectedCourse?.id === 'hallway' && hallwayChatLogs.map((log, index) => {
                                const isNewest = index === hallwayChatLogs.length - 1;
                                const textColor = 'text-[#0066CC]'; // Blue for ChatGPT (solo memory worker)
                                
                                return (
                                  <motion.div
                                    key={log.id}
                                    initial={isNewest ? { opacity: 0, y: 20 } : false}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                    style={{ 
                                      wordBreak: 'break-word',
                                      whiteSpace: 'pre-wrap',
                                      lineHeight: '1.5'
                                    }}
                                  >
                                    {`> ChatGPT: ${log.message}`}
                                  </motion.div>
                                );
                              })}
        {selectedCourse?.id === 'gridworld' && gridworldChatLogs.map((log, index) => {
          const isNewest = index === gridworldChatLogs.length - 1;
          const textColor = 'text-[#8B5CF6]'; // Purple for GROK (confident navigator)
          
          return (
            <motion.div
              key={log.id}
              initial={isNewest ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`${textColor} text-xs font-mono break-words overflow-hidden`}
              style={{ 
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.5'
              }}
            >
              {`> GROK: ${log.message}`}
            </motion.div>
          );
        })}
                              {selectedCourse?.id === 'walker' && walkerChatLogs.map((log, index) => {
                                const isNewest = index === walkerChatLogs.length - 1;
                                const textColor = 'text-[#0066CC]'; // Blue for Claude (solo walker)
                                
                                return (
                                  <motion.div
                                    key={log.id}
                                    initial={isNewest ? { opacity: 0, y: 20 } : false}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className={`${textColor} text-xs font-mono break-words overflow-hidden`}
                                    style={{ 
                                      wordBreak: 'break-word',
                                      whiteSpace: 'pre-wrap',
                                      lineHeight: '1.5'
                                    }}
                                  >
                                    {`> Claude: ${log.message}`}
                                  </motion.div>
                                );
                              })}
                            </motion.div>
                          </div>
                          )}
                          
                          <div className="text-[#0066CC] text-xs mt-2 flex-shrink-0">
                            └──────────────────────────┘
                          </div>
                          
                          {/* Blinking cursor */}
                          <div className="flex items-center mt-2 flex-shrink-0">
                            <span className="text-[#0066CC] text-xs mr-1">$</span>
                            <div className="w-2 h-3 bg-[#0066CC] animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Other simulations: Only Agent Log
                    <div className="flex justify-center">
                  <div className="bg-white/95 backdrop-blur-sm border border-[#006600]/30 font-mono w-full" style={{ aspectRatio: '16/9' }}>
                    {/* Terminal header */}
                    <div className="border-b border-[#006600]/30 px-4 py-2 bg-[#006600]/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#CC0000]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#CC9900]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#006600]"></div>
                        </div>
                        <div className="text-[#006600] text-xs">
                          AGENT LOG
                        </div>
                      </div>
                    </div>

                    {/* Terminal content */}
                    <div className="p-4 h-full flex flex-col">
                      <div className="text-[#006600] mb-2 text-xs flex-shrink-0">
                        ┌─ REAL-TIME AGENT COMMUNICATION ─────────────────────────────┐
                      </div>
                      
                      <div className="flex-1 overflow-hidden relative min-h-0">
                        <motion.div
                          className="space-y-1 h-full"
                          animate={{ 
                            y: -scrollOffset
                          }}
                          transition={{ 
                            duration: 0.4, 
                            ease: "easeOut"
                          }}
                        >
                          {logs.map((log, index) => {
                            const isNewest = index === logs.length - 1;
                            return (
                              <motion.div
                                key={`${log}-${index}`}
                                initial={isNewest ? { opacity: 0, y: 20 } : false}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="text-[#006600] text-xs font-mono break-words overflow-hidden"
                                style={{ 
                                  wordBreak: 'break-word',
                                  whiteSpace: 'pre-wrap',
                                  lineHeight: '1.5'
                                }}
                              >
                                {log}
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      </div>
                      
                      <div className="text-[#006600] text-xs mt-2 flex-shrink-0">
                        └──────────────────────────┘
                      </div>
                      
                      {/* Blinking cursor */}
                      <div className="flex items-center mt-2 flex-shrink-0">
                        <span className="text-[#006600] text-xs mr-1">$</span>
                        <div className="w-2 h-3 bg-[#006600] animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Course Selector */}
          <div className="mb-8">
            <div className="bg-gray-100 border-2 border-[#0066CC] p-6 font-mono">
              <div className="mb-4">
                <div className="text-sm font-bold mb-2 text-[#0066CC]">
                  ┌─ COURSE SELECTION {'─'.repeat(20)}┐
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SIM_CATALOG.map((course) => {
                  const isAvailable = course.status === 'prototype' || course.status === 'available';
                  const isSelected = selectedCourse?.id === course.id;
                  
                  return (
                    <button
                      key={course.id}
                      onClick={() => {
                        if (isAvailable) {
                          setSelectedCourse(course);
                          localStorage.setItem('selectedSimulation', course.id);
                        }
                      }}
                      disabled={!isAvailable}
                      className={`p-4 text-left border-2 transition-all duration-300 ${
                        isSelected
                          ? 'border-[#0066CC] bg-[#0066CC]/10'
                          : isAvailable
                          ? 'border-gray-300 hover:border-[#0066CC] hover:shadow-[0_0_10px_rgba(0,102,204,0.3)]'
                          : 'border-gray-200 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-black text-sm">
                          {course.name.toUpperCase()}
                        </h3>
                        {!isAvailable && (
                          <span className="text-xs text-gray-500">[COMING SOON]</span>
                        )}
                      </div>
                      
                      <div className="mb-2">
                        {getThumbnailPath(course.id) ? (
                          <div className="relative w-full bg-gray-200 border border-gray-300" style={{ aspectRatio: '16/9' }}>
                            <Image 
                              src={getThumbnailPath(course.id)!}
                              alt={`${course.name} thumbnail`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <pre className="text-xs text-[#0066CC] leading-tight">
                            {course.placeholder.ascii.slice(0, 3).join('\n')}
                          </pre>
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-2">
                        {course.synopsis}
                      </p>
                      
                      <div className="flex flex-wrap gap-1">
                        {course.skills.slice(0, 2).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-gray-200 text-gray-600 text-xs font-mono border border-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                        {course.skills.length > 2 && (
                          <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs font-mono border border-gray-300">
                            +{course.skills.length - 2}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-4">
                <div className="text-sm font-bold text-[#0066CC]">
                  └{'─'.repeat(20)}┘
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function LiveSimPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-mono text-[#0066CC] mb-4">Loading Live Simulation...</div>
          <div className="text-gray-600">Initializing course selection...</div>
        </div>
      </div>
    }>
      <LiveSimContent />
    </Suspense>
  );
}