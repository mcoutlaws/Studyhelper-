import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  board?: string;
  points: number;
  level: number;
  streak: number;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updatePoints: (amount: number) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check local storage for persisted user
    const storedUser = localStorage.getItem('studyHelperUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    // Ensure new fields exist if logging in with old data structure
    const fullUserData = {
      ...userData,
      points: userData.points || 0,
      level: userData.level || 1,
      streak: userData.streak || 0
    };
    setUser(fullUserData);
    localStorage.setItem('studyHelperUser', JSON.stringify(fullUserData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('studyHelperUser');
  };

  const updatePoints = (amount: number) => {
    if (!user) return;
    
    const newPoints = user.points + amount;
    // Simple level up logic: every 100 points is a level
    const newLevel = Math.floor(newPoints / 100) + 1;
    
    const updatedUser = { ...user, points: newPoints, level: newLevel };
    setUser(updatedUser);
    localStorage.setItem('studyHelperUser', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updatePoints, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
