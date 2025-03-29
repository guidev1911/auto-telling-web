import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const EditCarModal = ({ isOpen, setIsOpen, carData, modalClose }) => {
  const [formData, setFormData] = useState(carData);

  useEffect(() => {
    setFormData(carData);
  }, [carData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(formData);
  };

  const handleUpdate = async (updatedData) => {
    const token = localStorage.getItem("token");
  
    const { id, ...dataWithoutId } = updatedData;
  
    try {
      const response = await fetch(`http://localhost:3001/carros/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(dataWithoutId), 
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        toast.success("Carro atualizado com sucesso!");
        setIsOpen(false);
        modalClose();
      } else {
        console.error("Erro na resposta:", responseData);
        toast.error(`❌ Erro ao atualizar carro: ${responseData.message || "Dados inválidos encontrados!"}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error("⚠️ Falha ao conectar com o servidor.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4 text-center">Alterar Carro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Marca */}
            <div>
              <label className="block mb-1">Marca:</label>
              <input
                type="text"
                name="marca"
                value={formData.marca || ""}
                onChange={handleChange}
                className="input-edit"
              />
            </div>
            {/* Modelo */}
            <div>
              <label className="block mb-1">Modelo:</label>
              <input
                type="text"
                name="modelo"
                value={formData.modelo || ""}
                onChange={handleChange}
                className="input-edit"
              />
            </div>
            {/* Categoria */}
            <div>
              <label className="block mb-1">Categoria:</label>
              <input
                type="text"
                name="categoria"
                value={formData.categoria || ""}
                onChange={handleChange}
                className="input-edit"
              />
            </div>
            {/* Ano */}
            <div>
              <label className="block mb-1">Ano:</label>
              <input
                type="number"
                name="ano"
                value={formData.ano || ""}
                onChange={handleChange}
                className="input-edit"
              />
            </div>
            {/* Cor */}
            <div>
              <label className="block mb-1">Cor:</label>
              <input
                type="text"
                name="cor"
                value={formData.cor || ""}
                onChange={handleChange}
                className="input-edit"
              />
            </div>
            {/* Quilometragem */}
            <div>
              <label className="block mb-1">Quilometragem:</label>
              <input
                type="number"
                name="quilometragem"
                value={formData.quilometragem || ""}
                onChange={handleChange}
                className="input-edit"
              />
            </div>
            {/* Potência */}
            <div>
              <label className="block mb-1">Potência:</label>
              <input
                type="number"
                name="potencia"
                value={formData.potencia || ""}
                onChange={handleChange}
                className="input-edit"
              />
            </div>
            {/* Motor */}
            <div>
              <label className="block mb-1">Motor:</label>
              <input
                type="text"
                name="motor"
                value={formData.motor || ""}
                onChange={handleChange}
                className="input-edit"
              />
            </div>
            {/* Zero a cem */}
            <div>
              <label className="block mb-1">Zero a cem:</label>
              <input
                type="number"
                step="0.01"
                name="zero_a_cem"
                value={formData.zero_a_cem || ""}
                onChange={handleChange}
                className="input-edit"
              />
            </div>
            {/* Velocidade Final */}
            <div>
              <label className="block mb-1">Velocidade Final - km/h :</label>
              <input
                type="number"
                name="velocidade_final"
                value={formData.velocidade_final || ""}
                onChange={handleChange}
                className="input-edit"
              />
            </div>
            {/* Preço */}
            <div>
              <label className="block mb-1">Preço:</label>
              <input
                type="number"
                step="0.01"
                name="preco"
                value={formData.preco || ""}
                onChange={handleChange}
                className="input-edit"
              />
            </div>
            {/* Número de Portas */}
            <div>
              <label className="block mb-1">Número de Portas:</label>
              <input
                type="number"
                name="numero_portas"
                value={formData.numero_portas || ""}
                onChange={handleChange}
                className="input-edit"
              />
            </div>
            {/* Tipo de Tração */}
            <div>
              <label className="block mb-1">Tipo de Tração:</label>
              <input
                type="text"
                name="tipo_tracao"
                value={formData.tipo_tracao || ""}
                onChange={handleChange}
                className="input-edit"
              />
            </div>
            {/* Consumo Médio */}
            <div>
              <label className="block mb-1">Consumo Médio (km/l):</label>
              <input
                type="text"
                name="consumo_medio"
                value={formData.consumo_medio || ""}
                onChange={handleChange}
                className="input-edit"
              />
            </div>
            {/* Status */}
            <div>
              <label className="block mb-1">Status:</label>
              <select
                name="status"
                value={formData.status || ""}
                onChange={handleChange}
                className="input-edit"
              >
                <option value="">Selecione o status</option>
                <option value="Disponível">Disponível</option>
                <option value="Indisponível">Indisponível</option>
              </select>
            </div>
            {/* Características */}
            <div className="md:col-span-3">
              <label className="block mb-1">Características:</label>
              <textarea
                name="caracteristicas"
                value={formData.caracteristicas || ""}
                onChange={handleChange}
                className="input-edit"
                rows="3"
              ></textarea>
            </div>
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
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCarModal;
