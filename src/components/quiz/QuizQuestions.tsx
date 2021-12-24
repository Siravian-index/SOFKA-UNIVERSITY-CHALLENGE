import { useState } from 'react'
import { GameLevels } from '../../interfaces/levels'
import { Questions } from '../../interfaces/question'
import { pickRandomQuestion } from '../../utils/shuffle'

type Props = {
  questions: Questions
  totalQuestions: number
  questionsPerLevel: number
  setScore: React.Dispatch<React.SetStateAction<number>>
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>
  incrementScoreBy: number
  isGameOver: boolean
}

const QuizQuestions: React.FC<Props> = ({
  questions,
  totalQuestions,
  questionsPerLevel,
  setScore,
  isGameOver,
  setIsGameOver,
  incrementScoreBy,
}) => {
  const level: GameLevels = ['easy', 'medium', 'hard', 'expert', 'hardcore']
  const [currentLevel, setCurrentLevel] = useState(0)
  const [random, setRandom] = useState(pickRandomQuestion(questionsPerLevel))
  const [showNext, setShowNext] = useState(false)

  const nextQuestion = () => {
    setCurrentLevel((prev) => (prev < totalQuestions ? prev + 1 : prev))
    setRandom(pickRandomQuestion(questionsPerLevel))
    setShowNext(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.value
    const correct = questions[level[currentLevel]][random].correctAnswer === answer
    if (correct) {
      setScore((prev) => prev + incrementScoreBy)
      setShowNext(true)
    } else {
      // player loses
      setIsGameOver(true)
      setScore(0)
      console.log('you lose')
    }
  }
  return (
    <>
      <div>Quiz Questions</div>
      <h6>
        {currentLevel + 1}/ {totalQuestions}
      </h6>
      <h5>Question: {questions[level[currentLevel]][random].question} </h5>
      {questions[level[currentLevel]][random].answers.map((answer) => (
        <div key={answer}>
          <button value={answer} onClick={(e) => checkAnswer(e)}>
            {answer}
          </button>
        </div>
      ))}
      <div>{showNext && <button onClick={() => nextQuestion()}>Next question</button>}</div>
    </>
  )
}

export default QuizQuestions
