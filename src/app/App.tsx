import { Routes, Route } from 'react-router-dom';

import HomePage from '@/pages/Home/ui/HomePage';
import StudyMainPage from '@/pages/study-main/ui/StudyMainPage';
import StudyPage from '@/pages/Study/ui/StudyPage';
import LoginPage from '@/pages/Login/ui/LoginPage';
import ProtectedRoute from '@/features/auth/ui/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/study" element={<StudyPage />} />
        <Route path="/study-main" element={<StudyMainPage />} />
      </Route>
    </Routes>
  );
}
