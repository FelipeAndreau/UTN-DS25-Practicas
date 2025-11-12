// src/components/ReseñasDestacadas.jsx

import { useFetch } from "../hooks/useFetch";
import { useState, useEffect } from "react";

const ReseñasDestacadas = () => {
  const { data, loading, error } = useFetch("https://dummyjson.com/comments?limit=7");
  
  const [esperando, setEsperando] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setEsperando(false), 7000);
    return () => clearTimeout(timer);
  }, []); // Únicamente para simular la espera de la carga de información de la API

  return (
    <section className="w-full max-w-4xl mx-auto p-8 bg-yellow-50 rounded-xl border border-yellow-400 shadow-md space-y-6">
      <h2 className="text-3xl font-[Impact] text-brown text-center">RESEÑAS DESTACADAS</h2>

      {(loading || esperando) ? (
        <p className="text-center text-[22px] font-[Impact] text-orange-800 bg-orange-100 rounded-md px-6 py-4 shadow-md tracking-wide drop-shadow-sm">
          CARGANDO RESEÑAS DESTACADAS...
        </p>
      ) : error ? (
        <p className="text-center text-[20px] font-[Impact] text-red-700 bg-red-100 rounded-md px-6 py-4 shadow-md">
          ❌ {error}
        </p>
      ) : (
        data?.comments?.map((item) => (
          <div key={item.id} className="text-center bg-white rounded-md p-4 shadow-sm transition-opacity duration-500">
            <p className="text-[18px] text-gray-800 italic">"{item.body}"</p>
            <p className="text-[14px] text-gray-500 mt-2">✍️ {item.user.username}</p>
          </div>
        ))
      )}
    </section>
  );
};

export default ReseñasDestacadas;