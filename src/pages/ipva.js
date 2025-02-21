import React, { useState } from 'react';
import '../styles/styles.css';
import Menu from '../components/menu';

const aliquotas = {
  AC: 2, AL: 2.5, AM: 3, AP: 3, BA: 2.5, CE: 3, DF: 3.5, ES: 2, GO: 3.5, MA: 3, MT: 3,
  MS: 3.5, MG: 4, PA: 2.5, PB: 3, PR: 3.5, PE: 3, PI: 3, RJ: 4, RN: 3, RS: 3, RO: 2.5,
  RR: 3, SC: 2, SE: 2.5, SP: 4, TO: 3,
};

const nomesEstados = {
  AC: 'Acre', AL: 'Alagoas', AM: 'Amazonas', AP: 'Amapá', BA: 'Bahia', CE: 'Ceará', DF: 'Distrito Federal',
  ES: 'Espírito Santo', GO: 'Goiás', MA: 'Maranhão', MT: 'Mato Grosso', MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais', PA: 'Pará', PB: 'Paraíba', PR: 'Paraná', PE: 'Pernambuco', PI: 'Piauí',
  RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte', RS: 'Rio Grande do Sul', RO: 'Rondônia', RR: 'Roraima',
  SC: 'Santa Catarina', SE: 'Sergipe', SP: 'São Paulo', TO: 'Tocantins',
};

const Ipva = () => {
  const [valorCarro, setValorCarro] = useState('');
  const [estado, setEstado] = useState('');
  const [resultado, setResultado] = useState(null);

  const formatarValor = (valor) => {
    const numeroLimpo = valor.replace(/\D/g, ''); 
    const numero = parseFloat(numeroLimpo) / 100; 
    return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const handleInputChange = (e) => {
    const valorDigitado = e.target.value;
    if (!valorDigitado) {
      setValorCarro('');
      return;
    }
    setValorCarro(formatarValor(valorDigitado));
  };

  const calcularIpva = () => {
    const valorNumerico = parseFloat(valorCarro.replace(/\./g, '').replace(',', '.')); 
    const aliquota = aliquotas[estado];
    if (!isNaN(valorNumerico) && aliquota) {
      const ipva = valorNumerico * (aliquota / 100);
      setResultado({
        estado: nomesEstados[estado],
        valor: formatarMoeda(ipva),
      });
    } else {
      setResultado(null);
    }
  };

  return (
    <div className="dashboard-container">
      <Menu />
      <div className="dashboard-content p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Cálculo de IPVA</h1>
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="valorCarro" className="block text-gray-700 font-semibold mb-2">
              Valor do carro (R$):
            </label>
            <input
              id="valorCarro"
              type="text"
              value={valorCarro}
              onChange={handleInputChange}
              placeholder="Ex.: 50.000,00"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="estado" className="block text-gray-700 font-semibold mb-2">
              Selecione o estado:
            </label>
            <select
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione o estado</option>
              {Object.keys(aliquotas).map((uf) => (
                <option key={uf} value={uf}>
                  {nomesEstados[uf]}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={calcularIpva}
            className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition"
          >
            Calcular IPVA
          </button>
          {resultado && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded shadow">
              <p>
                O IPVA para o estado de <strong>{resultado.estado}</strong> é de{' '}
                <strong>{resultado.valor}</strong>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ipva;
