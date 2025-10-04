
export enum Screen {
  WELCOME,
  INPUT,
  LOADING,
  RESULT,
}

export interface UserData {
  name: string;
  gender: 'male' | 'female' | 'other';
}

export interface GeneratedResult {
  imageUrl: string;
  bio: string;
}
