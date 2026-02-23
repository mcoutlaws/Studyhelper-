import React from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();

  const stats = [
    { label: 'Subjects Enrolled', value: '6', icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Study Hours', value: '12.5', icon: Clock, color: 'bg-green-500' },
    { label: 'Current Level', value: user?.level.toString() || '1', icon: Award, color: 'bg-purple-500' },
    { label: 'Total Points', value: user?.points.toString() || '0', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Welcome back, {user?.name}!</p>
        </div>
        <div className="text-sm text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-40 rounded-2xl overflow-hidden shadow-sm">
        <img 
          src="https://picsum.photos/seed/student/1200/400" 
          alt="Study Motivation" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-transparent flex items-center p-8">
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-1">Keep Learning, Keep Growing</h2>
            <p className="text-indigo-100 text-sm max-w-md">"Education is the most powerful weapon which you can use to change the world."</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
              <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  {i === 1 ? 'M' : i === 2 ? 'P' : 'C'}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900">
                    {i === 1 ? 'Mathematics - Algebra' : i === 2 ? 'Physics - Mechanics' : 'Chemistry - Organic'}
                  </h3>
                  <p className="text-sm text-slate-500">Completed Chapter {i}</p>
                </div>
                <span className="text-xs text-slate-400">2h ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Upcoming Tests</h2>
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">Mathematics</span>
                <span className="text-xs text-orange-600 font-medium">Tomorrow</span>
              </div>
              <h3 className="font-bold text-slate-800">Calculus Mid-term</h3>
              <p className="text-xs text-slate-500 mt-1">Chapters 1-5</p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">Physics</span>
                <span className="text-xs text-blue-600 font-medium">In 3 days</span>
              </div>
              <h3 className="font-bold text-slate-800">Optics Quiz</h3>
              <p className="text-xs text-slate-500 mt-1">Light & Reflection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
