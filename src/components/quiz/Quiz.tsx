import { useState } from 'react'
import { Player } from '../../interfaces/player'
import { allQuestions } from '../../questions'
import QuizQuestions from './QuizQuestions'

const INCREMENT_SCORE_BY = 100
const TOTAL_QUESTIONS = 5
const QUESTIONS_PER_LEVEL = 5

const Quiz: React.FC = () => {
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(true)
  const [didRetire, setDidRetire] = useState(false)
  const [questions, setQuestions] = useState(allQuestions)
  const [player, setPlayer] = useState({})

  const startGame = () => {
    setIsGameOver(false)
    setScore(0)
    // fix this player type
    setPlayer({})
    setDidRetire(false)
  }

  const handleRetirement = () => {
    setDidRetire(true)
    setIsGameOver(true)
  }

  return (
    <>
      <div>
        <h3>General Quiz Game!</h3>
        {!isGameOver && <h5>Score: {score} </h5>}
        {isGameOver && <button onClick={() => startGame()}>Start Game</button>}
        {!isGameOver && (
          <QuizQuestions
            setIsGameOver={setIsGameOver}
            isGameOver={isGameOver}
            questions={questions}
            setScore={setScore}
            totalQuestions={TOTAL_QUESTIONS}
            questionsPerLevel={QUESTIONS_PER_LEVEL}
            incrementScoreBy={INCREMENT_SCORE_BY}
          />
        )}
        {!isGameOver && <button onClick={() => handleRetirement()}>Retire</button>}
      </div>
    </>
  )
}

export default Quiz
