import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ReportPage from './pages/ReportPage';
import StatisticsPage from './pages/StatisticsPage';
import NotFoundPage from './pages/NotFoundPage';
import { CostsProvider } from './contexts/CostsContext';

function App() {
  return (
    <CostsProvider>
      <Router>
        {/* Navbar is rendered here so it appears on all pages */}
        <Navbar /> 

        <Routes>
          {/* Login/Register page (contains the toggle logic) */}
          <Route path="/login" element={<LoginPage />} />

          <Route path="/report" element={<ReportPage />} />

          <Route path="/statistics" element={<StatisticsPage />} />

          {/* Main dashboard page with add-cost form */}
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/notFound" element={<NotFoundPage />} />

          {/* Default route redirects to login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Invalid route redirects to not-found */}

          <Route path="*" element={<Navigate to="/notFound" />} />
        </Routes>
      </Router>
    </CostsProvider>
  );
}

export default App;