import React from 'react';
import type { Question } from '../types';

interface QuizScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onSelectAnswer: (answer: string) => void;
  isAnswered: boolean;
  selectedAnswer: string | null;
}

const QuizScreen: React.FC<QuizScreenProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onSelectAnswer,
  isAnswered,
  selectedAnswer,
}) => {
  
  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return 'bg-gray-700 hover:bg-gray-600';
    }
    if (option === question.correctAnswer) {
      return 'bg-green-600 animate-pulse-correct';
    }
    if (option === selectedAnswer) {
      return 'bg-red-600';
    }
    return 'bg-gray-800 opacity-50';
  };

  return (
    <div className="p-6 bg-gray-800/50 rounded-lg shadow-2xl backdrop-blur-sm border border-gray-700 animate-fade-in">
      <div className="mb-6">
        <p className="text-yellow-400 font-bold text-lg text-center">
          第{questionNumber}問 / {totalQuestions}問
        </p>
        <h2 className="text-xl md:text-2xl font-bold text-center text-white mt-2 leading-relaxed">
          {question.question}
        </h2>
      </div>
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => onSelectAnswer(option)}
            disabled={isAnswered}
            className={`w-full text-left p-4 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out ${getButtonClass(option)} disabled:cursor-not-allowed`}
          >
            {option}
          </button>
        ))}
      </div>
      {isAnswered && (
        <div className="mt-6 p-4 bg-gray-900/70 rounded-md border border-gray-600 animate-fade-in">
          <p className="text-yellow-400 font-bold mb-2">【解説】</p>
          <p className="text-gray-300">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;