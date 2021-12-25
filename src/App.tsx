import { Routes, Route } from 'react-router-dom'
import Leaderboard from './components/leaderboard/Leaderboard'
import Nav from './components/nav/Nav'
import Quiz from './components/quiz/Quiz'
import QuizResult from './components/quiz/QuizResult'

function App() {
  return (
    <div className='font-mono'>
      <Nav />
      <Routes>
        <Route path='/' element={<Quiz />} />
        <Route path='result' element={<QuizResult />} />
        <Route path='leaderboard' element={<Leaderboard />} />
      </Routes>
    </div>
  )
}

export default App
