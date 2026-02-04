import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import StudyPlan from './pages/StudyMain/StudyMain';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/studyplan" element={<StudyPlan />} />
    </Routes>
  );
}
