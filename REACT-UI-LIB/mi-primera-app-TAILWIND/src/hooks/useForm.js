// src/hooks/useForm.js

import { useState } from "react";

export function useForm(initialValues, validarCampos) {
  const [formulario, setFormulario] = useState(initialValues);
  const [errores, setErrores] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validar = () => {
    const nuevosErrores = validarCampos(formulario);
    setErrores(nuevosErrores);
    return nuevosErrores.length === 0;
  };

  return {
    formulario,
    handleChange,
    errores,
    validar
  };
}