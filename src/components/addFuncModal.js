import React, { useState } from "react";
import axios from "axios";

const AddFuncModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    nivel: ""  
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:3001/auth/register", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Usuário cadastrado com sucesso!");
      onClose();
    } catch (err) {
      setError("Erro ao cadastrar usuário");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Adicionar Usuário</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            required
          />
          <select
            name="nivel"
            value={formData.nivel}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            required
          >
            <option value="">Selecione o nível</option>
            <option value="vendedor">vendedor</option>
            <option value="gerente">gerente</option>
            <option value="admin">admin</option>
          </select>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white rounded-md"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:text-gray-700"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default AddFuncModal;
