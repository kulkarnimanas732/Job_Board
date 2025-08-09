import React from 'react';
import JobBoard from './JobBoard';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Job Board</h1>

      {user && (
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-800">
            Welcome, <span className="text-blue-600">{user.name}</span>
          </h1>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
