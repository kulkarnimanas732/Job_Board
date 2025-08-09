
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from './Toast';

export default function Signup({ onSignup, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState(null);

   const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSignup({ name, email, password });
     showToast('Registration successful! Please log in.');
    } catch (err) {
      showToast(err.message || 'Registration failed');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg w-full bg-white p-10 rounded-xl shadow-lg space-y-6 mt-6"
    >
      <h2 className="text-3xl font-bold text-center">Create Your Account</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="w-full p-3 border rounded-md"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full p-3 border rounded-md"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full p-3 border rounded-md"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
      >
        Sign Up
      </button>

      <p className="text-center mt-4 text-gray-700">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-green-600 hover:underline"
        >
          Log In
        </button>
      </p>
    </form>
  );
}
