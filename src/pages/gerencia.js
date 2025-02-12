import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import Menu from "../components/menu";
import axios from "axios";
import logoAt from "../images/logo-at.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Gerencia = () => {
  const [carros, setCarros] = useState([]); 
  const [pesquisa, setPesquisa] = useState(""); 
  const [carroSelecionado, setCarroSelecionado] = useState(null); 
  const [erro, setErro] = useState(""); 
  const [filtrosAvancadosVisiveis, setFiltrosAvancadosVisiveis] = useState(false); 
  const [filtros, setFiltros] = useState({
    potencia_min: "",
    potencia_max: "",
    motor: "",
    velocidade_final: "",
    zero_a_cem: "",
    status: "",
    preco_min: "",
    preco_max: "",
    quilometragem_min: "",
    quilometragem_max: "",
    numero_portas: "",
    tipo_tracao: "",
    ano_min: "",
    ano_max: "",
    categoria: "",
    id: ""
  });

  useEffect(() => {
    const buscarCarros = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setErro("Usuário não autenticado. Faça login novamente.");
          return;
        }

        const resposta = await axios.get("http://localhost:3001/carros", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCarros(resposta.data); 
        setErro("");
      } catch (erro) {
        console.error("Erro ao buscar os carros:", erro);
        setErro("Não foi possível carregar os carros. Verifique sua conexão ou tente novamente mais tarde.");
      }
    };

    buscarCarros();
  }, []);

  const carrosFiltrados = carros.filter((carro) => {
    const filtroPesquisa = carro.modelo.toLowerCase().includes(pesquisa.toLowerCase()) ||
      carro.marca.toLowerCase().includes(pesquisa.toLowerCase());

    const filtroFiltrosAvancados =
      (filtros.potencia_min ? parseFloat(carro.potencia) >= filtros.potencia_min : true) &&
      (filtros.potencia_max ? parseFloat(carro.potencia) <= filtros.potencia_max : true) &&
      (filtros.motor ? carro.motor.toLowerCase().includes(filtros.motor.toLowerCase()) : true) &&
      (filtros.velocidade_final ? parseFloat(carro.velocidade_final) >= filtros.velocidade_final : true) &&
      (filtros.zero_a_cem ? carro.zero_a_cem.toString().includes(filtros.zero_a_cem) : true) &&
      (filtros.status ? carro.status.includes(filtros.status) : true) &&
      (filtros.preco_min ? parseFloat(carro.preco) >= filtros.preco_min : true) &&
      (filtros.preco_max ? parseFloat(carro.preco) <= filtros.preco_max : true) &&
      (filtros.quilometragem_min ? carro.quilometragem >= filtros.quilometragem_min : true) &&
      (filtros.quilometragem_max ? carro.quilometragem <= filtros.quilometragem_max : true) &&
      (filtros.numero_portas ? carro.numero_portas === parseInt(filtros.numero_portas) : true) &&
      (filtros.tipo_tracao ? carro.tipo_tracao.toLowerCase().includes(filtros.tipo_tracao.toLowerCase()) : true) &&
      (filtros.ano_min ? carro.ano >= filtros.ano_min : true) &&
      (filtros.ano_max ? carro.ano <= filtros.ano_max : true) &&
      (filtros.categoria ? carro.categoria.toLowerCase().includes(filtros.categoria.toLowerCase()) : true) &&
      (filtros.id ? carro.id === parseInt(filtros.id) : true) ;

    return filtroPesquisa && filtroFiltrosAvancados;
  });

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [name]: value,
    }));
  };

  const [isOpen, setIsOpen] = useState(false);
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
      status: carData.status === "Disponível" ? "Disponível" : "Indisponível",
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
        toast.success("Carro inserido com sucesso!", {
          autoClose: 2000, 
          onClose: () => window.location.reload(), 
        });
        setIsOpen(false);
      } else {
        console.error("Erro na resposta:", responseData);
        toast.error(`❌ Erro ao inserir carro: ${responseData.message || "Erro desconhecido"}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error("⚠️ Falha ao conectar com o servidor.");
    }
  };

  return (
    <div className="dashboard-container">
      <Menu />
      <div className="dashboard-content p-6 bg-gray-100 min-h-screen">
        {erro && <div className="text-red-500 font-bold mb-4">{erro}</div>}

        <div className="mb-4 flex items-center justify-start">
          <div className="flex w-full max-w-md rounded-2xl shadow-md overflow-hidden border border-gray-300">
            <input
              type="text"
              placeholder="Pesquisar por marca ou modelo..."
              className="p-3 w-full focus:outline-none text-gray-700 placeholder-gray-400"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
            <button className="bg-blue-900 text-white p-3 hover:bg-blue-800 transition duration-500">
              🔍︎
            </button>
          </div>
          <div className="ml-auto">
            <img src={logoAt} alt="logo da auto-telling" />
          </div>
        </div>

        <button
          className="bg-blue-900 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-800"
          onClick={() => setFiltrosAvancadosVisiveis(!filtrosAvancadosVisiveis)}
        >
          Filtros Avançados
        </button>

        <button
        onClick={() => setIsOpen(true)}
        className="ml-4 bg-blue-900 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-800"
        >
          Inserir novo carro
        </button>

        {filtrosAvancadosVisiveis && (
          <div className="grid grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="Potência máxima"
              name="potencia_max"
              value={filtros.potencia_max}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Potência mínima"
              name="potencia_min"
              value={filtros.potencia_min}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Motor"
              name="motor"
              value={filtros.motor}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Velocidade Final"
              name="velocidade_final"
              value={filtros.velocidade_final}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="0-100 Km/h"
              name="zero_a_cem"
              value={filtros.zero_a_cem}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          <select
            name="status"
            value={filtros.status}
            onChange={handleFiltroChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione o status</option>
            <option value="Disponível">Disponível</option>
            <option value="Indisponível">Indisponível</option>
          </select>
            <input
              type="number"
              placeholder="Preço Mínimo"
              name="preco_min"
              value={filtros.preco_min}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Preço Máximo"
              name="preco_max"
              value={filtros.preco_max}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Quilometragem Mínima"
              name="quilometragem_min"
              value={filtros.quilometragem_min}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Quilometragem Máxima"
              name="quilometragem_max"
              value={filtros.quilometragem_max}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="tipo_tracao"
              value={filtros.tipo_tracao}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione o tipo de tração</option>
              <option value="Traseira">Traseira</option>
              <option value="Dianteira">Dianteira</option>
              <option value="Integral">Integral</option>
            </select>
            <input
              type="number"
              placeholder="Ano Mínimo"
              name="ano_min"
              value={filtros.ano_min}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Número de Portas"
              name="numero_portas"
              value={filtros.numero_portas}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Ano Máximo"
              name="ano_max"
              value={filtros.ano_max}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Categoria"
              name="categoria"
              value={filtros.categoria}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Buscar por id"
              name="id"
              value={filtros.id}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

      {isOpen && (
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
                <option value="Disponível">Disponível</option>
                <option value="Indisponível">Indisponível</option>
              </select>
              <textarea name="caracteristicas" placeholder="Características" onChange={handleChange} className="col-span-3 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              
              <div className="col-span-3 flex justify-between mt-4">
                <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancelar</button>
                <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

        <table className="w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="py-2 px-4 border">Id</th>
              <th className="py-2 px-4 border">Marca</th>
              <th className="py-2 px-4 border">Modelo</th>
              <th className="py-2 px-4 border">Ano</th>
              <th className="py-2 px-4 border">Cor</th>
              <th className="py-2 px-4 border">Preço</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {carrosFiltrados.map((carro) => (
              <tr
                key={carro.id}
                className="hover:bg-gray-200 cursor-pointer"
                //onClick={() => setCarroSelecionado(carro)} 
              >
                <td className="py-2 px-4 border">{carro.id}</td>
                <td className="py-2 px-4 border">{carro.marca}</td>
                <td className="py-2 px-4 border">{carro.modelo}</td>
                <td className="py-2 px-4 border">{carro.ano}</td>
                <td className="py-2 px-4 border">{carro.cor}</td>
                <td className="py-2 px-4 border">
                  R$ {parseFloat(carro.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </td>
                <td className="py-2 px-4 border">
                <span
                  className={`inline-block px-4 py-2 rounded-full text-white ${
                    carro.status.toLowerCase() === "disponível" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {carro.status}
                </span>
              </td>
              <td className="py-2 px-4 border">
                <button
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                  onClick={() => setCarroSelecionado(carro)}
                >
                  Detalhes
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>

        {carroSelecionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white p-6 rounded-lg w-1/2 shadow-lg">
              <h2 className="text-xl font-bold mb-4">{carroSelecionado.modelo}</h2>
              <button
                onClick={() => setCarroSelecionado(null)}
                className="absolute top-2 right-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                X
              </button>
            <p>
              <strong>Id:</strong> {carroSelecionado.id}
            </p>
            <p>
              <strong>Marca:</strong> {carroSelecionado.marca}
            </p>
            <p>
              <strong>Modelo:</strong> {carroSelecionado.modelo}
            </p>
            <p>
              <strong>Categoria:</strong> {carroSelecionado.categoria}
            </p>
            <p>
              <strong>Ano:</strong> {carroSelecionado.ano}
            </p>
            <p>
              <strong>Cor:</strong> {carroSelecionado.cor}
            </p>
            <p>
              <strong>Quilometragem:</strong> {carroSelecionado.quilometragem} km
            </p>
            <p>
              <strong>Potência:</strong> {carroSelecionado.potencia} cv
            </p>
            <p>
              <strong>Motor:</strong> {carroSelecionado.motor}
            </p>
            <p>
              <strong>Consumo médio Km/L:</strong> {carroSelecionado.consumo_medio}
            </p>
            <p>
              <strong>0km/h a 100km/h:</strong> {carroSelecionado.zero_a_cem} s
            </p>
            <p>
              <strong>Velocidade Final:</strong> {carroSelecionado.velocidade_final} km/h
            </p>
            <p>
              <strong>Número de portas:</strong> {carroSelecionado.numero_portas}
            </p>
            <p>
              <strong>Tração:</strong> {carroSelecionado.tipo_tracao}
            </p>
            <p>
              <strong>Características:</strong> {carroSelecionado.caracteristicas}
            </p>
            <p>
              <strong>Preço:</strong> R${" "}
              {parseFloat(carroSelecionado.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
            <p>
              <strong>Status:</strong> {carroSelecionado.status}
            </p>
              <button
              onClick={() => setCarroSelecionado(null)}
              className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
              >
                Alterar
              </button>
              <button
              onClick={() => setCarroSelecionado(null)}
              className="mt-4 ml-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Deletar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gerencia;

