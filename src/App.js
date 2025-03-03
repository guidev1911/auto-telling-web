import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/pages/login';             
import Dashboard from '../src/pages/dashboard';      
import ProtectedRoute from '../src/components/protectedRoute';  
import Financiamento from '../src/pages/financiamento';  
import Admin from './pages/admin'; 
import Ipva from '../src/pages/ipva'; 
import Gerencia from '../src/pages/gerencia'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute />} >
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/financiamento" element={<Financiamento />} />
        <Route path="/ipva" element={<Ipva />} />
        <Route path="/gerencia" element={<Gerencia />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
