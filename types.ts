export enum Screen {
  WELCOME,
  QUIZ,
  RESULT,
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

// FIX: Added UserData interface for user input data.
export interface UserData {
  name: string;
  gender: 'male' | 'female' | 'other';
}

// FIX: Added GeneratedResult interface for AI-generated content.
export interface GeneratedResult {
  imageUrl: string;
  bio: string;
}
