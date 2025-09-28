// Core Data Types
export interface AIModel {
  id: 'chatgpt' | 'claude' | 'grok' | 'gemini';
  name: string;
  color: string;
  description: string;
}

export interface Course {
  id: 'soccer' | 'obstacle' | 'climb';
  name: string;
  description: string;
  thumbnail: string;
  difficulty: 'easy' | 'medium' | 'hard';
  environment: {
    size: [number, number, number];
    walls?: number[][];
    obstacles?: number[][];
    start: [number, number, number];
    goal: [number, number, number];
  };
}

export interface Ability {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface Agent {
  shape: 'cube' | 'sphere' | 'pyramid';
  model: AIModel;
  abilities: Ability[];
  position: [number, number, number];
  rotation: [number, number, number];
}

export interface LeaderboardEntry {
  rank: number;
  model: string;
  course: string;
  bestTime: number;
  attempts: number;
  abilitiesUnlocked: string[];
  date: string;
}

// Animation and 3D Types
export interface AnimationSequence {
  keyframes: {
    position: [number, number, number];
    rotation: [number, number, number];
    timestamp: number;
    ability?: string;
  }[];
  duration: number;
  course: string;
}

// Component Props
export interface HeroViewportProps {
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
}

export interface LiveSimSceneProps {
  course: Course;
  agent: Agent;
  isPlaying: boolean;
  onComplete: () => void;
}

export interface LeaderboardTableProps {
  data: LeaderboardEntry[];
  filters: {
    model?: string;
    course?: string;
  };
  onFilterChange: (filters: { model?: string; course?: string }) => void;
}

// API Response Types
export interface APIResponse<T> {
  data?: T;
  error?: {
    message: string;
    code: string;
    status: number;
  };
}

export interface LeaderboardResponse {
  entries: LeaderboardEntry[];
  total: number;
}

// UI Component Props
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

export interface TableProps {
  columns: TableColumn[];
  data: Record<string, unknown>[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  loading?: boolean;
}