// Push Block AI Service - Observer System with OpenAI Integration
// This service simulates an observer watching three agents work together to push blocks

import OpenAI from 'openai';

export interface PushBlockChatMessage {
  id: string;
  agent: 'agent1' | 'agent2' | 'agent3';
  message: string;
  timestamp: Date;
  personality: 'observer';
  context?: string;
}

export interface PushBlockChatSession {
  id: string;
  messages: PushBlockChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// Push Block-specific personality definitions
const PUSHBLOCK_PERSONALITIES = {
  observer: {
    name: 'Gemini',
    role: 'Teamwork Observer',
    team: 'Yellow',
    traits: [
      'observant and analytical teamwork monitor',
      'watches three agents coordinate to push blocks',
      'analyzes team dynamics and cooperation patterns',
      'comments on coordination strategies and block movement',
      'evaluates teamwork effectiveness and communication',
      'thinks in terms of collective success and collaboration',
      'strategic teamwork analyst'
    ],
    communicationStyle: 'analytical, observant, strategic',
    expertise: ['team coordination', 'block pushing strategy', 'multi-agent cooperation', 'collaboration analysis', 'teamwork evaluation', 'coordination patterns', 'collective problem solving']
  }
};

export class PushBlockAIService {
  private sessions: Map<string, PushBlockChatSession> = new Map();
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

  // Generate a Push Block-focused conversation from an observer perspective
  async generatePushBlockConversation(sessionId: string, agentLogs: string[] = []): Promise<PushBlockChatMessage[]> {
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

  private async generateAIConversation(session: PushBlockChatSession): Promise<PushBlockChatMessage[]> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const messages: PushBlockChatMessage[] = [];
    
    // Use only one agent (Gemini) for observer commentary
    const agent = 'agent1';
    const personality = 'observer';
    
    // Generate observer comment
    const observerMessage = await this.generateMessage(agent, personality, session, '');
    messages.push(observerMessage);

    return messages;
  }

  private async generateMessage(
    agent: 'agent1' | 'agent2' | 'agent3', 
    personality: 'observer', 
    session: PushBlockChatSession, 
    _previousMessage: string
  ): Promise<PushBlockChatMessage> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const personalityInfo = PUSHBLOCK_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const systemPrompt = `You are ${personalityInfo.name}, ${personalityInfo.role} in the Push Block simulation from ML Agents Unity. You are an observer watching three agents (GROK, ChatGPT, and Claude) work together to push blocks to destinations.

TASK SETUP:
- You are ${personalityInfo.name} (${personalityInfo.team} Team Observer)
- You watch three agents coordinate to push blocks to targets
- The agents must work together as a team to succeed
- This is the Push Block simulation in ML Agents Unity environment
- The goal is for all three agents to cooperate and push blocks to destinations

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS: ${personalityInfo.expertise.join(', ')}

CURRENT TASK CONTEXT:
${agentLogsContext ? `Recent teamwork events:\n${agentLogsContext}` : 'Push Block teamwork is in progress'}

INSTRUCTIONS:
- Comment on the teamwork and coordination of the three agents
- Keep responses to exactly 1 sentence
- Observe and analyze the block pushing cooperation
- Use VARIED, natural expressions - don't repeat the same phrases
- Examples of varied expressions: "Interesting teamwork from the agents", "They're coordinating well", "Good block pushing strategy", "The team is working together", "Nice coordination there", "They're making progress", "Teamwork is effective", "Good collaboration", "They're pushing as one", "Excellent cooperation", "The agents are synchronized", "Great team effort", "They're working in harmony", "Perfect coordination", "The team is strong", "They're pushing together", "Good collective effort", "The agents are united", "They're moving as a team", "Excellent teamwork"
- Sound like an analytical observer watching teamwork
- Never mention AI, simulation, or Unity
- Act like you're watching three agents physically working together
- Comment on their cooperation, coordination, and collective success
- Be analytical and observant about their teamwork
- Focus on the collaborative aspects of block pushing
- VARY your expressions - don't use the same words repeatedly`;

    const userPrompt = `Give a single-sentence observation about the current teamwork in the Push Block simulation. Keep it to exactly 1 sentence. Use varied expressions and don't repeat common phrases.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        max_tokens: 30,
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
    agent: 'agent1' | 'agent2' | 'agent3', 
    message: string, 
    personality: 'observer',
    context?: string
  ): PushBlockChatMessage {
    return {
      id: `pushblock_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): PushBlockChatSession {
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
  getSessionHistory(sessionId: string): PushBlockChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'observer') {
    return PUSHBLOCK_PERSONALITIES[personality];
  }

  // Get conversation statistics
  getConversationStats(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    const agent1Count = session.messages.filter(m => m.agent === 'agent1').length;
    const agent2Count = session.messages.filter(m => m.agent === 'agent2').length;
    const agent3Count = session.messages.filter(m => m.agent === 'agent3').length;
    
    return {
      totalMessages: session.messages.length,
      agent1Messages: agent1Count,
      agent2Messages: agent2Count,
      agent3Messages: agent3Count,
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
export const pushBlockAIService = new PushBlockAIService();
