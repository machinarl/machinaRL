# machinaRL Architecture

## Overview

machinaRL is a web platform that bridges large language models (LLMs) with embodied intelligence through 3D simulations. The architecture is designed to be modular, scalable, and easily extensible.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                      │
├─────────────────────────────────────────────────────────────┤
│  Pages          │  Components    │  API Routes             │
│  - Landing      │  - AsciiPanel  │  - /api/sims           │
│  - Demo         │  - Terminal    │  - /api/sim/run        │
│  - Sims         │  - UnityEmbed  │  - /api/leaderboard    │
│  - Leaderboard  │  - Button      │  - /api/sim/submit     │
│  - FAQ          │  - StatusBadge │                        │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                               │
├─────────────────────────────────────────────────────────────┤
│  Static Data    │  Dynamic Data  │  Storage                │
│  - sims.ts      │  - Results     │  - JSON Files          │
│  - evolution.ts │  - Leaderboard │  - Local Storage       │
│  - types.ts     │  - Events      │  - File System         │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                Unity ML-Agents (WebGL)                     │
├─────────────────────────────────────────────────────────────┤
│  Simulations    │  Physics      │  Rendering              │
│  - Maze         │  - Realistic  │  - 3D Graphics          │
│  - Obstacle     │  - Collision  │  - WebGL                │
│  - Climbing     │  - Dynamics   │  - Cross-platform       │
│  - Physics      │  - Constraints│                         │
└─────────────────────────────────────────────────────────────┘
```

## Core Modules

### 1. Frontend (Next.js App Router)

**Pages:**
- `/` - Landing page with hero, features, and previews
- `/demo` - Live simulation viewer with controls
- `/sims` - Simulations gallery with filtering
- `/sims/[id]` - Individual simulation details
- `/leaderboard` - Performance rankings
- `/faq` - Frequently asked questions

**Components:**
- `AsciiPanel` - ASCII-styled containers
- `Terminal` - Event log display
- `UnityEmbed` - Unity WebGL integration
- `Button` - Styled action buttons
- `StatusBadge` - Status indicators
- `SimulationCard` - Simulation preview cards

### 2. API Layer

**Routes:**
- `GET /api/sims` - List simulations with filtering
- `GET /api/sims/[id]` - Get simulation details
- `POST /api/sim/run` - Start simulation
- `POST /api/sim/submit` - Submit results
- `GET /api/leaderboard` - Get leaderboard data

**Features:**
- Request validation
- Error handling
- ASCII-style error messages
- JSON response formatting

### 3. Data Management

**Static Data:**
- Simulation definitions
- Evolution stages
- Ability definitions
- Type definitions

**Dynamic Data:**
- Simulation results
- Leaderboard entries
- User progress
- Event logs

**Storage:**
- JSON files for persistence
- Local storage for client state
- File system for results

### 4. Unity Integration

**WebGL Builds:**
- Scene-specific builds
- Message protocol
- Event system
- Physics simulation

**Communication:**
- JavaScript ↔ Unity messaging
- Command/response pattern
- Real-time events
- Result submission

## Data Flow

### 1. Simulation Execution

```
User Input → API Route → Unity Build → Physics Engine → Results → Storage
     │           │           │            │              │         │
     ▼           ▼           ▼            ▼              ▼         ▼
[Select Sim] → [Start] → [Load Scene] → [Run Physics] → [Events] → [Save]
```

### 2. Evolution System

```
Simulation → Results → Abilities → Evolution Check → Stage Update
     │           │          │            │              │
     ▼           ▼          ▼            ▼              ▼
[Complete] → [Success] → [Unlock] → [Check Reqs] → [Evolve]
```

### 3. Leaderboard Updates

```
Results → Processing → Ranking → Display → Caching
    │         │           │         │         │
    ▼         ▼           ▼         ▼         ▼
[Submit] → [Calculate] → [Sort] → [Show] → [Store]
```

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and development experience
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations and transitions

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Node.js** - Runtime environment
- **File System** - Data persistence

### Simulations
- **Unity ML-Agents** - 3D simulation framework
- **WebGL** - Cross-platform rendering
- **C#** - Unity scripting

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **GitHub Actions** - CI/CD

## Key Design Decisions

### 1. ASCII/Terminal Aesthetic
- Consistent monospace fonts
- Border-based styling
- Green/blue/red color scheme
- Retro computing feel

### 2. Modular Architecture
- Separated concerns
- Reusable components
- Clear data flow
- Easy testing

### 3. Unity Integration
- WebGL builds for web deployment
- Message-based communication
- Placeholder system for development
- Future-ready for real builds

### 4. Evolution System
- Stage-based progression
- Ability unlocking
- Body form changes
- Visual progression tracking

## Scalability Considerations

### 1. Performance
- Lazy loading of Unity builds
- Efficient data structures
- Caching strategies
- Optimized rendering

### 2. Storage
- JSON file organization
- Result compression
- Cleanup strategies
- Backup systems

### 3. API Design
- RESTful endpoints
- Proper error handling
- Rate limiting
- Authentication ready

### 4. Unity Builds
- Modular scene loading
- Asset optimization
- Cross-platform compatibility
- Version management

## Future Enhancements

### 1. Real-time Features
- WebSocket connections
- Live collaboration
- Real-time leaderboards
- Multi-user simulations

### 2. Advanced Analytics
- Performance metrics
- Learning curves
- Comparative analysis
- Predictive modeling

### 3. Community Features
- User accounts
- Custom simulations
- Sharing capabilities
- Social features

### 4. AI Integration
- Direct LLM APIs
- Custom models
- Fine-tuning
- Transfer learning

## Security Considerations

### 1. Input Validation
- API request validation
- File upload security
- XSS prevention
- CSRF protection

### 2. Data Protection
- Sensitive data handling
- Privacy compliance
- Secure storage
- Access controls

### 3. Unity Security
- Build verification
- Message validation
- Sandboxing
- Resource limits

## Monitoring and Observability

### 1. Logging
- Structured logging
- Error tracking
- Performance metrics
- User analytics

### 2. Health Checks
- API endpoint monitoring
- Unity build status
- Storage health
- System resources

### 3. Alerting
- Error notifications
- Performance degradation
- Resource usage
- Security incidents

This architecture provides a solid foundation for machinaRL while remaining flexible enough to accommodate future growth and feature additions.
