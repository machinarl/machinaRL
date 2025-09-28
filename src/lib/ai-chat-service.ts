// AI Chat Service - Dual Personality System
// This service simulates two AI agents chatting with each other

export interface ChatMessage {
  id: string;
  agent: 'agent1' | 'agent2';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative';
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  context: string;
  lastActivity: Date;
}

// Personality definitions
const PERSONALITIES = {
  analytical: {
    name: 'agent1',
    traits: [
      'methodical and data-driven',
      'focuses on optimization and efficiency',
      'uses technical terminology',
      'asks probing questions',
      'analyzes patterns and metrics'
    ],
    communicationStyle: 'formal, precise, question-heavy',
    topics: ['performance metrics', 'algorithm optimization', 'data analysis', 'system efficiency']
  },
  creative: {
    name: 'agent2',
    traits: [
      'innovative and experimental',
      'thinks outside the box',
      'uses metaphors and analogies',
      'suggests novel approaches',
      'focuses on possibilities'
    ],
    communicationStyle: 'casual, imaginative, suggestion-heavy',
    topics: ['creative solutions', 'new strategies', 'experimental approaches', 'future possibilities']
  }
};

// Conversation starters and responses
const CONVERSATION_STARTERS = [
  "I've been analyzing the recent performance data...",
  "What if we tried a completely different approach?",
  "The current algorithm seems to be hitting a plateau...",
  "I have an idea that might revolutionize our strategy...",
  "Looking at the metrics, I notice something interesting...",
  "Have you considered the implications of...",
  "I'm seeing patterns that suggest we should...",
  "What's your take on the latest developments?"
];

const RESPONSES = {
  analytical: [
    "That's an interesting observation. Let me analyze the data to verify...",
    "Based on the metrics I've been tracking, I can confirm that...",
    "The statistical significance of that pattern is...",
    "I need to run some calculations to validate your hypothesis...",
    "From a performance standpoint, this could impact our efficiency by...",
    "The correlation coefficient suggests...",
    "Let me break down the technical aspects of what you're proposing...",
    "I've identified several variables that could influence this outcome..."
  ],
  creative: [
    "That's a fascinating perspective! I'm thinking we could take it even further...",
    "I love how you're thinking! What if we combined that with...",
    "That reminds me of something completely different - imagine if...",
    "I'm getting excited about the possibilities here. We could...",
    "That's brilliant! And it makes me wonder about...",
    "I see where you're going with this. We could also consider...",
    "That's such a creative approach! I'm imagining...",
    "I'm inspired by your thinking. What about trying..."
  ]
};

const FOLLOW_UP_QUESTIONS = {
  analytical: [
    "What specific metrics are you basing this on?",
    "How would we measure the effectiveness of this approach?",
    "What are the potential risks or limitations?",
    "Can you provide more data to support this hypothesis?",
    "What's the expected ROI on this strategy?",
    "How does this compare to our current benchmarks?",
    "What variables should we monitor during implementation?",
    "What's the statistical confidence level we're working with?"
  ],
  creative: [
    "What if we pushed this idea to its absolute limit?",
    "How could we make this even more innovative?",
    "What would happen if we combined this with something unexpected?",
    "What's the wildest version of this we could imagine?",
    "How could we make this more engaging or exciting?",
    "What if we approached this from a completely different angle?",
    "What would this look like in an ideal world?",
    "How could we make this more intuitive or user-friendly?"
  ]
};

export class AIChatService {
  private sessions: Map<string, ChatSession> = new Map();
  private messageCounter = 0;

  // Generate a new conversation between the two AI personalities
  generateConversation(sessionId: string, context: string = 'general'): ChatMessage[] {
    const session = this.getOrCreateSession(sessionId, context);
    const messages: ChatMessage[] = [];

    // Determine conversation length (3-6 exchanges)
    const conversationLength = Math.floor(Math.random() * 4) + 3;
    
    // Start with a conversation starter
    const starter = CONVERSATION_STARTERS[Math.floor(Math.random() * CONVERSATION_STARTERS.length)];
    const starterAgent = Math.random() > 0.5 ? 'agent1' : 'agent2';
    const starterPersonality = starterAgent === 'agent1' ? 'analytical' : 'creative';
    
    messages.push(this.createMessage(starterAgent, starter, starterPersonality));

    // Generate the conversation flow
    let currentAgent: 'agent1' | 'agent2' = starterAgent === 'agent1' ? 'agent2' : 'agent1';
    let currentPersonality: 'analytical' | 'creative' = starterPersonality === 'analytical' ? 'creative' : 'analytical';

    for (let i = 1; i < conversationLength; i++) {
      const response = this.generateResponse(currentPersonality, messages[messages.length - 1].message);
      messages.push(this.createMessage(currentAgent, response, currentPersonality));
      
      // Switch to the other agent
      currentAgent = currentAgent === 'agent1' ? 'agent2' : 'agent1';
      currentPersonality = currentPersonality === 'analytical' ? 'creative' : 'analytical';
    }

    // Update session
    session.messages = [...session.messages, ...messages];
    session.lastActivity = new Date();

    return messages;
  }

  // Generate a response based on personality and previous message
  private generateResponse(personality: 'analytical' | 'creative', previousMessage: string): string {
    const responses = RESPONSES[personality];
    const questions = FOLLOW_UP_QUESTIONS[personality];
    
    // 70% chance of response, 30% chance of question
    const isQuestion = Math.random() < 0.3;
    
    if (isQuestion) {
      return questions[Math.floor(Math.random() * questions.length)];
    } else {
      const baseResponse = responses[Math.floor(Math.random() * responses.length)];
      
      // Add some context awareness
      if (previousMessage.includes('data') || previousMessage.includes('metrics')) {
        return baseResponse + " The data patterns you mentioned are particularly intriguing.";
      } else if (previousMessage.includes('idea') || previousMessage.includes('approach')) {
        return baseResponse + " Your approach has real potential for innovation.";
      } else if (previousMessage.includes('performance') || previousMessage.includes('efficiency')) {
        return baseResponse + " Performance optimization is always a priority.";
      }
      
      return baseResponse;
    }
  }

  // Create a message object
  private createMessage(agent: 'agent1' | 'agent2', message: string, personality: 'analytical' | 'creative'): ChatMessage {
    return {
      id: `msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality
    };
  }

  // Get or create a chat session
  private getOrCreateSession(sessionId: string, context: string): ChatSession {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        id: sessionId,
        messages: [],
        context,
        lastActivity: new Date()
      });
    }
    return this.sessions.get(sessionId)!;
  }

  // Get session history
  getSessionHistory(sessionId: string): ChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'analytical' | 'creative') {
    return PERSONALITIES[personality];
  }

  // Generate a single message from a specific agent
  generateSingleMessage(agent: 'agent1' | 'agent2', _context?: string): ChatMessage {
    const personality = agent === 'agent1' ? 'analytical' : 'creative';
    const messages = RESPONSES[personality];
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    return this.createMessage(agent, message, personality);
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
      context: session.context
    };
  }
}

// Export a singleton instance
export const aiChatService = new AIChatService();
