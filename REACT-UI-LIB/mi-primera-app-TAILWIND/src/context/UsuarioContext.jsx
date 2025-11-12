// src/context/UsuarioContext.jsx

import { createContext, useContext, useState } from "react";

const UsuarioContext = createContext();

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    temaFavorito: "",
    registrado: false
  });

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  const contexto = useContext(UsuarioContext);
  if (!contexto) {
    throw new Error("useUsuario debe usarse dentro de UsuarioProvider");
  }
  return contexto;
}