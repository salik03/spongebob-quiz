import { create } from 'zustand';

export type Answer = 'A' | 'B' | 'C' | 'D';
export type Character = 'SpongeBob' | 'Squidward' | 'Patrick' | 'Sandy';

interface QuizState {
  name: string;
  currentQuestion: number;
  answers: Record<number, Answer>;
  character: Character | null;
  setName: (name: string) => void;
  setAnswer: (questionNumber: number, answer: Answer) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  determineCharacter: () => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  name: '',
  currentQuestion: 0,
  answers: {},
  character: null,
  
  setName: (name) => set({ name }),
  
  setAnswer: (questionNumber, answer) => 
    set((state) => ({
      answers: { ...state.answers, [questionNumber]: answer }
    })),
  
  nextQuestion: () => 
    set((state) => ({
      currentQuestion: Math.min(state.currentQuestion + 1, 10)
    })),
  
  previousQuestion: () => 
    set((state) => ({
      currentQuestion: Math.max(state.currentQuestion - 1, 0)
    })),
  
  determineCharacter: () => {
    const { answers } = get();
    const counts = {
      A: 0, B: 0, C: 0, D: 0
    };
    
    Object.values(answers).forEach((answer) => {
      counts[answer]++;
    });
    
    const maxCount = Math.max(...Object.values(counts));
    const characters: Character[] = ['SpongeBob', 'Squidward', 'Patrick', 'Sandy'];
    const possibleCharacters = Object.entries(counts)
      .filter(([_, count]) => count === maxCount)
      .map(([answer]) => {
        switch(answer) {
          case 'A': return 'SpongeBob';
          case 'B': return 'Squidward';
          case 'C': return 'Patrick';
          case 'D': return 'Sandy';
        }
      }) as Character[];
    
    const character = possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)];
    set({ character });
  },
  
  reset: () => set({
    name: '',
    currentQuestion: 0,
    answers: {},
    character: null
  })
}));