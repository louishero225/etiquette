import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AnimatePresence } from 'framer-motion';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import Labels from './pages/Labels';
import PrintLabels from './pages/PrintLabels';
import Proforma from './pages/Proforma';
import Profile from './pages/Profile';
import './App.css';
import './styles/auth.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="w-full">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Routes publiques */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Routes protégées */}
            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/etiquettes" element={
              <PrivateRoute>
                <Labels />
              </PrivateRoute>
            } />
            <Route path="/print" element={
              <PrivateRoute>
                <PrintLabels />
              </PrivateRoute>
            } />
            <Route path="/proforma" element={
              <PrivateRoute>
                <Proforma />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
