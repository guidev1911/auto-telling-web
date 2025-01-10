import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/pages/login';
import Dashboard from '../src/pages/dashboard';
import ProtectedRoute from '../src/components/protectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
