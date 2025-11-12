import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { createBook, updateBook, getBook } from '../services/api'

export default function BookForm() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    image: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  const { addBook, updateBook: updateBookContext } = useAppContext()

  useEffect(() => {
    if (isEdit) {
      fetchBook()
    }
  }, [id])

  const fetchBook = async () => {
    try {
      const book = await getBook(id)
      setFormData({
        title: book.title,
        author: book.author,
        price: book.price.toString(),
        image: book.image || ''
      })
    } catch (error) {
      console.error('Error fetching book:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const bookData = {
        ...formData,
        image: formData.image || "https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=Book+Cover"
      }

      if (isEdit) {
        const updatedBook = await updateBook(id, bookData)
        updateBookContext(updatedBook)
      } else {
        const newBook = await createBook(bookData)
        addBook(newBook)
      }
      navigate('/')
    } catch (error) {
      console.error('Error saving book:', error)
      alert('Error saving book. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {isEdit ? 'Edit Book' : 'Add New Book'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Image URL (optional)
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/book-cover.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Leave empty to use default placeholder image
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
          >
            {loading ? 'Saving...' : (isEdit ? 'Update Book' : 'Add Book')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
