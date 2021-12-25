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
        <ul>
          {scores.length > 0 &&
            scores.map((user, i) => (
              <li key={i} className='flex flex-col  md:flex-row'>
                <div>Player:{user.userName}</div>
                <div>score:{user.score}</div>
                <div>
                  status:
                  {(user.status.lost && 'Lost') || (user.status.won && 'Won') || (user.status.retired && 'Retired')}
                </div>
              </li>
            ))}
        </ul>
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
