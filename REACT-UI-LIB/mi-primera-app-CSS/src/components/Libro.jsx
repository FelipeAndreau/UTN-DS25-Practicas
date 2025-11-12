const Libro = ({ titulo, sinopsis, imagen }) => {
    return (
        <div className="libro">
            <h4>{titulo}</h4>
            <p>SINOPSIS: {sinopsis}</p>
            <img src={imagen} alt={titulo} />
        </div>
    );
};

export default Libro;