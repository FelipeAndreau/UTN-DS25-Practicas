import { createContext, useContext, useState, useEffect } from 'react'
import { getBooks } from '../services/api'

const AppContext = createContext()

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const data = await getBooks()
      setBooks(data)
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const addBook = (newBook) => {
    setBooks(prev => [...prev, newBook])
  }

  const updateBook = (updatedBook) => {
    setBooks(prev => prev.map(book => 
      book.id === updatedBook.id ? updatedBook : book
    ))
  }

  const removeBook = (bookId) => {
    setBooks(prev => prev.filter(book => book.id !== bookId))
  }

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const value = {
    books,
    filteredBooks,
    loading,
    searchTerm,
    setSearchTerm,
    fetchBooks,
    addBook,
    updateBook,
    removeBook
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
