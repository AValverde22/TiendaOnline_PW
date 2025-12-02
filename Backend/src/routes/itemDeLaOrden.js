import express from 'express';
import controller from '../controllers/itemDeLaOrden.js';
import { authMiddleware, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Rutas públicas (usuarios autenticados pueden ver sus items de orden)
router.get('/orden/:idOrden', authMiddleware, controller.findByOrdenId);

// Ruta específica de un item
router.get('/:id', authMiddleware, controller.findOne);

export default router;
