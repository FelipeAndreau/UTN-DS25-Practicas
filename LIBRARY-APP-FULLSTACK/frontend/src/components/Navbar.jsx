import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-white text-xl font-bold">
            Library App
          </Link>
          <Link
            to="/add"
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            Add Book
          </Link>
        </div>
      </div>
    </nav>
  )
}
