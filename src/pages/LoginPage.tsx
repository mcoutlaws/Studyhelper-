import React, { useState } from 'react';
import { useAuth, UserRole } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simple mock validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Mock login logic
    // In a real app, this would be an API call
    const role: UserRole = email.includes('admin') ? 'admin' : 'user';
    
    // Simulate a successful login
    login({
      id: '1',
      name: email.split('@')[0],
      email,
      role,
      board: 'West Bengal Board',
      points: 50, // Starter points
      level: 1,
      streak: 1,
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
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Sign in to continue your learning journey</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
          
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-xs text-center text-slate-400">
          Tip: Use an email containing "admin" to access Admin features.
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
