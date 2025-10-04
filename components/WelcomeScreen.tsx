import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const KarateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16.5 10.5c-3.3 0-6-2.2-6-5v10c0 .6-.4 1-1 1s-1-.4-1-1v-4c0-3.3-2.7-6-6-6"/>
    <path d="m5 6 3 3 3-3"/>
    <path d="M12 18a3 3 0 1 0 6 0 3 3 0 1 0-6 0Z"/>
  </svg>
);


const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center p-8 bg-gray-800/50 rounded-lg shadow-2xl backdrop-blur-sm border border-gray-700 animate-fade-in">
      <div className="flex justify-center items-center mb-6">
        <KarateIcon className="w-12 h-12 text-yellow-400" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold font-orbitron text-white mb-2 tracking-wider">
        前橋高校空手部
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold font-orbitron text-yellow-400 mb-6">
        上毛かるたクイズ
      </h2>
      <p className="text-gray-300 mb-8 leading-relaxed">
        20年の時を経て、君の「群馬愛」が試される。
        <br />
        クイズに挑戦して、最高の押忍を決めろ！
      </p>
      <button
        onClick={onStart}
        className="w-full bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg text-lg hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300/50 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        クイズ開始！
      </button>
    </div>
  );
};

export default WelcomeScreen;