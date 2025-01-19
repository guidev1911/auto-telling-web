import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="dashboard-menu">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/financiamento">Financiamento</Link>
      <Link to="/ipva">IPVA</Link>
      <div id="btSair">
      <Link to="/login">Sair</Link>
      </div>
    </div>
  );
};

export default Menu;
