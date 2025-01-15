import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css'; 

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-menu">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/financiamento">Financiamento</Link>
                <Link to="/ipva">Ipva</Link>
            </div>
            <div className="dashboard-content">
                <h1>Bem-vindo ao Dashboard</h1>
                <p>Selecione uma opção no menu à esquerda para navegar pelas páginas.</p>
            </div>
        </div>
    );
};

export default Dashboard;
