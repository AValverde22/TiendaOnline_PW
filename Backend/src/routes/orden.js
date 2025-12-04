import express from 'express';
import controller from '#controllers/orden.js';
import authMiddleware from '#middleware/auth.js';

const router = express.Router();

// Crear orden (usuario autenticado)
router.post('/', authMiddleware, controller.crearOrden);

// Obtener orden por id (usuario autenticado)
router.get('/:id', authMiddleware, controller.findOne);

export default router;
