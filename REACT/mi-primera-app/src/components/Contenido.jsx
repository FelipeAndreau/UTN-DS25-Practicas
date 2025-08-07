import LibroDestacado from './LibroDestacado';

import hermanosImg from '../assets/images/hermanos.jpg';
import neuromanteImg from '../assets/images/neuromante.jpg';
import lovecraftImg from '../assets/images/lovecraft.jpg';
import perdidaImg from '../assets/images/perdida.jpg';

const Contenido = () => {
    return (
        <div id="contenido">
            <LibroDestacado
                titulo="¡NOVELA DESTACADA!"
                descripcion='"Los hermanos Karamazov" - Fiódor Dostoyevski'
                imagen={hermanosImg}
                enlace="ej5_sección_novelas.html"
            />
            <LibroDestacado
                titulo="¡SCI-FI DESTACADO!"
                descripcion='"Neuromante" - William Gibson'
                imagen={neuromanteImg}
                enlace="ej5_sección_ciencia_ficción.html"
            />
            <LibroDestacado
                titulo="¡TERROR DESTACADO!"
                descripcion='"La llamada de Cthulhu" - H. P. Lovecraft'
                imagen={lovecraftImg}
                enlace="ej5_sección_terror.html"
            />
            <LibroDestacado
                titulo="¡POLICIAL DESTACADO!"
                descripcion='"Perdida" (Gone Girl) - Gillian Flynn'
                imagen={perdidaImg}
                enlace="ej5_sección_policiales.html"
            />
        </div>
    );
};

export default Contenido;