import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout.tsx';
import AuthLayout from './layouts/AuthLayout.tsx';
import DashboardLayout from './layouts/DashboardLayout.tsx';
import AdminLayout from './components/admin/AdminLayout.tsx';

// Public Pages
import HomePage from './pages/HomePage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import ServicesPage from './pages/ServicesPage.tsx';
import IrvePage from './pages/IrvePage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import ProjectsShowcasePage from './pages/ProjectsShowcasePage.tsx';

// Protected Pages
import DashboardPage from './pages/dashboard/DashboardPage.tsx';
import ProjectsPage from './pages/dashboard/ProjectsPage.tsx';
import QuotesPage from './pages/dashboard/QuotesPage.tsx';
import AppointmentsPage from './pages/dashboard/AppointmentsPage.tsx';
import ResourcesPage from './pages/dashboard/ResourcesPage.tsx';
import SupportPage from './pages/dashboard/SupportPage.tsx';
import ProfilePage from './pages/dashboard/ProfilePage.tsx';
import TestimonialsPage from './pages/dashboard/TestimonialsPage.tsx';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard.tsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/irve" element={<IrvePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/realisations" element={<ProjectsShowcasePage />} />
            </Route>
            
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
            
            {/* Dashboard/Protected Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/projects" element={<ProjectsPage />} />
              <Route path="/dashboard/quotes" element={<QuotesPage />} />
              <Route path="/dashboard/appointments" element={<AppointmentsPage />} />
              <Route path="/dashboard/resources" element={<ResourcesPage />} />
              <Route path="/dashboard/support" element={<SupportPage />} />
              <Route path="/dashboard/profile" element={<ProfilePage />} />
              <Route path="/dashboard/testimonials" element={<TestimonialsPage />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Router>
    </AuthProvider>
  );
}

export default App;