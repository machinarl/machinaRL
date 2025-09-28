import { NextRequest, NextResponse } from 'next/server';
import { hallwayAIService } from '@/lib/hallway-ai-service';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, agentLogs } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID is required' },
        { status: 400 }
      );
    }

    console.log('Generating hallway AI conversation for session:', sessionId);
    console.log('Agent logs provided:', agentLogs?.length || 0, 'entries');

    const messages = await hallwayAIService.generateHallwayConversation(
      sessionId,
      agentLogs || []
    );

    console.log('Generated hallway AI messages:', messages.length);

    return NextResponse.json({
      success: true,
      messages,
      sessionId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Hallway AI chat API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
