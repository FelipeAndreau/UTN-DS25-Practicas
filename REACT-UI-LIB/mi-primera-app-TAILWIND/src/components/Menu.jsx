// src/components/Menu.jsx

import { Link } from 'react-router-dom';
import { menuItems } from '../data/menuItems';

const Menu = () => {
  return (
    <nav className="flex-1 w-full px-6 py-6">
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-8 px-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.ruta}
            className="inline-block border-[5px] border-black px-6 py-3 text-[22px] md:text-[26px] font-[Impact] text-brown text-center hover:bg-brown hover:text-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 no-underline"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Menu;