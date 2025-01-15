import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/pages/login';                // Caminho correto para Login
import Dashboard from '../src/pages/dashboard';        // Caminho correto para Dashboard
import ProtectedRoute from '../src/components/protectedRoute';  // Caminho correto para ProtectedRoute
import Financiamento from '../src/pages/financiamento';   // Caminho correto para Financiamento

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute />} >
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/financiamento" element={<Financiamento />} /> {/* Acesso direto */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
