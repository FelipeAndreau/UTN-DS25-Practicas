# 📚 Library App

Aplicación Full-Stack de gestión de biblioteca con React, Express.js, Prisma ORM y PostgreSQL.

**Desarrollado por:** Felipe Andreau

---

## � Tecnologías

**Frontend:** React 18 · Vite · TailwindCSS · React Router · Axios  
**Backend:** Express.js · Prisma ORM · PostgreSQL · Swagger  
**Testing:** Jest · Supertest · 9 tests unitarios  
**Features:** CRUD completo · Búsqueda en tiempo real · API RESTful · Validaciones

---

## ⚡ Instalación Rápida

```bash
# 1. Instalar dependencias
npm install
cd backend && npm install
cd ../frontend && npm install

# 2. Configurar backend/.env
DATABASE_URL="postgresql://usuario:pass@host:5432/db"
PORT=5000

# 3. Configurar frontend/.env
VITE_API_URL=http://localhost:5000/api

# 4. Setup Prisma
cd backend
npm run db:generate
npm run db:push

# 5. Ejecutar tests (opcional)
npm test

# 6. Iniciar aplicación
npm run dev
```

---

## 📡 API Endpoints

- `GET /api/books` - Listar todos los libros
- `GET /api/books/:id` - Obtener libro por ID
- `POST /api/books` - Crear nuevo libro
- `PUT /api/books/:id` - Actualizar libro
- `DELETE /api/books/:id` - Eliminar libro

**Documentación Swagger:** http://localhost:5000/api-docs

---

## 🌐 URLs

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **API Docs:** http://localhost:5000/api-docs

---

## 📂 Estructura

```
├── backend/          # Express API + Prisma
│   ├── src/
│   ├── prisma/
│   └── .env
├── frontend/         # React App
│   ├── src/
│   └── .env
└── package.json
```

---

**© 2025 Felipe Andreau**
