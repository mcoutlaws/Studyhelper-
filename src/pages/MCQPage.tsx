import React, { useState } from 'react';
import { CheckCircle, XCircle, Trophy, ArrowRight, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

// Mock Data for Quizzes
const QUIZZES = [
  {
    id: 'math-1',
    subject: 'Mathematics',
    title: 'Algebra Basics',
    questions: [
      {
        id: 1,
        question: 'If 2x + 5 = 15, what is x?',
        options: ['2', '5', '10', '7.5'],
        correct: 1 // Index of correct answer
      },
      {
        id: 2,
        question: 'What is the square root of 144?',
        options: ['10', '11', '12', '14'],
        correct: 2
      },
      {
        id: 3,
        question: 'Simplify: 3(x + 2) - 2x',
        options: ['x + 6', 'x + 2', '5x + 6', 'x - 6'],
        correct: 0
      }
    ]
  },
  {
    id: 'phys-1',
    subject: 'Physics',
    title: 'Laws of Motion',
    questions: [
      {
        id: 1,
        question: 'Which law states F = ma?',
        options: ['First Law', 'Second Law', 'Third Law', 'Law of Gravitation'],
        correct: 1
      },
      {
        id: 2,
        question: 'What is the SI unit of Force?',
        options: ['Joule', 'Watt', 'Newton', 'Pascal'],
        correct: 2
      }
    ]
  }
];

export default function MCQPage() {
  const { updatePoints } = useAuth();
  const [activeQuiz, setActiveQuiz] = useState<typeof QUIZZES[0] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const startQuiz = (quiz: typeof QUIZZES[0]) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const submitAnswer = () => {
    if (selectedOption === null || !activeQuiz) return;
    
    const isCorrect = selectedOption === activeQuiz.questions[currentQuestionIndex].correct;
    if (isCorrect) {
      setScore(s => s + 1);
    }
    setIsAnswered(true);
  };

  const nextQuestion = () => {
    if (!activeQuiz) return;
    
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setShowResult(true);
    // Award points: 10 points per correct answer + 50 bonus for completion
    const pointsEarned = (score * 10) + 50;
    updatePoints(pointsEarned);
  };

  const reset = () => {
    setActiveQuiz(null);
    setShowResult(false);
  };

  if (showResult && activeQuiz) {
    const percentage = Math.round((score / activeQuiz.questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
        <div className="inline-flex p-6 rounded-full bg-yellow-100 text-yellow-600 mb-4">
          <Trophy className="w-16 h-16" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Quiz Completed!</h2>
          <p className="text-slate-500 mt-2">You scored {score} out of {activeQuiz.questions.length}</p>
        </div>
        
        <div className="text-5xl font-black text-indigo-600">
          {percentage}%
        </div>

        <div className="flex justify-center gap-4">
          <button 
            onClick={reset}
            className="px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            Back to Quizzes
          </button>
          <button 
            onClick={() => startQuiz(activeQuiz)}
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (activeQuiz) {
    const question = activeQuiz.questions[currentQuestionIndex];
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <button onClick={reset} className="text-slate-500 hover:text-slate-900 text-sm font-medium">
            Exit Quiz
          </button>
          <div className="text-sm font-medium text-slate-500">
            Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
          </div>
        </div>

        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex) / activeQuiz.questions.length) * 100}%` }}
          />
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6">{question.question}</h2>
          
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              let stateStyle = "border-slate-200 hover:border-indigo-300 hover:bg-slate-50";
              
              if (isAnswered) {
                if (idx === question.correct) {
                  stateStyle = "border-green-500 bg-green-50 text-green-700";
                } else if (idx === selectedOption) {
                  stateStyle = "border-red-500 bg-red-50 text-red-700";
                } else {
                  stateStyle = "border-slate-100 opacity-50";
                }
              } else if (selectedOption === idx) {
                stateStyle = "border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isAnswered}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border-2 font-medium transition-all flex justify-between items-center",
                    stateStyle
                  )}
                >
                  <span>{option}</span>
                  {isAnswered && idx === question.correct && <CheckCircle className="w-5 h-5 text-green-600" />}
                  {isAnswered && idx === selectedOption && idx !== question.correct && <XCircle className="w-5 h-5 text-red-600" />}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end">
            {!isAnswered ? (
              <button
                onClick={submitAnswer}
                disabled={selectedOption === null}
                className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                {currentQuestionIndex === activeQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Practice Quizzes</h1>
          <p className="text-slate-500">Test your knowledge and earn points</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {QUIZZES.map((quiz) => (
          <div key={quiz.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded inline-block mb-3">
              {quiz.subject}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{quiz.title}</h3>
            <p className="text-slate-500 text-sm mb-6">{quiz.questions.length} Questions</p>
            
            <button
              onClick={() => startQuiz(quiz)}
              className="w-full py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
            >
              Start Quiz
            </button>
          </div>
        ))}
        
        {/* Placeholder for more */}
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center text-slate-400">
          <p className="font-medium">More quizzes coming soon!</p>
          <p className="text-sm mt-1">Check back later</p>
        </div>
      </div>
    </div>
  );
}
