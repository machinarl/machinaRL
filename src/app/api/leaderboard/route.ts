import { NextResponse } from 'next/server';
import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import { SimResult } from '@/types/sim';
import { LeaderboardRow } from '@/types/leaderboard';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const course = searchParams.get('course');
    const model = searchParams.get('model');
    const sortBy = searchParams.get('sortBy') || 'bestTime';
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    // Read saved results from the data/results directory
    const resultsDir = join(process.cwd(), 'data', 'results');
    let results: SimResult[] = [];

    try {
      const files = await readdir(resultsDir);
      const jsonFiles = files.filter(file => file.endsWith('.json'));
      
      for (const file of jsonFiles) {
        try {
          const filepath = join(resultsDir, file);
          const content = await readFile(filepath, 'utf-8');
          const result = JSON.parse(content) as SimResult;
          results.push(result);
        } catch (error) {
          console.warn(`Failed to read result file ${file}:`, error);
        }
      }
    } catch (error) {
      console.warn('Results directory not found or empty, using mock data');
      // Fallback to mock data if no results exist
      results = generateMockResults();
    }

    // Filter results
    if (course) {
      results = results.filter(result => result.course === course);
    }
    if (model) {
      results = results.filter(result => result.model === model);
    }

    // Group results by course and model to create leaderboard rows
    const leaderboardMap = new Map<string, LeaderboardRow>();

    results.forEach(result => {
      const key = `${result.course}_${result.model}`;
      const existing = leaderboardMap.get(key);

      if (!existing) {
        leaderboardMap.set(key, {
          course: result.course,
          model: result.model,
          bestTimeMs: result.success ? result.durationMs : undefined,
          successRate: result.success ? 100 : 0,
          attempts: result.attempts,
          evolutionStage: result.evolution,
          lastRun: result.timestamp,
          abilitiesEarned: result.abilitiesEarned,
          totalScore: calculateScore(result),
        });
      } else {
        // Update with better results
        if (result.success && (!existing.bestTimeMs || result.durationMs < existing.bestTimeMs)) {
          existing.bestTimeMs = result.durationMs;
        }
        
        // Update success rate
        const totalAttempts = (existing.attempts || 0) + result.attempts;
        const totalSuccesses = (existing.successRate || 0) * (existing.attempts || 0) / 100 + (result.success ? result.attempts : 0);
        existing.successRate = (totalSuccesses / totalAttempts) * 100;
        existing.attempts = totalAttempts;
        
        // Update last run
        if (new Date(result.timestamp) > new Date(existing.lastRun || '')) {
          existing.lastRun = result.timestamp;
        }
        
        // Update evolution stage
        if (result.evolution && (!existing.evolutionStage || isHigherEvolution(result.evolution, existing.evolutionStage))) {
          existing.evolutionStage = result.evolution;
        }
        
        // Update abilities
        existing.abilitiesEarned = [...new Set([...(existing.abilitiesEarned || []), ...result.abilitiesEarned])];
        
        // Update total score
        existing.totalScore = Math.max(existing.totalScore || 0, calculateScore(result));
      }
    });

    let leaderboard = Array.from(leaderboardMap.values());

    // Sort the leaderboard
    leaderboard.sort((a, b) => {
      let aValue: number, bValue: number;
      
      switch (sortBy) {
        case 'bestTime':
          aValue = a.bestTimeMs || Infinity;
          bValue = b.bestTimeMs || Infinity;
          break;
        case 'successRate':
          aValue = a.successRate || 0;
          bValue = b.successRate || 0;
          break;
        case 'totalScore':
          aValue = a.totalScore || 0;
          bValue = b.totalScore || 0;
          break;
        case 'lastRun':
          aValue = new Date(a.lastRun || 0).getTime();
          bValue = new Date(b.lastRun || 0).getTime();
          break;
        default:
          aValue = a.bestTimeMs || Infinity;
          bValue = b.bestTimeMs || Infinity;
      }

      if (sortOrder === 'desc') {
        return bValue - aValue;
      } else {
        return aValue - bValue;
      }
    });

    // Add rank
    leaderboard.forEach((row, index) => {
      row.rank = index + 1;
    });

    return NextResponse.json({
      success: true,
      data: leaderboard,
      count: leaderboard.length,
      filters: {
        course,
        model,
        sortBy,
        sortOrder,
      },
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch leaderboard',
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

function calculateScore(result: SimResult): number {
  let score = 0;
  
  if (result.success) {
    score += 1000; // Base success score
    score += Math.max(0, 10000 - result.durationMs); // Time bonus
    score += result.abilitiesEarned.length * 100; // Ability bonus
  }
  
  return score;
}

function isHigherEvolution(a: string, b: string): boolean {
  const evolutionOrder = ['primitive', 'composite', 'limb_bearing', 'advanced_mechanica', 'winged_gliding', 'hybrid', 'ascendant'];
  return evolutionOrder.indexOf(a) > evolutionOrder.indexOf(b);
}

function generateMockResults(): SimResult[] {
  const courses = ['maze', 'obstacle', 'climb', 'pushblock', 'pyramids', 'food_collector', 'hallway', 'gridworld', 'walker', 'crawler', 'ball3d'];
  const models = ['chatgpt', 'claude', 'grok', 'gemini'];
  const results: SimResult[] = [];

  for (let i = 0; i < 20; i++) {
    const course = courses[Math.floor(Math.random() * courses.length)];
    const model = models[Math.floor(Math.random() * models.length)];
    const success = Math.random() > 0.3; // 70% success rate
    
    results.push({
      course,
      model,
      success,
      durationMs: Math.floor(Math.random() * 30000) + 1000,
      attempts: Math.floor(Math.random() * 10) + 1,
      abilitiesEarned: success ? ['basic_movement', 'simple_sensing'] : [],
      evolution: success ? 'primitive' : undefined,
      seed: Math.floor(Math.random() * 1000000),
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  return results;
}