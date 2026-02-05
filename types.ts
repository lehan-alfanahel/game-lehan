
export enum GameState {
  START = 'START',
  SETUP = 'SETUP',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED'
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  answer: number; // Index of correct option
  category: 'Fakta' | 'Opini';
}

export interface PlayerData {
  name: string;
  avatar: string;
  score: number;
  currentQuestionIndex: number;
  questions: Question[];
  finished: boolean;
}

export const AVATARS = [
  '🏎️', '🚗', '🚙', '🚐', '🚓', '🚑', '🚒', '🚜'
];
