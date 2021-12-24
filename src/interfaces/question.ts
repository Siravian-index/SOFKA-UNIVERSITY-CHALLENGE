import { Levels } from './levels'

export interface Question {
  question: string
  answers: string[]
  correctAnswer: string
  category: Levels
}
export interface Questions {
  easy: Question[]
  medium: Question[]
  hard: Question[]
  expert: Question[]
  hardcore: Question[]
}
