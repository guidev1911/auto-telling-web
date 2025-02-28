import { useState } from "react";
import { toast } from "react-toastify";

const AddCarModal = ({ isOpen, onClose }) => {
  const [carData, setCarData] = useState({
    marca: "",
    modelo: "",
    categoria: "",
    ano: "",
    cor: "",
    quilometragem: "",
    potencia: "",
    motor: "",
    zero_a_cem: "",
    velocidade_final: "",
    preco: "",
    numero_portas: "",
    tipo_tracao: "",
    consumo_medio: "",
    status: "",
    caracteristicas: "",
  });

  const formatNumber = (value) => {
    return value.replace(/\D/g, "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "quilometragem" || name === "preco") {
      setCarData({ ...carData, [name]: formatNumber(value) });
    } else {
      setCarData({ ...carData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...carData,
      ano: carData.ano ? parseInt(carData.ano) : null,
      quilometragem: carData.quilometragem ? parseInt(carData.quilometragem.replace(/\./g, "")) : null,
      potencia: carData.potencia ? parseInt(carData.potencia) : null,
      zero_a_cem: carData.zero_a_cem ? parseFloat(carData.zero_a_cem) : null,
      velocidade_final: carData.velocidade_final ? parseInt(carData.velocidade_final) : null,
      preco: carData.preco ? parseFloat(carData.preco.replace(/\./g, "")) : null,
      numero_portas: carData.numero_portas ? parseInt(carData.numero_portas) : null,
      consumo_medio: carData.consumo_medio ? carData.consumo_medio.replace(" km/l", "") : null,
      tipo_tracao: carData.tipo_tracao,
      status: carData.status,
    };

    console.log("Enviando para API:", formattedData);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3001/carros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success("Carro inserido com sucesso!");
        onClose();
      } else {
        console.error("Erro na resposta:", responseData);
        toast.error(`❌ Erro ao inserir carro: ${responseData.message || "Dados inválidos encontrados!"}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error("⚠️ Falha ao conectar com o servidor.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[70%] max-w-5xl">
        <h2 className="text-xl font-bold mb-4 text-center">Adicionar Carro</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
          <input name="marca" placeholder="Marca" onChange={handleChange} className="input-base" required />
          <input name="modelo" placeholder="Modelo" onChange={handleChange} className="input-base" required />
          <input name="categoria" placeholder="Categoria" onChange={handleChange} className="input-base" required />
          <input name="ano" type="number" placeholder="Ano" onChange={handleChange} className="input-base" required />
          <input name="cor" placeholder="Cor" onChange={handleChange} className="input-base" required />
          <input name="quilometragem" type="text" placeholder="Quilometragem" value={carData.quilometragem} onChange={handleChange} className="input-base" required />
          <input name="potencia" type="number" placeholder="Potência" onChange={handleChange} className="input-base" required />
          <input name="motor" placeholder="Motor" onChange={handleChange} className="input-base" required />
          <input name="zero_a_cem" type="number" step="0.1" placeholder="0 a 100 km/h (s)" onChange={handleChange} className="input-base" required />
          <input name="velocidade_final" type="number" placeholder="Velocidade Final" onChange={handleChange} className="input-base" required />
          <input name="preco" type="text" placeholder="Preço (R$)" value={carData.preco} onChange={handleChange} className="input-base" required />
          <input name="numero_portas" type="number" placeholder="Nº de Portas" onChange={handleChange} className="input-base" required />
          <select name="tipo_tracao" onChange={handleChange} className="input-base" required>
            <option value="">Selecione o tipo de tração</option>
            <option value="Traseira">Traseira</option>
            <option value="Dianteira">Dianteira</option>
            <option value="Integral">Integral</option>
          </select>
          <input name="consumo_medio" placeholder="Consumo Médio" onChange={handleChange} className="input-base" required />
          <select name="status" onChange={handleChange} className="input-base">
            <option value="">Selecione o status</option>
            <option value="Disponível">Disponível</option>
            <option value="Indisponível">Indisponível</option>
          </select>
          <textarea name="caracteristicas" placeholder="Características" onChange={handleChange} className="col-span-3 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <div className="col-span-3 flex justify-between mt-4">
            <button type="button" onClick={() => onClose && onClose()} className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">Cancelar</button>
            <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarModal;