// app/api/askGemini/route.js
import { GoogleGenAI } from "@google/genai";
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

  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  if (!apiKey) {
    console.error("API key not found. Make sure GEMINI_API_KEY is set in your .env.local file.");
    return NextResponse.json({ error: 'API key not configured.' }, { status: 500 });
  }

  if (!question || typeof question !== 'string' || question.trim() === '') {
    return NextResponse.json({ error: 'Question is required and must be a non-empty string.' }, { status: 400 });
  }

  const modelName = "gemini-1.5-flash-latest"; // Or "gemini-pro", or "gemini-2.0-flash", or "gemini-1.5-pro", or "gemini-1.5-flash-latest"

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: question,
    });
    const text = response.text;

    return NextResponse.json({ answer: text }, { status: 200 });

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    let errorMessage = 'Failed to get response from Gemini API.';
    if (error.message) {
        if (error.message.includes('API_KEY_INVALID') ||
            error.message.toLowerCase().includes('api key not valid')) {
            errorMessage = 'Invalid API Key. Please check your GEMINI_API_KEY in .env.local';
        } else if (error.message.includes('Fetching model') ||
                   error.message.includes('MODEL_NAME_INVALID') ||
                   error.message.toLowerCase().includes('model not found')) {
            errorMessage = `The AI model ("${modelName}") was not found or is not accessible with your API key. Try "gemini-pro" or check available models. Details: ${error.message}`;
        } else if (error.message.includes('RESOURCE_EXHAUSTED') || error.message.includes('rate limit')) {
            errorMessage = `API rate limit exceeded or resource exhausted. Please try again later. Details: ${error.message}`;
        } else {
            errorMessage = `An error occurred: ${error.message}`;
        }
    }
    return NextResponse.json({ error: errorMessage, details: error.toString() }, { status: 500 });
  }
}
