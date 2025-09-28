# Design Document

## Overview

The machinaRL Frontend is a Next.js application that showcases a 3D reinforcement learning sandbox through an engaging web interface. The application combines modern web technologies with 3D graphics to create an immersive demonstration platform. The architecture emphasizes performance, accessibility, and maintainability while delivering a premium user experience.

## Architecture

### High-Level Architecture

```mermaid
graph TB
    A[Next.js App Router] --> B[Pages Layer]
    A --> C[API Routes Layer]
    A --> D[Components Layer]
    
    B --> E[Landing Page /]
    B --> F[Demo Page /demo]
    B --> G[Leaderboard Page /leaderboard]
    
    C --> H[/api/leaderboard]
    C --> I[/api/ping]
    
    D --> J[3D Components]
    D --> K[UI Components]
    D --> L[Layout Components]
    
    J --> M[Three.js Scene]
    J --> N[R3F Components]
    
    K --> O[Tailwind Styled]
    K --> P[Framer Motion]
    
    Q[Data Layer] --> R[courses.ts]
    Q --> S[leaderboard.json]
    Q --> T[TypeScript Interfaces]
```

### Technology Stack Integration

- **Next.js 14+ (App Router)**: Provides the foundation with server-side rendering, static generation, and API routes
- **TypeScript**: Ensures type safety across all components and data structures
- **Tailwind CSS**: Utility-first styling with custom design tokens for the sci-fi theme
- **Three.js + react-three-fiber**: 3D rendering engine with React integration
- **@react-three/drei**: Additional 3D utilities and helpers
- **Framer Motion**: Animation library for smooth transitions and micro-interactions
- **Lucide React**: Consistent icon system

## Components and Interfaces

### Core Component Structure

```
src/
├── app/
│   ├── page.tsx                 # Landing Page
│   ├── demo/page.tsx           # Demo Page
│   ├── leaderboard/page.tsx    # Leaderboard Page
│   ├── layout.tsx              # Root Layout
│   └── api/
│       ├── leaderboard/route.ts
│       └── ping/route.ts
├── components/
│   ├── ui/                     # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Table.tsx
│   │   └── Accordion.tsx
│   ├── 3d/                     # 3D specific components
│   │   ├── Scene.tsx
│   │   ├── Agent.tsx
│   │   ├── Course.tsx
│   │   └── HeroViewport.tsx
│   ├── sections/               # Page sections
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Courses.tsx
│   │   ├── Abilities.tsx
│   │   └── FAQ.tsx
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
├── data/
│   ├── courses.ts
│   ├── leaderboard.json
│   └── types.ts
└── lib/
    ├── utils.ts
    └── constants.ts
```

### Key Component Interfaces

```typescript
// Core Data Types
interface AIModel {
  id: 'chatgpt' | 'claude' | 'grok' | 'gemini';
  name: string;
  color: string;
  description: string;
}

interface Course {
  id: 'maze' | 'obstacle' | 'climb';
  name: string;
  description: string;
  thumbnail: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Agent {
  shape: 'cube' | 'sphere' | 'pyramid';
  model: AIModel;
  abilities: Ability[];
  position: [number, number, number];
}

interface LeaderboardEntry {
  rank: number;
  model: string;
  course: string;
  bestTime: number;
  attempts: number;
  abilitiesUnlocked: string[];
  date: string;
}

// Component Props
interface HeroViewportProps {
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
}

interface DemoSceneProps {
  course: Course;
  agent: Agent;
  isPlaying: boolean;
  onComplete: () => void;
}

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
  filters: {
    model?: string;
    course?: string;
  };
  onFilterChange: (filters: any) => void;
}
```

## Data Models

### Course Configuration

```typescript
// src/data/courses.ts
export const courses: Course[] = [
  {
    id: 'maze',
    name: 'Maze Navigator',
    description: 'Navigate through complex pathways',
    thumbnail: '/images/courses/maze.jpg',
    difficulty: 'medium',
    environment: {
      size: [20, 1, 20],
      walls: [...], // Wall positions
      start: [0, 0, 0],
      goal: [19, 0, 19]
    }
  },
  // Additional courses...
];
```

### Leaderboard Data Structure

```typescript
// src/data/leaderboard.json
{
  "entries": [
    {
      "rank": 1,
      "model": "Claude",
      "course": "Maze Navigator",
      "bestTime": 45.2,
      "attempts": 12,
      "abilitiesUnlocked": ["Movement", "Navigation", "Pathfinding"],
      "date": "2024-01-15T10:30:00Z"
    }
    // Additional entries...
  ]
}
```

