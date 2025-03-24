import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; 

const AddFuncModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    nivel: ""  
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:3001/auth/register", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Usuário cadastrado com sucesso!");
      onClose();
    } catch (err) {
      toast.error("Erro ao cadastrar usuário");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">Adicionar usuário</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            className="input-edit"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input-edit"
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            className="input-edit"
            required
          />
          <select
            name="nivel"
            value={formData.nivel}
            onChange={handleChange}
            className="input-edit"
            required
          >
            <option value="">Selecione o nível</option>
            <option value="vendedor">vendedor</option>
            <option value="gerente">gerente</option>
            <option value="admin">admin</option>
          </select>
            <div className="flex justify-start gap-4 mt-6">
              <button
                type="submit"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-blue-900"
              >
                Cadastrar
              </button>

              <button
              onClick={onClose}
              className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500"
            >
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFuncModal;
