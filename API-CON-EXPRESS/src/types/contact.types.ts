// src/types/contact.types.ts

export interface ContactMessageRequest {
    nombre: string;
    apellido: string;
    email: string;
    mensaje: string;
}

export interface ContactMessage extends ContactMessageRequest {
    id: number;
    enviadoEn: Date;
}

export interface ContactResponse {
    message: string;
    contact: ContactMessage;
}