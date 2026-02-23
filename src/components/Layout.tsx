import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  LogOut, 
  User as UserIcon, 
  GraduationCap, 
  LayoutDashboard,
  CheckSquare,
  BrainCircuit,
  Trophy,
  Star,
  FileText,
  Lightbulb
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Subjects', path: '/subjects', icon: BookOpen },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Question Bank', path: '/questions', icon: FileText },
    { name: 'Exam Suggestions', path: '/suggestions', icon: Lightbulb },
    { name: 'Practice / MCQ', path: '/mcq', icon: BrainCircuit },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    ...(user.board === 'West Bengal Board' || user.role === 'admin' 
      ? [{ name: 'WB Board', path: '/wb-board', icon: GraduationCap }] 
      : []),
    ...(user.role === 'admin' 
      ? [{ name: 'Admin Panel', path: '/admin', icon: UserIcon }] 
      : []),
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
            <BookOpen className="w-6 h-6" />
            <span>StudyHelper</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 font-medium px-1 py-0.5 bg-slate-100 rounded inline-block">
            {user.role === 'admin' ? 'Admin Access' : 'Student Portal'}
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-indigo-50 text-indigo-700" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-indigo-600" : "text-slate-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          {/* Points Display */}
          <div className="mb-4 bg-gradient-to-r from-amber-100 to-orange-100 p-3 rounded-xl border border-orange-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-orange-800 uppercase tracking-wider">Level {user.level}</span>
              <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
            </div>
            <div className="flex items-end gap-1">
              <span className="text-xl font-bold text-orange-900">{user.points}</span>
              <span className="text-xs text-orange-700 mb-1">pts</span>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg">
          <BookOpen className="w-5 h-5" />
          <span>StudyHelper</span>
        </div>
        <button onClick={logout} className="text-slate-500">
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 z-10">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-medium transition-colors",
                isActive 
                  ? "text-indigo-600" 
                  : "text-slate-500"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-indigo-600" : "text-slate-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
