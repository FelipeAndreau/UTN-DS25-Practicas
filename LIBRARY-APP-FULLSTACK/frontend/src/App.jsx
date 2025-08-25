import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import BookList from './components/BookList'
import BookForm from './components/BookForm'

function App() {
  return (
    <AppProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<BookList />} />
              <Route path="/add" element={<BookForm />} />
              <Route path="/edit/:id" element={<BookForm />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
