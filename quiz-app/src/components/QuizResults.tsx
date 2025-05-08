import React from 'react';
import { useQuiz } from './QuizContext';
import { Question } from '../types';

const QuizResults: React.FC = () => {
  const { quizState, examData, resetQuiz, setExam } = useQuiz();
  
  if (!examData) return null;
  
  const calculateScore = () => {
    let correctAnswers = 0;
    quizState.answers.forEach((answer, index) => {
      if (answer === examData.questions[index].correct_answer_index) {
        correctAnswers++;
      }
    });
    return {
      correct: correctAnswers,
      total: examData.questions.length,
      percentage: Math.round((correctAnswers / examData.questions.length) * 100)
    };
  };
  
  const score = calculateScore();
  const isPassing = score.percentage >= 70; // 70% is typically a passing score

  // Get only incorrectly answered questions for review
  const incorrectQuestions = examData.questions.filter((_, index) => {
    return quizState.answers[index] !== examData.questions[index].correct_answer_index;
  });

  const QuestionResult = ({ question, questionIndex }: { question: Question, questionIndex: number }) => {
    const userAnswerIndex = quizState.answers[questionIndex];
    
    return (
      <div className="border-t border-gray-200 dark:border-gray-700 py-4">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white bg-red-500">
            ✗
          </div>
          <div>
            <h4 className="font-medium">{question.question}</h4>
            
            <div className="mt-2 ml-4 text-sm">
              <div className="text-red-600 dark:text-red-400">
                Your answer: {userAnswerIndex >= 0 ? question.options[userAnswerIndex] : 'Not answered'}
              </div>
              
              <div className="text-green-600 dark:text-green-400 mt-1">
                Correct answer: {question.options[question.correct_answer_index]}
              </div>
              
              <div className="mt-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-3 rounded">
                <strong>Explanation:</strong> {question.explanation}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Quiz Results</h2>
        <p className="text-lg">
          {examData.exam} - {score.correct} out of {score.total} correct ({score.percentage}%)
        </p>
        
        <div className={`mt-4 text-lg font-semibold
          ${isPassing ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {isPassing ? 'Congratulations! You passed.' : 'You did not pass. Keep practicing!'}
        </div>
        
        <div className="mt-6 flex gap-3 justify-center">
          <button
            onClick={resetQuiz}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Try Again
          </button>
          
          <button
            onClick={() => setExam('')}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md"
          >
            Choose Another Exam
          </button>
        </div>
      </div>
      
      {incorrectQuestions.length > 0 ? (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Review Incorrect Answers</h3>
          <div>
            {incorrectQuestions.map((question, i) => {
              // Find the original index of this question in the full exam
              const originalIndex = examData.questions.findIndex(q => q.id === question.id);
              return (
                <QuestionResult 
                  key={question.id} 
                  question={question} 
                  questionIndex={originalIndex} 
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-8 text-center">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-500 text-green-700 dark:text-green-300">
            <h3 className="text-xl font-semibold mb-2">Perfect Score!</h3>
            <p>You answered all questions correctly. Great job!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizResults;