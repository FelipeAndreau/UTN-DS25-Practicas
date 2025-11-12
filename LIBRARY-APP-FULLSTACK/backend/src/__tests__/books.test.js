import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import cors from 'cors';

// Crear app de prueba
const app = express();
app.use(cors());
app.use(express.json());

// Mock simple de datos
let mockBooks = [
  { id: 1, title: 'Cien Años de Soledad', author: 'Gabriel García Márquez', price: 29.99 },
  { id: 2, title: 'Don Quijote', author: 'Miguel de Cervantes', price: 24.99 }
];

// Middleware de validación
const validateBook = (req, res, next) => {
  const { title, author, price } = req.body;
  const errors = [];

  if (!title || title.trim() === '') {
    errors.push('El título es requerido');
  }
  if (!author || author.trim() === '') {
    errors.push('El autor es requerido');
  }
  if (price === undefined || price === null) {
    errors.push('El precio es requerido');
  } else if (isNaN(price) || parseFloat(price) < 0) {
    errors.push('El precio debe ser un número positivo');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// Endpoints de prueba
app.get('/api/books', (req, res) => {
  res.json(mockBooks);
});

app.get('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const bookId = parseInt(id);
  
  if (isNaN(bookId)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const book = mockBooks.find(b => b.id === bookId);
  
  if (!book) {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }
  
  res.json(book);
});

app.post('/api/books', validateBook, (req, res) => {
  const { title, author, price, image } = req.body;
  const newBook = {
    id: mockBooks.length + 1,
    title: title.trim(),
    author: author.trim(),
    price: parseFloat(price),
    image: image || "https://via.placeholder.com/300x400"
  };
  mockBooks.push(newBook);
  res.status(201).json(newBook);
});

describe('API de Libros - Tests Unitarios', () => {
  
  beforeEach(() => {
    // Resetear datos de prueba
    mockBooks = [
      { id: 1, title: 'Cien Años de Soledad', author: 'Gabriel García Márquez', price: 29.99 },
      { id: 2, title: 'Don Quijote', author: 'Miguel de Cervantes', price: 24.99 }
    ];
  });

  describe('GET /api/books', () => {
    test('Debe retornar una lista de libros', async () => {
      const response = await request(app).get('/api/books');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('author');
      expect(response.body[0]).toHaveProperty('price');
    });
  });

  describe('GET /api/books/:id', () => {
    test('Debe retornar un libro específico por ID', async () => {
      const response = await request(app).get('/api/books/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('title', 'Cien Años de Soledad');
      expect(response.body).toHaveProperty('author', 'Gabriel García Márquez');
    });

    test('Debe retornar 404 si el libro no existe', async () => {
      const response = await request(app).get('/api/books/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Libro no encontrado');
    });

    test('Debe retornar 400 si el ID es inválido', async () => {
      const response = await request(app).get('/api/books/abc');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'ID inválido');
    });
  });

  describe('POST /api/books', () => {
    test('Debe crear un nuevo libro con datos válidos', async () => {
      const newBook = {
        title: 'El Aleph',
        author: 'Jorge Luis Borges',
        price: 18.99
      };

      const response = await request(app)
        .post('/api/books')
        .send(newBook);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('title', 'El Aleph');
      expect(response.body).toHaveProperty('author', 'Jorge Luis Borges');
      expect(response.body).toHaveProperty('price', 18.99);
    });

    test('Debe rechazar libro sin título', async () => {
      const invalidBook = {
        author: 'Autor Test',
        price: 19.99
      };

      const response = await request(app)
        .post('/api/books')
        .send(invalidBook);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toContain('El título es requerido');
    });

    test('Debe rechazar libro sin autor', async () => {
      const invalidBook = {
        title: 'Libro Test',
        price: 19.99
      };

      const response = await request(app)
        .post('/api/books')
        .send(invalidBook);

      expect(response.status).toBe(400);
      expect(response.body.errors).toContain('El autor es requerido');
    });

    test('Debe rechazar libro con precio negativo', async () => {
      const invalidBook = {
        title: 'Libro Test',
        author: 'Autor Test',
        price: -10
      };

      const response = await request(app)
        .post('/api/books')
        .send(invalidBook);

      expect(response.status).toBe(400);
      expect(response.body.errors).toContain('El precio debe ser un número positivo');
    });

    test('Debe rechazar libro sin precio', async () => {
      const invalidBook = {
        title: 'Libro Test',
        author: 'Autor Test'
      };

      const response = await request(app)
        .post('/api/books')
        .send(invalidBook);

      expect(response.status).toBe(400);
      expect(response.body.errors).toContain('El precio es requerido');
    });
  });
});
