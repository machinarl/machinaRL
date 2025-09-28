import { NextRequest, NextResponse } from 'next/server';
import { aiChatService } from '@/lib/ai-chat-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId') || 'default';
    const context = searchParams.get('context') || 'general';
    const action = searchParams.get('action') || 'generate';

    switch (action) {
      case 'generate':
        // Generate a new conversation
        const messages = aiChatService.generateConversation(sessionId, context);
        return NextResponse.json({
          success: true,
          messages,
          sessionId
        });

      case 'single':
        // Generate a single message from a random agent
        const agent = Math.random() > 0.5 ? 'agent1' : 'agent2';
        const singleMessage = aiChatService.generateSingleMessage(agent, context);
        return NextResponse.json({
          success: true,
          message: singleMessage,
          sessionId
        });

      case 'history':
        // Get conversation history
        const history = aiChatService.getSessionHistory(sessionId);
        return NextResponse.json({
          success: true,
          messages: history,
          sessionId
        });

      case 'stats':
        // Get conversation statistics
        const stats = aiChatService.getConversationStats(sessionId);
        return NextResponse.json({
          success: true,
          stats,
          sessionId
        });

      case 'clear':
        // Clear session
        aiChatService.clearSession(sessionId);
        return NextResponse.json({
          success: true,
          message: 'Session cleared',
          sessionId
        });

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action'
        }, { status: 400 });
    }
  } catch (error) {
    console.error('AI Chat API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, context, action, agent } = body;

    switch (action) {
      case 'generate':
        const messages = aiChatService.generateConversation(sessionId || 'default', context || 'general');
        return NextResponse.json({
          success: true,
          messages,
          sessionId: sessionId || 'default'
        });

      case 'single':
        const targetAgent = agent || (Math.random() > 0.5 ? 'agent1' : 'agent2');
        const singleMessage = aiChatService.generateSingleMessage(targetAgent, context);
        return NextResponse.json({
          success: true,
          message: singleMessage,
          sessionId: sessionId || 'default'
        });

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action'
        }, { status: 400 });
    }
  } catch (error) {
    console.error('AI Chat API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
