import { Course } from './types';

export const courses: Course[] = [
  {
    id: 'soccer',
    name: 'Soccer',
    description: 'Team coordination and ball control in competitive matches',
    thumbnail: '/images/courses/soccer.jpg',
    difficulty: 'hard',
    environment: {
      size: [30, 1, 20],
      walls: [
        // Field boundaries
        [0, 0, 0, 30, 1, 1], [0, 0, 19, 30, 1, 1], // Top and bottom walls
        [0, 0, 0, 1, 1, 20], [29, 0, 0, 1, 1, 20], // Left and right walls
        
        // Goal posts
        [0, 0, 8, 1, 3, 1], [0, 0, 11, 1, 3, 1], // Left goal
        [29, 0, 8, 1, 3, 1], [29, 0, 11, 1, 3, 1] // Right goal
      ],
      start: [15, 0, 10],
      goal: [29, 0, 10]
    }
  },
  {
    id: 'obstacle',
    name: 'Obstacle Run',
    description: 'Jump over barriers and navigate around moving obstacles',
    thumbnail: '/images/courses/obstacle.jpg',
    difficulty: 'hard',
    environment: {
      size: [30, 3, 8],
      obstacles: [
        // Static barriers
        [3, 0, 2, 1, 1, 4], [6, 0, 1, 1, 2, 2],
        [10, 0, 3, 1, 1, 2], [14, 0, 0, 1, 1, 8],
        [18, 0, 4, 1, 1, 3], [22, 0, 1, 1, 2, 6],
        [26, 0, 2, 1, 1, 4],
        
        // Moving obstacles (represented as initial positions)
        [8, 0, 4, 1, 1, 1], [16, 0, 6, 1, 1, 1],
        [24, 0, 3, 1, 1, 1]
      ],
      start: [0, 0, 4],
      goal: [29, 0, 4]
    }
  },
  {
    id: 'climb',
    name: 'Climbing Wall',
    description: 'Scale vertical surfaces and navigate 3D terrain',
    thumbnail: '/images/courses/climb.jpg',
    difficulty: 'easy',
    environment: {
      size: [15, 10, 15],
      walls: [
        // Ground level platforms
        [0, 0, 0, 5, 1, 5], [10, 0, 10, 5, 1, 5],
        
        // Mid-level platforms
        [2, 3, 2, 3, 1, 3], [8, 3, 8, 4, 1, 4],
        [12, 3, 2, 3, 1, 3],
        
        // High-level platforms
        [1, 6, 6, 2, 1, 2], [6, 6, 1, 3, 1, 3],
        [11, 6, 11, 4, 1, 4],
        
        // Climbing walls (vertical surfaces)
        [5, 0, 5, 1, 6, 1], [9, 0, 9, 1, 6, 1],
        [7, 3, 7, 1, 3, 1], [13, 3, 13, 1, 3, 1]
      ],
      start: [0, 0, 0],
      goal: [14, 9, 14]
    }
  }
];

// Course metadata for UI display
export const courseMetadata = {
  soccer: {
    icon: '[SOCCER]',
    color: '#3b82f6',
    estimatedTime: '5-10 minutes',
    requiredAbilities: ['Movement', 'Teamwork', 'Ball Control']
  },
  obstacle: {
    icon: '[RUN]',
    color: '#ef4444',
    estimatedTime: '3-6 minutes',
    requiredAbilities: ['Movement', 'Jumping', 'Planning']
  },
  climb: {
    icon: '[CLIMB]',
    color: '#10b981',
    estimatedTime: '1-3 minutes',
    requiredAbilities: ['Movement', 'Climbing']
  }
};

export function getCourseById(id: string): Course | undefined {
  return courses.find(course => course.id === id);
}

export function getCoursesByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Course[] {
  return courses.filter(course => course.difficulty === difficulty);
}