import React, { useEffect, useState } from 'react';
import ExamSelector from './components/ExamSelector';
import QuizContainer from './components/QuizContainer';
import { QuizProvider } from './components/QuizContext';

function App() {
  // Set dark mode by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="App min-h-screen p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          Microsoft Certification Quiz
        </h1>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"
        >
          {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>
      <QuizProvider>
        <main className="max-w-4xl mx-auto">
          <QuizContainer />
        </main>
      </QuizProvider>
    </div>
  );
}

export default App;