import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import StudyMain from './pages/StudyMain/StudyMain';
import Study from './pages/Study/Study';
import LoginPage from './pages/Login/Login';
import ProtectedRoute from './routes/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/study" element={<Study />} />
        <Route path="/study-main" element={<StudyMain />} />
      </Route>
    </Routes>
  );
}
