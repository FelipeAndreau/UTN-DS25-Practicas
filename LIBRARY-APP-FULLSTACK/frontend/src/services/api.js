import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

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
