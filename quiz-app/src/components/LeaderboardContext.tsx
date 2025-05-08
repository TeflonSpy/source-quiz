import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { LeaderboardState, LeaderboardContextState, ScoreEntry } from '../types';
import {
  getAllScores as getScoresApi,
  getScoresByExam as getScoresByExamApi,
  addScoreToLeaderboard as addScoreApi,
  clearLeaderboard as clearLeaderboardApi
} from '../utils/leaderboardUtils';

const initialLeaderboardState: LeaderboardState = { scores: [] };

const LeaderboardContext = createContext<LeaderboardContextState>({
  leaderboard: initialLeaderboardState,
  getScoresByExam: () => [],
  getAllScores: () => [],
  clearLeaderboard: () => {},
  addScore: () => {},
});

export const useLeaderboard = () => useContext(LeaderboardContext);

interface LeaderboardProviderProps {
  children: ReactNode;
}

export const LeaderboardProvider: React.FC<LeaderboardProviderProps> = ({ children }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardState>(initialLeaderboardState);

  // Load all scores from API
  const loadAllScores = useCallback(async () => {
    const scores = await getScoresApi();
    setLeaderboard({ scores });
  }, []);

  useEffect(() => {
    loadAllScores();
  }, [loadAllScores]);

  // Add a new score entry to the leaderboard
  const addScore = async (scoreEntry: ScoreEntry) => {
    await addScoreApi(scoreEntry);
    await loadAllScores();
  };

  // Get scores for a specific exam
  const getScoresByExam = (examId: string): ScoreEntry[] => {
    return leaderboard.scores.filter(entry => entry.examId === examId);
  };

  // Get all scores
  const getAllScores = (): ScoreEntry[] => {
    return leaderboard.scores;
  };

  // Clear all leaderboard entries (not implemented)
  const clearLeaderboard = () => {
    // Optionally implement if you add an API endpoint for this
  };

  const value = {
    leaderboard,
    getScoresByExam,
    getAllScores,
    clearLeaderboard,
    addScore,
  };

  return <LeaderboardContext.Provider value={value}>{children}</LeaderboardContext.Provider>;
};