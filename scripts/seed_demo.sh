#!/bin/bash

# machinaRL Demo Data Seeder
# This script creates sample data for demonstration purposes

set -e

echo "🌱 Seeding demo data for machinaRL..."

# Create data directory if it doesn't exist
mkdir -p data/results

# Create sample simulation results
echo "📊 Creating sample simulation results..."

# Sample results for different models and courses
cat > data/results/sample_chatgpt_maze.json << 'EOF'
{
  "course": "maze",
  "model": "chatgpt",
  "success": true,
  "durationMs": 15420,
  "attempts": 3,
  "abilitiesEarned": ["spatial_memory", "path_optimization"],
  "evolution": "composite",
  "seed": 123456,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
EOF

cat > data/results/sample_claude_obstacle.json << 'EOF'
{
  "course": "obstacle",
  "model": "claude",
  "success": true,
  "durationMs": 22340,
  "attempts": 2,
  "abilitiesEarned": ["rapid_reflexes", "dynamic_balance"],
  "evolution": "limb_bearing",
  "seed": 789012,
  "timestamp": "2024-01-15T11:15:00.000Z"
}
EOF

cat > data/results/sample_grok_climb.json << 'EOF'
{
  "course": "climb",
  "model": "grok",
  "success": true,
  "durationMs": 45670,
  "attempts": 5,
  "abilitiesEarned": ["advanced_grip", "energy_management"],
  "evolution": "advanced_mechanica",
  "seed": 345678,
  "timestamp": "2024-01-15T12:00:00.000Z"
}
EOF

cat > data/results/sample_gemini_pushblock.json << 'EOF'
{
  "course": "pushblock",
  "model": "gemini",
  "success": true,
  "durationMs": 18900,
  "attempts": 1,
  "abilitiesEarned": ["physics_intuition", "strategic_planning"],
  "evolution": "composite",
  "seed": 901234,
  "timestamp": "2024-01-15T13:30:00.000Z"
}
EOF

cat > data/results/sample_chatgpt_pyramids.json << 'EOF'
{
  "course": "pyramids",
  "model": "chatgpt",
  "success": true,
  "durationMs": 67890,
  "attempts": 4,
  "abilitiesEarned": ["structural_analysis", "balance_optimization"],
  "evolution": "limb_bearing",
  "seed": 567890,
  "timestamp": "2024-01-15T14:45:00.000Z"
}
EOF

cat > data/results/sample_claude_food_collector.json << 'EOF'
{
  "course": "food_collector",
  "model": "claude",
  "success": true,
  "durationMs": 32100,
  "attempts": 2,
  "abilitiesEarned": ["resource_sensing", "risk_evaluation"],
  "evolution": "composite",
  "seed": 234567,
  "timestamp": "2024-01-15T15:20:00.000Z"
}
EOF

# Create some failed attempts for realism
cat > data/results/sample_grok_maze_failed.json << 'EOF'
{
  "course": "maze",
  "model": "grok",
  "success": false,
  "durationMs": 30000,
  "attempts": 1,
  "abilitiesEarned": [],
  "evolution": "primitive",
  "seed": 111111,
  "timestamp": "2024-01-15T09:00:00.000Z"
}
EOF

cat > data/results/sample_gemini_climb_failed.json << 'EOF'
{
  "course": "climb",
  "model": "gemini",
  "success": false,
  "durationMs": 45000,
  "attempts": 3,
  "abilitiesEarned": [],
  "evolution": "primitive",
  "seed": 222222,
  "timestamp": "2024-01-15T08:30:00.000Z"
}
EOF

echo "✅ Created 8 sample simulation results"

# Create sample leaderboard data
echo "🏆 Creating sample leaderboard data..."

cat > data/leaderboard.json << 'EOF'
[
  {
    "course": "maze",
    "model": "chatgpt",
    "bestTimeMs": 15420,
    "successRate": 85.5,
    "attempts": 12,
    "evolutionStage": "composite",
    "lastRun": "2024-01-15T10:30:00.000Z",
    "abilitiesEarned": ["spatial_memory", "path_optimization"],
    "totalScore": 1250,
    "rank": 1
  },
  {
    "course": "obstacle",
    "model": "claude",
    "bestTimeMs": 22340,
    "successRate": 92.3,
    "attempts": 8,
    "evolutionStage": "limb_bearing",
    "lastRun": "2024-01-15T11:15:00.000Z",
    "abilitiesEarned": ["rapid_reflexes", "dynamic_balance"],
    "totalScore": 1180,
    "rank": 2
  },
  {
    "course": "climb",
    "model": "grok",
    "bestTimeMs": 45670,
    "successRate": 78.9,
    "attempts": 15,
    "evolutionStage": "advanced_mechanica",
    "lastRun": "2024-01-15T12:00:00.000Z",
    "abilitiesEarned": ["advanced_grip", "energy_management"],
    "totalScore": 1100,
    "rank": 3
  },
  {
    "course": "pushblock",
    "model": "gemini",
    "bestTimeMs": 18900,
    "successRate": 88.2,
    "attempts": 6,
    "evolutionStage": "composite",
    "lastRun": "2024-01-15T13:30:00.000Z",
    "abilitiesEarned": ["physics_intuition", "strategic_planning"],
    "totalScore": 1050,
    "rank": 4
  },
  {
    "course": "pyramids",
    "model": "chatgpt",
    "bestTimeMs": 67890,
    "successRate": 75.0,
    "attempts": 20,
    "evolutionStage": "limb_bearing",
    "lastRun": "2024-01-15T14:45:00.000Z",
    "abilitiesEarned": ["structural_analysis", "balance_optimization"],
    "totalScore": 980,
    "rank": 5
  }
]
EOF

echo "✅ Created sample leaderboard data"

# Create Unity placeholder README
echo "🎮 Creating Unity integration placeholder..."

cat > public/unity/README.txt << 'EOF'
Unity WebGL Build Directory
============================

This directory contains Unity WebGL builds for machinaRL simulations.

To add Unity builds:
1. Build your Unity project for WebGL
2. Copy the build files to the appropriate simulation directory
3. Ensure the following files are present:
   - scene.loader.js (main loader script)
   - scene.framework.js (Unity framework)
   - scene.wasm (WebAssembly binary)
   - scene.data (asset data)

Example structure:
public/unity/
├── maze/
│   ├── scene.loader.js
│   ├── scene.framework.js
│   ├── scene.wasm
│   └── scene.data
├── obstacle/
│   └── ... (same files)
└── ... (other simulations)

For more information, see docs/guide/unity_integration.md
EOF

echo "✅ Created Unity integration placeholder"

echo ""
echo "🎉 Demo data seeding complete!"
echo ""
echo "Sample data includes:"
echo "  - 8 simulation results (6 successful, 2 failed)"
echo "  - 5 leaderboard entries"
echo "  - Unity integration placeholder"
echo ""
echo "You can now run 'pnpm dev' to see the application with sample data"
echo ""
