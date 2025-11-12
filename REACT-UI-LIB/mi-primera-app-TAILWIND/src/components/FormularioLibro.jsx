// src/components/FormularioLibro.jsx

import { useState } from "react";

const FormularioLibro = ({ setCatalogo }) => {
  const [datos, setDatos] = useState({
    titulo: "",
    sinopsis: "",
  });

  const [mensaje, setMensaje] = useState("");

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

    const nuevoLibro = {
      ...datos,
      id: Date.now()
    };

    setCatalogo((prev) => [...prev, nuevoLibro]);

    setDatos({
      titulo: "",
      sinopsis: "",
      imagen: ""
    });

    setMensaje("✅ ¡LIBRO AGREGADO CON ÉXITO AL FINAL DEL CATÁLOGO!");
    setTimeout(() => setMensaje(""), 2000);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl px-6 py-10 space-y-10 text-center"
      >
        <h2 className="text-4xl font-[Impact] text-center">
          AGREGAR NUEVO LIBRO
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

        <button
          type="submit"
          className="w-full py-4 mt-6 bg-brown text-white text-[20px] font-[Impact] rounded-md hover:bg-black transition"
        >
          AGREGAR LIBRO
        </button>
      </form>
      <br></br>
      {mensaje && (
        <div className="mt-8 text-center text-[20px] font-[Impact] text-green-700 bg-green-100 rounded-md py-3 px-5 max-w-lg mx-auto shadow-md transition-opacity duration-500">
          {mensaje}
        </div>
      )}
    </>
  );
};

export default FormularioLibro;