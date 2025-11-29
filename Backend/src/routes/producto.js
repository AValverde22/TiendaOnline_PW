import express from 'express';
import controller from '../controllers/producto.js';
import { authMiddleware, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Rutas Públicas
router.get('/', controller.findAll);
router.get('/:id', controller.findById);
router.get('/categoria/:nombreCategoria', controller.findByCategoria);

// Rutas Privadas (Admin)
router.post('/', authMiddleware, verifyAdmin, controller.create);
router.put('/:id', authMiddleware, verifyAdmin, controller.update);
router.delete('/:id', authMiddleware, verifyAdmin, controller.remove);

export default router;