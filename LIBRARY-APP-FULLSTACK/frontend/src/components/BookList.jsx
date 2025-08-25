import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { deleteBook } from '../services/api'
import SearchBar from './SearchBar'

export default function BookList() {
  const { filteredBooks, loading, removeBook } = useAppContext()

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id)
        removeBook(id)
      } catch (error) {
        console.error('Error deleting book:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Book Library</h1>
      
      <SearchBar />
      
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No books found</p>
          <Link
            to="/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Add First Book
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map(book => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={book.image || "https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=Book+Cover"}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {book.title}
                </h3>
                <p className="text-gray-600 mb-2">by {book.author}</p>
                <p className="text-lg font-bold text-green-600 mb-4">
                  ${book.price.toFixed(2)}
                </p>
                <div className="flex gap-2">
                  <Link
                    to={`/edit/${book.id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
