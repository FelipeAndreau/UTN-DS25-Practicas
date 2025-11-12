// src/components/FormularioEditarLibro.jsx

import { useState, useEffect } from "react";

const FormularioEditarLibro = ({ libro, onUpdate, onCancelar }) => {
  const [datos, setDatos] = useState({
    titulo: "",
    sinopsis: "",
    imagen: "",
  });

  useEffect(() => {
    if (libro) {
      setDatos(libro);
    }
  }, [libro]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const urlTemporal = URL.createObjectURL(archivo);
      setDatos((prev) => ({ ...prev, imagen: urlTemporal }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!datos.titulo || !datos.sinopsis || !datos.imagen) return;
    onUpdate(datos);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl px-6 py-10 space-y-10 text-center"
    >
      <h2 className="text-4xl font-[Impact] text-center">
        EDITAR LIBRO
      </h2>

      <label className="block text-[24px] font-[Impact] text-brown">
        Título y Autor
        <input
          type="text"
          name="titulo"
          value={datos.titulo}
          onChange={handleChange}
          placeholder="EJ. Harry Potter - J. K. Rowling"
          className="mt-2 w-full px-5 py-3 text-[18px] font-mono border-2 border-black rounded-md"
        />
      </label>

      <label className="block text-[24px] font-[Impact] text-brown">
        Sinopsis
        <textarea
          name="sinopsis"
          value={datos.sinopsis}
          onChange={handleChange}
          placeholder="BREVE DESCRIPCIÓN DEL LIBRO..."
          className="mt-2 w-full h-32 px-5 py-3 text-[18px] font-mono border-2 border-black rounded-md resize-none"
        />
      </label>

      <label className="block text-[24px] font-[Impact] text-brown">
        Imagen
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="mt-2 w-full text-sm font-mono border-2 border-black rounded-md px-4 py-2 bg-white cursor-pointer"
        />
      </label>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="w-full py-4 bg-green-600 text-white text-[20px] font-[Impact] rounded-md hover:bg-green-700 transition"
        >
          ACTUALIZAR LIBRO
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="w-full py-4 bg-red-600 text-white text-[20px] font-[Impact] rounded-md hover:bg-red-700 transition"
        >
          CANCELAR
        </button>
      </div>
    </form>
  );
};

export default FormularioEditarLibro;