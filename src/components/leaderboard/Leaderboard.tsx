import { useEffect, useState } from 'react'
import { SavedScores } from '../../interfaces/locationState'

const Leaderboard: React.FC = () => {
  const [scores, setScores] = useState<SavedScores[]>([])

  const getDataFromLocal = () => {
    const results = localStorage.getItem('results')
    if (results) {
      const data = JSON.parse(results)
      console.log(data)
      return data
    } else {
      return []
    }
  }
  useEffect(() => {
    setScores(getDataFromLocal())
  }, [])
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <div className='mt-1 mb-2'>
          <h4 className='text-2xl'>Leader board</h4>
        </div>
        <div>
          {scores.length > 0 &&
            scores.map((user, i) => (
              <div
                key={i}
                className='grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-4 bg-gray-300  p-3 rounded outline-double outline-gray-400 mb-3'
              >
                <div>
                  <p>Player:{user.userName}</p>
                </div>
                <div>
                  <p>score:{user.score}</p>
                </div>
                <div>
                  <p>
                    status:
                    {(user.status.lost && 'Lost') || (user.status.won && 'Won') || (user.status.retired && 'Retired')}
                  </p>
                </div>
              </div>
            ))}
        </div>
        {!scores.length && (
          <div className='text-center'>
            <h4 className='text-xl'>...There are not results yet.</h4>
            <p>Play some matches!</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Leaderboard
