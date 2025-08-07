// src/pages/SeccionLibros.jsx

import { useParams } from 'react-router-dom';
import Libro from '../components/Libro';
import { librosPorSeccion } from '../data/librosPorSeccion';


const titulosSeccion = {
  novelas: "NUESTRAS NOVELAS...",
  terror: "NUESTRAS HISTORIAS DE TERROR...",
  policiales: "NUESTROS POLICIALES...",
  "ciencia-ficcion": "NUESTRAS HISTORIAS DE CIENCIA FICCIÓN...",
};

const SeccionLibros = () => {
  const { categoria } = useParams();
  const libros = librosPorSeccion[categoria];
  return (
    <div className="libros flex-1 w-full px-6 py-4 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center font-[Impact] text-brown">{titulosSeccion[categoria]}</h1>
      {libros.map(libro => (
        <Libro
          key={libro.id}
          titulo={libro.titulo}
          sinopsis={libro.sinopsis}
          imagen={libro.imagen}
        />
      ))}
    </div>
  );
};

export default SeccionLibros;