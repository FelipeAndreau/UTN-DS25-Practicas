# Library App

Complete library management application with React frontend, Express.js backend, Prisma ORM, and PostgreSQL database.

## Features

- **📚 Complete CRUD Operations**: List, add, edit, and delete books
- **🔍 Search Functionality**: Search books by title or author  
- **🖼️ Book Images**: Support for book cover images with placeholder fallback
- **📱 Responsive Design**: Clean UI with TailwindCSS
- **🌐 RESTful API**: Well-documented API with Swagger
- **🗄️ Database**: PostgreSQL with Prisma ORM
- **⚡ Real-time Updates**: Global state management with React Context

## Tech Stack

### Frontend
- React 18
- React Router
- TailwindCSS
- Axios
- Vite

### Backend
- Express.js
- Prisma ORM
- PostgreSQL (Supabase)
- Swagger UI for API documentation
- CORS

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database (Supabase recommended)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. **Configure Database:**
   - Create a PostgreSQL database on Supabase
   - Copy your connection string
   - Update `backend/.env` with your database URL:
     ```
     DATABASE_URL="postgresql://username:password@host:port/database"
     ```

3. **Setup Prisma:**
   ```bash
   cd backend
   npm run db:generate
   npm run db:push
   ```

4. **Start Development Servers:**
   ```bash
   # From root directory
   npm run dev
   ```

   Or start individually:
   ```bash
   # Backend (port 5000)
   cd backend && npm run dev
   
   # Frontend (port 3000)
   cd frontend && npm run dev
   ```

## API Endpoints

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a specific book
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

### API Documentation
Access the interactive Swagger documentation at: **http://localhost:5000/api-docs**

## Project Structure

```
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   └── ...
├── backend/                 # Express backend
│   ├── src/
│   │   └── index.js        # Main server file
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── ...
└── package.json            # Root package.json
```

## Environment Variables

Create `backend/.env` file:
```
DATABASE_URL="your-postgresql-connection-string"
```

## Important Notes

- The application is configured to run on:
  - **Frontend**: http://localhost:3000
  - **Backend**: http://localhost:5000  
  - **API Documentation**: http://localhost:5000/api-docs
- Make sure to configure your Supabase PostgreSQL connection string in `backend/.env`
- Run `npm run db:push` in the backend directory after setting up your database URL
- The app uses Prisma ORM for database operations
- Book images support URLs or use a default placeholder if not provided

## Build for Production

```bash
npm run build
npm start
```
