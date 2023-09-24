import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios'; 
import Navbar from '../components/navbar';

const Reports = () => {
  const userId = localStorage.getItem('userId');
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [despesas, setDespesas] = useState(0);
  const [receitas, setReceitas] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [chartInstance, setChartInstance] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/v1/entry?userId=${userId}`);
      setData(response.data);
      calcularDados();
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  };

  const calcularDados = () => {
    const filteredData = data.filter((entry) => {

        const dataString = entry.date

        const partes = dataString.split("/");
        const dia = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10);
        const ano = parseInt(partes[2], 10);

        // Crie um objeto Date com as partes
        const data = new Date(ano, mes - 1, dia);

        const entryDate = new Date(data);
        const entryMonth = entryDate.getMonth() + 1; 
        const entryYear = entryDate.getFullYear();

        return (
          entryMonth.toString() === selectedMonth &&
          entryYear.toString() === selectedYear
        );
      });

    const totalDespesas = filteredData
      .filter((entry) => entry.type === 'expense')
      .map((entry) => converterValor(entry.amount))
      .reduce((acc, val) => acc + val, 0);

    const totalReceitas = filteredData
      .filter((entry) => entry.type === 'revenue')
      .map((entry) => converterValor(entry.amount))
      .reduce((acc, val) => acc + val, 0);

    setDespesas(totalDespesas);
    setReceitas(totalReceitas);
    setSaldo(totalReceitas - totalDespesas);

    
  };

  useEffect(() => {
    if (chartInstance) {
      // Destrua o gráfico anterior se ele existir
      chartInstance.destroy();
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    const newChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Despesas', 'Receitas', 'Saldo'],
        datasets: [
          {
            label: 'Valores',
            data: [despesas, receitas, saldo],
            backgroundColor: ['#FF5733', '#33FF33', '#3366FF'],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Atualize o estado com a nova instância do gráfico
    setChartInstance(newChartInstance);
  }, [despesas, receitas, saldo]);


  function converterValor(valorComVirgula) {
    // Substitua ',' por '.' e converta para um número
    return parseFloat(valorComVirgula.replace(',', '.'));
  }

  const handleFetchData = () => {
    // Chame a função fetchData quando o botão for clicado
    fetchData();
  };

  return (
    <>
    <Navbar />
        <div>
        <div>
            <label>Mês:</label>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="">Selecione o mês</option>
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
            </select>
        </div>
        <div>
            <label>Ano:</label>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="">Selecione o ano</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            {/* Adicione mais anos conforme necessário */}
            </select>
        </div>
        <button onClick={handleFetchData}>Buscar Dados</button>
        <canvas id="myChart"></canvas>
        </div>
    </>
  );
};

export default Reports;
