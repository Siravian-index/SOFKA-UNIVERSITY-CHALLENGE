import { useState } from 'react'
import { GameLevels } from '../../interfaces/levels'
import { Questions } from '../../interfaces/question'

type Props = {
  questions: Questions
  totalQuestions: number
  questionsPerLevel: number
  setScore: React.Dispatch<React.SetStateAction<number>>
  incrementScoreBy: number
}

const QuizQuestions: React.FC<Props> = ({
  questions,
  totalQuestions,
  questionsPerLevel,
  setScore,
  incrementScoreBy,
}) => {
  const level: GameLevels = ['easy', 'medium', 'hard', 'expert', 'hardcore']
  const [currentLevel, setCurrentLevel] = useState(0)
  const [random, setRandom] = useState(0)
  const [showOptions, setShowOptions] = useState(false)

  const nextQuestion = () => {
    setCurrentLevel((prev) => (prev < totalQuestions ? prev + 1 : prev))
    // TODO make a randomize func
    setRandom((prev) => prev + 1)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.value
    const correct = questions[level[currentLevel]][random].correctAnswer === answer
    if (correct) {
      setScore((prev) => prev + incrementScoreBy)
      setShowOptions(true)
    } else {
      // player loses
      console.log('you lose')
    }
  }
  return (
    <>
      <div>Quiz Questions</div>
      <h5>Question: {questions[level[currentLevel]][random].question} </h5>
      {questions[level[currentLevel]][random].answers.map((answer) => (
        <div key={answer}>
          <button value={answer} onClick={(e) => checkAnswer(e)}>
            {answer}
          </button>
        </div>
      ))}
      <button onClick={() => nextQuestion()}>Next question</button>
    </>
  )
}

export default QuizQuestions
