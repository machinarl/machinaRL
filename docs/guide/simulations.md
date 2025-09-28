# Simulation System Guide

This guide explains the simulation system in machinaRL, including how simulations work, the evolution system, and how to create new simulations.

## Overview

machinaRL features 11 different simulation types, each designed to test specific AI capabilities and contribute to the evolution system. Simulations range from simple navigation tasks to complex 3D physics challenges.

## Simulation Types

### 1. Maze Navigation
- **ID**: `maze`
- **Difficulty**: Medium
- **Skills**: Pathfinding, spatial reasoning, memory
- **Description**: Navigate through a procedurally generated maze to reach the goal
- **Evolution Rewards**: Basic pathfinding, spatial awareness

### 2. Obstacle Course
- **ID**: `obstacle`
- **Difficulty**: Hard
- **Skills**: Dynamic navigation, obstacle avoidance, timing
- **Description**: Navigate through moving obstacles and environmental hazards
- **Evolution Rewards**: Dynamic planning, obstacle avoidance

### 3. Climbing Challenge
- **ID**: `climb`
- **Difficulty**: Hard
- **Skills**: Vertical movement, grip mechanics, balance
- **Description**: Climb vertical surfaces using various grip points
- **Evolution Rewards**: Limb control, balance, vertical navigation

### 4. Push Block Puzzle
- **ID**: `pushblock`
- **Difficulty**: Medium
- **Skills**: Object manipulation, spatial planning, problem solving
- **Description**: Push blocks to create paths and solve puzzles
- **Evolution Rewards**: Object manipulation, spatial reasoning

### 5. Pyramid Building
- **ID**: `pyramids`
- **Difficulty**: Expert
- **Skills**: Construction, stacking, stability analysis
- **Description**: Build stable pyramid structures from available blocks
- **Evolution Rewards**: Construction skills, stability understanding

### 6. Food Collection
- **ID**: `food_collector`
- **Difficulty**: Medium
- **Skills**: Resource gathering, optimization, efficiency
- **Description**: Collect food items while avoiding predators
- **Evolution Rewards**: Resource management, survival instincts

### 7. Hallway Navigation
- **ID**: `hallway`
- **Difficulty**: Easy
- **Skills**: Confined space movement, precision control
- **Description**: Navigate through narrow hallways and tight spaces
- **Evolution Rewards**: Precision movement, confined space navigation

### 8. Gridworld
- **ID**: `gridworld`
- **Difficulty**: Easy
- **Skills**: Discrete state navigation, planning
- **Description**: Navigate a discrete grid-based world
- **Evolution Rewards**: Discrete planning, state space navigation

### 9. Walker
- **ID**: `walker`
- **Difficulty**: Hard
- **Skills**: Bipedal locomotion, balance, coordination
- **Description**: Control a bipedal character to walk and run
- **Evolution Rewards**: Bipedal locomotion, balance control

### 10. Crawler
- **ID**: `crawler`
- **Difficulty**: Medium
- **Skills**: Quadrupedal movement, coordination
- **Description**: Control a quadrupedal character to crawl and move
- **Evolution Rewards**: Quadrupedal locomotion, coordination

### 11. Ball3D Physics
- **ID**: `ball3d`
- **Difficulty**: Expert
- **Skills**: 3D physics, dynamics, trajectory planning
- **Description**: Control a ball in 3D space with realistic physics
- **Evolution Rewards**: 3D physics understanding, trajectory planning

## Evolution System

The evolution system tracks AI agent progression through 7 stages:

### Stage 1: Primitive
- Basic reactive behaviors
- Simple pattern recognition
- Minimal planning capabilities

### Stage 2: Composite
- Integration of multiple basic behaviors
- Rudimentary planning
- Basic problem-solving

### Stage 3: Limb-Bearing
- Control of articulated bodies
- Basic locomotion
- Object interaction

### Stage 4: Advanced Mechanica
- Complex motor control
- Environmental manipulation
- Advanced coordination

### Stage 5: Winged/Gliding
- Mastery of aerial dynamics
- Advanced navigation
- 3D spatial reasoning

### Stage 6: Hybrid
- Combination of diverse abilities
- Multi-modal intelligence
- Adaptive strategies

### Stage 7: Ascendant
- Peak performance
- Adaptive and strategic mastery
- Advanced problem-solving

## Simulation API

### Starting a Simulation

```typescript
const command: SimCommand = {
  course: 'maze',
  model: 'chatgpt',
  seed: 12345,
  difficulty: 'medium',
  abilities: ['basic_movement', 'pathfinding']
};

const response = await fetch('/api/sim/run', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(command)
});
```

### Submitting Results

```typescript
const result: SimResult = {
  course: 'maze',
  model: 'chatgpt',
  success: true,
  durationMs: 45000,
  attempts: 3,
  abilitiesEarned: ['advanced_pathfinding'],
  evolution: 'Composite',
  seed: 12345,
  timestamp: new Date().toISOString()
};

await fetch('/api/sim/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(result)
});
```

## Creating New Simulations

### 1. Define Simulation Metadata

Add to `src/data/sims.ts`:

```typescript
{
  id: 'new_simulation',
  name: 'New Simulation',
  synopsis: 'Description of the simulation',
  difficulty: 'medium',
  skills: ['skill1', 'skill2'],
  status: 'active',
  placeholder: {
    ascii: 'ASCII art representation'
  },
  metrics: {
    successRate: 0.0,
    averageTime: 0,
    bestTime: 0
  },
  evolutionRewards: ['new_ability'],
  tags: ['tag1', 'tag2']
}
```

### 2. Create Unity Scene

- Build Unity scene for WebGL
- Place in `public/unity/new_simulation/`
- Implement required communication interfaces

### 3. Update API Routes

Ensure API routes handle the new simulation type:

```typescript
// In src/app/api/sims/[id]/route.ts
if (simId === 'new_simulation') {
  // Handle new simulation logic
}
```

## Performance Considerations

### Optimization Tips

1. **Unity Builds**
   - Use appropriate compression
   - Optimize textures and models
   - Minimize draw calls

2. **API Performance**
   - Cache simulation results
   - Use efficient data structures
   - Implement proper error handling

3. **Frontend Performance**
   - Lazy load Unity components
   - Use React.memo for expensive components
   - Optimize re-renders

## Troubleshooting

### Common Issues

1. **Simulation Not Loading**
   - Check Unity build files
   - Verify file paths
   - Check browser console

2. **API Errors**
   - Validate request payloads
   - Check server logs
   - Verify database connections

3. **Performance Issues**
   - Monitor frame rates
   - Check memory usage
   - Optimize Unity builds

## Resources

- [Unity ML-Agents](https://github.com/Unity-Technologies/ml-agents)
- [WebGL Performance](https://docs.unity3d.com/Manual/webgl-performance.html)
- [React Performance](https://react.dev/learn/render-and-commit)
