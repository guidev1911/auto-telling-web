import React, { useState, useEffect } from "react";

const AddCarModal = ({ isOpen, setIsOpen, carData, onSubmit }) => {
  const [isOpenInserir, setIsOpenInserir] = useState(false);
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

    const handleChange = (e) => {
        setCarData({ ...carData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
        ...carData,
        ano: carData.ano ? parseInt(carData.ano) : null,
        quilometragem: carData.quilometragem ? parseInt(carData.quilometragem) : null,
        potencia: carData.potencia ? parseInt(carData.potencia) : null,
        zero_a_cem: carData.zero_a_cem ? parseFloat(carData.zero_a_cem) : null,
        velocidade_final: carData.velocidade_final ? parseInt(carData.velocidade_final) : null,
        preco: carData.preco ? parseFloat(carData.preco) : null,
        numero_portas: carData.numero_portas ? parseInt(carData.numero_portas) : null,
        consumo_medio: carData.consumo_medio ? carData.consumo_medio.replace(" km/l", "") : null,
        tipo_tracao: carData.tipo_tracao,
        status: carData.status,
    };

};
  
    console.log("Enviando para API:", formattedData);

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[70%] max-w-5xl">
            <h2 className="text-xl font-bold mb-4 text-center">Adicionar Carro</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
              <input name="marca" placeholder="Marca" onChange={handleChange} className="input-base" required />
              <input name="modelo" placeholder="Modelo" onChange={handleChange} className="input-base" required />
              <input name="categoria" placeholder="Categoria" onChange={handleChange} className="input-base" required />
              <input name="ano" type="number" placeholder="Ano" onChange={handleChange} className="input-base" required />
              <input name="cor" placeholder="Cor" onChange={handleChange} className="input-base" required />
              <input name="quilometragem" type="number" placeholder="Quilometragem" onChange={handleChange} className="input-base" required />
              <input name="potencia" type="number" placeholder="Potência" onChange={handleChange} className="input-base" required />
              <input name="motor" placeholder="Motor" onChange={handleChange} className="input-base" required />
              <input name="zero_a_cem" type="number" step="0.1" placeholder="0 a 100 km/h (s)" onChange={handleChange} className="input-base" required />
              <input name="velocidade_final" type="number" placeholder="Velocidade Final" onChange={handleChange} className="input-base" required />
              <input name="preco" type="number" step="0.01" placeholder="Preço (R$)" onChange={handleChange} className="input-base" required />
              <input name="numero_portas" type="number" placeholder="Nº de Portas" onChange={handleChange} className="input-base" required />
              <select name="tipo_tracao" onChange={handleChange} className="input-base" required>
                <option value="">Selecione o tipo de tração</option>
                <option value="Traseira">Traseira</option>
                <option value="Dianteira">Dianteira</option>
                <option value="Integral">Integral</option>
              </select>
              <input name="consumo_medio" placeholder="Consumo Médio" onChange={handleChange} className="input-base" required />
              <select name="status" onChange={handleChange} className="input-base">
              <option value="">Selecione a status</option>
                <option value="Disponível">Disponível</option>
                <option value="Indisponível">Indisponível</option>
              </select>
              <textarea name="caracteristicas" placeholder="Características" onChange={handleChange} className="col-span-3 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              
              <div className="col-span-3 flex justify-between mt-4">
                <button type="button" onClick={() => setIsOpenInserir(false)} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancelar</button>
                <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800">Salvar</button>
              </div>
            </form>
          </div>
        </div>
    );
};
export default AddCarModal;