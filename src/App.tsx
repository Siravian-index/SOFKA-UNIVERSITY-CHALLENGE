import { Routes, Route } from 'react-router-dom'
import Quiz from './components/quiz/Quiz'

function App() {
  return (
    <div className='font-mono'>
      <h1>Nav</h1>
      <Routes>
        <Route path='/' element={<Quiz />}>
          <Route path=':level' />
        </Route>
      </Routes>
    </div>
  )
}

export default App
