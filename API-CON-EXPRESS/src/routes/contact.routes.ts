// src/routes/contact.routes.ts

import { Router } from 'express';
import * as contactController from '../controllers/contact.controller';

const router = Router();

router.post('/', contactController.sendMessage);

export const contactRoutes = router;