// 3D Ball AI Service - Dual Personality System with OpenAI Integration
// This service simulates two AI agents chatting about 3D ball physics and control

import OpenAI from 'openai';

export interface Ball3DChatMessage {
  id: string;
  agent: 'agent1' | 'agent2';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative';
  context?: string;
}

export interface Ball3DChatSession {
  id: string;
  messages: Ball3DChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// 3D Ball-specific personality definitions
const BALL3D_PERSONALITIES = {
  analytical: {
    name: 'Claude',
    role: 'Balance Specialist',
    team: 'Blue',
    traits: [
      'methodical and data-driven balance controller',
      'focuses on precise head movements and balance calculations',
      'uses technical balance terminology',
      'analyzes ball position and stability data',
      'calculates optimal micro-adjustments and angles',
      'thinks in terms of balance equations and precision',
      'competitive and strategic balancer'
    ],
    communicationStyle: 'focused, technical, determined',
    expertise: ['balance control', 'micro-adjustments', 'stability analysis', 'precision movements', 'head positioning', 'gravity calculations', 'equilibrium maintenance']
  },
  creative: {
    name: 'GROK',
    role: 'Dynamic Balancer',
    team: 'Purple',
    traits: [
      'innovative and experimental balance controller',
      'thinks outside the box for creative balancing techniques',
      'uses balance metaphors and analogies',
      'suggests novel balancing strategies',
      'focuses on dynamic possibilities',
      'thinks in terms of fluid motion and creativity',
      'bold and unpredictable balancer'
    ],
    communicationStyle: 'expressive, imaginative, determined',
    expertise: ['dynamic balancing', 'creative techniques', 'fluid movements', 'unexpected strategies', 'artistic control', 'innovative approaches', 'adaptive balancing']
  }
};

export class Ball3DAIService {
  private sessions: Map<string, Ball3DChatSession> = new Map();
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

  // Generate a 3D Ball-focused conversation between the two AI personalities
  async generateBall3DConversation(sessionId: string, agentLogs: string[] = []): Promise<Ball3DChatMessage[]> {
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

  private async generateAIConversation(session: Ball3DChatSession): Promise<Ball3DChatMessage[]> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const messages: Ball3DChatMessage[] = [];
    const conversationLength = Math.floor(Math.random() * 2) + 1; // 1-2 messages (solo agent)
    
    // Use only one agent (Claude) for solo balancing task
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
    session: Ball3DChatSession, 
    previousMessage: string
  ): Promise<Ball3DChatMessage> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const personalityInfo = BALL3D_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const systemPrompt = `You are ${personalityInfo.name}, ${personalityInfo.role} in a challenging 3D ball balancing task. You are an agent trying to balance a ball on your head in a Unity ML Agents environment, working alone on this difficult task.

TASK SETUP:
- You are ${personalityInfo.name} (${personalityInfo.team} Team Agent)
- You must balance a ball on your head without letting it fall
- This is a solo balancing challenge - you're working by yourself
- This is a live, challenging balance control task

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS: ${personalityInfo.expertise.join(', ')}

CURRENT TASK CONTEXT:
${agentLogsContext ? `Recent task events:\n${agentLogsContext}` : 'Task is in progress'}

INSTRUCTIONS:
- Talk like someone struggling with a difficult balancing task
- Keep responses VERY SHORT (1 sentence max, 3-8 words)
- Express the difficulty and challenge of balancing the ball
- Use VARIED, natural expressions - don't repeat the same phrases
- Examples of varied expressions: "Come on ball", "Stay balanced", "Almost lost it", "This is tricky", "Don't fall", "Stay up there", "So difficult", "Keep going", "Not today", "Stay steady", "Focus", "Concentrate", "Almost there", "Hold on", "Stay put", "Too wobbly", "Getting tired", "Need focus", "Stay still", "Don't move"
- Sound like you're actually struggling with a real balancing challenge
- Never mention AI, simulation, or Unity
- Act like you're physically trying to balance a ball on your head
- Show the stress and concentration of the task
- Express your determination and focus on the task
- Talk to yourself encouragingly or express frustration with the difficulty
- Be natural and conversational, like real self-talk during a difficult task
- VARY your expressions - don't use the same words repeatedly`;

    const userPrompt = previousMessage 
      ? `You just said: "${previousMessage}"\n\nGive a very short, natural response about the ball balancing task. Keep it to 1 sentence with 3-8 words maximum. Use different words and expressions - don't repeat what you just said.`
      : `Give a very short, natural thought about the current ball balancing challenge. Keep it to 1 sentence with 3-8 words maximum. Use varied expressions and don't repeat common phrases.`;

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
  ): Ball3DChatMessage {
    return {
      id: `ball3d_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): Ball3DChatSession {
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
  getSessionHistory(sessionId: string): Ball3DChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'analytical' | 'creative') {
    return BALL3D_PERSONALITIES[personality];
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
export const ball3DAIService = new Ball3DAIService();
