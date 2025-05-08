import React, { useEffect, useState } from 'react';
import QuizContainer from './components/QuizContainer';
import Leaderboard from './components/Leaderboard';
import { QuizProvider } from './components/QuizContext';
import { LeaderboardProvider } from './components/LeaderboardContext';
import './modernHome.css';

function App() {
  // Set dark mode by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  // Toggle between quiz and leaderboard views
  const toggleView = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  return (
    <LeaderboardProvider>
      <div className="App min-h-screen p-4">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Microsoft Certification Quiz
          </h1>
          <div className="flex gap-3">
            <button
              onClick={toggleView}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              {showLeaderboard ? '🎯 Take Quiz' : '🏆 Leaderboard'}
            </button>
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"
            >
              {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </header>
        
        <main className="max-w-4xl mx-auto">
          {showLeaderboard ? (
            <Leaderboard />
          ) : (
            <QuizProvider>
              <QuizContainer />
            </QuizProvider>
          )}
        </main>
        
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Microsoft Azure Certification Practice Quiz</p>
          <p className="mt-1">
            This app helps you prepare for Microsoft Azure certification exams with practice questions.
          </p>
        </footer>
      </div>
    </LeaderboardProvider>
  );
}

export default App;