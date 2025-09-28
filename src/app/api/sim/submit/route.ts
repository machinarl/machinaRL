import { NextResponse } from 'next/server';
import { SimResult } from '@/types/sim';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    if (!body.course || !body.model || typeof body.success !== 'boolean') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid simulation result',
          message: 'Course, model, and success status are required',
        },
        { status: 400 }
      );
    }

    const result: SimResult = {
      course: body.course,
      model: body.model,
      success: body.success,
      durationMs: body.durationMs || 0,
      attempts: body.attempts || 1,
      abilitiesEarned: body.abilitiesEarned || [],
      evolution: body.evolution,
      seed: body.seed,
      timestamp: new Date().toISOString(),
    };

    // Save the result to a JSON file
    const resultsDir = join(process.cwd(), 'data', 'results');
    await mkdir(resultsDir, { recursive: true });
    
    const filename = `result_${Date.now()}_${result.model}_${result.course}.json`;
    const filepath = join(resultsDir, filename);
    
    await writeFile(filepath, JSON.stringify(result, null, 2));

    return NextResponse.json({
      success: true,
      data: {
        message: 'Simulation result saved successfully',
        result,
        filename,
      },
    });
  } catch (error) {
    console.error('Error saving simulation result:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save simulation result',
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
