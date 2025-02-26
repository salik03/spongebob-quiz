import React, { useState } from 'react';
import { questions } from '../data/questions';

export function AdminScreen() {
  const [jsonInput, setJsonInput] = useState('');
  const [parsedAnswers, setParsedAnswers] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = () => {
    try {
      const answers = JSON.parse(jsonInput);
      
      // Validate the format
      const isValid = Object.entries(answers).every(([key, value]) => {
        const questionNumber = parseInt(key);
        return (
          !isNaN(questionNumber) &&
          questionNumber >= 1 &&
          questionNumber <= 10 &&
          typeof value === 'string' &&
          ['A', 'B', 'C', 'D'].includes(value as string)
        );
      });

      if (!isValid) {
        throw new Error('Invalid answer format. Please check your JSON structure.');
      }

      setParsedAnswers(answers);
      setError(null);
    } catch (err) {
      setError('Invalid JSON format. Please check your input.');
      setParsedAnswers(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Answer Analysis</h1>
          
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700 font-medium">Input JSON:</span>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 h-48 p-4 font-mono"
                placeholder='{\n  "1": "A",\n  "2": "A",\n  ...\n}'
              />
            </label>

            <button
              onClick={handleAnalyze}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Analyze Answers
            </button>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
          </div>
        </div>

        {parsedAnswers && (
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Answer Details</h2>
            <div className="space-y-6">
              {Object.entries(parsedAnswers).map(([questionNumber, answer]) => {
                const question = questions[parseInt(questionNumber) - 1];
                const chosenAnswer = question.answers[answer as keyof typeof question.answers];
                
                return (
                  <div key={questionNumber} className="border-b pb-4 last:border-b-0">
                    <h3 className="font-semibold text-lg text-gray-800">
                      Question {questionNumber}: {question.question}
                    </h3>
                    <p className="mt-2 text-blue-600">
                      Chosen Answer ({answer}): {chosenAnswer}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}