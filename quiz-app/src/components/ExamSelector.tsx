import React from 'react';
import { useQuiz } from './QuizContext';

const ExamSelector: React.FC = () => {
  const { setExam } = useQuiz();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Select a Microsoft Certification Exam
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        <button
          onClick={() => setExam('AZ-104')}
          className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg transition-colors duration-200 shadow-md"
        >
          <h3 className="text-xl font-semibold">AZ-104</h3>
          <p className="text-sm">Azure Administrator</p>
        </button>
        
        <button
          onClick={() => setExam('AZ-204')}
          className="bg-purple-500 hover:bg-purple-600 text-white py-4 px-6 rounded-lg transition-colors duration-200 shadow-md"
        >
          <h3 className="text-xl font-semibold">AZ-204</h3>
          <p className="text-sm">Azure Developer</p>
        </button>
        
        <button
          onClick={() => setExam('AZ-305')}
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-4 px-6 rounded-lg transition-colors duration-200 shadow-md"
        >
          <h3 className="text-xl font-semibold">AZ-305</h3>
          <p className="text-sm">Azure Architect</p>
        </button>
        
        <button
          onClick={() => setExam('AZ-400')}
          className="bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-lg transition-colors duration-200 shadow-md"
        >
          <h3 className="text-xl font-semibold">AZ-400</h3>
          <p className="text-sm">Azure DevOps</p>
        </button>
        
        <button
          onClick={() => setExam('AI-900')}
          className="bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg transition-colors duration-200 shadow-md"
        >
          <h3 className="text-xl font-semibold">AI-900</h3>
          <p className="text-sm">Azure AI Fundamentals</p>
        </button>

        <button
          onClick={() => setExam('DP-900')}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-6 rounded-lg transition-colors duration-200 shadow-md"
        >
          <h3 className="text-xl font-semibold">DP-900</h3>
          <p className="text-sm">Azure Data Fundamentals</p>
        </button>
      </div>
    </div>
  );
};

export default ExamSelector;