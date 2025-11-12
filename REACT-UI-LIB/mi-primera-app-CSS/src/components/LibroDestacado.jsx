const LibroDestacado = ({ titulo, descripcion, imagen }) => {
    return (
      <article className="libro-destacado">
        <h2 className="libro-titulo">{titulo}</h2>
        <p className="libro-descripcion">{descripcion}</p>
        <img src={imagen} alt={titulo} className="libro-imagen" />
      </article>
    );
  };
  
  export default LibroDestacado;