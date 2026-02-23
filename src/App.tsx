import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import SubjectsPage from './pages/SubjectsPage';
import WestBengalBoardPage from './pages/WestBengalBoardPage';
import TasksPage from './pages/TasksPage';
import MCQPage from './pages/MCQPage';
import LeaderboardPage from './pages/LeaderboardPage';
import QuestionsPage from './pages/QuestionsPage';
import SuggestionsPage from './pages/SuggestionsPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="subjects" element={<SubjectsPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="questions" element={<QuestionsPage />} />
            <Route path="suggestions" element={<SuggestionsPage />} />
            <Route path="mcq" element={<MCQPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="wb-board" element={<WestBengalBoardPage />} />
            <Route path="admin" element={<AdminPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
