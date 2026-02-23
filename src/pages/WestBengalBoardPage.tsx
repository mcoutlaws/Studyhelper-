import React from 'react';
import { BookOpen, Download, ExternalLink, GraduationCap, FileText, ArrowRight } from 'lucide-react';

export default function WestBengalBoardPage() {
  const resources = [
    { title: 'Madhyamik (Class 10) Syllabus 2026', type: 'PDF', size: '2.4 MB' },
    { title: 'Higher Secondary (Class 12) Routine', type: 'PDF', size: '1.1 MB' },
    { title: 'Previous Year Question Papers (2020-2025)', type: 'ZIP', size: '45 MB' },
    { title: 'WBBSE Official Notification - Exam Dates', type: 'Link', url: '#' },
  ];

  const subjects = [
    { name: 'Bengali (First Language)', code: 'BNG' },
    { name: 'English (Second Language)', code: 'ENG' },
    { name: 'Mathematics', code: 'MATH' },
    { name: 'Physical Science', code: 'PHSC' },
    { name: 'Life Science', code: 'LTSC' },
    { name: 'History', code: 'HIST' },
    { name: 'Geography', code: 'GEOG' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 opacity-90">
              <GraduationCap className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">West Bengal Board of Secondary Education</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">WBBSE & WBCHSE Resources</h1>
            <p className="text-indigo-100 max-w-xl">
              Access official syllabus, previous year question papers, and study materials specifically curated for West Bengal Board students.
            </p>
          </div>
          <div className="hidden md:block bg-white/10 p-4 rounded-xl backdrop-blur-sm">
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider opacity-75 mb-1">Next Exam</p>
              <p className="text-2xl font-bold">Madhyamik</p>
              <p className="text-sm opacity-90">Feb 2026</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Subject Curriculum
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subjects.map((subject) => (
                <div key={subject.code} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">{subject.code}</span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  <h3 className="font-medium text-slate-900">{subject.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">View Syllabus & Chapters</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Important Downloads</h2>
            <div className="space-y-3">
              {resources.map((resource, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer">
                  <div className="mt-1">
                    {resource.type === 'Link' ? (
                      <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                    ) : (
                      <FileText className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 group-hover:text-indigo-700 transition-colors line-clamp-2">
                      {resource.title}
                    </p>
                    {resource.type !== 'Link' && (
                      <p className="text-xs text-slate-500 mt-0.5">{resource.type} • {resource.size}</p>
                    )}
                  </div>
                  {resource.type !== 'Link' && (
                    <Download className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                  )}
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
              View All Downloads
            </button>
          </section>

          <section className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl text-white">
            <h3 className="font-bold text-lg mb-2">Need Help?</h3>
            <p className="text-sm text-slate-300 mb-4">
              Join our West Bengal student community forum to discuss topics and share notes.
            </p>
            <button className="w-full py-2 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors text-sm">
              Join Community
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
