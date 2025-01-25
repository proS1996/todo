import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import LoginPage from '../pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;