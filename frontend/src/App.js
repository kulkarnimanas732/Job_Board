import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import JobBoard from './components/JobBoard';
import { loginUser, registerUser } from './api/api';

export default function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  
  const handleLogin = async ({ email, password }) => {
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.name, email: data.email })
      );
      setUser({ name: data.name, email: data.email });
      alert('Logged in successfully');
    } catch (err) {
      alert(err.message);
    }
  };

  
  const handleSignup = async ({ name, email, password }) => {
    try {
      await registerUser({ name, email, password });
      alert('Registration successful! Please log in.');
      setShowSignup(false); // Switch to login view
    } catch (err) {
      alert(err.message);
    }
  };

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <main className="min-h-screen bg-white">
      {user ? (
        <>
          <Navbar user={user} onLogout={handleLogout} />
          
          <JobBoard user={user} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 px-4 text-center mt-12">
          <h1 className="text-5xl font-extrabold text-gray-800">
            Welcome to <span className="text-blue-600">Job Board</span>
          </h1>
          <p className="text-gray-600 max-w-xl">
            Find your next opportunity or post a job easily. Sign up now or log
            in to get started!
          </p>

          {showSignup ? (
            <Signup
              onSignup={handleSignup}
              onSwitchToLogin={() => setShowSignup(false)}
            />
          ) : (
            <Login
              onLogin={handleLogin}
              onSwitchToSignup={() => setShowSignup(true)}
            />
          )}
        </div>
      )}
    </main>
  );
}
