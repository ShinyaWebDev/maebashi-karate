
import React, { useState, useCallback } from 'react';
import { Screen, UserData, GeneratedResult } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import InputScreen from './components/InputScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultCard from './components/ResultCard';
import { generateBio, generateImage } from './services/geminiService';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>(Screen.WELCOME);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [generatedResult, setGeneratedResult] = useState<GeneratedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setScreen(Screen.INPUT);
    setError(null);
    setGeneratedResult(null);
  };

  const generateContent = useCallback(async (data: UserData) => {
    try {
      const [imageUrl, bio] = await Promise.all([
        generateImage(data),
        generateBio(data),
      ]);
      
      setGeneratedResult({ imageUrl, bio });
      setScreen(Screen.RESULT);
    } catch (err) {
      console.error(err);
      setError('コンテンツの生成中にエラーが発生しました。もう一度お試しください。');
      setScreen(Screen.INPUT);
    }
  }, []);

  const handleSubmit = (data: UserData) => {
    setUserData(data);
    setScreen(Screen.LOADING);
    generateContent(data);
  };

  const renderScreen = () => {
    switch (screen) {
      case Screen.INPUT:
        return <InputScreen onSubmit={handleSubmit} error={error} />;
      case Screen.LOADING:
        return <LoadingScreen />;
      case Screen.RESULT:
        return generatedResult && <ResultCard result={generatedResult} onReset={handleStart} />;
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
