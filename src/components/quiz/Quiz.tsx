import { useState } from 'react'
import { allQuestions } from '../../questions'
import QuizQuestions from './QuizQuestions'

const INCREMENT_SCORE_BY = 100
const TOTAL_QUESTIONS = 5
const QUESTIONS_PER_LEVEL = 5

const Quiz: React.FC = () => {
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(true)
  const [didSurrender, setDidSurrender] = useState(false)
  const [questions, setQuestions] = useState(allQuestions)
  const [player, setPlayer] = useState({})

  const startGame = () => {
    setIsGameOver(false)
    setScore(0)
    setDidSurrender(false)
  }

  return (
    <>
      <div>
        <h3>General Quiz Game!</h3>
        {!isGameOver && <h5>Score: {score} </h5>}
        {isGameOver && <button onClick={() => startGame()}>Start Game</button>}
        {!isGameOver && (
          <QuizQuestions
            questions={questions}
            totalQuestions={TOTAL_QUESTIONS}
            questionsPerLevel={QUESTIONS_PER_LEVEL}
            setScore={setScore}
            incrementScoreBy={INCREMENT_SCORE_BY}
          />
        )}
        {!isGameOver && <button>Surrender</button>}
      </div>
    </>
  )
}

export default Quiz
