import React, { useState, useEffect } from 'react';
import { useLeaderboard } from './LeaderboardContext';
import { ScoreEntry } from '../types';

interface LeaderboardProps {
  currentExam?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ currentExam }) => {
  const { getAllScores, getScoresByExam, clearLeaderboard } = useLeaderboard();
  const [filterExam, setFilterExam] = useState<string | undefined>(currentExam);
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [uniqueExams, setUniqueExams] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load scores based on current filter
  useEffect(() => {
    try {
      const allScores = getAllScores();
      
      // Get unique exams for filter dropdown
      const examIds = Array.from(new Set(allScores.map(score => score.examId)));
      setUniqueExams(examIds);
      
      // Filter scores by exam if needed
      const filteredScores = filterExam 
        ? getScoresByExam(filterExam)
        : allScores.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setScores(filteredScores);
      setError(null);
    } catch (err) {
      console.error('Error loading scores:', err);
      setError('Failed to load leaderboard data. Please try again.');
      setScores([]);
    }
  }, [filterExam, getAllScores, getScoresByExam]);

  // Format date for display
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric',
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit'
      }).format(date);
    } catch (err) {
      console.error('Date formatting error:', err);
      return dateString;
    }
  };

  // Handle clearing the leaderboard with confirmation
  const handleClearLeaderboard = () => {
    if (window.confirm('Are you sure you want to clear all leaderboard data? This action cannot be undone.')) {
      try {
        clearLeaderboard();
        setScores([]);
        setUniqueExams([]);
      } catch (err) {
        console.error('Error clearing leaderboard:', err);
        setError('Failed to clear leaderboard. Please try again.');
      }
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        
        <div className="flex gap-3">
          <select 
            value={filterExam || ''} 
            onChange={(e) => setFilterExam(e.target.value || undefined)}
            className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All Exams</option>
            {uniqueExams.map(examId => (
              <option key={examId} value={examId}>{examId}</option>
            ))}
          </select>
          
          <button
            onClick={handleClearLeaderboard}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
          >
            Clear Leaderboard
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded mb-4">
          {error}
        </div>
      )}
      
      {!error && scores.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">No scores yet. Take a quiz to appear on the leaderboard!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Exam
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Correct
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {scores.map((score, index) => (
                <tr key={score.id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900/50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {score.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {score.examId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    {score.score}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {score.correctAnswers} / {score.totalQuestions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(score.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;