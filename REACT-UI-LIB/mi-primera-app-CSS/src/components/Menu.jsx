import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div id="menu">
            <div className="menu-bloque">
                <Link to="/novelas">SECCIÓN NOVELAS</Link>
                <Link to="/ciencia-ficcion">SECCIÓN CIENCIA FICCIÓN</Link>
            </div>
            <div className="menu-bloque">
                <Link to="/terror">SECCIÓN TERROR</Link>
                <Link to="/policiales">SECCIÓN POLICIALES</Link>
            </div>
            <div className="menu-bloque">
                <Link to="/registro">REGISTRO</Link>
                <Link to="/contacto">CONTACTO</Link>
                <Link to="/">PRINCIPAL</Link>
            </div>
        </div>
    );
};

export default Menu;