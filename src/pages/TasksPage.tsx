import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, Calendar, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export default function TasksPage() {
  const { updatePoints } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Complete Math Chapter 5 Exercises', completed: false, priority: 'high', dueDate: '2026-02-25' },
    { id: '2', title: 'Read Physics Notes on Optics', completed: true, priority: 'medium', dueDate: '2026-02-24' },
    { id: '3', title: 'Write History Essay', completed: false, priority: 'low', dueDate: '2026-02-28' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      priority,
      dueDate: new Date().toISOString().split('T')[0],
    };

    setTasks([task, ...tasks]);
    setNewTask('');
    updatePoints(5); // Small reward for planning
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const isCompleting = !t.completed;
        if (isCompleting) {
          updatePoints(20); // Reward for completion
        }
        return { ...t, completed: isCompleting };
      }
      return t;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high': return 'text-red-600 bg-red-50 border-red-100';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'low': return 'text-green-600 bg-green-50 border-green-100';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Study Tasks</h1>
          <p className="text-slate-500">Manage your daily goals and earn points</p>
        </div>
        <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2">
          <Star className="w-4 h-4 fill-current" />
          <span>Complete tasks to level up!</span>
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new study task..."
          className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
          className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "group flex items-center gap-4 p-4 bg-white rounded-xl border transition-all",
              task.completed ? "border-slate-100 bg-slate-50 opacity-75" : "border-slate-200 hover:border-indigo-300 shadow-sm"
            )}
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                task.completed ? "bg-green-500 border-green-500 text-white" : "border-slate-300 hover:border-indigo-500 text-transparent"
              )}
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
            
            <div className="flex-1">
              <h3 className={cn("font-medium text-slate-900", task.completed && "line-through text-slate-500")}>
                {task.title}
              </h3>
              <div className="flex items-center gap-3 mt-1 text-xs">
                <span className={cn("px-2 py-0.5 rounded border", getPriorityColor(task.priority))}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
                {task.dueDate && (
                  <span className="flex items-center gap-1 text-slate-500">
                    <Calendar className="w-3 h-3" />
                    {task.dueDate}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => deleteTask(task.id)}
              className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p>No tasks yet. Add one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
