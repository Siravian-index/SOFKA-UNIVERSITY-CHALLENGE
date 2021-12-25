import { GameLevels } from '../../interfaces/levels'
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
      <h6>
        {/* sum 1 to compensate for the array starting at 0 */}
        {currentLevel + 1}/{TOTAL_QUESTIONS}
      </h6>
      <h5 className='text-center mb-2'>
        <span className=''>Question</span>: {questions[level[currentLevel]][random].question}{' '}
      </h5>
      {questions[level[currentLevel]][random].answers.map((answer) => (
        <div key={answer}>
          <button
            style={{
              color: answer === questions[level[currentLevel]][random].correctAnswer && disableBtn ? 'green' : 'black',
            }}
            className='hover:underline my-1'
            value={answer}
            disabled={disableBtn}
            onClick={(e) => checkAnswer(e)}
          >
            {answer}
          </button>
        </div>
      ))}
    </>
  )
}

export default QuizQuestions
