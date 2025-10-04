
import React from 'react';
import type { GeneratedResult } from '../types';

interface ResultCardProps {
  result: GeneratedResult;
  onReset: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const [title, ...bioParts] = result.bio.split('\n');
  const bio = bioParts.join('\n').trim();

  return (
    <div className="bg-gray-800/60 rounded-lg shadow-2xl backdrop-blur-lg border border-gray-700 overflow-hidden animate-fade-in-scale">
      <div className="relative">
        <img src={result.imageUrl} alt="Generated karate master" className="w-full h-auto object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800/80 to-transparent"></div>
      </div>
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold text-yellow-400 mb-3">
          {title.replace(/「|」/g, '')}
        </h3>
        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
          {bio}
        </p>
      </div>
      <div className="p-6 bg-gray-900/50">
        <button
          onClick={onReset}
          className="w-full bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-400/50 transition-all duration-300 ease-in-out"
        >
          もう一度試す
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
