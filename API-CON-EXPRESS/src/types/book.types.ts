// src/types/book.types.ts

export interface Book {
    id: number;
    title_and_author: string;
    description: string;
    image: string
    createdAt?: Date;
}

export interface CreateBookRequest {
    title_and_author: string
    description: string;
    image: string
}

export interface UpdateBookRequest {
    title_and_author?: string
    description?: string;
    image?: string;
}

export interface BookResponse {
    book?: Book;
    message: string;
}

export interface BooksListResponse {
    books: Book[];
    total: number;
}