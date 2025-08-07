const LibroDestacado = ({ titulo, descripcion, imagen, enlace }) => {
    return (
        <article className="libro-destacado">
            <a href={enlace} className="libro-titulo">{titulo}</a>
            <p className="libro-descripcion">{descripcion}</p>
            <img src={imagen} alt={titulo} className="libro-imagen" />
        </article>
    );
};

export default LibroDestacado;