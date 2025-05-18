
import { Question, Difficulty } from '../types/triviaTypes';

// Sample trivia questions with varying difficulties
export const questions: Question[] = [
  // Easy Questions
  {
    id: 1,
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctAnswer: 'Mars',
    difficulty: 'easy',
    timeLimit: 15
  },
  {
    id: 2,
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 'Paris',
    difficulty: 'easy',
    timeLimit: 15
  },
  {
    id: 3,
    question: 'How many sides does a triangle have?',
    options: ['Three', 'Four', 'Five', 'Six'],
    correctAnswer: 'Three',
    difficulty: 'easy',
    timeLimit: 15
  },
  {
    id: 4,
    question: 'Which of these is a primary color?',
    options: ['Green', 'Orange', 'Purple', 'Blue'],
    correctAnswer: 'Blue',
    difficulty: 'easy',
    timeLimit: 15
  },
  {
    id: 5,
    question: 'What is the main ingredient in guacamole?',
    options: ['Tomato', 'Avocado', 'Onion', 'Lemon'],
    correctAnswer: 'Avocado',
    difficulty: 'easy',
    timeLimit: 15
  },
  
  // Medium Questions
  {
    id: 6,
    question: 'Which element has the chemical symbol "Au"?',
    options: ['Silver', 'Gold', 'Aluminum', 'Argon'],
    correctAnswer: 'Gold',
    difficulty: 'medium',
    timeLimit: 10
  },
  {
    id: 7,
    question: 'Which country is home to the Great Barrier Reef?',
    options: ['Brazil', 'Thailand', 'Australia', 'Mexico'],
    correctAnswer: 'Australia',
    difficulty: 'medium',
    timeLimit: 10
  },
  {
    id: 8,
    question: 'In which year did the Titanic sink?',
    options: ['1905', '1912', '1920', '1931'],
    correctAnswer: '1912',
    difficulty: 'medium',
    timeLimit: 10
  },
  {
    id: 9,
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
    correctAnswer: 'William Shakespeare',
    difficulty: 'medium',
    timeLimit: 10
  },
  {
    id: 10,
    question: 'What is the largest organ in the human body?',
    options: ['Brain', 'Liver', 'Skin', 'Heart'],
    correctAnswer: 'Skin',
    difficulty: 'medium',
    timeLimit: 10
  },
  
  // Hard Questions
  {
    id: 11,
    question: 'What is the smallest prime number greater than 100?',
    options: ['101', '103', '107', '109'],
    correctAnswer: '101',
    difficulty: 'hard',
    timeLimit: 8
  },
  {
    id: 12,
    question: 'Who was the first woman to win a Nobel Prize?',
    options: ['Marie Curie', 'Rosalind Franklin', 'Dorothy Hodgkin', 'Ada Lovelace'],
    correctAnswer: 'Marie Curie',
    difficulty: 'hard',
    timeLimit: 8
  },
  {
    id: 13,
    question: 'Which of these elements has the highest atomic number?',
    options: ['Uranium', 'Plutonium', 'Osmium', 'Ruthenium'],
    correctAnswer: 'Plutonium',
    difficulty: 'hard',
    timeLimit: 8
  },
  {
    id: 14,
    question: 'Who developed the theory of general relativity?',
    options: ['Isaac Newton', 'Niels Bohr', 'Albert Einstein', 'Stephen Hawking'],
    correctAnswer: 'Albert Einstein',
    difficulty: 'hard',
    timeLimit: 8
  },
  {
    id: 15,
    question: 'In what year was the World Wide Web invented?',
    options: ['1989', '1991', '1994', '1997'],
    correctAnswer: '1989',
    difficulty: 'hard',
    timeLimit: 8
  }
];

export const getQuestionsByDifficulty = (difficulty: Difficulty): Question[] => {
  return questions.filter(q => q.difficulty === difficulty);
};

export const createQuestionSet = (difficulty: Difficulty): Question[] => {
  const easy = getQuestionsByDifficulty('easy');
  const medium = getQuestionsByDifficulty('medium');
  const hard = getQuestionsByDifficulty('hard');
  
  let questionSet: Question[] = [];
  
  switch (difficulty) {
    case 'easy':
      // 6 easy, 3 medium, 1 hard
      questionSet = [
        ...shuffleArray(easy).slice(0, 6),
        ...shuffleArray(medium).slice(0, 3),
        ...shuffleArray(hard).slice(0, 1)
      ];
      break;
    case 'medium':
      // 3 easy, 5 medium, 2 hard
      questionSet = [
        ...shuffleArray(easy).slice(0, 3),
        ...shuffleArray(medium).slice(0, 5),
        ...shuffleArray(hard).slice(0, 2)
      ];
      break;
    case 'hard':
      // 1 easy, 4 medium, 5 hard
      questionSet = [
        ...shuffleArray(easy).slice(0, 1),
        ...shuffleArray(medium).slice(0, 4),
        ...shuffleArray(hard).slice(0, 5)
      ];
      break;
  }
  
  return shuffleArray(questionSet);
};

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
