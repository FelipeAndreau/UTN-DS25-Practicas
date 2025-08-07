// src/components/Header.jsx

import logoYenny from '../assets/images/yenny-el-ateneo.jpg';

const Header = () => {
  return (
    <header className="relative flex items-center justify-center flex-wrap text-white p-5 overflow-hidden">

      <img
        src="/src/assets/images/R.jpg"
        alt="Fondo librería"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30 z-0"
      />

      <span className="z-10 text-[40px] font-[abadía] text-center block drop-shadow-md">
        LIBRERÍA YENNY
      </span>
      <img
        src={logoYenny}
        alt="Librería Yenny"
        className="z-10 mt-1 ml-2 h-[50px] md:h-[70px]"
      />
    </header>
  );
};

export default Header;