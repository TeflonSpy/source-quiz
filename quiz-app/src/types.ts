export interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer_index: number;
  explanation: string;
}

export interface ExamData {
  exam: string;
  questions: Question[];
}

export interface QuizState {
  currentExam: string;
  currentQuestion: number;
  answers: number[];
  isComplete: boolean;
}

export interface QuizContextState {
  quizState: QuizState;
  examData: ExamData | null;
  setExam: (examId: string) => void;
  selectAnswer: (questionIndex: number, answerIndex: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  resetQuiz: () => void;
  completeQuiz: () => void;
  saveScore: (username: string) => void;
}

// New interfaces for leaderboard functionality
export interface ScoreEntry {
  id: string;
  username: string;
  examId: string;
  score: number; // Percentage score
  correctAnswers: number;
  totalQuestions: number;
  date: string;
}

export interface LeaderboardState {
  scores: ScoreEntry[];
}

export interface LeaderboardContextState {
  leaderboard: LeaderboardState;
  getScoresByExam: (examId: string) => ScoreEntry[];
  getAllScores: () => ScoreEntry[];
  clearLeaderboard: () => void;
  addScore: (scoreEntry: ScoreEntry) => void;
}