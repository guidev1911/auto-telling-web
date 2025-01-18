import React, { useState } from 'react';
import '../styles/styles.css'; 
import Menu from '../components/menu';

const Financiamento = () => {
  const [nomeCliente, setNomeCliente] = useState('');
  const [nomeCarro, setNomeCarro] = useState('');
  const [valorCarro, setValorCarro] = useState('');
  const [valorEntrada, setValorEntrada] = useState('');
  const [tipoCarro, setTipoCarro] = useState('');
  const [parcelas, setParcelas] = useState('');
  const [resultado, setResultado] = useState(null);

  const formatarNumero = (valor) => {
    return valor
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); 
  };

  const handleInputChange = (setter) => (e) => {
    const valor = e.target.value.replace(/\D/g, ''); 
    setter(valor);
  };

  const calcularFinanciamento = () => {
    if (!nomeCliente || !nomeCarro || !valorCarro || !valorEntrada || !tipoCarro || !parcelas) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const valorCarroNumerico = parseFloat(valorCarro);
    const valorEntradaNumerico = parseFloat(valorEntrada);

    if (valorEntradaNumerico < valorCarroNumerico * 0.3) {
      return; 
    }

    let taxa = tipoCarro === 'novo' ? 0.012 : 0.02;
    let valorRestante = valorCarroNumerico - valorEntradaNumerico;

    for (let i = 0; i < parcelas; i++) {
      valorRestante += valorRestante * taxa;
    }

    const valorFinal = valorEntradaNumerico + valorRestante;
    const valorParcela = valorRestante / parseInt(parcelas, 10);

    setResultado({
      cliente: nomeCliente,
      carro: nomeCarro,
      valorFinal: valorFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      parcelas: parcelas,
      entrada: valorEntradaNumerico.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      valorParcela: valorParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    });
  };

  const valor30PorCento = formatarNumero(valorCarro * 0.3); 

  return (
    <div className="dashboard-container">
      <Menu />
      <div className="dashboard-content p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Simular Financiamento</h1>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Nome do cliente"
            value={nomeCliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Nome do carro"
            value={nomeCarro}
            onChange={(e) => setNomeCarro(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Valor do carro (R$)"
            value={formatarNumero(valorCarro)}
            onChange={handleInputChange(setValorCarro)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Valor da entrada (R$)"
            value={formatarNumero(valorEntrada)}
            onChange={handleInputChange(setValorEntrada)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {valorEntrada < valorCarro * 0.3 && (
            <p className="text-red-600 text-sm mb-2">
              O valor da entrada deve ser pelo menos 30% do valor do carro. Valor necessário: R${valor30PorCento}
            </p>
          )}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Tipo do carro:</label>
            <select
              value={tipoCarro}
              onChange={(e) => setTipoCarro(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione</option>
              <option value="novo">Novo</option>
              <option value="seminovo">Seminovo</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Parcelas:</label>
            <select
              value={parcelas}
              onChange={(e) => setParcelas(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione</option>
              {[12, 24, 36, 48].map((parcela) => (
                <option key={parcela} value={parcela}>
                  {parcela}x
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={calcularFinanciamento}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Calcular Financiamento
          </button>
          {resultado && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded shadow">
              <p>Nome do cliente: <strong>{resultado.cliente}</strong></p>
              <p>Carro: <strong>{resultado.carro}</strong></p>
              <p>Valor final do carro: <strong>{resultado.valorFinal}</strong></p>
              <p>Parcelas: <strong>{resultado.parcelas}</strong></p>
              <p>Valor da entrada: <strong>{resultado.entrada}</strong></p>
              <p>Valor da parcela: <strong>{resultado.valorParcela}</strong></p>
              <button
                onClick={() => window.print()}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Imprimir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Financiamento;
