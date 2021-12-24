import { useState } from 'react'
import { allQuestions } from '../../questions'
import QuizQuestions from './QuizQuestions'

const INCREMENT_SCORE = 100

const Quiz: React.FC = () => {
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(true)
  const [didSurrender, setDidSurrender] = useState(false)
  const [questions, setQuestions] = useState(allQuestions)
  const [player, setPlayer] = useState({})

  return (
    <>
      <div>
        <h3>General Quiz Game!</h3>
        {!isGameOver && <h5>Score: {score} </h5>}
        {isGameOver && <button>Start Game</button>}
        <QuizQuestions questions={questions} />
        {!isGameOver && <button>Surrender</button>}
      </div>
    </>
  )
}

export default Quiz
