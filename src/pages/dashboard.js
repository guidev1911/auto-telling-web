import React from 'react';
import '../styles/styles.css'; 
import Menu from '../components/menu';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <Menu />
            <div className="dashboard-content">
                <h1>Bem-vindo ao Dashboard</h1>
                <p>Selecione uma opção no menu à esquerda para navegar pelas páginas.</p>
            </div>
        </div>
    );
};

export default Dashboard;
