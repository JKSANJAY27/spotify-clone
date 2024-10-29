import React from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import {AuthProvider } from "./pages/AuthContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AddSong from "./pages/AddSong";
import AddAlbum from "./pages/AddAlbum";
import ListSong from "./pages/ListSong";
import ListAlbum from "./pages/ListAlbum";
import Login from "./pages/Login";

export const url = import.meta.env.VITE_API_URL;

const App = () => {

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID }>
    <AuthProvider>
    <div className="flex items-start min-h-screen">
      <ToastContainer />
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
        <Navbar />
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/add-song" element={<AddSong />} />
                <Route path="/add-album" element={<AddAlbum />} />
                <Route path="/list-song" element={<ListSong />} />
                <Route path="/list-album" element={<ListAlbum />} />
              </>
          </Routes>
        </div>
      </div>
    </div>
    </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
