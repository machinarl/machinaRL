import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apiKey } = body;

    // Use provided API key or fall back to environment variable
    const openaiApiKey = apiKey || process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      return NextResponse.json({
        success: false,
        error: 'No API key provided. Please add OPENAI_API_KEY to .env.local or provide it in the request.'
      }, { status: 400 });
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });

    // Test with a simple completion
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are a helpful assistant. Respond with exactly: 'API key is working correctly!'" 
        },
        { 
          role: "user", 
          content: "Test message" 
        }
      ],
      max_tokens: 20,
      temperature: 0,
    });

    const response = completion.choices[0]?.message?.content?.trim();

    if (!response) {
      return NextResponse.json({
        success: false,
        error: 'OpenAI returned empty response'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `OpenAI API is working! Response: "${response}"`,
      model: completion.model,
      usage: completion.usage
    });

  } catch (error) {
    console.error('OpenAI API test error:', error);
    
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    // Handle specific OpenAI errors
    if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
      errorMessage = 'Invalid API key. Please check your OPENAI_API_KEY.';
    } else if (errorMessage.includes('429')) {
      errorMessage = 'Rate limit exceeded. Please try again later.';
    } else if (errorMessage.includes('insufficient_quota')) {
      errorMessage = 'API key has insufficient quota. Please add credits to your OpenAI account.';
    }

    return NextResponse.json({
      success: false,
      error: `OpenAI API Error: ${errorMessage}`
    }, { status: 500 });
  }
}
