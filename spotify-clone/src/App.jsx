import React from 'react'
import Sidebar from './components/Sidebar'
import MusicPlayer from './components/MusicPlayer'
import Display from './components/Display'

const App = () => {
  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
        <Sidebar />
        <Display />
      </div>
      <MusicPlayer />
    </div>
  )
}

export default App