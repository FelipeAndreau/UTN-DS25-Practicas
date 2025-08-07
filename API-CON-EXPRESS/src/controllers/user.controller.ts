
import { Request, Response, NextFunction } from 'express';
import { CreateUserRequest, UserResponse, UsersListResponse } from '../types/user.types';
import * as userService from '../services/user.service';

export async function createUser(
  req: Request<{}, UserResponse, CreateUserRequest>,
  res: Response<UserResponse>,
  next: NextFunction
) {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json({
      user: newUser,
      message: 'Usuario registrado correctamente'
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllUsers(
  req: Request,
  res: Response<UsersListResponse>,
  next: NextFunction
) {
  try {
    const users = await userService.getAllUsers();
    res.json({
      users,
      total: users.length
    });
  } catch (error) {
    next(error);
  }
}