type categoryLevels = 'easy' | 'medium' | 'hard' | 'expert' | 'hardcore'
export interface Question {
  question: string
  answers: string[]
  correctAnswer: string
  category: categoryLevels
}
export interface Questions {
  easy: Question[]
  medium: Question[]
  hard: Question[]
  expert: Question[]
  hardcore: Question[]
}
