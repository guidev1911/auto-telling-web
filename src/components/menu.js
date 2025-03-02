import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleClick = (path) => {
    setActiveLink(path);
  };
  
  return (
    <div className="w-[250px] bg-[#0B3674] p-4 flex flex-col items-center text-white fixed h-full">
      <Link 
        to="/dashboard" 
        className={`no-underline my-2 -mr-5 text-base text-center p-2 w-[107%] transition-all duration-500 ease-in-out flex justify-center items-center rounded-l-lg ${activeLink === '/dashboard' ? 'bg-white text-[#0B2A4C]' : 'text-white hover:bg-white hover:text-[#0B2A4C] hover:p-3'}`}
        onClick={() => handleClick('/dashboard')}
      >
        Dashboard
      </Link>
      <Link 
        to="/financiamento" 
        className={`no-underline my-2 -mr-5 text-base text-center p-2 w-[107%] transition-all duration-500 ease-in-out flex justify-center items-center rounded-l-lg ${activeLink === '/financiamento' ? 'bg-white text-[#0B2A4C]' : 'text-white hover:bg-white hover:text-[#0B2A4C] hover:p-3'}`}
        onClick={() => handleClick('/financiamento')}
      >
        Financiamento
      </Link>
      <Link 
        to="/ipva" 
        className={`no-underline my-2 -mr-5 text-base text-center p-2 w-[107%] transition-all duration-500 ease-in-out flex justify-center items-center rounded-l-lg ${activeLink === '/ipva' ? 'bg-white text-[#0B2A4C]' : 'text-white hover:bg-white hover:text-[#0B2A4C] hover:p-3'}`}
        onClick={() => handleClick('/ipva')}
      >
        IPVA
      </Link>
      <Link 
        to="/gerencia" 
        className={`no-underline my-2 -mr-5 text-base text-center p-2 w-[107%] transition-all duration-500 ease-in-out flex justify-center items-center rounded-l-lg ${activeLink === '/gerencia' ? 'bg-white text-[#0B2A4C]' : 'text-white hover:bg-white hover:text-[#0B2A4C] hover:p-3'}`}
        onClick={() => handleClick('/gerencia')}
      >
        Gerência
      </Link>
      <div id="btSair">
        <Link 
          to="/login" 
          className={`no-underline my-2 -mr-5 text-base text-center p-2 w-[107%] transition-all duration-500 ease-in-out flex justify-center items-center rounded-l-lg ${activeLink === '/login' ? 'bg-white text-[#0B2A4C]' : 'text-white hover:bg-white hover:text-[#0B2A4C] hover:p-3'}`}
          onClick={() => handleClick('/login')}
        >
          Sair
        </Link>
      </div>
    </div>
  );
};

export default Menu;
