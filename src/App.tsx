import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useQuizStore } from './lib/store';
import { StartScreen } from './components/StartScreen';
import { QuizQuestion } from './components/QuizQuestion';
import { ResultScreen } from './components/ResultScreen';
import { AdminScreen } from './components/AdminScreen';

function Quiz() {
  const { currentQuestion, character } = useQuizStore();

  if (character) {
    return <ResultScreen />;
  }

  if (currentQuestion === 0) {
    return <StartScreen />;
  }

  return <QuizQuestion />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/admin-wedwedqasqas" element={<AdminScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;