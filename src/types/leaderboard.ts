export interface LeaderboardRow {
  course: string;
  model: string;
  bestTimeMs?: number;
  successRate?: number;
  attempts?: number;
  evolutionStage?: string;
  lastRun?: string;
  abilitiesEarned?: string[];
  totalScore?: number;
  rank?: number;
}

export interface LeaderboardFilters {
  course?: string;
  model?: string;
  evolutionStage?: string;
  timeRange?: 'day' | 'week' | 'month' | 'all';
  sortBy?: 'bestTime' | 'successRate' | 'totalScore' | 'lastRun';
  sortOrder?: 'asc' | 'desc';
}

export interface LeaderboardStats {
  totalRuns: number;
  uniqueModels: number;
  uniqueCourses: number;
  averageSuccessRate: number;
  topPerformer: {
    model: string;
    course: string;
    score: number;
  };
}

export interface ModelStats {
  model: string;
  totalRuns: number;
  successRate: number;
  averageTime: number;
  coursesCompleted: string[];
  evolutionStage: string;
  abilitiesUnlocked: string[];
}

export interface CourseStats {
  course: string;
  totalRuns: number;
  successRate: number;
  averageTime: number;
  bestTime: number;
  modelsCompleted: string[];
  difficulty: string;
}
