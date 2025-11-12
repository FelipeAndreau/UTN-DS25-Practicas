// src/pages/Registro.jsx

import { useUsuario } from "../context/UsuarioContext";
import { useForm } from "../hooks/useForm";
import { useConfirmacion } from "../hooks/useConfirmacion";

const Registro = () => {
  const { setUsuario } = useUsuario();
  const { visible: confirmacion, activar: mostrarConfirmacion } = useConfirmacion();

  const validarCampos = (data) => {
    const errores = [];
    if (data.nombre.trim() === "") errores.push("El nombre es obligatorio.");
    if (data.apellido.trim() === "") errores.push("El apellido es obligatorio.");
    if (data.contraseña.length < 8) errores.push("La contraseña debe tener al menos 8 caracteres.");
    if (data.sexo === "") errores.push("Debes seleccionar un sexo.");
    return errores;
  };

  const {
    formulario,
    handleChange,
    errores,
    validar
  } = useForm(
    {
      nombre: "",
      apellido: "",
      sexo: "",
      contraseña: "",
      temaFavorito: ""
    },
    validarCampos
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      setUsuario({ ...formulario, registrado: true });
      mostrarConfirmacion();
    }
  };

  return (
    <section className="flex justify-center items-center px-6 py-24">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl space-y-12 text-[34px] font-[Impact] text-center"
      >
        {errores.length > 0 && (
          <ul className="list-none bg-red-100 text-red-800 rounded-md py-4 px-6 text-[18px] font-mono shadow-md">
            {errores.map((err, index) => (
              <li key={index}>⚠️ {err}</li>
            ))}
          </ul>
        )}

        <div className="space-y-6">
          <label className="block text-[40px]">
            Nombre
            <input
              type="text"
              name="nombre"
              placeholder="Fabricio"
              value={formulario.nombre}
              onChange={handleChange}
              className="w-full text-[24px] font-mono border-2 border-black border-l-[10px] border-gray-400 rounded-md px-6 py-3"
            />
          </label>
        </div>

        <div className="space-y-6">
          <label className="block text-[40px]">
            Apellido
            <input
              type="text"
              name="apellido"
              placeholder="Pérez"
              value={formulario.apellido}
              onChange={handleChange}
              className="w-full text-[24px] font-mono border-2 border-black border-l-[10px] border-gray-400 rounded-md px-6 py-3"
            />
          </label>
        </div>

        <div className="space-y-6">
          <label className="block text-[40px]">
            Contraseña
            <input
              type="password"
              name="contraseña"
              placeholder="********"
              value={formulario.contraseña}
              onChange={handleChange}
              className="w-full text-[24px] font-mono border-2 border-black border-l-[10px] border-gray-400 rounded-md px-6 py-3"
            />
          </label>
        </div>

        <div className="space-y-6">
          <label className="block text-[40px]">
            Sexo
            <span className="flex justify-center gap-8 text-[24px] font-mono mt-2">
              <label>
                <input
                  type="radio"
                  name="sexo"
                  value="masculino"
                  checked={formulario.sexo === "masculino"}
                  onChange={handleChange}
                />{" "}
                Masculino
              </label>
              <label>
                <input
                  type="radio"
                  name="sexo"
                  value="femenino"
                  checked={formulario.sexo === "femenino"}
                  onChange={handleChange}
                />{" "}
                Femenino
              </label>
            </span>
          </label>
        </div>

        <div className="space-y-6">
          <label className="block text-[40px]">
            Tema Favorito
            <select
              name="temaFavorito"
              value={formulario.temaFavorito}
              onChange={handleChange}
              className="w-full text-[24px] font-mono border-2 border-black border-l-[10px] border-gray-400 rounded-md px-6 py-3 mt-2"
            >
              <option value="Novela">Novela</option>
              <option value="Terror">Terror</option>
              <option value="Ciencia Ficción">Ciencia Ficción</option>
              <option value="Policial">Policial</option>
            </select>
          </label>
        </div>

        <div>
          <input
            type="submit"
            value="ENVIAR"
            className="text-[25px] border-[4px] border-black rounded-md px-10 py-5 cursor-pointer hover:bg-black hover:text-white transition duration-300"
          />
        </div>

        {confirmacion && (
          <p className="text-[18px] text-green-700 bg-green-100 rounded-md py-2 px-4 mt-4 shadow-md font-mono transition-opacity duration-500">
            ✅ FORMULARIO ENVIADO CON ÉXITO
          </p>
        )}
      </form>
    </section>
  );
};

export default Registro;