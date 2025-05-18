import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GameSettings, 
  Difficulty, 
  Question, 
  Answer,
  GameResult 
} from '../types/triviaTypes';
import { createQuestionSet } from '../data/questionBank';

interface TriviaContextType {
  gameSettings: GameSettings;
  currentQuestion: number;
  questions: Question[];
  answers: Answer[];
  gameResult: GameResult | null;
  startGame: (difficulty: Difficulty) => void;
  answerQuestion: (answer: string | null, timeSpent: number) => void;
  nextQuestion: () => void;
  endGame: () => void;
  resetGame: () => void;
  getCurrentQuestion: () => Question | undefined;
  getTimeLimit: () => number;
  isLastQuestion: () => boolean;
}

const defaultGameSettings: GameSettings = {
  difficulty: 'easy',
  roundTimeLimit: 15,
};

const TriviaContext = createContext<TriviaContextType | undefined>(undefined);

export const useTriviaContext = () => {
  const context = useContext(TriviaContext);
  if (!context) {
    throw new Error('useTriviaContext must be used within a TriviaProvider');
  }
  return context;
};

export const TriviaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [gameSettings, setGameSettings] = useState<GameSettings>(defaultGameSettings);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [gameResult, setGameResult] = useState<GameResult | null>(() => {
    // Try to load game result from localStorage on initial render
    const savedResult = localStorage.getItem('gameResult');
    return savedResult ? JSON.parse(savedResult) : null;
  });

  // Save game result to localStorage whenever it changes
  useEffect(() => {
    if (gameResult) {
      localStorage.setItem('gameResult', JSON.stringify(gameResult));
    } else {
      localStorage.removeItem('gameResult');
    }
  }, [gameResult]);

  const startGame = (difficulty: Difficulty) => {
    // Get questions based on difficulty
    const questionSet = createQuestionSet(difficulty);
    
    // Set game settings based on difficulty
    const timeLimitMap = {
      'easy': 15,
      'medium': 10,
      'hard': 8
    };
    
    setGameSettings({
      difficulty,
      roundTimeLimit: timeLimitMap[difficulty],
    });
    
    setQuestions(questionSet);
    setCurrentQuestion(0);
    setAnswers([]);
    setGameResult(null);
    
    navigate('/game');
  };

  const answerQuestion = (selectedAnswer: string | null, timeSpent: number) => {
    const question = questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    const answer: Answer = {
      questionId: question.id,
      selectedAnswer,
      isCorrect,
      timeSpent,
    };
    
    setAnswers(prev => [...prev, answer]);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    // Ensure we have all answers
    if (answers.length !== questions.length) {
      console.warn('Missing answers, adding skipped answers for remaining questions');
      const remainingAnswers = questions.slice(answers.length).map(question => ({
        questionId: question.id,
        selectedAnswer: null,
        isCorrect: false,
        timeSpent: question.timeLimit
      }));
      setAnswers(prev => [...prev, ...remainingAnswers]);
    }

    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    const totalQuestions = questions.length;
    const accuracy = (correctAnswers / totalQuestions) * 100;
    const totalTimeSpent = answers.reduce((total, answer) => total + answer.timeSpent, 0);
    const averageTimePerQuestion = totalTimeSpent / totalQuestions;
    
    const result: GameResult = {
      totalQuestions,
      correctAnswers,
      accuracy,
      averageTimePerQuestion,
      answers,
    };
    
    setGameResult(result);
    navigate('/results');
  };

  const resetGame = () => {
    setGameSettings(defaultGameSettings);
    setQuestions([]);
    setCurrentQuestion(0);
    setAnswers([]);
    setGameResult(null);
    localStorage.removeItem('gameResult'); // Clear localStorage when resetting
    navigate('/select');
  };

  const getCurrentQuestion = () => {
    return questions[currentQuestion];
  };

  const getTimeLimit = () => {
    const question = questions[currentQuestion];
    return question ? question.timeLimit : gameSettings.roundTimeLimit;
  };

  const isLastQuestion = () => {
    return currentQuestion === questions.length - 1;
  };

  const value: TriviaContextType = {
    gameSettings,
    currentQuestion,
    questions,
    answers,
    gameResult,
    startGame,
    answerQuestion,
    nextQuestion,
    endGame,
    resetGame,
    getCurrentQuestion,
    getTimeLimit,
    isLastQuestion,
  };

  return <TriviaContext.Provider value={value}>{children}</TriviaContext.Provider>;
};
