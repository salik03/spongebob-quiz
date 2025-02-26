import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useQuizStore } from '../lib/store';
import { characterInfo } from '../data/questions';
import { supabase } from '../lib/supabase';
import { Sparkles, RefreshCw } from 'lucide-react';

export function ResultScreen() {
  const { name, character, answers, reset } = useQuizStore();

  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Save results to Supabase
    const saveResults = async () => {
      if (!character || !name) return;

      const { error } = await supabase
        .from('quiz_results')
        .insert([
          {
            name,
            answers,
            character,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Error saving results:', error);
      }
    };

    saveResults();
  }, []);

  if (!character) return null;

  const characterData = characterInfo[character];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full mx-auto text-center space-y-6">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <h1 className="text-3xl font-bold text-blue-600">Your Result</h1>
          <Sparkles className="w-8 h-8 text-yellow-400" />
        </div>

        <h2 className="text-2xl font-bold">
          {name}, you are {character}!
        </h2>

        <div className="relative rounded-lg overflow-hidden">
          <img
            src={characterData.image}
            alt={character}
            className="w-full h-64 object-cover"
          />
        </div>

        <p className="text-lg text-gray-700">
          {characterData.description}
        </p>

        <button
          onClick={reset}
          className="flex items-center justify-center gap-2 mx-auto bg-yellow-400 text-blue-900 py-3 px-6 rounded-lg text-xl font-bold hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          <RefreshCw className="w-5 h-5" />
          Take Quiz Again
        </button>
      </div>
    </div>
  );
}