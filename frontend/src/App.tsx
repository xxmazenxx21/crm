import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { LoginPage } from './pages/LoginPage';
import { SalesDashboard } from './pages/SalesDashboard';
import { ManagerDashboard } from './pages/ManagerDashboard';
import { DebugInfo } from './components/DebugInfo';
import { TailwindTest } from './components/TailwindTest';

// Protected Route Component
const ProtectedRoute = ({
  children,
  requiredRole,
  userRole,
}: {
  children: React.ReactNode;
  requiredRole?: 'sales' | 'manager';
  userRole?: string;
}) => {
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

function App() {
  const { user, loading, isAuthenticated, login, logout } = useAuth();

  // Simple test to verify Tailwind is working
  console.log('App rendering...');

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <DebugInfo />
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage onLogin={login} isLoading={loading} />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            isAuthenticated && user ? (
              <ProtectedRoute userRole={user.role}>
                {user.role === 'manager' ? (
                  <ManagerDashboard user={user} onLogout={logout} />
                ) : (
                  <SalesDashboard user={user} onLogout={logout} />
                )}
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
        
        {/* Tailwind Test Route */}
        <Route path="/test" element={<TailwindTest />} />
      </Routes>
    </Router>
  );
}

export default App;
