import { useState } from "react";
import Libro from "./Libro";

const ListaLibros = ({ catalogo, onEdit, onDelete }) => {
  const [busqueda, setBusqueda] = useState("");

  const librosFiltrados = catalogo.filter((libro) =>
    libro.title_and_author.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className="w-full px-6 py-4 space-y-10">
      <h2 className="text-4xl font-[Impact] text-center">BÚSQUEDA</h2>
      <input
        type="text"
        placeholder="BUSCAR LIBRO POR TÍTULO Y/O AUTOR..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full px-6 py-4 text-[18px] font-mono border-2 border-black rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-brown"
      />

      <div className="flex flex-col w-full gap-10">
        {librosFiltrados.length > 0 ? (
          librosFiltrados.map((libro) => (
            <Libro
              key={libro.id}
              id={libro.id}
              titulo={libro.title_and_author}
              sinopsis={libro.description}
              imagen={libro.image}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="text-center text-lg font-[Impact] text-gray-500 col-span-full">
            No se encontraron libros con ese título y/o autor.
          </p>
        )}
      </div>
    </section>
  );
};

export default ListaLibros;