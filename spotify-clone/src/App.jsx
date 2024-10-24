import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import MusicPlayer from './components/MusicPlayer'
import Display from './components/Display'
import {PlayerContext} from './context/PlayerContext'

const App = () => {
  const {audioRef, track} = useContext(PlayerContext);
  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
        <Sidebar />
        <Display />
      </div>
      <MusicPlayer />
      <audio ref={audioRef} preload='auto'></audio>
    </div>
  )
}

export default App