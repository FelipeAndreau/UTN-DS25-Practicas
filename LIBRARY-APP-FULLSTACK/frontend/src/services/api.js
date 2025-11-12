import axios from 'axios'

// Configurar la URL base desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para manejo de errores global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error de respuesta:', error.response.data);
    } else if (error.request) {
      // La solicitud se hizo pero no se recibió respuesta
      console.error('Error de red:', error.message);
    } else {
      // Algo sucedió al configurar la solicitud
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
)

export const getBooks = async () => {
  const response = await api.get('/books')
  return response.data
}

export const getBook = async (id) => {
  const response = await api.get(`/books/${id}`)
  return response.data
}

export const createBook = async (bookData) => {
  const response = await api.post('/books', bookData)
  return response.data
}

export const updateBook = async (id, bookData) => {
  const response = await api.put(`/books/${id}`, bookData)
  return response.data
}

export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`)
  return response.data
}