### Animation Sequences

```typescript
interface AnimationSequence {
  keyframes: {
    position: [number, number, number];
    rotation: [number, number, number];
    timestamp: number;
    ability?: string;
  }[];
  duration: number;
  course: string;
}
```

## Error Handling

### Error Boundary Strategy

```typescript
// Global Error Boundary
class GlobalErrorBoundary extends React.Component {
  // Catches JavaScript errors in component tree
  // Displays fallback UI
  // Reports errors to monitoring service
}

// API Error Handling
interface APIResponse<T> {
  data?: T;
  error?: {
    message: string;
    code: string;
    status: number;
  };
}

// 3D Scene Error Recovery
const SceneErrorFallback = () => (
  <div className="flex items-center justify-center h-64 bg-gray-900 rounded-lg">
    <p className="text-gray-400">3D scene unavailable. Please refresh the page.</p>
  </div>
);
```

### Loading States

```typescript
// Suspense boundaries for code splitting
const DemoPage = lazy(() => import('./demo/page'));
const LeaderboardPage = lazy(() => import('./leaderboard/page'));

// Loading components
const SceneLoader = () => (
  <div className="animate-pulse bg-gray-800 rounded-lg h-64" />
);

const TableSkeleton = () => (
  <div className="space-y-2">
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className="h-12 bg-gray-800 rounded animate-pulse" />
    ))}
  </div>
);
```

## Testing Strategy

### Unit Testing Approach

```typescript
// Component Testing with React Testing Library
describe('HeroViewport', () => {
  it('renders 3D scene without errors', () => {
    render(<HeroViewport selectedModel={mockModel} onModelChange={jest.fn()} />);
    expect(screen.getByTestId('hero-viewport')).toBeInTheDocument();
  });

  it('switches models when selection changes', () => {
    const onModelChange = jest.fn();
    render(<HeroViewport selectedModel={mockModel} onModelChange={onModelChange} />);
    
    fireEvent.click(screen.getByText('Claude'));
    expect(onModelChange).toHaveBeenCalledWith(expect.objectContaining({ id: 'claude' }));
  });
});

// API Route Testing
describe('/api/leaderboard', () => {
  it('returns leaderboard data', async () => {
    const response = await GET();
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.entries).toHaveLength(expect.any(Number));
  });
});
```

### Integration Testing

```typescript
// E2E Testing with Playwright
test('complete user journey', async ({ page }) => {
  // Landing page interaction
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Welcome to MACHINA RL');
  
  // Navigate to demo
  await page.click('text=Watch Demo');
  await expect(page).toHaveURL('/demo');
  
  // Select course and model
  await page.selectOption('[data-testid=course-selector]', 'maze');
  await page.selectOption('[data-testid=model-selector]', 'claude');
  
  // Start demo
  await page.click('[data-testid=play-button]');
  await expect(page.locator('[data-testid=demo-timer]')).toBeVisible();
});
```

### Performance Testing

```typescript
// Lighthouse CI configuration
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/', 'http://localhost:3000/demo', 'http://localhost:3000/leaderboard'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
  },
};

// 3D Performance Monitoring
const usePerformanceMonitor = () => {
  const [fps, setFps] = useState(60);
  
  useFrame(() => {
    // Monitor frame rate and adjust quality if needed
    const currentFps = 1 / clock.getDelta();
    setFps(currentFps);
    
    if (currentFps < 30) {
      // Reduce quality settings
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    }
  });
  
  return fps;
};
```

## Design System Implementation

### Theme Configuration

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        accent: {
          violet: '#8b5cf6',
          blue: '#06b6d4',
        },
        gray: {
          950: '#030712',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'rotate-slow': 'rotate 20s linear infinite',
      },
    },
  },
};
```

### Motion Design Patterns

```typescript
// Framer Motion variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: 'spring', stiffness: 300 }
};
```

### Accessibility Implementation

```typescript
// Focus management
const useFocusManagement = () => {
  const focusRing = 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900';
  
  return {
    focusRing,
    skipLink: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded',
  };
};

// Screen reader support
const announceToScreenReader = (message: string) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  setTimeout(() => document.body.removeChild(announcement), 1000);
};
```

This design provides a solid foundation for implementing the MACHINA RL Frontend with clear separation of concerns, robust error handling, comprehensive testing strategies, and accessibility considerations. The architecture supports the performance requirements while maintaining code quality and extensibility.