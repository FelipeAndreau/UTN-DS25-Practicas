import logoYenny from '../assets/images/yenny-el-ateneo.jpg';

const Header = () => {
    return (
        <div id="cabecera">
            <span className="titulo-header">LIBRERÍA YENNY</span>
            <img src={logoYenny} alt="Librería Yenny" />
        </div>
    );
};

export default Header;