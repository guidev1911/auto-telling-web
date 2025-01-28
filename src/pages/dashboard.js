import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import Menu from "../components/menu";
import axios from "axios";

const Dashboard = () => {
  const [carros, setCarros] = useState([]); // Lista de carros
  const [pesquisa, setPesquisa] = useState(""); // Busca por modelo
  const [carroSelecionado, setCarroSelecionado] = useState(null); // Detalhes do carro
  const [erro, setErro] = useState(""); // Mensagem de erro (se houver)

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

  // Filtra os carros com base no campo de pesquisa
  const carrosFiltrados = carros.filter((carro) =>
    carro.modelo.toLowerCase().includes(pesquisa.toLowerCase())
  );

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
            placeholder="Pesquisar por modelo..."
            className="border border-gray-300 rounded-l-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
          <button className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600">
            🔍
          </button>
        </div>

        {/* Tabela de carros */}
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4">Marca</th>
              <th className="py-2 px-4">Modelo</th>
              <th className="py-2 px-4">Ano</th>
              <th className="py-2 px-4">Cor</th>
              <th className="py-2 px-4">Preço</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {carrosFiltrados.map((carro) => (
              <tr
                key={carro.id}
                className="hover:bg-gray-200 cursor-pointer"
                onClick={() => setCarroSelecionado(carro)} // Define o carro selecionado
              >
                <td className="py-2 px-4">{carro.marca}</td>
                <td className="py-2 px-4">{carro.modelo}</td>
                <td className="py-2 px-4">{carro.ano}</td>
                <td className="py-2 px-4">{carro.cor}</td>
                <td className="py-2 px-4">
                  R$ {parseFloat(carro.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </td>
                <td className="py-2 px-4">{carro.status}</td>
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
                <strong>Categoria:</strong> {carroSelecionado.categoria}
              </p>
              <p>
                <strong>Cor:</strong> {carroSelecionado.cor}
              </p>
              <p>
                <strong>Motor:</strong> {carroSelecionado.motor}
              </p>
              <p>
                <strong>Velocidade Final:</strong> {carroSelecionado.velocidade_final} km/h
              </p>
              <p>
                <strong>Preço:</strong> R${" "}
                {parseFloat(carroSelecionado.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
              <p>
                <strong>Características:</strong> {carroSelecionado.caracteristicas}
              </p>
              <button
                className="bg-red-500 text-white p-2 rounded-lg mt-4 hover:bg-red-600"
                onClick={() => setCarroSelecionado(null)} // Fecha o modal
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

