import React from 'react';
import { useQuiz } from './QuizContext';
import ExamSelector from './ExamSelector';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';

const QuizContainer: React.FC = () => {
  const { quizState, examData, setExam } = useQuiz();
  
  // If no exam is selected yet, show the exam selector
  if (!quizState.currentExam) {
    return <ExamSelector />;
  }

  // If quiz is complete, show results
  if (quizState.isComplete) {
    return <QuizResults />;
  }

  // If there's no exam data, show loading state
  if (!examData) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <p className="text-xl">Loading exam data...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{examData.exam} Quiz</h2>
        <button
          onClick={() => setExam('')}
          className="text-sm bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Change Exam
        </button>
      </div>
      
      <QuizQuestion />
    </div>
  );
};

export default QuizContainer;