import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { LeaderboardState, LeaderboardContextState, ScoreEntry } from '../types';
import { 
  initialLeaderboardState, 
  LEADERBOARD_STORAGE_KEY, 
  getAllScores as getScoresUtil,
  getScoresByExam as getScoresByExamUtil,
  clearLeaderboard as clearLeaderboardUtil,
  addScoreToLeaderboard
} from '../utils/leaderboardUtils';

// Create context with initial state
const LeaderboardContext = createContext<LeaderboardContextState>({
  leaderboard: initialLeaderboardState,
  getScoresByExam: () => [],
  getAllScores: () => [],
  clearLeaderboard: () => {},
  addScore: () => {},
});

// Custom hook to use leaderboard context
export const useLeaderboard = () => useContext(LeaderboardContext);

interface LeaderboardProviderProps {
  children: ReactNode;
}

export const LeaderboardProvider: React.FC<LeaderboardProviderProps> = ({ children }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardState>(initialLeaderboardState);

  // Load leaderboard data from local storage on component mount
  useEffect(() => {
    try {
      const storedLeaderboard = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
      if (storedLeaderboard) {
        setLeaderboard(JSON.parse(storedLeaderboard));
      }
    } catch (error) {
      console.error('Failed to load leaderboard from local storage:', error);
      // Initialize with empty leaderboard if there's an error
      setLeaderboard(initialLeaderboardState);
    }
  }, []);

  // Listen for localStorage changes (in case another component updates the leaderboard)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LEADERBOARD_STORAGE_KEY && e.newValue) {
        try {
          setLeaderboard(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Failed to parse leaderboard from storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Add a new score entry to the leaderboard
  const addScore = (scoreEntry: ScoreEntry) => {
    addScoreToLeaderboard(scoreEntry);
    
    // Update local state to reflect the change
    setLeaderboard(prev => ({
      scores: [...prev.scores, scoreEntry]
    }));
  };

  // Get scores for a specific exam
  const getScoresByExam = (examId: string): ScoreEntry[] => {
    return getScoresByExamUtil(examId);
  };

  // Get all scores
  const getAllScores = (): ScoreEntry[] => {
    return getScoresUtil();
  };

  // Clear all leaderboard entries
  const clearLeaderboard = () => {
    clearLeaderboardUtil();
    setLeaderboard(initialLeaderboardState);
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