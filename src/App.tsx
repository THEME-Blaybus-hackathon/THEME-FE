import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import StudyPlan from './pages/StudyMain/StudyMain';
import LoginPage from './pages/Login/Login';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/studyplan" element={<StudyPlan />} />
    </Routes>
  );
}
