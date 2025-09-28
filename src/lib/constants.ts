import { AIModel, Ability } from '@/data/types';

// AI Models Configuration
export const AI_MODELS: AIModel[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    color: '#10a37f',
    description: 'OpenAI\'s conversational AI model'
  },
  {
    id: 'claude',
    name: 'Claude',
    color: '#d97706',
    description: 'Anthropic\'s helpful, harmless, and honest AI'
  },
  {
    id: 'grok',
    name: 'Grok',
    color: '#1d4ed8',
    description: 'xAI\'s witty and rebellious AI assistant'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    color: '#dc2626',
    description: 'Google\'s most capable multimodal AI'
  }
];

// Available Abilities
export const ABILITIES: Ability[] = [
  {
    id: 'movement',
    name: 'Movement',
    description: 'Basic locomotion and directional control',
    icon: 'move',
    unlocked: true
  },
  {
    id: 'jumping',
    name: 'Jumping',
    description: 'Ability to leap over obstacles',
    icon: 'arrow-up',
    unlocked: false
  },
  {
    id: 'climbing',
    name: 'Climbing',
    description: 'Scale walls and vertical surfaces',
    icon: 'mountain',
    unlocked: false
  },
  {
    id: 'navigation',
    name: 'Navigation',
    description: 'Advanced pathfinding and spatial awareness',
    icon: 'compass',
    unlocked: false
  },
  {
    id: 'planning',
    name: 'Planning',
    description: 'Strategic thinking and multi-step reasoning',
    icon: 'brain',
    unlocked: false
  },
  {
    id: 'adaptation',
    name: 'Adaptation',
    description: 'Learning from failures and adjusting strategy',
    icon: 'refresh-cw',
    unlocked: false
  }
];

// Shape configurations
export const SHAPES = {
  cube: {
    name: 'Cube',
    description: 'Stable and methodical approach',
    geometry: 'box'
  },
  sphere: {
    name: 'Sphere',
    description: 'Fluid and adaptive movement',
    geometry: 'sphere'
  },
  pyramid: {
    name: 'Pyramid',
    description: 'Sharp and decisive actions',
    geometry: 'cone'
  }
} as const;

// Animation constants
export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  VERY_SLOW: 1.0
};

// 3D Scene constants
export const SCENE_CONFIG = {
  CAMERA_POSITION: [5, 5, 5] as [number, number, number],
  CAMERA_FOV: 75,
  CAMERA_NEAR: 0.1,
  CAMERA_FAR: 1000,
  AMBIENT_LIGHT_INTENSITY: 0.4,
  DIRECTIONAL_LIGHT_INTENSITY: 1.0,
  DIRECTIONAL_LIGHT_POSITION: [10, 10, 5] as [number, number, number]
};

// Performance constants
export const PERFORMANCE = {
  TARGET_FPS: 60,
  LOW_FPS_THRESHOLD: 30,
  PIXEL_RATIO_FALLBACK: 1
};

// FAQ Data
export const FAQ_ITEMS = [
  {
    question: "What is machinaRL?",
    answer: "machinaRL is a 3D reinforcement learning sandbox where different AI models (ChatGPT, Claude, Grok, Gemini) are embedded as 'brains' within geometric shapes that learn to navigate various courses through trial and error."
  },
  {
    question: "How do abilities unlock?",
    answer: "As AI agents successfully complete challenges and overcome obstacles, they unlock new abilities like jumping, climbing, and advanced navigation. Each ability expands what the agent can do in future courses."
  },
  {
    question: "How does the evaluation work?",
    answer: "All AI models face the same courses and challenges. We measure their performance based on completion time, number of attempts, and abilities unlocked. This creates fair comparisons across different AI architectures."
  },
  {
    question: "Are the AI models actually learning in real-time?",
    answer: "The demos shown are illustrative simulations based on offline training runs. Real reinforcement learning training happens over many hours or days, so we show representative behavior patterns."
  },
  {
    question: "What makes each AI model different?",
    answer: "Each AI model has different strengths: ChatGPT excels at reasoning, Claude is methodical and safe, Grok takes creative risks, and Gemini leverages multimodal understanding. These differences show up in their navigation strategies."
  },
  {
    question: "Can I train my own AI agent?",
    answer: "Currently, machinaRL is a demonstration platform. We're exploring ways to let users experiment with training parameters and custom courses in future versions."
  }
];

// Navigation links
export const NAVIGATION_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/livesim', label: 'Live Sim' },
  { href: '/sims', label: 'Simulations' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/faq', label: 'FAQ' },
  { href: '/docs', label: 'Docs' }
];

// Social links
export const SOCIAL_LINKS = [
  { href: 'https://github.com/machinarl', label: 'GitHub', icon: 'github' },
  { href: 'https://twitter.com/machinarl', label: 'Twitter', icon: 'twitter' }
];

// Legal links
export const LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' }
];