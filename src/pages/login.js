import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; 
import logoAt from "../images/logo-at.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { email, senha });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Email ou senha incorretos');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B1A30] to-white">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <img src={logoAt} alt="logo da auto-telling" className="w-32 h-auto" />
        </div>
  
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
  
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B1A30] focus:border-transparent bg-gray-100"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-black mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B1A30] focus:border-transparent bg-gray-100"
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800"
          >
            Entrar 
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
