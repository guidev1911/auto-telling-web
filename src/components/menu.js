import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [nivelUsuario, setNivelUsuario] = useState('');

  useEffect(() => {
    const nome = localStorage.getItem('nome');
    const nivel = localStorage.getItem('nivel'); 
    if (nome) setNomeUsuario(nome);
    if (nivel) setNivelUsuario(nivel);
  }, []);

  const handleClick = (path) => {
    if (isLinkEnabled(path)) {
      setActiveLink(path);
    }
  };

  const permissoes = {
    vendedor: ["/dashboard", "/financiamento", "/ipva"],
    gerente: ["/dashboard", "/financiamento", "/ipva", "/gerencia"],
    admin: ["/dashboard", "/financiamento", "/ipva", "/gerencia", "/admin"]
  };

  const isLinkEnabled = (path) => {
    return permissoes[nivelUsuario]?.includes(path);
  };

  return (
    <div className="w-[250px] bg-[#0B3674] p-4 flex flex-col items-center text-white fixed h-full">
      <div className="mb-6 text-center text-lg">
        {nomeUsuario ? `Olá, ${nomeUsuario}` : 'Olá, visitante'}
      </div>

      {["/dashboard", "/financiamento", "/ipva", "/gerencia", "/admin"].map((path) => (
        <Link
          key={path}
          to={isLinkEnabled(path) ? path : "#"}
          className={`no-underline my-2 -mr-5 text-base text-center p-2 w-[107%] transition-all duration-500 ease-in-out flex justify-center items-center rounded-l-lg ${
            activeLink === path ? 'bg-white text-[#0B2A4C]' : isLinkEnabled(path) ? 'text-white hover:bg-white hover:text-[#0B2A4C] hover:p-3' : 'opacity-50 cursor-not-allowed'
          }`}
          onClick={() => handleClick(path)}
        >
          {path === "/dashboard" ? "Dashboard" :
           path === "/financiamento" ? "Financiamento" :
           path === "/ipva" ? "IPVA" :
           path === "/gerencia" ? "Gerência" :
           "Administração"}
        </Link>
      ))}

      <div id="btSair">
        <Link 
          to="/login" 
          className="no-underline my-2 -mr-5 text-base text-center p-2 w-[107%] transition-all duration-500 ease-in-out flex justify-center items-center rounded-l-lg text-white hover:bg-white hover:text-[#0B2A4C] hover:p-3"
          onClick={() => handleClick('/login')}
        >
          Sair
        </Link>
      </div>
    </div>
  );
};

export default Menu;
