import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';

const Menu = () => {
    const { state, actions } = useApp();
    const [hoveredItem, setHoveredItem] = useState(null);

    // Configuración dinámica del menú
    const menuItems = useMemo(() => [
        {
            id: 'novelas',
            title: 'Novelas',
            icon: '📚',
            category: 'Sección Novelas',
            description: 'Descubre nuestras mejores novelas'
        },
        {
            id: 'ciencia-ficcion',
            title: 'Ciencia Ficción',
            icon: '🚀',
            category: 'Sección Ciencia Ficción',
            description: 'Viaja a otros mundos'
        },
        {
            id: 'terror',
            title: 'Terror',
            icon: '👻',
            category: 'Sección Terror',
            description: 'Para los amantes del suspense'
        },
        {
            id: 'policiales',
            title: 'Policiales',
            icon: '🔍',
            category: 'Sección Policiales',
            description: 'Misterios por resolver'
        },
        {
            id: 'registro',
            title: 'Registro',
            icon: '📝',
            category: 'Usuario',
            description: 'Únete a nuestra comunidad'
        },
        {
            id: 'contacto',
            title: 'Contacto',
            icon: '📞',
            category: 'Soporte',
            description: 'Estamos aquí para ayudarte'
        }
    ], []);

    const handleMenuClick = (itemId) => {
        actions.navigateTo(itemId);
        console.log(`Navegando a: ${itemId}`);
    };

    const handleMouseEnter = (itemId) => {
        setHoveredItem(itemId);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    // Agrupar items por categoría para mejor organización
    const groupedItems = useMemo(() => {
        return menuItems.reduce((acc, item) => {
            const key = item.category.includes('Sección') ? 'sections' : 'general';
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});
    }, [menuItems]);

    return (
        <div id="menu" className={`menu-${state.theme}`}>
            <div className="menu-sections">
                <h3>Secciones de Libros</h3>
                <div className="menu-grid">
                    {groupedItems.sections?.map((item) => (
                        <div
                            key={item.id}
                            className={`menu-item ${hoveredItem === item.id ? 'hovered' : ''} ${state.navigation.currentPage === item.id ? 'active' : ''}`}
                            onClick={() => handleMenuClick(item.id)}
                            onMouseEnter={() => handleMouseEnter(item.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span className="menu-icon">{item.icon}</span>
                            <span className="menu-title">{item.title}</span>
                            {hoveredItem === item.id && (
                                <div className="menu-description">
                                    {item.description}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="menu-general">
                <h3>Servicios</h3>
                <div className="menu-grid">
                    {groupedItems.general?.map((item) => (
                        <div
                            key={item.id}
                            className={`menu-item ${hoveredItem === item.id ? 'hovered' : ''} ${state.navigation.currentPage === item.id ? 'active' : ''}`}
                            onClick={() => handleMenuClick(item.id)}
                            onMouseEnter={() => handleMouseEnter(item.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span className="menu-icon">{item.icon}</span>
                            <span className="menu-title">{item.title}</span>
                            {hoveredItem === item.id && (
                                <div className="menu-description">
                                    {item.description}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Menu;