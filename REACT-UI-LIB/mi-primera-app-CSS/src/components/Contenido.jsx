import { Link } from 'react-router-dom';
import LibroDestacado from './LibroDestacado';
import { librosDestacados } from '../data/librosDestacados';

const Contenido = () => {
  return (
    <div id="contenido">
      {librosDestacados.map(libro => (
        <Link key={libro.id} to={libro.ruta}>
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