// src/components/Footer.jsx

const Footer = () => {
    return (
      <footer
        className="text-center font-semibold font-[Impact] bg-cover bg-center p-2 mt-auto"
        style={{ backgroundImage: "url(/src/assets/images/pie.avif)" }}
      >
        <p className="text-base">
          © Librería Yenny. All rights reserved —
          <span className="text-[#1788d9] font-bold"> TWITTER</span>: yenny_libreria_ok —
          <span className="text-[#de241d] font-bold"> INSTAGRAM</span>: yenny_libreria
        </p>
      </footer>
    );
  };
  
  export default Footer;