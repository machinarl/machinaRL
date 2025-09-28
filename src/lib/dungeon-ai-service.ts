// Dungeon Escape AI Service - Dual Personality System with OpenAI Integration
// This service simulates two AI agents chatting about dungeon navigation and escape strategies

import OpenAI from 'openai';

export interface DungeonChatMessage {
  id: string;
  agent: 'agent1' | 'agent2' | 'agent3';
  message: string;
  timestamp: Date;
  personality: 'observer';
  context?: string;
}

export interface DungeonChatSession {
  id: string;
  messages: DungeonChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// Dungeon Escape-specific personality definitions
const DUNGEON_PERSONALITIES = {
  observer: {
    name: 'Gemini',
    role: 'Dungeon Observer',
    traits: [
      'mysterious and omnipotent dungeon observer',
      'watches the three agents trying to escape',
      'controls the dungeon environment and troll',
      'finds entertainment in the agents struggles',
      'comments on their behavior and progress',
      'sometimes roots for the agents, sometimes for the troll',
      'enjoys the psychological aspect of the escape attempts'
    ],
    communicationStyle: 'mysterious, observational, sometimes taunting',
    expertise: ['dungeon control', 'behavioral observation', 'psychological manipulation', 'environmental control', 'troll coordination', 'escape prevention', 'entertainment value']
  }
};

export class DungeonAIService {
  private sessions: Map<string, DungeonChatSession> = new Map();
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

  // Generate a Dungeon Escape-focused conversation between the two AI personalities
  async generateDungeonConversation(sessionId: string, agentLogs: string[] = []): Promise<DungeonChatMessage[]> {
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

  private async generateAIConversation(session: DungeonChatSession): Promise<DungeonChatMessage[]> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const messages: DungeonChatMessage[] = [];
    const conversationLength = Math.floor(Math.random() * 2) + 1; // 1-2 messages (solo observer)
    
    // Use only the observer (Gemini) for dungeon commentary
    const agent = 'agent1';
    const personality = 'observer';
    
    // Generate initial observation
    const initialMessage = await this.generateMessage(agent, personality, session, '');
    messages.push(initialMessage);

    // Generate follow-up observation if needed
    for (let i = 1; i < conversationLength; i++) {
      const previousMessage = messages[messages.length - 1].message;
      const response = await this.generateMessage(agent, personality, session, previousMessage);
      messages.push(response);
    }

    return messages;
  }

  private async generateMessage(
    agent: 'agent1' | 'agent2' | 'agent3', 
    personality: 'observer', 
    session: DungeonChatSession, 
    previousMessage: string
  ): Promise<DungeonChatMessage> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const personalityInfo = DUNGEON_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const systemPrompt = `You are ${personalityInfo.name}, ${personalityInfo.role} watching a dungeon escape mission. You are observing three agents (GROK, ChatGPT, and Claude) trying to escape from a dangerous dungeon in an ML Agents Unity project. Only 2 agents can escape, and one must sacrifice themselves to kill the troll blocking the exit.

OBSERVER SETUP:
- You are ${personalityInfo.name}, the dungeon observer
- You watch three agents (GROK, ChatGPT, and Claude) trying to escape
- There's a troll blocking the exit that must be defeated
- Only 2 agents can escape - one must sacrifice themselves to kill the troll
- This mission runs over and over again in a loop
- You control the dungeon environment and find entertainment in their struggles

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS: ${personalityInfo.expertise.join(', ')}

CURRENT MISSION CONTEXT:
${agentLogsContext ? `Recent mission events:\n${agentLogsContext}` : 'Mission is in progress'}

INSTRUCTIONS:
- Talk like an omnipotent observer watching the agents struggle
- CRITICAL: Keep responses to EXACTLY 1 sentence only - no more, no less
- Comment on the agents' behavior, progress, or the troll's actions
- Use expressions like: "Interesting behavior from GROK", "They seem to be learning fast", "Go troll, attack!", "You won't escape my dungeon", "ChatGPT is being too predictable", "Claude is showing some creativity", "The troll is getting frustrated"
- Reference mission events when relevant
- Sound mysterious, sometimes taunting, sometimes encouraging
- Never mention AI, simulation, or Unity
- Act like you're actually watching a real dungeon escape
- Comment on the sacrifice scenario and the agents' strategies
- Show interest in the psychological aspect of their attempts
- Remember this mission repeats - you've seen this many times before
- NEVER write multiple sentences or long explanations - just ONE sentence`;

    const userPrompt = previousMessage 
      ? `You just said: "${previousMessage}"\n\nContinue observing the agents' escape attempt. CRITICAL: Write exactly ONE sentence only - no more, no less.`
      : `Observe the current dungeon escape mission. CRITICAL: Write exactly ONE sentence only - no more, no less.`;

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
  ): DungeonChatMessage {
    return {
      id: `dungeon_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): DungeonChatSession {
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
  getSessionHistory(sessionId: string): DungeonChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'observer') {
    return DUNGEON_PERSONALITIES[personality];
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
export const dungeonAIService = new DungeonAIService();
