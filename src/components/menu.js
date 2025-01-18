import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="dashboard-menu">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/financiamento">Financiamento</Link>
      <Link to="/ipva">IPVA</Link>
      <Link to="/login" className="btSair">Sair</Link>
    </div>
  );
};

export default Menu;
