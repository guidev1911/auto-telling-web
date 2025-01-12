import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css'; 

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-menu">
                <Link to="/dashboard/option1">Opção 1</Link>
                <Link to="/dashboard/option2">Opção 2</Link>
                <Link to="/dashboard/option3">Opção 3</Link>
                <Link to="/dashboard/option4">Opção 4</Link>
            </div>
            <div className="dashboard-content">
                <h1>Bem-vindo ao Dashboard</h1>
                <p>Selecione uma opção no menu à esquerda para navegar pelas páginas.</p>
            </div>
        </div>
    );
};

export default Dashboard;


