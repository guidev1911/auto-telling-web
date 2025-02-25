import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import Menu from "../components/menu";
import axios from "axios";
import logoAt from "../images/logo-at.png";

const Dashboard = () => {
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
    categoria: ""
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
      (filtros.preco_min ? parseFloat(carro.preco) >= parseFloat(filtros.preco_min.replace(/\./g, "")) : true) &&
      (filtros.preco_max ? parseFloat(carro.preco) <= parseFloat(filtros.preco_max.replace(/\./g, "")) : true) &&
      (filtros.quilometragem_min ? parseFloat(carro.quilometragem) >= parseFloat(filtros.quilometragem_min.replace(/\./g, "")) : true) &&
      (filtros.quilometragem_max ? parseFloat(carro.quilometragem) <= parseFloat(filtros.quilometragem_max.replace(/\./g, "")) : true) &&
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
  
    // Lista de campos que precisam de formatação
    const camposFormatados = ["preco_min", "preco_max", "quilometragem_min", "quilometragem_max"];
  
    let novoValor = value;
  
    if (camposFormatados.includes(name)) {
      // Remove tudo que não for número
      const numeroLimpo = value.replace(/\D/g, "");
  
      // Adiciona separadores de milhar com ponto
      if (numeroLimpo) {
        novoValor = Number(numeroLimpo).toLocaleString("pt-BR").replace(",", ".");
      }
    }
  
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [name]: novoValor,
    }));
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
              type="text"
              placeholder="Preço Mínimo"
              name="preco_min"
              value={filtros.preco_min}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Preço Máximo"
              name="preco_max"
              value={filtros.preco_max}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Quilometragem Mínima"
              name="quilometragem_min"
              value={filtros.quilometragem_min}
              onChange={handleFiltroChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
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
          </div>
        )}

        <table className="w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead className="bg-blue-900 text-white">
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
                //key={carro.id}
                className="hover:bg-gray-300 cursor-pointer"
                //onClick={() => setCarroSelecionado(carro)} 
              >
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
              <h2 className="text-3xl font-extrabold tracking-wide mb-4 font-sans">{carroSelecionado.modelo}</h2>
              <button
                onClick={() => setCarroSelecionado(null)}
                className="absolute top-2 right-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                X
              </button>
              <div className="w-full overflow-x-auto max-h-96 border border-blue-800 rounded-lg">
                <table className="w-full border-collapse text-white">
                  <tbody>
                    {[
                      ["Marca", carroSelecionado.marca],
                      ["Modelo", carroSelecionado.modelo],
                      ["Categoria", carroSelecionado.categoria],
                      ["Ano", carroSelecionado.ano],
                      ["Cor", carroSelecionado.cor],
                      ["Quilometragem", `${carroSelecionado.quilometragem} km`],
                      ["Potência", `${carroSelecionado.potencia} cv`],
                      ["Motor", carroSelecionado.motor],
                      ["Consumo médio Km/L", carroSelecionado.consumo_medio],
                      ["0km/h a 100km/h", `${carroSelecionado.zero_a_cem} s`],
                      ["Velocidade Final", `${carroSelecionado.velocidade_final} km/h`],
                      ["Número de portas", carroSelecionado.numero_portas],
                      ["Tração", carroSelecionado.tipo_tracao],
                      ["Características", carroSelecionado.caracteristicas],
                      [
                        "Preço",
                        `R$ ${parseFloat(carroSelecionado.preco).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}`,
                      ],
                      ["Status", carroSelecionado.status],
                    ].map(([label, value], index) => (
                      <tr key={index} className="border border-white-600">
                        <td className="px-4 py-2 font-semibold text-right bg-gray-900">{label}:</td>
                        <td className="px-4 py-2 bg-gray-500">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

