import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import logoYenny from '../assets/images/yenny-el-ateneo.jpg';

const Header = () => {
    const { state, actions } = useApp();
    const [animationClass, setAnimationClass] = useState('');

    // Efecto para animación del título
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationClass('pulse');
            setTimeout(() => setAnimationClass(''), 2000);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleThemeToggle = () => {
        actions.toggleTheme();
    };

    return (
        <div id="cabecera" className={`header-${state.theme}`}>
            <div className="header-content">
                <span className={`titulo-header ${animationClass}`}>
                    {state.libreria.nombre}
                </span>
                <div className="header-controls">
                    <button 
                        onClick={handleThemeToggle}
                        className="theme-toggle"
                        aria-label="Cambiar tema"
                    >
                        {state.theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>
            </div>
            <div className="header-subtitle">
                {state.libreria.slogan}
            </div>
            <img 
                src={logoYenny} 
                alt={state.libreria.nombre} 
                className="header-logo"
            />
        </div>
    );
};

export default Header;