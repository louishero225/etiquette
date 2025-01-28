import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Labels from './pages/Labels';
import PrintLabels from './pages/PrintLabels';
import Products from './pages/Products';
import TestSupabase from './pages/TestSupabase';

export default function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Redirection de la page d'accueil vers les étiquettes */}
          <Route index element={<Navigate to="/etiquettes" replace />} />
          
          {/* Page principale des étiquettes */}
          <Route path="etiquettes" element={<Labels />} />
          
          {/* Page d'impression des étiquettes */}
          <Route path="print" element={<PrintLabels />} />
        </Route>
      </Routes>
    </Router>
  );
}
