import React, { useContext } from 'react'
import { AuthContext } from '../pages/AuthContext';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className='navbar w-full border-b-2 border-gray-800 px-5 sm:px-12 py-4 flex items-center justify-between text-lg'>
        <p>Admin Panel</p>
        <button 
                onClick={logout}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Logout
        </button>
    </div>
  )
}

export default Navbar