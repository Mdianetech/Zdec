import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './hooks/useAuth';

// Layouts
import MainLayout from './layouts/MainLayout.tsx';

// Public Pages
import HomePage from './pages/HomePage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import ServicesPage from './pages/ServicesPage.tsx';
import IrvePage from './pages/IrvePage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import ProjectsShowcasePage from './pages/ProjectsShowcasePage.tsx';

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
          </Routes>
        </AnimatePresence>
      </Router>
    </AuthProvider>
  );
}

export default App;