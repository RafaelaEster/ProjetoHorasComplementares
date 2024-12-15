import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Register from './Register';

const Account = () => {
  const { logOut, user } = UserAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/'); // Redireciona para a página inicial após logout
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  const handleRegisterClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Determinar o tipo de usuário com base no domínio do e-mail
  useEffect(() => {
    if (user) {
      const emailDomain = user.email.split('@')[1];
      if (emailDomain === 'aluno.ifsc.edu.br') {
        setUserRole('aluno');
      } else if (emailDomain === 'ifsc.edu.br') {
        setUserRole('professor');
      } else {
        setUserRole('outro');
      }
    }
  }, [user]);

  // Redirecionar usuários inválidos
  useEffect(() => {
    if (!user) {
      navigate('/'); // Redireciona para a página inicial se o usuário não estiver autenticado
    } else if (userRole === 'outro') {
      Swal.fire({
        title: 'Atenção',
        text: 'Por favor, use um e-mail institucional para acessar esta área.',
        icon: 'error',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/');
      });
    }
  }, [user, userRole, navigate]);

  if (!user) {
    return null; // Enquanto verifica autenticação, não renderiza nada
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {userRole === 'aluno' ? 'Painel do Aluno' : 'Painel do Professor'}
        </h1>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Sair
        </button>
      </div>

      {/* Botão de registro de horas */}
      <button
        onClick={handleRegisterClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Registrar Horas
      </button>

      {/* Modal de registro */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded shadow-md w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <Register />
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
