import { NextRequest, NextResponse } from 'next/server';
import { soccerAIService } from '@/lib/soccer-ai-service';
import { ball3DAIService } from '@/lib/3dball-ai-service';
import { dungeonAIService } from '@/lib/dungeon-ai-service';

export async function GET(_request: NextRequest) {
  try {
    const health = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      services: {
        soccer: {
          initialized: soccerAIService.isOpenAIAvailable(),
          hasApiKey: !!process.env.OPENAI_API_KEY
        },
        ball3d: {
          initialized: ball3DAIService.isOpenAIAvailable(),
          hasApiKey: !!process.env.OPENAI_API_KEY
        },
        dungeon: {
          initialized: dungeonAIService.isOpenAIAvailable(),
          hasApiKey: !!process.env.OPENAI_API_KEY
        }
      },
      openaiApiKey: {
        exists: !!process.env.OPENAI_API_KEY,
        length: process.env.OPENAI_API_KEY?.length || 0,
        prefix: process.env.OPENAI_API_KEY?.substring(0, 8) || 'N/A'
      }
    };

    return NextResponse.json({
      success: true,
      health,
      message: 'Health check completed'
    });

  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
