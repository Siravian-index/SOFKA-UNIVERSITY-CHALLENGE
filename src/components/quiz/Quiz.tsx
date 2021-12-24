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
  // delete
  const [showNext, setShowNext] = useState(false)

  const startGame = () => {
    setIsGameOver(false)
    setScore(0)
    setPlayerAnswer([])
    setDidRetire(false)
    setDisableBtn(false)
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
        if (currentLevel < 4) {
          setShowNext(true)
        }
        setDisableBtn(true)
      } else {
        // player loses
        setIsGameOver(true)
        setScore(0)
        setDisableBtn(true)
        console.log('you lose')
      }
    }
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
            TOTAL_QUESTIONS={TOTAL_QUESTIONS}
            checkAnswer={checkAnswer}
            level={level}
            currentLevel={currentLevel}
            random={random}
            disableBtn={disableBtn}
          />
        )}
        {!isGameOver && playerAnswer.length > 0 && <button onClick={() => handleRetirement()}>Retire</button>}
        {showNext && <button onClick={() => nextQuestion()}>Next question</button>}
      </div>
    </>
  )
}

export default Quiz
