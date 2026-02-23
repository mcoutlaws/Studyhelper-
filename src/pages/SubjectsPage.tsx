import React from 'react';
import { Book, Video, FileText, ArrowRight } from 'lucide-react';

const subjects = [
  { id: 1, name: 'Mathematics', color: 'bg-blue-500', progress: 75, topics: 12 },
  { id: 2, name: 'Physics', color: 'bg-indigo-500', progress: 45, topics: 8 },
  { id: 3, name: 'Chemistry', color: 'bg-emerald-500', progress: 60, topics: 10 },
  { id: 4, name: 'Biology', color: 'bg-rose-500', progress: 30, topics: 15 },
  { id: 5, name: 'History', color: 'bg-amber-500', progress: 90, topics: 20 },
  { id: 6, name: 'Geography', color: 'bg-cyan-500', progress: 50, topics: 14 },
];

export default function SubjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Subjects</h1>
          <p className="text-slate-500">Track your progress across all courses</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
          + Add Subject
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
            <div className={`h-2 ${subject.color}`} />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-lg ${subject.color} bg-opacity-10 flex items-center justify-center`}>
                  <Book className={`w-5 h-5 ${subject.color.replace('bg-', 'text-')}`} />
                </div>
                <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
                  {subject.topics} Topics
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {subject.name}
              </h3>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Progress</span>
                  <span>{subject.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${subject.color} rounded-full transition-all duration-500`} 
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-50">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                  <Video className="w-3.5 h-3.5" />
                  Lectures
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                  <FileText className="w-3.5 h-3.5" />
                  Notes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
