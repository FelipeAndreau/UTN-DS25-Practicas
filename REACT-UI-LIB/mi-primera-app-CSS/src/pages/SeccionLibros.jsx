import { useParams } from 'react-router-dom';
import Libro from '../components/Libro';
import { librosPorSeccion } from '../data/librosporSeccion';

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
    <div className="libros">
      <h1>{titulosSeccion[categoria]}</h1>
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