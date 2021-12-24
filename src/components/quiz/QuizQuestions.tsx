import { GameLevels } from '../../interfaces/levels'
import { PlayerAnswer } from '../../interfaces/player'
import { Questions } from '../../interfaces/question'

type Props = {
  TOTAL_QUESTIONS: number
  questions: Questions
  level: GameLevels
  currentLevel: number
  random: number
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void
  disableBtn: boolean
}

const QuizQuestions: React.FC<Props> = ({
  questions,
  currentLevel,
  TOTAL_QUESTIONS,
  checkAnswer,
  level,
  random,
  disableBtn,
}) => {
  return (
    <>
      <div>Quiz Questions</div>
      <h6>
        {currentLevel + 1}/ {TOTAL_QUESTIONS}
      </h6>
      <h5>Question: {questions[level[currentLevel]][random].question} </h5>
      {questions[level[currentLevel]][random].answers.map((answer) => (
        <div key={answer}>
          <button value={answer} disabled={disableBtn} onClick={(e) => checkAnswer(e)}>
            {answer}
          </button>
        </div>
      ))}
    </>
  )
}

export default QuizQuestions
