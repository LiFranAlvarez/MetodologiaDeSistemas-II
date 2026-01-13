import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

/**
 * Información mínima de identidad autenticada
 * Se obtiene del JWT y se propaga por el request
 */
export interface AuthUser {
  id: string;
  rol: string;
}

/* Extiende el tipo Request de Express */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

/**
 * Middleware de AUTENTICACIÓN
 * Responsabilidad :
 *  - Lee el token JWT
 *  - Lo valida
 *  - Extiende la request req.user
 */
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header('authorization');
    const token = authHeader?.replace(/Bearer\s?/i, '');

    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, config.SECRET) as AuthUser;
    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
