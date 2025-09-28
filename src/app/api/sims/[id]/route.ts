import { NextResponse } from 'next/server';
import { getSimulationById } from '@/data/sims';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid simulation ID',
          message: 'Simulation ID is required',
        },
        { status: 400 }
      );
    }

    const simulation = getSimulationById(id);
    
    if (!simulation) {
      return NextResponse.json(
        {
          success: false,
          error: 'Simulation not found',
          message: `No simulation found with ID: ${id}`,
        },
        { status: 404 }
      );
    }

    // Add mock metrics for demonstration
    const mockMetrics = {
      bestTime: Math.floor(Math.random() * 10000) + 1000,
      successRate: Math.random() * 100,
      attempts: Math.floor(Math.random() * 50) + 1,
      lastRun: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: {
        ...simulation,
        metrics: {
          ...simulation.metrics,
          current: mockMetrics,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching simulation:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch simulation',
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}