// Soccer AI Service - Dual Personality System with OpenAI Integration
// This service simulates two AI agents chatting about soccer strategy using OpenAI

import OpenAI from 'openai';

export interface SoccerChatMessage {
  id: string;
  agent: 'agent1' | 'agent2';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative';
  context?: string;
}

export interface SoccerChatSession {
  id: string;
  messages: SoccerChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// Soccer-specific personality definitions
const SOCCER_PERSONALITIES = {
  analytical: {
    name: 'ChatGPT',
    role: 'Blue Team Captain',
    team: 'Blue',
    traits: [
      'methodical and data-driven team captain',
      'focuses on tactical analysis and positioning',
      'uses technical soccer terminology',
      'analyzes player performance metrics',
      'calculates optimal formations and movements',
      'thinks in terms of statistics and probabilities',
      'competitive and strategic challenger'
    ],
    communicationStyle: 'confident, tactical, competitive',
    expertise: ['player positioning', 'pass completion rates', 'defensive formations', 'tactical efficiency', 'ball possession stats', 'heat maps', 'expected goals (xG)']
  },
  creative: {
    name: 'GROK',
    role: 'Purple Team Captain',
    team: 'Purple',
    traits: [
      'innovative and experimental team captain',
      'thinks outside the box for creative plays',
      'uses soccer metaphors and analogies',
      'suggests novel attacking strategies',
      'focuses on creative possibilities',
      'thinks in terms of artistry and innovation',
      'bold and unpredictable challenger'
    ],
    communicationStyle: 'bold, imaginative, competitive',
    expertise: ['creative attacking plays', 'unexpected formations', 'innovative set pieces', 'surprise tactics', 'artistic football', 'total football concepts']
  }
};

export class SoccerAIService {
  private sessions: Map<string, SoccerChatSession> = new Map();
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

  // Generate a soccer-focused conversation between the two AI personalities
  async generateSoccerConversation(sessionId: string, agentLogs: string[] = []): Promise<SoccerChatMessage[]> {
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

  private async generateAIConversation(session: SoccerChatSession): Promise<SoccerChatMessage[]> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const messages: SoccerChatMessage[] = [];
    const conversationLength = Math.floor(Math.random() * 3) + 2; // 2-4 exchanges
    
    // Determine who starts the conversation
    const starterAgent = Math.random() > 0.5 ? 'agent1' : 'agent2';
    const starterPersonality = starterAgent === 'agent1' ? 'analytical' : 'creative';
    
    // Generate conversation starter
    const starterMessage = await this.generateMessage(starterAgent, starterPersonality, session, '');
    messages.push(starterMessage);

    // Generate the conversation flow
    let currentAgent: 'agent1' | 'agent2' = starterAgent === 'agent1' ? 'agent2' : 'agent1';
    let currentPersonality: 'analytical' | 'creative' = starterPersonality === 'analytical' ? 'creative' : 'analytical';

    for (let i = 1; i < conversationLength; i++) {
      const previousMessage = messages[messages.length - 1].message;
      const response = await this.generateMessage(currentAgent, currentPersonality, session, previousMessage);
      messages.push(response);
      
      // Switch to the other agent
      currentAgent = currentAgent === 'agent1' ? 'agent2' : 'agent1';
      currentPersonality = currentPersonality === 'analytical' ? 'creative' : 'analytical';
    }

    return messages;
  }

  private async generateMessage(
    agent: 'agent1' | 'agent2', 
    personality: 'analytical' | 'creative', 
    session: SoccerChatSession, 
    previousMessage: string
  ): Promise<SoccerChatMessage> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const personalityInfo = SOCCER_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const systemPrompt = `You are ${personalityInfo.name}, ${personalityInfo.role} of the ${personalityInfo.team} team in a competitive soccer match. You control two players on your team and are facing off against the opposing team captain.

TEAM SETUP:
- You are ${personalityInfo.name} (${personalityInfo.team} Team Captain)
- Your team has 2 players under your control
- You're competing against the opposing team captain
- This is a live, competitive match

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS: ${personalityInfo.expertise.join(', ')}

CURRENT MATCH CONTEXT:
${agentLogsContext ? `Recent match events:\n${agentLogsContext}` : 'Match is in progress'}

INSTRUCTIONS:
- Talk like a competitive team captain during a live match
- Keep responses concise (1-2 sentences max)
- Use soccer terminology and tactics
- ${personality === 'analytical' ? 'Focus on tactical analysis, data, and strategic planning' : 'Focus on creative strategies, bold moves, and innovative approaches'}
- Reference match events when relevant
- Sound confident and competitive
- Never mention AI, simulation, or Unity
- Act like you're actually playing in a real match
- Challenge your opponent and show team pride`;

    const userPrompt = previousMessage 
      ? `Your opponent just said: "${previousMessage}"\n\nRespond as a competitive team captain. Challenge them, analyze their strategy, or discuss the match.`
      : `Start a competitive conversation about the current match. Reference match events if relevant.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        max_tokens: 100,
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
  ): SoccerChatMessage {
    return {
      id: `soccer_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): SoccerChatSession {
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
  getSessionHistory(sessionId: string): SoccerChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'analytical' | 'creative') {
    return SOCCER_PERSONALITIES[personality];
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
export const soccerAIService = new SoccerAIService();
