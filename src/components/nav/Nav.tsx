import { Link } from 'react-router-dom'

const Nav: React.FC = () => {
  return (
    <>
      <nav className='bg-gray-800 sticky mb-4 h-10 flex justify-center items-center rounded'>
        <div className='flex justify-around items-center w-80'>
          {/* if page is / => reload else link to / */}
          <Link to={'/'}>
            <button className='text-white hover:text-red-500'>New Game</button>
          </Link>
          <Link to={'/leaderboard'}>
            <button className='text-white hover:text-blue-500'>Leader board</button>
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Nav
