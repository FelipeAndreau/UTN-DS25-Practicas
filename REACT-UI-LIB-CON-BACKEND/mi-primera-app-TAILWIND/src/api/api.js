const BASE_URL = import.meta.env.VITE_API_URL;

console.log("🌐 BASE_URL:", BASE_URL);

// Libros
export async function getBooks() {
  const res = await fetch(`${BASE_URL}/books`);
  if (!res.ok) throw new Error('Error al obtener libros');
  return res.json();
}

export async function createBook(bookData) {
  const res = await fetch(`${BASE_URL}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData)
  });
  if (!res.ok) throw new Error('Error al crear libro');
  return res.json();
}

export async function deleteBook(id) {
  const res = await fetch(`${BASE_URL}/books/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Error al eliminar libro');
  return res.json();
}

export async function updateBook(bookData) {
  const res = await fetch(`${BASE_URL}/books/${bookData.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData)
  });
  if (!res.ok) throw new Error('Error al actualizar libro');
  return res.json();
}

// Usuarios
export async function createUser(userData) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  if (!res.ok) throw new Error('Error al registrar usuario');
  return res.json();
}

// Contacto
export async function sendMessage(messageData) {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(messageData)
  });
  if (!res.ok) throw new Error('Error al enviar mensaje');
  return res.json();
}