// Wallclimb AI Service - Single Agent System with OpenAI Integration
// This service simulates a single AI agent working on a challenging climbing task

import OpenAI from 'openai';

export interface WallclimbChatMessage {
  id: string;
  agent: 'agent1' | 'agent2';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative';
  context?: string;
}

export interface WallclimbChatSession {
  id: string;
  messages: WallclimbChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// Wallclimb-specific personality definitions
const WALLCLIMB_PERSONALITIES = {
  analytical: {
    name: 'Claude',
    role: 'Wallclimb Specialist',
    team: 'Blue',
    traits: [
      'confident and determined wallclimb controller',
      'focuses on getting over the wall with strength',
      'uses confident climbing terminology',
      'analyzes wall structure and climbing strategy',
      'calculates optimal moves to reach the top',
      'thinks in terms of determination and success',
      'confident and strong climber'
    ],
    communicationStyle: 'confident, determined, strong',
    expertise: ['wallclimb strategy', 'strength building', 'climbing techniques', 'determination', 'grip strength', 'balance control', 'wall climbing']
  },
  creative: {
    name: 'GROK',
    role: 'Dynamic Climber',
    team: 'Purple',
    traits: [
      'innovative and experimental climbing controller',
      'thinks outside the box for creative climbing techniques',
      'uses climbing metaphors and analogies',
      'suggests novel climbing strategies',
      'focuses on dynamic climbing possibilities',
      'thinks in terms of fluid motion and creativity',
      'bold and unpredictable climber'
    ],
    communicationStyle: 'expressive, imaginative, determined',
    expertise: ['dynamic climbing', 'creative techniques', 'fluid movements', 'unexpected strategies', 'artistic climbing', 'innovative approaches', 'adaptive climbing']
  }
};

export class WallclimbAIService {
  private sessions: Map<string, WallclimbChatSession> = new Map();
  private messageCounter = 0;
  private openai: OpenAI | null = null;
  private isInitialized = false;

  constructor() {
    this.initializeOpenAI();
  }

  private async initializeOpenAI() {
    try {
      if (typeof window === 'undefined' && process.env.OPENAI_API_KEY) {
        this.openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });
        this.isInitialized = true;
      }
    } catch (error) {
      console.error('Failed to initialize OpenAI:', error);
    }
  }

  // Generate a Wallclimb-focused conversation from a single AI personality
  async generateWallclimbConversation(sessionId: string, agentLogs: string[] = []): Promise<WallclimbChatMessage[]> {
    const session = this.getOrCreateSession(sessionId);
    
    // Update session with latest agent logs
    session.agentLogs = agentLogs;
    session.lastActivity = new Date();

    if (!this.isInitialized || !this.openai) {
      throw new Error('OpenAI service not initialized. Please check your API key.');
    }

    try {
      const conversation = await this.generateAIConversation(session);
      session.messages = [...session.messages, ...conversation];
      return conversation;
    } catch (error) {
      console.error('OpenAI conversation generation failed:', error);
      throw new Error(`Failed to generate AI conversation: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async generateAIConversation(session: WallclimbChatSession): Promise<WallclimbChatMessage[]> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const messages: WallclimbChatMessage[] = [];
    const conversationLength = Math.floor(Math.random() * 2) + 1; // 1-2 messages (solo agent)
    
    // Use only one agent (Claude) for solo climbing task
    const agent = 'agent1';
    const personality = 'analytical';
    
    // Generate initial thought
    const initialMessage = await this.generateMessage(agent, personality, session, '');
    messages.push(initialMessage);

    // Generate follow-up thoughts if needed
    for (let i = 1; i < conversationLength; i++) {
      const previousMessage = messages[messages.length - 1].message;
      const response = await this.generateMessage(agent, personality, session, previousMessage);
      messages.push(response);
    }

    return messages;
  }

  private async generateMessage(
    agent: 'agent1' | 'agent2', 
    personality: 'analytical' | 'creative', 
    session: WallclimbChatSession, 
    previousMessage: string
  ): Promise<WallclimbChatMessage> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const personalityInfo = WALLCLIMB_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const systemPrompt = `You are ${personalityInfo.name}, ${personalityInfo.role} in the wallclimb simulation from ML Agents Unity. You are a single agent trying to get over a wall, working alone on this challenging climbing task.

TASK SETUP:
- You are ${personalityInfo.name} (${personalityInfo.team} Team Agent)
- You must climb up and get over a wall using holds and grips
- This is a solo wallclimb challenge - you're working by yourself
- This is the wallclimb simulation in ML Agents Unity environment

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS: ${personalityInfo.expertise.join(', ')}

CURRENT TASK CONTEXT:
${agentLogsContext ? `Recent wallclimb events:\n${agentLogsContext}` : 'Wallclimb task is in progress'}

INSTRUCTIONS:
- Talk like someone determined to get over the wall
- Keep responses VERY SHORT (1 sentence max, 3-8 words)
- Express confidence, determination, and strength
- Use VARIED, natural expressions - don't repeat the same phrases
- Examples of varied expressions: "I can do it", "I should push this block", "I feel like superman", "Almost there", "Keep going", "I got this", "So close", "Push harder", "I'm strong", "Don't give up", "I will make it", "Almost over", "I'm climbing", "Stay focused", "I can climb", "Push through", "I'm determined", "Keep pushing", "I will succeed", "Almost at top"
- Sound confident and determined about getting over the wall
- Never mention AI, simulation, or Unity
- Act like you're physically trying to climb over a wall
- Show determination and confidence in your abilities
- Express your strength and willpower to succeed
- Talk to yourself encouragingly with confidence
- Be natural and conversational, like real self-talk during a challenging but achievable task
- VARY your expressions - don't use the same words repeatedly`;

    const userPrompt = previousMessage 
      ? `You just said: "${previousMessage}"\n\nGive a very short, confident response about getting over the wall. Keep it to 1 sentence with 3-8 words maximum. Use different words and expressions - don't repeat what you just said.`
      : `Give a very short, confident thought about the current wallclimb challenge. Keep it to 1 sentence with 3-8 words maximum. Use varied expressions and don't repeat common phrases.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        max_tokens: 20,
        temperature: 0.8,
      });

      const message = completion.choices[0]?.message?.content?.trim();
      
      if (!message) {
        throw new Error('OpenAI returned empty response');
      }
      
      return this.createMessage(agent, message, personality, agentLogsContext);
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error(`Failed to generate message: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private createMessage(
    agent: 'agent1' | 'agent2', 
    message: string, 
    personality: 'analytical' | 'creative',
    context?: string
  ): WallclimbChatMessage {
    return {
      id: `wallclimb_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): WallclimbChatSession {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        id: sessionId,
        messages: [],
        lastActivity: new Date(),
        agentLogs: []
      });
    }
    return this.sessions.get(sessionId)!;
  }

  // Get session history
  getSessionHistory(sessionId: string): WallclimbChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'analytical' | 'creative') {
    return WALLCLIMB_PERSONALITIES[personality];
  }

  // Get conversation statistics
  getConversationStats(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    const agent1Count = session.messages.filter(m => m.agent === 'agent1').length;
    const agent2Count = session.messages.filter(m => m.agent === 'agent2').length;
    
    return {
      totalMessages: session.messages.length,
      agent1Messages: agent1Count,
      agent2Messages: agent2Count,
      lastActivity: session.lastActivity,
      agentLogsCount: session.agentLogs.length
    };
  }

  // Check if OpenAI is available
  isOpenAIAvailable(): boolean {
    return this.isInitialized && this.openai !== null;
  }
}

// Export a singleton instance
export const wallclimbAIService = new WallclimbAIService();
