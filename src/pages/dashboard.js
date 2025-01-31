import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import Menu from "../components/menu";
import axios from "axios";

const Dashboard = () => {
  const [carros, setCarros] = useState([]); // Lista de carros
  const [pesquisa, setPesquisa] = useState(""); // Busca por marca e modelo
  const [carroSelecionado, setCarroSelecionado] = useState(null); // Detalhes do carro
  const [erro, setErro] = useState(""); // Mensagem de erro (se houver)
  const [filtrosAvancadosVisiveis, setFiltrosAvancadosVisiveis] = useState(false); // Controle de visibilidade dos filtros avançados
  const [filtros, setFiltros] = useState({
    potencia: "",
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
    categoria: ""
  });

  // Busca os carros da API com autenticação
  useEffect(() => {
    const buscarCarros = async () => {
      try {
        // Recupera o token do localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          setErro("Usuário não autenticado. Faça login novamente.");
          return;
        }

        // Faz a requisição com o token no cabeçalho
        const resposta = await axios.get("http://localhost:3001/carros", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCarros(resposta.data); // Define a lista de carros
        setErro(""); // Limpa o erro
      } catch (erro) {
        console.error("Erro ao buscar os carros:", erro);
        setErro("Não foi possível carregar os carros. Verifique sua conexão ou tente novamente mais tarde.");
      }
    };

    buscarCarros();
  }, []);

  // Filtra os carros com base nos campos de pesquisa e filtros avançados
  const carrosFiltrados = carros.filter((carro) => {
    const filtroPesquisa = carro.modelo.toLowerCase().includes(pesquisa.toLowerCase()) ||
      carro.marca.toLowerCase().includes(pesquisa.toLowerCase());

    const filtroFiltrosAvancados =
      (filtros.potencia ? carro.potencia.toString().includes(filtros.potencia) : true) &&
      (filtros.motor ? carro.motor.toLowerCase().includes(filtros.motor.toLowerCase()) : true) &&
      (filtros.velocidade_final ? carro.velocidade_final.toString().includes(filtros.velocidade_final) : true) &&
      (filtros.zero_a_cem ? carro.zero_a_cem.toString().includes(filtros.zero_a_cem) : true) &&
      (filtros.status ? carro.status.toLowerCase().includes(filtros.status.toLowerCase()) : true) &&
      (filtros.preco_min ? parseFloat(carro.preco) >= filtros.preco_min : true) &&
      (filtros.preco_max ? parseFloat(carro.preco) <= filtros.preco_max : true) &&
      (filtros.quilometragem_min ? carro.quilometragem >= filtros.quilometragem_min : true) &&
      (filtros.quilometragem_max ? carro.quilometragem <= filtros.quilometragem_max : true) &&
      (filtros.numero_portas ? carro.numero_portas === parseInt(filtros.numero_portas) : true) &&
      (filtros.tipo_tracao ? carro.tipo_tracao.toLowerCase().includes(filtros.tipo_tracao.toLowerCase()) : true) &&
      (filtros.ano_min ? carro.ano >= filtros.ano_min : true) &&
      (filtros.ano_max ? carro.ano <= filtros.ano_max : true) &&
      (filtros.categoria ? carro.categoria.toLowerCase().includes(filtros.categoria.toLowerCase()) : true);

    return filtroPesquisa && filtroFiltrosAvancados;
  });

  // Manipula a mudança de filtro
  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [name]: value,
    }));
  };

  return (
    <div className="dashboard-container">
      <Menu />
      <div className="dashboard-content p-6 bg-gray-100 min-h-screen">
        {/* Mensagem de erro */}
        {erro && <div className="text-red-500 font-bold mb-4">{erro}</div>}

        {/* Campo de busca */}
        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Pesquisar por marca ou modelo..."
            className="border border-gray-300 rounded-l-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
          <button className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600">
            🔍
          </button>
        </div>

        {/* Botão de Filtros Avançados */}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-600"
          onClick={() => setFiltrosAvancadosVisiveis(!filtrosAvancadosVisiveis)}
        >
          Filtros Avançados
        </button>

        {/* Filtros Avançados */}
        {filtrosAvancadosVisiveis && (
          <div className="grid grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="Potência"
              name="potencia"
              value={filtros.potencia}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Motor"
              name="motor"
              value={filtros.motor}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="number"
              placeholder="Velocidade Final"
              name="velocidade_final"
              value={filtros.velocidade_final}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="number"
              placeholder="0-100 Km/h"
              name="zero_a_cem"
              value={filtros.zero_a_cem}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Status"
              name="status"
              value={filtros.status}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="number"
              placeholder="Preço Mínimo"
              name="preco_min"
              value={filtros.preco_min}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="number"
              placeholder="Preço Máximo"
              name="preco_max"
              value={filtros.preco_max}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="number"
              placeholder="Quilometragem Mínima"
              name="quilometragem_min"
              value={filtros.quilometragem_min}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="number"
              placeholder="Quilometragem Máxima"
              name="quilometragem_max"
              value={filtros.quilometragem_max}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="number"
              placeholder="Número de Portas"
              name="numero_portas"
              value={filtros.numero_portas}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Tipo de Tração"
              name="tipo_tracao"
              value={filtros.tipo_tracao}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="number"
              placeholder="Ano Mínimo"
              name="ano_min"
              value={filtros.ano_min}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="number"
              placeholder="Ano Máximo"
              name="ano_max"
              value={filtros.ano_max}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Categoria"
              name="categoria"
              value={filtros.categoria}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
        )}

        {/* Tabela de carros */}
        <table className="w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
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
                onClick={() => setCarroSelecionado(carro)} // Define o carro selecionado
              >
                <td className="py-2 px-4 border">{carro.marca}</td>
                <td className="py-2 px-4 border">{carro.modelo}</td>
                <td className="py-2 px-4 border">{carro.ano}</td>
                <td className="py-2 px-4 border">{carro.cor}</td>
                <td className="py-2 px-4 border">
                  R$ {parseFloat(carro.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </td>
                <td className="py-2 px-4 border">
                {/* Status */}
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
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => setCarroSelecionado(carro)}
                >
                  Detalhes
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal com detalhes do carro */}
        {carroSelecionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/2 shadow-lg">
            <h2 className="text-xl font-bold mb-4">{carroSelecionado.modelo}</h2>
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
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

