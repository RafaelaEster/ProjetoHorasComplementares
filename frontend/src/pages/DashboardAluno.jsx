import React, { useState } from 'react';
import { db, addDoc, collection, uploadFile } from '../firebase'; // Importando do arquivo firebase.js

const DashboardAluno = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    data: '',
    horas: '',
    categoria: '',
    arquivo: null,
  });
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData({
      ...formData,
      [id]: files[0], // Pegando o primeiro arquivo enviado
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // Se já estiver carregando, impede o envio

    setLoading(true); // Inicia o carregamento (desabilita o botão)

    try {
      // Primeiro, faz o upload do arquivo e obtém a URL
      const arquivoURL = await uploadFile(formData.arquivo);

      // Agora, salva os dados no Firestore, incluindo a URL do arquivo
      await addDoc(collection(db, 'atividades'), {
        titulo: formData.titulo,
        data: formData.data,
        horas: formData.horas,
        categoria: formData.categoria,
        arquivoURL: arquivoURL, // URL do arquivo enviado
      });

      alert('Atividade registrada com sucesso!');
      closeModal(); // Fecha o modal após o envio
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao enviar dados!');
    } finally {
      setLoading(false); // Finaliza o carregamento (habilita o botão novamente)
    }
  };

  return (
    <div className="h-screen bg-gray-100 p-6 flex flex-col">
      <button
        onClick={openModal}
        className="mb-4 bg-blue-500 text-white w-1/12 py-2 rounded hover:bg-blue-600"
      >
        Registrar Horas
      </button>

      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Minhas Atividades</h2>
        {/* Aqui você pode adicionar uma tabela para mostrar as atividades cadastradas */}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Registrar Horas</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="titulo" className="block text-lg font-medium">Título</label>
                <input
                  type="text"
                  id="titulo"
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  placeholder="Digite o título da atividade"
                />
              </div>

              <div>
                <label htmlFor="data" className="block text-lg font-medium">Data</label>
                <input
                  type="date"
                  id="data"
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                  value={formData.data}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="horas" className="block text-lg font-medium">Horas</label>
                <input
                  type="number"
                  id="horas"
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                  value={formData.horas}
                  onChange={handleInputChange}
                  placeholder="Digite as horas"
                />
              </div>

              <div>
                <label htmlFor="categoria" className="block text-lg font-medium">Categoria</label>
                <select
                  id="categoria"
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                  value={formData.categoria}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione a categoria</option>
                  <option value="A">Categoria A</option>
                  <option value="B">Categoria B</option>
                  <option value="C">Categoria C</option>
                  <option value="D">Categoria D</option>
                </select>
              </div>

              <div>
                <label htmlFor="arquivo" className="block text-lg font-medium">Anexar Comprovante</label>
                <input
                  type="file"
                  id="arquivo"
                  accept=".pdf, .png, .jpg, .jpeg"
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={loading} // Desabilita o botão enquanto está carregando
                >
                  {loading ? 'Enviando...' : 'Enviar'} {/* Exibe 'Enviando...' durante o carregamento */}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAluno;
