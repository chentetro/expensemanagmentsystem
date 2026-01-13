import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ReportPage from './pages/ReportPage';
import StatisticsPage from './pages/StatisticsPage';
import NotFound from './components/NotFound';
import { CostsProvider } from './contexts/CostsContext';

function App() {
  return (
    <CostsProvider>
      <Router>
        {/* ה-Navbar ממוקם כאן כדי שיופיע בכל הדפים */}
        <Navbar /> 

        <Routes>
          {/* דף ההתחברות וההרשמה (שמכיל את הלוגיקה להחלפה ביניהם) */}
          <Route path="/login" element={<LoginPage />} />

          <Route path="/report" element={<ReportPage />} />

          <Route path="/statistics" element={<StatisticsPage />} />

          {/* דף ה-Dashboard המרכזי שבו נמצא טופס הוספת ההוצאות */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/notFound" element={<NotFound />} />

          {/* ברירת מחדל: הפניה לדף ההתחברות */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* במקרה של כתובת לא תקינה: חזרה להתחברות */}

          <Route path="*" element={<Navigate to="/notFound" />} />
        </Routes>
      </Router>
    </CostsProvider>
  );
}

export default App;