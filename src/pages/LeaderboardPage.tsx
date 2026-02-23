import React from 'react';
import { Trophy, Medal, Crown, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LeaderboardPage() {
  const { user } = useAuth();

  // Mock leaderboard data
  const leaderboard = [
    { id: '101', name: 'Priya Das', points: 2450, level: 24, avatar: 'P' },
    { id: '102', name: 'Rahul Roy', points: 2100, level: 21, avatar: 'R' },
    { id: '103', name: 'Sneha Gupta', points: 1950, level: 19, avatar: 'S' },
    { id: '104', name: 'Amit Kumar', points: 1800, level: 18, avatar: 'A' },
    // Inject current user if not in top list for demo purposes
    ...(user ? [{ ...user, avatar: user.name.charAt(0).toUpperCase() }] : [])
  ].sort((a, b) => b.points - a.points).slice(0, 10); // Top 10

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-slate-900">Leaderboard</h1>
        <p className="text-slate-500 mt-2">Top students this week</p>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {leaderboard.map((student, index) => {
            const isCurrentUser = user && student.id === user.id;
            const rank = index + 1;
            
            let rankIcon;
            if (rank === 1) rankIcon = <Crown className="w-6 h-6 text-yellow-500 fill-yellow-500" />;
            else if (rank === 2) rankIcon = <Medal className="w-6 h-6 text-slate-400 fill-slate-400" />;
            else if (rank === 3) rankIcon = <Medal className="w-6 h-6 text-amber-600 fill-amber-600" />;
            else rankIcon = <span className="text-lg font-bold text-slate-400 w-6 text-center">{rank}</span>;

            return (
              <div 
                key={student.id + index} 
                className={cn(
                  "flex items-center gap-4 p-4 transition-colors",
                  isCurrentUser ? "bg-indigo-50" : "hover:bg-slate-50"
                )}
              >
                <div className="flex-shrink-0 w-8 flex justify-center">
                  {rankIcon}
                </div>
                
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                  {student.avatar}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={cn("font-medium truncate", isCurrentUser ? "text-indigo-900" : "text-slate-900")}>
                    {student.name} {isCurrentUser && "(You)"}
                  </p>
                  <p className="text-xs text-slate-500">Level {student.level}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-indigo-600">{student.points}</p>
                  <p className="text-xs text-slate-400">points</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { cn } from '../lib/utils';
