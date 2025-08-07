// src/pages/Catalogo.jsx

import { useEffect, useState } from 'react';
import FormularioLibro from '../components/FormularioLibro';
import FormularioEditarLibro from '../components/FormularioEditarLibro'
import ListaLibros from '../components/ListaLibros';
import ReseñasDestacadas from '../components/ReseñasDestacadas';
import { librosPorSeccion } from '../data/librosPorSeccion';

const librosIniciales = Object.values(librosPorSeccion).flat();

const Catalogo = () => {
  const [catalogo, setCatalogo] = useState(librosIniciales);
  const [libroEditando, setLibroEditando] = useState(null);

  useEffect(() => {
    console.log("✅ CATÁLOGO MONTADO CORRECTAMENTE");
  }, [])

  const handleDelete = (titulo) => {
    setCatalogo(prev => prev.filter(libro => libro.titulo !== titulo));
  };

  const handleEdit = (libro) => {
    setLibroEditando(libro);
  };

  const handleUpdate = (libroActualizado) => {
    setCatalogo(prev =>
      prev.map(libro =>
        libro.titulo === libroEditando.titulo ? libroActualizado : libro
      )
    );
    setLibroEditando(null);
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
        <FormularioLibro setCatalogo={setCatalogo} />
      )}
      <ListaLibros 
        catalogo={catalogo} 
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <ReseñasDestacadas />
    </section>
  );
};

export default Catalogo;