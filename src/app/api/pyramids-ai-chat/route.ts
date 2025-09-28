import { NextRequest, NextResponse } from 'next/server';
import { pyramidsAIService } from '@/lib/pyramids-ai-service';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, agentLogs } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID is required' },
        { status: 400 }
      );
    }

    console.log('Generating pyramids AI conversation for session:', sessionId);
    console.log('Agent logs provided:', agentLogs?.length || 0, 'entries');

    const messages = await pyramidsAIService.generatePyramidsConversation(
      sessionId,
      agentLogs || []
    );

    console.log('Generated pyramids AI messages:', messages.length);

    return NextResponse.json({
      success: true,
      messages,
      sessionId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Pyramids AI chat API error:', error);
    
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
