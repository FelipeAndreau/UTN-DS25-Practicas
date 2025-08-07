// src/services/book.service.ts

import { Book, CreateBookRequest, UpdateBookRequest } from '../types/book.types';

// Mock data (más adelante se reemplazará por PostgreSQL)
let books: Book[] = [
  {
    id: 1,
    title_and_author: 'Qixote - Cervantes',
    description: 'A classic Spanish novel about chivalry and madness.',
    image: 'example',
    createdAt: new Date()
  },
  {
    id: 2,
    title_and_author: '1984 - Orwell',
    description: 'A dystopian novel about surveillance and authoritarianism.',
    image: 'example',
    createdAt: new Date()
  },
];

// Obtener todos los libros
export async function getAllBooks(): Promise<Book[]> {
  return books;
}

// Obtener un libro por ID
export async function getBookById(id: number): Promise<Book | undefined> {
  const book = books.find(b => b.id === id);
  if (!book) {
    const error = new Error('Book not found');
    (error as any).statusCode = 404;
    throw error;
  }
  return book;
}

// Crear un nuevo libro
export async function createBook(bookData: CreateBookRequest): Promise<Book> {
  const newBook: Book = {
    id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
    ...bookData,
    createdAt: new Date()
  };
  books.push(newBook);
  return newBook;
}

// Actualizar un libro existente
export async function updateBook(id: number, updateData: UpdateBookRequest): Promise<Book> {
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    const error = new Error('Book not found');
    (error as any).statusCode = 404;
    throw error;
  }

  books[bookIndex] = {
    ...books[bookIndex],
    ...updateData
  };

  return books[bookIndex];
}

// Eliminar un libro
export async function deleteBook(id: number): Promise<boolean> {
  const initialLength = books.length;
  books = books.filter(b => b.id !== id);
  return books.length < initialLength;
}