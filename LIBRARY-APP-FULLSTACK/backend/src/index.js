import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Biblioteca',
      version: '1.0.0',
      description: 'Una API simple para gestión de biblioteca',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./src/index.js'],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middlewares
app.use(cors());
app.use(express.json());

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

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated book ID
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *         price:
 *           type: number
 *           format: float
 *           description: The book price
 *         image:
 *           type: string
 *           description: URL of the book cover image
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Obtener todos los libros
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Lista de todos los libros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Error del servidor
 */
app.get('/api/books', async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(books);
  } catch (error) {
    console.error('Error al obtener libros:', error);
    res.status(500).json({ error: 'Error al obtener los libros', details: error.message });
  }
});

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Obtener un libro por ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del libro
 *     responses:
 *       200:
 *         description: Datos del libro
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error del servidor
 */
app.get('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const bookId = parseInt(id);
    
    if (isNaN(bookId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId }
    });
    
    if (!book) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    
    res.json(book);
  } catch (error) {
    console.error('Error al obtener libro:', error);
    res.status(500).json({ error: 'Error al obtener el libro', details: error.message });
  }
});

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Crear un nuevo libro
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Libro creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Datos de entrada inválidos
 *       500:
 *         description: Error del servidor
 */
app.post('/api/books', validateBook, async (req, res) => {
  try {
    const { title, author, price, image } = req.body;
    const book = await prisma.book.create({
      data: { 
        title: title.trim(), 
        author: author.trim(), 
        price: parseFloat(price),
        image: image || "https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=Book+Cover"
      }
    });
    res.status(201).json(book);
  } catch (error) {
    console.error('Error al crear libro:', error);
    res.status(500).json({ error: 'Error al crear el libro', details: error.message });
  }
});

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Actualizar un libro
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del libro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Libro actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error del servidor
 */
app.put('/api/books/:id', validateBook, async (req, res) => {
  try {
    const { id } = req.params;
    const bookId = parseInt(id);
    
    if (isNaN(bookId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const { title, author, price, image } = req.body;
    
    // Verificar si el libro existe
    const existingBook = await prisma.book.findUnique({
      where: { id: bookId }
    });

    if (!existingBook) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    const book = await prisma.book.update({
      where: { id: bookId },
      data: { 
        title: title.trim(), 
        author: author.trim(), 
        price: parseFloat(price),
        image: image || existingBook.image
      }
    });
    res.json(book);
  } catch (error) {
    console.error('Error al actualizar libro:', error);
    res.status(500).json({ error: 'Error al actualizar el libro', details: error.message });
  }
});

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Eliminar un libro
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del libro
 *     responses:
 *       204:
 *         description: Libro eliminado exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error del servidor
 */
app.delete('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const bookId = parseInt(id);
    
    if (isNaN(bookId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    // Verificar si el libro existe
    const existingBook = await prisma.book.findUnique({
      where: { id: bookId }
    });

    if (!existingBook) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    await prisma.book.delete({
      where: { id: bookId }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar libro:', error);
    res.status(500).json({ error: 'Error al eliminar el libro', details: error.message });
  }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err);
  res.status(500).json({ 
    error: 'Error interno del servidor', 
    details: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  console.log(`📚 Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
  console.log(`🔗 API disponible en http://localhost:${PORT}/api/books`);
});
