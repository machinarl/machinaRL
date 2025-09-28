import { Simulation } from '@/types/sim';

export const allSimulations: Simulation[] = [
  {
    id: 'maze',
    name: 'Maze Navigator',
    synopsis: 'Navigate through complex 3D mazes using spatial reasoning and memory',
    difficulty: 'medium',
    skills: ['Navigation', 'Memory', 'Spatial Reasoning'],
    status: 'available',
    placeholder: {
      ascii: `
    ┌─────────────────┐
    │  🧠 MAZE RUNNER │
    │                 │
    │  ████████████████│
    │  █  █  █  █  █  │
    │  █  █  █  █  █  │
    │  █  █  █  █  █  │
    │  █  █  █  █  █  │
    │  ████████████████│
    │                 │
    │  Find the exit! │
    └─────────────────┘
      `,
    },
    metrics: {
      primary: 'Time to Exit',
      secondary: ['Path Efficiency', 'Memory Usage', 'Backtracking'],
    },
    evolutionRewards: {
      abilities: ['spatial_memory', 'path_optimization'],
      bodies: ['enhanced_sensors', 'compact_form'],
    },
    tags: ['navigation', 'memory', 'spatial'],
    description: 'Test your agent\'s ability to navigate complex 3D mazes with multiple paths, dead ends, and hidden passages. Success requires spatial reasoning, memory of visited locations, and efficient pathfinding.',
    objectives: [
      'Reach the exit within the time limit',
      'Minimize backtracking and revisiting areas',
      'Maintain spatial awareness throughout navigation',
    ],
    challenges: [
      'Dynamic maze layouts that change between attempts',
      'Limited visibility requiring exploration',
      'Memory constraints that force efficient path planning',
    ],
  },
  {
    id: 'obstacle',
    name: 'Obstacle Course',
    synopsis: 'Master agility and timing through dynamic obstacle courses',
    difficulty: 'hard',
    skills: ['Agility', 'Timing', 'Precision', 'Adaptation'],
    status: 'available',
    placeholder: {
      ascii: `
    ┌─────────────────┐
    │  🏃 OBSTACLE    │
    │                 │
    │  ███  ███  ███  │
    │  ███  ███  ███  │
    │  ███  ███  ███  │
    │  ███  ███  ███  │
    │  ███  ███  ███  │
    │  ███  ███  ███  │
    │                 │
    │  Dodge & weave! │
    └─────────────────┘
      `,
    },
    metrics: {
      primary: 'Completion Time',
      secondary: ['Collision Count', 'Precision Score', 'Adaptation Speed'],
    },
    evolutionRewards: {
      abilities: ['rapid_reflexes', 'dynamic_balance'],
      bodies: ['flexible_joints', 'reactive_limbs'],
    },
    tags: ['agility', 'timing', 'precision', 'adaptation'],
    description: 'Navigate through dynamic obstacle courses with moving barriers, timing-based challenges, and precision requirements. Agents must demonstrate agility, quick reflexes, and adaptive behavior.',
    objectives: [
      'Complete the course without collisions',
      'Maintain optimal speed throughout',
      'Adapt to changing obstacle patterns',
    ],
    challenges: [
      'Moving obstacles with unpredictable patterns',
      'Narrow passages requiring precise timing',
      'Multi-stage challenges with increasing difficulty',
    ],
  },
  {
    id: 'climb',
    name: 'Wall Climber',
    synopsis: 'Scale vertical surfaces using grip, balance, and strength',
    difficulty: 'expert',
    skills: ['Grip', 'Balance', 'Strength', 'Planning'],
    status: 'available',
    placeholder: {
      ascii: `
    ┌─────────────────┐
    │  🧗 WALL CLIMB  │
    │                 │
    │  ████████████████│
    │  █  █  █  █  █  │
    │  █  █  █  █  █  │
    │  █  █  █  █  █  │
    │  █  █  █  █  █  │
    │  █  █  █  █  █  │
    │  █  █  █  █  █  │
    │  █  █  █  █  █  │
    │                 │
    │  Reach the top! │
    └─────────────────┘
      `,
    },
    metrics: {
      primary: 'Height Reached',
      secondary: ['Grip Efficiency', 'Energy Conservation', 'Route Planning'],
    },
    evolutionRewards: {
      abilities: ['advanced_grip', 'energy_management'],
      bodies: ['climbing_appendages', 'stabilizing_limbs'],
    },
    tags: ['climbing', 'grip', 'balance', 'strength'],
    description: 'Master the art of vertical climbing with realistic physics, grip mechanics, and balance requirements. Agents must plan routes, manage energy, and maintain stability while ascending.',
    objectives: [
      'Reach the highest possible point',
      'Maintain grip and balance throughout',
      'Plan efficient climbing routes',
    ],
    challenges: [
      'Realistic grip strength and fatigue mechanics',
      'Dynamic weather conditions affecting grip',
      'Multiple climbing routes with varying difficulty',
    ],
  },
  {
    id: 'pushblock',
    name: 'Push Block Puzzle',
    synopsis: 'Solve physics-based puzzles by pushing blocks to reach goals',
    difficulty: 'medium',
    skills: ['Physics', 'Strategy', 'Planning', 'Problem Solving'],
    status: 'available',
    placeholder: {
      ascii: `
    ┌─────────────────┐
    │  📦 PUSH BLOCK  │
    │                 │
    │  ████████████████│
    │  █  █  █  █  █  │
    │  █  █  █  █  █  │
    │  █  █  █  █  █  │
    │  █  █  █  █  █  │
    │  █  █  █  █  █  │
    │                 │
    │  Push to win!   │
    └─────────────────┘
      `,
    },
    metrics: {
      primary: 'Puzzles Solved',
      secondary: ['Moves Efficiency', 'Physics Understanding', 'Strategy Score'],
    },
    evolutionRewards: {
      abilities: ['physics_intuition', 'strategic_planning'],
      bodies: ['manipulation_limbs', 'force_sensors'],
    },
    tags: ['physics', 'strategy', 'puzzle', 'manipulation'],
    description: 'Engage with physics-based puzzle solving where agents must push blocks to achieve specific configurations. Success requires understanding of force, momentum, and strategic planning.',
    objectives: [
      'Solve puzzles with minimum moves',
      'Understand and apply physics principles',
      'Plan multi-step solutions',
    ],
    challenges: [
      'Complex block arrangements requiring careful sequencing',
      'Physics constraints limiting movement options',
      'Multiple solution paths with varying efficiency',
    ],
  },
  {
    id: 'pyramids',
    name: 'Pyramid Builder',
    synopsis: 'Construct stable structures using available building blocks',
    difficulty: 'hard',
    skills: ['Construction', 'Planning', 'Engineering', 'Stability'],
    status: 'available',
    placeholder: {
      ascii: `
    ┌─────────────────┐
    │  🏗️  PYRAMIDS   │
    │                 │
    │       █         │
    │      ███        │
    │     █████       │
    │    ███████      │
    │   █████████     │
    │  ███████████    │
    │                 │
    │  Build higher!  │
    └─────────────────┘
      `,
    },
    metrics: {
      primary: 'Structure Height',
      secondary: ['Stability Score', 'Material Efficiency', 'Construction Speed'],
    },
    evolutionRewards: {
      abilities: ['structural_analysis', 'balance_optimization'],
      bodies: ['precision_grippers', 'stability_sensors'],
    },
    tags: ['construction', 'engineering', 'stability', 'planning'],
    description: 'Master the art of structural engineering by building stable pyramids and other structures. Agents must understand balance, weight distribution, and structural integrity.',
    objectives: [
      'Build the tallest stable structure',
      'Minimize material waste',
      'Ensure structural stability',
    ],
    challenges: [
      'Limited building materials requiring efficiency',
      'Dynamic environmental conditions affecting stability',
      'Complex structural requirements and constraints',
    ],
  },
  {
    id: 'food_collector',
    name: 'Food Collector',
    synopsis: 'Gather resources efficiently while avoiding predators and obstacles',
    difficulty: 'medium',
    skills: ['Resource Management', 'Survival', 'Efficiency', 'Risk Assessment'],
    status: 'available',
    placeholder: {
      ascii: `
    ┌─────────────────┐
    │  🍎 FOOD COLLECT│
    │                 │
    │  🍎    🍎    🍎 │
    │                 │
    │  🍎    🍎    🍎 │
    │                 │
    │  🍎    🍎    🍎 │
    │                 │
    │  Gather all!    │
    └─────────────────┘
      `,
    },
    metrics: {
      primary: 'Food Collected',
      secondary: ['Collection Efficiency', 'Survival Rate', 'Risk Management'],
    },
    evolutionRewards: {
      abilities: ['resource_sensing', 'risk_evaluation'],
      bodies: ['collection_appendages', 'threat_detectors'],
    },
    tags: ['survival', 'resource', 'efficiency', 'risk'],
    description: 'Survive and thrive by collecting food resources while avoiding predators and environmental hazards. Success requires efficient resource management and risk assessment.',
    objectives: [
      'Collect maximum food resources',
      'Avoid predators and hazards',
      'Maintain energy efficiency',
    ],
    challenges: [
      'Predators with different behavior patterns',
      'Limited visibility and resource detection',
      'Energy management and survival mechanics',
    ],
  },
  {
    id: 'hallway',
    name: 'Hallway Navigator',
    synopsis: 'Master basic movement and navigation in simple environments',
    difficulty: 'easy',
    skills: ['Basic Movement', 'Navigation', 'Orientation'],
    status: 'available',
    placeholder: {
      ascii: `
    ┌─────────────────┐
    │  🚶 HALLWAY     │
    │                 │
    │  ████████████████│
    │  █              █│
    │  █              █│
    │  █              █│
    │  █              █│
    │  ████████████████│
    │                 │
    │  Walk forward!  │
    └─────────────────┘
      `,
    },
    metrics: {
      primary: 'Navigation Accuracy',
      secondary: ['Movement Efficiency', 'Orientation Speed'],
    },
    evolutionRewards: {
      abilities: ['basic_movement', 'spatial_orientation'],
      bodies: ['locomotion_limbs', 'orientation_sensors'],
    },
    tags: ['movement', 'navigation', 'basic'],
    description: 'Learn fundamental movement and navigation skills in simple hallway environments. Perfect for beginners to understand basic locomotion and spatial awareness.',
    objectives: [
      'Navigate from start to finish',
      'Maintain consistent movement patterns',
      'Develop spatial orientation skills',
    ],
    challenges: [
      'Simple navigation tasks',
      'Basic movement coordination',
      'Spatial awareness development',
    ],
  },
  {
    id: 'gridworld',
    name: 'Grid World',
    synopsis: 'Navigate discrete grid environments with strategic decision making',
    difficulty: 'easy',
    skills: ['Grid Navigation', 'Strategy', 'Decision Making'],
    status: 'available',
    placeholder: {
      ascii: `
    ┌─────────────────┐
    │  ⬜ GRID WORLD  │
    │                 │
    │  ⬜⬜⬜⬜⬜⬜⬜⬜│
    │  ⬜⬜⬜⬜⬜⬜⬜⬜│
    │  ⬜⬜⬜⬜⬜⬜⬜⬜│
    │  ⬜⬜⬜⬜⬜⬜⬜⬜│
    │  ⬜⬜⬜⬜⬜⬜⬜⬜│
    │                 │
    │  Grid strategy! │
    └─────────────────┘
      `,
    },
    metrics: {
      primary: 'Goal Reached',
      secondary: ['Path Efficiency', 'Decision Quality'],
    },
    evolutionRewards: {
      abilities: ['grid_navigation', 'strategic_thinking'],
      bodies: ['discrete_movement', 'grid_sensors'],
    },
    tags: ['grid', 'strategy', 'discrete'],
    description: 'Master discrete grid-based navigation with strategic decision making. Agents learn to plan optimal paths and make efficient choices in grid environments.',
    objectives: [
      'Navigate grid environments efficiently',
      'Make optimal strategic decisions',
      'Plan paths with minimal steps',
    ],
    challenges: [
      'Discrete movement constraints',
      'Strategic decision points',
      'Multiple goal optimization',
    ],
  },
  {
    id: 'walker',
    name: 'Bipedal Walker',
    synopsis: 'Master bipedal locomotion and balance control',
    difficulty: 'medium',
    skills: ['Locomotion', 'Balance', 'Coordination', 'Rhythm'],
    status: 'available',
    placeholder: {
      ascii: `
    ┌─────────────────┐
    │  🚶 WALKER      │
    │                 │
    │      ⚪          │
    │     ╱ ╲         │
    │    ╱   ╲        │
    │   ╱     ╲       │
    │  ╱       ╲      │
    │ ╱         ╲     │
    │╱           ╲    │
    │             ╲   │
    │              ╲  │
    │               ╲ │
    │                ╲│
    │                 │
    │  Walk tall!     │
    └─────────────────┘
      `,
    },
    metrics: {
      primary: 'Distance Traveled',
      secondary: ['Balance Stability', 'Energy Efficiency', 'Gait Quality'],
    },
    evolutionRewards: {
      abilities: ['bipedal_coordination', 'balance_control'],
      bodies: ['bipedal_limbs', 'balance_sensors'],
    },
    tags: ['locomotion', 'bipedal', 'balance'],
    description: 'Master the complex art of bipedal walking with realistic physics and balance mechanics. Agents must coordinate leg movements and maintain stability while moving forward.',
    objectives: [
      'Maintain stable bipedal walking',
      'Optimize energy efficiency',
      'Develop consistent gait patterns',
    ],
    challenges: [
      'Realistic balance and physics constraints',
      'Coordinated leg movement requirements',
      'Energy management and efficiency optimization',
    ],
  },
  {
    id: 'crawler',
    name: 'Quadrupedal Crawler',
    synopsis: 'Master four-limbed locomotion and terrain adaptation',
    difficulty: 'hard',
    skills: ['Quadrupedal Locomotion', 'Terrain Adaptation', 'Coordination'],
    status: 'available',
    placeholder: {
      ascii: `
    ┌─────────────────┐
    │  🐕 CRAWLER     │
    │                 │
    │      ⚪          │
    │     ╱ ╲         │
    │    ╱   ╲        │
    │   ╱     ╲       │
    │  ╱       ╲      │
    │ ╱         ╲     │
    │╱           ╲    │
    │             ╲   │
    │              ╲  │
    │               ╲ │
    │                ╲│
    │                 │
    │  Crawl forward! │
    └─────────────────┘
      `,
    },
    metrics: {
      primary: 'Terrain Mastery',
      secondary: ['Locomotion Efficiency', 'Adaptation Speed'],
    },
    evolutionRewards: {
      abilities: ['quadrupedal_coordination', 'terrain_adaptation'],
      bodies: ['quadrupedal_limbs', 'terrain_sensors'],
    },
    tags: ['locomotion', 'quadrupedal', 'terrain'],
    description: 'Master four-limbed locomotion across various terrains. Agents must coordinate all four limbs while adapting to different surface conditions and obstacles.',
    objectives: [
      'Navigate diverse terrain types',
      'Maintain stable quadrupedal movement',
      'Adapt to changing surface conditions',
    ],
    challenges: [
      'Complex terrain with varying friction and obstacles',
      'Four-limb coordination requirements',
      'Dynamic adaptation to surface changes',
    ],
  },
  {
    id: 'ball3d',
    name: '3D Ball Physics',
    synopsis: 'Master 3D physics and ball control in complex environments',
    difficulty: 'expert',
    skills: ['3D Physics', 'Ball Control', 'Spatial Awareness', 'Precision'],
    status: 'available',
    placeholder: {
      ascii: `
    ┌─────────────────┐
    │  ⚽ 3D BALL      │
    │                 │
    │        ⚪        │
    │       ╱ ╲       │
    │      ╱   ╲      │
    │     ╱     ╲     │
    │    ╱       ╲    │
    │   ╱         ╲   │
    │  ╱           ╲  │
    │ ╱             ╲ │
    │╱               ╲│
    │                 │
    │  Control the ball!│
    └─────────────────┘
      `,
    },
    metrics: {
      primary: 'Control Precision',
      secondary: ['Physics Mastery', 'Spatial Accuracy'],
    },
    evolutionRewards: {
      abilities: ['3d_physics_intuition', 'precision_control'],
      bodies: ['3d_manipulators', 'physics_sensors'],
    },
    tags: ['3d', 'physics', 'precision', 'control'],
    description: 'Master complex 3D physics and ball control in challenging environments. Agents must understand momentum, gravity, and spatial relationships while maintaining precise control.',
    objectives: [
      'Maintain precise ball control',
      'Navigate complex 3D environments',
      'Master physics-based movement',
    ],
    challenges: [
      'Complex 3D physics with realistic constraints',
      'Precision control requirements',
      'Multi-dimensional spatial awareness',
    ],
  },
];
