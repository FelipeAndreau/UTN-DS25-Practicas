// src/components/Contenido.jsx

import { Link } from 'react-router-dom';
import LibroDestacado from './LibroDestacado';
import { librosDestacados } from '../data/librosDestacados';

const Contenido = () => {
  return (
    <div
      id="contenido"
      className="flex-1 max-w-full grid grid-cols-1 md:grid-cols-2 gap-5 place-content-center mx-auto p-5"
    >
      {librosDestacados.map(libro => (
        <Link key={libro.id} to={libro.ruta} className="block no-underline">
          <LibroDestacado
            titulo={libro.titulo}
            descripcion={libro.descripcion}
            imagen={libro.imagen}
          />
        </Link>
      ))}
    </div>
  );
};

export default Contenido;