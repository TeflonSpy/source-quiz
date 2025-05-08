import { ScoreEntry } from '../types';

const API_URL = '/leaderboard';

export const addScoreToLeaderboard = async (scoreEntry: ScoreEntry): Promise<void> => {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: scoreEntry.username,
      score: scoreEntry.score,
      exam: scoreEntry.examId,
    }),
  });
};

export const getAllScores = async (): Promise<ScoreEntry[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((item: any) => ({
    id: item.id || `${item.name}-${item.exam}-${item.created_at}`,
    username: item.name,
    examId: item.exam,
    score: item.score,
    correctAnswers: item.correctAnswers ?? 0,
    totalQuestions: item.totalQuestions ?? 0,
    date: item.created_at,
  }));
};

export const getScoresByExam = async (examId: string): Promise<ScoreEntry[]> => {
  const res = await fetch(`${API_URL}?exam=${encodeURIComponent(examId)}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((item: any) => ({
    id: item.id || `${item.name}-${item.exam}-${item.created_at}`,
    username: item.name,
    examId: item.exam,
    score: item.score,
    correctAnswers: item.correctAnswers ?? 0,
    totalQuestions: item.totalQuestions ?? 0,
    date: item.created_at,
  }));
};

export const clearLeaderboard = async (): Promise<void> => {
  // Not implemented: No API endpoint for clearing leaderboard
};