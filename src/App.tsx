import { Routes, Route } from 'react-router-dom'
import Quiz from './components/quiz/Quiz'

function App() {
  return (
    <div className='App'>
      <h1>Nav</h1>
      <Routes>
        <Route path='/' element={<Quiz />} />
      </Routes>
    </div>
  )
}

export default App
