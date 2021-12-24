import { useState } from 'react'

const INCREMENT_SCORE = 100

const Quiz: React.FC = () => {
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(true)
  const [didSurrender, setDidSurrender] = useState(false)
  const [questions, setQuestions] = useState({})
  const [player, setPlayer] = useState({})

  return (
    <>
      <div>
        <h3>General Quiz Game!</h3>
        {!isGameOver && <h5>Score: {score} </h5>}

        {isGameOver && <button>Start Game</button>}
        {!isGameOver && <button>Surrender</button>}
      </div>
    </>
  )
}

export default Quiz
