
import { GoogleGenAI } from "@google/genai";
import type { UserData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getGenderTerm = (gender: 'male' | 'female' | 'other'): string => {
    switch (gender) {
        case 'male': return '男性';
        case 'female': return '女性';
        default: return '人物';
    }
};

export const generateImage = async (userData: UserData): Promise<string> => {
  const genderTerm = getGenderTerm(userData.gender);
  const prompt = `A cinematic, dynamic anime-style portrait of a ${genderTerm} karate master named ${userData.name}, 20 years after high school. They are wearing a pristine white karate gi with a black belt, in a powerful kata pose. The background is a slightly futuristic, dramatic view of Maebashi City, Gunma, at dusk, with Mount Akagi visible in the distance. The lighting is dramatic and highlights their determined expression. High-resolution, epic art style.`;

  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio: '3:4',
    },
  });

  if (!response.generatedImages || response.generatedImages.length === 0) {
    throw new Error("Image generation failed, no images returned.");
  }

  const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
  return `data:image/jpeg;base64,${base64ImageBytes}`;
};

export const generateBio = async (userData: UserData): Promise<string> => {
    const prompt = `前橋高校空手部のOB「${userData.name}」の20年後の姿を想像して、面白おかしいキャッチフレーズと短いプロフィールを創作してください。群馬県や前橋市に関連するユニークな要素を少しだけ含めてください。`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: "あなたは高校の同窓会名簿を作るユーモア作家です。感動的でありながらも、くすっと笑えるような文章を創作してください。文章は必ず日本語で、キャッチフレーズとプロフィールの2部構成にしてください。キャッチフレーズは「」で囲み、その後に改行を入れてプロフィールを続けてください。全体で100文字程度にまとめてください。",
            temperature: 0.9,
        }
    });

    return response.text;
};
