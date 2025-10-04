import React from 'react';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalQuestions, onRestart }) => {
  
  const getResultMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage === 100) return "全問正解！君こそ真の上州人！押忍！";
    if (percentage >= 60) return "なかなかやるな！さすが前高空手部！";
    if (percentage >= 20) return "まだまだ修行が足りんな！もう一度挑戦だ！";
    return "喝！道場に戻って出直してこい！";
  };
  
  return (
    <div className="text-center p-8 bg-gray-800/50 rounded-lg shadow-2xl backdrop-blur-sm border border-gray-700 animate-fade-in-scale">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">結果発表！</h2>
        <p className="text-5xl font-bold font-orbitron text-white mb-4">
            {score} <span className="text-2xl text-gray-400">/ {totalQuestions}</span>
        </p>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            {getResultMessage()}
        </p>
        <button
            onClick={onRestart}
            className="w-full bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg text-lg hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300/50 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
            もう一度挑戦！
        </button>
    </div>
  );
};

export default ResultScreen;