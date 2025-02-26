import React from 'react';
import { useQuizStore, Answer } from '../lib/store';
import { questions } from '../data/questions';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function QuizQuestion() {
  const { currentQuestion, answers, setAnswer, nextQuestion, previousQuestion } = useQuizStore();
  const question = questions[currentQuestion - 1];
  
  const handleAnswer = (answer: Answer) => {
    setAnswer(currentQuestion, answer);
    if (currentQuestion < 10) {
      nextQuestion();
    } else {
      useQuizStore.getState().determineCharacter();
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full mx-auto space-y-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentQuestion / 10) * 100}%` }}
          />
        </div>
        
        <div className="text-center">
          <p className="text-blue-600 font-medium">Question {currentQuestion} of 10</p>
          <h2 className="text-2xl font-bold mt-2">{question.question}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(question.answers).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleAnswer(key as Answer)}
              className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 text-left"
            >
              <span className="text-lg">{value}</span>
            </button>
          ))}
        </div>
        
        <div className="flex justify-between mt-6">
          {currentQuestion > 1 && (
            <button
              onClick={previousQuestion}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft /> Previous
            </button>
          )}
          <div className="flex-1" />
          {answers[currentQuestion] && currentQuestion < 10 && (
            <button
              onClick={nextQuestion}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              Next <ArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}