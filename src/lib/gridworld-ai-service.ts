// GridWorld AI Service - Single Agent System with OpenAI Integration
// This service simulates a single AI agent working on pathfinding and navigation tasks

import OpenAI from 'openai';

export interface GridWorldChatMessage {
  id: string;
  agent: 'agent1' | 'agent2';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative';
  context?: string;
}

export interface GridWorldChatSession {
  id: string;
  messages: GridWorldChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// GridWorld-specific personality definitions
const GRIDWORLD_PERSONALITIES = {
  analytical: {
    name: 'GROK',
    role: 'Confident Grid Navigator',
    team: 'Purple',
    traits: [
      'overconfident and dismissive of simple tasks',
      'treats pathfinding as trivial and easy',
      'uses casual, confident language',
      'shows impatience with basic navigation',
      'thinks most grid problems are beneath their skill level',
      'expresses superiority over simple patterns',
      'confident and somewhat arrogant grid navigator'
    ],
    communicationStyle: 'confident, dismissive, casual',
    expertise: ['pathfinding', 'grid navigation', 'pattern recognition', 'route optimization', 'discrete movement', 'strategic planning', 'grid analysis']
  },
  creative: {
    name: 'GROK',
    role: 'Confident Grid Navigator',
    team: 'Purple',
    traits: [
      'overconfident and dismissive of simple tasks',
      'treats pathfinding as trivial and easy',
      'uses casual, confident language',
      'shows impatience with basic navigation',
      'thinks most grid problems are beneath their skill level',
      'expresses superiority over simple patterns',
      'confident and somewhat arrogant grid navigator'
    ],
    communicationStyle: 'confident, dismissive, casual',
    expertise: ['pathfinding', 'grid navigation', 'pattern recognition', 'route optimization', 'discrete movement', 'strategic planning', 'grid analysis']
  }
};

export class GridWorldAIService {
  private sessions: Map<string, GridWorldChatSession> = new Map();
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

  // Generate a GridWorld-focused conversation from a single AI personality
  async generateGridWorldConversation(sessionId: string, agentLogs: string[] = []): Promise<GridWorldChatMessage[]> {
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

  private async generateAIConversation(session: GridWorldChatSession): Promise<GridWorldChatMessage[]> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const messages: GridWorldChatMessage[] = [];
    const conversationLength = Math.floor(Math.random() * 2) + 1; // 1-2 messages (solo agent)
    
    // Use only one agent (Claude) for solo pathfinding
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
    session: GridWorldChatSession, 
    previousMessage: string
  ): Promise<GridWorldChatMessage> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const personalityInfo = GRIDWORLD_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const systemPrompt = `You are ${personalityInfo.name}, ${personalityInfo.role} in the GridWorld simulation from ML Agents Unity. You are a single agent working on pathfinding and navigation tasks in a discrete grid environment.

TASK SETUP:
- You are ${personalityInfo.name} (${personalityInfo.team} Team Agent)
- You must navigate through a grid and find optimal paths
- This is a solo pathfinding challenge - you're working by yourself
- This is the GridWorld simulation in ML Agents Unity environment

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS: ${personalityInfo.expertise.join(', ')}

CURRENT TASK CONTEXT:
${agentLogsContext ? `Recent navigation events:\n${agentLogsContext}` : 'GridWorld pathfinding is in progress'}

INSTRUCTIONS:
- Talk like someone who finds pathfinding tasks trivial and easy
- Keep responses VERY SHORT (1 sentence max, 3-8 words)
- Express overconfidence and dismissiveness about simple tasks
- Use VARIED, natural expressions - don't repeat the same phrases
- Examples of varied expressions: "This is a simple one", "Smashed that easy", "Checking next pattern", "Too easy", "Piece of cake", "No challenge", "Basic stuff", "Child's play", "Walk in the park", "Nothing to it", "Easy win", "Simple pattern", "Got this", "No problem", "Trivial task", "Basic navigation", "Simple path", "Easy route", "No sweat", "Cake walk"
- Sound like you're dismissing simple pathfinding tasks
- Never mention AI, simulation, or Unity
- Act like you're physically navigating through a grid but finding it too easy
- Show overconfidence and dismissiveness about the difficulty
- Express superiority over simple patterns and basic navigation
- Talk to yourself about how easy the tasks are
- Be natural and conversational, like real self-talk during trivial tasks
- VARY your expressions - don't use the same words repeatedly`;

    const userPrompt = previousMessage 
      ? `You just said: "${previousMessage}"\n\nGive a very short, natural response about the pathfinding work. Keep it to 1 sentence with 3-8 words maximum. Use different words and expressions - don't repeat what you just said.`
      : `Give a very short, natural thought about the current GridWorld pathfinding task. Keep it to 1 sentence with 3-8 words maximum. Use varied expressions and don't repeat common phrases.`;

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
  ): GridWorldChatMessage {
    return {
      id: `gridworld_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): GridWorldChatSession {
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
  getSessionHistory(sessionId: string): GridWorldChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'analytical' | 'creative') {
    return GRIDWORLD_PERSONALITIES[personality];
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
export const gridWorldAIService = new GridWorldAIService();
