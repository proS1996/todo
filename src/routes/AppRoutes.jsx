import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import LoginPage from '../pages/LoginPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
