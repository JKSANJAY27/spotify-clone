import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:4000/api/auth/validate', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUser({
                        id: data.userId, // Ensure this matches the user ID field returned by your backend
                        name: data.user.name, // Include other user details as needed
                        email: data.user.email,
                        image: data.user.image
                    });
                } else {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
                setLoading(false);
            });
        } else {
            setLoading(false);
            navigate('/login');
        }
    }, [navigate]);

    const login = (userData) => {
        setUser(userData); // Set the user state with the data received
        localStorage.setItem('token', userData.token); // Ensure the token is set if not already done
        navigate('/'); // Redirect to the home page or any other page after login
    };

    const logout = () => {
      // Clear user data and token
      setUser(null);
      localStorage.removeItem('token'); // Clear the token from local storage
      navigate('/login'); // Redirect to the login page
  };
    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
