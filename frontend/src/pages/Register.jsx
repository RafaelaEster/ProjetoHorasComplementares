import React, { useState } from 'react';

const Register = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Registrar Horas</h2>
      <form className="space-y-4">
        {/* Campo Título */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium">
            Título
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 border border-gray-300 rounded"
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
            className="w-1/3 p-2 border border-gray-300 rounded"
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
            className="w-full p-2 border border-gray-300 rounded"
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
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Campo Data */}
        <div>
          <label htmlFor="date" className="block text-lg font-medium">
            Data do Evento
          </label>
          <input
            type="date"
            id="date"
            className="w-1/2 p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Botões */}
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
  );
};

export default Register;
