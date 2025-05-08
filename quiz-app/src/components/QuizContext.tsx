import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ExamData, QuizState, QuizContextState, ScoreEntry } from '../types';
import { addScoreToLeaderboard } from '../utils/leaderboardUtils';
import { v4 as uuidv4 } from 'uuid';
import ai900Data from '../data/ai900.json';
import az104Data from '../data/az104.json';
import az204Data from '../data/az204.json';
import az305Data from '../data/az305.json';
import az400Data from '../data/az400.json';
import dp900Data from '../data/dp900.json';
import az900Data from '../data/az900.json';

// Initial quiz state
const initialQuizState: QuizState = {
  currentExam: '',
  currentQuestion: 0,
  answers: [],
  isComplete: false,
};

// Create context with initial state
const QuizContext = createContext<QuizContextState>({
  quizState: initialQuizState,
  examData: null,
  setExam: () => {},
  selectAnswer: () => {},
  nextQuestion: () => {},
  previousQuestion: () => {},
  resetQuiz: () => {},
  completeQuiz: () => {},
  saveScore: () => {},
});

// Custom hook to use quiz context
export const useQuiz = () => useContext(QuizContext);

// Maximum number of questions per quiz
const MAX_QUESTIONS = 50;
const DEFAULT_QUESTION_COUNT = 50;

interface QuizProviderProps {
  children: ReactNode;
}

// Helper function to shuffle and limit questions
const getRandomQuestions = (questions: any[], count: number) => {
  // Create a copy of the questions array
  const shuffled = [...questions];
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Take the first 'count' questions or all if there are fewer
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [quizState, setQuizState] = useState<QuizState>(initialQuizState);
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(DEFAULT_QUESTION_COUNT);

  // Load exam data when exam changes or questionCount changes
  useEffect(() => {
    if (!quizState.currentExam) return;
    
    // Get the full exam data
    let fullExamData;
    switch (quizState.currentExam) {
      case 'AI-900':
        fullExamData = ai900Data as ExamData;
        break;
      case 'AZ-104':
        fullExamData = az104Data as ExamData;
        break;
      case 'AZ-204':
        fullExamData = az204Data as ExamData;
        break;
      case 'AZ-305':
        fullExamData = az305Data as ExamData;
        break;
      case 'AZ-400':
        fullExamData = az400Data as ExamData;
        break;
      case 'DP-900':
        fullExamData = dp900Data as ExamData;
        break;
      case 'AZ-900':
        fullExamData = az900Data as ExamData;
        break;
      default:
        return;
    }
    
    // Select random questions
    const randomQuestions = getRandomQuestions(fullExamData.questions, questionCount);
    
    // Create new exam data with random questions
    const limitedExamData: ExamData = {
      exam: fullExamData.exam,
      questions: randomQuestions,
    };
    
    setExamData(limitedExamData);
    
    // Initialize answers array with -1 (unanswered) for each question
    setQuizState(prev => ({
      ...prev,
      answers: Array(randomQuestions.length).fill(-1),
    }));
  }, [quizState.currentExam, questionCount]);

  // Set the current exam
  const setExam = (examId: string) => {
    setQuizState({
      currentExam: examId,
      currentQuestion: 0,
      answers: [],
      isComplete: false,
    });
  };

  // Select an answer for the current question
  const selectAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizState.answers];
    newAnswers[questionIndex] = answerIndex;
    
    setQuizState(prev => ({
      ...prev,
      answers: newAnswers,
    }));
  };

  // Navigate to the next question
  const nextQuestion = () => {
    if (examData && quizState.currentQuestion < examData.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    }
  };

  // Navigate to the previous question
  const previousQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
    }
  };

  // Reset the quiz
  const resetQuiz = () => {
    setQuizState({
      ...initialQuizState,
      currentExam: quizState.currentExam,
    });
  };

  // Complete the quiz and show results
  const completeQuiz = () => {
    setQuizState(prev => ({
      ...prev,
      isComplete: true,
    }));
  };
  
  // Calculate user's score
  const calculateScore = () => {
    if (!examData) return { correct: 0, total: 0, percentage: 0 };
    
    let correctAnswers = 0;
    quizState.answers.forEach((answer, index) => {
      if (answer === examData.questions[index].correct_answer_index) {
        correctAnswers++;
      }
    });
    
    return {
      correct: correctAnswers,
      total: examData.questions.length,
      percentage: Math.round((correctAnswers / examData.questions.length) * 100)
    };
  };
  
  // Save score to leaderboard
  const saveScore = (username: string) => {
    if (!examData || !username.trim()) return;
    
    const score = calculateScore();
    const scoreEntry: ScoreEntry = {
      id: uuidv4(),
      username: username.trim(),
      examId: quizState.currentExam,
      score: score.percentage,
      correctAnswers: score.correct,
      totalQuestions: score.total,
      date: new Date().toISOString()
    };
    
    addScoreToLeaderboard(scoreEntry);
  };

  const value = {
    quizState,
    examData,
    setExam,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    resetQuiz,
    completeQuiz,
    saveScore,
    questionCount,
    setQuestionCount,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};