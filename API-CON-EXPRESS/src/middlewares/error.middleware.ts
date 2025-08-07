// src/middlewares/error.middleware.ts

import { Request, Response, NextFunction } from 'express';

export function handleError(err: any, req: Request, res: Response, next: NextFunction) {
    const timestamp = new Date().toISOString();
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Unexpected error';

    console.error(`[${timestamp}] ❌ Error: ${message}`);
    if (process.env.NODE_ENV === 'development' && err.stack) {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        error: 'Internal server error',
        message,
        timestamp
    });
}