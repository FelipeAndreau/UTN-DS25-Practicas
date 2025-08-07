// src/app.ts - Servidor Express básico funcional

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';

class Server {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000');
    
    this.configureMiddlewares();
    this.configureRoutes();
  }

  private configureMiddlewares(): void {
    // CORS configuration
    this.app.use(cors({
      origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-frontend-domain.com'] 
        : ['http://localhost:3000', 'http://localhost:5173'],
      credentials: true
    }));

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));

    // Logging middleware
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] ${req.method} ${req.url}`);
      next();
    });
  }

  private configureRoutes(): void {
    // Health check
    this.app.get('/api/health', (req: Request, res: Response) => {
      res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        message: 'API funcionando correctamente'
      });
    });

    // Books routes (básicas)
    this.app.get('/api/books', (req: Request, res: Response) => {
      const books = [
        { id: 1, title: 'Don Quixote', author: 'Cervantes', description: 'Classic Spanish novel' },
        { id: 2, title: '1984', author: 'Orwell', description: 'Dystopian novel' }
      ];
      res.json({
        success: true,
        data: { books, total: books.length },
        message: `Encontrados ${books.length} libros exitosamente`
      });
    });

    this.app.get('/api/books/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const books = [
        { id: 1, title: 'Don Quixote', author: 'Cervantes', description: 'Classic Spanish novel' },
        { id: 2, title: '1984', author: 'Orwell', description: 'Dystopian novel' }
      ];
      const book = books.find(b => b.id === id);
      
      if (!book) {
        return res.status(404).json({
          success: false,
          message: `Libro con ID ${id} no encontrado`
        });
      }
      
      res.json({
        success: true,
        data: book,
        message: 'Libro obtenido exitosamente'
      });
    });

    // Contact route
    this.app.post('/api/contact', (req: Request, res: Response) => {
      res.status(201).json({
        success: true,
        message: 'Mensaje de contacto recibido correctamente',
        data: req.body
      });
    });

    // Users route
    this.app.get('/api/users', (req: Request, res: Response) => {
      const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ];
      res.json({
        success: true,
        data: { users, total: users.length },
        message: `Encontrados ${users.length} usuarios exitosamente`
      });
    });

    // 404 handler
    this.app.use('*', (req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        message: `Ruta ${req.originalUrl} no encontrada`,
        timestamp: new Date().toISOString(),
        status: 404
      });
    });

    // Error handler
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const timestamp = new Date().toISOString();
      const statusCode = err.statusCode || 500;
      const message = err.message || 'Error interno del servidor';

      console.error(`[${timestamp}] ❌ Error: ${message}`);
      
      res.status(statusCode).json({
        success: false,
        message,
        timestamp,
        status: statusCode
      });
    });
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${this.port}`);
      console.log(`📚 API Endpoints disponibles:`);
      console.log(`   GET  /api/health - Health check`);
      console.log(`   GET  /api/books - Lista de libros`);
      console.log(`   GET  /api/books/:id - Obtener libro por ID`);
      console.log(`   POST /api/contact - Enviar mensaje de contacto`);
      console.log(`   GET  /api/users - Lista de usuarios`);
      console.log(`🔧 Modo: ${process.env.NODE_ENV || 'development'}`);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}

// Crear e iniciar el servidor
const server = new Server();
server.start();

export default server.getApp();
