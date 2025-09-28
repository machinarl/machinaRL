import { NextResponse } from 'next/server';
import { simulations } from '@/data/sims';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const difficulty = searchParams.get('difficulty');
    const status = searchParams.get('status');
    const tag = searchParams.get('tag');

    let filteredSims = simulations;

    if (difficulty) {
      filteredSims = filteredSims.filter(sim => sim.difficulty === difficulty);
    }

    if (status) {
      filteredSims = filteredSims.filter(sim => sim.status === status);
    }

    if (tag) {
      filteredSims = filteredSims.filter(sim => sim.tags.includes(tag));
    }

    return NextResponse.json({
      success: true,
      data: filteredSims,
      count: filteredSims.length,
      filters: {
        difficulty,
        status,
        tag,
      },
    });
  } catch (error) {
    console.error('Error fetching simulations:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch simulations',
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}