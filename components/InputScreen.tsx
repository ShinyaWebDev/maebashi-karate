
import React, { useState } from 'react';
import type { UserData } from '../types';

interface InputScreenProps {
  onSubmit: (data: UserData) => void;
  error: string | null;
}

const InputScreen: React.FC<InputScreenProps> = ({ onSubmit, error }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setLocalError('名前を入力してください。');
      return;
    }
    setLocalError(null);
    onSubmit({ name, gender });
  };

  return (
    <div className="p-8 bg-gray-800/50 rounded-lg shadow-2xl backdrop-blur-sm border border-gray-700 animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">自分の名前を入力</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            名前 (Name)
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setLocalError(null);
            }}
            placeholder="例：前橋 太郎"
            className="w-full bg-gray-900/50 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            性別 (Gender)
          </label>
          <div className="grid grid-cols-3 gap-2 rounded-md bg-gray-900/50 p-1 border border-gray-600">
            {([['male', '男性'], ['female', '女性'], ['other', 'その他']] as const).map(([value, label]) => (
                 <button
                    type="button"
                    key={value}
                    onClick={() => setGender(value)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                        gender === value
                        ? 'bg-yellow-500 text-gray-900'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                >
                    {label}
                </button>
            ))}
          </div>
        </div>
        {(error || localError) && <p className="text-red-400 text-sm text-center">{error || localError}</p>}
        <button
          type="submit"
          className="w-full bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg text-lg hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300/50 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={!name.trim()}
        >
          AIで生成する
        </button>
      </form>
    </div>
  );
};

export default InputScreen;
