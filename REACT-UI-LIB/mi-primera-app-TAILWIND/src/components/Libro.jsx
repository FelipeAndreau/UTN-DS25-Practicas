// src/components/Libro.jsx

const Libro = ({ titulo, sinopsis, imagen, onEdit, onDelete }) => {
  return (
    <article className="w-full max-w-5xl mx-auto p-6 border-2 border-black rounded-md bg-white shadow-md transition-all duration-300 hover:scale-[1.01]">
      <h4 className="text-2xl font-bold font-[Impact] text-brown text-center mb-4 tracking-tight drop-shadow-sm">
        {titulo}
      </h4>
      <p className="text-[18px] font-serif font-semibold text-gray-800 mb-6 text-center leading-relaxed">
        SINOPSIS: {sinopsis}
      </p>
      <img
        src={imagen}
        alt={titulo}
        className="h-[200px] mx-auto border border-gray-300 rounded-md object-contain shadow-sm"
      />
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition"
        >
          ✏️ EDITAR
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 transition"
        >
          🗑️ ELIMINAR
        </button>
      </div>
    </article>
  );
};

export default Libro;