import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const [menu, setMenu] = useState('overview'); // Gerenciar o menu ativo
  const [isModalOpen, setIsModalOpen] = useState(false); // Controlar o estado do modal

  const handleNavigation = (section) => {
    setMenu(section); // Atualiza o menu selecionado
  };

  const openModal = () => {
    setIsModalOpen(true); // Abre o modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Fecha o modal
  };

  // Dados para o gráfico
  const data = {
    labels: ['Categoria A', 'Categoria B', 'Categoria C', 'Categoria D'],
    datasets: [
      {
        label: 'Horas Registradas',
        data: [12, 19, 8, 15],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Barra de navegação */}
      <nav className="bg-gray-800 text-white shadow-lg">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="space-x-4">
            <button
              className={`px-4 py-2 rounded ${
                menu === 'overview' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleNavigation('overview')}
            >
              Visão Geral
            </button>
            <button
              className="px-4 py-2 rounded hover:bg-gray-700"
              onClick={openModal}
            >
              Registrar Horas
            </button>
            <button
              className={`px-4 py-2 rounded ${
                menu === 'profile' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleNavigation('profile')}
            >
              Meu Perfil
            </button>
          </div>
        </div>
      </nav>

      {/* Área principal */}
      <main className="flex-1 bg-gray-100 p-6">
        {menu === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Visão Geral</h2>
            <div className="w-full md:w-1/2 mx-auto">
              <Bar data={data} options={options} />
            </div>
          </div>
        )}
        {menu === 'profile' && (
          <h2 className="text-xl">Aqui você pode ver e editar seu perfil.</h2>
        )}
      </main>

      {/* Modal do formulário */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Registrar Horas</h2>
            <form className="space-y-6">
              {/* Campo Título */}
              <div>
                <label htmlFor="title" className="block text-lg font-medium">
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Digite o título da atividade"
                />
              </div>

              {/* Campo Horas */}
              <div>
                <label htmlFor="hours" className="block text-lg font-medium">
                  Horas
                </label>
                <input
                  type="number"
                  id="hours"
                  className="w-1/3 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Digite as horas"
                />
              </div>

              {/* Campo Categoria */}
              <div>
                <label htmlFor="category" className="block text-lg font-medium">
                  Categoria
                </label>
                <select
                  id="category"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled selected>
                    Selecione uma categoria
                  </option>
                  <option value="cultural">Cultural</option>
                  <option value="esportiva">Esportiva</option>
                  <option value="acadêmica">Acadêmica</option>
                  <option value="voluntariado">Voluntariado</option>
                </select>
              </div>

              {/* Campo Upload */}
              <div>
                <label htmlFor="file" className="block text-lg font-medium">
                  Anexar Comprovante
                </label>
                <input
                  type="file"
                  id="file"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Campo Data */}
              <div>
                <label htmlFor="date" className="block text-lg font-medium">
                  Data do comprovante
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Botões */}
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
