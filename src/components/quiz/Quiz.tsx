import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameLevels } from '../../interfaces/levels'
import { PlayerAnswer } from '../../interfaces/player'
import { allQuestions } from '../../questions'
import { pickRandomQuestion } from '../../utils/shuffle'
import QuizQuestions from './QuizQuestions'

const INCREMENT_SCORE_BY = 100
const TOTAL_QUESTIONS = 5
const QUESTIONS_PER_LEVEL = 5

const Quiz: React.FC = () => {
  const level: GameLevels = ['easy', 'medium', 'hard', 'expert', 'hardcore']
  const navigate = useNavigate()
  // component's state
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(true)
  const [didRetire, setDidRetire] = useState(false)
  const [disableBtn, setDisableBtn] = useState(false)
  const [questions, setQuestions] = useState(allQuestions)
  const [playerAnswer, setPlayerAnswer] = useState<PlayerAnswer[]>([])
  const [currentLevel, setCurrentLevel] = useState(0)
  const [random, setRandom] = useState(pickRandomQuestion(QUESTIONS_PER_LEVEL))
  const [showNext, setShowNext] = useState(false)

  console.log(playerAnswer)
  const startGame = () => {
    setIsGameOver(false)
    setScore(0)
    setPlayerAnswer([])
    setDidRetire(false)
    setDisableBtn(false)
    setCurrentLevel(0)
  }

  const handleRetirement = () => {
    // TODO - improve this option
    navigate('/result', {
      state: {
        retired: true,
        won: false,
        lost: false,
        score,
      },
    })
    setDidRetire(true)
    setIsGameOver(true)
    setShowNext(false)
  }

  const nextQuestion = () => {
    setCurrentLevel((prev) => (prev < TOTAL_QUESTIONS ? prev + 1 : prev))
    setRandom(pickRandomQuestion(QUESTIONS_PER_LEVEL))
    setShowNext(false)
    setDisableBtn(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isGameOver) {
      // user answer
      const answer = e.currentTarget.value
      // check the answer
      const correct = questions[level[currentLevel]][random].correctAnswer === answer
      // saves player answer into the state
      const playerAnswer: PlayerAnswer = {
        question: questions[level[currentLevel]][random].question,
        answer,
        correct,
        correctAnswer: questions[level[currentLevel]][random].correctAnswer,
      }
      setPlayerAnswer((prev) => [...prev, playerAnswer])

      if (correct) {
        setScore((prev) => prev + INCREMENT_SCORE_BY)
        // only show next if not last question
        // using 4 to compensate for array starting at 0
        if (currentLevel < 4) {
          setShowNext(true)
        }
        setDisableBtn(true)
      } else {
        // player loses
        // TODO - handle this better
        navigate('/result', {
          state: {
            retired: false,
            won: false,
            lost: true,
            score,
          },
        })
        setIsGameOver(true)
        setScore(0)
        setDisableBtn(true)
        console.log('you lose')
      }
    }
  }

  const handleWin = () => {
    navigate('/result', {
      state: {
        retired: false,
        won: true,
        lost: false,
        score,
      },
    })
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center md:w-1/2 md:m-auto gap-y-1'>
        <h3 className='md:text-3xl text-2xl'>Quiz Game!</h3>
        {!isGameOver && (
          <h5 className="hover:after:content-['!!!']">
            Score: <span className='text-blue-700'>{score}</span>
          </h5>
        )}
        {isGameOver && <button onClick={() => startGame()}>Start Game</button>}
        {!isGameOver && (
          <QuizQuestions
            questions={questions}
            TOTAL_QUESTIONS={TOTAL_QUESTIONS}
            checkAnswer={checkAnswer}
            level={level}
            currentLevel={currentLevel}
            random={random}
            disableBtn={disableBtn}
          />
        )}
        <div className='flex flex-col mt-5 gap-3 '>
          {showNext && !didRetire && (
            <button
              className='h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700'
              onClick={() => nextQuestion()}
            >
              Next question
            </button>
          )}
          {!isGameOver && playerAnswer.length > 0 && playerAnswer.length < TOTAL_QUESTIONS && (
            <button
              className='h-10 px-5 m-2 text-white transition-colors duration-150 bg-gray-600 rounded-lg focus:shadow-outline hover:bg-gray-700'
              onClick={() => handleRetirement()}
            >
              Retire
            </button>
          )}
          {/* create another btn when user finishes correctly. call it save */}
          {playerAnswer.length === TOTAL_QUESTIONS && !didRetire && (
            <button
              className='h-10 px-5 m-2 text-white transition-colors duration-150 bg-green-600 rounded-lg focus:shadow-outline hover:bg-green-700'
              onClick={() => handleWin()}
            >
              Save Result
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default Quiz
