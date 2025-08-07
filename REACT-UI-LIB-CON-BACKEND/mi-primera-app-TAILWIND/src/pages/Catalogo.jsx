// src/pages/Catalogo.jsx

import { useEffect, useState } from 'react';
import FormularioLibro from '../components/FormularioLibro';
import FormularioEditarLibro from '../components/FormularioEditarLibro';
import ListaLibros from '../components/ListaLibros';
import ReseñasDestacadas from '../components/ReseñasDestacadas';
import { getBooks, deleteBook, updateBook } from '../api/api';

const Catalogo = () => {
  const [catalogo, setCatalogo] = useState([]);
  const [libroEditando, setLibroEditando] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarCatalogo();
  }, []);

  const cargarCatalogo = async () => {
    try {
      const data = await getBooks();
      setCatalogo(data.books);
    } catch (err) {
      console.error("❌ Error al cargar libros:", err.message);
      setError("NO SE PUDO CARGAR EL CATÁLOGO");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setCatalogo(prev => prev.filter(libro => libro.id !== id));
    } catch (err) {
      console.error("❌ Error al eliminar libro:", err.message);
    }
  };

  const handleEdit = (libro) => {
    setLibroEditando(libro);
  };

  const handleUpdate = async (libroActualizado) => {
    try {
      const { book: libroFinal } = await updateBook(libroActualizado);
      setCatalogo(prev =>
        prev.map(libro =>
          libro.id === libroFinal.id ? libroFinal : libro
        )
      );
      setLibroEditando(null);
    } catch (err) {
      console.error("❌ Error al actualizar libro:", err.message);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center gap-28 px-6 py-20 bg-gradient-to-b from-amber-50 via-white to-yellow-100">
      {libroEditando ? (
        <FormularioEditarLibro
          libro={libroEditando}
          onUpdate={handleUpdate}
          onCancelar={() => setLibroEditando(null)}
        />
      ) : (
        <FormularioLibro onLibroAgregado={cargarCatalogo} />
      )}

      {loading ? (
        <p className="text-center text-xl font-[Impact] text-gray-600">CARGANDO CATÁLOGO...</p>
      ) : error ? (
        <p className="text-center text-xl font-[Impact] text-red-600">{error}</p>
      ) : (
        <ListaLibros
          catalogo={catalogo}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      <ReseñasDestacadas />
    </section>
  );
};

export default Catalogo;