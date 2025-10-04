import React, { useState, useCallback, useMemo } from 'react';
import { Screen, Question } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { quizQuestions } from './data/karutaData';

// Function to shuffle an array
const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
}

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>(Screen.WELCOME);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Memoize the shuffled questions so they don't re-shuffle on every render
  const questions = useMemo(() => shuffleArray(quizQuestions), []);

  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);


  const handleStart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setScreen(Screen.QUIZ);
  };

  const handleSelectAnswer = (answer: string) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestionIndex(nextQuestion);
        setIsAnswered(false);
        setSelectedAnswer(null);
      } else {
        setScreen(Screen.RESULT);
      }
    }, 2500);
  };
  
  const renderScreen = () => {
    switch (screen) {
      case Screen.QUIZ:
        return (
          <QuizScreen
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onSelectAnswer={handleSelectAnswer}
            isAnswered={isAnswered}
            selectedAnswer={selectedAnswer}
          />
        );
      case Screen.RESULT:
        return <ResultScreen score={score} totalQuestions={questions.length} onRestart={handleStart} />;
      case Screen.WELCOME:
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="w-full max-w-md mx-auto">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;