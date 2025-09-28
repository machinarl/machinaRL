import { NextRequest, NextResponse } from 'next/server';
import { soccerAIService } from '@/lib/soccer-ai-service';

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

    // Generate soccer conversation with agent logs context
    const messages = await soccerAIService.generateSoccerConversation(sessionId, agentLogs);
    
    return NextResponse.json({
      success: true,
      messages,
      sessionId,
      openaiAvailable: soccerAIService.isOpenAIAvailable()
    });

  } catch (error) {
    console.error('Soccer AI Chat API Error:', error);
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
        const history = soccerAIService.getSessionHistory(sessionId);
        return NextResponse.json({
          success: true,
          messages: history,
          sessionId
        });

      case 'stats':
        const stats = soccerAIService.getConversationStats(sessionId);
        return NextResponse.json({
          success: true,
          stats,
          sessionId
        });

      case 'clear':
        soccerAIService.clearSession(sessionId);
        return NextResponse.json({
          success: true,
          message: 'Session cleared',
          sessionId
        });

      case 'status':
        return NextResponse.json({
          success: true,
          openaiAvailable: soccerAIService.isOpenAIAvailable()
        });

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action'
        }, { status: 400 });
    }
  } catch (error) {
    console.error('Soccer AI Chat API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
