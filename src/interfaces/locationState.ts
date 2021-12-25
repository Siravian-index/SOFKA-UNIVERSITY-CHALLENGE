export interface LocationState {
  retired: boolean
  won: boolean
  lost: boolean
  score: number
}

export interface SavedScores {
  userName: string
  status: {
    won: boolean
    lost: boolean
    retired: boolean
  }
  score: number
}
