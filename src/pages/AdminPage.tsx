import React from 'react';
import { Users, BookOpen, Settings, AlertTriangle } from 'lucide-react';

export default function AdminPage() {
  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Student', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Student', status: 'Inactive' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Student', status: 'Active' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
          <p className="text-slate-500">Manage users and content</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Users</p>
            <p className="text-2xl font-bold text-slate-900">1,234</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Subjects</p>
            <p className="text-2xl font-bold text-slate-900">42</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Pending Reports</p>
            <p className="text-2xl font-bold text-slate-900">5</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">Recent Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-medium text-slate-900">{user.name}</td>
                  <td className="px-6 py-3 text-slate-500">{user.email}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      user.role === 'Admin' ? 'bg-purple-50 text-purple-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      user.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button className="text-indigo-600 hover:text-indigo-900 font-medium">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
