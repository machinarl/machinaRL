// Pyramids AI Service - Single Agent System with OpenAI Integration
// This service simulates a single AI agent navigating through pyramid mazes and solving puzzles

import OpenAI from 'openai';

export interface PyramidsChatMessage {
  id: string;
  agent: 'agent1' | 'agent2';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative';
  context?: string;
}

export interface PyramidsChatSession {
  id: string;
  messages: PyramidsChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// Pyramids-specific personality definitions
const PYRAMIDS_PERSONALITIES = {
  analytical: {
    name: 'Claude',
    role: 'Maze Navigator',
    team: 'Blue',
    traits: [
      'methodical and strategic maze navigator',
      'focuses on key collection and door puzzle solving',
      'uses technical navigation terminology',
      'analyzes maze structure and optimal paths',
      'calculates key sequences and door opening strategies',
      'thinks in terms of puzzle solving and navigation',
      'strategic and persistent explorer'
    ],
    communicationStyle: 'focused, analytical, determined',
    expertise: ['maze navigation', 'key collection', 'puzzle solving', 'path planning', 'memory mapping', 'door sequencing', 'pyramid exploration']
  },
  creative: {
    name: 'GROK',
    role: 'Creative Explorer',
    team: 'Purple',
    traits: [
      'innovative and experimental maze explorer',
      'thinks outside the box for navigation solutions',
      'uses creative exploration metaphors',
      'suggests novel puzzle-solving approaches',
      'focuses on creative pathfinding possibilities',
      'thinks in terms of exploration and discovery',
      'bold and adventurous navigator'
    ],
    communicationStyle: 'expressive, imaginative, adventurous',
    expertise: ['creative navigation', 'exploration techniques', 'puzzle innovation', 'adventurous pathfinding', 'discovery strategies', 'creative problem solving', 'exploratory thinking']
  }
};

export class PyramidsAIService {
  private sessions: Map<string, PyramidsChatSession> = new Map();
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

  // Generate a Pyramids-focused conversation from a single AI personality
  async generatePyramidsConversation(sessionId: string, agentLogs: string[] = []): Promise<PyramidsChatMessage[]> {
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

  private async generateAIConversation(session: PyramidsChatSession): Promise<PyramidsChatMessage[]> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const messages: PyramidsChatMessage[] = [];
    const conversationLength = Math.floor(Math.random() * 2) + 1; // 1-2 messages (solo agent)
    
    // Use only one agent (Claude) for solo maze navigation
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
    session: PyramidsChatSession, 
    previousMessage: string
  ): Promise<PyramidsChatMessage> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const personalityInfo = PYRAMIDS_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const systemPrompt = `You are ${personalityInfo.name}, ${personalityInfo.role} in the Pyramids simulation from ML Agents Unity. You are a single agent navigating through 3D pyramid mazes, collecting keys, and solving door puzzles.

TASK SETUP:
- You are ${personalityInfo.name} (${personalityInfo.team} Team Agent)
- You must navigate through pyramid mazes and solve key/door puzzles
- This is a solo exploration challenge - you're working by yourself
- This is the Pyramids simulation in ML Agents Unity environment

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS: ${personalityInfo.expertise.join(', ')}

CURRENT TASK CONTEXT:
${agentLogsContext ? `Recent exploration events:\n${agentLogsContext}` : 'Pyramid exploration is in progress'}

INSTRUCTIONS:
- Talk like someone exploring and solving puzzles in a maze
- Keep responses VERY SHORT (1 sentence max, 3-8 words)
- Express curiosity, determination, and puzzle-solving focus
- Use VARIED, natural expressions - don't repeat the same phrases
- Examples of varied expressions: "I need a key", "Where's the door", "This maze is tricky", "Found another key", "Almost solved it", "Need to remember", "Which way now", "Got the key", "Door is locked", "Found the path", "This is complex", "Keep exploring", "Need to think", "Found the exit", "Keys collected", "Door unlocked", "Maze solved", "Path remembered", "Puzzle complete", "Navigation success"
- Sound like you're actually exploring a pyramid maze
- Never mention AI, simulation, or Unity
- Act like you're physically navigating through a 3D maze
- Show curiosity and determination in puzzle solving
- Express your focus on key collection and door opening
- Talk to yourself about navigation and puzzle progress
- Be natural and conversational, like real self-talk during exploration
- VARY your expressions - don't use the same words repeatedly`;

    const userPrompt = previousMessage 
      ? `You just said: "${previousMessage}"\n\nGive a very short, natural response about the maze exploration. Keep it to 1 sentence with 3-8 words maximum. Use different words and expressions - don't repeat what you just said.`
      : `Give a very short, natural thought about the current pyramid maze exploration. Keep it to 1 sentence with 3-8 words maximum. Use varied expressions and don't repeat common phrases.`;

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
  ): PyramidsChatMessage {
    return {
      id: `pyramids_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): PyramidsChatSession {
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
  getSessionHistory(sessionId: string): PyramidsChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'analytical' | 'creative') {
    return PYRAMIDS_PERSONALITIES[personality];
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
export const pyramidsAIService = new PyramidsAIService();
