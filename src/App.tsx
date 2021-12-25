import { Routes, Route } from 'react-router-dom'
import Nav from './components/nav/Nav'
import Quiz from './components/quiz/Quiz'

function App() {
  return (
    <div className='font-mono'>
      <Nav />
      <Routes>
        <Route path='/' element={<Quiz />}>
          <Route path=':level' />
        </Route>
      </Routes>
    </div>
  )
}

export default App
