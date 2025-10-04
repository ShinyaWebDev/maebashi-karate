
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "押忍！AIが気合いを入れています...",
  "過去の記憶をスキャン中...",
  "上毛かるたを思い出しています...",
  "正拳突きを100回練習中...",
  "20年分のデータを解析中...",
  "未来の姿を生成しています...",
  "焼きまんじゅうの香りがします...",
];

const LoadingSpinner: React.FC = () => (
    <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
);

const LoadingScreen: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <LoadingSpinner />
      <p className="mt-6 text-lg text-gray-300 transition-opacity duration-500 ease-in-out">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
};

export default LoadingScreen;
