import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="menu">
      <Link to="/dashboard" className="menu-item">Dashboard</Link>
      {/* Adicione outras opções aqui */}
    </div>
  );
};

export default Menu;
