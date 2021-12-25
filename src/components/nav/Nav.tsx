const Nav: React.FC = () => {
  return (
    <>
      <nav className='bg-gray-700 sticky mb-4 h-10 flex justify-center items-center'>
        <div className='flex justify-around items-center w-80'>
          <button className='text-white hover:text-red-700'>New Game</button>
          <button className='text-white hover:text-blue-700'>Leader board</button>
        </div>
      </nav>
    </>
  )
}

export default Nav
