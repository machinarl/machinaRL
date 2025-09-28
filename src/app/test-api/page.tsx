'use client';

import React, { useState } from 'react';

export default function TestAPIPage() {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const testOpenAI = async () => {
    setIsLoading(true);
    setTestResult('Testing...');
    
    try {
      const response = await fetch('/api/test-openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: apiKey || undefined // Use provided key or undefined to use env var
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setTestResult(`✅ SUCCESS: ${data.message}`);
      } else {
        setTestResult(`❌ ERROR: ${data.error}`);
      }
    } catch (error) {
      setTestResult(`❌ NETWORK ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testSoccerAI = async () => {
    setIsLoading(true);
    setTestResult('Testing Soccer AI Service...');
    
    try {
      const response = await fetch('/api/soccer-ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: 'test_session',
          agentLogs: ['Test log message 1', 'Test log message 2']
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setTestResult(`✅ SOCCER AI SUCCESS: Generated ${data.messages?.length || 0} messages`);
        if (data.messages && data.messages.length > 0) {
          setTestResult(prev => prev + `\n\nSample message: "${data.messages[0].message}"`);
        }
      } else {
        setTestResult(`❌ SOCCER AI ERROR: ${data.error}`);
      }
    } catch (error) {
      setTestResult(`❌ SOCCER AI NETWORK ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-black mb-8 text-center">
            OpenAI API Key Test
          </h1>
          
          <div className="bg-gray-100 border-2 border-[#0066CC] p-6 font-mono">
            <div className="mb-6">
              <label htmlFor="apiKey" className="block text-sm font-bold text-[#0066CC] mb-2">
                API Key (optional - leave empty to use .env.local):
              </label>
              <input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-3 py-2 border border-gray-300 rounded font-mono text-sm"
              />
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={testOpenAI}
                disabled={isLoading}
                className="px-6 py-2 bg-[#0066CC] text-white font-bold hover:bg-[#0066CC]/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Testing...' : 'Test OpenAI API'}
              </button>
              
              <button
                onClick={testSoccerAI}
                disabled={isLoading}
                className="px-6 py-2 bg-[#006600] text-white font-bold hover:bg-[#006600]/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Testing...' : 'Test Soccer AI Service'}
              </button>
            </div>

            <div className="bg-white border border-gray-300 p-4 min-h-[200px]">
              <h3 className="text-sm font-bold text-[#0066CC] mb-2">Test Results:</h3>
              <pre className="text-sm whitespace-pre-wrap font-mono">
                {testResult || 'Click a test button to see results...'}
              </pre>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            <h3 className="font-bold mb-2">Instructions:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Make sure you have OPENAI_API_KEY in your .env.local file</li>
              <li>Or enter your API key in the field above</li>
              <li>Click &quot;Test OpenAI API&quot; to test basic connectivity</li>
              <li>Click &quot;Test Soccer AI Service&quot; to test the full soccer AI service</li>
              <li>Check the results above for any errors</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
