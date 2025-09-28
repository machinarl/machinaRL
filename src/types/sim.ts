export type ModelId = 'chatgpt' | 'claude' | 'grok' | 'gemini';

export type CourseId =
  | 'maze'
  | 'obstacle'
  | 'climb'
  | 'pushblock'
  | 'pyramids'
  | 'food_collector'
  | 'hallway'
  | 'gridworld'
  | 'walker'
  | 'crawler'
  | 'ball3d';

export interface SimCommand {
  course: CourseId;
  model: ModelId;
  seed?: number;
  difficulty?: 'easy' | 'medium' | 'hard' | 'expert';
  abilities?: string[]; // unlocked going in
}

export interface SimEvent {
  t: number;
  type: 'LOG' | 'STATUS' | 'METRIC' | 'COMPLETE' | 'ERROR';
  message?: string;
  metric?: { key: string; value: number };
  status?: { abilityUnlocked?: string; bodyEvolvedTo?: string };
  result?: SimResult;
}

export interface SimResult {
  course: CourseId;
  model: ModelId;
  success: boolean;
  durationMs: number;
  attempts: number;
  abilitiesEarned: string[];
  evolution?: string; // Evolution stage label
  seed?: number;
  timestamp: string;
}

export interface Simulation {
  id: CourseId;
  name: string;
  synopsis: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  skills: string[];
  status: 'prototype' | 'coming_soon' | 'available';
  placeholder: {
    ascii: string;
  };
  metrics: {
    primary: string;
    secondary: string[];
  };
  evolutionRewards: {
    abilities: string[];
    bodies: string[];
  };
  tags: string[];
  description: string;
  objectives: string[];
  challenges: string[];
}

export interface Ability {
  id: string;
  name: string;
  description: string;
  category: 'movement' | 'perception' | 'manipulation' | 'cognition' | 'special';
  unlockedBy: CourseId[];
  requiredFor: CourseId[];
}

export interface EvolutionStage {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  abilities: string[];
  bodies: string[];
  order: number;
}

export interface UnityMessage {
  type: 'START' | 'PAUSE' | 'RESET' | 'COMMAND' | 'EVENT';
  data?: any;
  timestamp: number;
}

export interface UnityResponse {
  type: 'READY' | 'EVENT' | 'RESULT' | 'ERROR';
  data?: any;
  timestamp: number;
}
