import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
                    setUser(data.user);
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

    const login = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', credentials);
            if (response.data.success) {
                setUser(response.data.user);
                localStorage.setItem('token', response.data.token); // Store the token
                navigate('/'); // Redirect to the home page or any other page after login
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            throw new Error('Login failed: ' + error.message); // Handle error for Login component
        }
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