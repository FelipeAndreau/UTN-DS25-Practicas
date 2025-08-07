// src/services/user.service.ts

import { User, CreateUserRequest } from '../types/user.types';

let users: User[] = [];

export async function createUser(data: CreateUserRequest): Promise<User> {
  const newUser: User = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    ...data,
    registrado: true,
    createdAt: new Date()
  };
  users.push(newUser);
  return newUser;
}

export async function getAllUsers(): Promise<User[]> {
  return users;
}