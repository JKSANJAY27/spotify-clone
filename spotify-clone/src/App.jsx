import React, { useContext } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { PlayerContext } from './context/PlayerContext';
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import Display from './components/Display';
import Login from './components/Login';
import Album from './components/Album';

const App = () => {
    const { audioRef, track, songsData } = useContext(PlayerContext);

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID }>
            <AuthProvider>
                <div className='h-screen bg-black'>
                    {songsData.length !== 0 &&
                        <>
                            <div className='h-[90%] flex'>
                                <Sidebar />
                                <Display />
                            </div>
                            <MusicPlayer />
                        </>
                    }
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={
                            <audio ref={audioRef} src={track?.file} preload='auto'></audio>
                        } />
                        <Route path="/album/:id" element={<Album />} />
                    </Routes>
                </div>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
};

export default App;