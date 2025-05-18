
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: Difficulty;
  timeLimit: number; // in seconds
}

export interface GameSettings {
  difficulty: Difficulty;
  roundTimeLimit: number; // in seconds
}

export interface Answer {
  questionId: number;
  selectedAnswer: string | null;
  isCorrect: boolean;
  timeSpent: number; // in seconds
}

export interface GameResult {
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  averageTimePerQuestion: number;
  answers: Answer[];
}
