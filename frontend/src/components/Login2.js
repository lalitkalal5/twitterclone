import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login2 = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('Please fill credentials to login');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://serverfortwitterclone-3.onrender.com/login/login', { username, password });

      localStorage.setItem('token', response.data.token);
      alert(response.data.message);
      if (response.data.message === 'Login successful') {
        navigate('/feed');
      }
      setStatus(response.data.message);
    } catch (error) {
      setStatus('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Twitter blue with logo */}
      <div className="hidden md:flex md:w-1/2 bg-blue-500 items-center justify-center">
        <img src="/Logo-Twitter.jpg" alt="Twitter Logo" className="h-32" />
      </div>

      {/* Right side - Login form */}
      <div className="flex flex-1 items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign in to Twitter</h2>
          <p className="text-gray-500 mb-6">Welcome back! Please login to your account.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="usernameforlogin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your username"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="passwordforlogin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
            >
              Login
            </button>
          </form>

          {/* Status */}
          {status && (
            <div
              className={`mt-5 p-2 rounded-lg text-center text-sm ${
                status.toLowerCase().includes('successful')
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {status}
            </div>
          )}

          {/* Footer */}
          <p className="text-sm text-gray-600 text-center mt-6">
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login2;

