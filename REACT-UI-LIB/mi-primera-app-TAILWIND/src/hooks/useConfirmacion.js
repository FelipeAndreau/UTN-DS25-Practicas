// src/hooks/useConfirmacion.js

import { useState, useEffect } from "react";

export function useConfirmacion(duracion = 4000) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let temporizador;
    if (visible) {
      temporizador = setTimeout(() => setVisible(false), duracion);
    }

    return () => clearTimeout(temporizador);
  }, [visible, duracion]);

  const activar = () => setVisible(true);

  return { visible, activar };
}