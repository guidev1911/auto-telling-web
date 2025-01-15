import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="menu">
      <Link to="/dashboard" className="menu-item">Dashboard</Link>
      <Link to="/financiamento" className="menu-item">Financiamento</Link>
      <Link to="/outro" className="menu-item">Outro</Link>
    </div>
  );
};

export default Menu;
