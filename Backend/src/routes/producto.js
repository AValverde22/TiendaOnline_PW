import express from 'express';
import controller from '#controllers/producto.js';
import { authMiddleware, verifyAdmin } from '#middleware/auth.js';

const router = express.Router();

// Rutas Públicas
router.get('/', controller.findAll);
// Busca todos los productos

// Busca un producto por ID
router.get('/categoria/:nombreCategoria', controller.findByCategoria);
// Busca productos por categoría
router.get('/:id', controller.findById);
// Rutas Privadas (Admin)
router.post('/', authMiddleware, verifyAdmin, controller.create);
// Crea un nuevo producto
router.put('/:id', authMiddleware, verifyAdmin, controller.update);
// Actualiza un producto
router.delete('/:id', authMiddleware, verifyAdmin, controller.remove);
// Elimina un producto

export default router;