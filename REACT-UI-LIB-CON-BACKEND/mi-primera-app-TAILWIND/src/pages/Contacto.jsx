// src/pages/Contacto.jsx

import { useUsuario } from "../context/UsuarioContext";
import { useForm } from "../hooks/useForm";
import { useConfirmacion } from "../hooks/useConfirmacion";
import { sendMessage } from "../api/api";

const Contacto = () => {
  const { usuario } = useUsuario();
  const { visible: confirmacion, activar: mostrarConfirmacion } = useConfirmacion();

  const validarCampos = (data) => {
    const errores = [];
    if (data.nombre.trim() === "") errores.push("El nombre es obligatorio.");
    if (data.apellido.trim() === "") errores.push("El apellido es obligatorio.");
    if (data.email.trim() === "") errores.push("El email es obligatorio.");
    if (data.mensaje.trim() === "") errores.push("El mensaje es obligatorio.");
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
      email: "",
      mensaje: ""
    },
    validarCampos
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validar()) {
      try {
        const data = await sendMessage(formulario);
        console.log("✅ Mensaje enviado:", data);
        mostrarConfirmacion();
      } catch (error) {
        console.error("❌ Error en el envío:", error.message);
      }
    }
  };

  const usuarioRegistrado = usuario.registrado === true;

  return (
    <section className="flex justify-center items-center px-6 py-24">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-12 text-[34px] font-[Impact] text-center">
        {usuarioRegistrado && (
          <p className="text-[22px] text-green-800 bg-green-100 rounded-md py-3 px-6 shadow-md mb-6">
            GRACIAS POR CONTACTARTE, <span className="font-bold">{usuario.nombre}</span>
          </p>
        )}

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
            Email
            <input
              type="email"
              name="email"
              placeholder="fabriper@gmail.com"
              value={formulario.email}
              onChange={handleChange}
              className="w-full text-[24px] font-mono border-2 border-black border-l-[10px] border-gray-400 rounded-md px-6 py-3"
            />
          </label>
        </div>

        <div className="space-y-6">
          <label className="block text-[40px]">
            Mensaje
            <textarea
              name="mensaje"
              placeholder="Dejá tu mensaje y te contactaremos a la brevedad..."
              maxLength="200"
              minLength="15"
              value={formulario.mensaje}
              onChange={handleChange}
              className="w-[700px] mx-auto block h-[200px] text-[24px] font-mono border-[2.4px] border-black border-l-[10px] border-gray-400 rounded-md px-6 py-4 resize-none"
            ></textarea>
          </label>
        </div>

        <div>
          <input
            type="submit"
            value="ENVIAR"
            className="text-[30px] border-[4px] border-black rounded-md px-10 py-5 cursor-pointer hover:bg-black hover:text-white transition duration-300"
          />
        </div>

        {confirmacion && (
          <p className="text-[18px] text-green-700 bg-green-100 rounded-md py-2 px-4 mt-4 shadow-md font-mono transition-opacity duration-500">
            ✅ ¡GRACIAS POR TU MENSAJE! LO RECIBIMOS CORRECTAMENTE
          </p>
        )}
      </form>
    </section>
  );
};

export default Contacto;