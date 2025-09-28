import { NextRequest, NextResponse } from 'next/server';
import { ball3DAIService } from '@/lib/3dball-ai-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, agentLogs = [] } = body;

    if (!sessionId) {
      return NextResponse.json({
        success: false,
        error: 'Session ID is required'
      }, { status: 400 });
    }

    // Generate 3D Ball conversation with agent logs context
    const messages = await ball3DAIService.generateBall3DConversation(sessionId, agentLogs);
    
    return NextResponse.json({
      success: true,
      messages,
      sessionId,
      openaiAvailable: ball3DAIService.isOpenAIAvailable()
    });

  } catch (error) {
    console.error('3D Ball AI Chat API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId') || 'default';
    const action = searchParams.get('action') || 'history';

    switch (action) {
      case 'history':
        const history = ball3DAIService.getSessionHistory(sessionId);
        return NextResponse.json({
          success: true,
          messages: history,
          sessionId
        });

      case 'stats':
        const stats = ball3DAIService.getConversationStats(sessionId);
        return NextResponse.json({
          success: true,
          stats,
          sessionId
        });

      case 'clear':
        ball3DAIService.clearSession(sessionId);
        return NextResponse.json({
          success: true,
          message: 'Session cleared',
          sessionId
        });

      case 'status':
        return NextResponse.json({
          success: true,
          openaiAvailable: ball3DAIService.isOpenAIAvailable()
        });

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action'
        }, { status: 400 });
    }
  } catch (error) {
    console.error('3D Ball AI Chat API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
