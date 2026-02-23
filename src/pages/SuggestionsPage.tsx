import React from 'react';
import { Lightbulb, Star, Target, BookOpen } from 'lucide-react';

const SUGGESTIONS = [
  {
    id: 1,
    subject: 'Mathematics',
    title: 'Important Theorems for 2026',
    description: 'Focus on Pythagoras Theorem and Thales Theorem. High probability of appearing in the upcoming Madhyamik exam.',
    priority: 'High',
    tags: ['Geometry', 'Theorems']
  },
  {
    id: 2,
    subject: 'Physical Science',
    title: 'Light & Optics Numerical Problems',
    description: 'Practice numericals related to concave mirrors and convex lenses. Don\'t forget the sign convention rules.',
    priority: 'Medium',
    tags: ['Physics', 'Numericals']
  },
  {
    id: 3,
    subject: 'English',
    title: 'Writing Skills: Report Writing',
    description: 'Prepare reports on recent events like "Safe Drive Save Life" campaign or "Teacher\'s Day Celebration". Format is crucial.',
    priority: 'High',
    tags: ['Writing', 'Grammar']
  },
  {
    id: 4,
    subject: 'Life Science',
    title: 'Diagrams to Practice',
    description: 'Neuron, Reflex Arc, and Metaphase stage of Mitosis. Practice labeling clearly.',
    priority: 'High',
    tags: ['Biology', 'Diagrams']
  },
  {
    id: 5,
    subject: 'History',
    title: 'Revolt of 1857',
    description: 'Understand the causes and failure of the revolt. Map pointing for centers of revolt is also important.',
    priority: 'Medium',
    tags: ['Modern History', 'Maps']
  }
];

export default function SuggestionsPage() {
  return (
    <div className="space-y-6">
      <div className="relative h-48 rounded-2xl overflow-hidden mb-8">
        <img 
          src="https://picsum.photos/seed/exam/1200/400" 
          alt="Exam Preparation" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-transparent flex items-center p-8">
          <div className="text-white max-w-lg">
            <h1 className="text-3xl font-bold mb-2">Exam Suggestions</h1>
            <p className="text-amber-100">Curated tips and important topics for your upcoming exams. Focus on what matters most.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SUGGESTIONS.map((suggestion) => (
          <div key={suggestion.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-bold uppercase">
                  {suggestion.subject}
                </span>
                {suggestion.priority === 'High' && (
                  <span className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> High Priority
                  </span>
                )}
              </div>
              <Lightbulb className="w-5 h-5 text-amber-500" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
              {suggestion.title}
            </h3>
            
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {suggestion.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50">
              {suggestion.tags.map((tag) => (
                <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-600 rounded-xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Need Personalized Guidance?</h2>
          <p className="text-indigo-100">Get a custom study plan based on your weak areas.</p>
        </div>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors whitespace-nowrap">
          Request Study Plan
        </button>
      </div>
    </div>
  );
}
