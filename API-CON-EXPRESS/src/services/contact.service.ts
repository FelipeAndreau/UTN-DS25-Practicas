// src/services/contact.service.ts

import { ContactMessage, ContactMessageRequest } from '../types/contact.types';

let messages: ContactMessage[] = [];

export async function sendMessage(data: ContactMessageRequest): Promise<ContactMessage> {
  const newMessage: ContactMessage = {
    id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1,
    ...data,
    enviadoEn: new Date()
  };
  messages.push(newMessage);
  return newMessage;
}