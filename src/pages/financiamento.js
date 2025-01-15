import React from 'react';
import '../styles/styles.css'; 
import { Link } from 'react-router-dom';

const Financiamento = () => {
  return (
    <div className="dashboard-container">
        <div className="dashboard-menu">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/financiamento">Financiamento</Link>
            <Link to="/ipva">Ipva</Link>
        </div>
        <div className="dashboard-content">
            <h1>Bem-vindo ao financiamento</h1>
            <p>Selecione uma opção no menu à esquerda para navegar pelas páginas.</p>
        </div>
    </div>
  );
};

export default Financiamento;
