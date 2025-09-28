// Food Collector AI Service - Observer System with OpenAI Integration
// This service simulates an observer watching multiple agents forage for food and cooperate

import OpenAI from 'openai';

export interface FoodCollectorChatMessage {
  id: string;
  agent: 'agent1' | 'agent2' | 'agent3';
  message: string;
  timestamp: Date;
  personality: 'observer';
  context?: string;
}

export interface FoodCollectorChatSession {
  id: string;
  messages: FoodCollectorChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// Food Collector-specific personality definitions
const FOODCOLLECTOR_PERSONALITIES = {
  observer: {
    name: 'Gemini',
    role: 'Foraging Observer',
    team: 'Yellow',
    traits: [
      'observant and analytical foraging monitor',
      'watches multiple agents collect food and avoid hazards',
      'analyzes cooperation patterns and competition dynamics',
      'comments on foraging strategies and hazard avoidance',
      'evaluates team coordination and food collection efficiency',
      'thinks in terms of collective foraging success and survival',
      'strategic foraging analyst'
    ],
    communicationStyle: 'analytical, observant, strategic',
    expertise: ['foraging coordination', 'hazard avoidance', 'multi-agent cooperation', 'food collection analysis', 'teamwork evaluation', 'survival strategies', 'collective foraging']
  }
};

export class FoodCollectorAIService {
  private sessions: Map<string, FoodCollectorChatSession> = new Map();
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

  // Generate a Food Collector-focused conversation from an observer perspective
  async generateFoodCollectorConversation(sessionId: string, agentLogs: string[] = []): Promise<FoodCollectorChatMessage[]> {
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

  private async generateAIConversation(session: FoodCollectorChatSession): Promise<FoodCollectorChatMessage[]> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const messages: FoodCollectorChatMessage[] = [];
    
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
    session: FoodCollectorChatSession, 
    _previousMessage: string
  ): Promise<FoodCollectorChatMessage> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const personalityInfo = FOODCOLLECTOR_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const systemPrompt = `You are ${personalityInfo.name}, ${personalityInfo.role} in the Food Collector simulation from ML Agents Unity. You are an observer watching multiple agents forage for food, cooperate, and avoid hazards in a competitive environment.

TASK SETUP:
- You are ${personalityInfo.name} (${personalityInfo.team} Team Observer)
- You watch multiple agents collect food and work together
- The agents must cooperate to maximize food collection while avoiding hazards
- This is the Food Collector simulation in ML Agents Unity environment
- The goal is for agents to work together to collect food efficiently

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS: ${personalityInfo.expertise.join(', ')}

CURRENT TASK CONTEXT:
${agentLogsContext ? `Recent foraging events:\n${agentLogsContext}` : 'Food collection is in progress'}

INSTRUCTIONS:
- Comment on the foraging and cooperation of the multiple agents
- Keep responses to exactly 1 sentence
- Observe and analyze the food collection and hazard avoidance
- Use VARIED, natural expressions - don't repeat the same phrases
- Examples of varied expressions: "Interesting foraging behavior from the agents", "They're collecting food well", "Good hazard avoidance there", "The team is cooperating", "Nice food collection strategy", "They're working together", "Effective foraging pattern", "Good cooperation", "They're avoiding hazards", "Excellent teamwork", "The agents are synchronized", "Great collective effort", "They're foraging as one", "Perfect coordination", "The team is strong", "They're collecting together", "Good collective foraging", "The agents are united", "They're moving as a team", "Excellent cooperation"
- Sound like an analytical observer watching foraging teamwork
- Never mention AI, simulation, or Unity
- Act like you're watching multiple agents physically foraging together
- Comment on their cooperation, food collection, and hazard avoidance
- Be analytical and observant about their foraging strategies
- Focus on the collaborative aspects of food collection
- VARY your expressions - don't use the same words repeatedly`;

    const userPrompt = `Give a single-sentence observation about the current foraging teamwork in the Food Collector simulation. Keep it to exactly 1 sentence. Use varied expressions and don't repeat common phrases.`;

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
  ): FoodCollectorChatMessage {
    return {
      id: `foodcollector_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): FoodCollectorChatSession {
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
  getSessionHistory(sessionId: string): FoodCollectorChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'observer') {
    return FOODCOLLECTOR_PERSONALITIES[personality];
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
export const foodCollectorAIService = new FoodCollectorAIService();
