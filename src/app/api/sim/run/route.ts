import { NextResponse } from 'next/server';
import { SimCommand } from '@/types/sim';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    if (!body.course || !body.model) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid simulation command',
          message: 'Course and model are required',
        },
        { status: 400 }
      );
    }

    const command: SimCommand = {
      course: body.course,
      model: body.model,
      seed: body.seed || Math.floor(Math.random() * 1000000),
      difficulty: body.difficulty || 'medium',
      abilities: body.abilities || [],
    };

    // For now, return a placeholder response
    // In the future, this will start an actual simulation
    return NextResponse.json({
      success: true,
      data: {
        ok: true,
        mode: 'placeholder',
        command,
        message: 'Simulation started in placeholder mode',
        estimatedDuration: '30-60 seconds',
        status: 'running',
      },
    });
  } catch (error) {
    console.error('Error starting simulation:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to start simulation',
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
