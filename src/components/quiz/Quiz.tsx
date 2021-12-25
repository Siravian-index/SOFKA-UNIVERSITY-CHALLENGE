import { useState } from 'react'
import { GameLevels } from '../../interfaces/levels'
import { PlayerAnswer } from '../../interfaces/player'
import { allQuestions } from '../../questions'
import { pickRandomQuestion } from '../../utils/shuffle'
import QuizQuestions from './QuizQuestions'

const INCREMENT_SCORE_BY = 100
const TOTAL_QUESTIONS = 5
const QUESTIONS_PER_LEVEL = 5

const Quiz: React.FC = () => {
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(true)
  const [didRetire, setDidRetire] = useState(false)
  const [disableBtn, setDisableBtn] = useState(false)
  const [questions, setQuestions] = useState(allQuestions)
  const [playerAnswer, setPlayerAnswer] = useState<PlayerAnswer[]>([])
  // component's state
  const level: GameLevels = ['easy', 'medium', 'hard', 'expert', 'hardcore']
  const [currentLevel, setCurrentLevel] = useState(0)
  const [random, setRandom] = useState(pickRandomQuestion(QUESTIONS_PER_LEVEL))
  const [showNext, setShowNext] = useState(false)

  const startGame = () => {
    setIsGameOver(false)
    setScore(0)
    setPlayerAnswer([])
    setDidRetire(false)
    setDisableBtn(false)
    setCurrentLevel(0)
  }

  const handleRetirement = () => {
    // improve this option
    setDidRetire(true)
    setIsGameOver(true)
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
        setIsGameOver(true)
        setScore(0)
        setDisableBtn(true)
        console.log('you lose')
      }
    }
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center md:w-1/2 md:m-auto gap-y-1'>
        <h3 className='md:text-3xl text-2xl'>Quiz Game!</h3>
        {!isGameOver && (
          <h5 className="hover:after:content-['!!!']">
            Score: <span className='text-red-700'>{score}</span>
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
        <div className='flex flex-col mt-5 gap-3'>
          {showNext && !didRetire && (
            <button className='bg-blue-700 text-white py-2 px-1' onClick={() => nextQuestion()}>
              Next question
            </button>
          )}
          {!isGameOver && playerAnswer.length > 0 && (
            <button className='bg-gray-700 text-white py-2 px-1' onClick={() => handleRetirement()}>
              Retire
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default Quiz
