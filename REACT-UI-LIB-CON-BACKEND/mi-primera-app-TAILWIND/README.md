# 📚 PROYECTO: LIBRERÍA YENNY

Este proyecto React implementa una librería digital, utilizando Tailwind CSS para estilos y los múltiples conceptos modernos que vimos en clase como Context, Custom Hooks, manejo de formularios, y conexión a una API externa.

---

## ✅ PUNTOS DESARROLLADOS

### 1. 🖌️ ADAPTACIÓN DE LA UI USANDO TAILWIND

**APLICADO EN:**  
- `App.css` → fondo con `background-blend-mode`, estilos base.
- `Layout.jsx` → grilla vertical con `min-h-screen`.
- `Contenido.jsx`, `Menu.jsx`, `Libro.jsx`, `FormularioLibro.jsx`, etc. → uso de grillas `grid-cols`, `max-w`, `rounded-md`, `font-[Impact]`, `shadow`, `hover:scale`, entre otros.

**RESUMEN:** la interfaz se construyó exclusivamente con utilidades de Tailwind CSS, manteniendo una estética uniforme y responsiva.

---

### 2. 📦 CATÁLOGO COMO ESTADO DEL COMPONENTE PADRE

**APLICADO EN:**  
- `Catalogo.jsx` → `useState` para `catalogo` con los libros agrupados en `librosPorSeccion.js`.
- `FormularioLibro.jsx` → modifica el catálogo con `setCatalogo`.

---

### 3. 🔍 BÚSQUEDA DENTRO DEL CATÁLOGO

**APLICADO EN:**  
- `ListaLibros.jsx` → campo de búsqueda con `useState`, que filtra el arreglo `catalogo` por coincidencia en el título y/o autor del libro.

---

### 4. 📝 FORMULARIO PARA SUMAR UN NUEVO LIBRO

**APLICADO EN:**  
- `FormularioLibro.jsx` → inputs para título, sinopsis e imagen.
- **ACLARACIÓN:** no se aplicó `useConfirmacion` acá porque el feedback inmediato `"✅ ¡LIBRO AGREGADO CON ÉXITO AL FINAL DEL CATÁLOGO!"` era suficientemente intuitivo por contexto visual y funcional.

---

### 5. ⚙️ `useEffect` APLICADO

**APLICADO EN:**  
- `Catalogo.jsx` → efecto de montaje (`console.log`)
- `ReseñasDestacadas.jsx` → control de `esperando` para simular carga.
- `useFetch.js` → lógica de llamada a API dentro de `useEffect`.

---

### 6. 🌐 API EXTERNA CON `fetch`

**APLICADO EN:**  
- `ReseñasDestacadas.jsx` + `useFetch.js`  
- API utilizada: `https://dummyjson.com/comments?limit=7`

**COMPORTAMIENTO:** muestra reseñas destacadas con control de carga (`loading`) y error (`error`), y un delay artificial para simular una carga de reseñas algo más lenta.

---

### 7. 👥 `useContext` PARA COMPARTIR USUARIO REGISTRADO

**APLICADO EN:**  
- `UsuarioContext.jsx`  
- Consumido en: `Registro.jsx`, `Contacto.jsx`, `App.jsx`

**PROPÓSITO:** permite registrar un usuario con nombre, apellido, contraseña, sexo y tema favorito, y utilizar esa información en otra página (CONTACTO) como mensaje de bienvenida.

---

### 8. 🧠 CUSTOM HOOKS

**APLICADOS Y DESARROLLADOS EN:**

| HOOK             | ARCHIVO            | FUNCIÓN PRINCIPAL                      | APLICADO EN         |
|------------------|--------------------|----------------------------------------|----------------------|
| `useConfirmacion`| `useConfirmacion.js`| Mensaje temporal después de acción     | `Registro.jsx`, `Contacto.jsx` |
| `useForm`        | `useForm.js`        | Manejo de formulario + validación      | `Registro.jsx`, `Contacto.jsx` |
| `useFetch`       | `useFetch.js`       | Llamada a API + manejo de loading/error| `ReseñasDestacadas.jsx` |

---

## 📁 ESTRUCTURA DEL REPOSITORIO

📂 `src/` <br>
├── `components/` → Layout, menú, libros, formulario, reseñas, etc. <br>
├── `context/` → `UsuarioContext.jsx`. <br>
├── `data/` → catálogo por sección y destacados, también ítems del menú. Más que nada para que el relleno de información se encuentre apartado del resto del funcionamiento de los componentes. <br>
├── `hooks/` → Custom Hooks. <br>
├── `pages/` → vistas: catálogo, contacto, registro, secciones. <br>
├── `App.jsx` → enrutador central. <br>
├── `main.jsx`, `App.css`, `index.html` → entrada del proyecto. `App.css` contiene solamente algunos estilos CSS muy generales. Todo lo demás está hecho con Tailwind.

---

## 🏁 ESTADO FINAL

Proyecto completado y subido al repositorio `UTN-DS25-practicas/REACT-UI-LIB/mi-primera-app-TAILWIND`.
Todos los puntos del trabajo están implementados y demostrados en componentes funcionales.