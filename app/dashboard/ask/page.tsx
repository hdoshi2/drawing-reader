"use client";

import { useState, ChangeEvent, MouseEvent } from 'react';
import { Button } from '../../../components/ui/button';
import { Loader2, Bot, Brain, Zap } from "lucide-react"

// AI Provider type
type AIProvider = 'gemini' | 'claude';

// Optional: Define interfaces for better type safety with API responses
interface AISuccessResponse {
  answer: string;
}

interface AIErrorResponse {
  error: string;
  details?: string;
}

export default function AskPage(): JSX.Element {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('claude'); // Default to Claude (recommended)

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setQuestion(event.target.value);
  };

  const handleProviderChange = (provider: AIProvider): void => {
    setSelectedProvider(provider);
    // Clear previous results when switching providers
    setAnswer('');
    setError(null);
  };

  const getApiEndpoint = (provider: AIProvider): string => {
    return provider === 'claude' ? '/api/askClaude' : '/api/askGemini';
  };

  const getProviderDisplayName = (provider: AIProvider): string => {
    return provider === 'claude' ? 'Claude' : 'Gemini';
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();
    if (!question.trim()) {
      setError('Please enter a question.');
      return;
    }

    setIsLoading(true);
    setAnswer('');
    setError(null);

    const apiEndpoint = getApiEndpoint(selectedProvider);
    const providerName = getProviderDisplayName(selectedProvider);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        // Attempt to get more info if response is not OK
        const contentType = response.headers.get("content-type");
        let errorMessage = `${providerName} API request failed with status ${response.status} ${response.statusText}`;

        if (contentType && contentType.includes("application/json")) {
          // If the server *did* send JSON with an error
          const errorData: AIErrorResponse = await response.json();
          errorMessage = errorData.error || errorMessage;
          if (errorData.details) {
            errorMessage += ` Details: ${errorData.details}`;
          }
        } else {
          // If the response is not JSON (e.g., HTML error page)
          const textError = await response.text();
          console.error(`Non-JSON error response from ${providerName} server:`, textError);
          errorMessage += `. The server returned a non-JSON response. Check server logs. Preview: ${textError.substring(0, 200)}...`;
        }
        throw new Error(errorMessage);
      }

      // If response.ok is true, we expect JSON
      const data: AISuccessResponse = await response.json();
      setAnswer(data.answer);

    } catch (err: any) {
      console.error(`Error submitting question to ${providerName} or parsing response:`, err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Check the console.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='px-4 py-6 max-w-3xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>Ask AI Assistant</h1>
        <p className='text-gray-600'>Choose between Claude or Gemini AI to answer your questions</p>
      </div>

      {/* AI Provider Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Choose AI Provider:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Claude Option */}
          <button
            onClick={() => handleProviderChange('claude')}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedProvider === 'claude'
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            disabled={isLoading}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${selectedProvider === 'claude' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <Brain className={`h-5 w-5 ${selectedProvider === 'claude' ? 'text-blue-600' : 'text-gray-600'}`} />
              </div>
              <div>
                <h3 className={`font-semibold ${selectedProvider === 'claude' ? 'text-blue-900' : 'text-gray-900'}`}>
                  Claude 3.5 Sonnet
                </h3>
                <span className="inline-flex px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                  Recommended
                </span>
              </div>
            </div>
            <p className={`text-sm ${selectedProvider === 'claude' ? 'text-blue-700' : 'text-gray-600'}`}>
              Superior reasoning, better instruction-following, more detailed responses. Ideal for complex questions and technical analysis.
            </p>
          </button>

          {/* Gemini Option */}
          <button
            onClick={() => handleProviderChange('gemini')}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedProvider === 'gemini'
                ? 'border-orange-500 bg-orange-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            disabled={isLoading}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${selectedProvider === 'gemini' ? 'bg-orange-100' : 'bg-gray-100'}`}>
                <Zap className={`h-5 w-5 ${selectedProvider === 'gemini' ? 'text-orange-600' : 'text-gray-600'}`} />
              </div>
              <div>
                <h3 className={`font-semibold ${selectedProvider === 'gemini' ? 'text-orange-900' : 'text-gray-900'}`}>
                  Gemini 1.5 Flash
                </h3>
                <span className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                  Fast & Cost-Effective
                </span>
              </div>
            </div>
            <p className={`text-sm ${selectedProvider === 'gemini' ? 'text-orange-700' : 'text-gray-600'}`}>
              Quick responses, good for general questions and high-volume usage. More cost-effective for simple queries.
            </p>
          </button>
        </div>
      </div>

      {/* Question Input */}
      <div className="mb-6">
        <label htmlFor="ai-question" className="block text-sm font-medium text-gray-700 mb-1">
          Your Question:
        </label>
        <textarea
          id="ai-question"
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={question}
          onChange={handleInputChange}
          placeholder={`Ask ${getProviderDisplayName(selectedProvider)} anything...`}
          disabled={isLoading}
        />
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={isLoading || !question.trim()}
        className={`w-full sm:w-auto ${
          selectedProvider === 'claude' 
            ? 'bg-blue-600 hover:bg-blue-700' 
            : 'bg-orange-600 hover:bg-orange-700'
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Asking {getProviderDisplayName(selectedProvider)}...
          </>
        ) : (
          <>
            <Bot className="mr-2 h-4 w-4" />
            Ask {getProviderDisplayName(selectedProvider)}
          </>
        )}
      </Button>

      {/* Error Display */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          <div className="flex items-start gap-2">
            <div className="p-1">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-semibold">Error from {getProviderDisplayName(selectedProvider)}:</p>
              <p className="whitespace-pre-wrap mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Answer Display */}
      {answer && (
        <div className={`mt-6 p-6 rounded-lg shadow-sm border ${
          selectedProvider === 'claude' 
            ? 'bg-blue-50 border-blue-200' 
            : 'bg-orange-50 border-orange-200'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            {selectedProvider === 'claude' ? (
              <Brain className="h-5 w-5 text-blue-600" />
            ) : (
              <Zap className="h-5 w-5 text-orange-600" />
            )}
            <h3 className={`text-lg font-semibold ${
              selectedProvider === 'claude' ? 'text-blue-800' : 'text-orange-800'
            }`}>
              {getProviderDisplayName(selectedProvider)}'s Answer:
            </h3>
          </div>
          <div className={`p-4 bg-white rounded-md border ${
            selectedProvider === 'claude' ? 'border-blue-100' : 'border-orange-100'
          }`}>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{answer}</p>
          </div>
        </div>
      )}

      {/* Provider Comparison Info */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-2">💡 Which AI should I choose?</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Claude:</strong> Best for complex reasoning, technical questions, detailed analysis, and construction/engineering topics.</p>
          <p><strong>Gemini:</strong> Good for quick questions, general knowledge, brainstorming, and when you need faster responses.</p>
        </div>
      </div>
    </section>
  );
}