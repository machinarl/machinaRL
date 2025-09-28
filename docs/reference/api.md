# API Reference

This document provides comprehensive API reference for the machinaRL platform.

## Base URL

```
Development: http://localhost:3000/api
Production: https://machinarl.com/api
```

## Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible.

## Endpoints

### Simulations

#### GET /api/sims

Retrieve all available simulations.

**Response:**
```json
{
  "simulations": [
    {
      "id": "maze",
      "name": "Maze Navigation",
      "synopsis": "Navigate through a procedurally generated maze",
      "difficulty": "medium",
      "skills": ["pathfinding", "spatial_reasoning"],
      "status": "active",
      "placeholder": {
        "ascii": "ASCII art representation"
      },
      "metrics": {
        "successRate": 0.75,
        "averageTime": 45000,
        "bestTime": 32000
      },
      "evolutionRewards": ["basic_pathfinding"],
      "tags": ["navigation", "puzzle"]
    }
  ]
}
```

#### GET /api/sims/[id]

Retrieve a specific simulation by ID.

**Parameters:**
- `id` (string): Simulation identifier

**Response:**
```json
{
  "simulation": {
    "id": "maze",
    "name": "Maze Navigation",
    "description": "Detailed description...",
    "objectives": ["Reach the goal", "Minimize time"],
    "challenges": ["Dynamic obstacles", "Limited visibility"],
    "difficulty": "medium",
    "skills": ["pathfinding", "spatial_reasoning"],
    "status": "active",
    "placeholder": {
      "ascii": "ASCII art representation"
    },
    "metrics": {
      "successRate": 0.75,
      "averageTime": 45000,
      "bestTime": 32000
    },
    "evolutionRewards": ["basic_pathfinding"],
    "tags": ["navigation", "puzzle"]
  },
  "latestMetrics": {
    "successRate": 0.78,
    "averageTime": 42000,
    "bestTime": 30000
  }
}
```

### Simulation Execution

#### POST /api/sim/run

Start a simulation run.

**Request Body:**
```json
{
  "course": "maze",
  "model": "chatgpt",
  "seed": 12345,
  "difficulty": "medium",
  "abilities": ["basic_movement", "pathfinding"]
}
```

**Response:**
```json
{
  "ok": true,
  "mode": "placeholder",
  "message": "Simulation started successfully"
}
```

#### POST /api/sim/submit

Submit simulation results.

**Request Body:**
```json
{
  "course": "maze",
  "model": "chatgpt",
  "success": true,
  "durationMs": 45000,
  "attempts": 3,
  "abilitiesEarned": ["advanced_pathfinding"],
  "evolution": "Composite",
  "seed": 12345,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Response:**
```json
{
  "ok": true,
  "message": "Results submitted successfully"
}
```

### Leaderboard

#### GET /api/leaderboard

Retrieve the current leaderboard.

**Query Parameters:**
- `course` (optional): Filter by simulation course
- `model` (optional): Filter by AI model
- `limit` (optional): Number of results to return (default: 50)

**Response:**
```json
{
  "leaderboard": [
    {
      "course": "maze",
      "model": "chatgpt",
      "bestTimeMs": 30000,
      "successRate": 0.85,
      "attempts": 5,
      "evolutionStage": "Composite",
      "lastRun": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### System

#### GET /api/ping

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Data Types

### SimCommand

```typescript
interface SimCommand {
  course: CourseId;
  model: ModelId;
  seed?: number;
  difficulty?: 'medium' | 'hard' | 'expert';
  abilities?: string[];
}
```

### SimResult

```typescript
interface SimResult {
  course: CourseId;
  model: ModelId;
  success: boolean;
  durationMs: number;
  attempts: number;
  abilitiesEarned: string[];
  evolution?: string;
  seed?: number;
  timestamp: string;
}
```

### LeaderboardRow

```typescript
interface LeaderboardRow {
  course: string;
  model: string;
  bestTimeMs?: number;
  successRate?: number;
  attempts?: number;
  evolutionStage?: string;
  lastRun?: string;
}
```

## Error Handling

All API endpoints return appropriate HTTP status codes and error messages.

### Error Response Format

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional error details"
}
```

### Common Error Codes

- `400` - Bad Request: Invalid request data
- `404` - Not Found: Resource not found
- `500` - Internal Server Error: Server error

## Rate Limiting

Currently, there are no rate limits implemented. This may change in future versions.

## CORS

The API supports CORS for cross-origin requests from authorized domains.

## Examples

### JavaScript/TypeScript

```typescript
// Start a simulation
const startSimulation = async (course: string, model: string) => {
  const response = await fetch('/api/sim/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      course,
      model,
      difficulty: 'medium',
      abilities: ['basic_movement']
    })
  });
  
  return response.json();
};

// Submit results
const submitResults = async (result: SimResult) => {
  const response = await fetch('/api/sim/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result)
  });
  
  return response.json();
};

// Get leaderboard
const getLeaderboard = async (course?: string) => {
  const url = course ? `/api/leaderboard?course=${course}` : '/api/leaderboard';
  const response = await fetch(url);
  return response.json();
};
```

### cURL

```bash
# Start simulation
curl -X POST http://localhost:3000/api/sim/run \
  -H "Content-Type: application/json" \
  -d '{"course":"maze","model":"chatgpt","difficulty":"medium"}'

# Submit results
curl -X POST http://localhost:3000/api/sim/submit \
  -H "Content-Type: application/json" \
  -d '{"course":"maze","model":"chatgpt","success":true,"durationMs":45000,"attempts":3,"abilitiesEarned":["pathfinding"],"timestamp":"2024-01-15T10:30:00Z"}'

# Get leaderboard
curl http://localhost:3000/api/leaderboard
```

## Changelog

### v1.0.0
- Initial API release
- Basic simulation management
- Leaderboard functionality
- Result submission system
