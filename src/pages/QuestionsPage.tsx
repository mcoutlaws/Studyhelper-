import React, { useState } from 'react';
import { BookOpen, FileText, ChevronDown, ChevronUp, Search } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    subject: 'Physical Science',
    chapter: 'Behavior of Gases',
    type: 'Short',
    question: 'What is Boyle\'s Law?',
    answer: 'Boyle\'s Law states that at constant temperature, the volume of a given mass of gas is inversely proportional to its pressure (V ∝ 1/P).'
  },
  {
    id: 2,
    subject: 'Life Science',
    chapter: 'Control and Coordination',
    type: 'Long',
    question: 'Describe the structure of a Neuron with a labeled diagram.',
    answer: 'A neuron consists of three main parts: Cell Body (Cyton), Dendrites, and Axon. [Diagram Placeholder] The cyton contains the nucleus and cytoplasm. Dendrites receive impulses, and the axon transmits them away from the cell body.'
  },
  {
    id: 3,
    subject: 'Mathematics',
    chapter: 'Quadratic Equations',
    type: 'Short',
    question: 'What is the discriminant of a quadratic equation ax² + bx + c = 0?',
    answer: 'The discriminant is D = b² - 4ac. If D > 0, roots are real and distinct. If D = 0, roots are real and equal. If D < 0, roots are imaginary.'
  },
  {
    id: 4,
    subject: 'History',
    chapter: 'Reform Characteristics',
    type: 'Long',
    question: 'Discuss the role of Raja Rammohan Roy in the social reforms of Bengal.',
    answer: 'Raja Rammohan Roy is known as the father of Indian Renaissance. He fought against Sati, advocated for women\'s rights, supported western education, and founded the Brahmo Samaj to reform Hindu society.'
  },
  {
    id: 5,
    subject: 'Geography',
    chapter: 'Exogenetic Processes',
    type: 'Short',
    question: 'What is a Gorge?',
    answer: 'A gorge is a deep, narrow valley with very steep sides, usually formed by a river flowing through a hard rock area. Example: The Indus Gorge.'
  }
];

export default function QuestionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'All' | 'Short' | 'Long'>('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredQuestions = QUESTIONS.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          q.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || q.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="relative h-48 rounded-2xl overflow-hidden mb-8">
        <img 
          src="https://picsum.photos/seed/study1/1200/400" 
          alt="Study Materials" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-transparent flex items-center p-8">
          <div className="text-white max-w-lg">
            <h1 className="text-3xl font-bold mb-2">Question Bank</h1>
            <p className="text-indigo-100">Access a vast collection of short and long answer type questions for your preparation.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search questions or subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          {['All', 'Short', 'Long'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type as any)}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedType === type 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type} Questions
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredQuestions.map((q) => (
          <div key={q.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div 
              className="p-4 cursor-pointer hover:bg-slate-50 transition-colors flex items-start gap-4"
              onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
            >
              <div className={`mt-1 p-2 rounded-lg flex-shrink-0 ${
                q.type === 'Short' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
              }`}>
                <FileText className="w-5 h-5" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {q.subject} • {q.chapter}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                    q.type === 'Short' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {q.type} Answer
                  </span>
                </div>
                <h3 className="font-medium text-slate-900 text-lg">{q.question}</h3>
              </div>

              <div className="text-slate-400">
                {expandedId === q.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>

            {expandedId === q.id && (
              <div className="px-4 pb-4 pl-[4.5rem] pr-8 text-slate-600 leading-relaxed border-t border-slate-50 pt-4 bg-slate-50/50">
                <p><span className="font-bold text-slate-900">Answer:</span> {q.answer}</p>
              </div>
            )}
          </div>
        ))}

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p>No questions found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
