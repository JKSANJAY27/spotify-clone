import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const googleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const result = await fetch(`http://localhost:4000/api/auth/google?code=${response.code}`, {
                    credentials: 'include'
                });
                const data = await result.json();
                
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    login(data.user);
                    navigate('/');
                }
            } catch (error) {
                console.error('Login failed:', error);
            }
        },
        flow: 'auth-code',
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold text-white mb-6">Welcome to Spotify Clone</h1>
                <button
                    onClick={googleLogin}
                    className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;