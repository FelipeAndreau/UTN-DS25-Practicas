import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';
import '../App.css';

const Layout = ({ children }) => {
    return (
        <div id="contenedor">
            <Header />
            <Menu />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;