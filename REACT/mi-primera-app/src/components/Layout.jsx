// src/components/Layout.jsx
import Header from './Header';
import Menu from './Menu';
import Contenido from './Contenido';
import Footer from './Footer';
import '../App.css';

const Layout = () => {
    return (
        <div id="contenedor">
                <Header />
                <Menu />
                <Contenido />
                <Footer />
        </div>
    );
};

export default Layout;