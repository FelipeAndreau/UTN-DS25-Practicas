
import { Request, Response, NextFunction } from 'express';
import { ContactMessageRequest, ContactResponse } from '../types/contact.types';
import * as contactService from '../services/contact.service';

export async function sendMessage(
  req: Request<{}, ContactResponse, ContactMessageRequest>,
  res: Response<ContactResponse>,
  next: NextFunction
) {
  try {
    const contact = await contactService.sendMessage(req.body);
    res.status(201).json({
      contact,
      message: 'Mensaje recibido correctamente'
    });
  } catch (error) {
    next(error);
  }
}