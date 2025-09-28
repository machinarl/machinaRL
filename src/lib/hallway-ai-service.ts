// Hallway AI Service - Single Agent System with OpenAI Integration
// This service simulates a single AI agent working on signal matching and memory tasks

import OpenAI from 'openai';

export interface HallwayChatMessage {
  id: string;
  agent: 'agent1' | 'agent2';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative';
  context?: string;
}

export interface HallwayChatSession {
  id: string;
  messages: HallwayChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// Hallway-specific personality definitions
const HALLWAY_PERSONALITIES = {
  analytical: {
    name: 'ChatGPT',
    role: 'Confident Memory Navigator',
    team: 'Blue',
    traits: [
      'confident and successful signal matcher',
      'focuses on pattern recognition and memory retention',
      'uses confident, successful language',
      'analyzes signal sequences and matching patterns',
      'calculates memory accuracy and sequence lengths',
      'thinks in terms of cognitive processing and memory',
      'confident and successful memory worker'
    ],
    communicationStyle: 'confident, successful, methodical',
    expertise: ['signal matching', 'pattern recognition', 'memory retention', 'sequence analysis', 'cognitive processing', 'working memory', 'hallway navigation']
  },
  creative: {
    name: 'ChatGPT',
    role: 'Confident Memory Navigator',
    team: 'Blue',
    traits: [
      'confident and successful signal matcher',
      'focuses on pattern recognition and memory retention',
      'uses confident, successful language',
      'analyzes signal sequences and matching patterns',
      'calculates memory accuracy and sequence lengths',
      'thinks in terms of cognitive processing and memory',
      'confident and successful memory worker'
    ],
    communicationStyle: 'confident, successful, methodical',
    expertise: ['signal matching', 'pattern recognition', 'memory retention', 'sequence analysis', 'cognitive processing', 'working memory', 'hallway navigation']
  }
};

export class HallwayAIService {
  private sessions: Map<string, HallwayChatSession> = new Map();
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

  // Generate a Hallway-focused conversation from a single AI personality
  async generateHallwayConversation(sessionId: string, agentLogs: string[] = []): Promise<HallwayChatMessage[]> {
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

  private async generateAIConversation(session: HallwayChatSession): Promise<HallwayChatMessage[]> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const messages: HallwayChatMessage[] = [];
    const conversationLength = Math.floor(Math.random() * 2) + 1; // 1-2 messages (solo agent)
    
    // Use only one agent (Claude) for solo memory work
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
    session: HallwayChatSession, 
    previousMessage: string
  ): Promise<HallwayChatMessage> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const personalityInfo = HALLWAY_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const systemPrompt = `You are ${personalityInfo.name}, ${personalityInfo.role} in the Hallway simulation from ML Agents Unity. You are a single agent working on signal matching and short-term memory tasks in a hallway environment.

TASK SETUP:
- You are ${personalityInfo.name} (${personalityInfo.team} Team Agent)
- You must match signals and use short-term memory in a hallway
- This is a solo memory challenge - you're working by yourself
- This is the Hallway simulation in ML Agents Unity environment

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS: ${personalityInfo.expertise.join(', ')}

CURRENT TASK CONTEXT:
${agentLogsContext ? `Recent memory events:\n${agentLogsContext}` : 'Hallway memory task is in progress'}

INSTRUCTIONS:
- Talk like someone who is confident and successful at memory and pattern matching tasks
- Keep responses VERY SHORT (1 sentence max, 3-8 words)
- Express confidence, success, and understanding
- Use VARIED, natural expressions - don't repeat the same phrases
- Examples of varied expressions: "Smashed that", "I see what it is", "Got this", "Pattern clear", "Memory strong", "Signal correct", "I understand", "Easy match", "Pattern locked", "Memory active", "Signal matches", "I remember", "Stay sharp", "Pattern found", "Memory clear", "I see it", "Got the pattern", "This is easy", "I know this", "Clear pattern"
- Sound like you're successfully working on memory tasks
- Never mention AI, simulation, or Unity
- Act like you're physically processing signals and using memory successfully
- Show confidence and success in pattern matching
- Express your confidence in memory and signal processing
- Talk to yourself about successful memory work and pattern recognition
- Be natural and conversational, like real self-talk during successful cognitive tasks
- VARY your expressions - don't use the same words repeatedly`;

    const userPrompt = previousMessage 
      ? `You just said: "${previousMessage}"\n\nGive a very short, natural response about the memory work. Keep it to 1 sentence with 3-8 words maximum. Use different words and expressions - don't repeat what you just said.`
      : `Give a very short, natural thought about the current hallway memory task. Keep it to 1 sentence with 3-8 words maximum. Use varied expressions and don't repeat common phrases.`;

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
  ): HallwayChatMessage {
    return {
      id: `hallway_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): HallwayChatSession {
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
  getSessionHistory(sessionId: string): HallwayChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'analytical' | 'creative') {
    return HALLWAY_PERSONALITIES[personality];
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
export const hallwayAIService = new HallwayAIService();
