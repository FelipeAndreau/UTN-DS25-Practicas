window.onload = () => {
  const footer = document.getElementById("fecha");
  const hoy = new Date().toLocaleDateString("es-AR");
  footer.innerText = `Última actualización: ${hoy}`;
};
