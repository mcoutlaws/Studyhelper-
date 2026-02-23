import React, { useState } from 'react';
import { useAuth, UserRole } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [board, setBoard] = useState('West Bengal Board');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    // Simulate registration
    login({
      id: Date.now().toString(),
      name,
      email,
      role: 'user', // Default to user
      board,
      points: 0,
      level: 1,
      streak: 0,
    });

    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-500 mt-2">Join StudyHelper today</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Board</label>
              <select
                value={board}
                onChange={(e) => setBoard(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="West Bengal Board">WB Board</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-2"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
