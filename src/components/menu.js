import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="dashboard-menu">
      <Link to="/dashboard" className="menu-item">Dashboard</Link>
      <Link to="/financiamento" className="menu-item">Financiamento</Link>
      <Link to="/ipva" className="menu-item">IPVA</Link>
    </div>
  );
};

export default Menu;
