import React, { useState } from 'react';
import { useQuiz } from './QuizContext';

const QuizQuestion: React.FC = () => {
  const { quizState, examData, selectAnswer, nextQuestion, previousQuestion, completeQuiz } = useQuiz();
  const [showFeedback, setShowFeedback] = useState(false);
  
  if (!examData) return null;
  
  const currentQuestionData = examData.questions[quizState.currentQuestion];
  const isLastQuestion = quizState.currentQuestion === examData.questions.length - 1;
  const isFirstQuestion = quizState.currentQuestion === 0;
  const userAnswer = quizState.answers[quizState.currentQuestion];
  const isAnswered = userAnswer !== -1;
  const isCorrect = userAnswer === currentQuestionData.correct_answer_index;
  
  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return; // Prevent changing answer during feedback
    
    selectAnswer(quizState.currentQuestion, answerIndex);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    nextQuestion();
  };

  const handlePreviousQuestion = () => {
    setShowFeedback(false);
    previousQuestion();
  };

  const handleFinishQuiz = () => {
    completeQuiz();
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>Question {quizState.currentQuestion + 1} of {examData.questions.length}</span>
          <span>{examData.exam}</span>
        </div>
        <h3 className="text-xl font-semibold mb-4">{currentQuestionData.question}</h3>
        
        <div className="space-y-3">
          {currentQuestionData.options.map((option, index) => (
            <div 
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors
                ${showFeedback && index === currentQuestionData.correct_answer_index
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                  : showFeedback && userAnswer === index && userAnswer !== currentQuestionData.correct_answer_index
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : showFeedback && userAnswer !== index
                      ? 'border-gray-200 dark:border-gray-700 opacity-50'
                      : userAnswer === index 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
            >
              <div className="flex items-start">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5
                  ${showFeedback && index === currentQuestionData.correct_answer_index 
                    ? 'bg-green-500 text-white' 
                    : showFeedback && userAnswer === index && userAnswer !== currentQuestionData.correct_answer_index
                      ? 'bg-red-500 text-white'
                      : userAnswer === index 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <div>{option}</div>
              </div>
            </div>
          ))}
        </div>

        {showFeedback && (
          <div className={`mt-6 p-4 rounded-lg border ${
            isCorrect 
              ? 'border-green-500 bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-300' 
              : 'border-red-500 bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-300'
          }`}>
            <div className="flex items-center mb-2">
              {isCorrect ? (
                <>
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold">Correct!</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold">Incorrect</span>
                </>
              )}
            </div>
            <p>{currentQuestionData.explanation}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePreviousQuestion}
          disabled={isFirstQuestion}
          className={`px-4 py-2 rounded ${
            isFirstQuestion 
              ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' 
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Previous
        </button>
        
        {isLastQuestion ? (
          <button
            onClick={handleFinishQuiz}
            disabled={!showFeedback && !isAnswered}
            className={`px-4 py-2 rounded ${
              !showFeedback && !isAnswered
                ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            Finish Quiz
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            disabled={!showFeedback && !isAnswered}
            className={`px-4 py-2 rounded ${
              !showFeedback && !isAnswered
                ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;