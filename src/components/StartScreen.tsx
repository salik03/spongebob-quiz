import React from 'react';
import { useQuizStore } from '../lib/store';
import { Sparkles } from 'lucide-react';

export function StartScreen() {
  const { name, setName } = useQuizStore();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full mx-auto text-center space-y-6 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8" />
          SpongeBob Food Quiz
          <Sparkles className="w-8 h-8" />
        </h1>
        
        <p className="text-lg text-gray-600">
          Find out which SpongeBob character you are based on your food choices!
        </p>
        
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
            required
          />
          
          <button
            onClick={() => useQuizStore.setState({ currentQuestion: 1 })}
            disabled={!name.trim()}
            className="w-full bg-yellow-400 text-blue-900 py-3 px-6 rounded-lg text-xl font-bold hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Start Quiz!
          </button>
        </div>
      </div>
    </div>
  );
}