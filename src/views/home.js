import React , { useState, useEffect } from "react";
import Chart from 'chart.js/auto';
import axios from "axios";
import Navbar from "./components/navbar";

const Home = () => {
    const userId = localStorage.getItem('userId');
    const [despesas, setDespesas] = useState(0);
    const [receitas, setReceitas] = useState(0);
    const [saldo, setSaldo] = useState(0);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/v1/entry?userId=${userId}`);
            const data = response.data;
    
            const totalDespesas = data
              .filter((entry) => entry.type === 'expense')
              .map((entry) => converterValor(entry.amount))
              .reduce((acc, val) => acc + val, 0);
    
            const totalReceitas = data
              .filter((entry) => entry.type === 'revenue')
              .map((entry) => converterValor(entry.amount))
              .reduce((acc, val) => acc + val, 0);
    
            setDespesas(totalDespesas);
            setReceitas(totalReceitas);
            setSaldo(totalReceitas - totalDespesas);
    
            // Atualize o gráfico sempre que os dados forem atualizados
            updateChart(totalDespesas, totalReceitas, totalReceitas - totalDespesas);
          } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
          }
        };
    
        fetchData();
      }, [userId]);
    
      useEffect(() => {
        // Limpe o gráfico anterior ao desmontar o componente
        return () => {
          if (chartInstance) {
            chartInstance.destroy();
          }
        };
      }, [chartInstance]);
    
      function updateChart(despesas, receitas, saldo) {
        if (chartInstance) {
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
    
        setChartInstance(newChartInstance);
      }
    
      function converterValor(valorComVirgula) {
        return parseFloat(valorComVirgula.replace(',', '.'));
      }

      return (
        <>
        <Navbar />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-4">
              <div className="card bg-danger">
                <div className="card-body">
                  <h5 className="card-title text-white">Despesas</h5>
                  <p className="card-text text-white">Total: R${despesas.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card bg-success">
                <div className="card-body">
                  <h5 className="card-title text-white">Receitas</h5>
                  <p className="card-text text-white">Total: R${receitas.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card bg-primary">
                <div className="card-body">
                  <h5 className="card-title text-white">Saldo</h5>
                  <p className="card-text text-white">Saldo: R${saldo.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-10">
              <canvas id="myChart"></canvas>
            </div>
          </div>
        </div>
        </>
      );
}

export default Home;