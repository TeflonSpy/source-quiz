import { ScoreEntry, LeaderboardState } from '../types';

// Local storage key
export const LEADERBOARD_STORAGE_KEY = 'azQuizLeaderboard';

// Initialize leaderboard with empty scores array
export const initialLeaderboardState: LeaderboardState = {
  scores: [],
};

/**
 * Add a new score entry to the leaderboard in local storage
 * @param scoreEntry The score entry to add
 */
export const addScoreToLeaderboard = (scoreEntry: ScoreEntry): void => {
  try {
    // Get current leaderboard from local storage
    const storedLeaderboard = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    const currentLeaderboard = storedLeaderboard 
      ? JSON.parse(storedLeaderboard) 
      : initialLeaderboardState;
    
    // Add the new score
    const updatedLeaderboard = {
      scores: [...currentLeaderboard.scores, scoreEntry]
    };
    
    // Save back to local storage
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(updatedLeaderboard));
  } catch (error) {
    console.error('Failed to add score to leaderboard:', error);
  }
};

/**
 * Get all scores from the leaderboard
 * @returns Array of score entries
 */
export const getAllScores = (): ScoreEntry[] => {
  try {
    const storedLeaderboard = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    if (!storedLeaderboard) return [];
    
    const leaderboard = JSON.parse(storedLeaderboard) as LeaderboardState;
    return leaderboard.scores || [];
  } catch (error) {
    console.error('Failed to get scores from leaderboard:', error);
    return [];
  }
};

/**
 * Get scores for a specific exam
 * @param examId The exam ID to filter by
 * @returns Array of score entries for the specified exam
 */
export const getScoresByExam = (examId: string): ScoreEntry[] => {
  const allScores = getAllScores();
  return allScores
    .filter(entry => entry.examId === examId)
    .sort((a, b) => b.score - a.score);
};

/**
 * Clear all entries from the leaderboard
 */
export const clearLeaderboard = (): void => {
  try {
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(initialLeaderboardState));
  } catch (error) {
    console.error('Failed to clear leaderboard:', error);
  }
};