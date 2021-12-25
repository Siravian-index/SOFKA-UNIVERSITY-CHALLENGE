import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const QuizResult: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { state }: any = location
  const [userName, setUserName] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // save result to localStorage
    const data = {
      status: {
        won: state.won,
        lost: state.lost,
        retired: state.retired,
      },
      score: state.score,
      userName,
    }
    const results = localStorage.getItem('results')
    if (results) {
      const array = JSON.parse(results)
      array.unshift(data)
      const saved = JSON.stringify(array)
      localStorage.setItem('results', saved)
    } else {
      const array = []
      array.unshift(data)
      const stringify = JSON.stringify(array)
      localStorage.setItem('results', stringify)
    }
    navigate('/')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center gap-y-3 '>
        <h4 className='text-2xl'>Results: {state.score || 0} </h4>
        <div>
          <p>Type your name to save the result</p>
          <p>
            You have {(state.retired && 'retired from') || (state.won && 'won') || (state.lost && 'lost')} this round
          </p>
        </div>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={(e) => handleSubmit(e)}>
          <div className='mb-3'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='userName'>
              Username
            </label>
            <input
              type='text'
              id='userName'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Your Name'
              value={userName}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            {userName.length > 0 && (
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  )
}

export default QuizResult
