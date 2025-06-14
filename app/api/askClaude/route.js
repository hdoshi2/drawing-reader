// app/api/askClaude/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  let question;
  try {
    const body = await req.json(); // Parse the JSON body from the request
    question = body.question;
  } catch (e) {
    console.error("Failed to parse request body:", e);
    return NextResponse.json({ error: 'Invalid JSON in request body.' }, { status: 400 });
  }

  const apiKey = process.env.CLAUDE_API_KEY;

  if (!apiKey) {
    console.error("API key not found. Make sure CLAUDE_API_KEY is set in your .env.local file.");
    return NextResponse.json({ error: 'API key not configured.' }, { status: 500 });
  }

  if (!question || typeof question !== 'string' || question.trim() === '') {
    return NextResponse.json({ error: 'Question is required and must be a non-empty string.' }, { status: 400 });
  }

  const modelName = "claude-3-5-sonnet-20241022"; 
  // claude-3-5-sonnet-20241022 (Latest, most capable)
  // claude-3-5-haiku-20241022 (Faster, cost-effective)
  // claude-3-opus-20240229 (Most powerful, but slower)

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: modelName,
        max_tokens: 4000,
        temperature: 0.1, // Low temperature for consistent structured output
        messages: [
          {
            role: 'user',
            content: question
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Claude API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const text = data.content[0].text;

    return NextResponse.json({ answer: text }, { status: 200 });

  } catch (error) {
    console.error("Error calling Claude API:", error);
    let errorMessage = 'Failed to get response from Claude API.';
    
    if (error.message) {
      if (error.message.includes('authentication') || 
          error.message.includes('401') ||
          error.message.includes('invalid_api_key')) {
        errorMessage = 'Invalid API Key. Please check your CLAUDE_API_KEY in .env.local';
      } else if (error.message.includes('model_not_found') ||
                 error.message.includes('invalid_model') ||
                 error.message.includes('404')) {
        errorMessage = `The Claude model ("${modelName}") was not found or is not accessible. Details: ${error.message}`;
      } else if (error.message.includes('rate_limit') || 
                 error.message.includes('429') ||
                 error.message.includes('quota')) {
        errorMessage = `API rate limit exceeded or quota exhausted. Please try again later. Details: ${error.message}`;
      } else if (error.message.includes('overloaded') ||
                 error.message.includes('503')) {
        errorMessage = `Claude API is temporarily overloaded. Please try again in a moment. Details: ${error.message}`;
      } else {
        errorMessage = `An error occurred: ${error.message}`;
      }
    }
    
    return NextResponse.json({ 
      error: errorMessage, 
      details: error.toString() 
    }, { status: 500 });
  }
}