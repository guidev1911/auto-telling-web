import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditFuncModal = ({ isOpen, onClose, user, onUpdate }) => {
  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    email: "",
    nivel: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id || "",
        nome: user.nome || "",
        email: user.email || "",
        nivel: user.nivel || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.nivel) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (!formData.id) {
      alert("ID do funcionário não encontrado.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Token não encontrado. Você precisa estar logado.");
      return;
    }

    const formattedData = {
      nome: formData.nome.trim(),
      email: formData.email.trim().toLowerCase(),
      nivel: formData.nivel.trim(),
    };

    try {
      const response = await fetch(`http://localhost:3001/auth/user/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao atualizar os dados do funcionário");
      }

      const data = await response.json();
      onUpdate(data);
      onClose();
      toast.success("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      alert("Erro ao atualizar os dados. Tente novamente.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">Editar usuário</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ID:</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nome:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="input-edit"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-edit"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nível:</label>
            <select
              name="nivel"
              value={formData.nivel}
              onChange={handleChange}
              className="input-edit"
            >
              <option value="vendedor">vendedor</option>
              <option value="gerente">gerente</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <div className="flex justify-start gap-4 mt-6">
            <button
              type="submit"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-blue-900"
            >
              Salvar Alterações
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFuncModal;
