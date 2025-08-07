// src/types/user.types.ts

export interface CreateUserRequest {
  nombre: string;
  apellido: string;
  contraseña: string;
  sexo: 'masculino' | 'femenino';
  temaFavorito: 'Novela' | 'Terror' | 'Ciencia Ficción' | 'Policial';
}

export interface User extends CreateUserRequest {
  id: number;
  registrado: boolean;
  createdAt: Date;
}

export interface UserResponse {
  user: User;
  message: string;
}

export interface UsersListResponse {
  users: User[];
  total: number;
}