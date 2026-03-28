import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Spinner from './components/common/Spinner';

// Lazy load pages
const Home        = lazy(() => import('./pages/Home'));
const About       = lazy(() => import('./pages/About'));
const Academics   = lazy(() => import('./pages/Academics'));
const Admissions  = lazy(() => import('./pages/Admissions'));
const Gallery     = lazy(() => import('./pages/Gallery'));
const Contact     = lazy(() => import('./pages/Contact'));
const Login       = lazy(() => import('./pages/Login'));
const AdminDash   = lazy(() => import('./pages/AdminDashboard'));
const StudentDash = lazy(() => import('./pages/StudentDashboard'));
const NotFound    = lazy(() => import('./pages/NotFound'));

// Protected route wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return <Spinner fullScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user?.role)) return <Navigate to="/" replace />;
  return children;
};

// Layout with Navbar + Footer
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);

const App = () => (
  <HelmetProvider>
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { fontFamily: 'DM Sans, sans-serif', borderRadius: '12px' },
              success: { iconTheme: { primary: '#f97316', secondary: '#fff' } },
            }}
          />
          <Suspense fallback={<Spinner fullScreen />}>
            <Routes>
              {/* Public pages */}
              <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/academics" element={<PublicLayout><Academics /></PublicLayout>} />
              <Route path="/admissions" element={<PublicLayout><Admissions /></PublicLayout>} />
              <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
              <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
              <Route path="/login" element={<Login />} />

              {/* Protected dashboards */}
              <Route path="/admin/*" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDash />
                </ProtectedRoute>
              } />
              <Route path="/student/*" element={
                <ProtectedRoute allowedRoles={['student', 'admin']}>
                  <StudentDash />
                </ProtectedRoute>
              } />

              <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
